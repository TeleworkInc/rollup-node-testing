import util from 'util';
import buffer from 'buffer';
import events from 'events';
import stream from 'stream';
import crypto from 'crypto';
import url from 'url';
import assert from 'assert';
import net from 'net';
import tls from 'tls';

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var safeBuffer = createCommonjsModule(function (module, exports) {
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/* eslint-disable node/no-deprecated-api */

var Buffer = buffer.Buffer;

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key];
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer;
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports);
  exports.Buffer = SafeBuffer;
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.prototype = Object.create(Buffer.prototype);

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer);

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
};

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size);
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding);
    } else {
      buf.fill(fill);
    }
  } else {
    buf.fill(0);
  }
  return buf
};

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
};

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
};
});

/**

Streams in a WebSocket connection
---------------------------------

We model a WebSocket as two duplex streams: one stream is for the wire protocol
over an I/O socket, and the other is for incoming/outgoing messages.


                        +----------+      +---------+      +----------+
    [1] write(chunk) -->| ~~~~~~~~ +----->| parse() +----->| ~~~~~~~~ +--> emit('data') [2]
                        |          |      +----+----+      |          |
                        |          |           |           |          |
                        |    IO    |           | [5]       | Messages |
                        |          |           V           |          |
                        |          |      +---------+      |          |
    [4] emit('data') <--+ ~~~~~~~~ |<-----+ frame() |<-----+ ~~~~~~~~ |<-- write(chunk) [3]
                        +----------+      +---------+      +----------+


Message transfer in each direction is simple: IO receives a byte stream [1] and
sends this stream for parsing. The parser will periodically emit a complete
message text on the Messages stream [2]. Similarly, when messages are written
to the Messages stream [3], they are framed using the WebSocket wire format and
emitted via IO [4].

There is a feedback loop via [5] since some input from [1] will be things like
ping, pong and close frames. In these cases the protocol responds by emitting
responses directly back to [4] rather than emitting messages via [2].

For the purposes of flow control, we consider the sources of each Readable
stream to be as follows:

* [2] receives input from [1]
* [4] receives input from [1] and [3]

The classes below express the relationships described above without prescribing
anything about how parse() and frame() work, other than assuming they emit
'data' events to the IO and Messages streams. They will work with any protocol
driver having these two methods.
**/


var Stream = stream.Stream;


var IO = function(driver) {
  this.readable = this.writable = true;
  this._paused  = false;
  this._driver  = driver;
};
util.inherits(IO, Stream);

// The IO pause() and resume() methods will be called when the socket we are
// piping to gets backed up and drains. Since IO output [4] comes from IO input
// [1] and Messages input [3], we need to tell both of those to return false
// from write() when this stream is paused.

IO.prototype.pause = function() {
  this._paused = true;
  this._driver.messages._paused = true;
};

IO.prototype.resume = function() {
  this._paused = false;
  this.emit('drain');

  var messages = this._driver.messages;
  messages._paused = false;
  messages.emit('drain');
};

// When we receive input from a socket, send it to the parser and tell the
// source whether to back off.
IO.prototype.write = function(chunk) {
  if (!this.writable) return false;
  this._driver.parse(chunk);
  return !this._paused;
};

// The IO end() method will be called when the socket piping into it emits
// 'close' or 'end', i.e. the socket is closed. In this situation the Messages
// stream will not emit any more data so we emit 'end'.
IO.prototype.end = function(chunk) {
  if (!this.writable) return;
  if (chunk !== undefined) this.write(chunk);
  this.writable = false;

  var messages = this._driver.messages;
  if (messages.readable) {
    messages.readable = messages.writable = false;
    messages.emit('end');
  }
};

IO.prototype.destroy = function() {
  this.end();
};


var Messages = function(driver) {
  this.readable = this.writable = true;
  this._paused  = false;
  this._driver  = driver;
};
util.inherits(Messages, Stream);

// The Messages pause() and resume() methods will be called when the app that's
// processing the messages gets backed up and drains. If we're emitting
// messages too fast we should tell the source to slow down. Message output [2]
// comes from IO input [1].

Messages.prototype.pause = function() {
  this._driver.io._paused = true;
};

Messages.prototype.resume = function() {
  this._driver.io._paused = false;
  this._driver.io.emit('drain');
};

// When we receive messages from the user, send them to the formatter and tell
// the source whether to back off.
Messages.prototype.write = function(message) {
  if (!this.writable) return false;
  if (typeof message === 'string') this._driver.text(message);
  else this._driver.binary(message);
  return !this._paused;
};

// The Messages end() method will be called when a stream piping into it emits
// 'end'. Many streams may be piped into the WebSocket and one of them ending
// does not mean the whole socket is done, so just process the input and move
// on leaving the socket open.
Messages.prototype.end = function(message) {
  if (message !== undefined) this.write(message);
};

Messages.prototype.destroy = function() {};


var IO_1 = IO;
var Messages_1 = Messages;

var streams = {
	IO: IO_1,
	Messages: Messages_1
};

var Headers = function() {
  this.clear();
};

Headers.prototype.ALLOWED_DUPLICATES = ['set-cookie', 'set-cookie2', 'warning', 'www-authenticate'];

Headers.prototype.clear = function() {
  this._sent  = {};
  this._lines = [];
};

Headers.prototype.set = function(name, value) {
  if (value === undefined) return;

  name = this._strip(name);
  value = this._strip(value);

  var key = name.toLowerCase();
  if (!this._sent.hasOwnProperty(key) || this.ALLOWED_DUPLICATES.indexOf(key) >= 0) {
    this._sent[key] = true;
    this._lines.push(name + ': ' + value + '\r\n');
  }
};

Headers.prototype.toString = function() {
  return this._lines.join('');
};

Headers.prototype._strip = function(string) {
  return string.toString().replace(/^ */, '').replace(/ *$/, '');
};

var headers = Headers;

var Buffer$1 = safeBuffer.Buffer;

var StreamReader = function() {
  this._queue     = [];
  this._queueSize = 0;
  this._offset    = 0;
};

StreamReader.prototype.put = function(buffer) {
  if (!buffer || buffer.length === 0) return;
  if (!Buffer$1.isBuffer(buffer)) buffer = Buffer$1.from(buffer);
  this._queue.push(buffer);
  this._queueSize += buffer.length;
};

StreamReader.prototype.read = function(length) {
  if (length > this._queueSize) return null;
  if (length === 0) return Buffer$1.alloc(0);

  this._queueSize -= length;

  var queue  = this._queue,
      remain = length,
      first  = queue[0],
      buffers, buffer;

  if (first.length >= length) {
    if (first.length === length) {
      return queue.shift();
    } else {
      buffer = first.slice(0, length);
      queue[0] = first.slice(length);
      return buffer;
    }
  }

  for (var i = 0, n = queue.length; i < n; i++) {
    if (remain < queue[i].length) break;
    remain -= queue[i].length;
  }
  buffers = queue.splice(0, i);

  if (remain > 0 && queue.length > 0) {
    buffers.push(queue[0].slice(0, remain));
    queue[0] = queue[0].slice(remain);
  }
  return Buffer$1.concat(buffers, length);
};

StreamReader.prototype.eachByte = function(callback, context) {
  var buffer, n, index;

  while (this._queue.length > 0) {
    buffer = this._queue[0];
    n = buffer.length;

    while (this._offset < n) {
      index = this._offset;
      this._offset += 1;
      callback.call(context, buffer[index]);
    }
    this._offset = 0;
    this._queue.shift();
  }
};

var stream_reader = StreamReader;

var Buffer$2  = safeBuffer.Buffer,
    Emitter = events.EventEmitter;

var Base = function(request, url, options) {
  Emitter.call(this);
  Base.validateOptions(options || {}, ['maxLength', 'masking', 'requireMasking', 'protocols']);

  this._request   = request;
  this._reader    = new stream_reader();
  this._options   = options || {};
  this._maxLength = this._options.maxLength || this.MAX_LENGTH;
  this._headers   = new headers();
  this.__queue    = [];
  this.readyState = 0;
  this.url        = url;

  this.io = new streams.IO(this);
  this.messages = new streams.Messages(this);
  this._bindEventListeners();
};
util.inherits(Base, Emitter);

Base.isWebSocket = function(request) {
  var connection = request.headers.connection || '',
      upgrade    = request.headers.upgrade || '';

  return request.method === 'GET' &&
         connection.toLowerCase().split(/ *, */).indexOf('upgrade') >= 0 &&
         upgrade.toLowerCase() === 'websocket';
};

Base.validateOptions = function(options, validKeys) {
  for (var key in options) {
    if (validKeys.indexOf(key) < 0)
      throw new Error('Unrecognized option: ' + key);
  }
};

var instance = {
  // This is 64MB, small enough for an average VPS to handle without
  // crashing from process out of memory
  MAX_LENGTH: 0x3ffffff,

  STATES: ['connecting', 'open', 'closing', 'closed'],

  _bindEventListeners: function() {
    var self = this;

    // Protocol errors are informational and do not have to be handled
    this.messages.on('error', function() {});

    this.on('message', function(event) {
      var messages = self.messages;
      if (messages.readable) messages.emit('data', event.data);
    });

    this.on('error', function(error) {
      var messages = self.messages;
      if (messages.readable) messages.emit('error', error);
    });

    this.on('close', function() {
      var messages = self.messages;
      if (!messages.readable) return;
      messages.readable = messages.writable = false;
      messages.emit('end');
    });
  },

  getState: function() {
    return this.STATES[this.readyState] || null;
  },

  addExtension: function(extension) {
    return false;
  },

  setHeader: function(name, value) {
    if (this.readyState > 0) return false;
    this._headers.set(name, value);
    return true;
  },

  start: function() {
    if (this.readyState !== 0) return false;

    if (!Base.isWebSocket(this._request))
      return this._failHandshake(new Error('Not a WebSocket request'));

    var response;

    try {
      response = this._handshakeResponse();
    } catch (error) {
      return this._failHandshake(error);
    }

    this._write(response);
    if (this._stage !== -1) this._open();
    return true;
  },

  _failHandshake: function(error) {
    var headers$1 = new headers();
    headers$1.set('Content-Type', 'text/plain');
    headers$1.set('Content-Length', Buffer$2.byteLength(error.message, 'utf8'));

    headers$1 = ['HTTP/1.1 400 Bad Request', headers$1.toString(), error.message];
    this._write(Buffer$2.from(headers$1.join('\r\n'), 'utf8'));
    this._fail('protocol_error', error.message);

    return false;
  },

  text: function(message) {
    return this.frame(message);
  },

  binary: function(message) {
    return false;
  },

  ping: function() {
    return false;
  },

  pong: function() {
      return false;
  },

  close: function(reason, code) {
    if (this.readyState !== 1) return false;
    this.readyState = 3;
    this.emit('close', new Base.CloseEvent(null, null));
    return true;
  },

  _open: function() {
    this.readyState = 1;
    this.__queue.forEach(function(args) { this.frame.apply(this, args); }, this);
    this.__queue = [];
    this.emit('open', new Base.OpenEvent());
  },

  _queue: function(message) {
    this.__queue.push(message);
    return true;
  },

  _write: function(chunk) {
    var io = this.io;
    if (io.readable) io.emit('data', chunk);
  },

  _fail: function(type, message) {
    this.readyState = 2;
    this.emit('error', new Error(message));
    this.close();
  }
};

for (var key in instance)
  Base.prototype[key] = instance[key];


Base.ConnectEvent = function() {};

Base.OpenEvent = function() {};

Base.CloseEvent = function(code, reason) {
  this.code   = code;
  this.reason = reason;
};

Base.MessageEvent = function(data) {
  this.data = data;
};

Base.PingEvent = function(data) {
  this.data = data;
};

Base.PongEvent = function(data) {
  this.data = data;
};

var base = Base;

var httpParser = createCommonjsModule(function (module, exports) {
/*jshint node:true */



exports.HTTPParser = HTTPParser;
function HTTPParser(type) {
  assert.ok(type === HTTPParser.REQUEST || type === HTTPParser.RESPONSE || type === undefined);
  if (type === undefined) ; else {
    this.initialize(type);
  }
}
HTTPParser.prototype.initialize = function (type, async_resource) {
  assert.ok(type === HTTPParser.REQUEST || type === HTTPParser.RESPONSE);
  this.type = type;
  this.state = type + '_LINE';
  this.info = {
    headers: [],
    upgrade: false
  };
  this.trailers = [];
  this.line = '';
  this.isChunked = false;
  this.connection = '';
  this.headerSize = 0; // for preventing too big headers
  this.body_bytes = null;
  this.isUserCall = false;
  this.hadError = false;
};

HTTPParser.encoding = 'ascii';
HTTPParser.maxHeaderSize = 80 * 1024; // maxHeaderSize (in bytes) is configurable, but 80kb by default;
HTTPParser.REQUEST = 'REQUEST';
HTTPParser.RESPONSE = 'RESPONSE';
var kOnHeaders = HTTPParser.kOnHeaders = 0;
var kOnHeadersComplete = HTTPParser.kOnHeadersComplete = 1;
var kOnBody = HTTPParser.kOnBody = 2;
var kOnMessageComplete = HTTPParser.kOnMessageComplete = 3;

// Some handler stubs, needed for compatibility
HTTPParser.prototype[kOnHeaders] =
HTTPParser.prototype[kOnHeadersComplete] =
HTTPParser.prototype[kOnBody] =
HTTPParser.prototype[kOnMessageComplete] = function () {};

var compatMode0_12 = true;
Object.defineProperty(HTTPParser, 'kOnExecute', {
    get: function () {
      // hack for backward compatibility
      compatMode0_12 = false;
      return 4;
    }
  });

var methods = exports.methods = HTTPParser.methods = [
  'DELETE',
  'GET',
  'HEAD',
  'POST',
  'PUT',
  'CONNECT',
  'OPTIONS',
  'TRACE',
  'COPY',
  'LOCK',
  'MKCOL',
  'MOVE',
  'PROPFIND',
  'PROPPATCH',
  'SEARCH',
  'UNLOCK',
  'BIND',
  'REBIND',
  'UNBIND',
  'ACL',
  'REPORT',
  'MKACTIVITY',
  'CHECKOUT',
  'MERGE',
  'M-SEARCH',
  'NOTIFY',
  'SUBSCRIBE',
  'UNSUBSCRIBE',
  'PATCH',
  'PURGE',
  'MKCALENDAR',
  'LINK',
  'UNLINK'
];
var method_connect = methods.indexOf('CONNECT');
HTTPParser.prototype.reinitialize = HTTPParser;
HTTPParser.prototype.close =
HTTPParser.prototype.pause =
HTTPParser.prototype.resume =
HTTPParser.prototype.free = function () {};
HTTPParser.prototype._compatMode0_11 = false;
HTTPParser.prototype.getAsyncId = function() { return 0; };

var headerState = {
  REQUEST_LINE: true,
  RESPONSE_LINE: true,
  HEADER: true
};
HTTPParser.prototype.execute = function (chunk, start, length) {
  if (!(this instanceof HTTPParser)) {
    throw new TypeError('not a HTTPParser');
  }

  // backward compat to node < 0.11.4
  // Note: the start and length params were removed in newer version
  start = start || 0;
  length = typeof length === 'number' ? length : chunk.length;

  this.chunk = chunk;
  this.offset = start;
  var end = this.end = start + length;
  try {
    while (this.offset < end) {
      if (this[this.state]()) {
        break;
      }
    }
  } catch (err) {
    if (this.isUserCall) {
      throw err;
    }
    this.hadError = true;
    return err;
  }
  this.chunk = null;
  length = this.offset - start;
  if (headerState[this.state]) {
    this.headerSize += length;
    if (this.headerSize > HTTPParser.maxHeaderSize) {
      return new Error('max header size exceeded');
    }
  }
  return length;
};

var stateFinishAllowed = {
  REQUEST_LINE: true,
  RESPONSE_LINE: true,
  BODY_RAW: true
};
HTTPParser.prototype.finish = function () {
  if (this.hadError) {
    return;
  }
  if (!stateFinishAllowed[this.state]) {
    return new Error('invalid state for EOF');
  }
  if (this.state === 'BODY_RAW') {
    this.userCall()(this[kOnMessageComplete]());
  }
};

// These three methods are used for an internal speed optimization, and it also
// works if theses are noops. Basically consume() asks us to read the bytes
// ourselves, but if we don't do it we get them through execute().
HTTPParser.prototype.consume =
HTTPParser.prototype.unconsume =
HTTPParser.prototype.getCurrentBuffer = function () {};

//For correct error handling - see HTTPParser#execute
//Usage: this.userCall()(userFunction('arg'));
HTTPParser.prototype.userCall = function () {
  this.isUserCall = true;
  var self = this;
  return function (ret) {
    self.isUserCall = false;
    return ret;
  };
};

HTTPParser.prototype.nextRequest = function () {
  this.userCall()(this[kOnMessageComplete]());
  this.reinitialize(this.type);
};

HTTPParser.prototype.consumeLine = function () {
  var end = this.end,
      chunk = this.chunk;
  for (var i = this.offset; i < end; i++) {
    if (chunk[i] === 0x0a) { // \n
      var line = this.line + chunk.toString(HTTPParser.encoding, this.offset, i);
      if (line.charAt(line.length - 1) === '\r') {
        line = line.substr(0, line.length - 1);
      }
      this.line = '';
      this.offset = i + 1;
      return line;
    }
  }
  //line split over multiple chunks
  this.line += chunk.toString(HTTPParser.encoding, this.offset, this.end);
  this.offset = this.end;
};

var headerExp = /^([^: \t]+):[ \t]*((?:.*[^ \t])|)/;
var headerContinueExp = /^[ \t]+(.*[^ \t])/;
HTTPParser.prototype.parseHeader = function (line, headers) {
  if (line.indexOf('\r') !== -1) {
    throw parseErrorCode('HPE_LF_EXPECTED');
  }

  var match = headerExp.exec(line);
  var k = match && match[1];
  if (k) { // skip empty string (malformed header)
    headers.push(k);
    headers.push(match[2]);
  } else {
    var matchContinue = headerContinueExp.exec(line);
    if (matchContinue && headers.length) {
      if (headers[headers.length - 1]) {
        headers[headers.length - 1] += ' ';
      }
      headers[headers.length - 1] += matchContinue[1];
    }
  }
};

var requestExp = /^([A-Z-]+) ([^ ]+) HTTP\/(\d)\.(\d)$/;
HTTPParser.prototype.REQUEST_LINE = function () {
  var line = this.consumeLine();
  if (!line) {
    return;
  }
  var match = requestExp.exec(line);
  if (match === null) {
    throw parseErrorCode('HPE_INVALID_CONSTANT');
  }
  this.info.method = this._compatMode0_11 ? match[1] : methods.indexOf(match[1]);
  if (this.info.method === -1) {
    throw new Error('invalid request method');
  }
  this.info.url = match[2];
  this.info.versionMajor = +match[3];
  this.info.versionMinor = +match[4];
  this.body_bytes = 0;
  this.state = 'HEADER';
};

var responseExp = /^HTTP\/(\d)\.(\d) (\d{3}) ?(.*)$/;
HTTPParser.prototype.RESPONSE_LINE = function () {
  var line = this.consumeLine();
  if (!line) {
    return;
  }
  var match = responseExp.exec(line);
  if (match === null) {
    throw parseErrorCode('HPE_INVALID_CONSTANT');
  }
  this.info.versionMajor = +match[1];
  this.info.versionMinor = +match[2];
  var statusCode = this.info.statusCode = +match[3];
  this.info.statusMessage = match[4];
  // Implied zero length.
  if ((statusCode / 100 | 0) === 1 || statusCode === 204 || statusCode === 304) {
    this.body_bytes = 0;
  }
  this.state = 'HEADER';
};

HTTPParser.prototype.shouldKeepAlive = function () {
  if (this.info.versionMajor > 0 && this.info.versionMinor > 0) {
    if (this.connection.indexOf('close') !== -1) {
      return false;
    }
  } else if (this.connection.indexOf('keep-alive') === -1) {
    return false;
  }
  if (this.body_bytes !== null || this.isChunked) { // || skipBody
    return true;
  }
  return false;
};

HTTPParser.prototype.HEADER = function () {
  var line = this.consumeLine();
  if (line === undefined) {
    return;
  }
  var info = this.info;
  if (line) {
    this.parseHeader(line, info.headers);
  } else {
    var headers = info.headers;
    var hasContentLength = false;
    var currentContentLengthValue;
    var hasUpgradeHeader = false;
    for (var i = 0; i < headers.length; i += 2) {
      switch (headers[i].toLowerCase()) {
        case 'transfer-encoding':
          this.isChunked = headers[i + 1].toLowerCase() === 'chunked';
          break;
        case 'content-length':
          currentContentLengthValue = +headers[i + 1];
          if (hasContentLength) {
            // Fix duplicate Content-Length header with same values.
            // Throw error only if values are different.
            // Known issues:
            // https://github.com/request/request/issues/2091#issuecomment-328715113
            // https://github.com/nodejs/node/issues/6517#issuecomment-216263771
            if (currentContentLengthValue !== this.body_bytes) {
              throw parseErrorCode('HPE_UNEXPECTED_CONTENT_LENGTH');
            }
          } else {
            hasContentLength = true;
            this.body_bytes = currentContentLengthValue;
          }
          break;
        case 'connection':
          this.connection += headers[i + 1].toLowerCase();
          break;
        case 'upgrade':
          hasUpgradeHeader = true;
          break;
      }
    }

    // if both isChunked and hasContentLength, isChunked wins
    // This is required so the body is parsed using the chunked method, and matches
    // Chrome's behavior.  We could, maybe, ignore them both (would get chunked
    // encoding into the body), and/or disable shouldKeepAlive to be more
    // resilient.
    if (this.isChunked && hasContentLength) {
      hasContentLength = false;
      this.body_bytes = null;
    }

    // Logic from https://github.com/nodejs/http-parser/blob/921d5585515a153fa00e411cf144280c59b41f90/http_parser.c#L1727-L1737
    // "For responses, "Upgrade: foo" and "Connection: upgrade" are
    //   mandatory only when it is a 101 Switching Protocols response,
    //   otherwise it is purely informational, to announce support.
    if (hasUpgradeHeader && this.connection.indexOf('upgrade') != -1) {
      info.upgrade = this.type === HTTPParser.REQUEST || info.statusCode === 101;
    } else {
      info.upgrade = info.method === method_connect;
    }

    if (this.isChunked && info.upgrade) {
      this.isChunked = false;
    }

    info.shouldKeepAlive = this.shouldKeepAlive();
    //problem which also exists in original node: we should know skipBody before calling onHeadersComplete
    var skipBody;
    if (compatMode0_12) {
      skipBody = this.userCall()(this[kOnHeadersComplete](info));
    } else {
      skipBody = this.userCall()(this[kOnHeadersComplete](info.versionMajor,
          info.versionMinor, info.headers, info.method, info.url, info.statusCode,
          info.statusMessage, info.upgrade, info.shouldKeepAlive));
    }
    if (skipBody === 2) {
      this.nextRequest();
      return true;
    } else if (this.isChunked && !skipBody) {
      this.state = 'BODY_CHUNKHEAD';
    } else if (skipBody || this.body_bytes === 0) {
      this.nextRequest();
      // For older versions of node (v6.x and older?), that return skipBody=1 or skipBody=true,
      //   need this "return true;" if it's an upgrade request.
      return info.upgrade;
    } else if (this.body_bytes === null) {
      this.state = 'BODY_RAW';
    } else {
      this.state = 'BODY_SIZED';
    }
  }
};

HTTPParser.prototype.BODY_CHUNKHEAD = function () {
  var line = this.consumeLine();
  if (line === undefined) {
    return;
  }
  this.body_bytes = parseInt(line, 16);
  if (!this.body_bytes) {
    this.state = 'BODY_CHUNKTRAILERS';
  } else {
    this.state = 'BODY_CHUNK';
  }
};

HTTPParser.prototype.BODY_CHUNK = function () {
  var length = Math.min(this.end - this.offset, this.body_bytes);
  this.userCall()(this[kOnBody](this.chunk, this.offset, length));
  this.offset += length;
  this.body_bytes -= length;
  if (!this.body_bytes) {
    this.state = 'BODY_CHUNKEMPTYLINE';
  }
};

HTTPParser.prototype.BODY_CHUNKEMPTYLINE = function () {
  var line = this.consumeLine();
  if (line === undefined) {
    return;
  }
  assert.equal(line, '');
  this.state = 'BODY_CHUNKHEAD';
};

HTTPParser.prototype.BODY_CHUNKTRAILERS = function () {
  var line = this.consumeLine();
  if (line === undefined) {
    return;
  }
  if (line) {
    this.parseHeader(line, this.trailers);
  } else {
    if (this.trailers.length) {
      this.userCall()(this[kOnHeaders](this.trailers, ''));
    }
    this.nextRequest();
  }
};

HTTPParser.prototype.BODY_RAW = function () {
  var length = this.end - this.offset;
  this.userCall()(this[kOnBody](this.chunk, this.offset, length));
  this.offset = this.end;
};

HTTPParser.prototype.BODY_SIZED = function () {
  var length = Math.min(this.end - this.offset, this.body_bytes);
  this.userCall()(this[kOnBody](this.chunk, this.offset, length));
  this.offset += length;
  this.body_bytes -= length;
  if (!this.body_bytes) {
    this.nextRequest();
  }
};

// backward compat to node < 0.11.6
['Headers', 'HeadersComplete', 'Body', 'MessageComplete'].forEach(function (name) {
  var k = HTTPParser['kOn' + name];
  Object.defineProperty(HTTPParser.prototype, 'on' + name, {
    get: function () {
      return this[k];
    },
    set: function (to) {
      // hack for backward compatibility
      this._compatMode0_11 = true;
      method_connect = 'CONNECT';
      return (this[k] = to);
    }
  });
});

function parseErrorCode(code) {
  var err = new Error('Parse Error');
  err.code = code;
  return err;
}
});

var NodeHTTPParser = httpParser.HTTPParser,
    Buffer$3         = safeBuffer.Buffer;

var TYPES = {
  request:  NodeHTTPParser.REQUEST  || 'request',
  response: NodeHTTPParser.RESPONSE || 'response'
};

var HttpParser = function(type) {
  this._type     = type;
  this._parser   = new NodeHTTPParser(TYPES[type]);
  this._complete = false;
  this.headers   = {};

  var current = null,
      self    = this;

  this._parser.onHeaderField = function(b, start, length) {
    current = b.toString('utf8', start, start + length).toLowerCase();
  };

  this._parser.onHeaderValue = function(b, start, length) {
    var value = b.toString('utf8', start, start + length);

    if (self.headers.hasOwnProperty(current))
      self.headers[current] += ', ' + value;
    else
      self.headers[current] = value;
  };

  this._parser.onHeadersComplete = this._parser[NodeHTTPParser.kOnHeadersComplete] =
  function(majorVersion, minorVersion, headers, method, pathname, statusCode) {
    var info = arguments[0];

    if (typeof info === 'object') {
      method     = info.method;
      pathname   = info.url;
      statusCode = info.statusCode;
      headers    = info.headers;
    }

    self.method     = (typeof method === 'number') ? HttpParser.METHODS[method] : method;
    self.statusCode = statusCode;
    self.url        = pathname;

    if (!headers) return;

    for (var i = 0, n = headers.length, key, value; i < n; i += 2) {
      key   = headers[i].toLowerCase();
      value = headers[i+1];
      if (self.headers.hasOwnProperty(key))
        self.headers[key] += ', ' + value;
      else
        self.headers[key] = value;
    }

    self._complete = true;
  };
};

HttpParser.METHODS = {
  0:  'DELETE',
  1:  'GET',
  2:  'HEAD',
  3:  'POST',
  4:  'PUT',
  5:  'CONNECT',
  6:  'OPTIONS',
  7:  'TRACE',
  8:  'COPY',
  9:  'LOCK',
  10: 'MKCOL',
  11: 'MOVE',
  12: 'PROPFIND',
  13: 'PROPPATCH',
  14: 'SEARCH',
  15: 'UNLOCK',
  16: 'BIND',
  17: 'REBIND',
  18: 'UNBIND',
  19: 'ACL',
  20: 'REPORT',
  21: 'MKACTIVITY',
  22: 'CHECKOUT',
  23: 'MERGE',
  24: 'M-SEARCH',
  25: 'NOTIFY',
  26: 'SUBSCRIBE',
  27: 'UNSUBSCRIBE',
  28: 'PATCH',
  29: 'PURGE',
  30: 'MKCALENDAR',
  31: 'LINK',
  32: 'UNLINK'
};

var VERSION = process.version
  ? process.version.match(/[0-9]+/g).map(function(n) { return parseInt(n, 10) })
  : [];

if (VERSION[0] === 0 && VERSION[1] === 12) {
  HttpParser.METHODS[16] = 'REPORT';
  HttpParser.METHODS[17] = 'MKACTIVITY';
  HttpParser.METHODS[18] = 'CHECKOUT';
  HttpParser.METHODS[19] = 'MERGE';
  HttpParser.METHODS[20] = 'M-SEARCH';
  HttpParser.METHODS[21] = 'NOTIFY';
  HttpParser.METHODS[22] = 'SUBSCRIBE';
  HttpParser.METHODS[23] = 'UNSUBSCRIBE';
  HttpParser.METHODS[24] = 'PATCH';
  HttpParser.METHODS[25] = 'PURGE';
}

HttpParser.prototype.isComplete = function() {
  return this._complete;
};

HttpParser.prototype.parse = function(chunk) {
  var consumed = this._parser.execute(chunk, 0, chunk.length);

  if (typeof consumed !== 'number') {
    this.error     = consumed;
    this._complete = true;
    return;
  }

  if (this._complete)
    this.body = (consumed < chunk.length)
              ? chunk.slice(consumed)
              : Buffer$3.alloc(0);
};

var http_parser = HttpParser;

var TOKEN    = /([!#\$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+)/,
    NOTOKEN  = /([^!#\$%&'\*\+\-\.\^_`\|~0-9A-Za-z])/g,
    QUOTED   = /"((?:\\[\x00-\x7f]|[^\x00-\x08\x0a-\x1f\x7f"\\])*)"/,
    PARAM    = new RegExp(TOKEN.source + '(?:=(?:' + TOKEN.source + '|' + QUOTED.source + '))?'),
    EXT      = new RegExp(TOKEN.source + '(?: *; *' + PARAM.source + ')*', 'g'),
    EXT_LIST = new RegExp('^' + EXT.source + '(?: *, *' + EXT.source + ')*$'),
    NUMBER   = /^-?(0|[1-9][0-9]*)(\.[0-9]+)?$/;

var hasOwnProperty = Object.prototype.hasOwnProperty;

var Parser = {
  parseHeader: function(header) {
    var offers = new Offers();
    if (header === '' || header === undefined) return offers;

    if (!EXT_LIST.test(header))
      throw new SyntaxError('Invalid Sec-WebSocket-Extensions header: ' + header);

    var values = header.match(EXT);

    values.forEach(function(value) {
      var params = value.match(new RegExp(PARAM.source, 'g')),
          name   = params.shift(),
          offer  = {};

      params.forEach(function(param) {
        var args = param.match(PARAM), key = args[1], data;

        if (args[2] !== undefined) {
          data = args[2];
        } else if (args[3] !== undefined) {
          data = args[3].replace(/\\/g, '');
        } else {
          data = true;
        }
        if (NUMBER.test(data)) data = parseFloat(data);

        if (hasOwnProperty.call(offer, key)) {
          offer[key] = [].concat(offer[key]);
          offer[key].push(data);
        } else {
          offer[key] = data;
        }
      }, this);
      offers.push(name, offer);
    }, this);

    return offers;
  },

  serializeParams: function(name, params) {
    var values = [];

    var print = function(key, value) {
      if (value instanceof Array) {
        value.forEach(function(v) { print(key, v); });
      } else if (value === true) {
        values.push(key);
      } else if (typeof value === 'number') {
        values.push(key + '=' + value);
      } else if (NOTOKEN.test(value)) {
        values.push(key + '="' + value.replace(/"/g, '\\"') + '"');
      } else {
        values.push(key + '=' + value);
      }
    };

    for (var key in params) print(key, params[key]);

    return [name].concat(values).join('; ');
  }
};

var Offers = function() {
  this._byName  = {};
  this._inOrder = [];
};

Offers.prototype.push = function(name, params) {
  if (!hasOwnProperty.call(this._byName, name))
    this._byName[name] = [];

  this._byName[name].push(params);
  this._inOrder.push({ name: name, params: params });
};

Offers.prototype.eachOffer = function(callback, context) {
  var list = this._inOrder;
  for (var i = 0, n = list.length; i < n; i++)
    callback.call(context, list[i].name, list[i].params);
};

Offers.prototype.byName = function(name) {
  return this._byName[name] || [];
};

Offers.prototype.toArray = function() {
  return this._inOrder.slice();
};

var parser = Parser;

var RingBuffer = function(bufferSize) {
  this._bufferSize = bufferSize;
  this.clear();
};

RingBuffer.prototype.clear = function() {
  this._buffer     = new Array(this._bufferSize);
  this._ringOffset = 0;
  this._ringSize   = this._bufferSize;
  this._head       = 0;
  this._tail       = 0;
  this.length      = 0;
};

RingBuffer.prototype.push = function(value) {
  var expandBuffer = false,
      expandRing   = false;

  if (this._ringSize < this._bufferSize) {
    expandBuffer = (this._tail === 0);
  } else if (this._ringOffset === this._ringSize) {
    expandBuffer = true;
    expandRing   = (this._tail === 0);
  }

  if (expandBuffer) {
    this._tail       = this._bufferSize;
    this._buffer     = this._buffer.concat(new Array(this._bufferSize));
    this._bufferSize = this._buffer.length;

    if (expandRing)
      this._ringSize = this._bufferSize;
  }

  this._buffer[this._tail] = value;
  this.length += 1;
  if (this._tail < this._ringSize) this._ringOffset += 1;
  this._tail = (this._tail + 1) % this._bufferSize;
};

RingBuffer.prototype.peek = function() {
  if (this.length === 0) return void 0;
  return this._buffer[this._head];
};

RingBuffer.prototype.shift = function() {
  if (this.length === 0) return void 0;

  var value = this._buffer[this._head];
  this._buffer[this._head] = void 0;
  this.length -= 1;
  this._ringOffset -= 1;

  if (this._ringOffset === 0 && this.length > 0) {
    this._head       = this._ringSize;
    this._ringOffset = this.length;
    this._ringSize   = this._bufferSize;
  } else {
    this._head = (this._head + 1) % this._ringSize;
  }
  return value;
};

var ring_buffer = RingBuffer;

var Functor = function(session, method) {
  this._session = session;
  this._method  = method;
  this._queue   = new ring_buffer(Functor.QUEUE_SIZE);
  this._stopped = false;
  this.pending  = 0;
};

Functor.QUEUE_SIZE = 8;

Functor.prototype.call = function(error, message, callback, context) {
  if (this._stopped) return;

  var record = { error: error, message: message, callback: callback, context: context, done: false },
      called = false,
      self   = this;

  this._queue.push(record);

  if (record.error) {
    record.done = true;
    this._stop();
    return this._flushQueue();
  }

  var handler = function(err, msg) {
    if (!(called ^ (called = true))) return;

    if (err) {
      self._stop();
      record.error   = err;
      record.message = null;
    } else {
      record.message = msg;
    }

    record.done = true;
    self._flushQueue();
  };

  try {
    this._session[this._method](message, handler);
  } catch (err) {
    handler(err);
  }
};

Functor.prototype._stop = function() {
  this.pending  = this._queue.length;
  this._stopped = true;
};

Functor.prototype._flushQueue = function() {
  var queue = this._queue, record;

  while (queue.length > 0 && queue.peek().done) {
    record = queue.shift();
    if (record.error) {
      this.pending = 0;
      queue.clear();
    } else {
      this.pending -= 1;
    }
    record.callback.call(record.context, record.error, record.message);
  }
};

var functor = Functor;

var Pledge = function() {
  this._complete  = false;
  this._callbacks = new ring_buffer(Pledge.QUEUE_SIZE);
};

Pledge.QUEUE_SIZE = 4;

Pledge.all = function(list) {
  var pledge  = new Pledge(),
      pending = list.length,
      n       = pending;

  if (pending === 0) pledge.done();

  while (n--) list[n].then(function() {
    pending -= 1;
    if (pending === 0) pledge.done();
  });
  return pledge;
};

Pledge.prototype.then = function(callback) {
  if (this._complete) callback();
  else this._callbacks.push(callback);
};

Pledge.prototype.done = function() {
  this._complete = true;
  var callbacks = this._callbacks, callback;
  while (callback = callbacks.shift()) callback();
};

var pledge = Pledge;

var Cell = function(tuple) {
  this._ext     = tuple[0];
  this._session = tuple[1];

  this._functors = {
    incoming: new functor(this._session, 'processIncomingMessage'),
    outgoing: new functor(this._session, 'processOutgoingMessage')
  };
};

Cell.prototype.pending = function(direction) {
  var functor = this._functors[direction];
  if (!functor._stopped) functor.pending += 1;
};

Cell.prototype.incoming = function(error, message, callback, context) {
  this._exec('incoming', error, message, callback, context);
};

Cell.prototype.outgoing = function(error, message, callback, context) {
  this._exec('outgoing', error, message, callback, context);
};

Cell.prototype.close = function() {
  this._closed = this._closed || new pledge();
  this._doClose();
  return this._closed;
};

Cell.prototype._exec = function(direction, error, message, callback, context) {
  this._functors[direction].call(error, message, function(err, msg) {
    if (err) err.message = this._ext.name + ': ' + err.message;
    callback.call(context, err, msg);
    this._doClose();
  }, this);
};

Cell.prototype._doClose = function() {
  var fin  = this._functors.incoming,
      fout = this._functors.outgoing;

  if (!this._closed || fin.pending + fout.pending !== 0) return;
  if (this._session) this._session.close();
  this._session = null;
  this._closed.done();
};

var cell = Cell;

var Pipeline = function(sessions) {
  this._cells   = sessions.map(function(session) { return new cell(session) });
  this._stopped = { incoming: false, outgoing: false };
};

Pipeline.prototype.processIncomingMessage = function(message, callback, context) {
  if (this._stopped.incoming) return;
  this._loop('incoming', this._cells.length - 1, -1, -1, message, callback, context);
};

Pipeline.prototype.processOutgoingMessage = function(message, callback, context) {
  if (this._stopped.outgoing) return;
  this._loop('outgoing', 0, this._cells.length, 1, message, callback, context);
};

Pipeline.prototype.close = function(callback, context) {
  this._stopped = { incoming: true, outgoing: true };

  var closed = this._cells.map(function(a) { return a.close() });
  if (callback)
    pledge.all(closed).then(function() { callback.call(context); });
};

Pipeline.prototype._loop = function(direction, start, end, step, message, callback, context) {
  var cells = this._cells,
      n     = cells.length,
      self  = this;

  while (n--) cells[n].pending(direction);

  var pipe = function(index, error, msg) {
    if (index === end) return callback.call(context, error, msg);

    cells[index][direction](error, msg, function(err, m) {
      if (err) self._stopped[direction] = true;
      pipe(index + step, err, m);
    });
  };
  pipe(start, null, message);
};

var pipeline = Pipeline;

var Extensions = function() {
  this._rsv1 = this._rsv2 = this._rsv3 = null;

  this._byName   = {};
  this._inOrder  = [];
  this._sessions = [];
  this._index    = {};
};

Extensions.MESSAGE_OPCODES = [1, 2];

var instance$1 = {
  add: function(ext) {
    if (typeof ext.name !== 'string') throw new TypeError('extension.name must be a string');
    if (ext.type !== 'permessage') throw new TypeError('extension.type must be "permessage"');

    if (typeof ext.rsv1 !== 'boolean') throw new TypeError('extension.rsv1 must be true or false');
    if (typeof ext.rsv2 !== 'boolean') throw new TypeError('extension.rsv2 must be true or false');
    if (typeof ext.rsv3 !== 'boolean') throw new TypeError('extension.rsv3 must be true or false');

    if (this._byName.hasOwnProperty(ext.name))
      throw new TypeError('An extension with name "' + ext.name + '" is already registered');

    this._byName[ext.name] = ext;
    this._inOrder.push(ext);
  },

  generateOffer: function() {
    var sessions = [],
        offer    = [],
        index    = {};

    this._inOrder.forEach(function(ext) {
      var session = ext.createClientSession();
      if (!session) return;

      var record = [ext, session];
      sessions.push(record);
      index[ext.name] = record;

      var offers = session.generateOffer();
      offers = offers ? [].concat(offers) : [];

      offers.forEach(function(off) {
        offer.push(parser.serializeParams(ext.name, off));
      }, this);
    }, this);

    this._sessions = sessions;
    this._index    = index;

    return offer.length > 0 ? offer.join(', ') : null;
  },

  activate: function(header) {
    var responses = parser.parseHeader(header),
        sessions  = [];

    responses.eachOffer(function(name, params) {
      var record = this._index[name];

      if (!record)
        throw new Error('Server sent an extension response for unknown extension "' + name + '"');

      var ext      = record[0],
          session  = record[1],
          reserved = this._reserved(ext);

      if (reserved)
        throw new Error('Server sent two extension responses that use the RSV' +
                        reserved[0] + ' bit: "' +
                        reserved[1] + '" and "' + ext.name + '"');

      if (session.activate(params) !== true)
        throw new Error('Server sent unacceptable extension parameters: ' +
                        parser.serializeParams(name, params));

      this._reserve(ext);
      sessions.push(record);
    }, this);

    this._sessions = sessions;
    this._pipeline = new pipeline(sessions);
  },

  generateResponse: function(header) {
    var sessions = [],
        response = [],
        offers   = parser.parseHeader(header);

    this._inOrder.forEach(function(ext) {
      var offer = offers.byName(ext.name);
      if (offer.length === 0 || this._reserved(ext)) return;

      var session = ext.createServerSession(offer);
      if (!session) return;

      this._reserve(ext);
      sessions.push([ext, session]);
      response.push(parser.serializeParams(ext.name, session.generateResponse()));
    }, this);

    this._sessions = sessions;
    this._pipeline = new pipeline(sessions);

    return response.length > 0 ? response.join(', ') : null;
  },

  validFrameRsv: function(frame) {
    var allowed = { rsv1: false, rsv2: false, rsv3: false },
        ext;

    if (Extensions.MESSAGE_OPCODES.indexOf(frame.opcode) >= 0) {
      for (var i = 0, n = this._sessions.length; i < n; i++) {
        ext = this._sessions[i][0];
        allowed.rsv1 = allowed.rsv1 || ext.rsv1;
        allowed.rsv2 = allowed.rsv2 || ext.rsv2;
        allowed.rsv3 = allowed.rsv3 || ext.rsv3;
      }
    }

    return (allowed.rsv1 || !frame.rsv1) &&
           (allowed.rsv2 || !frame.rsv2) &&
           (allowed.rsv3 || !frame.rsv3);
  },

  processIncomingMessage: function(message, callback, context) {
    this._pipeline.processIncomingMessage(message, callback, context);
  },

  processOutgoingMessage: function(message, callback, context) {
    this._pipeline.processOutgoingMessage(message, callback, context);
  },

  close: function(callback, context) {
    if (!this._pipeline) return callback.call(context);
    this._pipeline.close(callback, context);
  },

  _reserve: function(ext) {
    this._rsv1 = this._rsv1 || (ext.rsv1 && ext.name);
    this._rsv2 = this._rsv2 || (ext.rsv2 && ext.name);
    this._rsv3 = this._rsv3 || (ext.rsv3 && ext.name);
  },

  _reserved: function(ext) {
    if (this._rsv1 && ext.rsv1) return [1, this._rsv1];
    if (this._rsv2 && ext.rsv2) return [2, this._rsv2];
    if (this._rsv3 && ext.rsv3) return [3, this._rsv3];
    return false;
  }
};

for (var key$1 in instance$1)
  Extensions.prototype[key$1] = instance$1[key$1];

var websocket_extensions = Extensions;

var Frame = function() {};

var instance$2 = {
  final:        false,
  rsv1:         false,
  rsv2:         false,
  rsv3:         false,
  opcode:       null,
  masked:       false,
  maskingKey:   null,
  lengthBytes:  1,
  length:       0,
  payload:      null
};

for (var key$2 in instance$2)
  Frame.prototype[key$2] = instance$2[key$2];

var frame = Frame;

var Buffer$4 = safeBuffer.Buffer;

var Message = function() {
  this.rsv1    = false;
  this.rsv2    = false;
  this.rsv3    = false;
  this.opcode  = null;
  this.length  = 0;
  this._chunks = [];
};

var instance$3 = {
  read: function() {
    return this.data = this.data || Buffer$4.concat(this._chunks, this.length);
  },

  pushFrame: function(frame) {
    this.rsv1 = this.rsv1 || frame.rsv1;
    this.rsv2 = this.rsv2 || frame.rsv2;
    this.rsv3 = this.rsv3 || frame.rsv3;

    if (this.opcode === null) this.opcode = frame.opcode;

    this._chunks.push(frame.payload);
    this.length += frame.length;
  }
};

for (var key$3 in instance$3)
  Message.prototype[key$3] = instance$3[key$3];

var message = Message;

var Buffer$5     = safeBuffer.Buffer;

var Hybi = function(request, url, options) {
  base.apply(this, arguments);

  this._extensions     = new websocket_extensions();
  this._stage          = 0;
  this._masking        = this._options.masking;
  this._protocols      = this._options.protocols || [];
  this._requireMasking = this._options.requireMasking;
  this._pingCallbacks  = {};

  if (typeof this._protocols === 'string')
    this._protocols = this._protocols.split(/ *, */);

  if (!this._request) return;

  var protos    = this._request.headers['sec-websocket-protocol'],
      supported = this._protocols;

  if (protos !== undefined) {
    if (typeof protos === 'string') protos = protos.split(/ *, */);
    this.protocol = protos.filter(function(p) { return supported.indexOf(p) >= 0 })[0];
  }

  this.version = 'hybi-' + Hybi.VERSION;
};
util.inherits(Hybi, base);

Hybi.VERSION = '13';

Hybi.mask = function(payload, mask, offset) {
  if (!mask || mask.length === 0) return payload;
  offset = offset || 0;

  for (var i = 0, n = payload.length - offset; i < n; i++) {
    payload[offset + i] = payload[offset + i] ^ mask[i % 4];
  }
  return payload;
};

Hybi.generateAccept = function(key) {
  var sha1 = crypto.createHash('sha1');
  sha1.update(key + Hybi.GUID);
  return sha1.digest('base64');
};

Hybi.GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

var instance$4 = {
  FIN:    0x80,
  MASK:   0x80,
  RSV1:   0x40,
  RSV2:   0x20,
  RSV3:   0x10,
  OPCODE: 0x0F,
  LENGTH: 0x7F,

  OPCODES: {
    continuation: 0,
    text:         1,
    binary:       2,
    close:        8,
    ping:         9,
    pong:         10
  },

  OPCODE_CODES:    [0, 1, 2, 8, 9, 10],
  MESSAGE_OPCODES: [0, 1, 2],
  OPENING_OPCODES: [1, 2],

  ERRORS: {
    normal_closure:       1000,
    going_away:           1001,
    protocol_error:       1002,
    unacceptable:         1003,
    encoding_error:       1007,
    policy_violation:     1008,
    too_large:            1009,
    extension_error:      1010,
    unexpected_condition: 1011
  },

  ERROR_CODES:        [1000, 1001, 1002, 1003, 1007, 1008, 1009, 1010, 1011],
  DEFAULT_ERROR_CODE: 1000,
  MIN_RESERVED_ERROR: 3000,
  MAX_RESERVED_ERROR: 4999,

  // http://www.w3.org/International/questions/qa-forms-utf-8.en.php
  UTF8_MATCH: /^([\x00-\x7F]|[\xC2-\xDF][\x80-\xBF]|\xE0[\xA0-\xBF][\x80-\xBF]|[\xE1-\xEC\xEE\xEF][\x80-\xBF]{2}|\xED[\x80-\x9F][\x80-\xBF]|\xF0[\x90-\xBF][\x80-\xBF]{2}|[\xF1-\xF3][\x80-\xBF]{3}|\xF4[\x80-\x8F][\x80-\xBF]{2})*$/,

  addExtension: function(extension) {
    this._extensions.add(extension);
    return true;
  },

  parse: function(chunk) {
    this._reader.put(chunk);
    var buffer = true;
    while (buffer) {
      switch (this._stage) {
        case 0:
          buffer = this._reader.read(1);
          if (buffer) this._parseOpcode(buffer[0]);
          break;

        case 1:
          buffer = this._reader.read(1);
          if (buffer) this._parseLength(buffer[0]);
          break;

        case 2:
          buffer = this._reader.read(this._frame.lengthBytes);
          if (buffer) this._parseExtendedLength(buffer);
          break;

        case 3:
          buffer = this._reader.read(4);
          if (buffer) {
            this._stage = 4;
            this._frame.maskingKey = buffer;
          }
          break;

        case 4:
          buffer = this._reader.read(this._frame.length);
          if (buffer) {
            this._stage = 0;
            this._emitFrame(buffer);
          }
          break;

        default:
          buffer = null;
      }
    }
  },

  text: function(message) {
    if (this.readyState > 1) return false;
    return this.frame(message, 'text');
  },

  binary: function(message) {
    if (this.readyState > 1) return false;
    return this.frame(message, 'binary');
  },

  ping: function(message, callback) {
    if (this.readyState > 1) return false;
    message = message || '';
    if (callback) this._pingCallbacks[message] = callback;
    return this.frame(message, 'ping');
  },

  pong: function(message) {
      if (this.readyState > 1) return false;
      message = message ||'';
      return this.frame(message, 'pong');
  },

  close: function(reason, code) {
    reason = reason || '';
    code   = code   || this.ERRORS.normal_closure;

    if (this.readyState <= 0) {
      this.readyState = 3;
      this.emit('close', new base.CloseEvent(code, reason));
      return true;
    } else if (this.readyState === 1) {
      this.readyState = 2;
      this._extensions.close(function() { this.frame(reason, 'close', code); }, this);
      return true;
    } else {
      return false;
    }
  },

  frame: function(buffer, type, code) {
    if (this.readyState <= 0) return this._queue([buffer, type, code]);
    if (this.readyState > 2) return false;

    if (buffer instanceof Array)    buffer = Buffer$5.from(buffer);
    if (typeof buffer === 'number') buffer = buffer.toString();

    var message$1 = new message(),
        isText  = (typeof buffer === 'string'),
        payload, copy;

    message$1.rsv1   = message$1.rsv2 = message$1.rsv3 = false;
    message$1.opcode = this.OPCODES[type || (isText ? 'text' : 'binary')];

    payload = isText ? Buffer$5.from(buffer, 'utf8') : buffer;

    if (code) {
      copy = payload;
      payload = Buffer$5.allocUnsafe(2 + copy.length);
      payload.writeUInt16BE(code, 0);
      copy.copy(payload, 2);
    }
    message$1.data = payload;

    var onMessageReady = function(message) {
      var frame$1 = new frame();

      frame$1.final   = true;
      frame$1.rsv1    = message.rsv1;
      frame$1.rsv2    = message.rsv2;
      frame$1.rsv3    = message.rsv3;
      frame$1.opcode  = message.opcode;
      frame$1.masked  = !!this._masking;
      frame$1.length  = message.data.length;
      frame$1.payload = message.data;

      if (frame$1.masked) frame$1.maskingKey = crypto.randomBytes(4);

      this._sendFrame(frame$1);
    };

    if (this.MESSAGE_OPCODES.indexOf(message$1.opcode) >= 0)
      this._extensions.processOutgoingMessage(message$1, function(error, message) {
        if (error) return this._fail('extension_error', error.message);
        onMessageReady.call(this, message);
      }, this);
    else
      onMessageReady.call(this, message$1);

    return true;
  },

  _sendFrame: function(frame) {
    var length = frame.length,
        header = (length <= 125) ? 2 : (length <= 65535 ? 4 : 10),
        offset = header + (frame.masked ? 4 : 0),
        buffer = Buffer$5.allocUnsafe(offset + length),
        masked = frame.masked ? this.MASK : 0;

    buffer[0] = (frame.final ? this.FIN : 0) |
                (frame.rsv1 ? this.RSV1 : 0) |
                (frame.rsv2 ? this.RSV2 : 0) |
                (frame.rsv3 ? this.RSV3 : 0) |
                frame.opcode;

    if (length <= 125) {
      buffer[1] = masked | length;
    } else if (length <= 65535) {
      buffer[1] = masked | 126;
      buffer.writeUInt16BE(length, 2);
    } else {
      buffer[1] = masked | 127;
      buffer.writeUInt32BE(Math.floor(length / 0x100000000), 2);
      buffer.writeUInt32BE(length % 0x100000000, 6);
    }

    frame.payload.copy(buffer, offset);

    if (frame.masked) {
      frame.maskingKey.copy(buffer, header);
      Hybi.mask(buffer, frame.maskingKey, offset);
    }

    this._write(buffer);
  },

  _handshakeResponse: function() {
    var secKey  = this._request.headers['sec-websocket-key'],
        version = this._request.headers['sec-websocket-version'];

    if (version !== Hybi.VERSION)
      throw new Error('Unsupported WebSocket version: ' + version);

    if (typeof secKey !== 'string')
      throw new Error('Missing handshake request header: Sec-WebSocket-Key');

    this._headers.set('Upgrade', 'websocket');
    this._headers.set('Connection', 'Upgrade');
    this._headers.set('Sec-WebSocket-Accept', Hybi.generateAccept(secKey));

    if (this.protocol) this._headers.set('Sec-WebSocket-Protocol', this.protocol);

    var extensions = this._extensions.generateResponse(this._request.headers['sec-websocket-extensions']);
    if (extensions) this._headers.set('Sec-WebSocket-Extensions', extensions);

    var start   = 'HTTP/1.1 101 Switching Protocols',
        headers = [start, this._headers.toString(), ''];

    return Buffer$5.from(headers.join('\r\n'), 'utf8');
  },

  _shutdown: function(code, reason, error) {
    delete this._frame;
    delete this._message;
    this._stage = 5;

    var sendCloseFrame = (this.readyState === 1);
    this.readyState = 2;

    this._extensions.close(function() {
      if (sendCloseFrame) this.frame(reason, 'close', code);
      this.readyState = 3;
      if (error) this.emit('error', new Error(reason));
      this.emit('close', new base.CloseEvent(code, reason));
    }, this);
  },

  _fail: function(type, message) {
    if (this.readyState > 1) return;
    this._shutdown(this.ERRORS[type], message, true);
  },

  _parseOpcode: function(octet) {
    var rsvs = [this.RSV1, this.RSV2, this.RSV3].map(function(rsv) {
      return (octet & rsv) === rsv;
    });

    var frame$1 = this._frame = new frame();

    frame$1.final  = (octet & this.FIN) === this.FIN;
    frame$1.rsv1   = rsvs[0];
    frame$1.rsv2   = rsvs[1];
    frame$1.rsv3   = rsvs[2];
    frame$1.opcode = (octet & this.OPCODE);

    this._stage = 1;

    if (!this._extensions.validFrameRsv(frame$1))
      return this._fail('protocol_error',
          'One or more reserved bits are on: reserved1 = ' + (frame$1.rsv1 ? 1 : 0) +
          ', reserved2 = ' + (frame$1.rsv2 ? 1 : 0) +
          ', reserved3 = ' + (frame$1.rsv3 ? 1 : 0));

    if (this.OPCODE_CODES.indexOf(frame$1.opcode) < 0)
      return this._fail('protocol_error', 'Unrecognized frame opcode: ' + frame$1.opcode);

    if (this.MESSAGE_OPCODES.indexOf(frame$1.opcode) < 0 && !frame$1.final)
      return this._fail('protocol_error', 'Received fragmented control frame: opcode = ' + frame$1.opcode);

    if (this._message && this.OPENING_OPCODES.indexOf(frame$1.opcode) >= 0)
      return this._fail('protocol_error', 'Received new data frame but previous continuous frame is unfinished');
  },

  _parseLength: function(octet) {
    var frame = this._frame;
    frame.masked = (octet & this.MASK) === this.MASK;
    frame.length = (octet & this.LENGTH);

    if (frame.length >= 0 && frame.length <= 125) {
      this._stage = frame.masked ? 3 : 4;
      if (!this._checkFrameLength()) return;
    } else {
      this._stage = 2;
      frame.lengthBytes = (frame.length === 126 ? 2 : 8);
    }

    if (this._requireMasking && !frame.masked)
      return this._fail('unacceptable', 'Received unmasked frame but masking is required');
  },

  _parseExtendedLength: function(buffer) {
    var frame = this._frame;
    frame.length = this._readUInt(buffer);

    this._stage = frame.masked ? 3 : 4;

    if (this.MESSAGE_OPCODES.indexOf(frame.opcode) < 0 && frame.length > 125)
      return this._fail('protocol_error', 'Received control frame having too long payload: ' + frame.length);

    if (!this._checkFrameLength()) return;
  },

  _checkFrameLength: function() {
    var length = this._message ? this._message.length : 0;

    if (length + this._frame.length > this._maxLength) {
      this._fail('too_large', 'WebSocket frame length too large');
      return false;
    } else {
      return true;
    }
  },

  _emitFrame: function(buffer) {
    var frame   = this._frame,
        payload = frame.payload = Hybi.mask(buffer, frame.maskingKey),
        opcode  = frame.opcode,
        message$1,
        code, reason,
        callbacks, callback;

    delete this._frame;

    if (opcode === this.OPCODES.continuation) {
      if (!this._message) return this._fail('protocol_error', 'Received unexpected continuation frame');
      this._message.pushFrame(frame);
    }

    if (opcode === this.OPCODES.text || opcode === this.OPCODES.binary) {
      this._message = new message();
      this._message.pushFrame(frame);
    }

    if (frame.final && this.MESSAGE_OPCODES.indexOf(opcode) >= 0)
      return this._emitMessage(this._message);

    if (opcode === this.OPCODES.close) {
      code   = (payload.length >= 2) ? payload.readUInt16BE(0) : null;
      reason = (payload.length > 2) ? this._encode(payload.slice(2)) : null;

      if (!(payload.length === 0) &&
          !(code !== null && code >= this.MIN_RESERVED_ERROR && code <= this.MAX_RESERVED_ERROR) &&
          this.ERROR_CODES.indexOf(code) < 0)
        code = this.ERRORS.protocol_error;

      if (payload.length > 125 || (payload.length > 2 && !reason))
        code = this.ERRORS.protocol_error;

      this._shutdown(code || this.DEFAULT_ERROR_CODE, reason || '');
    }

    if (opcode === this.OPCODES.ping) {
      this.frame(payload, 'pong');
      this.emit('ping', new base.PingEvent(payload.toString()));
    }

    if (opcode === this.OPCODES.pong) {
      callbacks = this._pingCallbacks;
      message$1   = this._encode(payload);
      callback  = callbacks[message$1];

      delete callbacks[message$1];
      if (callback) callback();

      this.emit('pong', new base.PongEvent(payload.toString()));
    }
  },

  _emitMessage: function(message) {
    var message = this._message;
    message.read();

    delete this._message;

    this._extensions.processIncomingMessage(message, function(error, message) {
      if (error) return this._fail('extension_error', error.message);

      var payload = message.data;
      if (message.opcode === this.OPCODES.text) payload = this._encode(payload);

      if (payload === null)
        return this._fail('encoding_error', 'Could not decode a text frame as UTF-8');
      else
        this.emit('message', new base.MessageEvent(payload));
    }, this);
  },

  _encode: function(buffer) {
    try {
      var string = buffer.toString('binary', 0, buffer.length);
      if (!this.UTF8_MATCH.test(string)) return null;
    } catch (e) {}
    return buffer.toString('utf8', 0, buffer.length);
  },

  _readUInt: function(buffer) {
    if (buffer.length === 2) return buffer.readUInt16BE(0);

    return buffer.readUInt32BE(0) * 0x100000000 +
           buffer.readUInt32BE(4);
  }
};

for (var key$4 in instance$4)
  Hybi.prototype[key$4] = instance$4[key$4];

var hybi = Hybi;

var Buffer$6     = safeBuffer.Buffer,
    Stream$1     = stream.Stream;

var PORTS = { 'ws:': 80, 'wss:': 443 };

var Proxy = function(client, origin, options) {
  this._client  = client;
  this._http    = new http_parser('response');
  this._origin  = (typeof client.url === 'object') ? client.url : url.parse(client.url);
  this._url     = (typeof origin === 'object') ? origin : url.parse(origin);
  this._options = options || {};
  this._state   = 0;

  this.readable = this.writable = true;
  this._paused  = false;

  this._headers = new headers();
  this._headers.set('Host', this._origin.host);
  this._headers.set('Connection', 'keep-alive');
  this._headers.set('Proxy-Connection', 'keep-alive');

  var auth = this._url.auth && Buffer$6.from(this._url.auth, 'utf8').toString('base64');
  if (auth) this._headers.set('Proxy-Authorization', 'Basic ' + auth);
};
util.inherits(Proxy, Stream$1);

var instance$5 = {
  setHeader: function(name, value) {
    if (this._state !== 0) return false;
    this._headers.set(name, value);
    return true;
  },

  start: function() {
    if (this._state !== 0) return false;
    this._state = 1;

    var origin = this._origin,
        port   = origin.port || PORTS[origin.protocol],
        start  = 'CONNECT ' + origin.hostname + ':' + port + ' HTTP/1.1';

    var headers = [start, this._headers.toString(), ''];

    this.emit('data', Buffer$6.from(headers.join('\r\n'), 'utf8'));
    return true;
  },

  pause: function() {
    this._paused = true;
  },

  resume: function() {
    this._paused = false;
    this.emit('drain');
  },

  write: function(chunk) {
    if (!this.writable) return false;

    this._http.parse(chunk);
    if (!this._http.isComplete()) return !this._paused;

    this.statusCode = this._http.statusCode;
    this.headers    = this._http.headers;

    if (this.statusCode === 200) {
      this.emit('connect', new base.ConnectEvent());
    } else {
      var message = "Can't establish a connection to the server at " + this._origin.href;
      this.emit('error', new Error(message));
    }
    this.end();
    return !this._paused;
  },

  end: function(chunk) {
    if (!this.writable) return;
    if (chunk !== undefined) this.write(chunk);
    this.readable = this.writable = false;
    this.emit('close');
    this.emit('end');
  },

  destroy: function() {
    this.end();
  }
};

for (var key$5 in instance$5)
  Proxy.prototype[key$5] = instance$5[key$5];

var proxy = Proxy;

var Buffer$7     = safeBuffer.Buffer;

var Client = function(_url, options) {
  this.version = 'hybi-' + hybi.VERSION;
  hybi.call(this, null, _url, options);

  this.readyState = -1;
  this._key       = Client.generateKey();
  this._accept    = hybi.generateAccept(this._key);
  this._http      = new http_parser('response');

  var uri  = url.parse(this.url),
      auth = uri.auth && Buffer$7.from(uri.auth, 'utf8').toString('base64');

  if (this.VALID_PROTOCOLS.indexOf(uri.protocol) < 0)
    throw new Error(this.url + ' is not a valid WebSocket URL');

  this._pathname = (uri.pathname || '/') + (uri.search || '');

  this._headers.set('Host', uri.host);
  this._headers.set('Upgrade', 'websocket');
  this._headers.set('Connection', 'Upgrade');
  this._headers.set('Sec-WebSocket-Key', this._key);
  this._headers.set('Sec-WebSocket-Version', hybi.VERSION);

  if (this._protocols.length > 0)
    this._headers.set('Sec-WebSocket-Protocol', this._protocols.join(', '));

  if (auth)
    this._headers.set('Authorization', 'Basic ' + auth);
};
util.inherits(Client, hybi);

Client.generateKey = function() {
  return crypto.randomBytes(16).toString('base64');
};

var instance$6 = {
  VALID_PROTOCOLS: ['ws:', 'wss:'],

  proxy: function(origin, options) {
    return new proxy(this, origin, options);
  },

  start: function() {
    if (this.readyState !== -1) return false;
    this._write(this._handshakeRequest());
    this.readyState = 0;
    return true;
  },

  parse: function(chunk) {
    if (this.readyState === 3) return;
    if (this.readyState > 0) return hybi.prototype.parse.call(this, chunk);

    this._http.parse(chunk);
    if (!this._http.isComplete()) return;

    this._validateHandshake();
    if (this.readyState === 3) return;

    this._open();
    this.parse(this._http.body);
  },

  _handshakeRequest: function() {
    var extensions = this._extensions.generateOffer();
    if (extensions)
      this._headers.set('Sec-WebSocket-Extensions', extensions);

    var start   = 'GET ' + this._pathname + ' HTTP/1.1',
        headers = [start, this._headers.toString(), ''];

    return Buffer$7.from(headers.join('\r\n'), 'utf8');
  },

  _failHandshake: function(message) {
    message = 'Error during WebSocket handshake: ' + message;
    this.readyState = 3;
    this.emit('error', new Error(message));
    this.emit('close', new base.CloseEvent(this.ERRORS.protocol_error, message));
  },

  _validateHandshake: function() {
    this.statusCode = this._http.statusCode;
    this.headers    = this._http.headers;

    if (this._http.error)
      return this._failHandshake(this._http.error.message);

    if (this._http.statusCode !== 101)
      return this._failHandshake('Unexpected response code: ' + this._http.statusCode);

    var headers    = this._http.headers,
        upgrade    = headers['upgrade'] || '',
        connection = headers['connection'] || '',
        accept     = headers['sec-websocket-accept'] || '',
        protocol   = headers['sec-websocket-protocol'] || '';

    if (upgrade === '')
      return this._failHandshake("'Upgrade' header is missing");
    if (upgrade.toLowerCase() !== 'websocket')
      return this._failHandshake("'Upgrade' header value is not 'WebSocket'");

    if (connection === '')
      return this._failHandshake("'Connection' header is missing");
    if (connection.toLowerCase() !== 'upgrade')
      return this._failHandshake("'Connection' header value is not 'Upgrade'");

    if (accept !== this._accept)
      return this._failHandshake('Sec-WebSocket-Accept mismatch');

    this.protocol = null;

    if (protocol !== '') {
      if (this._protocols.indexOf(protocol) < 0)
        return this._failHandshake('Sec-WebSocket-Protocol mismatch');
      else
        this.protocol = protocol;
    }

    try {
      this._extensions.activate(this.headers['sec-websocket-extensions']);
    } catch (e) {
      return this._failHandshake(e.message);
    }
  }
};

for (var key$6 in instance$6)
  Client.prototype[key$6] = instance$6[key$6];

var client = Client;

var Buffer$8 = safeBuffer.Buffer;

var Draft75 = function(request, url, options) {
  base.apply(this, arguments);
  this._stage  = 0;
  this.version = 'hixie-75';

  this._headers.set('Upgrade', 'WebSocket');
  this._headers.set('Connection', 'Upgrade');
  this._headers.set('WebSocket-Origin', this._request.headers.origin);
  this._headers.set('WebSocket-Location', this.url);
};
util.inherits(Draft75, base);

var instance$7 = {
  close: function() {
    if (this.readyState === 3) return false;
    this.readyState = 3;
    this.emit('close', new base.CloseEvent(null, null));
    return true;
  },

  parse: function(chunk) {
    if (this.readyState > 1) return;

    this._reader.put(chunk);

    this._reader.eachByte(function(octet) {
      var message;

      switch (this._stage) {
        case -1:
          this._body.push(octet);
          this._sendHandshakeBody();
          break;

        case 0:
          this._parseLeadingByte(octet);
          break;

        case 1:
          this._length = (octet & 0x7F) + 128 * this._length;

          if (this._closing && this._length === 0) {
            return this.close();
          }
          else if ((octet & 0x80) !== 0x80) {
            if (this._length === 0) {
              this._stage = 0;
            }
            else {
              this._skipped = 0;
              this._stage   = 2;
            }
          }
          break;

        case 2:
          if (octet === 0xFF) {
            this._stage = 0;
            message = Buffer$8.from(this._buffer).toString('utf8', 0, this._buffer.length);
            this.emit('message', new base.MessageEvent(message));
          }
          else {
            if (this._length) {
              this._skipped += 1;
              if (this._skipped === this._length)
                this._stage = 0;
            } else {
              this._buffer.push(octet);
              if (this._buffer.length > this._maxLength) return this.close();
            }
          }
          break;
      }
    }, this);
  },

  frame: function(buffer) {
    if (this.readyState === 0) return this._queue([buffer]);
    if (this.readyState > 1) return false;

    if (typeof buffer !== 'string') buffer = buffer.toString();

    var length = Buffer$8.byteLength(buffer),
        frame  = Buffer$8.allocUnsafe(length + 2);

    frame[0] = 0x00;
    frame.write(buffer, 1);
    frame[frame.length - 1] = 0xFF;

    this._write(frame);
    return true;
  },

  _handshakeResponse: function() {
    var start   = 'HTTP/1.1 101 Web Socket Protocol Handshake',
        headers = [start, this._headers.toString(), ''];

    return Buffer$8.from(headers.join('\r\n'), 'utf8');
  },

  _parseLeadingByte: function(octet) {
    if ((octet & 0x80) === 0x80) {
      this._length = 0;
      this._stage  = 1;
    } else {
      delete this._length;
      delete this._skipped;
      this._buffer = [];
      this._stage  = 2;
    }
  }
};

for (var key$7 in instance$7)
  Draft75.prototype[key$7] = instance$7[key$7];

var draft75 = Draft75;

var Buffer$9  = safeBuffer.Buffer;


var numberFromKey = function(key) {
  return parseInt((key.match(/[0-9]/g) || []).join(''), 10);
};

var spacesInKey = function(key) {
  return (key.match(/ /g) || []).length;
};


var Draft76 = function(request, url, options) {
  draft75.apply(this, arguments);
  this._stage  = -1;
  this._body   = [];
  this.version = 'hixie-76';

  this._headers.clear();

  this._headers.set('Upgrade', 'WebSocket');
  this._headers.set('Connection', 'Upgrade');
  this._headers.set('Sec-WebSocket-Origin', this._request.headers.origin);
  this._headers.set('Sec-WebSocket-Location', this.url);
};
util.inherits(Draft76, draft75);

var instance$8 = {
  BODY_SIZE: 8,

  start: function() {
    if (!draft75.prototype.start.call(this)) return false;
    this._started = true;
    this._sendHandshakeBody();
    return true;
  },

  close: function() {
    if (this.readyState === 3) return false;
    if (this.readyState === 1) this._write(Buffer$9.from([0xFF, 0x00]));
    this.readyState = 3;
    this.emit('close', new base.CloseEvent(null, null));
    return true;
  },

  _handshakeResponse: function() {
    var headers = this._request.headers,
        key1    = headers['sec-websocket-key1'],
        key2    = headers['sec-websocket-key2'];

    if (!key1) throw new Error('Missing required header: Sec-WebSocket-Key1');
    if (!key2) throw new Error('Missing required header: Sec-WebSocket-Key2');

    var number1 = numberFromKey(key1),
        spaces1 = spacesInKey(key1),

        number2 = numberFromKey(key2),
        spaces2 = spacesInKey(key2);

    if (number1 % spaces1 !== 0 || number2 % spaces2 !== 0)
      throw new Error('Client sent invalid Sec-WebSocket-Key headers');

    this._keyValues = [number1 / spaces1, number2 / spaces2];

    var start   = 'HTTP/1.1 101 WebSocket Protocol Handshake',
        headers = [start, this._headers.toString(), ''];

    return Buffer$9.from(headers.join('\r\n'), 'binary');
  },

  _handshakeSignature: function() {
    if (this._body.length < this.BODY_SIZE) return null;

    var md5    = crypto.createHash('md5'),
        buffer = Buffer$9.allocUnsafe(8 + this.BODY_SIZE);

    buffer.writeUInt32BE(this._keyValues[0], 0);
    buffer.writeUInt32BE(this._keyValues[1], 4);
    Buffer$9.from(this._body).copy(buffer, 8, 0, this.BODY_SIZE);

    md5.update(buffer);
    return Buffer$9.from(md5.digest('binary'), 'binary');
  },

  _sendHandshakeBody: function() {
    if (!this._started) return;
    var signature = this._handshakeSignature();
    if (!signature) return;

    this._write(signature);
    this._stage = 0;
    this._open();

    if (this._body.length > this.BODY_SIZE)
      this.parse(this._body.slice(this.BODY_SIZE));
  },

  _parseLeadingByte: function(octet) {
    if (octet !== 0xFF)
      return draft75.prototype._parseLeadingByte.call(this, octet);

    this._closing = true;
    this._length  = 0;
    this._stage   = 1;
  }
};

for (var key$8 in instance$8)
  Draft76.prototype[key$8] = instance$8[key$8];

var draft76 = Draft76;

var Server = function(options) {
  base.call(this, null, null, options);
  this._http = new http_parser('request');
};
util.inherits(Server, base);

var instance$9 = {
  EVENTS: ['open', 'message', 'error', 'close', 'ping', 'pong'],

  _bindEventListeners: function() {
    this.messages.on('error', function() {});
    this.on('error', function() {});
  },

  parse: function(chunk) {
    if (this._delegate) return this._delegate.parse(chunk);

    this._http.parse(chunk);
    if (!this._http.isComplete()) return;

    this.method  = this._http.method;
    this.url     = this._http.url;
    this.headers = this._http.headers;
    this.body    = this._http.body;

    var self = this;
    this._delegate = Server.http(this, this._options);
    this._delegate.messages = this.messages;
    this._delegate.io = this.io;
    this._open();

    this.EVENTS.forEach(function(event) {
      this._delegate.on(event, function(e) { self.emit(event, e); });
    }, this);

    this.protocol = this._delegate.protocol;
    this.version  = this._delegate.version;

    this.parse(this._http.body);
    this.emit('connect', new base.ConnectEvent());
  },

  _open: function() {
    this.__queue.forEach(function(msg) {
      this._delegate[msg[0]].apply(this._delegate, msg[1]);
    }, this);
    this.__queue = [];
  }
};

['addExtension', 'setHeader', 'start', 'frame', 'text', 'binary', 'ping', 'close'].forEach(function(method) {
  instance$9[method] = function() {
    if (this._delegate) {
      return this._delegate[method].apply(this._delegate, arguments);
    } else {
      this.__queue.push([method, arguments]);
      return true;
    }
  };
});

for (var key$9 in instance$9)
  Server.prototype[key$9] = instance$9[key$9];

Server.isSecureRequest = function(request) {
  if (request.connection && request.connection.authorized !== undefined) return true;
  if (request.socket && request.socket.secure) return true;

  var headers = request.headers;
  if (!headers) return false;
  if (headers['https'] === 'on') return true;
  if (headers['x-forwarded-ssl'] === 'on') return true;
  if (headers['x-forwarded-scheme'] === 'https') return true;
  if (headers['x-forwarded-proto'] === 'https') return true;

  return false;
};

Server.determineUrl = function(request) {
  var scheme = this.isSecureRequest(request) ? 'wss:' : 'ws:';
  return scheme + '//' + request.headers.host + request.url;
};

Server.http = function(request, options) {
  options = options || {};
  if (options.requireMasking === undefined) options.requireMasking = true;

  var headers = request.headers,
      version = headers['sec-websocket-version'],
      key     = headers['sec-websocket-key'],
      key1    = headers['sec-websocket-key1'],
      key2    = headers['sec-websocket-key2'],
      url     = this.determineUrl(request);

  if (version || key)
    return new hybi(request, url, options);
  else if (key1 || key2)
    return new draft76(request, url, options);
  else
    return new draft75(request, url, options);
};

var server = Server;

// Protocol references:
//
// * http://tools.ietf.org/html/draft-hixie-thewebsocketprotocol-75
// * http://tools.ietf.org/html/draft-hixie-thewebsocketprotocol-76
// * http://tools.ietf.org/html/draft-ietf-hybi-thewebsocketprotocol-17



var Driver = {
  client: function(url, options) {
    options = options || {};
    if (options.masking === undefined) options.masking = true;
    return new client(url, options);
  },

  server: function(options) {
    options = options || {};
    if (options.requireMasking === undefined) options.requireMasking = true;
    return new server(options);
  },

  http: function() {
    return server.http.apply(server, arguments);
  },

  isSecureRequest: function(request) {
    return server.isSecureRequest(request);
  },

  isWebSocket: function(request) {
    return base.isWebSocket(request);
  },

  validateOptions: function(options, validKeys) {
    base.validateOptions(options, validKeys);
  }
};

var driver = Driver;

var Event = function(eventType, options) {
  this.type = eventType;
  for (var key in options)
    this[key] = options[key];
};

Event.prototype.initEvent = function(eventType, canBubble, cancelable) {
  this.type       = eventType;
  this.bubbles    = canBubble;
  this.cancelable = cancelable;
};

Event.prototype.stopPropagation = function() {};
Event.prototype.preventDefault  = function() {};

Event.CAPTURING_PHASE = 1;
Event.AT_TARGET       = 2;
Event.BUBBLING_PHASE  = 3;

var event = Event;

var EventTarget = {
  onopen:     null,
  onmessage:  null,
  onerror:    null,
  onclose:    null,

  addEventListener: function(eventType, listener, useCapture) {
    this.on(eventType, listener);
  },

  removeEventListener: function(eventType, listener, useCapture) {
    this.removeListener(eventType, listener);
  },

  dispatchEvent: function(event$1) {
    event$1.target = event$1.currentTarget = this;
    event$1.eventPhase = event.AT_TARGET;

    if (this['on' + event$1.type])
      this['on' + event$1.type](event$1);

    this.emit(event$1.type, event$1);
  }
};

var event_target = EventTarget;

var Stream$2      = stream.Stream;

var API = function(options) {
  options = options || {};
  driver.validateOptions(options, ['headers', 'extensions', 'maxLength', 'ping', 'proxy', 'tls', 'ca']);

  this.readable = this.writable = true;

  var headers = options.headers;
  if (headers) {
    for (var name in headers) this._driver.setHeader(name, headers[name]);
  }

  var extensions = options.extensions;
  if (extensions) {
    [].concat(extensions).forEach(this._driver.addExtension, this._driver);
  }

  this._ping          = options.ping;
  this._pingId        = 0;
  this.readyState     = API.CONNECTING;
  this.bufferedAmount = 0;
  this.protocol       = '';
  this.url            = this._driver.url;
  this.version        = this._driver.version;

  var self = this;

  this._driver.on('open',    function(e) { self._open(); });
  this._driver.on('message', function(e) { self._receiveMessage(e.data); });
  this._driver.on('close',   function(e) { self._beginClose(e.reason, e.code); });

  this._driver.on('error', function(error) {
    self._emitError(error.message);
  });
  this.on('error', function() {});

  this._driver.messages.on('drain', function() {
    self.emit('drain');
  });

  if (this._ping)
    this._pingTimer = setInterval(function() {
      self._pingId += 1;
      self.ping(self._pingId.toString());
    }, this._ping * 1000);

  this._configureStream();

  if (!this._proxy) {
    this._stream.pipe(this._driver.io);
    this._driver.io.pipe(this._stream);
  }
};
util.inherits(API, Stream$2);

API.CONNECTING = 0;
API.OPEN       = 1;
API.CLOSING    = 2;
API.CLOSED     = 3;

var instance$a = {
  write: function(data) {
    return this.send(data);
  },

  end: function(data) {
    if (data !== undefined) this.send(data);
    this.close();
  },

  pause: function() {
    return this._driver.messages.pause();
  },

  resume: function() {
    return this._driver.messages.resume();
  },

  send: function(data) {
    if (this.readyState > API.OPEN) return false;
    if (!(data instanceof Buffer)) data = String(data);
    return this._driver.messages.write(data);
  },

  ping: function(message, callback) {
    if (this.readyState > API.OPEN) return false;
    return this._driver.ping(message, callback);
  },

  close: function(code, reason) {
    if (code === undefined) code = 1000;
    if (reason === undefined) reason = '';

    if (code !== 1000 && (code < 3000 || code > 4999))
      throw new Error("Failed to execute 'close' on WebSocket: " +
                      "The code must be either 1000, or between 3000 and 4999. " +
                      code + " is neither.");

    if (this.readyState !== API.CLOSED) this.readyState = API.CLOSING;
    this._driver.close(reason, code);
  },

  _configureStream: function() {
    var self = this;

    this._stream.setTimeout(0);
    this._stream.setNoDelay(true);

    ['close', 'end'].forEach(function(event) {
      this._stream.on(event, function() { self._finalizeClose(); });
    }, this);

    this._stream.on('error', function(error) {
      self._emitError('Network error: ' + self.url + ': ' + error.message);
      self._finalizeClose();
    });
  },

 _open: function() {
    if (this.readyState !== API.CONNECTING) return;

    this.readyState = API.OPEN;
    this.protocol = this._driver.protocol || '';

    var event$1 = new event('open');
    event$1.initEvent('open', false, false);
    this.dispatchEvent(event$1);
  },

  _receiveMessage: function(data) {
    if (this.readyState > API.OPEN) return false;

    if (this.readable) this.emit('data', data);

    var event$1 = new event('message', {data: data});
    event$1.initEvent('message', false, false);
    this.dispatchEvent(event$1);
  },

  _emitError: function(message) {
    if (this.readyState >= API.CLOSING) return;

    var event$1 = new event('error', {message: message});
    event$1.initEvent('error', false, false);
    this.dispatchEvent(event$1);
  },

  _beginClose: function(reason, code) {
    if (this.readyState === API.CLOSED) return;
    this.readyState = API.CLOSING;
    this._closeParams = [reason, code];

    if (this._stream) {
      this._stream.end();
      if (!this._stream.readable) this._finalizeClose();
    }
  },

  _finalizeClose: function() {
    if (this.readyState === API.CLOSED) return;
    this.readyState = API.CLOSED;

    if (this._pingTimer) clearInterval(this._pingTimer);
    if (this._stream) this._stream.end();

    if (this.readable) this.emit('end');
    this.readable = this.writable = false;

    var reason = this._closeParams ? this._closeParams[0] : '',
        code   = this._closeParams ? this._closeParams[1] : 1006;

    var event$1 = new event('close', {code: code, reason: reason});
    event$1.initEvent('close', false, false);
    this.dispatchEvent(event$1);
  }
};

for (var method in instance$a) API.prototype[method] = instance$a[method];
for (var key$a in event_target) API.prototype[key$a] = event_target[key$a];

var api = API;

var DEFAULT_PORTS    = {'http:': 80, 'https:': 443, 'ws:':80, 'wss:': 443},
    SECURE_PROTOCOLS = ['https:', 'wss:'];

var Client$1 = function(_url, protocols, options) {
  options = options || {};

  this.url     = _url;
  this._driver = driver.client(this.url, {maxLength: options.maxLength, protocols: protocols});

  ['open', 'error'].forEach(function(event) {
    this._driver.on(event, function() {
      self.headers    = self._driver.headers;
      self.statusCode = self._driver.statusCode;
    });
  }, this);

  var proxy     = options.proxy || {},
      endpoint  = url.parse(proxy.origin || this.url),
      port      = endpoint.port || DEFAULT_PORTS[endpoint.protocol],
      secure    = SECURE_PROTOCOLS.indexOf(endpoint.protocol) >= 0,
      onConnect = function() { self._onConnect(); },
      originTLS = options.tls || {},
      socketTLS = proxy.origin ? (proxy.tls || {}) : originTLS,
      self      = this;

  originTLS.ca = originTLS.ca || options.ca;

  this._stream = secure
               ? tls.connect(port, endpoint.hostname, socketTLS, onConnect)
               : net.connect(port, endpoint.hostname, onConnect);

  if (proxy.origin) this._configureProxy(proxy, originTLS);

  api.call(this, options);
};
util.inherits(Client$1, api);

Client$1.prototype._onConnect = function() {
  var worker = this._proxy || this._driver;
  worker.start();
};

Client$1.prototype._configureProxy = function(proxy, originTLS) {
  var uri    = url.parse(this.url),
      secure = SECURE_PROTOCOLS.indexOf(uri.protocol) >= 0,
      self   = this,
      name;

  this._proxy = this._driver.proxy(proxy.origin);

  if (proxy.headers) {
    for (name in proxy.headers) this._proxy.setHeader(name, proxy.headers[name]);
  }

  this._proxy.pipe(this._stream, {end: false});
  this._stream.pipe(this._proxy);

  this._proxy.on('connect', function() {
    if (secure) {
      var options = {socket: self._stream, servername: uri.hostname};
      for (name in originTLS) options[name] = originTLS[name];
      self._stream = tls.connect(options);
      self._configureStream();
    }
    self._driver.io.pipe(self._stream);
    self._stream.pipe(self._driver.io);
    self._driver.start();
  });

  this._proxy.on('error', function(error) {
    self._driver.emit('error', error);
  });
};

var client$1 = Client$1;

var Stream$3      = stream.Stream;

var EventSource = function(request, response, options) {
  this.writable = true;
  options = options || {};

  this._stream = response.socket;
  this._ping   = options.ping  || this.DEFAULT_PING;
  this._retry  = options.retry || this.DEFAULT_RETRY;

  var scheme       = driver.isSecureRequest(request) ? 'https:' : 'http:';
  this.url         = scheme + '//' + request.headers.host + request.url;
  this.lastEventId = request.headers['last-event-id'] || '';
  this.readyState  = api.CONNECTING;

  var headers$1 = new headers(),
      self    = this;

  if (options.headers) {
    for (var key in options.headers) headers$1.set(key, options.headers[key]);
  }

  if (!this._stream || !this._stream.writable) return;
  process.nextTick(function() { self._open(); });

  this._stream.setTimeout(0);
  this._stream.setNoDelay(true);

  var handshake = 'HTTP/1.1 200 OK\r\n' +
                  'Content-Type: text/event-stream\r\n' +
                  'Cache-Control: no-cache, no-store\r\n' +
                  'Connection: close\r\n' +
                  headers$1.toString() +
                  '\r\n' +
                  'retry: ' + Math.floor(this._retry * 1000) + '\r\n\r\n';

  this._write(handshake);

  this._stream.on('drain', function() { self.emit('drain'); });

  if (this._ping)
    this._pingTimer = setInterval(function() { self.ping(); }, this._ping * 1000);

  ['error', 'end'].forEach(function(event) {
    self._stream.on(event, function() { self.close(); });
  });
};
util.inherits(EventSource, Stream$3);

EventSource.isEventSource = function(request) {
  if (request.method !== 'GET') return false;
  var accept = (request.headers.accept || '').split(/\s*,\s*/);
  return accept.indexOf('text/event-stream') >= 0;
};

var instance$b = {
  DEFAULT_PING:   10,
  DEFAULT_RETRY:  5,

  _write: function(chunk) {
    if (!this.writable) return false;
    try {
      return this._stream.write(chunk, 'utf8');
    } catch (e) {
      return false;
    }
  },

  _open: function() {
    if (this.readyState !== api.CONNECTING) return;

    this.readyState = api.OPEN;

    var event$1 = new event('open');
    event$1.initEvent('open', false, false);
    this.dispatchEvent(event$1);
  },

  write: function(message) {
    return this.send(message);
  },

  end: function(message) {
    if (message !== undefined) this.write(message);
    this.close();
  },

  send: function(message, options) {
    if (this.readyState > api.OPEN) return false;

    message = String(message).replace(/(\r\n|\r|\n)/g, '$1data: ');
    options = options || {};

    var frame = '';
    if (options.event) frame += 'event: ' + options.event + '\r\n';
    if (options.id)    frame += 'id: '    + options.id    + '\r\n';
    frame += 'data: ' + message + '\r\n\r\n';

    return this._write(frame);
  },

  ping: function() {
    return this._write(':\r\n\r\n');
  },

  close: function() {
    if (this.readyState > api.OPEN) return false;

    this.readyState = api.CLOSED;
    this.writable = false;
    if (this._pingTimer) clearInterval(this._pingTimer);
    if (this._stream) this._stream.end();

    var event$1 = new event('close');
    event$1.initEvent('close', false, false);
    this.dispatchEvent(event$1);

    return true;
  }
};

for (var method$1 in instance$b) EventSource.prototype[method$1] = instance$b[method$1];
for (var key$b in event_target) EventSource.prototype[key$b] = event_target[key$b];

var eventsource = EventSource;

// API references:
//
// * http://dev.w3.org/html5/websockets/
// * http://dvcs.w3.org/hg/domcore/raw-file/tip/Overview.html#interface-eventtarget
// * http://dvcs.w3.org/hg/domcore/raw-file/tip/Overview.html#interface-event



var WebSocket = function(request, socket, body, protocols, options) {
  options = options || {};

  this._stream = socket;
  this._driver = driver.http(request, {maxLength: options.maxLength, protocols: protocols});

  var self = this;
  if (!this._stream || !this._stream.writable) return;
  if (!this._stream.readable) return this._stream.end();

  var catchup = function() { self._stream.removeListener('data', catchup); };
  this._stream.on('data', catchup);

  api.call(this, options);

  process.nextTick(function() {
    self._driver.start();
    self._driver.io.write(body);
  });
};
util.inherits(WebSocket, api);

WebSocket.isWebSocket = function(request) {
  return driver.isWebSocket(request);
};

WebSocket.validateOptions = function(options, validKeys) {
  driver.validateOptions(options, validKeys);
};

WebSocket.WebSocket   = WebSocket;
WebSocket.Client      = client$1;
WebSocket.EventSource = eventsource;