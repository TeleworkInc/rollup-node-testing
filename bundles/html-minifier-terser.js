import os from 'os';
import http from 'http';
import https from 'https';
import url from 'url';
import path$2 from 'path';
import fs from 'fs';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

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

function level0Optimize(tokens) {
  // noop as level 0 means no optimizations!
  return tokens;
}

var optimize = level0Optimize;

var COLORS = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#0ff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000',
  blanchedalmond: '#ffebcd',
  blue: '#00f',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#0ff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgreen: '#006400',
  darkgrey: '#a9a9a9',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkslategrey: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#f0f',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  gold: '#ffd700',
  goldenrod: '#daa520',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  grey: '#808080',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgray: '#d3d3d3',
  lightgreen: '#90ee90',
  lightgrey: '#d3d3d3',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#0f0',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  rebeccapurple: '#663399',
  red: '#f00',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#fff',
  whitesmoke: '#f5f5f5',
  yellow: '#ff0',
  yellowgreen: '#9acd32'
};

var toHex = {};
var toName = {};

for (var name in COLORS) {
  var hex = COLORS[name];

  if (name.length < hex.length) {
    toName[hex] = name;
  } else {
    toHex[name] = hex;
  }
}

var toHexPattern = new RegExp('(^| |,|\\))(' + Object.keys(toHex).join('|') + ')( |,|\\)|$)', 'ig');
var toNamePattern = new RegExp('(' + Object.keys(toName).join('|') + ')([^a-f0-9]|$)', 'ig');

function hexConverter(match, prefix, colorValue, suffix) {
  return prefix + toHex[colorValue.toLowerCase()] + suffix;
}

function nameConverter(match, colorValue, suffix) {
  return toName[colorValue.toLowerCase()] + suffix;
}

function shortenHex(value) {
  var hasHex = value.indexOf('#') > -1;
  var shortened = value.replace(toHexPattern, hexConverter);

  if (shortened != value) {
    shortened = shortened.replace(toHexPattern, hexConverter);
  }

  return hasHex ?
    shortened.replace(toNamePattern, nameConverter) :
    shortened;
}

var shortenHex_1 = shortenHex;

// HSL to RGB converter. Both methods adapted from:
// http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript

function hslToRgb(h, s, l) {
  var r, g, b;

  // normalize hue orientation b/w 0 and 360 degrees
  h = h % 360;
  if (h < 0)
    h += 360;
  h = ~~h / 360;

  if (s < 0)
    s = 0;
  else if (s > 100)
    s = 100;
  s = ~~s / 100;

  if (l < 0)
    l = 0;
  else if (l > 100)
    l = 100;
  l = ~~l / 100;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    var q = l < 0.5 ?
      l * (1 + s) :
      l + s - l * s;
    var p = 2 * l - q;
    r = hueToRgb(p, q, h + 1/3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1/3);
  }

  return [~~(r * 255), ~~(g * 255), ~~(b * 255)];
}

function hueToRgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1/6) return p + (q - p) * 6 * t;
  if (t < 1/2) return q;
  if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
  return p;
}

function shortenHsl(hue, saturation, lightness) {
  var asRgb = hslToRgb(hue, saturation, lightness);
  var redAsHex = asRgb[0].toString(16);
  var greenAsHex = asRgb[1].toString(16);
  var blueAsHex = asRgb[2].toString(16);

  return '#' +
    ((redAsHex.length == 1 ? '0' : '') + redAsHex) +
    ((greenAsHex.length == 1 ? '0' : '') + greenAsHex) +
    ((blueAsHex.length == 1 ? '0' : '') + blueAsHex);
}

var shortenHsl_1 = shortenHsl;

function shortenRgb(red, green, blue) {
  var normalizedRed = Math.max(0, Math.min(parseInt(red), 255));
  var normalizedGreen = Math.max(0, Math.min(parseInt(green), 255));
  var normalizedBlue = Math.max(0, Math.min(parseInt(blue), 255));

  // Credit: Asen  http://jsbin.com/UPUmaGOc/2/edit?js,console
  return '#' + ('00000' + (normalizedRed << 16 | normalizedGreen << 8 | normalizedBlue).toString(16)).slice(-6);
}

var shortenRgb_1 = shortenRgb;

// adapted from http://nedbatchelder.com/blog/200712.html#e20071211T054956

var NUMBER_PATTERN = /([0-9]+)/;

function naturalCompare(value1, value2) {
  var keys1 = ('' + value1).split(NUMBER_PATTERN).map(tryParseInt);
  var keys2 = ('' + value2).split(NUMBER_PATTERN).map(tryParseInt);
  var key1;
  var key2;
  var compareFirst = Math.min(keys1.length, keys2.length);
  var i, l;

  for (i = 0, l = compareFirst; i < l; i++) {
    key1 = keys1[i];
    key2 = keys2[i];

    if (key1 != key2) {
      return key1 > key2 ? 1 : -1;
    }
  }

  return keys1.length > keys2.length ? 1 : (keys1.length == keys2.length ? 0 : -1);
}

function tryParseInt(value) {
  return ('' + parseInt(value)) == value ?
    parseInt(value) :
    value;
}

var naturalCompare_1 = naturalCompare;

function naturalSorter(scope1, scope2) {
  return naturalCompare_1(scope1[1], scope2[1]);
}

function standardSorter(scope1, scope2) {
  return scope1[1] > scope2[1] ? 1 : -1;
}

function sortSelectors(selectors, method) {
  switch (method) {
    case 'natural':
      return selectors.sort(naturalSorter);
    case 'standard':
      return selectors.sort(standardSorter);
    case 'none':
    case false:
      return selectors;
  }
}

var sortSelectors_1 = sortSelectors;

function override(source1, source2) {
  var target = {};
  var key1;
  var key2;
  var item;

  for (key1 in source1) {
    item = source1[key1];

    if (Array.isArray(item)) {
      target[key1] = item.slice(0);
    } else if (typeof item == 'object' && item !== null) {
      target[key1] = override(item, {});
    } else {
      target[key1] = item;
    }
  }

  for (key2 in source2) {
    item = source2[key2];

    if (key2 in target && Array.isArray(item)) {
      target[key2] = item.slice(0);
    } else if (key2 in target && typeof item == 'object' && item !== null) {
      target[key2] = override(target[key2], item);
    } else {
      target[key2] = item;
    }
  }

  return target;
}

var override_1 = override;

var systemLineBreak = os.EOL;



var Breaks = {
  AfterAtRule: 'afterAtRule',
  AfterBlockBegins: 'afterBlockBegins',
  AfterBlockEnds: 'afterBlockEnds',
  AfterComment: 'afterComment',
  AfterProperty: 'afterProperty',
  AfterRuleBegins: 'afterRuleBegins',
  AfterRuleEnds: 'afterRuleEnds',
  BeforeBlockEnds: 'beforeBlockEnds',
  BetweenSelectors: 'betweenSelectors'
};

var BreakWith = {
  CarriageReturnLineFeed: '\r\n',
  LineFeed: '\n',
  System: systemLineBreak
};

var IndentWith = {
  Space: ' ',
  Tab: '\t'
};

var Spaces = {
  AroundSelectorRelation: 'aroundSelectorRelation',
  BeforeBlockBegins: 'beforeBlockBegins',
  BeforeValue: 'beforeValue'
};

var DEFAULTS = {
  breaks: breaks(false),
  breakWith: BreakWith.System,
  indentBy: 0,
  indentWith: IndentWith.Space,
  spaces: spaces(false),
  wrapAt: false,
  semicolonAfterLastProperty: false
};

var BEAUTIFY_ALIAS = 'beautify';
var KEEP_BREAKS_ALIAS = 'keep-breaks';

var OPTION_SEPARATOR = ';';
var OPTION_NAME_VALUE_SEPARATOR = ':';
var HASH_VALUES_OPTION_SEPARATOR = ',';
var HASH_VALUES_NAME_VALUE_SEPARATOR = '=';

var FALSE_KEYWORD_1 = 'false';
var FALSE_KEYWORD_2 = 'off';
var TRUE_KEYWORD_1 = 'true';
var TRUE_KEYWORD_2 = 'on';

function breaks(value) {
  var breakOptions = {};

  breakOptions[Breaks.AfterAtRule] = value;
  breakOptions[Breaks.AfterBlockBegins] = value;
  breakOptions[Breaks.AfterBlockEnds] = value;
  breakOptions[Breaks.AfterComment] = value;
  breakOptions[Breaks.AfterProperty] = value;
  breakOptions[Breaks.AfterRuleBegins] = value;
  breakOptions[Breaks.AfterRuleEnds] = value;
  breakOptions[Breaks.BeforeBlockEnds] = value;
  breakOptions[Breaks.BetweenSelectors] = value;

  return breakOptions;
}

function spaces(value) {
  var spaceOptions = {};

  spaceOptions[Spaces.AroundSelectorRelation] = value;
  spaceOptions[Spaces.BeforeBlockBegins] = value;
  spaceOptions[Spaces.BeforeValue] = value;

  return spaceOptions;
}

function formatFrom(source) {
  if (source === undefined || source === false) {
    return false;
  }

  if (typeof source == 'object' && 'breakWith' in source) {
    source = override_1(source, { breakWith: mapBreakWith(source.breakWith) });
  }

  if (typeof source == 'object' && 'indentBy' in source) {
    source = override_1(source, { indentBy: parseInt(source.indentBy) });
  }

  if (typeof source == 'object' && 'indentWith' in source) {
    source = override_1(source, { indentWith: mapIndentWith(source.indentWith) });
  }

  if (typeof source == 'object') {
    return override_1(DEFAULTS, source);
  }

  if (typeof source == 'object') {
    return override_1(DEFAULTS, source);
  }

  if (typeof source == 'string' && source == BEAUTIFY_ALIAS) {
    return override_1(DEFAULTS, {
      breaks: breaks(true),
      indentBy: 2,
      spaces: spaces(true)
    });
  }

  if (typeof source == 'string' && source == KEEP_BREAKS_ALIAS) {
    return override_1(DEFAULTS, {
      breaks: {
        afterAtRule: true,
        afterBlockBegins: true,
        afterBlockEnds: true,
        afterComment: true,
        afterRuleEnds: true,
        beforeBlockEnds: true
      }
    });
  }

  if (typeof source == 'string') {
    return override_1(DEFAULTS, toHash(source));
  }

  return DEFAULTS;
}

function toHash(string) {
  return string
    .split(OPTION_SEPARATOR)
    .reduce(function (accumulator, directive) {
      var parts = directive.split(OPTION_NAME_VALUE_SEPARATOR);
      var name = parts[0];
      var value = parts[1];

      if (name == 'breaks' || name == 'spaces') {
        accumulator[name] = hashValuesToHash(value);
      } else if (name == 'indentBy' || name == 'wrapAt') {
        accumulator[name] = parseInt(value);
      } else if (name == 'indentWith') {
        accumulator[name] = mapIndentWith(value);
      } else if (name == 'breakWith') {
        accumulator[name] = mapBreakWith(value);
      }

      return accumulator;
    }, {});
}

function hashValuesToHash(string) {
  return string
    .split(HASH_VALUES_OPTION_SEPARATOR)
    .reduce(function (accumulator, directive) {
      var parts = directive.split(HASH_VALUES_NAME_VALUE_SEPARATOR);
      var name = parts[0];
      var value = parts[1];

      accumulator[name] = normalizeValue(value);

      return accumulator;
    }, {});
}


function normalizeValue(value) {
  switch (value) {
    case FALSE_KEYWORD_1:
    case FALSE_KEYWORD_2:
      return false;
    case TRUE_KEYWORD_1:
    case TRUE_KEYWORD_2:
      return true;
    default:
      return value;
  }
}

function mapBreakWith(value) {
  switch (value) {
    case 'windows':
    case 'crlf':
    case BreakWith.CarriageReturnLineFeed:
      return BreakWith.CarriageReturnLineFeed;
    case 'unix':
    case 'lf':
    case BreakWith.LineFeed:
      return BreakWith.LineFeed;
    default:
      return systemLineBreak;
  }
}

function mapIndentWith(value) {
  switch (value) {
    case 'space':
      return IndentWith.Space;
    case 'tab':
      return IndentWith.Tab;
    default:
      return value;
  }
}

var format = {
  Breaks: Breaks,
  Spaces: Spaces,
  formatFrom: formatFrom
};

var Marker = {
  ASTERISK: '*',
  AT: '@',
  BACK_SLASH: '\\',
  CARRIAGE_RETURN: '\r',
  CLOSE_CURLY_BRACKET: '}',
  CLOSE_ROUND_BRACKET: ')',
  CLOSE_SQUARE_BRACKET: ']',
  COLON: ':',
  COMMA: ',',
  DOUBLE_QUOTE: '"',
  EXCLAMATION: '!',
  FORWARD_SLASH: '/',
  INTERNAL: '-clean-css-',
  NEW_LINE_NIX: '\n',
  OPEN_CURLY_BRACKET: '{',
  OPEN_ROUND_BRACKET: '(',
  OPEN_SQUARE_BRACKET: '[',
  SEMICOLON: ';',
  SINGLE_QUOTE: '\'',
  SPACE: ' ',
  TAB: '\t',
  UNDERSCORE: '_'
};

var marker = Marker;

function formatPosition(metadata) {
  var line = metadata[0];
  var column = metadata[1];
  var source = metadata[2];

  return source ?
    source + ':' + line + ':' + column :
    line + ':' + column;
}

var formatPosition_1 = formatPosition;

var Spaces$1 = format.Spaces;



var CASE_ATTRIBUTE_PATTERN = /[\s"'][iI]\s*\]/;
var CASE_RESTORE_PATTERN = /([\d\w])([iI])\]/g;
var DOUBLE_QUOTE_CASE_PATTERN = /="([a-zA-Z][a-zA-Z\d\-_]+)"([iI])/g;
var DOUBLE_QUOTE_PATTERN = /="([a-zA-Z][a-zA-Z\d\-_]+)"(\s|\])/g;
var HTML_COMMENT_PATTERN = /^(?:(?:<!--|-->)\s*)+/;
var SINGLE_QUOTE_CASE_PATTERN = /='([a-zA-Z][a-zA-Z\d\-_]+)'([iI])/g;
var SINGLE_QUOTE_PATTERN = /='([a-zA-Z][a-zA-Z\d\-_]+)'(\s|\])/g;
var RELATION_PATTERN = /[>\+~]/;
var WHITESPACE_PATTERN = /\s/;

var ASTERISK_PLUS_HTML_HACK = '*+html ';
var ASTERISK_FIRST_CHILD_PLUS_HTML_HACK = '*:first-child+html ';
var LESS_THAN = '<';

function hasInvalidCharacters(value) {
  var isEscaped;
  var isInvalid = false;
  var character;
  var isQuote = false;
  var i, l;

  for (i = 0, l = value.length; i < l; i++) {
    character = value[i];

    if (isEscaped) ; else if (character == marker.SINGLE_QUOTE || character == marker.DOUBLE_QUOTE) {
      isQuote = !isQuote;
    } else if (!isQuote && (character == marker.CLOSE_CURLY_BRACKET || character == marker.EXCLAMATION || character == LESS_THAN || character == marker.SEMICOLON)) {
      isInvalid = true;
      break;
    } else if (!isQuote && i === 0 && RELATION_PATTERN.test(character)) {
      isInvalid = true;
      break;
    }

    isEscaped = character == marker.BACK_SLASH;
  }

  return isInvalid;
}

function removeWhitespace(value, format) {
  var stripped = [];
  var character;
  var isNewLineNix;
  var isNewLineWin;
  var isEscaped;
  var wasEscaped;
  var isQuoted;
  var isSingleQuoted;
  var isDoubleQuoted;
  var isAttribute;
  var isRelation;
  var isWhitespace;
  var roundBracketLevel = 0;
  var wasRelation = false;
  var wasWhitespace = false;
  var withCaseAttribute = CASE_ATTRIBUTE_PATTERN.test(value);
  var spaceAroundRelation = format && format.spaces[Spaces$1.AroundSelectorRelation];
  var i, l;

  for (i = 0, l = value.length; i < l; i++) {
    character = value[i];

    isNewLineNix = character == marker.NEW_LINE_NIX;
    isNewLineWin = character == marker.NEW_LINE_NIX && value[i - 1] == marker.CARRIAGE_RETURN;
    isQuoted = isSingleQuoted || isDoubleQuoted;
    isRelation = !isAttribute && !isEscaped && roundBracketLevel === 0 && RELATION_PATTERN.test(character);
    isWhitespace = WHITESPACE_PATTERN.test(character);

    if (wasEscaped && isQuoted && isNewLineWin) {
      // swallow escaped new windows lines in comments
      stripped.pop();
      stripped.pop();
    } else if (isEscaped && isQuoted && isNewLineNix) {
      // swallow escaped new *nix lines in comments
      stripped.pop();
    } else if (isEscaped) {
      stripped.push(character);
    } else if (character == marker.OPEN_SQUARE_BRACKET && !isQuoted) {
      stripped.push(character);
      isAttribute = true;
    } else if (character == marker.CLOSE_SQUARE_BRACKET && !isQuoted) {
      stripped.push(character);
      isAttribute = false;
    } else if (character == marker.OPEN_ROUND_BRACKET && !isQuoted) {
      stripped.push(character);
      roundBracketLevel++;
    } else if (character == marker.CLOSE_ROUND_BRACKET && !isQuoted) {
      stripped.push(character);
      roundBracketLevel--;
    } else if (character == marker.SINGLE_QUOTE && !isQuoted) {
      stripped.push(character);
      isSingleQuoted = true;
    } else if (character == marker.DOUBLE_QUOTE && !isQuoted) {
      stripped.push(character);
      isDoubleQuoted = true;
    } else if (character == marker.SINGLE_QUOTE && isQuoted) {
      stripped.push(character);
      isSingleQuoted = false;
    } else if (character == marker.DOUBLE_QUOTE && isQuoted) {
      stripped.push(character);
      isDoubleQuoted = false;
    } else if (isWhitespace && wasRelation && !spaceAroundRelation) {
      continue;
    } else if (!isWhitespace && wasRelation && spaceAroundRelation) {
      stripped.push(marker.SPACE);
      stripped.push(character);
    } else if (isWhitespace && (isAttribute || roundBracketLevel > 0) && !isQuoted) ; else if (isWhitespace && wasWhitespace && !isQuoted) ; else if ((isNewLineWin || isNewLineNix) && (isAttribute || roundBracketLevel > 0) && isQuoted) ; else if (isRelation && wasWhitespace && !spaceAroundRelation) {
      stripped.pop();
      stripped.push(character);
    } else if (isRelation && !wasWhitespace && spaceAroundRelation) {
      stripped.push(marker.SPACE);
      stripped.push(character);
    } else if (isWhitespace) {
      stripped.push(marker.SPACE);
    } else {
      stripped.push(character);
    }

    wasEscaped = isEscaped;
    isEscaped = character == marker.BACK_SLASH;
    wasRelation = isRelation;
    wasWhitespace = isWhitespace;
  }

  return withCaseAttribute ?
    stripped.join('').replace(CASE_RESTORE_PATTERN, '$1 $2]') :
    stripped.join('');
}

function removeQuotes(value) {
  if (value.indexOf('\'') == -1 && value.indexOf('"') == -1) {
    return value;
  }

  return value
    .replace(SINGLE_QUOTE_CASE_PATTERN, '=$1 $2')
    .replace(SINGLE_QUOTE_PATTERN, '=$1$2')
    .replace(DOUBLE_QUOTE_CASE_PATTERN, '=$1 $2')
    .replace(DOUBLE_QUOTE_PATTERN, '=$1$2');
}

function tidyRules(rules, removeUnsupported, adjacentSpace, format, warnings) {
  var list = [];
  var repeated = [];

  function removeHTMLComment(rule, match) {
    warnings.push('HTML comment \'' + match + '\' at ' + formatPosition_1(rule[2][0]) + '. Removing.');
    return '';
  }

  for (var i = 0, l = rules.length; i < l; i++) {
    var rule = rules[i];
    var reduced = rule[1];

    reduced = reduced.replace(HTML_COMMENT_PATTERN, removeHTMLComment.bind(null, rule));

    if (hasInvalidCharacters(reduced)) {
      warnings.push('Invalid selector \'' + rule[1] + '\' at ' + formatPosition_1(rule[2][0]) + '. Ignoring.');
      continue;
    }

    reduced = removeWhitespace(reduced, format);
    reduced = removeQuotes(reduced);

    if (adjacentSpace && reduced.indexOf('nav') > 0) {
      reduced = reduced.replace(/\+nav(\S|$)/, '+ nav$1');
    }

    if (removeUnsupported && reduced.indexOf(ASTERISK_PLUS_HTML_HACK) > -1) {
      continue;
    }

    if (removeUnsupported && reduced.indexOf(ASTERISK_FIRST_CHILD_PLUS_HTML_HACK) > -1) {
      continue;
    }

    if (reduced.indexOf('*') > -1) {
      reduced = reduced
        .replace(/\*([:#\.\[])/g, '$1')
        .replace(/^(\:first\-child)?\+html/, '*$1+html');
    }

    if (repeated.indexOf(reduced) > -1) {
      continue;
    }

    rule[1] = reduced;
    repeated.push(reduced);
    list.push(rule);
  }

  if (list.length == 1 && list[0][1].length === 0) {
    warnings.push('Empty selector \'' + list[0][1] + '\' at ' + formatPosition_1(list[0][2][0]) + '. Ignoring.');
    list = [];
  }

  return list;
}

var tidyRules_1 = tidyRules;

var SUPPORTED_COMPACT_BLOCK_MATCHER = /^@media\W/;

function tidyBlock(values, spaceAfterClosingBrace) {
  var withoutSpaceAfterClosingBrace;
  var i;

  for (i = values.length - 1; i >= 0; i--) {
    withoutSpaceAfterClosingBrace = !spaceAfterClosingBrace && SUPPORTED_COMPACT_BLOCK_MATCHER.test(values[i][1]);

    values[i][1] = values[i][1]
      .replace(/\n|\r\n/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/(,|:|\() /g, '$1')
      .replace(/ \)/g, ')')
      .replace(/'([a-zA-Z][a-zA-Z\d\-_]+)'/, '$1')
      .replace(/"([a-zA-Z][a-zA-Z\d\-_]+)"/, '$1')
      .replace(withoutSpaceAfterClosingBrace ? /\) /g : null, ')');
  }

  return values;
}

var tidyBlock_1 = tidyBlock;

function tidyAtRule(value) {
  return value
    .replace(/\s+/g, ' ')
    .replace(/url\(\s+/g, 'url(')
    .replace(/\s+\)/g, ')')
    .trim();
}

var tidyAtRule_1 = tidyAtRule;

var Hack = {
  ASTERISK: 'asterisk',
  BANG: 'bang',
  BACKSLASH: 'backslash',
  UNDERSCORE: 'underscore'
};

var hack = Hack;

function removeUnused(properties) {
  for (var i = properties.length - 1; i >= 0; i--) {
    var property = properties[i];

    if (property.unused) {
      property.all.splice(property.position, 1);
    }
  }
}

var removeUnused_1 = removeUnused;

var ASTERISK_HACK = '*';
var BACKSLASH_HACK = '\\';
var IMPORTANT_TOKEN = '!important';
var UNDERSCORE_HACK = '_';
var BANG_HACK = '!ie';

function restoreFromOptimizing(properties, restoreCallback) {
  var property;
  var restored;
  var current;
  var i;

  for (i = properties.length - 1; i >= 0; i--) {
    property = properties[i];

    if (property.unused) {
      continue;
    }

    if (!property.dirty && !property.important && !property.hack) {
      continue;
    }

    if (restoreCallback) {
      restored = restoreCallback(property);
      property.value = restored;
    } else {
      restored = property.value;
    }

    if (property.important) {
      restoreImportant(property);
    }

    if (property.hack) {
      restoreHack(property);
    }

    if ('all' in property) {
      current = property.all[property.position];
      current[1][1] = property.name;

      current.splice(2, current.length - 1);
      Array.prototype.push.apply(current, restored);
    }
  }
}

function restoreImportant(property) {
  property.value[property.value.length - 1][1] += IMPORTANT_TOKEN;
}

function restoreHack(property) {
  if (property.hack[0] == hack.UNDERSCORE) {
    property.name = UNDERSCORE_HACK + property.name;
  } else if (property.hack[0] == hack.ASTERISK) {
    property.name = ASTERISK_HACK + property.name;
  } else if (property.hack[0] == hack.BACKSLASH) {
    property.value[property.value.length - 1][1] += BACKSLASH_HACK + property.hack[1];
  } else if (property.hack[0] == hack.BANG) {
    property.value[property.value.length - 1][1] += marker.SPACE + BANG_HACK;
  }
}

var restoreFromOptimizing_1 = restoreFromOptimizing;

var Token = {
  AT_RULE: 'at-rule', // e.g. `@import`, `@charset`
  AT_RULE_BLOCK: 'at-rule-block', // e.g. `@font-face{...}`
  AT_RULE_BLOCK_SCOPE: 'at-rule-block-scope', // e.g. `@font-face`
  COMMENT: 'comment', // e.g. `/* comment */`
  NESTED_BLOCK: 'nested-block', // e.g. `@media screen{...}`, `@keyframes animation {...}`
  NESTED_BLOCK_SCOPE: 'nested-block-scope', // e.g. `@media`, `@keyframes`
  PROPERTY: 'property', // e.g. `color:red`
  PROPERTY_BLOCK: 'property-block', // e.g. `--var:{color:red}`
  PROPERTY_NAME: 'property-name', // e.g. `color`
  PROPERTY_VALUE: 'property-value', // e.g. `red`
  RAW: 'raw', // e.g. anything between /* clean-css ignore:start */ and /* clean-css ignore:end */ comments
  RULE: 'rule', // e.g `div > a{...}`
  RULE_SCOPE: 'rule-scope' // e.g `div > a`
};

var token = Token;

var Match = {
  ASTERISK: '*',
  BACKSLASH: '\\',
  BANG: '!',
  BANG_SUFFIX_PATTERN: /!\w+$/,
  IMPORTANT_TOKEN: '!important',
  IMPORTANT_TOKEN_PATTERN: new RegExp('!important$', 'i'),
  IMPORTANT_WORD: 'important',
  IMPORTANT_WORD_PATTERN: new RegExp('important$', 'i'),
  SUFFIX_BANG_PATTERN: /!$/,
  UNDERSCORE: '_',
  VARIABLE_REFERENCE_PATTERN: /var\(--.+\)$/
};

function wrapAll(properties, includeVariable, skipProperties) {
  var wrapped = [];
  var single;
  var property;
  var i;

  for (i = properties.length - 1; i >= 0; i--) {
    property = properties[i];

    if (property[0] != token.PROPERTY) {
      continue;
    }

    if (!includeVariable && someVariableReferences(property)) {
      continue;
    }

    if (skipProperties && skipProperties.indexOf(property[1][1]) > -1) {
      continue;
    }

    single = wrapSingle(property);
    single.all = properties;
    single.position = i;
    wrapped.unshift(single);
  }

  return wrapped;
}

function someVariableReferences(property) {
  var i, l;
  var value;

  // skipping `property` and property name tokens
  for (i = 2, l = property.length; i < l; i++) {
    value = property[i];

    if (value[0] != token.PROPERTY_VALUE) {
      continue;
    }

    if (isVariableReference(value[1])) {
      return true;
    }
  }

  return false;
}

function isVariableReference(value) {
  return Match.VARIABLE_REFERENCE_PATTERN.test(value);
}

function isMultiplex(property) {
  var value;
  var i, l;

  for (i = 3, l = property.length; i < l; i++) {
    value = property[i];

    if (value[0] == token.PROPERTY_VALUE && (value[1] == marker.COMMA || value[1] == marker.FORWARD_SLASH)) {
      return true;
    }
  }

  return false;
}

function hackFrom(property) {
  var match = false;
  var name = property[1][1];
  var lastValue = property[property.length - 1];

  if (name[0] == Match.UNDERSCORE) {
    match = [hack.UNDERSCORE];
  } else if (name[0] == Match.ASTERISK) {
    match = [hack.ASTERISK];
  } else if (lastValue[1][0] == Match.BANG && !lastValue[1].match(Match.IMPORTANT_WORD_PATTERN)) {
    match = [hack.BANG];
  } else if (lastValue[1].indexOf(Match.BANG) > 0 && !lastValue[1].match(Match.IMPORTANT_WORD_PATTERN) && Match.BANG_SUFFIX_PATTERN.test(lastValue[1])) {
    match = [hack.BANG];
  } else if (lastValue[1].indexOf(Match.BACKSLASH) > 0 && lastValue[1].indexOf(Match.BACKSLASH) == lastValue[1].length - Match.BACKSLASH.length - 1) {
    match = [hack.BACKSLASH, lastValue[1].substring(lastValue[1].indexOf(Match.BACKSLASH) + 1)];
  } else if (lastValue[1].indexOf(Match.BACKSLASH) === 0 && lastValue[1].length == 2) {
    match = [hack.BACKSLASH, lastValue[1].substring(1)];
  }

  return match;
}

function isImportant(property) {
  if (property.length < 3)
    return false;

  var lastValue = property[property.length - 1];
  if (Match.IMPORTANT_TOKEN_PATTERN.test(lastValue[1])) {
    return true;
  } else if (Match.IMPORTANT_WORD_PATTERN.test(lastValue[1]) && Match.SUFFIX_BANG_PATTERN.test(property[property.length - 2][1])) {
    return true;
  }

  return false;
}

function stripImportant(property) {
  var lastValue = property[property.length - 1];
  var oneButLastValue = property[property.length - 2];

  if (Match.IMPORTANT_TOKEN_PATTERN.test(lastValue[1])) {
    lastValue[1] = lastValue[1].replace(Match.IMPORTANT_TOKEN_PATTERN, '');
  } else {
    lastValue[1] = lastValue[1].replace(Match.IMPORTANT_WORD_PATTERN, '');
    oneButLastValue[1] = oneButLastValue[1].replace(Match.SUFFIX_BANG_PATTERN, '');
  }

  if (lastValue[1].length === 0) {
    property.pop();
  }

  if (oneButLastValue[1].length === 0) {
    property.pop();
  }
}

function stripPrefixHack(property) {
  property[1][1] = property[1][1].substring(1);
}

function stripSuffixHack(property, hackFrom) {
  var lastValue = property[property.length - 1];
  lastValue[1] = lastValue[1]
    .substring(0, lastValue[1].indexOf(hackFrom[0] == hack.BACKSLASH ? Match.BACKSLASH : Match.BANG))
    .trim();

  if (lastValue[1].length === 0) {
    property.pop();
  }
}

function wrapSingle(property) {
  var importantProperty = isImportant(property);
  if (importantProperty) {
    stripImportant(property);
  }

  var whichHack = hackFrom(property);
  if (whichHack[0] == hack.ASTERISK || whichHack[0] == hack.UNDERSCORE) {
    stripPrefixHack(property);
  } else if (whichHack[0] == hack.BACKSLASH || whichHack[0] == hack.BANG) {
    stripSuffixHack(property, whichHack);
  }

  return {
    block: property[2] && property[2][0] == token.PROPERTY_BLOCK,
    components: [],
    dirty: false,
    hack: whichHack,
    important: importantProperty,
    name: property[1][1],
    multiplex: property.length > 3 ? isMultiplex(property) : false,
    position: 0,
    shorthand: false,
    unused: false,
    value: property.slice(2)
  };
}

var wrapForOptimizing = {
  all: wrapAll,
  single: wrapSingle
};

var INTEGER_PATTERN = /^\d+$/;

var ALL_UNITS = ['*', 'all'];
var DEFAULT_PRECISION = 'off'; // all precision changes are disabled
var DIRECTIVES_SEPARATOR = ','; // e.g. *=5,px=3
var DIRECTIVE_VALUE_SEPARATOR = '='; // e.g. *=5

function roundingPrecisionFrom(source) {
  return override_1(defaults(DEFAULT_PRECISION), buildPrecisionFrom(source));
}

function defaults(value) {
  return {
    'ch': value,
    'cm': value,
    'em': value,
    'ex': value,
    'in': value,
    'mm': value,
    'pc': value,
    'pt': value,
    'px': value,
    'q': value,
    'rem': value,
    'vh': value,
    'vmax': value,
    'vmin': value,
    'vw': value,
    '%': value
  };
}

function buildPrecisionFrom(source) {
  if (source === null || source === undefined) {
    return {};
  }

  if (typeof source == 'boolean') {
    return {};
  }

  if (typeof source == 'number' && source == -1) {
    return defaults(DEFAULT_PRECISION);
  }

  if (typeof source == 'number') {
    return defaults(source);
  }

  if (typeof source == 'string' && INTEGER_PATTERN.test(source)) {
    return defaults(parseInt(source));
  }

  if (typeof source == 'string' && source == DEFAULT_PRECISION) {
    return defaults(DEFAULT_PRECISION);
  }

  if (typeof source == 'object') {
    return source;
  }

  return source
    .split(DIRECTIVES_SEPARATOR)
    .reduce(function (accumulator, directive) {
      var directiveParts = directive.split(DIRECTIVE_VALUE_SEPARATOR);
      var name = directiveParts[0];
      var value = parseInt(directiveParts[1]);

      if (isNaN(value) || value == -1) {
        value = DEFAULT_PRECISION;
      }

      if (ALL_UNITS.indexOf(name) > -1) {
        accumulator = override_1(accumulator, defaults(value));
      } else {
        accumulator[name] = value;
      }

      return accumulator;
    }, {});
}

var roundingPrecision = {
  DEFAULT: DEFAULT_PRECISION,
  roundingPrecisionFrom: roundingPrecisionFrom
};

var roundingPrecisionFrom$1 = roundingPrecision.roundingPrecisionFrom;



var OptimizationLevel = {
  Zero: '0',
  One: '1',
  Two: '2'
};

var DEFAULTS$1 = {};

DEFAULTS$1[OptimizationLevel.Zero] = {};
DEFAULTS$1[OptimizationLevel.One] = {
  cleanupCharsets: true,
  normalizeUrls: true,
  optimizeBackground: true,
  optimizeBorderRadius: true,
  optimizeFilter: true,
  optimizeFontWeight: true,
  optimizeOutline: true,
  removeEmpty: true,
  removeNegativePaddings: true,
  removeQuotes: true,
  removeWhitespace: true,
  replaceMultipleZeros: true,
  replaceTimeUnits: true,
  replaceZeroUnits: true,
  roundingPrecision: roundingPrecisionFrom$1(undefined),
  selectorsSortingMethod: 'standard',
  specialComments: 'all',
  tidyAtRules: true,
  tidyBlockScopes: true,
  tidySelectors: true,
  transform: noop
};
DEFAULTS$1[OptimizationLevel.Two] = {
  mergeAdjacentRules: true,
  mergeIntoShorthands: true,
  mergeMedia: true,
  mergeNonAdjacentRules: true,
  mergeSemantically: false,
  overrideProperties: true,
  removeEmpty: true,
  reduceNonAdjacentRules: true,
  removeDuplicateFontRules: true,
  removeDuplicateMediaBlocks: true,
  removeDuplicateRules: true,
  removeUnusedAtRules: false,
  restructureRules: false,
  skipProperties: []
};

var ALL_KEYWORD_1 = '*';
var ALL_KEYWORD_2 = 'all';
var FALSE_KEYWORD_1$1 = 'false';
var FALSE_KEYWORD_2$1 = 'off';
var TRUE_KEYWORD_1$1 = 'true';
var TRUE_KEYWORD_2$1 = 'on';

var LIST_VALUE_SEPARATOR = ',';
var OPTION_SEPARATOR$1 = ';';
var OPTION_VALUE_SEPARATOR = ':';

function noop() {}

function optimizationLevelFrom(source) {
  var level = override_1(DEFAULTS$1, {});
  var Zero = OptimizationLevel.Zero;
  var One = OptimizationLevel.One;
  var Two = OptimizationLevel.Two;


  if (undefined === source) {
    delete level[Two];
    return level;
  }

  if (typeof source == 'string') {
    source = parseInt(source);
  }

  if (typeof source == 'number' && source === parseInt(Two)) {
    return level;
  }

  if (typeof source == 'number' && source === parseInt(One)) {
    delete level[Two];
    return level;
  }

  if (typeof source == 'number' && source === parseInt(Zero)) {
    delete level[Two];
    delete level[One];
    return level;
  }

  if (typeof source == 'object') {
    source = covertValuesToHashes(source);
  }

  if (One in source && 'roundingPrecision' in source[One]) {
    source[One].roundingPrecision = roundingPrecisionFrom$1(source[One].roundingPrecision);
  }

  if (Two in source && 'skipProperties' in source[Two] && typeof(source[Two].skipProperties) == 'string') {
    source[Two].skipProperties = source[Two].skipProperties.split(LIST_VALUE_SEPARATOR);
  }

  if (Zero in source || One in source || Two in source) {
    level[Zero] = override_1(level[Zero], source[Zero]);
  }

  if (One in source && ALL_KEYWORD_1 in source[One]) {
    level[One] = override_1(level[One], defaults$1(One, normalizeValue$1(source[One][ALL_KEYWORD_1])));
    delete source[One][ALL_KEYWORD_1];
  }

  if (One in source && ALL_KEYWORD_2 in source[One]) {
    level[One] = override_1(level[One], defaults$1(One, normalizeValue$1(source[One][ALL_KEYWORD_2])));
    delete source[One][ALL_KEYWORD_2];
  }

  if (One in source || Two in source) {
    level[One] = override_1(level[One], source[One]);
  } else {
    delete level[One];
  }

  if (Two in source && ALL_KEYWORD_1 in source[Two]) {
    level[Two] = override_1(level[Two], defaults$1(Two, normalizeValue$1(source[Two][ALL_KEYWORD_1])));
    delete source[Two][ALL_KEYWORD_1];
  }

  if (Two in source && ALL_KEYWORD_2 in source[Two]) {
    level[Two] = override_1(level[Two], defaults$1(Two, normalizeValue$1(source[Two][ALL_KEYWORD_2])));
    delete source[Two][ALL_KEYWORD_2];
  }

  if (Two in source) {
    level[Two] = override_1(level[Two], source[Two]);
  } else {
    delete level[Two];
  }

  return level;
}

function defaults$1(level, value) {
  var options = override_1(DEFAULTS$1[level], {});
  var key;

  for (key in options) {
    if (typeof options[key] == 'boolean') {
      options[key] = value;
    }
  }

  return options;
}

function normalizeValue$1(value) {
  switch (value) {
    case FALSE_KEYWORD_1$1:
    case FALSE_KEYWORD_2$1:
      return false;
    case TRUE_KEYWORD_1$1:
    case TRUE_KEYWORD_2$1:
      return true;
    default:
      return value;
  }
}

function covertValuesToHashes(source) {
  var clonedSource = override_1(source, {});
  var level;
  var i;

  for (i = 0; i <= 2; i++) {
    level = '' + i;

    if (level in clonedSource && (clonedSource[level] === undefined || clonedSource[level] === false)) {
      delete clonedSource[level];
    }

    if (level in clonedSource && clonedSource[level] === true) {
      clonedSource[level] = {};
    }

    if (level in clonedSource && typeof clonedSource[level] == 'string') {
      clonedSource[level] = covertToHash(clonedSource[level], level);
    }
  }

  return clonedSource;
}

function covertToHash(asString, level) {
  return asString
    .split(OPTION_SEPARATOR$1)
    .reduce(function (accumulator, directive) {
      var parts = directive.split(OPTION_VALUE_SEPARATOR);
      var name = parts[0];
      var value = parts[1];
      var normalizedValue = normalizeValue$1(value);

      if (ALL_KEYWORD_1 == name || ALL_KEYWORD_2 == name) {
        accumulator = override_1(accumulator, defaults$1(level, normalizedValue));
      } else {
        accumulator[name] = normalizedValue;
      }

      return accumulator;
    }, {});
}

var optimizationLevel = {
  OptimizationLevel: OptimizationLevel,
  optimizationLevelFrom: optimizationLevelFrom,
};

function split(value, separator) {
  var openLevel = marker.OPEN_ROUND_BRACKET;
  var closeLevel = marker.CLOSE_ROUND_BRACKET;
  var level = 0;
  var cursor = 0;
  var lastStart = 0;
  var lastValue;
  var lastCharacter;
  var len = value.length;
  var parts = [];

  if (value.indexOf(separator) == -1) {
    return [value];
  }

  if (value.indexOf(openLevel) == -1) {
    return value.split(separator);
  }

  while (cursor < len) {
    if (value[cursor] == openLevel) {
      level++;
    } else if (value[cursor] == closeLevel) {
      level--;
    }

    if (level === 0 && cursor > 0 && cursor + 1 < len && value[cursor] == separator) {
      parts.push(value.substring(lastStart, cursor));
      lastStart = cursor + 1;
    }

    cursor++;
  }

  if (lastStart < cursor + 1) {
    lastValue = value.substring(lastStart);
    lastCharacter = lastValue[lastValue.length - 1];
    if (lastCharacter == separator) {
      lastValue = lastValue.substring(0, lastValue.length - 1);
    }

    parts.push(lastValue);
  }

  return parts;
}

var split_1 = split;

var emptyCharacter = '';

var Breaks$1 = format.Breaks;
var Spaces$2 = format.Spaces;




function supportsAfterClosingBrace(token) {
  return token[1][1] == 'background' || token[1][1] == 'transform' || token[1][1] == 'src';
}

function afterClosingBrace(token, valueIndex) {
  return token[valueIndex][1][token[valueIndex][1].length - 1] == marker.CLOSE_ROUND_BRACKET;
}

function afterComma(token, valueIndex) {
  return token[valueIndex][1] == marker.COMMA;
}

function afterSlash(token, valueIndex) {
  return token[valueIndex][1] == marker.FORWARD_SLASH;
}

function beforeComma(token, valueIndex) {
  return token[valueIndex + 1] && token[valueIndex + 1][1] == marker.COMMA;
}

function beforeSlash(token, valueIndex) {
  return token[valueIndex + 1] && token[valueIndex + 1][1] == marker.FORWARD_SLASH;
}

function inFilter(token) {
  return token[1][1] == 'filter' || token[1][1] == '-ms-filter';
}

function disallowsSpace(context, token, valueIndex) {
  return !context.spaceAfterClosingBrace && supportsAfterClosingBrace(token) && afterClosingBrace(token, valueIndex) ||
    beforeSlash(token, valueIndex) ||
    afterSlash(token, valueIndex) ||
    beforeComma(token, valueIndex) ||
    afterComma(token, valueIndex);
}

function rules(context, tokens) {
  var store = context.store;

  for (var i = 0, l = tokens.length; i < l; i++) {
    store(context, tokens[i]);

    if (i < l - 1) {
      store(context, comma(context));
    }
  }
}

function body(context, tokens) {
  var lastPropertyAt = lastPropertyIndex(tokens);

  for (var i = 0, l = tokens.length; i < l; i++) {
    property(context, tokens, i, lastPropertyAt);
  }
}

function lastPropertyIndex(tokens) {
  var index = tokens.length - 1;

  for (; index >= 0; index--) {
    if (tokens[index][0] != token.COMMENT) {
      break;
    }
  }

  return index;
}

function property(context, tokens, position, lastPropertyAt) {
  var store = context.store;
  var token$1 = tokens[position];

  var propertyValue = token$1[2];
  var isPropertyBlock = propertyValue && propertyValue[0] === token.PROPERTY_BLOCK;

  var needsSemicolon;
  if ( context.format ) {
    if ( context.format.semicolonAfterLastProperty || isPropertyBlock ) {
      needsSemicolon = true;
    } else if ( position < lastPropertyAt ) {
      needsSemicolon = true;
    } else {
      needsSemicolon = false;
    }
  } else {
    needsSemicolon = position < lastPropertyAt || isPropertyBlock;
  }

  var isLast = position === lastPropertyAt;

  switch (token$1[0]) {
    case token.AT_RULE:
      store(context, token$1);
      store(context, semicolon(context, Breaks$1.AfterProperty, false));
      break;
    case token.AT_RULE_BLOCK:
      rules(context, token$1[1]);
      store(context, openBrace(context, Breaks$1.AfterRuleBegins, true));
      body(context, token$1[2]);
      store(context, closeBrace(context, Breaks$1.AfterRuleEnds, false, isLast));
      break;
    case token.COMMENT:
      store(context, token$1);
      break;
    case token.PROPERTY:
      store(context, token$1[1]);
      store(context, colon(context));
      if (propertyValue) {
        value(context, token$1);
      }
      store(context, needsSemicolon ? semicolon(context, Breaks$1.AfterProperty, isLast) : emptyCharacter);
      break;
    case token.RAW:
      store(context, token$1);
  }
}

function value(context, token$1) {
  var store = context.store;
  var j, m;

  if (token$1[2][0] == token.PROPERTY_BLOCK) {
    store(context, openBrace(context, Breaks$1.AfterBlockBegins, false));
    body(context, token$1[2][1]);
    store(context, closeBrace(context, Breaks$1.AfterBlockEnds, false, true));
  } else {
    for (j = 2, m = token$1.length; j < m; j++) {
      store(context, token$1[j]);

      if (j < m - 1 && (inFilter(token$1) || !disallowsSpace(context, token$1, j))) {
        store(context, marker.SPACE);
      }
    }
  }
}

function allowsBreak(context, where) {
  return context.format && context.format.breaks[where];
}

function allowsSpace(context, where) {
  return context.format && context.format.spaces[where];
}

function openBrace(context, where, needsPrefixSpace) {
  if (context.format) {
    context.indentBy += context.format.indentBy;
    context.indentWith = context.format.indentWith.repeat(context.indentBy);
    return (needsPrefixSpace && allowsSpace(context, Spaces$2.BeforeBlockBegins) ? marker.SPACE : emptyCharacter) +
      marker.OPEN_CURLY_BRACKET +
      (allowsBreak(context, where) ? context.format.breakWith : emptyCharacter) +
      context.indentWith;
  } else {
    return marker.OPEN_CURLY_BRACKET;
  }
}

function closeBrace(context, where, beforeBlockEnd, isLast) {
  if (context.format) {
    context.indentBy -= context.format.indentBy;
    context.indentWith = context.format.indentWith.repeat(context.indentBy);
    return (allowsBreak(context, Breaks$1.AfterProperty) || beforeBlockEnd && allowsBreak(context, Breaks$1.BeforeBlockEnds) ? context.format.breakWith : emptyCharacter) +
      context.indentWith +
      marker.CLOSE_CURLY_BRACKET +
      (isLast ? emptyCharacter : (allowsBreak(context, where) ? context.format.breakWith : emptyCharacter) + context.indentWith);
  } else {
    return marker.CLOSE_CURLY_BRACKET;
  }
}

function colon(context) {
  return context.format ?
    marker.COLON + (allowsSpace(context, Spaces$2.BeforeValue) ? marker.SPACE : emptyCharacter) :
    marker.COLON;
}

function semicolon(context, where, isLast) {
  return context.format ?
    marker.SEMICOLON + (isLast || !allowsBreak(context, where) ? emptyCharacter : context.format.breakWith + context.indentWith) :
    marker.SEMICOLON;
}

function comma(context) {
  return context.format ?
    marker.COMMA + (allowsBreak(context, Breaks$1.BetweenSelectors) ? context.format.breakWith : emptyCharacter) + context.indentWith :
    marker.COMMA;
}

function all(context, tokens) {
  var store = context.store;
  var token$1;
  var isLast;
  var i, l;

  for (i = 0, l = tokens.length; i < l; i++) {
    token$1 = tokens[i];
    isLast = i == l - 1;

    switch (token$1[0]) {
      case token.AT_RULE:
        store(context, token$1);
        store(context, semicolon(context, Breaks$1.AfterAtRule, isLast));
        break;
      case token.AT_RULE_BLOCK:
        rules(context, token$1[1]);
        store(context, openBrace(context, Breaks$1.AfterRuleBegins, true));
        body(context, token$1[2]);
        store(context, closeBrace(context, Breaks$1.AfterRuleEnds, false, isLast));
        break;
      case token.NESTED_BLOCK:
        rules(context, token$1[1]);
        store(context, openBrace(context, Breaks$1.AfterBlockBegins, true));
        all(context, token$1[2]);
        store(context, closeBrace(context, Breaks$1.AfterBlockEnds, true, isLast));
        break;
      case token.COMMENT:
        store(context, token$1);
        store(context, allowsBreak(context, Breaks$1.AfterComment) ? context.format.breakWith : emptyCharacter);
        break;
      case token.RAW:
        store(context, token$1);
        break;
      case token.RULE:
        rules(context, token$1[1]);
        store(context, openBrace(context, Breaks$1.AfterRuleBegins, true));
        body(context, token$1[2]);
        store(context, closeBrace(context, Breaks$1.AfterRuleEnds, false, isLast));
        break;
    }
  }
}

var helpers = {
  all: all,
  body: body,
  property: property,
  rules: rules,
  value: value
};

function store(serializeContext, token) {
  serializeContext.output.push(typeof token == 'string' ? token : token[1]);
}

function context() {
  var newContext = {
    output: [],
    store: store
  };

  return newContext;
}

function all$1(tokens) {
  var oneTimeContext = context();
  helpers.all(oneTimeContext, tokens);
  return oneTimeContext.output.join('');
}

function body$1(tokens) {
  var oneTimeContext = context();
  helpers.body(oneTimeContext, tokens);
  return oneTimeContext.output.join('');
}

function property$1(tokens, position) {
  var oneTimeContext = context();
  helpers.property(oneTimeContext, tokens, position, true);
  return oneTimeContext.output.join('');
}

function rules$1(tokens) {
  var oneTimeContext = context();
  helpers.rules(oneTimeContext, tokens);
  return oneTimeContext.output.join('');
}

function value$1(tokens) {
  var oneTimeContext = context();
  helpers.value(oneTimeContext, tokens);
  return oneTimeContext.output.join('');
}

var oneTime = {
  all: all$1,
  body: body$1,
  property: property$1,
  rules: rules$1,
  value: value$1
};

var wrapForOptimizing$1 = wrapForOptimizing.all;

var OptimizationLevel$1 = optimizationLevel.OptimizationLevel;







var serializeRules = oneTime.rules;

var IgnoreProperty = 'ignore-property';

var CHARSET_TOKEN = '@charset';
var CHARSET_REGEXP = new RegExp('^' + CHARSET_TOKEN, 'i');

var DEFAULT_ROUNDING_PRECISION = roundingPrecision.DEFAULT;

var WHOLE_PIXEL_VALUE = /(?:^|\s|\()(-?\d+)px/;
var TIME_VALUE = /^(\-?[\d\.]+)(m?s)$/;

var HEX_VALUE_PATTERN = /[0-9a-f]/i;
var PROPERTY_NAME_PATTERN = /^(?:\-chrome\-|\-[\w\-]+\w|\w[\w\-]+\w|\-\-\S+)$/;
var IMPORT_PREFIX_PATTERN = /^@import/i;
var QUOTED_PATTERN = /^('.*'|".*")$/;
var QUOTED_BUT_SAFE_PATTERN = /^['"][a-zA-Z][a-zA-Z\d\-_]+['"]$/;
var URL_PREFIX_PATTERN = /^url\(/i;
var LOCAL_PREFIX_PATTERN = /^local\(/i;
var VARIABLE_NAME_PATTERN = /^--\S+$/;

function isLocal(value){
  return LOCAL_PREFIX_PATTERN.test(value);
}

function isNegative(value) {
  return value && value[1][0] == '-' && parseFloat(value[1]) < 0;
}

function isQuoted(value) {
  return QUOTED_PATTERN.test(value);
}

function isUrl(value) {
  return URL_PREFIX_PATTERN.test(value);
}

function normalizeUrl(value) {
  return value
    .replace(URL_PREFIX_PATTERN, 'url(')
    .replace(/\\?\n|\\?\r\n/g, '');
}

function optimizeBackground(property) {
  var values = property.value;

  if (values.length == 1 && values[0][1] == 'none') {
    values[0][1] = '0 0';
  }

  if (values.length == 1 && values[0][1] == 'transparent') {
    values[0][1] = '0 0';
  }
}

function optimizeBorderRadius(property) {
  var values = property.value;
  var spliceAt;

  if (values.length == 3 && values[1][1] == '/' && values[0][1] == values[2][1]) {
    spliceAt = 1;
  } else if (values.length == 5 && values[2][1] == '/' && values[0][1] == values[3][1] && values[1][1] == values[4][1]) {
    spliceAt = 2;
  } else if (values.length == 7 && values[3][1] == '/' && values[0][1] == values[4][1] && values[1][1] == values[5][1] && values[2][1] == values[6][1]) {
    spliceAt = 3;
  } else if (values.length == 9 && values[4][1] == '/' && values[0][1] == values[5][1] && values[1][1] == values[6][1] && values[2][1] == values[7][1] && values[3][1] == values[8][1]) {
    spliceAt = 4;
  }

  if (spliceAt) {
    property.value.splice(spliceAt);
    property.dirty = true;
  }
}

/**
 * @param {string} name
 * @param {string} value
 * @param {Object} compatibility
 * @return {string}
 */
function optimizeColors(name, value, compatibility) {
  if (!value.match(/#|rgb|hsl/gi)) {
    return shortenHex_1(value);
  }

  value = value
    .replace(/(rgb|hsl)a?\((\-?\d+),(\-?\d+\%?),(\-?\d+\%?),(0*[1-9]+[0-9]*(\.?\d*)?)\)/gi, function (match, colorFn, p1, p2, p3, alpha) {
      return (parseInt(alpha, 10) >= 1 ? colorFn + '(' + [p1,p2,p3].join(',') + ')' : match);
    })
    .replace(/rgb\((\-?\d+),(\-?\d+),(\-?\d+)\)/gi, function (match, red, green, blue) {
      return shortenRgb_1(red, green, blue);
    })
    .replace(/hsl\((-?\d+),(-?\d+)%?,(-?\d+)%?\)/gi, function (match, hue, saturation, lightness) {
      return shortenHsl_1(hue, saturation, lightness);
    })
    .replace(/(^|[^='"])#([0-9a-f]{6})/gi, function (match, prefix, color, at, inputValue) {
      var suffix = inputValue[at + match.length];

      if (suffix && HEX_VALUE_PATTERN.test(suffix)) {
        return match;
      } else if (color[0] == color[1] && color[2] == color[3] && color[4] == color[5]) {
        return (prefix + '#' + color[0] + color[2] + color[4]).toLowerCase();
      } else {
        return (prefix + '#' + color).toLowerCase();
      }
    })
    .replace(/(^|[^='"])#([0-9a-f]{3})/gi, function (match, prefix, color) {
      return prefix + '#' + color.toLowerCase();
    })
    .replace(/(rgb|rgba|hsl|hsla)\(([^\)]+)\)/gi, function (match, colorFunction, colorDef) {
      var tokens = colorDef.split(',');
      var colorFnLowercase = colorFunction && colorFunction.toLowerCase();
      var applies = (colorFnLowercase == 'hsl' && tokens.length == 3) ||
        (colorFnLowercase == 'hsla' && tokens.length == 4) ||
        (colorFnLowercase == 'rgb' && tokens.length === 3 && colorDef.indexOf('%') > 0) ||
        (colorFnLowercase == 'rgba' && tokens.length == 4 && colorDef.indexOf('%') > 0);

      if (!applies) {
        return match;
      }

      if (tokens[1].indexOf('%') == -1) {
        tokens[1] += '%';
      }

      if (tokens[2].indexOf('%') == -1) {
        tokens[2] += '%';
      }

      return colorFunction + '(' + tokens.join(',') + ')';
    });

  if (compatibility.colors.opacity && name.indexOf('background') == -1) {
    value = value.replace(/(?:rgba|hsla)\(0,0%?,0%?,0\)/g, function (match) {
      if (split_1(value, ',').pop().indexOf('gradient(') > -1) {
        return match;
      }

      return 'transparent';
    });
  }

  return shortenHex_1(value);
}

function optimizeFilter(property) {
  if (property.value.length == 1) {
    property.value[0][1] = property.value[0][1].replace(/progid:DXImageTransform\.Microsoft\.(Alpha|Chroma)(\W)/, function (match, filter, suffix) {
      return filter.toLowerCase() + suffix;
    });
  }

  property.value[0][1] = property.value[0][1]
    .replace(/,(\S)/g, ', $1')
    .replace(/ ?= ?/g, '=');
}

function optimizeFontWeight(property, atIndex) {
  var value = property.value[atIndex][1];

  if (value == 'normal') {
    value = '400';
  } else if (value == 'bold') {
    value = '700';
  }

  property.value[atIndex][1] = value;
}

function optimizeMultipleZeros(property) {
  var values = property.value;
  var spliceAt;

  if (values.length == 4 && values[0][1] === '0' && values[1][1] === '0' && values[2][1] === '0' && values[3][1] === '0') {
    if (property.name.indexOf('box-shadow') > -1) {
      spliceAt = 2;
    } else {
      spliceAt = 1;
    }
  }

  if (spliceAt) {
    property.value.splice(spliceAt);
    property.dirty = true;
  }
}

function optimizeOutline(property) {
  var values = property.value;

  if (values.length == 1 && values[0][1] == 'none') {
    values[0][1] = '0';
  }
}

function optimizePixelLengths(_, value, compatibility) {
  if (!WHOLE_PIXEL_VALUE.test(value)) {
    return value;
  }

  return value.replace(WHOLE_PIXEL_VALUE, function (match, val) {
    var newValue;
    var intVal = parseInt(val);

    if (intVal === 0) {
      return match;
    }

    if (compatibility.properties.shorterLengthUnits && compatibility.units.pt && intVal * 3 % 4 === 0) {
      newValue = intVal * 3 / 4 + 'pt';
    }

    if (compatibility.properties.shorterLengthUnits && compatibility.units.pc && intVal % 16 === 0) {
      newValue = intVal / 16 + 'pc';
    }

    if (compatibility.properties.shorterLengthUnits && compatibility.units.in && intVal % 96 === 0) {
      newValue = intVal / 96 + 'in';
    }

    if (newValue) {
      newValue = match.substring(0, match.indexOf(val)) + newValue;
    }

    return newValue && newValue.length < match.length ? newValue : match;
  });
}

function optimizePrecision(_, value, precisionOptions) {
  if (!precisionOptions.enabled || value.indexOf('.') === -1) {
    return value;
  }

  return value
    .replace(precisionOptions.decimalPointMatcher, '$1$2$3')
    .replace(precisionOptions.zeroMatcher, function (match, integerPart, fractionPart, unit) {
      var multiplier = precisionOptions.units[unit].multiplier;
      var parsedInteger = parseInt(integerPart);
      var integer = isNaN(parsedInteger) ? 0 : parsedInteger;
      var fraction = parseFloat(fractionPart);

      return Math.round((integer + fraction) * multiplier) / multiplier + unit;
    });
}

function optimizeTimeUnits(_, value) {
  if (!TIME_VALUE.test(value))
    return value;

  return value.replace(TIME_VALUE, function (match, val, unit) {
    var newValue;

    if (unit == 'ms') {
      newValue = parseInt(val) / 1000 + 's';
    } else if (unit == 's') {
      newValue = parseFloat(val) * 1000 + 'ms';
    }

    return newValue.length < match.length ? newValue : match;
  });
}

function optimizeUnits(name, value, unitsRegexp) {
  if (/^(?:\-moz\-calc|\-webkit\-calc|calc|rgb|hsl|rgba|hsla)\(/.test(value)) {
    return value;
  }

  if (name == 'flex' || name == '-ms-flex' || name == '-webkit-flex' || name == 'flex-basis' || name == '-webkit-flex-basis') {
    return value;
  }

  if (value.indexOf('%') > 0 && (name == 'height' || name == 'max-height' || name == 'width' || name == 'max-width')) {
    return value;
  }

  return value
    .replace(unitsRegexp, '$1' + '0' + '$2')
    .replace(unitsRegexp, '$1' + '0' + '$2');
}

function optimizeWhitespace(name, value) {
  if (name.indexOf('filter') > -1 || value.indexOf(' ') == -1 || value.indexOf('expression') === 0) {
    return value;
  }

  if (value.indexOf(marker.SINGLE_QUOTE) > -1 || value.indexOf(marker.DOUBLE_QUOTE) > -1) {
    return value;
  }

  value = value.replace(/\s+/g, ' ');

  if (value.indexOf('calc') > -1) {
    value = value.replace(/\) ?\/ ?/g, ')/ ');
  }

  return value
    .replace(/(\(;?)\s+/g, '$1')
    .replace(/\s+(;?\))/g, '$1')
    .replace(/, /g, ',');
}

function optimizeZeroDegUnit(_, value) {
  if (value.indexOf('0deg') == -1) {
    return value;
  }

  return value.replace(/\(0deg\)/g, '(0)');
}

function optimizeZeroUnits(name, value) {
  if (value.indexOf('0') == -1) {
    return value;
  }

  if (value.indexOf('-') > -1) {
    value = value
      .replace(/([^\w\d\-]|^)\-0([^\.]|$)/g, '$10$2')
      .replace(/([^\w\d\-]|^)\-0([^\.]|$)/g, '$10$2');
  }

  return value
    .replace(/(^|\s)0+([1-9])/g, '$1$2')
    .replace(/(^|\D)\.0+(\D|$)/g, '$10$2')
    .replace(/(^|\D)\.0+(\D|$)/g, '$10$2')
    .replace(/\.([1-9]*)0+(\D|$)/g, function (match, nonZeroPart, suffix) {
      return (nonZeroPart.length > 0 ? '.' : '') + nonZeroPart + suffix;
    })
    .replace(/(^|\D)0\.(\d)/g, '$1.$2');
}

function removeQuotes$1(name, value) {
  if (name == 'content' || name.indexOf('font-variation-settings') > -1 || name.indexOf('font-feature-settings') > -1 || name == 'grid' || name.indexOf('grid-') > -1) {
    return value;
  }

  return QUOTED_BUT_SAFE_PATTERN.test(value) ?
    value.substring(1, value.length - 1) :
    value;
}

function removeUrlQuotes(value) {
  return /^url\(['"].+['"]\)$/.test(value) && !/^url\(['"].*[\*\s\(\)'"].*['"]\)$/.test(value) && !/^url\(['"]data:[^;]+;charset/.test(value) ?
    value.replace(/["']/g, '') :
    value;
}

function transformValue(propertyName, propertyValue, rule, transformCallback) {
  var selector = serializeRules(rule);
  var transformedValue = transformCallback(propertyName, propertyValue, selector);

  if (transformedValue === undefined) {
    return propertyValue;
  } else if (transformedValue === false) {
    return IgnoreProperty;
  } else {
    return transformedValue;
  }
}

//

function optimizeBody(rule, properties, context) {
  var options = context.options;
  var levelOptions = options.level[OptimizationLevel$1.One];
  var property, name, type, value;
  var valueIsUrl;
  var propertyToken;
  var _properties = wrapForOptimizing$1(properties, true);

  propertyLoop:
  for (var i = 0, l = _properties.length; i < l; i++) {
    property = _properties[i];
    name = property.name;

    if (!PROPERTY_NAME_PATTERN.test(name)) {
      propertyToken = property.all[property.position];
      context.warnings.push('Invalid property name \'' + name + '\' at ' + formatPosition_1(propertyToken[1][2][0]) + '. Ignoring.');
      property.unused = true;
    }

    if (property.value.length === 0) {
      propertyToken = property.all[property.position];
      context.warnings.push('Empty property \'' + name + '\' at ' + formatPosition_1(propertyToken[1][2][0]) + '. Ignoring.');
      property.unused = true;
    }

    if (property.hack && (
        (property.hack[0] == hack.ASTERISK || property.hack[0] == hack.UNDERSCORE) && !options.compatibility.properties.iePrefixHack ||
        property.hack[0] == hack.BACKSLASH && !options.compatibility.properties.ieSuffixHack ||
        property.hack[0] == hack.BANG && !options.compatibility.properties.ieBangHack)) {
      property.unused = true;
    }

    if (levelOptions.removeNegativePaddings && name.indexOf('padding') === 0 && (isNegative(property.value[0]) || isNegative(property.value[1]) || isNegative(property.value[2]) || isNegative(property.value[3]))) {
      property.unused = true;
    }

    if (!options.compatibility.properties.ieFilters && isLegacyFilter(property)) {
      property.unused = true;
    }

    if (property.unused) {
      continue;
    }

    if (property.block) {
      optimizeBody(rule, property.value[0][1], context);
      continue;
    }

    if (VARIABLE_NAME_PATTERN.test(name)) {
      continue;
    }

    for (var j = 0, m = property.value.length; j < m; j++) {
      type = property.value[j][0];
      value = property.value[j][1];
      valueIsUrl = isUrl(value);

      if (type == token.PROPERTY_BLOCK) {
        property.unused = true;
        context.warnings.push('Invalid value token at ' + formatPosition_1(value[0][1][2][0]) + '. Ignoring.');
        break;
      }

      if (valueIsUrl && !context.validator.isUrl(value)) {
        property.unused = true;
        context.warnings.push('Broken URL \'' + value + '\' at ' + formatPosition_1(property.value[j][2][0]) + '. Ignoring.');
        break;
      }

      if (valueIsUrl) {
        value = levelOptions.normalizeUrls ?
          normalizeUrl(value) :
          value;
        value = !options.compatibility.properties.urlQuotes ?
          removeUrlQuotes(value) :
          value;
      } else if (isQuoted(value) || isLocal(value)) {
        value = levelOptions.removeQuotes ?
          removeQuotes$1(name, value) :
          value;
      } else {
        value = levelOptions.removeWhitespace ?
          optimizeWhitespace(name, value) :
          value;
        value = optimizePrecision(name, value, options.precision);
        value = optimizePixelLengths(name, value, options.compatibility);
        value = levelOptions.replaceTimeUnits ?
          optimizeTimeUnits(name, value) :
          value;
        value = levelOptions.replaceZeroUnits ?
          optimizeZeroUnits(name, value) :
          value;

        if (options.compatibility.properties.zeroUnits) {
          value = optimizeZeroDegUnit(name, value);
          value = optimizeUnits(name, value, options.unitsRegexp);
        }

        if (options.compatibility.properties.colors) {
          value = optimizeColors(name, value, options.compatibility);
        }
      }

      value = transformValue(name, value, rule, levelOptions.transform);

      if (value === IgnoreProperty) {
        property.unused = true;
        continue propertyLoop;
      }

      property.value[j][1] = value;
    }

    if (levelOptions.replaceMultipleZeros) {
      optimizeMultipleZeros(property);
    }

    if (name == 'background' && levelOptions.optimizeBackground) {
      optimizeBackground(property);
    } else if (name.indexOf('border') === 0 && name.indexOf('radius') > 0 && levelOptions.optimizeBorderRadius) {
      optimizeBorderRadius(property);
    } else if (name == 'filter'&& levelOptions.optimizeFilter && options.compatibility.properties.ieFilters) {
      optimizeFilter(property);
    } else if (name == 'font-weight' && levelOptions.optimizeFontWeight) {
      optimizeFontWeight(property, 0);
    } else if (name == 'outline' && levelOptions.optimizeOutline) {
      optimizeOutline(property);
    }
  }

  restoreFromOptimizing_1(_properties);
  removeUnused_1(_properties);
  removeComments(properties, options);
}

function removeComments(tokens, options) {
  var token$1;
  var i;

  for (i = 0; i < tokens.length; i++) {
    token$1 = tokens[i];

    if (token$1[0] != token.COMMENT) {
      continue;
    }

    optimizeComment(token$1, options);

    if (token$1[1].length === 0) {
      tokens.splice(i, 1);
      i--;
    }
  }
}

function optimizeComment(token, options) {
  if (token[1][2] == marker.EXCLAMATION && (options.level[OptimizationLevel$1.One].specialComments == 'all' || options.commentsKept < options.level[OptimizationLevel$1.One].specialComments)) {
    options.commentsKept++;
    return;
  }

  token[1] = [];
}

function cleanupCharsets(tokens) {
  var hasCharset = false;

  for (var i = 0, l = tokens.length; i < l; i++) {
    var token$1 = tokens[i];

    if (token$1[0] != token.AT_RULE)
      continue;

    if (!CHARSET_REGEXP.test(token$1[1]))
      continue;

    if (hasCharset || token$1[1].indexOf(CHARSET_TOKEN) == -1) {
      tokens.splice(i, 1);
      i--;
      l--;
    } else {
      hasCharset = true;
      tokens.splice(i, 1);
      tokens.unshift([token.AT_RULE, token$1[1].replace(CHARSET_REGEXP, CHARSET_TOKEN)]);
    }
  }
}

function buildUnitRegexp(options) {
  var units = ['px', 'em', 'ex', 'cm', 'mm', 'in', 'pt', 'pc', '%'];
  var otherUnits = ['ch', 'rem', 'vh', 'vm', 'vmax', 'vmin', 'vw'];

  otherUnits.forEach(function (unit) {
    if (options.compatibility.units[unit]) {
      units.push(unit);
    }
  });

  return new RegExp('(^|\\s|\\(|,)0(?:' + units.join('|') + ')(\\W|$)', 'g');
}

function buildPrecisionOptions(roundingPrecision) {
  var precisionOptions = {
    matcher: null,
    units: {},
  };
  var optimizable = [];
  var unit;
  var value;

  for (unit in roundingPrecision) {
    value = roundingPrecision[unit];

    if (value != DEFAULT_ROUNDING_PRECISION) {
      precisionOptions.units[unit] = {};
      precisionOptions.units[unit].value = value;
      precisionOptions.units[unit].multiplier = Math.pow(10, value);

      optimizable.push(unit);
    }
  }

  if (optimizable.length > 0) {
    precisionOptions.enabled = true;
    precisionOptions.decimalPointMatcher = new RegExp('(\\d)\\.($|' + optimizable.join('|') + ')($|\W)', 'g');
    precisionOptions.zeroMatcher = new RegExp('(\\d*)(\\.\\d+)(' + optimizable.join('|') + ')', 'g');
  }

  return precisionOptions;
}

function isImport(token) {
  return IMPORT_PREFIX_PATTERN.test(token[1]);
}

function isLegacyFilter(property) {
  var value;

  if (property.name == 'filter' || property.name == '-ms-filter') {
    value = property.value[0][1];

    return value.indexOf('progid') > -1 ||
      value.indexOf('alpha') === 0 ||
      value.indexOf('chroma') === 0;
  } else {
    return false;
  }
}

function level1Optimize(tokens, context) {
  var options = context.options;
  var levelOptions = options.level[OptimizationLevel$1.One];
  var ie7Hack = options.compatibility.selectors.ie7Hack;
  var adjacentSpace = options.compatibility.selectors.adjacentSpace;
  var spaceAfterClosingBrace = options.compatibility.properties.spaceAfterClosingBrace;
  var format = options.format;
  var mayHaveCharset = false;
  var afterRules = false;

  options.unitsRegexp = options.unitsRegexp || buildUnitRegexp(options);
  options.precision = options.precision || buildPrecisionOptions(levelOptions.roundingPrecision);
  options.commentsKept = options.commentsKept || 0;

  for (var i = 0, l = tokens.length; i < l; i++) {
    var token$1 = tokens[i];

    switch (token$1[0]) {
      case token.AT_RULE:
        token$1[1] = isImport(token$1) && afterRules ? '' : token$1[1];
        token$1[1] = levelOptions.tidyAtRules ? tidyAtRule_1(token$1[1]) : token$1[1];
        mayHaveCharset = true;
        break;
      case token.AT_RULE_BLOCK:
        optimizeBody(token$1[1], token$1[2], context);
        afterRules = true;
        break;
      case token.NESTED_BLOCK:
        token$1[1] = levelOptions.tidyBlockScopes ? tidyBlock_1(token$1[1], spaceAfterClosingBrace) : token$1[1];
        level1Optimize(token$1[2], context);
        afterRules = true;
        break;
      case token.COMMENT:
        optimizeComment(token$1, options);
        break;
      case token.RULE:
        token$1[1] = levelOptions.tidySelectors ? tidyRules_1(token$1[1], !ie7Hack, adjacentSpace, format, context.warnings) : token$1[1];
        token$1[1] = token$1[1].length > 1 ? sortSelectors_1(token$1[1], levelOptions.selectorsSortingMethod) : token$1[1];
        optimizeBody(token$1[1], token$1[2], context);
        afterRules = true;
        break;
    }

    if (token$1[0] == token.COMMENT && token$1[1].length === 0 || levelOptions.removeEmpty && (token$1[1].length === 0 || (token$1[2] && token$1[2].length === 0))) {
      tokens.splice(i, 1);
      i--;
      l--;
    }
  }

  if (levelOptions.cleanupCharsets && mayHaveCharset) {
    cleanupCharsets(tokens);
  }

  return tokens;
}

var optimize$1 = level1Optimize;

var DEEP_SELECTOR_PATTERN = /\/deep\//;
var DOUBLE_COLON_PATTERN = /^::/;
var NOT_PSEUDO = ':not';
var PSEUDO_CLASSES_WITH_ARGUMENTS = [
  ':dir',
  ':lang',
  ':not',
  ':nth-child',
  ':nth-last-child',
  ':nth-last-of-type',
  ':nth-of-type'
];
var RELATION_PATTERN$1 = /[>\+~]/;
var UNMIXABLE_PSEUDO_CLASSES = [
  ':after',
  ':before',
  ':first-letter',
  ':first-line',
  ':lang'
];
var UNMIXABLE_PSEUDO_ELEMENTS = [
  '::after',
  '::before',
  '::first-letter',
  '::first-line'
];

var Level = {
  DOUBLE_QUOTE: 'double-quote',
  SINGLE_QUOTE: 'single-quote',
  ROOT: 'root'
};

function isMergeable(selector, mergeablePseudoClasses, mergeablePseudoElements, multiplePseudoMerging) {
  var singleSelectors = split_1(selector, marker.COMMA);
  var singleSelector;
  var i, l;

  for (i = 0, l = singleSelectors.length; i < l; i++) {
    singleSelector = singleSelectors[i];

    if (singleSelector.length === 0 ||
        isDeepSelector(singleSelector) ||
        (singleSelector.indexOf(marker.COLON) > -1 && !areMergeable(singleSelector, extractPseudoFrom(singleSelector), mergeablePseudoClasses, mergeablePseudoElements, multiplePseudoMerging))) {
      return false;
    }
  }

  return true;
}

function isDeepSelector(selector) {
  return DEEP_SELECTOR_PATTERN.test(selector);
}

function extractPseudoFrom(selector) {
  var list = [];
  var character;
  var buffer = [];
  var level = Level.ROOT;
  var roundBracketLevel = 0;
  var isQuoted;
  var isEscaped;
  var isPseudo = false;
  var isRelation;
  var wasColon = false;
  var index;
  var len;

  for (index = 0, len = selector.length; index < len; index++) {
    character = selector[index];

    isRelation = !isEscaped && RELATION_PATTERN$1.test(character);
    isQuoted = level == Level.DOUBLE_QUOTE || level == Level.SINGLE_QUOTE;

    if (isEscaped) {
      buffer.push(character);
    } else if (character == marker.DOUBLE_QUOTE && level == Level.ROOT) {
      buffer.push(character);
      level = Level.DOUBLE_QUOTE;
    } else if (character == marker.DOUBLE_QUOTE && level == Level.DOUBLE_QUOTE) {
      buffer.push(character);
      level = Level.ROOT;
    } else if (character == marker.SINGLE_QUOTE && level == Level.ROOT) {
      buffer.push(character);
      level = Level.SINGLE_QUOTE;
    } else if (character == marker.SINGLE_QUOTE && level == Level.SINGLE_QUOTE) {
      buffer.push(character);
      level = Level.ROOT;
    } else if (isQuoted) {
      buffer.push(character);
    } else if (character == marker.OPEN_ROUND_BRACKET) {
      buffer.push(character);
      roundBracketLevel++;
    } else if (character == marker.CLOSE_ROUND_BRACKET && roundBracketLevel == 1 && isPseudo) {
      buffer.push(character);
      list.push(buffer.join(''));
      roundBracketLevel--;
      buffer = [];
      isPseudo = false;
    } else if (character == marker.CLOSE_ROUND_BRACKET) {
      buffer.push(character);
      roundBracketLevel--;
    } else if (character == marker.COLON && roundBracketLevel === 0 && isPseudo && !wasColon) {
      list.push(buffer.join(''));
      buffer = [];
      buffer.push(character);
    } else if (character == marker.COLON && roundBracketLevel === 0 && !wasColon) {
      buffer = [];
      buffer.push(character);
      isPseudo = true;
    } else if (character == marker.SPACE && roundBracketLevel === 0 && isPseudo) {
      list.push(buffer.join(''));
      buffer = [];
      isPseudo = false;
    } else if (isRelation && roundBracketLevel === 0 && isPseudo) {
      list.push(buffer.join(''));
      buffer = [];
      isPseudo = false;
    } else {
      buffer.push(character);
    }

    isEscaped = character == marker.BACK_SLASH;
    wasColon = character == marker.COLON;
  }

  if (buffer.length > 0 && isPseudo) {
    list.push(buffer.join(''));
  }

  return list;
}

function areMergeable(selector, matches, mergeablePseudoClasses, mergeablePseudoElements, multiplePseudoMerging) {
  return areAllowed(matches, mergeablePseudoClasses, mergeablePseudoElements) &&
    needArguments(matches) &&
    (matches.length < 2 || !someIncorrectlyChained(selector, matches)) &&
    (matches.length < 2 || multiplePseudoMerging && allMixable(matches));
}

function areAllowed(matches, mergeablePseudoClasses, mergeablePseudoElements) {
  var match;
  var name;
  var i, l;

  for (i = 0, l = matches.length; i < l; i++) {
    match = matches[i];
    name = match.indexOf(marker.OPEN_ROUND_BRACKET) > -1 ?
      match.substring(0, match.indexOf(marker.OPEN_ROUND_BRACKET)) :
      match;

    if (mergeablePseudoClasses.indexOf(name) === -1 && mergeablePseudoElements.indexOf(name) === -1) {
      return false;
    }
  }

  return true;
}

function needArguments(matches) {
  var match;
  var name;
  var bracketOpensAt;
  var hasArguments;
  var i, l;

  for (i = 0, l = matches.length; i < l; i++) {
    match = matches[i];

    bracketOpensAt = match.indexOf(marker.OPEN_ROUND_BRACKET);
    hasArguments = bracketOpensAt > -1;
    name = hasArguments ?
      match.substring(0, bracketOpensAt) :
      match;

    if (hasArguments && PSEUDO_CLASSES_WITH_ARGUMENTS.indexOf(name) == -1) {
      return false;
    }

    if (!hasArguments && PSEUDO_CLASSES_WITH_ARGUMENTS.indexOf(name) > -1) {
      return false;
    }
  }

  return true;
}

function someIncorrectlyChained(selector, matches) {
  var positionInSelector = 0;
  var match;
  var matchAt;
  var nextMatch;
  var nextMatchAt;
  var name;
  var nextName;
  var areChained;
  var i, l;

  for (i = 0, l = matches.length; i < l; i++) {
    match = matches[i];
    nextMatch = matches[i + 1];

    if (!nextMatch) {
      break;
    }

    matchAt = selector.indexOf(match, positionInSelector);
    nextMatchAt = selector.indexOf(match, matchAt + 1);
    positionInSelector = nextMatchAt;
    areChained = matchAt + match.length == nextMatchAt;

    if (areChained) {
      name = match.indexOf(marker.OPEN_ROUND_BRACKET) > -1 ?
        match.substring(0, match.indexOf(marker.OPEN_ROUND_BRACKET)) :
        match;
      nextName = nextMatch.indexOf(marker.OPEN_ROUND_BRACKET) > -1 ?
        nextMatch.substring(0, nextMatch.indexOf(marker.OPEN_ROUND_BRACKET)) :
        nextMatch;

      if (name != NOT_PSEUDO || nextName != NOT_PSEUDO) {
        return true;
      }
    }
  }

  return false;
}

function allMixable(matches) {
  var unmixableMatches = 0;
  var match;
  var i, l;

  for (i = 0, l = matches.length; i < l; i++) {
    match = matches[i];

    if (isPseudoElement(match)) {
      unmixableMatches += UNMIXABLE_PSEUDO_ELEMENTS.indexOf(match) > -1 ? 1 : 0;
    } else {
      unmixableMatches += UNMIXABLE_PSEUDO_CLASSES.indexOf(match) > -1 ? 1 : 0;
    }

    if (unmixableMatches > 1) {
      return false;
    }
  }

  return true;
}

function isPseudoElement(pseudo) {
  return DOUBLE_COLON_PATTERN.test(pseudo);
}

var isMergeable_1 = isMergeable;

function everyValuesPair(fn, left, right) {
  var leftSize = left.value.length;
  var rightSize = right.value.length;
  var total = Math.max(leftSize, rightSize);
  var lowerBound = Math.min(leftSize, rightSize) - 1;
  var leftValue;
  var rightValue;
  var position;

  for (position = 0; position < total; position++) {
    leftValue = left.value[position] && left.value[position][1] || leftValue;
    rightValue = right.value[position] && right.value[position][1] || rightValue;

    if (leftValue == marker.COMMA || rightValue == marker.COMMA) {
      continue;
    }

    if (!fn(leftValue, rightValue, position, position <= lowerBound)) {
      return false;
    }
  }

  return true;
}

var everyValuesPair_1 = everyValuesPair;

function hasInherit(property) {
  for (var i = property.value.length - 1; i >= 0; i--) {
    if (property.value[i][1] == 'inherit')
      return true;
  }

  return false;
}

var hasInherit_1 = hasInherit;

function InvalidPropertyError(message) {
  this.name = 'InvalidPropertyError';
  this.message = message;
  this.stack = (new Error()).stack;
}

InvalidPropertyError.prototype = Object.create(Error.prototype);
InvalidPropertyError.prototype.constructor = InvalidPropertyError;

var invalidPropertyError = InvalidPropertyError;

var wrapSingle$1 = wrapForOptimizing.single;






function _anyIsInherit(values) {
  var i, l;

  for (i = 0, l = values.length; i < l; i++) {
    if (values[i][1] == 'inherit') {
      return true;
    }
  }

  return false;
}

function _colorFilter(validator) {
  return function (value) {
    return value[1] == 'invert' || validator.isColor(value[1]) || validator.isPrefixed(value[1]);
  };
}

function _styleFilter(validator) {
  return function (value) {
    return value[1] != 'inherit' && validator.isStyleKeyword(value[1]) && !validator.isColorFunction(value[1]);
  };
}

function _wrapDefault(name, property, compactable) {
  var descriptor = compactable[name];
  if (descriptor.doubleValues && descriptor.defaultValue.length == 2) {
    return wrapSingle$1([
      token.PROPERTY,
      [token.PROPERTY_NAME, name],
      [token.PROPERTY_VALUE, descriptor.defaultValue[0]],
      [token.PROPERTY_VALUE, descriptor.defaultValue[1]]
    ]);
  } else if (descriptor.doubleValues && descriptor.defaultValue.length == 1) {
    return wrapSingle$1([
      token.PROPERTY,
      [token.PROPERTY_NAME, name],
      [token.PROPERTY_VALUE, descriptor.defaultValue[0]]
    ]);
  } else {
    return wrapSingle$1([
      token.PROPERTY,
      [token.PROPERTY_NAME, name],
      [token.PROPERTY_VALUE, descriptor.defaultValue]
    ]);
  }
}

function _widthFilter(validator) {
  return function (value) {
    return value[1] != 'inherit' &&
      (validator.isWidth(value[1]) || validator.isUnit(value[1]) && !validator.isDynamicUnit(value[1])) &&
      !validator.isStyleKeyword(value[1]) &&
      !validator.isColorFunction(value[1]);
  };
}

function animation(property, compactable, validator) {
  var duration = _wrapDefault(property.name + '-duration', property, compactable);
  var timing = _wrapDefault(property.name + '-timing-function', property, compactable);
  var delay = _wrapDefault(property.name + '-delay', property, compactable);
  var iteration = _wrapDefault(property.name + '-iteration-count', property, compactable);
  var direction = _wrapDefault(property.name + '-direction', property, compactable);
  var fill = _wrapDefault(property.name + '-fill-mode', property, compactable);
  var play = _wrapDefault(property.name + '-play-state', property, compactable);
  var name = _wrapDefault(property.name + '-name', property, compactable);
  var components = [duration, timing, delay, iteration, direction, fill, play, name];
  var values = property.value;
  var value;
  var durationSet = false;
  var timingSet = false;
  var delaySet = false;
  var iterationSet = false;
  var directionSet = false;
  var fillSet = false;
  var playSet = false;
  var nameSet = false;
  var i;
  var l;

  if (property.value.length == 1 && property.value[0][1] == 'inherit') {
    duration.value = timing.value = delay.value = iteration.value = direction.value = fill.value = play.value = name.value = property.value;
    return components;
  }

  if (values.length > 1 && _anyIsInherit(values)) {
    throw new invalidPropertyError('Invalid animation values at ' + formatPosition_1(values[0][2][0]) + '. Ignoring.');
  }

  for (i = 0, l = values.length; i < l; i++) {
    value = values[i];

    if (validator.isTime(value[1]) && !durationSet) {
      duration.value = [value];
      durationSet = true;
    } else if (validator.isTime(value[1]) && !delaySet) {
      delay.value = [value];
      delaySet = true;
    } else if ((validator.isGlobal(value[1]) || validator.isTimingFunction(value[1])) && !timingSet) {
      timing.value = [value];
      timingSet = true;
    } else if ((validator.isAnimationIterationCountKeyword(value[1]) || validator.isPositiveNumber(value[1])) && !iterationSet) {
      iteration.value = [value];
      iterationSet = true;
    } else if (validator.isAnimationDirectionKeyword(value[1]) && !directionSet) {
      direction.value = [value];
      directionSet = true;
    } else if (validator.isAnimationFillModeKeyword(value[1]) && !fillSet) {
      fill.value = [value];
      fillSet = true;
    } else if (validator.isAnimationPlayStateKeyword(value[1]) && !playSet) {
      play.value = [value];
      playSet = true;
    } else if ((validator.isAnimationNameKeyword(value[1]) || validator.isIdentifier(value[1])) && !nameSet) {
      name.value = [value];
      nameSet = true;
    } else {
      throw new invalidPropertyError('Invalid animation value at ' + formatPosition_1(value[2][0]) + '. Ignoring.');
    }
  }

  return components;
}

function background(property, compactable, validator) {
  var image = _wrapDefault('background-image', property, compactable);
  var position = _wrapDefault('background-position', property, compactable);
  var size = _wrapDefault('background-size', property, compactable);
  var repeat = _wrapDefault('background-repeat', property, compactable);
  var attachment = _wrapDefault('background-attachment', property, compactable);
  var origin = _wrapDefault('background-origin', property, compactable);
  var clip = _wrapDefault('background-clip', property, compactable);
  var color = _wrapDefault('background-color', property, compactable);
  var components = [image, position, size, repeat, attachment, origin, clip, color];
  var values = property.value;

  var positionSet = false;
  var clipSet = false;
  var originSet = false;
  var repeatSet = false;

  var anyValueSet = false;

  if (property.value.length == 1 && property.value[0][1] == 'inherit') {
    // NOTE: 'inherit' is not a valid value for background-attachment
    color.value = image.value =  repeat.value = position.value = size.value = origin.value = clip.value = property.value;
    return components;
  }

  if (property.value.length == 1 && property.value[0][1] == '0 0') {
    return components;
  }

  for (var i = values.length - 1; i >= 0; i--) {
    var value = values[i];

    if (validator.isBackgroundAttachmentKeyword(value[1])) {
      attachment.value = [value];
      anyValueSet = true;
    } else if (validator.isBackgroundClipKeyword(value[1]) || validator.isBackgroundOriginKeyword(value[1])) {
      if (clipSet) {
        origin.value = [value];
        originSet = true;
      } else {
        clip.value = [value];
        clipSet = true;
      }
      anyValueSet = true;
    } else if (validator.isBackgroundRepeatKeyword(value[1])) {
      if (repeatSet) {
        repeat.value.unshift(value);
      } else {
        repeat.value = [value];
        repeatSet = true;
      }
      anyValueSet = true;
    } else if (validator.isBackgroundPositionKeyword(value[1]) || validator.isBackgroundSizeKeyword(value[1]) || validator.isUnit(value[1]) || validator.isDynamicUnit(value[1])) {
      if (i > 0) {
        var previousValue = values[i - 1];

        if (previousValue[1] == marker.FORWARD_SLASH) {
          size.value = [value];
        } else if (i > 1 && values[i - 2][1] == marker.FORWARD_SLASH) {
          size.value = [previousValue, value];
          i -= 2;
        } else {
          if (!positionSet)
            position.value = [];

          position.value.unshift(value);
          positionSet = true;
        }
      } else {
        if (!positionSet)
          position.value = [];

        position.value.unshift(value);
        positionSet = true;
      }
      anyValueSet = true;
    } else if ((color.value[0][1] == compactable[color.name].defaultValue || color.value[0][1] == 'none') && (validator.isColor(value[1]) || validator.isPrefixed(value[1]))) {
      color.value = [value];
      anyValueSet = true;
    } else if (validator.isUrl(value[1]) || validator.isFunction(value[1])) {
      image.value = [value];
      anyValueSet = true;
    }
  }

  if (clipSet && !originSet)
    origin.value = clip.value.slice(0);

  if (!anyValueSet) {
    throw new invalidPropertyError('Invalid background value at ' + formatPosition_1(values[0][2][0]) + '. Ignoring.');
  }

  return components;
}

function borderRadius(property, compactable) {
  var values = property.value;
  var splitAt = -1;

  for (var i = 0, l = values.length; i < l; i++) {
    if (values[i][1] == marker.FORWARD_SLASH) {
      splitAt = i;
      break;
    }
  }

  if (splitAt === 0 || splitAt === values.length - 1) {
    throw new invalidPropertyError('Invalid border-radius value at ' + formatPosition_1(values[0][2][0]) + '. Ignoring.');
  }

  var target = _wrapDefault(property.name, property, compactable);
  target.value = splitAt > -1 ?
    values.slice(0, splitAt) :
    values.slice(0);
  target.components = fourValues(target, compactable);

  var remainder = _wrapDefault(property.name, property, compactable);
  remainder.value = splitAt > -1 ?
    values.slice(splitAt + 1) :
    values.slice(0);
  remainder.components = fourValues(remainder, compactable);

  for (var j = 0; j < 4; j++) {
    target.components[j].multiplex = true;
    target.components[j].value = target.components[j].value.concat(remainder.components[j].value);
  }

  return target.components;
}

function font(property, compactable, validator) {
  var style = _wrapDefault('font-style', property, compactable);
  var variant = _wrapDefault('font-variant', property, compactable);
  var weight = _wrapDefault('font-weight', property, compactable);
  var stretch = _wrapDefault('font-stretch', property, compactable);
  var size = _wrapDefault('font-size', property, compactable);
  var height = _wrapDefault('line-height', property, compactable);
  var family = _wrapDefault('font-family', property, compactable);
  var components = [style, variant, weight, stretch, size, height, family];
  var values = property.value;
  var fuzzyMatched = 4; // style, variant, weight, and stretch
  var index = 0;
  var isStretchSet = false;
  var isStretchValid;
  var isStyleSet = false;
  var isStyleValid;
  var isVariantSet = false;
  var isVariantValid;
  var isWeightSet = false;
  var isWeightValid;
  var isSizeSet = false;
  var appendableFamilyName = false;

  if (!values[index]) {
    throw new invalidPropertyError('Missing font values at ' + formatPosition_1(property.all[property.position][1][2][0]) + '. Ignoring.');
  }

  if (values.length == 1 && values[0][1] == 'inherit') {
    style.value = variant.value = weight.value = stretch.value = size.value = height.value = family.value = values;
    return components;
  }

  if (values.length == 1 && (validator.isFontKeyword(values[0][1]) || validator.isGlobal(values[0][1]) || validator.isPrefixed(values[0][1]))) {
    values[0][1] = marker.INTERNAL + values[0][1];
    style.value = variant.value = weight.value = stretch.value = size.value = height.value = family.value = values;
    return components;
  }

  if (values.length < 2 || !_anyIsFontSize(values, validator) || !_anyIsFontFamily(values, validator)) {
    throw new invalidPropertyError('Invalid font values at ' + formatPosition_1(property.all[property.position][1][2][0]) + '. Ignoring.');
  }

  if (values.length > 1 && _anyIsInherit(values)) {
    throw new invalidPropertyError('Invalid font values at ' + formatPosition_1(values[0][2][0]) + '. Ignoring.');
  }

  // fuzzy match style, variant, weight, and stretch on first elements
  while (index < fuzzyMatched) {
    isStretchValid = validator.isFontStretchKeyword(values[index][1]) || validator.isGlobal(values[index][1]);
    isStyleValid = validator.isFontStyleKeyword(values[index][1]) || validator.isGlobal(values[index][1]);
    isVariantValid = validator.isFontVariantKeyword(values[index][1]) || validator.isGlobal(values[index][1]);
    isWeightValid = validator.isFontWeightKeyword(values[index][1]) || validator.isGlobal(values[index][1]);

    if (isStyleValid && !isStyleSet) {
      style.value = [values[index]];
      isStyleSet = true;
    } else if (isVariantValid && !isVariantSet) {
      variant.value = [values[index]];
      isVariantSet = true;
    } else if (isWeightValid && !isWeightSet) {
      weight.value = [values[index]];
      isWeightSet = true;
    } else if (isStretchValid && !isStretchSet) {
      stretch.value = [values[index]];
      isStretchSet = true;
    } else if (isStyleValid && isStyleSet || isVariantValid && isVariantSet || isWeightValid && isWeightSet || isStretchValid && isStretchSet) {
      throw new invalidPropertyError('Invalid font style / variant / weight / stretch value at ' + formatPosition_1(values[0][2][0]) + '. Ignoring.');
    } else {
      break;
    }

    index++;
  }

  // now comes font-size ...
  if (validator.isFontSizeKeyword(values[index][1]) || validator.isUnit(values[index][1]) && !validator.isDynamicUnit(values[index][1])) {
    size.value = [values[index]];
    isSizeSet = true;
    index++;
  } else {
    throw new invalidPropertyError('Missing font size at ' + formatPosition_1(values[0][2][0]) + '. Ignoring.');
  }

  if (!values[index]) {
    throw new invalidPropertyError('Missing font family at ' + formatPosition_1(values[0][2][0]) + '. Ignoring.');
  }

  // ... and perhaps line-height
  if (isSizeSet && values[index] && values[index][1] == marker.FORWARD_SLASH && values[index + 1] && (validator.isLineHeightKeyword(values[index + 1][1]) || validator.isUnit(values[index + 1][1]) || validator.isNumber(values[index + 1][1]))) {
    height.value = [values[index + 1]];
    index++;
    index++;
  }

  // ... and whatever comes next is font-family
  family.value = [];

  while (values[index]) {
    if (values[index][1] == marker.COMMA) {
      appendableFamilyName = false;
    } else {
      if (appendableFamilyName) {
        family.value[family.value.length - 1][1] += marker.SPACE + values[index][1];
      } else {
        family.value.push(values[index]);
      }

      appendableFamilyName = true;
    }

    index++;
  }

  if (family.value.length === 0) {
    throw new invalidPropertyError('Missing font family at ' + formatPosition_1(values[0][2][0]) + '. Ignoring.');
  }

  return components;
}

function _anyIsFontSize(values, validator) {
  var value;
  var i, l;

  for (i = 0, l = values.length; i < l; i++) {
    value = values[i];

    if (validator.isFontSizeKeyword(value[1]) || validator.isUnit(value[1]) && !validator.isDynamicUnit(value[1]) || validator.isFunction(value[1])) {
      return true;
    }
  }

  return false;
}

function _anyIsFontFamily(values, validator) {
  var value;
  var i, l;

  for (i = 0, l = values.length; i < l; i++) {
    value = values[i];

    if (validator.isIdentifier(value[1])) {
      return true;
    }
  }

  return false;
}

function fourValues(property, compactable) {
  var componentNames = compactable[property.name].components;
  var components = [];
  var value = property.value;

  if (value.length < 1)
    return [];

  if (value.length < 2)
    value[1] = value[0].slice(0);
  if (value.length < 3)
    value[2] = value[0].slice(0);
  if (value.length < 4)
    value[3] = value[1].slice(0);

  for (var i = componentNames.length - 1; i >= 0; i--) {
    var component = wrapSingle$1([
      token.PROPERTY,
      [token.PROPERTY_NAME, componentNames[i]]
    ]);
    component.value = [value[i]];
    components.unshift(component);
  }

  return components;
}

function multiplex(splitWith) {
  return function (property, compactable, validator) {
    var splitsAt = [];
    var values = property.value;
    var i, j, l, m;

    // find split commas
    for (i = 0, l = values.length; i < l; i++) {
      if (values[i][1] == ',')
        splitsAt.push(i);
    }

    if (splitsAt.length === 0)
      return splitWith(property, compactable, validator);

    var splitComponents = [];

    // split over commas, and into components
    for (i = 0, l = splitsAt.length; i <= l; i++) {
      var from = i === 0 ? 0 : splitsAt[i - 1] + 1;
      var to = i < l ? splitsAt[i] : values.length;

      var _property = _wrapDefault(property.name, property, compactable);
      _property.value = values.slice(from, to);

      splitComponents.push(splitWith(_property, compactable, validator));
    }

    var components = splitComponents[0];

    // group component values from each split
    for (i = 0, l = components.length; i < l; i++) {
      components[i].multiplex = true;

      for (j = 1, m = splitComponents.length; j < m; j++) {
        components[i].value.push([token.PROPERTY_VALUE, marker.COMMA]);
        Array.prototype.push.apply(components[i].value, splitComponents[j][i].value);
      }
    }

    return components;
  };
}

function listStyle(property, compactable, validator) {
  var type = _wrapDefault('list-style-type', property, compactable);
  var position = _wrapDefault('list-style-position', property, compactable);
  var image = _wrapDefault('list-style-image', property, compactable);
  var components = [type, position, image];

  if (property.value.length == 1 && property.value[0][1] == 'inherit') {
    type.value = position.value = image.value = [property.value[0]];
    return components;
  }

  var values = property.value.slice(0);
  var total = values.length;
  var index = 0;

  // `image` first...
  for (index = 0, total = values.length; index < total; index++) {
    if (validator.isUrl(values[index][1]) || values[index][1] == '0') {
      image.value = [values[index]];
      values.splice(index, 1);
      break;
    }
  }

  // ... then `position`
  for (index = 0, total = values.length; index < total; index++) {
    if (validator.isListStylePositionKeyword(values[index][1])) {
      position.value = [values[index]];
      values.splice(index, 1);
      break;
    }
  }

  // ... and what's left is a `type`
  if (values.length > 0 && (validator.isListStyleTypeKeyword(values[0][1]) || validator.isIdentifier(values[0][1]))) {
    type.value = [values[0]];
  }

  return components;
}

function transition(property, compactable, validator) {
  var prop = _wrapDefault(property.name + '-property', property, compactable);
  var duration = _wrapDefault(property.name + '-duration', property, compactable);
  var timing = _wrapDefault(property.name + '-timing-function', property, compactable);
  var delay = _wrapDefault(property.name + '-delay', property, compactable);
  var components = [prop, duration, timing, delay];
  var values = property.value;
  var value;
  var durationSet = false;
  var delaySet = false;
  var propSet = false;
  var timingSet = false;
  var i;
  var l;

  if (property.value.length == 1 && property.value[0][1] == 'inherit') {
    prop.value = duration.value = timing.value = delay.value = property.value;
    return components;
  }

  if (values.length > 1 && _anyIsInherit(values)) {
    throw new invalidPropertyError('Invalid animation values at ' + formatPosition_1(values[0][2][0]) + '. Ignoring.');
  }

  for (i = 0, l = values.length; i < l; i++) {
    value = values[i];

    if (validator.isTime(value[1]) && !durationSet) {
      duration.value = [value];
      durationSet = true;
    } else if (validator.isTime(value[1]) && !delaySet) {
      delay.value = [value];
      delaySet = true;
    } else if ((validator.isGlobal(value[1]) || validator.isTimingFunction(value[1])) && !timingSet) {
      timing.value = [value];
      timingSet = true;
    } else if (validator.isIdentifier(value[1]) && !propSet) {
      prop.value = [value];
      propSet = true;
    } else {
      throw new invalidPropertyError('Invalid animation value at ' + formatPosition_1(value[2][0]) + '. Ignoring.');
    }
  }

  return components;
}

function widthStyleColor(property, compactable, validator) {
  var descriptor = compactable[property.name];
  var components = [
    _wrapDefault(descriptor.components[0], property, compactable),
    _wrapDefault(descriptor.components[1], property, compactable),
    _wrapDefault(descriptor.components[2], property, compactable)
  ];
  var color, style, width;

  for (var i = 0; i < 3; i++) {
    var component = components[i];

    if (component.name.indexOf('color') > 0)
      color = component;
    else if (component.name.indexOf('style') > 0)
      style = component;
    else
      width = component;
  }

  if ((property.value.length == 1 && property.value[0][1] == 'inherit') ||
      (property.value.length == 3 && property.value[0][1] == 'inherit' && property.value[1][1] == 'inherit' && property.value[2][1] == 'inherit')) {
    color.value = style.value = width.value = [property.value[0]];
    return components;
  }

  var values = property.value.slice(0);
  var match, matches;

  // NOTE: usually users don't follow the required order of parts in this shorthand,
  // so we'll try to parse it caring as little about order as possible

  if (values.length > 0) {
    matches = values.filter(_widthFilter(validator));
    match = matches.length > 1 && (matches[0][1] == 'none' || matches[0][1] == 'auto') ? matches[1] : matches[0];
    if (match) {
      width.value = [match];
      values.splice(values.indexOf(match), 1);
    }
  }

  if (values.length > 0) {
    match = values.filter(_styleFilter(validator))[0];
    if (match) {
      style.value = [match];
      values.splice(values.indexOf(match), 1);
    }
  }

  if (values.length > 0) {
    match = values.filter(_colorFilter(validator))[0];
    if (match) {
      color.value = [match];
      values.splice(values.indexOf(match), 1);
    }
  }

  return components;
}

var breakUp = {
  animation: animation,
  background: background,
  border: widthStyleColor,
  borderRadius: borderRadius,
  font: font,
  fourValues: fourValues,
  listStyle: listStyle,
  multiplex: multiplex,
  outline: widthStyleColor,
  transition: transition
};

var VENDOR_PREFIX_PATTERN = /(?:^|\W)(\-\w+\-)/g;

function unique(value) {
  var prefixes = [];
  var match;

  while ((match = VENDOR_PREFIX_PATTERN.exec(value)) !== null) {
    if (prefixes.indexOf(match[0]) == -1) {
      prefixes.push(match[0]);
    }
  }

  return prefixes;
}

function same(value1, value2) {
  return unique(value1).sort().join(',') == unique(value2).sort().join(',');
}

var vendorPrefixes = {
  unique: unique,
  same: same
};

var sameVendorPrefixes = vendorPrefixes.same;

function understandable(validator, value1, value2, _position, isPaired) {
  if (!sameVendorPrefixes(value1, value2)) {
    return false;
  }

  if (isPaired && validator.isVariable(value1) !== validator.isVariable(value2)) {
    return false;
  }

  return true;
}

var understandable_1 = understandable;

function animationIterationCount(validator, value1, value2) {
  if (!understandable_1(validator, value1, value2, 0, true) && !(validator.isAnimationIterationCountKeyword(value2) || validator.isPositiveNumber(value2))) {
    return false;
  } else if (validator.isVariable(value1) && validator.isVariable(value2)) {
    return true;
  }

  return validator.isAnimationIterationCountKeyword(value2) || validator.isPositiveNumber(value2);
}

function animationName(validator, value1, value2) {
  if (!understandable_1(validator, value1, value2, 0, true) && !(validator.isAnimationNameKeyword(value2) || validator.isIdentifier(value2))) {
    return false;
  } else if (validator.isVariable(value1) && validator.isVariable(value2)) {
    return true;
  }

  return validator.isAnimationNameKeyword(value2) || validator.isIdentifier(value2);
}

function areSameFunction(validator, value1, value2) {
  if (!validator.isFunction(value1) || !validator.isFunction(value2)) {
    return false;
  }

  var function1Name = value1.substring(0, value1.indexOf('('));
  var function2Name = value2.substring(0, value2.indexOf('('));

  return function1Name === function2Name;
}

function backgroundPosition(validator, value1, value2) {
  if (!understandable_1(validator, value1, value2, 0, true) && !(validator.isBackgroundPositionKeyword(value2) || validator.isGlobal(value2))) {
    return false;
  } else if (validator.isVariable(value1) && validator.isVariable(value2)) {
    return true;
  } else if (validator.isBackgroundPositionKeyword(value2) || validator.isGlobal(value2)) {
    return true;
  }

  return unit(validator, value1, value2);
}

function backgroundSize(validator, value1, value2) {
  if (!understandable_1(validator, value1, value2, 0, true) && !(validator.isBackgroundSizeKeyword(value2) || validator.isGlobal(value2))) {
    return false;
  } else if (validator.isVariable(value1) && validator.isVariable(value2)) {
    return true;
  } else if (validator.isBackgroundSizeKeyword(value2) || validator.isGlobal(value2)) {
    return true;
  }

  return unit(validator, value1, value2);
}

function color(validator, value1, value2) {
  if (!understandable_1(validator, value1, value2, 0, true) && !validator.isColor(value2)) {
    return false;
  } else if (validator.isVariable(value1) && validator.isVariable(value2)) {
    return true;
  } else if (!validator.colorOpacity && (validator.isRgbColor(value1) || validator.isHslColor(value1))) {
    return false;
  } else if (!validator.colorOpacity && (validator.isRgbColor(value2) || validator.isHslColor(value2))) {
    return false;
  } else if (validator.isColor(value1) && validator.isColor(value2)) {
    return true;
  }

  return sameFunctionOrValue(validator, value1, value2);
}

function components(overrideCheckers) {
  return function (validator, value1, value2, position) {
    return overrideCheckers[position](validator, value1, value2);
  };
}

function fontFamily(validator, value1, value2) {
  return understandable_1(validator, value1, value2, 0, true);
}

function image(validator, value1, value2) {
  if (!understandable_1(validator, value1, value2, 0, true) && !validator.isImage(value2)) {
    return false;
  } else if (validator.isVariable(value1) && validator.isVariable(value2)) {
    return true;
  } else if (validator.isImage(value2)) {
    return true;
  } else if (validator.isImage(value1)) {
    return false;
  }

  return sameFunctionOrValue(validator, value1, value2);
}

function keyword(propertyName) {
  return function(validator, value1, value2) {
    if (!understandable_1(validator, value1, value2, 0, true) && !validator.isKeyword(propertyName)(value2)) {
      return false;
    } else if (validator.isVariable(value1) && validator.isVariable(value2)) {
      return true;
    }

    return validator.isKeyword(propertyName)(value2);
  };
}

function keywordWithGlobal(propertyName) {
  return function(validator, value1, value2) {
    if (!understandable_1(validator, value1, value2, 0, true) && !(validator.isKeyword(propertyName)(value2) || validator.isGlobal(value2))) {
      return false;
    } else if (validator.isVariable(value1) && validator.isVariable(value2)) {
      return true;
    }

    return validator.isKeyword(propertyName)(value2) || validator.isGlobal(value2);
  };
}

function propertyName(validator, value1, value2) {
  if (!understandable_1(validator, value1, value2, 0, true) && !validator.isIdentifier(value2)) {
    return false;
  } else if (validator.isVariable(value1) && validator.isVariable(value2)) {
    return true;
  }

  return validator.isIdentifier(value2);
}

function sameFunctionOrValue(validator, value1, value2) {
  return areSameFunction(validator, value1, value2) ?
    true :
    value1 === value2;
}

function textShadow(validator, value1, value2) {
  if (!understandable_1(validator, value1, value2, 0, true) && !(validator.isUnit(value2) || validator.isColor(value2) || validator.isGlobal(value2))) {
    return false;
  } else if (validator.isVariable(value1) && validator.isVariable(value2)) {
    return true;
  }

  return validator.isUnit(value2) || validator.isColor(value2) || validator.isGlobal(value2);
}

function time(validator, value1, value2) {
  if (!understandable_1(validator, value1, value2, 0, true) && !validator.isTime(value2)) {
    return false;
  } else if (validator.isVariable(value1) && validator.isVariable(value2)) {
    return true;
  } else if (validator.isTime(value1) && !validator.isTime(value2)) {
    return false;
  } else if (validator.isTime(value2)) {
    return true;
  } else if (validator.isTime(value1)) {
    return false;
  } else if (validator.isFunction(value1) && !validator.isPrefixed(value1) && validator.isFunction(value2) && !validator.isPrefixed(value2)) {
    return true;
  }

  return sameFunctionOrValue(validator, value1, value2);
}

function timingFunction(validator, value1, value2) {
  if (!understandable_1(validator, value1, value2, 0, true) && !(validator.isTimingFunction(value2) || validator.isGlobal(value2))) {
    return false;
  } else if (validator.isVariable(value1) && validator.isVariable(value2)) {
    return true;
  }

  return validator.isTimingFunction(value2) || validator.isGlobal(value2);
}

function unit(validator, value1, value2) {
  if (!understandable_1(validator, value1, value2, 0, true) && !validator.isUnit(value2)) {
    return false;
  } else if (validator.isVariable(value1) && validator.isVariable(value2)) {
    return true;
  } else if (validator.isUnit(value1) && !validator.isUnit(value2)) {
    return false;
  } else if (validator.isUnit(value2)) {
    return true;
  } else if (validator.isUnit(value1)) {
    return false;
  } else if (validator.isFunction(value1) && !validator.isPrefixed(value1) && validator.isFunction(value2) && !validator.isPrefixed(value2)) {
    return true;
  }

  return sameFunctionOrValue(validator, value1, value2);
}

function unitOrKeywordWithGlobal(propertyName) {
  var byKeyword = keywordWithGlobal(propertyName);

  return function(validator, value1, value2) {
    return unit(validator, value1, value2) || byKeyword(validator, value1, value2);
  };
}

function unitOrNumber(validator, value1, value2) {
  if (!understandable_1(validator, value1, value2, 0, true) && !(validator.isUnit(value2) || validator.isNumber(value2))) {
    return false;
  } else if (validator.isVariable(value1) && validator.isVariable(value2)) {
    return true;
  } else if ((validator.isUnit(value1) || validator.isNumber(value1)) && !(validator.isUnit(value2) || validator.isNumber(value2))) {
    return false;
  } else if (validator.isUnit(value2) || validator.isNumber(value2)) {
    return true;
  } else if (validator.isUnit(value1) || validator.isNumber(value1)) {
    return false;
  } else if (validator.isFunction(value1) && !validator.isPrefixed(value1) && validator.isFunction(value2) && !validator.isPrefixed(value2)) {
    return true;
  }

  return sameFunctionOrValue(validator, value1, value2);
}

function zIndex(validator, value1, value2) {
  if (!understandable_1(validator, value1, value2, 0, true) && !validator.isZIndex(value2)) {
    return false;
  } else if (validator.isVariable(value1) && validator.isVariable(value2)) {
    return true;
  }

  return validator.isZIndex(value2);
}

var canOverride = {
  generic: {
    color: color,
    components: components,
    image: image,
    propertyName: propertyName,
    time: time,
    timingFunction: timingFunction,
    unit: unit,
    unitOrNumber: unitOrNumber
  },
  property: {
    animationDirection: keywordWithGlobal('animation-direction'),
    animationFillMode: keyword('animation-fill-mode'),
    animationIterationCount: animationIterationCount,
    animationName: animationName,
    animationPlayState: keywordWithGlobal('animation-play-state'),
    backgroundAttachment: keyword('background-attachment'),
    backgroundClip: keywordWithGlobal('background-clip'),
    backgroundOrigin: keyword('background-origin'),
    backgroundPosition: backgroundPosition,
    backgroundRepeat: keyword('background-repeat'),
    backgroundSize: backgroundSize,
    bottom: unitOrKeywordWithGlobal('bottom'),
    borderCollapse: keyword('border-collapse'),
    borderStyle: keywordWithGlobal('*-style'),
    clear: keywordWithGlobal('clear'),
    cursor: keywordWithGlobal('cursor'),
    display: keywordWithGlobal('display'),
    float: keywordWithGlobal('float'),
    left: unitOrKeywordWithGlobal('left'),
    fontFamily: fontFamily,
    fontStretch: keywordWithGlobal('font-stretch'),
    fontStyle: keywordWithGlobal('font-style'),
    fontVariant: keywordWithGlobal('font-variant'),
    fontWeight: keywordWithGlobal('font-weight'),
    listStyleType: keywordWithGlobal('list-style-type'),
    listStylePosition: keywordWithGlobal('list-style-position'),
    outlineStyle: keywordWithGlobal('*-style'),
    overflow: keywordWithGlobal('overflow'),
    position: keywordWithGlobal('position'),
    right: unitOrKeywordWithGlobal('right'),
    textAlign: keywordWithGlobal('text-align'),
    textDecoration: keywordWithGlobal('text-decoration'),
    textOverflow: keywordWithGlobal('text-overflow'),
    textShadow: textShadow,
    top: unitOrKeywordWithGlobal('top'),
    transform: sameFunctionOrValue,
    verticalAlign: unitOrKeywordWithGlobal('vertical-align'),
    visibility: keywordWithGlobal('visibility'),
    whiteSpace: keywordWithGlobal('white-space'),
    zIndex: zIndex
  }
};

var wrapSingle$2 = wrapForOptimizing.single;



function deep(property) {
  var cloned = shallow(property);
  for (var i = property.components.length - 1; i >= 0; i--) {
    var component = shallow(property.components[i]);
    component.value = property.components[i].value.slice(0);
    cloned.components.unshift(component);
  }

  cloned.dirty = true;
  cloned.value = property.value.slice(0);

  return cloned;
}

function shallow(property) {
  var cloned = wrapSingle$2([
    token.PROPERTY,
    [token.PROPERTY_NAME, property.name]
  ]);
  cloned.important = property.important;
  cloned.hack = property.hack;
  cloned.unused = false;
  return cloned;
}

var clone = {
  deep: deep,
  shallow: shallow
};

var shallowClone = clone.shallow;




function isInheritOnly(values) {
  for (var i = 0, l = values.length; i < l; i++) {
    var value = values[i][1];

    if (value != 'inherit' && value != marker.COMMA && value != marker.FORWARD_SLASH)
      return false;
  }

  return true;
}

function background$1(property, compactable, lastInMultiplex) {
  var components = property.components;
  var restored = [];
  var needsOne, needsBoth;

  function restoreValue(component) {
    Array.prototype.unshift.apply(restored, component.value);
  }

  function isDefaultValue(component) {
    var descriptor = compactable[component.name];

    if (descriptor.doubleValues && descriptor.defaultValue.length == 1) {
      return component.value[0][1] == descriptor.defaultValue[0] && (component.value[1] ? component.value[1][1] == descriptor.defaultValue[0] : true);
    } else if (descriptor.doubleValues && descriptor.defaultValue.length != 1) {
      return component.value[0][1] == descriptor.defaultValue[0] && (component.value[1] ? component.value[1][1] : component.value[0][1]) == descriptor.defaultValue[1];
    } else {
      return component.value[0][1] == descriptor.defaultValue;
    }
  }

  for (var i = components.length - 1; i >= 0; i--) {
    var component = components[i];
    var isDefault = isDefaultValue(component);

    if (component.name == 'background-clip') {
      var originComponent = components[i - 1];
      var isOriginDefault = isDefaultValue(originComponent);

      needsOne = component.value[0][1] == originComponent.value[0][1];

      needsBoth = !needsOne && (
        (isOriginDefault && !isDefault) ||
        (!isOriginDefault && !isDefault) ||
        (!isOriginDefault && isDefault && component.value[0][1] != originComponent.value[0][1]));

      if (needsOne) {
        restoreValue(originComponent);
      } else if (needsBoth) {
        restoreValue(component);
        restoreValue(originComponent);
      }

      i--;
    } else if (component.name == 'background-size') {
      var positionComponent = components[i - 1];
      var isPositionDefault = isDefaultValue(positionComponent);

      needsOne = !isPositionDefault && isDefault;

      needsBoth = !needsOne &&
        (isPositionDefault && !isDefault || !isPositionDefault && !isDefault);

      if (needsOne) {
        restoreValue(positionComponent);
      } else if (needsBoth) {
        restoreValue(component);
        restored.unshift([token.PROPERTY_VALUE, marker.FORWARD_SLASH]);
        restoreValue(positionComponent);
      } else if (positionComponent.value.length == 1) {
        restoreValue(positionComponent);
      }

      i--;
    } else {
      if (isDefault || compactable[component.name].multiplexLastOnly && !lastInMultiplex)
        continue;

      restoreValue(component);
    }
  }

  if (restored.length === 0 && property.value.length == 1 && property.value[0][1] == '0')
    restored.push(property.value[0]);

  if (restored.length === 0)
    restored.push([token.PROPERTY_VALUE, compactable[property.name].defaultValue]);

  if (isInheritOnly(restored))
    return [restored[0]];

  return restored;
}

function borderRadius$1(property, compactable) {
  if (property.multiplex) {
    var horizontal = shallowClone(property);
    var vertical = shallowClone(property);

    for (var i = 0; i < 4; i++) {
      var component = property.components[i];

      var horizontalComponent = shallowClone(property);
      horizontalComponent.value = [component.value[0]];
      horizontal.components.push(horizontalComponent);

      var verticalComponent = shallowClone(property);
      // FIXME: only shorthand compactor (see breakup#borderRadius) knows that border radius
      // longhands have two values, whereas tokenizer does not care about populating 2nd value
      // if it's missing, hence this fallback
      verticalComponent.value = [component.value[1] || component.value[0]];
      vertical.components.push(verticalComponent);
    }

    var horizontalValues = fourValues$1(horizontal);
    var verticalValues = fourValues$1(vertical);

    if (horizontalValues.length == verticalValues.length &&
        horizontalValues[0][1] == verticalValues[0][1] &&
        (horizontalValues.length > 1 ? horizontalValues[1][1] == verticalValues[1][1] : true) &&
        (horizontalValues.length > 2 ? horizontalValues[2][1] == verticalValues[2][1] : true) &&
        (horizontalValues.length > 3 ? horizontalValues[3][1] == verticalValues[3][1] : true)) {
      return horizontalValues;
    } else {
      return horizontalValues.concat([[token.PROPERTY_VALUE, marker.FORWARD_SLASH]]).concat(verticalValues);
    }
  } else {
    return fourValues$1(property);
  }
}

function font$1(property, compactable) {
  var components = property.components;
  var restored = [];
  var component;
  var componentIndex = 0;
  var fontFamilyIndex = 0;

  if (property.value[0][1].indexOf(marker.INTERNAL) === 0) {
    property.value[0][1] = property.value[0][1].substring(marker.INTERNAL.length);
    return property.value;
  }

  // first four components are optional
  while (componentIndex < 4) {
    component = components[componentIndex];

    if (component.value[0][1] != compactable[component.name].defaultValue) {
      Array.prototype.push.apply(restored, component.value);
    }

    componentIndex++;
  }

  // then comes font-size
  Array.prototype.push.apply(restored, components[componentIndex].value);
  componentIndex++;

  // then may come line-height
  if (components[componentIndex].value[0][1] != compactable[components[componentIndex].name].defaultValue) {
    Array.prototype.push.apply(restored, [[token.PROPERTY_VALUE, marker.FORWARD_SLASH]]);
    Array.prototype.push.apply(restored, components[componentIndex].value);
  }

  componentIndex++;

  // then comes font-family
  while (components[componentIndex].value[fontFamilyIndex]) {
    restored.push(components[componentIndex].value[fontFamilyIndex]);

    if (components[componentIndex].value[fontFamilyIndex + 1]) {
      restored.push([token.PROPERTY_VALUE, marker.COMMA]);
    }

    fontFamilyIndex++;
  }

  if (isInheritOnly(restored)) {
    return [restored[0]];
  }

  return restored;
}

function fourValues$1(property) {
  var components = property.components;
  var value1 = components[0].value[0];
  var value2 = components[1].value[0];
  var value3 = components[2].value[0];
  var value4 = components[3].value[0];

  if (value1[1] == value2[1] && value1[1] == value3[1] && value1[1] == value4[1]) {
    return [value1];
  } else if (value1[1] == value3[1] && value2[1] == value4[1]) {
    return [value1, value2];
  } else if (value2[1] == value4[1]) {
    return [value1, value2, value3];
  } else {
    return [value1, value2, value3, value4];
  }
}

function multiplex$1(restoreWith) {
  return function (property, compactable) {
    if (!property.multiplex)
      return restoreWith(property, compactable, true);

    var multiplexSize = 0;
    var restored = [];
    var componentMultiplexSoFar = {};
    var i, l;

    // At this point we don't know what's the multiplex size, e.g. how many background layers are there
    for (i = 0, l = property.components[0].value.length; i < l; i++) {
      if (property.components[0].value[i][1] == marker.COMMA)
        multiplexSize++;
    }

    for (i = 0; i <= multiplexSize; i++) {
      var _property = shallowClone(property);

      // We split multiplex into parts and restore them one by one
      for (var j = 0, m = property.components.length; j < m; j++) {
        var componentToClone = property.components[j];
        var _component = shallowClone(componentToClone);
        _property.components.push(_component);

        // The trick is some properties has more than one value, so we iterate over values looking for
        // a multiplex separator - a comma
        for (var k = componentMultiplexSoFar[_component.name] || 0, n = componentToClone.value.length; k < n; k++) {
          if (componentToClone.value[k][1] == marker.COMMA) {
            componentMultiplexSoFar[_component.name] = k + 1;
            break;
          }

          _component.value.push(componentToClone.value[k]);
        }
      }

      // No we can restore shorthand value
      var lastInMultiplex = i == multiplexSize;
      var _restored = restoreWith(_property, compactable, lastInMultiplex);
      Array.prototype.push.apply(restored, _restored);

      if (i < multiplexSize)
        restored.push([token.PROPERTY_VALUE, marker.COMMA]);
    }

    return restored;
  };
}

function withoutDefaults(property, compactable) {
  var components = property.components;
  var restored = [];

  for (var i = components.length - 1; i >= 0; i--) {
    var component = components[i];
    var descriptor = compactable[component.name];

    if (component.value[0][1] != descriptor.defaultValue || ('keepUnlessDefault' in descriptor) && !isDefault(components, compactable, descriptor.keepUnlessDefault)) {
      restored.unshift(component.value[0]);
    }
  }

  if (restored.length === 0)
    restored.push([token.PROPERTY_VALUE, compactable[property.name].defaultValue]);

  if (isInheritOnly(restored))
    return [restored[0]];

  return restored;
}

function isDefault(components, compactable, propertyName) {
  var component;
  var i, l;

  for (i = 0, l = components.length; i < l; i++) {
    component = components[i];

    if (component.name == propertyName && component.value[0][1] == compactable[propertyName].defaultValue) {
      return true;
    }
  }

  return false;
}

var restore = {
  background: background$1,
  borderRadius: borderRadius$1,
  font: font$1,
  fourValues: fourValues$1,
  multiplex: multiplex$1,
  withoutDefaults: withoutDefaults
};

// Contains the interpretation of CSS properties, as used by the property optimizer







// Properties to process
// Extend this object in order to add support for more properties in the optimizer.
//
// Each key in this object represents a CSS property and should be an object.
// Such an object contains properties that describe how the represented CSS property should be handled.
// Possible options:
//
// * components: array (Only specify for shorthand properties.)
//   Contains the names of the granular properties this shorthand compacts.
//
// * canOverride: function
//   Returns whether two tokens of this property can be merged with each other.
//   This property has no meaning for shorthands.
//
// * defaultValue: string
//   Specifies the default value of the property according to the CSS standard.
//   For shorthand, this is used when every component is set to its default value, therefore it should be the shortest possible default value of all the components.
//
// * shortestValue: string
//   Specifies the shortest possible value the property can possibly have.
//   (Falls back to defaultValue if unspecified.)
//
// * breakUp: function (Only specify for shorthand properties.)
//   Breaks the shorthand up to its components.
//
// * restore: function (Only specify for shorthand properties.)
//   Puts the shorthand together from its components.
//
var compactable = {
  'animation': {
    canOverride: canOverride.generic.components([
      canOverride.generic.time,
      canOverride.generic.timingFunction,
      canOverride.generic.time,
      canOverride.property.animationIterationCount,
      canOverride.property.animationDirection,
      canOverride.property.animationFillMode,
      canOverride.property.animationPlayState,
      canOverride.property.animationName
    ]),
    components: [
      'animation-duration',
      'animation-timing-function',
      'animation-delay',
      'animation-iteration-count',
      'animation-direction',
      'animation-fill-mode',
      'animation-play-state',
      'animation-name'
    ],
    breakUp: breakUp.multiplex(breakUp.animation),
    defaultValue: 'none',
    restore: restore.multiplex(restore.withoutDefaults),
    shorthand: true,
    vendorPrefixes: [
      '-moz-',
      '-o-',
      '-webkit-'
    ]
  },
  'animation-delay': {
    canOverride: canOverride.generic.time,
    componentOf: [
      'animation'
    ],
    defaultValue: '0s',
    intoMultiplexMode: 'real',
    vendorPrefixes: [
      '-moz-',
      '-o-',
      '-webkit-'
    ]
  },
  'animation-direction': {
    canOverride: canOverride.property.animationDirection,
    componentOf: [
      'animation'
    ],
    defaultValue: 'normal',
    intoMultiplexMode: 'real',
    vendorPrefixes: [
      '-moz-',
      '-o-',
      '-webkit-'
    ]
  },
  'animation-duration': {
    canOverride: canOverride.generic.time,
    componentOf: [
      'animation'
    ],
    defaultValue: '0s',
    intoMultiplexMode: 'real',
    keepUnlessDefault: 'animation-delay',
    vendorPrefixes: [
      '-moz-',
      '-o-',
      '-webkit-'
    ]
  },
  'animation-fill-mode': {
    canOverride: canOverride.property.animationFillMode,
    componentOf: [
      'animation'
    ],
    defaultValue: 'none',
    intoMultiplexMode: 'real',
    vendorPrefixes: [
      '-moz-',
      '-o-',
      '-webkit-'
    ]
  },
  'animation-iteration-count': {
    canOverride: canOverride.property.animationIterationCount,
    componentOf: [
      'animation'
    ],
    defaultValue: '1',
    intoMultiplexMode: 'real',
    vendorPrefixes: [
      '-moz-',
      '-o-',
      '-webkit-'
    ]
  },
  'animation-name': {
    canOverride: canOverride.property.animationName,
    componentOf: [
      'animation'
    ],
    defaultValue: 'none',
    intoMultiplexMode: 'real',
    vendorPrefixes: [
      '-moz-',
      '-o-',
      '-webkit-'
    ]
  },
  'animation-play-state': {
    canOverride: canOverride.property.animationPlayState,
    componentOf: [
      'animation'
    ],
    defaultValue: 'running',
    intoMultiplexMode: 'real',
    vendorPrefixes: [
      '-moz-',
      '-o-',
      '-webkit-'
    ]
  },
  'animation-timing-function': {
    canOverride: canOverride.generic.timingFunction,
    componentOf: [
      'animation'
    ],
    defaultValue: 'ease',
    intoMultiplexMode: 'real',
    vendorPrefixes: [
      '-moz-',
      '-o-',
      '-webkit-'
    ]
  },
  'background': {
    canOverride: canOverride.generic.components([
      canOverride.generic.image,
      canOverride.property.backgroundPosition,
      canOverride.property.backgroundSize,
      canOverride.property.backgroundRepeat,
      canOverride.property.backgroundAttachment,
      canOverride.property.backgroundOrigin,
      canOverride.property.backgroundClip,
      canOverride.generic.color
    ]),
    components: [
      'background-image',
      'background-position',
      'background-size',
      'background-repeat',
      'background-attachment',
      'background-origin',
      'background-clip',
      'background-color'
    ],
    breakUp: breakUp.multiplex(breakUp.background),
    defaultValue: '0 0',
    restore: restore.multiplex(restore.background),
    shortestValue: '0',
    shorthand: true
  },
  'background-attachment': {
    canOverride: canOverride.property.backgroundAttachment,
    componentOf: [
      'background'
    ],
    defaultValue: 'scroll',
    intoMultiplexMode: 'real'
  },
  'background-clip': {
    canOverride: canOverride.property.backgroundClip,
    componentOf: [
      'background'
    ],
    defaultValue: 'border-box',
    intoMultiplexMode: 'real',
    shortestValue: 'border-box'
  },
  'background-color': {
    canOverride: canOverride.generic.color,
    componentOf: [
      'background'
    ],
    defaultValue: 'transparent',
    intoMultiplexMode: 'real', // otherwise real color will turn into default since color appears in last multiplex only
    multiplexLastOnly: true,
    nonMergeableValue: 'none',
    shortestValue: 'red'
  },
  'background-image': {
    canOverride: canOverride.generic.image,
    componentOf: [
      'background'
    ],
    defaultValue: 'none',
    intoMultiplexMode: 'default'
  },
  'background-origin': {
    canOverride: canOverride.property.backgroundOrigin,
    componentOf: [
      'background'
    ],
    defaultValue: 'padding-box',
    intoMultiplexMode: 'real',
    shortestValue: 'border-box'
  },
  'background-position': {
    canOverride: canOverride.property.backgroundPosition,
    componentOf: [
      'background'
    ],
    defaultValue: ['0', '0'],
    doubleValues: true,
    intoMultiplexMode: 'real',
    shortestValue: '0'
  },
  'background-repeat': {
    canOverride: canOverride.property.backgroundRepeat,
    componentOf: [
      'background'
    ],
    defaultValue: ['repeat'],
    doubleValues: true,
    intoMultiplexMode: 'real'
  },
  'background-size': {
    canOverride: canOverride.property.backgroundSize,
    componentOf: [
      'background'
    ],
    defaultValue: ['auto'],
    doubleValues: true,
    intoMultiplexMode: 'real',
    shortestValue: '0 0'
  },
  'bottom': {
    canOverride: canOverride.property.bottom,
    defaultValue: 'auto'
  },
  'border': {
    breakUp: breakUp.border,
    canOverride: canOverride.generic.components([
      canOverride.generic.unit,
      canOverride.property.borderStyle,
      canOverride.generic.color
    ]),
    components: [
      'border-width',
      'border-style',
      'border-color'
    ],
    defaultValue: 'none',
    overridesShorthands: [
      'border-bottom',
      'border-left',
      'border-right',
      'border-top'
    ],
    restore: restore.withoutDefaults,
    shorthand: true,
    shorthandComponents: true
  },
  'border-bottom': {
    breakUp: breakUp.border,
    canOverride: canOverride.generic.components([
      canOverride.generic.unit,
      canOverride.property.borderStyle,
      canOverride.generic.color
    ]),
    components: [
      'border-bottom-width',
      'border-bottom-style',
      'border-bottom-color'
    ],
    defaultValue: 'none',
    restore: restore.withoutDefaults,
    shorthand: true
  },
  'border-bottom-color': {
    canOverride: canOverride.generic.color,
    componentOf: [
      'border-bottom',
      'border-color'
    ],
    defaultValue: 'none'
  },
  'border-bottom-left-radius': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'border-radius'
    ],
    defaultValue: '0',
    vendorPrefixes: [
      '-moz-',
      '-o-'
    ]
  },
  'border-bottom-right-radius': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'border-radius'
    ],
    defaultValue: '0',
    vendorPrefixes: [
      '-moz-',
      '-o-'
    ]
  },
  'border-bottom-style': {
    canOverride: canOverride.property.borderStyle,
    componentOf: [
      'border-bottom',
      'border-style'
    ],
    defaultValue: 'none'
  },
  'border-bottom-width': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'border-bottom',
      'border-width'
    ],
    defaultValue: 'medium',
    oppositeTo: 'border-top-width',
    shortestValue: '0'
  },
  'border-collapse': {
    canOverride: canOverride.property.borderCollapse,
    defaultValue: 'separate'
  },
  'border-color': {
    breakUp: breakUp.fourValues,
    canOverride: canOverride.generic.components([
      canOverride.generic.color,
      canOverride.generic.color,
      canOverride.generic.color,
      canOverride.generic.color
    ]),
    componentOf: [
      'border'
    ],
    components: [
      'border-top-color',
      'border-right-color',
      'border-bottom-color',
      'border-left-color'
    ],
    defaultValue: 'none',
    restore: restore.fourValues,
    shortestValue: 'red',
    shorthand: true
  },
  'border-left': {
    breakUp: breakUp.border,
    canOverride: canOverride.generic.components([
      canOverride.generic.unit,
      canOverride.property.borderStyle,
      canOverride.generic.color
    ]),
    components: [
      'border-left-width',
      'border-left-style',
      'border-left-color'
    ],
    defaultValue: 'none',
    restore: restore.withoutDefaults,
    shorthand: true
  },
  'border-left-color': {
    canOverride: canOverride.generic.color,
    componentOf: [
      'border-color',
      'border-left'
    ],
    defaultValue: 'none'
  },
  'border-left-style': {
    canOverride: canOverride.property.borderStyle,
    componentOf: [
      'border-left',
      'border-style'
    ],
    defaultValue: 'none'
  },
  'border-left-width': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'border-left',
      'border-width'
    ],
    defaultValue: 'medium',
    oppositeTo: 'border-right-width',
    shortestValue: '0'
  },
  'border-radius': {
    breakUp: breakUp.borderRadius,
    canOverride: canOverride.generic.components([
      canOverride.generic.unit,
      canOverride.generic.unit,
      canOverride.generic.unit,
      canOverride.generic.unit
    ]),
    components: [
      'border-top-left-radius',
      'border-top-right-radius',
      'border-bottom-right-radius',
      'border-bottom-left-radius'
    ],
    defaultValue: '0',
    restore: restore.borderRadius,
    shorthand: true,
    vendorPrefixes: [
      '-moz-',
      '-o-'
    ]
  },
  'border-right': {
    breakUp: breakUp.border,
    canOverride: canOverride.generic.components([
      canOverride.generic.unit,
      canOverride.property.borderStyle,
      canOverride.generic.color
    ]),
    components: [
      'border-right-width',
      'border-right-style',
      'border-right-color'
    ],
    defaultValue: 'none',
    restore: restore.withoutDefaults,
    shorthand: true
  },
  'border-right-color': {
    canOverride: canOverride.generic.color,
    componentOf: [
      'border-color',
      'border-right'
    ],
    defaultValue: 'none'
  },
  'border-right-style': {
    canOverride: canOverride.property.borderStyle,
    componentOf: [
      'border-right',
      'border-style'
    ],
    defaultValue: 'none'
  },
  'border-right-width': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'border-right',
      'border-width'
    ],
    defaultValue: 'medium',
    oppositeTo: 'border-left-width',
    shortestValue: '0'
  },
  'border-style': {
    breakUp: breakUp.fourValues,
    canOverride: canOverride.generic.components([
      canOverride.property.borderStyle,
      canOverride.property.borderStyle,
      canOverride.property.borderStyle,
      canOverride.property.borderStyle
    ]),
    componentOf: [
      'border'
    ],
    components: [
      'border-top-style',
      'border-right-style',
      'border-bottom-style',
      'border-left-style'
    ],
    defaultValue: 'none',
    restore: restore.fourValues,
    shorthand: true
  },
  'border-top': {
    breakUp: breakUp.border,
    canOverride: canOverride.generic.components([
      canOverride.generic.unit,
      canOverride.property.borderStyle,
      canOverride.generic.color
    ]),
    components: [
      'border-top-width',
      'border-top-style',
      'border-top-color'
    ],
    defaultValue: 'none',
    restore: restore.withoutDefaults,
    shorthand: true
  },
  'border-top-color': {
    canOverride: canOverride.generic.color,
    componentOf: [
      'border-color',
      'border-top'
    ],
    defaultValue: 'none'
  },
  'border-top-left-radius': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'border-radius'
    ],
    defaultValue: '0',
    vendorPrefixes: [
      '-moz-',
      '-o-'
    ]
  },
  'border-top-right-radius': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'border-radius'
    ],
    defaultValue: '0',
    vendorPrefixes: [
      '-moz-',
      '-o-'
    ]
  },
  'border-top-style': {
    canOverride: canOverride.property.borderStyle,
    componentOf: [
      'border-style',
      'border-top'
    ],
    defaultValue: 'none'
  },
  'border-top-width': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'border-top',
      'border-width'
    ],
    defaultValue: 'medium',
    oppositeTo: 'border-bottom-width',
    shortestValue: '0'
  },
  'border-width': {
    breakUp: breakUp.fourValues,
    canOverride: canOverride.generic.components([
      canOverride.generic.unit,
      canOverride.generic.unit,
      canOverride.generic.unit,
      canOverride.generic.unit
    ]),
    componentOf: [
      'border'
    ],
    components: [
      'border-top-width',
      'border-right-width',
      'border-bottom-width',
      'border-left-width'
    ],
    defaultValue: 'medium',
    restore: restore.fourValues,
    shortestValue: '0',
    shorthand: true
  },
  'clear': {
    canOverride: canOverride.property.clear,
    defaultValue: 'none'
  },
  'color': {
    canOverride: canOverride.generic.color,
    defaultValue: 'transparent',
    shortestValue: 'red'
  },
  'cursor': {
    canOverride: canOverride.property.cursor,
    defaultValue: 'auto'
  },
  'display': {
    canOverride: canOverride.property.display,
  },
  'float': {
    canOverride: canOverride.property.float,
    defaultValue: 'none'
  },
  'font': {
    breakUp: breakUp.font,
    canOverride: canOverride.generic.components([
      canOverride.property.fontStyle,
      canOverride.property.fontVariant,
      canOverride.property.fontWeight,
      canOverride.property.fontStretch,
      canOverride.generic.unit,
      canOverride.generic.unit,
      canOverride.property.fontFamily
    ]),
    components: [
      'font-style',
      'font-variant',
      'font-weight',
      'font-stretch',
      'font-size',
      'line-height',
      'font-family'
    ],
    restore: restore.font,
    shorthand: true
  },
  'font-family': {
    canOverride: canOverride.property.fontFamily,
    defaultValue: 'user|agent|specific'
  },
  'font-size': {
    canOverride: canOverride.generic.unit,
    defaultValue: 'medium',
    shortestValue: '0'
  },
  'font-stretch': {
    canOverride: canOverride.property.fontStretch,
    defaultValue: 'normal'
  },
  'font-style': {
    canOverride: canOverride.property.fontStyle,
    defaultValue: 'normal'
  },
  'font-variant': {
    canOverride: canOverride.property.fontVariant,
    defaultValue: 'normal'
  },
  'font-weight': {
    canOverride: canOverride.property.fontWeight,
    defaultValue: 'normal',
    shortestValue: '400'
  },
  'height': {
    canOverride: canOverride.generic.unit,
    defaultValue: 'auto',
    shortestValue: '0'
  },
  'left': {
    canOverride: canOverride.property.left,
    defaultValue: 'auto'
  },
  'line-height': {
    canOverride: canOverride.generic.unitOrNumber,
    defaultValue: 'normal',
    shortestValue: '0'
  },
  'list-style': {
    canOverride: canOverride.generic.components([
      canOverride.property.listStyleType,
      canOverride.property.listStylePosition,
      canOverride.property.listStyleImage
    ]),
    components: [
      'list-style-type',
      'list-style-position',
      'list-style-image'
    ],
    breakUp: breakUp.listStyle,
    restore: restore.withoutDefaults,
    defaultValue: 'outside', // can't use 'disc' because that'd override default 'decimal' for <ol>
    shortestValue: 'none',
    shorthand: true
  },
  'list-style-image' : {
    canOverride: canOverride.generic.image,
    componentOf: [
      'list-style'
    ],
    defaultValue: 'none'
  },
  'list-style-position' : {
    canOverride: canOverride.property.listStylePosition,
    componentOf: [
      'list-style'
    ],
    defaultValue: 'outside',
    shortestValue: 'inside'
  },
  'list-style-type' : {
    canOverride: canOverride.property.listStyleType,
    componentOf: [
      'list-style'
    ],
    // NOTE: we can't tell the real default value here, it's 'disc' for <ul> and 'decimal' for <ol>
    // this is a hack, but it doesn't matter because this value will be either overridden or
    // it will disappear at the final step anyway
    defaultValue: 'decimal|disc',
    shortestValue: 'none'
  },
  'margin': {
    breakUp: breakUp.fourValues,
    canOverride: canOverride.generic.components([
      canOverride.generic.unit,
      canOverride.generic.unit,
      canOverride.generic.unit,
      canOverride.generic.unit
    ]),
    components: [
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left'
    ],
    defaultValue: '0',
    restore: restore.fourValues,
    shorthand: true
  },
  'margin-bottom': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'margin'
    ],
    defaultValue: '0',
    oppositeTo: 'margin-top'
  },
  'margin-left': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'margin'
    ],
    defaultValue: '0',
    oppositeTo: 'margin-right'
  },
  'margin-right': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'margin'
    ],
    defaultValue: '0',
    oppositeTo: 'margin-left'
  },
  'margin-top': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'margin'
    ],
    defaultValue: '0',
    oppositeTo: 'margin-bottom'
  },
  'outline': {
    canOverride: canOverride.generic.components([
      canOverride.generic.color,
      canOverride.property.outlineStyle,
      canOverride.generic.unit
    ]),
    components: [
      'outline-color',
      'outline-style',
      'outline-width'
    ],
    breakUp: breakUp.outline,
    restore: restore.withoutDefaults,
    defaultValue: '0',
    shorthand: true
  },
  'outline-color': {
    canOverride: canOverride.generic.color,
    componentOf: [
      'outline'
    ],
    defaultValue: 'invert',
    shortestValue: 'red'
  },
  'outline-style': {
    canOverride: canOverride.property.outlineStyle,
    componentOf: [
      'outline'
    ],
    defaultValue: 'none'
  },
  'outline-width': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'outline'
    ],
    defaultValue: 'medium',
    shortestValue: '0'
  },
  'overflow': {
    canOverride: canOverride.property.overflow,
    defaultValue: 'visible'
  },
  'overflow-x': {
    canOverride: canOverride.property.overflow,
    defaultValue: 'visible'
  },
  'overflow-y': {
    canOverride: canOverride.property.overflow,
    defaultValue: 'visible'
  },
  'padding': {
    breakUp: breakUp.fourValues,
    canOverride: canOverride.generic.components([
      canOverride.generic.unit,
      canOverride.generic.unit,
      canOverride.generic.unit,
      canOverride.generic.unit
    ]),
    components: [
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left'
    ],
    defaultValue: '0',
    restore: restore.fourValues,
    shorthand: true
  },
  'padding-bottom': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'padding'
    ],
    defaultValue: '0',
    oppositeTo: 'padding-top'
  },
  'padding-left': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'padding'
    ],
    defaultValue: '0',
    oppositeTo: 'padding-right'
  },
  'padding-right': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'padding'
    ],
    defaultValue: '0',
    oppositeTo: 'padding-left'
  },
  'padding-top': {
    canOverride: canOverride.generic.unit,
    componentOf: [
      'padding'
    ],
    defaultValue: '0',
    oppositeTo: 'padding-bottom'
  },
  'position': {
    canOverride: canOverride.property.position,
    defaultValue: 'static'
  },
  'right': {
    canOverride: canOverride.property.right,
    defaultValue: 'auto'
  },
  'text-align': {
    canOverride: canOverride.property.textAlign,
    // NOTE: we can't tell the real default value here, as it depends on default text direction
    // this is a hack, but it doesn't matter because this value will be either overridden or
    // it will disappear anyway
    defaultValue: 'left|right'
  },
  'text-decoration': {
    canOverride: canOverride.property.textDecoration,
    defaultValue: 'none'
  },
  'text-overflow': {
    canOverride: canOverride.property.textOverflow,
    defaultValue: 'none'
  },
  'text-shadow': {
    canOverride: canOverride.property.textShadow,
    defaultValue: 'none'
  },
  'top': {
    canOverride: canOverride.property.top,
    defaultValue: 'auto'
  },
  'transform': {
    canOverride: canOverride.property.transform,
    vendorPrefixes: [
      '-moz-',
      '-ms-',
      '-webkit-'
    ]
  },
  'transition': {
    breakUp: breakUp.multiplex(breakUp.transition),
    canOverride: canOverride.generic.components([
      canOverride.property.transitionProperty,
      canOverride.generic.time,
      canOverride.generic.timingFunction,
      canOverride.generic.time
    ]),
    components: [
      'transition-property',
      'transition-duration',
      'transition-timing-function',
      'transition-delay'
    ],
    defaultValue: 'none',
    restore: restore.multiplex(restore.withoutDefaults),
    shorthand: true,
    vendorPrefixes: [
      '-moz-',
      '-o-',
      '-webkit-'
    ]
  },
  'transition-delay': {
    canOverride: canOverride.generic.time,
    componentOf: [
      'transition'
    ],
    defaultValue: '0s',
    intoMultiplexMode: 'real',
    vendorPrefixes: [
      '-moz-',
      '-o-',
      '-webkit-'
    ]
  },
  'transition-duration': {
    canOverride: canOverride.generic.time,
    componentOf: [
      'transition'
    ],
    defaultValue: '0s',
    intoMultiplexMode: 'real',
    vendorPrefixes: [
      '-moz-',
      '-o-',
      '-webkit-'
    ]
  },
  'transition-property': {
    canOverride: canOverride.generic.propertyName,
    componentOf: [
      'transition'
    ],
    defaultValue: 'all',
    intoMultiplexMode: 'placeholder',
    placeholderValue: '_', // it's a short value that won't match any property and still be a valid `transition-property`
    vendorPrefixes: [
      '-moz-',
      '-o-',
      '-webkit-'
    ]
  },
  'transition-timing-function': {
    canOverride: canOverride.generic.timingFunction,
    componentOf: [
      'transition'
    ],
    defaultValue: 'ease',
    intoMultiplexMode: 'real',
    vendorPrefixes: [
      '-moz-',
      '-o-',
      '-webkit-'
    ]
  },
  'vertical-align': {
    canOverride: canOverride.property.verticalAlign,
    defaultValue: 'baseline'
  },
  'visibility': {
    canOverride: canOverride.property.visibility,
    defaultValue: 'visible'
  },
  'white-space': {
    canOverride: canOverride.property.whiteSpace,
    defaultValue: 'normal'
  },
  'width': {
    canOverride: canOverride.generic.unit,
    defaultValue: 'auto',
    shortestValue: '0'
  },
  'z-index': {
    canOverride: canOverride.property.zIndex,
    defaultValue: 'auto'
  }
};

function cloneDescriptor(propertyName, prefix) {
  var clonedDescriptor = override_1(compactable[propertyName], {});

  if ('componentOf' in clonedDescriptor) {
    clonedDescriptor.componentOf = clonedDescriptor.componentOf.map(function (shorthandName) {
      return prefix + shorthandName;
    });
  }

  if ('components' in clonedDescriptor) {
    clonedDescriptor.components = clonedDescriptor.components.map(function (longhandName) {
      return prefix + longhandName;
    });
  }

  if ('keepUnlessDefault' in clonedDescriptor) {
    clonedDescriptor.keepUnlessDefault = prefix + clonedDescriptor.keepUnlessDefault;
  }

  return clonedDescriptor;
}

// generate vendor-prefixed properties
var vendorPrefixedCompactable = {};

for (var propertyName$1 in compactable) {
  var descriptor = compactable[propertyName$1];

  if (!('vendorPrefixes' in descriptor)) {
    continue;
  }

  for (var i = 0; i < descriptor.vendorPrefixes.length; i++) {
    var prefix = descriptor.vendorPrefixes[i];
    var clonedDescriptor = cloneDescriptor(propertyName$1, prefix);
    delete clonedDescriptor.vendorPrefixes;

    vendorPrefixedCompactable[prefix + propertyName$1] = clonedDescriptor;
  }

  delete descriptor.vendorPrefixes;
}

var compactable_1 = override_1(compactable, vendorPrefixedCompactable);

function populateComponents(properties, validator, warnings) {
  var component;
  var j, m;

  for (var i = properties.length - 1; i >= 0; i--) {
    var property = properties[i];
    var descriptor = compactable_1[property.name];

    if (descriptor && descriptor.shorthand) {
      property.shorthand = true;
      property.dirty = true;

      try {
        property.components = descriptor.breakUp(property, compactable_1, validator);

        if (descriptor.shorthandComponents) {
          for (j = 0, m = property.components.length; j < m; j++) {
            component = property.components[j];
            component.components = compactable_1[component.name].breakUp(component, compactable_1, validator);
          }
        }
      } catch (e) {
        if (e instanceof invalidPropertyError) {
          property.components = []; // this will set property.unused to true below
          warnings.push(e.message);
        } else {
          throw e;
        }
      }

      if (property.components.length > 0)
        property.multiplex = property.components[0].multiplex;
      else
        property.unused = true;
    }
  }
}

var populateComponents_1 = populateComponents;

function restoreWithComponents(property) {
  var descriptor = compactable_1[property.name];

  if (descriptor && descriptor.shorthand) {
    return descriptor.restore(property, compactable_1);
  } else {
    return property.value;
  }
}

var restoreWithComponents_1 = restoreWithComponents;

var deepClone = clone.deep;



var wrapSingle$3 = wrapForOptimizing.single;

var serializeBody = oneTime.body;


function mergeIntoShorthands(properties, validator) {
  var candidates = {};
  var descriptor;
  var componentOf;
  var property;
  var i, l;
  var j, m;

  // there is no shorthand property made up of less than 3 longhands
  if (properties.length < 3) {
    return;
  }

  for (i = 0, l = properties.length; i < l; i++) {
    property = properties[i];
    descriptor = compactable_1[property.name];

    if (property.unused) {
      continue;
    }

    if (property.hack) {
      continue;
    }

    if (property.block) {
      continue;
    }

    invalidateOrCompact(properties, i, candidates, validator);

    if (descriptor && descriptor.componentOf) {
      for (j = 0, m = descriptor.componentOf.length; j < m; j++) {
        componentOf = descriptor.componentOf[j];

        candidates[componentOf] = candidates[componentOf] || {};
        candidates[componentOf][property.name] = property;
      }
    }
  }

  invalidateOrCompact(properties, i, candidates, validator);
}

function invalidateOrCompact(properties, position, candidates, validator) {
  var invalidatedBy = properties[position];
  var shorthandName;
  var shorthandDescriptor;
  var candidateComponents;

  for (shorthandName in candidates) {
    if (undefined !== invalidatedBy && shorthandName == invalidatedBy.name) {
      continue;
    }

    shorthandDescriptor = compactable_1[shorthandName];
    candidateComponents = candidates[shorthandName];
    if (invalidatedBy && invalidates(candidates, shorthandName, invalidatedBy)) {
      delete candidates[shorthandName];
      continue;
    }

    if (shorthandDescriptor.components.length > Object.keys(candidateComponents).length) {
      continue;
    }

    if (mixedImportance(candidateComponents)) {
      continue;
    }

    if (!overridable(candidateComponents, shorthandName, validator)) {
      continue;
    }

    if (!mergeable(candidateComponents)) {
      continue;
    }

    if (mixedInherit(candidateComponents)) {
      replaceWithInheritBestFit(properties, candidateComponents, shorthandName, validator);
    } else {
      replaceWithShorthand(properties, candidateComponents, shorthandName, validator);
    }
  }
}

function invalidates(candidates, shorthandName, invalidatedBy) {
  var shorthandDescriptor = compactable_1[shorthandName];
  var invalidatedByDescriptor = compactable_1[invalidatedBy.name];
  var componentName;

  if ('overridesShorthands' in shorthandDescriptor && shorthandDescriptor.overridesShorthands.indexOf(invalidatedBy.name) > -1) {
    return true;
  }

  if (invalidatedByDescriptor && 'componentOf' in invalidatedByDescriptor) {
    for (componentName in candidates[shorthandName]) {
      if (invalidatedByDescriptor.componentOf.indexOf(componentName) > -1) {
        return true;
      }
    }
  }

  return false;
}

function mixedImportance(components) {
  var important;
  var componentName;

  for (componentName in components) {
    if (undefined !== important && components[componentName].important != important) {
      return true;
    }

    important = components[componentName].important;
  }

  return false;
}

function overridable(components, shorthandName, validator) {
  var descriptor = compactable_1[shorthandName];
  var newValuePlaceholder = [
    token.PROPERTY,
    [token.PROPERTY_NAME, shorthandName],
    [token.PROPERTY_VALUE, descriptor.defaultValue]
  ];
  var newProperty = wrapSingle$3(newValuePlaceholder);
  var component;
  var mayOverride;
  var i, l;

  populateComponents_1([newProperty], validator, []);

  for (i = 0, l = descriptor.components.length; i < l; i++) {
    component = components[descriptor.components[i]];
    mayOverride = compactable_1[component.name].canOverride;

    if (!everyValuesPair_1(mayOverride.bind(null, validator), newProperty.components[i], component)) {
      return false;
    }
  }

  return true;
}

function mergeable(components) {
  var lastCount = null;
  var currentCount;
  var componentName;
  var component;
  var descriptor;
  var values;

  for (componentName in components) {
    component = components[componentName];
    descriptor = compactable_1[componentName];

    if (!('restore' in descriptor)) {
      continue;
    }

    restoreFromOptimizing_1([component.all[component.position]], restoreWithComponents_1);
    values = descriptor.restore(component, compactable_1);

    currentCount = values.length;

    if (lastCount !== null && currentCount !== lastCount) {
      return false;
    }

    lastCount = currentCount;
  }

  return true;
}

function mixedInherit(components) {
  var componentName;
  var lastValue = null;
  var currentValue;

  for (componentName in components) {
    currentValue = hasInherit_1(components[componentName]);

    if (lastValue !== null && lastValue !== currentValue) {
      return true;
    }

    lastValue = currentValue;
  }

  return false;
}

function replaceWithInheritBestFit(properties, candidateComponents, shorthandName, validator) {
  var viaLonghands = buildSequenceWithInheritLonghands(candidateComponents, shorthandName, validator);
  var viaShorthand = buildSequenceWithInheritShorthand(candidateComponents, shorthandName, validator);
  var longhandTokensSequence = viaLonghands[0];
  var shorthandTokensSequence = viaShorthand[0];
  var isLonghandsShorter = serializeBody(longhandTokensSequence).length < serializeBody(shorthandTokensSequence).length;
  var newTokensSequence = isLonghandsShorter ? longhandTokensSequence : shorthandTokensSequence;
  var newProperty = isLonghandsShorter ? viaLonghands[1] : viaShorthand[1];
  var newComponents = isLonghandsShorter ? viaLonghands[2] : viaShorthand[2];
  var all = candidateComponents[Object.keys(candidateComponents)[0]].all;
  var componentName;
  var oldComponent;
  var newComponent;
  var newToken;

  newProperty.position = all.length;
  newProperty.shorthand = true;
  newProperty.dirty = true;
  newProperty.all = all;
  newProperty.all.push(newTokensSequence[0]);

  properties.push(newProperty);

  for (componentName in candidateComponents) {
    oldComponent = candidateComponents[componentName];
    oldComponent.unused = true;

    if (oldComponent.name in newComponents) {
      newComponent = newComponents[oldComponent.name];
      newToken = findTokenIn(newTokensSequence, componentName);

      newComponent.position = all.length;
      newComponent.all = all;
      newComponent.all.push(newToken);

      properties.push(newComponent);
    }
  }
}

function buildSequenceWithInheritLonghands(components, shorthandName, validator) {
  var tokensSequence = [];
  var inheritComponents = {};
  var nonInheritComponents = {};
  var descriptor = compactable_1[shorthandName];
  var shorthandToken = [
    token.PROPERTY,
    [token.PROPERTY_NAME, shorthandName],
    [token.PROPERTY_VALUE, descriptor.defaultValue]
  ];
  var newProperty = wrapSingle$3(shorthandToken);
  var component;
  var longhandToken;
  var newComponent;
  var nameMetadata;
  var i, l;

  populateComponents_1([newProperty], validator, []);

  for (i = 0, l = descriptor.components.length; i < l; i++) {
    component = components[descriptor.components[i]];

    if (hasInherit_1(component)) {
      longhandToken = component.all[component.position].slice(0, 2);
      Array.prototype.push.apply(longhandToken, component.value);
      tokensSequence.push(longhandToken);

      newComponent = deepClone(component);
      newComponent.value = inferComponentValue(components, newComponent.name);

      newProperty.components[i] = newComponent;
      inheritComponents[component.name] = deepClone(component);
    } else {
      newComponent = deepClone(component);
      newComponent.all = component.all;
      newProperty.components[i] = newComponent;

      nonInheritComponents[component.name] = component;
    }
  }

  nameMetadata = joinMetadata(nonInheritComponents, 1);
  shorthandToken[1].push(nameMetadata);

  restoreFromOptimizing_1([newProperty], restoreWithComponents_1);

  shorthandToken = shorthandToken.slice(0, 2);
  Array.prototype.push.apply(shorthandToken, newProperty.value);

  tokensSequence.unshift(shorthandToken);

  return [tokensSequence, newProperty, inheritComponents];
}

function inferComponentValue(components, propertyName) {
  var descriptor = compactable_1[propertyName];

  if ('oppositeTo' in descriptor) {
    return components[descriptor.oppositeTo].value;
  } else {
    return [[token.PROPERTY_VALUE, descriptor.defaultValue]];
  }
}

function joinMetadata(components, at) {
  var metadata = [];
  var component;
  var originalValue;
  var componentMetadata;
  var componentName;

  for (componentName in components) {
    component = components[componentName];
    originalValue = component.all[component.position];
    componentMetadata = originalValue[at][originalValue[at].length - 1];

    Array.prototype.push.apply(metadata, componentMetadata);
  }

  return metadata.sort(metadataSorter);
}

function metadataSorter(metadata1, metadata2) {
  var line1 = metadata1[0];
  var line2 = metadata2[0];
  var column1 = metadata1[1];
  var column2 = metadata2[1];

  if (line1 < line2) {
    return -1;
  } else if (line1 === line2) {
    return column1 < column2 ? -1 : 1;
  } else {
    return 1;
  }
}

function buildSequenceWithInheritShorthand(components, shorthandName, validator) {
  var tokensSequence = [];
  var inheritComponents = {};
  var nonInheritComponents = {};
  var descriptor = compactable_1[shorthandName];
  var shorthandToken = [
    token.PROPERTY,
    [token.PROPERTY_NAME, shorthandName],
    [token.PROPERTY_VALUE, 'inherit']
  ];
  var newProperty = wrapSingle$3(shorthandToken);
  var component;
  var longhandToken;
  var nameMetadata;
  var valueMetadata;
  var i, l;

  populateComponents_1([newProperty], validator, []);

  for (i = 0, l = descriptor.components.length; i < l; i++) {
    component = components[descriptor.components[i]];

    if (hasInherit_1(component)) {
      inheritComponents[component.name] = component;
    } else {
      longhandToken = component.all[component.position].slice(0, 2);
      Array.prototype.push.apply(longhandToken, component.value);
      tokensSequence.push(longhandToken);

      nonInheritComponents[component.name] = deepClone(component);
    }
  }

  nameMetadata = joinMetadata(inheritComponents, 1);
  shorthandToken[1].push(nameMetadata);

  valueMetadata = joinMetadata(inheritComponents, 2);
  shorthandToken[2].push(valueMetadata);

  tokensSequence.unshift(shorthandToken);

  return [tokensSequence, newProperty, nonInheritComponents];
}

function findTokenIn(tokens, componentName) {
  var i, l;

  for (i = 0, l = tokens.length; i < l; i++) {
    if (tokens[i][1][1] == componentName) {
      return tokens[i];
    }
  }
}

function replaceWithShorthand(properties, candidateComponents, shorthandName, validator) {
  var descriptor = compactable_1[shorthandName];
  var nameMetadata;
  var valueMetadata;
  var newValuePlaceholder = [
    token.PROPERTY,
    [token.PROPERTY_NAME, shorthandName],
    [token.PROPERTY_VALUE, descriptor.defaultValue]
  ];
  var all;

  var newProperty = wrapSingle$3(newValuePlaceholder);
  newProperty.shorthand = true;
  newProperty.dirty = true;

  populateComponents_1([newProperty], validator, []);

  for (var i = 0, l = descriptor.components.length; i < l; i++) {
    var component = candidateComponents[descriptor.components[i]];

    newProperty.components[i] = deepClone(component);
    newProperty.important = component.important;

    all = component.all;
  }

  for (var componentName in candidateComponents) {
    candidateComponents[componentName].unused = true;
  }

  nameMetadata = joinMetadata(candidateComponents, 1);
  newValuePlaceholder[1].push(nameMetadata);

  valueMetadata = joinMetadata(candidateComponents, 2);
  newValuePlaceholder[2].push(valueMetadata);

  newProperty.position = all.length;
  newProperty.all = all;
  newProperty.all.push(newValuePlaceholder);

  properties.push(newProperty);
}

var mergeIntoShorthands_1 = mergeIntoShorthands;

function findComponentIn(shorthand, longhand) {
  var comparator = nameComparator(longhand);

  return findInDirectComponents(shorthand, comparator) || findInSubComponents(shorthand, comparator);
}

function nameComparator(to) {
  return function (property) {
    return to.name === property.name;
  };
}

function findInDirectComponents(shorthand, comparator) {
  return shorthand.components.filter(comparator)[0];
}

function findInSubComponents(shorthand, comparator) {
  var shorthandComponent;
  var longhandMatch;
  var i, l;

  if (!compactable_1[shorthand.name].shorthandComponents) {
    return;
  }

  for (i = 0, l = shorthand.components.length; i < l; i++) {
    shorthandComponent = shorthand.components[i];
    longhandMatch = findInDirectComponents(shorthandComponent, comparator);

    if (longhandMatch) {
      return longhandMatch;
    }
  }

  return;
}

var findComponentIn_1 = findComponentIn;

function isComponentOf(property1, property2, shallow) {
  return isDirectComponentOf(property1, property2) ||
    !shallow && !!compactable_1[property1.name].shorthandComponents && isSubComponentOf(property1, property2);
}

function isDirectComponentOf(property1, property2) {
  var descriptor = compactable_1[property1.name];

  return 'components' in descriptor && descriptor.components.indexOf(property2.name) > -1;
}

function isSubComponentOf(property1, property2) {
  return property1
    .components
    .some(function (component) {
      return isDirectComponentOf(component, property2);
    });
}

var isComponentOf_1 = isComponentOf;

function isMergeableShorthand(shorthand) {
  if (shorthand.name != 'font') {
    return true;
  }

  return shorthand.value[0][1].indexOf(marker.INTERNAL) == -1;
}

var isMergeableShorthand_1 = isMergeableShorthand;

function overridesNonComponentShorthand(property1, property2) {
  return property1.name in compactable_1 &&
    'overridesShorthands' in compactable_1[property1.name] &&
    compactable_1[property1.name].overridesShorthands.indexOf(property2.name) > -1;
}

var overridesNonComponentShorthand_1 = overridesNonComponentShorthand;

var sameVendorPrefixesIn = vendorPrefixes.same;


var deepClone$1 = clone.deep;

var shallowClone$1 = clone.shallow;






var serializeProperty = oneTime.property;

function wouldBreakCompatibility(property, validator) {
  for (var i = 0; i < property.components.length; i++) {
    var component = property.components[i];
    var descriptor = compactable_1[component.name];
    var canOverride = descriptor && descriptor.canOverride || canOverride.sameValue;

    var _component = shallowClone$1(component);
    _component.value = [[token.PROPERTY_VALUE, descriptor.defaultValue]];

    if (!everyValuesPair_1(canOverride.bind(null, validator), _component, component)) {
      return true;
    }
  }

  return false;
}

function overrideIntoMultiplex(property, by) {
  by.unused = true;

  turnIntoMultiplex(by, multiplexSize(property));
  property.value = by.value;
}

function overrideByMultiplex(property, by) {
  by.unused = true;
  property.multiplex = true;
  property.value = by.value;
}

function overrideSimple(property, by) {
  by.unused = true;
  property.value = by.value;
}

function override$1(property, by) {
  if (by.multiplex)
    overrideByMultiplex(property, by);
  else if (property.multiplex)
    overrideIntoMultiplex(property, by);
  else
    overrideSimple(property, by);
}

function overrideShorthand(property, by) {
  by.unused = true;

  for (var i = 0, l = property.components.length; i < l; i++) {
    override$1(property.components[i], by.components[i], property.multiplex);
  }
}

function turnIntoMultiplex(property, size) {
  property.multiplex = true;

  if (compactable_1[property.name].shorthand) {
    turnShorthandValueIntoMultiplex(property, size);
  } else {
    turnLonghandValueIntoMultiplex(property, size);
  }
}

function turnShorthandValueIntoMultiplex(property, size) {
  var component;
  var i, l;

  for (i = 0, l = property.components.length; i < l; i++) {
    component = property.components[i];

    if (!component.multiplex) {
      turnLonghandValueIntoMultiplex(component, size);
    }
  }
}

function turnLonghandValueIntoMultiplex(property, size) {
  var descriptor = compactable_1[property.name];
  var withRealValue = descriptor.intoMultiplexMode == 'real';
  var withValue = descriptor.intoMultiplexMode == 'real' ?
    property.value.slice(0) :
    (descriptor.intoMultiplexMode == 'placeholder' ? descriptor.placeholderValue : descriptor.defaultValue);
  var i = multiplexSize(property);
  var j;
  var m = withValue.length;

  for (; i < size; i++) {
    property.value.push([token.PROPERTY_VALUE, marker.COMMA]);

    if (Array.isArray(withValue)) {
      for (j = 0; j < m; j++) {
        property.value.push(withRealValue ? withValue[j] : [token.PROPERTY_VALUE, withValue[j]]);
      }
    } else {
      property.value.push(withRealValue ? withValue : [token.PROPERTY_VALUE, withValue]);
    }
  }
}

function multiplexSize(component) {
  var size = 0;

  for (var i = 0, l = component.value.length; i < l; i++) {
    if (component.value[i][1] == marker.COMMA)
      size++;
  }

  return size + 1;
}

function lengthOf(property) {
  var fakeAsArray = [
    token.PROPERTY,
    [token.PROPERTY_NAME, property.name]
  ].concat(property.value);
  return serializeProperty([fakeAsArray], 0).length;
}

function moreSameShorthands(properties, startAt, name) {
  // Since we run the main loop in `compactOverrides` backwards, at this point some
  // properties may not be marked as unused.
  // We should consider reverting the order if possible
  var count = 0;

  for (var i = startAt; i >= 0; i--) {
    if (properties[i].name == name && !properties[i].unused)
      count++;
    if (count > 1)
      break;
  }

  return count > 1;
}

function overridingFunction(shorthand, validator) {
  for (var i = 0, l = shorthand.components.length; i < l; i++) {
    if (!anyValue(validator.isUrl, shorthand.components[i]) && anyValue(validator.isFunction, shorthand.components[i])) {
      return true;
    }
  }

  return false;
}

function anyValue(fn, property) {
  for (var i = 0, l = property.value.length; i < l; i++) {
    if (property.value[i][1] == marker.COMMA)
      continue;

    if (fn(property.value[i][1]))
      return true;
  }

  return false;
}

function wouldResultInLongerValue(left, right) {
  if (!left.multiplex && !right.multiplex || left.multiplex && right.multiplex)
    return false;

  var multiplex = left.multiplex ? left : right;
  var simple = left.multiplex ? right : left;
  var component;

  var multiplexClone = deepClone$1(multiplex);
  restoreFromOptimizing_1([multiplexClone], restoreWithComponents_1);

  var simpleClone = deepClone$1(simple);
  restoreFromOptimizing_1([simpleClone], restoreWithComponents_1);

  var lengthBefore = lengthOf(multiplexClone) + 1 + lengthOf(simpleClone);

  if (left.multiplex) {
    component = findComponentIn_1(multiplexClone, simpleClone);
    overrideIntoMultiplex(component, simpleClone);
  } else {
    component = findComponentIn_1(simpleClone, multiplexClone);
    turnIntoMultiplex(simpleClone, multiplexSize(multiplexClone));
    overrideByMultiplex(component, multiplexClone);
  }

  restoreFromOptimizing_1([simpleClone], restoreWithComponents_1);

  var lengthAfter = lengthOf(simpleClone);

  return lengthBefore <= lengthAfter;
}

function isCompactable(property) {
  return property.name in compactable_1;
}

function noneOverrideHack(left, right) {
  return !left.multiplex &&
    (left.name == 'background' || left.name == 'background-image') &&
    right.multiplex &&
    (right.name == 'background' || right.name == 'background-image') &&
    anyLayerIsNone(right.value);
}

function anyLayerIsNone(values) {
  var layers = intoLayers(values);

  for (var i = 0, l = layers.length; i < l; i++) {
    if (layers[i].length == 1 && layers[i][0][1] == 'none')
      return true;
  }

  return false;
}

function intoLayers(values) {
  var layers = [];

  for (var i = 0, layer = [], l = values.length; i < l; i++) {
    var value = values[i];
    if (value[1] == marker.COMMA) {
      layers.push(layer);
      layer = [];
    } else {
      layer.push(value);
    }
  }

  layers.push(layer);
  return layers;
}

function overrideProperties(properties, withMerging, compatibility, validator) {
  var mayOverride, right, left, component;
  var overriddenComponents;
  var overriddenComponent;
  var overridingComponent;
  var overridable;
  var i, j, k;

  propertyLoop:
  for (i = properties.length - 1; i >= 0; i--) {
    right = properties[i];

    if (!isCompactable(right))
      continue;

    if (right.block)
      continue;

    mayOverride = compactable_1[right.name].canOverride;

    traverseLoop:
    for (j = i - 1; j >= 0; j--) {
      left = properties[j];

      if (!isCompactable(left))
        continue;

      if (left.block)
        continue;

      if (left.unused || right.unused)
        continue;

      if (left.hack && !right.hack && !right.important || !left.hack && !left.important && right.hack)
        continue;

      if (left.important == right.important && left.hack[0] != right.hack[0])
        continue;

      if (left.important == right.important && (left.hack[0] != right.hack[0] || (left.hack[1] && left.hack[1] != right.hack[1])))
        continue;

      if (hasInherit_1(right))
        continue;

      if (noneOverrideHack(left, right))
        continue;

      if (right.shorthand && isComponentOf_1(right, left)) {
        // maybe `left` can be overridden by `right` which is a shorthand?
        if (!right.important && left.important)
          continue;

        if (!sameVendorPrefixesIn([left], right.components))
          continue;

        if (!anyValue(validator.isFunction, left) && overridingFunction(right, validator))
          continue;

        if (!isMergeableShorthand_1(right)) {
          left.unused = true;
          continue;
        }

        component = findComponentIn_1(right, left);
        mayOverride = compactable_1[left.name].canOverride;
        if (everyValuesPair_1(mayOverride.bind(null, validator), left, component)) {
          left.unused = true;
        }
      } else if (right.shorthand && overridesNonComponentShorthand_1(right, left)) {
        // `right` is a shorthand while `left` can be overriden by it, think `border` and `border-top`
        if (!right.important && left.important) {
          continue;
        }

        if (!sameVendorPrefixesIn([left], right.components)) {
          continue;
        }

        if (!anyValue(validator.isFunction, left) && overridingFunction(right, validator)) {
          continue;
        }

        overriddenComponents = left.shorthand ?
          left.components:
          [left];

        for (k = overriddenComponents.length - 1; k >= 0; k--) {
          overriddenComponent = overriddenComponents[k];
          overridingComponent = findComponentIn_1(right, overriddenComponent);
          mayOverride = compactable_1[overriddenComponent.name].canOverride;

          if (!everyValuesPair_1(mayOverride.bind(null, validator), left, overridingComponent)) {
            continue traverseLoop;
          }
        }

        left.unused = true;
      } else if (withMerging && left.shorthand && !right.shorthand && isComponentOf_1(left, right, true)) {
        // maybe `right` can be pulled into `left` which is a shorthand?
        if (right.important && !left.important)
          continue;

        if (!right.important && left.important) {
          right.unused = true;
          continue;
        }

        // Pending more clever algorithm in #527
        if (moreSameShorthands(properties, i - 1, left.name))
          continue;

        if (overridingFunction(left, validator))
          continue;

        if (!isMergeableShorthand_1(left))
          continue;

        component = findComponentIn_1(left, right);
        if (everyValuesPair_1(mayOverride.bind(null, validator), component, right)) {
          var disabledBackgroundMerging =
            !compatibility.properties.backgroundClipMerging && component.name.indexOf('background-clip') > -1 ||
            !compatibility.properties.backgroundOriginMerging && component.name.indexOf('background-origin') > -1 ||
            !compatibility.properties.backgroundSizeMerging && component.name.indexOf('background-size') > -1;
          var nonMergeableValue = compactable_1[right.name].nonMergeableValue === right.value[0][1];

          if (disabledBackgroundMerging || nonMergeableValue)
            continue;

          if (!compatibility.properties.merging && wouldBreakCompatibility(left, validator))
            continue;

          if (component.value[0][1] != right.value[0][1] && (hasInherit_1(left) || hasInherit_1(right)))
            continue;

          if (wouldResultInLongerValue(left, right))
            continue;

          if (!left.multiplex && right.multiplex)
            turnIntoMultiplex(left, multiplexSize(right));

          override$1(component, right);
          left.dirty = true;
        }
      } else if (withMerging && left.shorthand && right.shorthand && left.name == right.name) {
        // merge if all components can be merged

        if (!left.multiplex && right.multiplex)
          continue;

        if (!right.important && left.important) {
          right.unused = true;
          continue propertyLoop;
        }

        if (right.important && !left.important) {
          left.unused = true;
          continue;
        }

        if (!isMergeableShorthand_1(right)) {
          left.unused = true;
          continue;
        }

        for (k = left.components.length - 1; k >= 0; k--) {
          var leftComponent = left.components[k];
          var rightComponent = right.components[k];

          mayOverride = compactable_1[leftComponent.name].canOverride;
          if (!everyValuesPair_1(mayOverride.bind(null, validator), leftComponent, rightComponent))
            continue propertyLoop;
        }

        overrideShorthand(left, right);
        left.dirty = true;
      } else if (withMerging && left.shorthand && right.shorthand && isComponentOf_1(left, right)) {
        // border is a shorthand but any of its components is a shorthand too

        if (!left.important && right.important)
          continue;

        component = findComponentIn_1(left, right);
        mayOverride = compactable_1[right.name].canOverride;
        if (!everyValuesPair_1(mayOverride.bind(null, validator), component, right))
          continue;

        if (left.important && !right.important) {
          right.unused = true;
          continue;
        }

        var rightRestored = compactable_1[right.name].restore(right, compactable_1);
        if (rightRestored.length > 1)
          continue;

        component = findComponentIn_1(left, right);
        override$1(component, right);
        right.dirty = true;
      } else if (left.name == right.name) {
        // two non-shorthands should be merged based on understandability
        overridable = true;

        if (right.shorthand) {
          for (k = right.components.length - 1; k >= 0 && overridable; k--) {
            overriddenComponent = left.components[k];
            overridingComponent = right.components[k];
            mayOverride = compactable_1[overridingComponent.name].canOverride;

            overridable = overridable && everyValuesPair_1(mayOverride.bind(null, validator), overriddenComponent, overridingComponent);
          }
        } else {
          mayOverride = compactable_1[right.name].canOverride;
          overridable = everyValuesPair_1(mayOverride.bind(null, validator), left, right);
        }

        if (left.important && !right.important && overridable) {
          right.unused = true;
          continue;
        }

        if (!left.important && right.important && overridable) {
          left.unused = true;
          continue;
        }

        if (!overridable) {
          continue;
        }

        left.unused = true;
      }
    }
  }
}

var overrideProperties_1 = overrideProperties;

var wrapForOptimizing$2 = wrapForOptimizing.all;



var OptimizationLevel$2 = optimizationLevel.OptimizationLevel;

function optimizeProperties(properties, withOverriding, withMerging, context) {
  var levelOptions = context.options.level[OptimizationLevel$2.Two];
  var _properties = wrapForOptimizing$2(properties, false, levelOptions.skipProperties);
  var _property;
  var i, l;

  populateComponents_1(_properties, context.validator, context.warnings);

  for (i = 0, l = _properties.length; i < l; i++) {
    _property = _properties[i];
    if (_property.block) {
      optimizeProperties(_property.value[0][1], withOverriding, withMerging, context);
    }
  }

  if (withMerging && levelOptions.mergeIntoShorthands) {
    mergeIntoShorthands_1(_properties, context.validator);
  }

  if (withOverriding && levelOptions.overrideProperties) {
    overrideProperties_1(_properties, withMerging, context.options.compatibility, context.validator);
  }

  restoreFromOptimizing_1(_properties, restoreWithComponents_1);
  removeUnused_1(_properties);
}

var optimize$2 = optimizeProperties;

var OptimizationLevel$3 = optimizationLevel.OptimizationLevel;

var serializeBody$1 = oneTime.body;
var serializeRules$1 = oneTime.rules;



function mergeAdjacent(tokens, context) {
  var lastToken = [null, [], []];
  var options = context.options;
  var adjacentSpace = options.compatibility.selectors.adjacentSpace;
  var selectorsSortingMethod = options.level[OptimizationLevel$3.One].selectorsSortingMethod;
  var mergeablePseudoClasses = options.compatibility.selectors.mergeablePseudoClasses;
  var mergeablePseudoElements = options.compatibility.selectors.mergeablePseudoElements;
  var mergeLimit = options.compatibility.selectors.mergeLimit;
  var multiplePseudoMerging = options.compatibility.selectors.multiplePseudoMerging;

  for (var i = 0, l = tokens.length; i < l; i++) {
    var token$1 = tokens[i];

    if (token$1[0] != token.RULE) {
      lastToken = [null, [], []];
      continue;
    }

    if (lastToken[0] == token.RULE && serializeRules$1(token$1[1]) == serializeRules$1(lastToken[1])) {
      Array.prototype.push.apply(lastToken[2], token$1[2]);
      optimize$2(lastToken[2], true, true, context);
      token$1[2] = [];
    } else if (lastToken[0] == token.RULE && serializeBody$1(token$1[2]) == serializeBody$1(lastToken[2]) &&
        isMergeable_1(serializeRules$1(token$1[1]), mergeablePseudoClasses, mergeablePseudoElements, multiplePseudoMerging) &&
        isMergeable_1(serializeRules$1(lastToken[1]), mergeablePseudoClasses, mergeablePseudoElements, multiplePseudoMerging) &&
        lastToken[1].length < mergeLimit) {
      lastToken[1] = tidyRules_1(lastToken[1].concat(token$1[1]), false, adjacentSpace, false, context.warnings);
      lastToken[1] = lastToken.length > 1 ? sortSelectors_1(lastToken[1], selectorsSortingMethod) : lastToken[1];
      token$1[2] = [];
    } else {
      lastToken = token$1;
    }
  }
}

var mergeAdjacent_1 = mergeAdjacent;

var MODIFIER_PATTERN = /\-\-.+$/;

function rulesOverlap(rule1, rule2, bemMode) {
  var scope1;
  var scope2;
  var i, l;
  var j, m;

  for (i = 0, l = rule1.length; i < l; i++) {
    scope1 = rule1[i][1];

    for (j = 0, m = rule2.length; j < m; j++) {
      scope2 = rule2[j][1];

      if (scope1 == scope2) {
        return true;
      }

      if (bemMode && withoutModifiers(scope1) == withoutModifiers(scope2)) {
        return true;
      }
    }
  }

  return false;
}

function withoutModifiers(scope) {
  return scope.replace(MODIFIER_PATTERN, '');
}

var rulesOverlap_1 = rulesOverlap;

var Selector = {
  ADJACENT_SIBLING: '+',
  DESCENDANT: '>',
  DOT: '.',
  HASH: '#',
  NON_ADJACENT_SIBLING: '~',
  PSEUDO: ':'
};

var LETTER_PATTERN = /[a-zA-Z]/;
var NOT_PREFIX = ':not(';
var SEPARATOR_PATTERN = /[\s,\(>~\+]/;

function specificity(selector) {
  var result = [0, 0, 0];
  var character;
  var isEscaped;
  var isSingleQuoted;
  var isDoubleQuoted;
  var roundBracketLevel = 0;
  var couldIntroduceNewTypeSelector;
  var withinNotPseudoClass = false;
  var wasPseudoClass = false;
  var i, l;

  for (i = 0, l = selector.length; i < l; i++) {
    character = selector[i];

    if (isEscaped) ; else if (character == marker.SINGLE_QUOTE && !isDoubleQuoted && !isSingleQuoted) {
      isSingleQuoted = true;
    } else if (character == marker.SINGLE_QUOTE && !isDoubleQuoted && isSingleQuoted) {
      isSingleQuoted = false;
    } else if (character == marker.DOUBLE_QUOTE && !isDoubleQuoted && !isSingleQuoted) {
      isDoubleQuoted = true;
    } else if (character == marker.DOUBLE_QUOTE && isDoubleQuoted && !isSingleQuoted) {
      isDoubleQuoted = false;
    } else if (isSingleQuoted || isDoubleQuoted) {
      continue;
    } else if (roundBracketLevel > 0 && !withinNotPseudoClass) ; else if (character == marker.OPEN_ROUND_BRACKET) {
      roundBracketLevel++;
    } else if (character == marker.CLOSE_ROUND_BRACKET && roundBracketLevel == 1) {
      roundBracketLevel--;
      withinNotPseudoClass = false;
    } else if (character == marker.CLOSE_ROUND_BRACKET) {
      roundBracketLevel--;
    } else if (character == Selector.HASH) {
      result[0]++;
    } else if (character == Selector.DOT || character == marker.OPEN_SQUARE_BRACKET) {
      result[1]++;
    } else if (character == Selector.PSEUDO && !wasPseudoClass && !isNotPseudoClass(selector, i)) {
      result[1]++;
      withinNotPseudoClass = false;
    } else if (character == Selector.PSEUDO) {
      withinNotPseudoClass = true;
    } else if ((i === 0 || couldIntroduceNewTypeSelector) && LETTER_PATTERN.test(character)) {
      result[2]++;
    }

    isEscaped = character == marker.BACK_SLASH;
    wasPseudoClass = character == Selector.PSEUDO;
    couldIntroduceNewTypeSelector = !isEscaped && SEPARATOR_PATTERN.test(character);
  }

  return result;
}

function isNotPseudoClass(selector, index) {
  return selector.indexOf(NOT_PREFIX, index) === index;
}

var specificity_1 = specificity;

function specificitiesOverlap(selector1, selector2, cache) {
  var specificity1;
  var specificity2;
  var i, l;
  var j, m;

  for (i = 0, l = selector1.length; i < l; i++) {
    specificity1 = findSpecificity(selector1[i][1], cache);

    for (j = 0, m = selector2.length; j < m; j++) {
      specificity2 = findSpecificity(selector2[j][1], cache);

      if (specificity1[0] === specificity2[0] && specificity1[1] === specificity2[1] && specificity1[2] === specificity2[2]) {
        return true;
      }
    }
  }

  return false;
}

function findSpecificity(selector, cache) {
  var value;

  if (!(selector in cache)) {
    cache[selector] = value = specificity_1(selector);
  }

  return value || cache[selector];
}

var specificitiesOverlap_1 = specificitiesOverlap;

// TODO: it'd be great to merge it with the other canReorder functionality




var FLEX_PROPERTIES = /align\-items|box\-align|box\-pack|flex|justify/;
var BORDER_PROPERTIES = /^border\-(top|right|bottom|left|color|style|width|radius)/;

function canReorder(left, right, cache) {
  for (var i = right.length - 1; i >= 0; i--) {
    for (var j = left.length - 1; j >= 0; j--) {
      if (!canReorderSingle(left[j], right[i], cache))
        return false;
    }
  }

  return true;
}

function canReorderSingle(left, right, cache) {
  var leftName = left[0];
  var leftValue = left[1];
  var leftNameRoot = left[2];
  var leftSelector = left[5];
  var leftInSpecificSelector = left[6];
  var rightName = right[0];
  var rightValue = right[1];
  var rightNameRoot = right[2];
  var rightSelector = right[5];
  var rightInSpecificSelector = right[6];

  if (leftName == 'font' && rightName == 'line-height' || rightName == 'font' && leftName == 'line-height')
    return false;
  if (FLEX_PROPERTIES.test(leftName) && FLEX_PROPERTIES.test(rightName))
    return false;
  if (leftNameRoot == rightNameRoot && unprefixed(leftName) == unprefixed(rightName) && (vendorPrefixed(leftName) ^ vendorPrefixed(rightName)))
    return false;
  if (leftNameRoot == 'border' && BORDER_PROPERTIES.test(rightNameRoot) && (leftName == 'border' || leftName == rightNameRoot || (leftValue != rightValue && sameBorderComponent(leftName, rightName))))
    return false;
  if (rightNameRoot == 'border' && BORDER_PROPERTIES.test(leftNameRoot) && (rightName == 'border' || rightName == leftNameRoot || (leftValue != rightValue && sameBorderComponent(leftName, rightName))))
    return false;
  if (leftNameRoot == 'border' && rightNameRoot == 'border' && leftName != rightName && (isSideBorder(leftName) && isStyleBorder(rightName) || isStyleBorder(leftName) && isSideBorder(rightName)))
    return false;
  if (leftNameRoot != rightNameRoot)
    return true;
  if (leftName == rightName && leftNameRoot == rightNameRoot && (leftValue == rightValue || withDifferentVendorPrefix(leftValue, rightValue)))
    return true;
  if (leftName != rightName && leftNameRoot == rightNameRoot && leftName != leftNameRoot && rightName != rightNameRoot)
    return true;
  if (leftName != rightName && leftNameRoot == rightNameRoot && leftValue == rightValue)
    return true;
  if (rightInSpecificSelector && leftInSpecificSelector && !inheritable(leftNameRoot) && !inheritable(rightNameRoot) && !rulesOverlap_1(rightSelector, leftSelector, false))
    return true;
  if (!specificitiesOverlap_1(leftSelector, rightSelector, cache))
    return true;

  return false;
}

function vendorPrefixed(name) {
  return /^\-(?:moz|webkit|ms|o)\-/.test(name);
}

function unprefixed(name) {
  return name.replace(/^\-(?:moz|webkit|ms|o)\-/, '');
}

function sameBorderComponent(name1, name2) {
  return name1.split('-').pop() == name2.split('-').pop();
}

function isSideBorder(name) {
  return name == 'border-top' || name == 'border-right' || name == 'border-bottom' || name == 'border-left';
}

function isStyleBorder(name) {
  return name == 'border-color' || name == 'border-style' || name == 'border-width';
}

function withDifferentVendorPrefix(value1, value2) {
  return vendorPrefixed(value1) && vendorPrefixed(value2) && value1.split('-')[1] != value2.split('-')[2];
}

function inheritable(name) {
  // According to http://www.w3.org/TR/CSS21/propidx.html
  // Others will be catched by other, preceeding rules
  return name == 'font' || name == 'line-height' || name == 'list-style';
}

var reorderable = {
  canReorder: canReorder,
  canReorderSingle: canReorderSingle
};

// This extractor is used in level 2 optimizations
// IMPORTANT: Mind Token class and this code is not related!
// Properties will be tokenized in one step, see #429


var serializeRules$2 = oneTime.rules;
var serializeValue = oneTime.value;

function extractProperties(token$1) {
  var properties = [];
  var inSpecificSelector;
  var property;
  var name;
  var value;
  var i, l;

  if (token$1[0] == token.RULE) {
    inSpecificSelector = !/[\.\+>~]/.test(serializeRules$2(token$1[1]));

    for (i = 0, l = token$1[2].length; i < l; i++) {
      property = token$1[2][i];

      if (property[0] != token.PROPERTY)
        continue;

      name = property[1][1];
      if (name.length === 0)
        continue;

      if (name.indexOf('--') === 0)
        continue;

      value = serializeValue(property, i);

      properties.push([
        name,
        value,
        findNameRoot(name),
        token$1[2][i],
        name + ':' + value,
        token$1[1],
        inSpecificSelector
      ]);
    }
  } else if (token$1[0] == token.NESTED_BLOCK) {
    for (i = 0, l = token$1[2].length; i < l; i++) {
      properties = properties.concat(extractProperties(token$1[2][i]));
    }
  }

  return properties;
}

function findNameRoot(name) {
  if (name == 'list-style')
    return name;
  if (name.indexOf('-radius') > 0)
    return 'border-radius';
  if (name == 'border-collapse' || name == 'border-spacing' || name == 'border-image')
    return name;
  if (name.indexOf('border-') === 0 && /^border\-\w+\-\w+$/.test(name))
    return name.match(/border\-\w+/)[0];
  if (name.indexOf('border-') === 0 && /^border\-\w+$/.test(name))
    return 'border';
  if (name.indexOf('text-') === 0)
    return name;
  if (name == '-chrome-')
    return name;

  return name.replace(/^\-\w+\-/, '').match(/([a-zA-Z]+)/)[0].toLowerCase();
}

var extractProperties_1 = extractProperties;

var canReorder$1 = reorderable.canReorder;
var canReorderSingle$1 = reorderable.canReorderSingle;



var serializeRules$3 = oneTime.rules;
var OptimizationLevel$4 = optimizationLevel.OptimizationLevel;


function mergeMediaQueries(tokens, context) {
  var mergeSemantically = context.options.level[OptimizationLevel$4.Two].mergeSemantically;
  var specificityCache = context.cache.specificity;
  var candidates = {};
  var reduced = [];

  for (var i = tokens.length - 1; i >= 0; i--) {
    var token$1 = tokens[i];
    if (token$1[0] != token.NESTED_BLOCK) {
      continue;
    }

    var key = serializeRules$3(token$1[1]);
    var candidate = candidates[key];
    if (!candidate) {
      candidate = [];
      candidates[key] = candidate;
    }

    candidate.push(i);
  }

  for (var name in candidates) {
    var positions = candidates[name];

    positionLoop:
    for (var j = positions.length - 1; j > 0; j--) {
      var positionOne = positions[j];
      var tokenOne = tokens[positionOne];
      var positionTwo = positions[j - 1];
      var tokenTwo = tokens[positionTwo];

      directionLoop:
      for (var direction = 1; direction >= -1; direction -= 2) {
        var topToBottom = direction == 1;
        var from = topToBottom ? positionOne + 1 : positionTwo - 1;
        var to = topToBottom ? positionTwo : positionOne;
        var delta = topToBottom ? 1 : -1;
        var source = topToBottom ? tokenOne : tokenTwo;
        var target = topToBottom ? tokenTwo : tokenOne;
        var movedProperties = extractProperties_1(source);

        while (from != to) {
          var traversedProperties = extractProperties_1(tokens[from]);
          from += delta;

          if (mergeSemantically && allSameRulePropertiesCanBeReordered(movedProperties, traversedProperties, specificityCache)) {
            continue;
          }

          if (!canReorder$1(movedProperties, traversedProperties, specificityCache))
            continue directionLoop;
        }

        target[2] = topToBottom ?
          source[2].concat(target[2]) :
          target[2].concat(source[2]);
        source[2] = [];

        reduced.push(target);
        continue positionLoop;
      }
    }
  }

  return reduced;
}

function allSameRulePropertiesCanBeReordered(movedProperties, traversedProperties, specificityCache) {
  var movedProperty;
  var movedRule;
  var traversedProperty;
  var traversedRule;
  var i, l;
  var j, m;

  for (i = 0, l = movedProperties.length; i < l; i++) {
    movedProperty = movedProperties[i];
    movedRule = movedProperty[5];

    for (j = 0, m = traversedProperties.length; j < m; j++) {
      traversedProperty = traversedProperties[j];
      traversedRule = traversedProperty[5];

      if (rulesOverlap_1(movedRule, traversedRule, true) && !canReorderSingle$1(movedProperty, traversedProperty, specificityCache)) {
        return false;
      }
    }
  }

  return true;
}

var mergeMediaQueries_1 = mergeMediaQueries;

var OptimizationLevel$5 = optimizationLevel.OptimizationLevel;

var serializeBody$2 = oneTime.body;
var serializeRules$4 = oneTime.rules;



function unsafeSelector(value) {
  return /\.|\*| :/.test(value);
}

function isBemElement(token) {
  var asString = serializeRules$4(token[1]);
  return asString.indexOf('__') > -1 || asString.indexOf('--') > -1;
}

function withoutModifier(selector) {
  return selector.replace(/--[^ ,>\+~:]+/g, '');
}

function removeAnyUnsafeElements(left, candidates) {
  var leftSelector = withoutModifier(serializeRules$4(left[1]));

  for (var body in candidates) {
    var right = candidates[body];
    var rightSelector = withoutModifier(serializeRules$4(right[1]));

    if (rightSelector.indexOf(leftSelector) > -1 || leftSelector.indexOf(rightSelector) > -1)
      delete candidates[body];
  }
}

function mergeNonAdjacentByBody(tokens, context) {
  var options = context.options;
  var mergeSemantically = options.level[OptimizationLevel$5.Two].mergeSemantically;
  var adjacentSpace = options.compatibility.selectors.adjacentSpace;
  var selectorsSortingMethod = options.level[OptimizationLevel$5.One].selectorsSortingMethod;
  var mergeablePseudoClasses = options.compatibility.selectors.mergeablePseudoClasses;
  var mergeablePseudoElements = options.compatibility.selectors.mergeablePseudoElements;
  var multiplePseudoMerging = options.compatibility.selectors.multiplePseudoMerging;
  var candidates = {};

  for (var i = tokens.length - 1; i >= 0; i--) {
    var token$1 = tokens[i];
    if (token$1[0] != token.RULE)
      continue;

    if (token$1[2].length > 0 && (!mergeSemantically && unsafeSelector(serializeRules$4(token$1[1]))))
      candidates = {};

    if (token$1[2].length > 0 && mergeSemantically && isBemElement(token$1))
      removeAnyUnsafeElements(token$1, candidates);

    var candidateBody = serializeBody$2(token$1[2]);
    var oldToken = candidates[candidateBody];
    if (oldToken &&
        isMergeable_1(serializeRules$4(token$1[1]), mergeablePseudoClasses, mergeablePseudoElements, multiplePseudoMerging) &&
        isMergeable_1(serializeRules$4(oldToken[1]), mergeablePseudoClasses, mergeablePseudoElements, multiplePseudoMerging)) {

      if (token$1[2].length > 0) {
        token$1[1] = tidyRules_1(oldToken[1].concat(token$1[1]), false, adjacentSpace, false, context.warnings);
        token$1[1] = token$1[1].length > 1 ? sortSelectors_1(token$1[1], selectorsSortingMethod) : token$1[1];
      } else {
        token$1[1] = oldToken[1].concat(token$1[1]);
      }

      oldToken[2] = [];
      candidates[candidateBody] = null;
    }

    candidates[serializeBody$2(token$1[2])] = token$1;
  }
}

var mergeNonAdjacentByBody_1 = mergeNonAdjacentByBody;

var canReorder$2 = reorderable.canReorder;




var serializeRules$5 = oneTime.rules;



function mergeNonAdjacentBySelector(tokens, context) {
  var specificityCache = context.cache.specificity;
  var allSelectors = {};
  var repeatedSelectors = [];
  var i;

  for (i = tokens.length - 1; i >= 0; i--) {
    if (tokens[i][0] != token.RULE)
      continue;
    if (tokens[i][2].length === 0)
      continue;

    var selector = serializeRules$5(tokens[i][1]);
    allSelectors[selector] = [i].concat(allSelectors[selector] || []);

    if (allSelectors[selector].length == 2)
      repeatedSelectors.push(selector);
  }

  for (i = repeatedSelectors.length - 1; i >= 0; i--) {
    var positions = allSelectors[repeatedSelectors[i]];

    selectorIterator:
    for (var j = positions.length - 1; j > 0; j--) {
      var positionOne = positions[j - 1];
      var tokenOne = tokens[positionOne];
      var positionTwo = positions[j];
      var tokenTwo = tokens[positionTwo];

      directionIterator:
      for (var direction = 1; direction >= -1; direction -= 2) {
        var topToBottom = direction == 1;
        var from = topToBottom ? positionOne + 1 : positionTwo - 1;
        var to = topToBottom ? positionTwo : positionOne;
        var delta = topToBottom ? 1 : -1;
        var moved = topToBottom ? tokenOne : tokenTwo;
        var target = topToBottom ? tokenTwo : tokenOne;
        var movedProperties = extractProperties_1(moved);

        while (from != to) {
          var traversedProperties = extractProperties_1(tokens[from]);
          from += delta;

          // traversed then moved as we move selectors towards the start
          var reorderable = topToBottom ?
            canReorder$2(movedProperties, traversedProperties, specificityCache) :
            canReorder$2(traversedProperties, movedProperties, specificityCache);

          if (!reorderable && !topToBottom)
            continue selectorIterator;
          if (!reorderable && topToBottom)
            continue directionIterator;
        }

        if (topToBottom) {
          Array.prototype.push.apply(moved[2], target[2]);
          target[2] = moved[2];
        } else {
          Array.prototype.push.apply(target[2], moved[2]);
        }

        optimize$2(target[2], true, true, context);
        moved[2] = [];
      }
    }
  }
}

var mergeNonAdjacentBySelector_1 = mergeNonAdjacentBySelector;

function cloneArray(array) {
  var cloned = array.slice(0);

  for (var i = 0, l = cloned.length; i < l; i++) {
    if (Array.isArray(cloned[i]))
      cloned[i] = cloneArray(cloned[i]);
  }

  return cloned;
}

var cloneArray_1 = cloneArray;

var serializeBody$3 = oneTime.body;
var serializeRules$6 = oneTime.rules;

function reduceNonAdjacent(tokens, context) {
  var options = context.options;
  var mergeablePseudoClasses = options.compatibility.selectors.mergeablePseudoClasses;
  var mergeablePseudoElements = options.compatibility.selectors.mergeablePseudoElements;
  var multiplePseudoMerging = options.compatibility.selectors.multiplePseudoMerging;
  var candidates = {};
  var repeated = [];

  for (var i = tokens.length - 1; i >= 0; i--) {
    var token$1 = tokens[i];

    if (token$1[0] != token.RULE) {
      continue;
    } else if (token$1[2].length === 0) {
      continue;
    }

    var selectorAsString = serializeRules$6(token$1[1]);
    var isComplexAndNotSpecial = token$1[1].length > 1 &&
      isMergeable_1(selectorAsString, mergeablePseudoClasses, mergeablePseudoElements, multiplePseudoMerging);
    var wrappedSelectors = wrappedSelectorsFrom(token$1[1]);
    var selectors = isComplexAndNotSpecial ?
      [selectorAsString].concat(wrappedSelectors) :
      [selectorAsString];

    for (var j = 0, m = selectors.length; j < m; j++) {
      var selector = selectors[j];

      if (!candidates[selector])
        candidates[selector] = [];
      else
        repeated.push(selector);

      candidates[selector].push({
        where: i,
        list: wrappedSelectors,
        isPartial: isComplexAndNotSpecial && j > 0,
        isComplex: isComplexAndNotSpecial && j === 0
      });
    }
  }

  reduceSimpleNonAdjacentCases(tokens, repeated, candidates, options, context);
  reduceComplexNonAdjacentCases(tokens, candidates, options, context);
}

function wrappedSelectorsFrom(list) {
  var wrapped = [];

  for (var i = 0; i < list.length; i++) {
    wrapped.push([list[i][1]]);
  }

  return wrapped;
}

function reduceSimpleNonAdjacentCases(tokens, repeated, candidates, options, context) {
  function filterOut(idx, bodies) {
    return data[idx].isPartial && bodies.length === 0;
  }

  function reduceBody(token, newBody, processedCount, tokenIdx) {
    if (!data[processedCount - tokenIdx - 1].isPartial)
      token[2] = newBody;
  }

  for (var i = 0, l = repeated.length; i < l; i++) {
    var selector = repeated[i];
    var data = candidates[selector];

    reduceSelector(tokens, data, {
      filterOut: filterOut,
      callback: reduceBody
    }, options, context);
  }
}

function reduceComplexNonAdjacentCases(tokens, candidates, options, context) {
  var mergeablePseudoClasses = options.compatibility.selectors.mergeablePseudoClasses;
  var mergeablePseudoElements = options.compatibility.selectors.mergeablePseudoElements;
  var multiplePseudoMerging = options.compatibility.selectors.multiplePseudoMerging;
  var localContext = {};

  function filterOut(idx) {
    return localContext.data[idx].where < localContext.intoPosition;
  }

  function collectReducedBodies(token, newBody, processedCount, tokenIdx) {
    if (tokenIdx === 0)
      localContext.reducedBodies.push(newBody);
  }

  allSelectors:
  for (var complexSelector in candidates) {
    var into = candidates[complexSelector];
    if (!into[0].isComplex)
      continue;

    var intoPosition = into[into.length - 1].where;
    var intoToken = tokens[intoPosition];
    var reducedBodies = [];

    var selectors = isMergeable_1(complexSelector, mergeablePseudoClasses, mergeablePseudoElements, multiplePseudoMerging) ?
      into[0].list :
      [complexSelector];

    localContext.intoPosition = intoPosition;
    localContext.reducedBodies = reducedBodies;

    for (var j = 0, m = selectors.length; j < m; j++) {
      var selector = selectors[j];
      var data = candidates[selector];

      if (data.length < 2)
        continue allSelectors;

      localContext.data = data;

      reduceSelector(tokens, data, {
        filterOut: filterOut,
        callback: collectReducedBodies
      }, options, context);

      if (serializeBody$3(reducedBodies[reducedBodies.length - 1]) != serializeBody$3(reducedBodies[0]))
        continue allSelectors;
    }

    intoToken[2] = reducedBodies[0];
  }
}

function reduceSelector(tokens, data, context, options, outerContext) {
  var bodies = [];
  var bodiesAsList = [];
  var processedTokens = [];

  for (var j = data.length - 1; j >= 0; j--) {
    if (context.filterOut(j, bodies))
      continue;

    var where = data[j].where;
    var token = tokens[where];
    var clonedBody = cloneArray_1(token[2]);

    bodies = bodies.concat(clonedBody);
    bodiesAsList.push(clonedBody);
    processedTokens.push(where);
  }

  optimize$2(bodies, true, false, outerContext);

  var processedCount = processedTokens.length;
  var propertyIdx = bodies.length - 1;
  var tokenIdx = processedCount - 1;

  while (tokenIdx >= 0) {
     if ((tokenIdx === 0 || (bodies[propertyIdx] && bodiesAsList[tokenIdx].indexOf(bodies[propertyIdx]) > -1)) && propertyIdx > -1) {
      propertyIdx--;
      continue;
    }

    var newBody = bodies.splice(propertyIdx + 1);
    context.callback(tokens[processedTokens[tokenIdx]], newBody, processedCount, tokenIdx);

    tokenIdx--;
  }
}

var reduceNonAdjacent_1 = reduceNonAdjacent;

var serializeAll = oneTime.all;

var FONT_FACE_SCOPE = '@font-face';

function removeDuplicateFontAtRules(tokens) {
  var fontAtRules = [];
  var token$1;
  var key;
  var i, l;

  for (i = 0, l = tokens.length; i < l; i++) {
    token$1 = tokens[i];

    if (token$1[0] != token.AT_RULE_BLOCK && token$1[1][0][1] != FONT_FACE_SCOPE) {
      continue;
    }

    key = serializeAll([token$1]);

    if (fontAtRules.indexOf(key) > -1) {
      token$1[2] = [];
    } else {
      fontAtRules.push(key);
    }
  }
}

var removeDuplicateFontAtRules_1 = removeDuplicateFontAtRules;

var serializeAll$1 = oneTime.all;
var serializeRules$7 = oneTime.rules;

function removeDuplicateMediaQueries(tokens) {
  var candidates = {};
  var candidate;
  var token$1;
  var key;
  var i, l;

  for (i = 0, l = tokens.length; i < l; i++) {
    token$1 = tokens[i];
    if (token$1[0] != token.NESTED_BLOCK) {
      continue;
    }

    key = serializeRules$7(token$1[1]) + '%' + serializeAll$1(token$1[2]);
    candidate = candidates[key];

    if (candidate) {
      candidate[2] = [];
    }

    candidates[key] = token$1;
  }
}

var removeDuplicateMediaQueries_1 = removeDuplicateMediaQueries;

var serializeBody$4 = oneTime.body;
var serializeRules$8 = oneTime.rules;

function removeDuplicates(tokens) {
  var matched = {};
  var moreThanOnce = [];
  var id, token$1;
  var body, bodies;

  for (var i = 0, l = tokens.length; i < l; i++) {
    token$1 = tokens[i];
    if (token$1[0] != token.RULE)
      continue;

    id = serializeRules$8(token$1[1]);

    if (matched[id] && matched[id].length == 1)
      moreThanOnce.push(id);
    else
      matched[id] = matched[id] || [];

    matched[id].push(i);
  }

  for (i = 0, l = moreThanOnce.length; i < l; i++) {
    id = moreThanOnce[i];
    bodies = [];

    for (var j = matched[id].length - 1; j >= 0; j--) {
      token$1 = tokens[matched[id][j]];
      body = serializeBody$4(token$1[2]);

      if (bodies.indexOf(body) > -1)
        token$1[2] = [];
      else
        bodies.push(body);
    }
  }
}

var removeDuplicates_1 = removeDuplicates;

var wrapForOptimizing$3 = wrapForOptimizing.single;




var animationNameRegex = /^(\-moz\-|\-o\-|\-webkit\-)?animation-name$/;
var animationRegex = /^(\-moz\-|\-o\-|\-webkit\-)?animation$/;
var keyframeRegex = /^@(\-moz\-|\-o\-|\-webkit\-)?keyframes /;
var importantRegex = /\s{0,31}!important$/;
var optionalMatchingQuotesRegex = /^(['"]?)(.*)\1$/;

function normalize(value) {
  return value
    .replace(optionalMatchingQuotesRegex, '$2')
    .replace(importantRegex, '');
}

function removeUnusedAtRules(tokens, context) {
  removeUnusedAtRule(tokens, matchCounterStyle, markCounterStylesAsUsed, context);
  removeUnusedAtRule(tokens, matchFontFace, markFontFacesAsUsed, context);
  removeUnusedAtRule(tokens, matchKeyframe, markKeyframesAsUsed, context);
  removeUnusedAtRule(tokens, matchNamespace, markNamespacesAsUsed, context);
}

function removeUnusedAtRule(tokens, matchCallback, markCallback, context) {
  var atRules = {};
  var atRule;
  var atRuleTokens;
  var atRuleToken;
  var zeroAt;
  var i, l;

  for (i = 0, l = tokens.length; i < l; i++) {
    matchCallback(tokens[i], atRules);
  }

  if (Object.keys(atRules).length === 0) {
    return;
  }

  markUsedAtRules(tokens, markCallback, atRules, context);

  for (atRule in atRules) {
    atRuleTokens = atRules[atRule];

    for (i = 0, l = atRuleTokens.length; i < l; i++) {
      atRuleToken = atRuleTokens[i];
      zeroAt = atRuleToken[0] == token.AT_RULE ? 1 : 2;
      atRuleToken[zeroAt] = [];
    }
  }
}

function markUsedAtRules(tokens, markCallback, atRules, context) {
  var boundMarkCallback = markCallback(atRules);
  var i, l;

  for (i = 0, l = tokens.length; i < l; i++) {
    switch (tokens[i][0]) {
      case token.RULE:
        boundMarkCallback(tokens[i], context);
        break;
      case token.NESTED_BLOCK:
        markUsedAtRules(tokens[i][2], markCallback, atRules, context);
    }
  }
}

function matchCounterStyle(token$1, atRules) {
  var match;

  if (token$1[0] == token.AT_RULE_BLOCK && token$1[1][0][1].indexOf('@counter-style') === 0) {
    match = token$1[1][0][1].split(' ')[1];
    atRules[match] = atRules[match] || [];
    atRules[match].push(token$1);
  }
}

function markCounterStylesAsUsed(atRules) {
  return function (token, context) {
    var property;
    var wrappedProperty;
    var i, l;

    for (i = 0, l = token[2].length; i < l; i++) {
      property = token[2][i];

      if (property[1][1] == 'list-style') {
        wrappedProperty = wrapForOptimizing$3(property);
        populateComponents_1([wrappedProperty], context.validator, context.warnings);

        if (wrappedProperty.components[0].value[0][1] in atRules) {
          delete atRules[property[2][1]];
        }

        restoreFromOptimizing_1([wrappedProperty]);
      }

      if (property[1][1] == 'list-style-type' && property[2][1] in atRules) {
        delete atRules[property[2][1]];
      }
    }
  };
}

function matchFontFace(token$1, atRules) {
  var property;
  var match;
  var i, l;

  if (token$1[0] == token.AT_RULE_BLOCK && token$1[1][0][1] == '@font-face') {
    for (i = 0, l = token$1[2].length; i < l; i++) {
      property = token$1[2][i];

      if (property[1][1] == 'font-family') {
        match = normalize(property[2][1].toLowerCase());
        atRules[match] = atRules[match] || [];
        atRules[match].push(token$1);
        break;
      }
    }
  }
}

function markFontFacesAsUsed(atRules) {
  return function (token, context) {
    var property;
    var wrappedProperty;
    var component;
    var normalizedMatch;
    var i, l;
    var j, m;

    for (i = 0, l = token[2].length; i < l; i++) {
      property = token[2][i];

      if (property[1][1] == 'font') {
        wrappedProperty = wrapForOptimizing$3(property);
        populateComponents_1([wrappedProperty], context.validator, context.warnings);
        component = wrappedProperty.components[6];

        for (j = 0, m = component.value.length; j < m; j++) {
          normalizedMatch = normalize(component.value[j][1].toLowerCase());

          if (normalizedMatch in atRules) {
            delete atRules[normalizedMatch];
          }
        }

        restoreFromOptimizing_1([wrappedProperty]);
      }

      if (property[1][1] == 'font-family') {
        for (j = 2, m = property.length; j < m; j++) {
          normalizedMatch = normalize(property[j][1].toLowerCase());

          if (normalizedMatch in atRules) {
            delete atRules[normalizedMatch];
          }
        }
      }
    }
  };
}

function matchKeyframe(token$1, atRules) {
  var match;

  if (token$1[0] == token.NESTED_BLOCK && keyframeRegex.test(token$1[1][0][1])) {
    match = token$1[1][0][1].split(' ')[1];
    atRules[match] = atRules[match] || [];
    atRules[match].push(token$1);
  }
}

function markKeyframesAsUsed(atRules) {
  return function (token, context) {
    var property;
    var wrappedProperty;
    var component;
    var i, l;
    var j, m;

    for (i = 0, l = token[2].length; i < l; i++) {
      property = token[2][i];

      if (animationRegex.test(property[1][1])) {
        wrappedProperty = wrapForOptimizing$3(property);
        populateComponents_1([wrappedProperty], context.validator, context.warnings);
        component = wrappedProperty.components[7];

        for (j = 0, m = component.value.length; j < m; j++) {
          if (component.value[j][1] in atRules) {
            delete atRules[component.value[j][1]];
          }
        }

        restoreFromOptimizing_1([wrappedProperty]);
      }

      if (animationNameRegex.test(property[1][1])) {
        for (j = 2, m = property.length; j < m; j++) {
          if (property[j][1] in atRules) {
            delete atRules[property[j][1]];
          }
        }
      }
    }
  };
}

function matchNamespace(token$1, atRules) {
  var match;

  if (token$1[0] == token.AT_RULE && token$1[1].indexOf('@namespace') === 0) {
    match = token$1[1].split(' ')[1];
    atRules[match] = atRules[match] || [];
    atRules[match].push(token$1);
  }
}

function markNamespacesAsUsed(atRules) {
  var namespaceRegex = new RegExp(Object.keys(atRules).join('\\\||') + '\\\|', 'g');

  return function (token) {
    var match;
    var scope;
    var normalizedMatch;
    var i, l;
    var j, m;

    for (i = 0, l = token[1].length; i < l; i++) {
      scope = token[1][i];
      match = scope[1].match(namespaceRegex);

      for (j = 0, m = match.length; j < m; j++) {
        normalizedMatch = match[j].substring(0, match[j].length - 1);

        if (normalizedMatch in atRules) {
          delete atRules[normalizedMatch];
        }
      }
    }
  };
}

var removeUnusedAtRules_1 = removeUnusedAtRules;

function ruleSorter(s1, s2) {
  return s1[1] > s2[1] ? 1 : -1;
}

function tidyRuleDuplicates(rules) {
  var list = [];
  var repeated = [];

  for (var i = 0, l = rules.length; i < l; i++) {
    var rule = rules[i];

    if (repeated.indexOf(rule[1]) == -1) {
      repeated.push(rule[1]);
      list.push(rule);
    }
  }

  return list.sort(ruleSorter);
}

var tidyRuleDuplicates_1 = tidyRuleDuplicates;

var canReorderSingle$2 = reorderable.canReorderSingle;








var serializeBody$5 = oneTime.body;
var serializeRules$9 = oneTime.rules;

function naturalSorter$1(a, b) {
  return a > b ? 1 : -1;
}

function cloneAndMergeSelectors(propertyA, propertyB) {
  var cloned = cloneArray_1(propertyA);
  cloned[5] = cloned[5].concat(propertyB[5]);

  return cloned;
}

function restructure(tokens, context) {
  var options = context.options;
  var mergeablePseudoClasses = options.compatibility.selectors.mergeablePseudoClasses;
  var mergeablePseudoElements = options.compatibility.selectors.mergeablePseudoElements;
  var mergeLimit = options.compatibility.selectors.mergeLimit;
  var multiplePseudoMerging = options.compatibility.selectors.multiplePseudoMerging;
  var specificityCache = context.cache.specificity;
  var movableTokens = {};
  var movedProperties = [];
  var multiPropertyMoveCache = {};
  var movedToBeDropped = [];
  var maxCombinationsLevel = 2;
  var ID_JOIN_CHARACTER = '%';

  function sendToMultiPropertyMoveCache(position, movedProperty, allFits) {
    for (var i = allFits.length - 1; i >= 0; i--) {
      var fit = allFits[i][0];
      var id = addToCache(movedProperty, fit);

      if (multiPropertyMoveCache[id].length > 1 && processMultiPropertyMove(position, multiPropertyMoveCache[id])) {
        removeAllMatchingFromCache(id);
        break;
      }
    }
  }

  function addToCache(movedProperty, fit) {
    var id = cacheId(fit);
    multiPropertyMoveCache[id] = multiPropertyMoveCache[id] || [];
    multiPropertyMoveCache[id].push([movedProperty, fit]);
    return id;
  }

  function removeAllMatchingFromCache(matchId) {
    var matchSelectors = matchId.split(ID_JOIN_CHARACTER);
    var forRemoval = [];
    var i;

    for (var id in multiPropertyMoveCache) {
      var selectors = id.split(ID_JOIN_CHARACTER);
      for (i = selectors.length - 1; i >= 0; i--) {
        if (matchSelectors.indexOf(selectors[i]) > -1) {
          forRemoval.push(id);
          break;
        }
      }
    }

    for (i = forRemoval.length - 1; i >= 0; i--) {
      delete multiPropertyMoveCache[forRemoval[i]];
    }
  }

  function cacheId(cachedTokens) {
    var id = [];
    for (var i = 0, l = cachedTokens.length; i < l; i++) {
      id.push(serializeRules$9(cachedTokens[i][1]));
    }
    return id.join(ID_JOIN_CHARACTER);
  }

  function tokensToMerge(sourceTokens) {
    var uniqueTokensWithBody = [];
    var mergeableTokens = [];

    for (var i = sourceTokens.length - 1; i >= 0; i--) {
      if (!isMergeable_1(serializeRules$9(sourceTokens[i][1]), mergeablePseudoClasses, mergeablePseudoElements, multiplePseudoMerging)) {
        continue;
      }

      mergeableTokens.unshift(sourceTokens[i]);
      if (sourceTokens[i][2].length > 0 && uniqueTokensWithBody.indexOf(sourceTokens[i]) == -1)
        uniqueTokensWithBody.push(sourceTokens[i]);
    }

    return uniqueTokensWithBody.length > 1 ?
      mergeableTokens :
      [];
  }

  function shortenIfPossible(position, movedProperty) {
    var name = movedProperty[0];
    var value = movedProperty[1];
    var key = movedProperty[4];
    var valueSize = name.length + value.length + 1;
    var allSelectors = [];
    var qualifiedTokens = [];

    var mergeableTokens = tokensToMerge(movableTokens[key]);
    if (mergeableTokens.length < 2)
      return;

    var allFits = findAllFits(mergeableTokens, valueSize, 1);
    var bestFit = allFits[0];
    if (bestFit[1] > 0)
      return sendToMultiPropertyMoveCache(position, movedProperty, allFits);

    for (var i = bestFit[0].length - 1; i >=0; i--) {
      allSelectors = bestFit[0][i][1].concat(allSelectors);
      qualifiedTokens.unshift(bestFit[0][i]);
    }

    allSelectors = tidyRuleDuplicates_1(allSelectors);
    dropAsNewTokenAt(position, [movedProperty], allSelectors, qualifiedTokens);
  }

  function fitSorter(fit1, fit2) {
    return fit1[1] > fit2[1] ? 1 : (fit1[1] == fit2[1] ? 0 : -1);
  }

  function findAllFits(mergeableTokens, propertySize, propertiesCount) {
    var combinations = allCombinations(mergeableTokens, propertySize, propertiesCount, maxCombinationsLevel - 1);
    return combinations.sort(fitSorter);
  }

  function allCombinations(tokensVariant, propertySize, propertiesCount, level) {
    var differenceVariants = [[tokensVariant, sizeDifference(tokensVariant, propertySize, propertiesCount)]];
    if (tokensVariant.length > 2 && level > 0) {
      for (var i = tokensVariant.length - 1; i >= 0; i--) {
        var subVariant = Array.prototype.slice.call(tokensVariant, 0);
        subVariant.splice(i, 1);
        differenceVariants = differenceVariants.concat(allCombinations(subVariant, propertySize, propertiesCount, level - 1));
      }
    }

    return differenceVariants;
  }

  function sizeDifference(tokensVariant, propertySize, propertiesCount) {
    var allSelectorsSize = 0;
    for (var i = tokensVariant.length - 1; i >= 0; i--) {
      allSelectorsSize += tokensVariant[i][2].length > propertiesCount ? serializeRules$9(tokensVariant[i][1]).length : -1;
    }
    return allSelectorsSize - (tokensVariant.length - 1) * propertySize + 1;
  }

  function dropAsNewTokenAt(position, properties, allSelectors, mergeableTokens) {
    var i, j, k, m;
    var allProperties = [];

    for (i = mergeableTokens.length - 1; i >= 0; i--) {
      var mergeableToken = mergeableTokens[i];

      for (j = mergeableToken[2].length - 1; j >= 0; j--) {
        var mergeableProperty = mergeableToken[2][j];

        for (k = 0, m = properties.length; k < m; k++) {
          var property = properties[k];

          var mergeablePropertyName = mergeableProperty[1][1];
          var propertyName = property[0];
          var propertyBody = property[4];
          if (mergeablePropertyName == propertyName && serializeBody$5([mergeableProperty]) == propertyBody) {
            mergeableToken[2].splice(j, 1);
            break;
          }
        }
      }
    }

    for (i = properties.length - 1; i >= 0; i--) {
      allProperties.unshift(properties[i][3]);
    }

    var newToken = [token.RULE, allSelectors, allProperties];
    tokens.splice(position, 0, newToken);
  }

  function dropPropertiesAt(position, movedProperty) {
    var key = movedProperty[4];
    var toMove = movableTokens[key];

    if (toMove && toMove.length > 1) {
      if (!shortenMultiMovesIfPossible(position, movedProperty))
        shortenIfPossible(position, movedProperty);
    }
  }

  function shortenMultiMovesIfPossible(position, movedProperty) {
    var candidates = [];
    var propertiesAndMergableTokens = [];
    var key = movedProperty[4];
    var j, k;

    var mergeableTokens = tokensToMerge(movableTokens[key]);
    if (mergeableTokens.length < 2)
      return;

    movableLoop:
    for (var value in movableTokens) {
      var tokensList = movableTokens[value];

      for (j = mergeableTokens.length - 1; j >= 0; j--) {
        if (tokensList.indexOf(mergeableTokens[j]) == -1)
          continue movableLoop;
      }

      candidates.push(value);
    }

    if (candidates.length < 2)
      return false;

    for (j = candidates.length - 1; j >= 0; j--) {
      for (k = movedProperties.length - 1; k >= 0; k--) {
        if (movedProperties[k][4] == candidates[j]) {
          propertiesAndMergableTokens.unshift([movedProperties[k], mergeableTokens]);
          break;
        }
      }
    }

    return processMultiPropertyMove(position, propertiesAndMergableTokens);
  }

  function processMultiPropertyMove(position, propertiesAndMergableTokens) {
    var valueSize = 0;
    var properties = [];
    var property;

    for (var i = propertiesAndMergableTokens.length - 1; i >= 0; i--) {
      property = propertiesAndMergableTokens[i][0];
      var fullValue = property[4];
      valueSize += fullValue.length + (i > 0 ? 1 : 0);

      properties.push(property);
    }

    var mergeableTokens = propertiesAndMergableTokens[0][1];
    var bestFit = findAllFits(mergeableTokens, valueSize, properties.length)[0];
    if (bestFit[1] > 0)
      return false;

    var allSelectors = [];
    var qualifiedTokens = [];
    for (i = bestFit[0].length - 1; i >= 0; i--) {
      allSelectors = bestFit[0][i][1].concat(allSelectors);
      qualifiedTokens.unshift(bestFit[0][i]);
    }

    allSelectors = tidyRuleDuplicates_1(allSelectors);
    dropAsNewTokenAt(position, properties, allSelectors, qualifiedTokens);

    for (i = properties.length - 1; i >= 0; i--) {
      property = properties[i];
      var index = movedProperties.indexOf(property);

      delete movableTokens[property[4]];

      if (index > -1 && movedToBeDropped.indexOf(index) == -1)
        movedToBeDropped.push(index);
    }

    return true;
  }

  function boundToAnotherPropertyInCurrrentToken(property, movedProperty, token) {
    var propertyName = property[0];
    var movedPropertyName = movedProperty[0];
    if (propertyName != movedPropertyName)
      return false;

    var key = movedProperty[4];
    var toMove = movableTokens[key];
    return toMove && toMove.indexOf(token) > -1;
  }

  for (var i = tokens.length - 1; i >= 0; i--) {
    var token$1 = tokens[i];
    var isRule;
    var j, k, m;
    var samePropertyAt;

    if (token$1[0] == token.RULE) {
      isRule = true;
    } else if (token$1[0] == token.NESTED_BLOCK) {
      isRule = false;
    } else {
      continue;
    }

    // We cache movedProperties.length as it may change in the loop
    var movedCount = movedProperties.length;

    var properties = extractProperties_1(token$1);
    movedToBeDropped = [];

    var unmovableInCurrentToken = [];
    for (j = properties.length - 1; j >= 0; j--) {
      for (k = j - 1; k >= 0; k--) {
        if (!canReorderSingle$2(properties[j], properties[k], specificityCache)) {
          unmovableInCurrentToken.push(j);
          break;
        }
      }
    }

    for (j = properties.length - 1; j >= 0; j--) {
      var property = properties[j];
      var movedSameProperty = false;

      for (k = 0; k < movedCount; k++) {
        var movedProperty = movedProperties[k];

        if (movedToBeDropped.indexOf(k) == -1 && (!canReorderSingle$2(property, movedProperty, specificityCache) && !boundToAnotherPropertyInCurrrentToken(property, movedProperty, token$1) ||
            movableTokens[movedProperty[4]] && movableTokens[movedProperty[4]].length === mergeLimit)) {
          dropPropertiesAt(i + 1, movedProperty);

          if (movedToBeDropped.indexOf(k) == -1) {
            movedToBeDropped.push(k);
            delete movableTokens[movedProperty[4]];
          }
        }

        if (!movedSameProperty) {
          movedSameProperty = property[0] == movedProperty[0] && property[1] == movedProperty[1];

          if (movedSameProperty) {
            samePropertyAt = k;
          }
        }
      }

      if (!isRule || unmovableInCurrentToken.indexOf(j) > -1)
        continue;

      var key = property[4];

      if (movedSameProperty && movedProperties[samePropertyAt][5].length + property[5].length > mergeLimit) {
        dropPropertiesAt(i + 1, movedProperties[samePropertyAt]);
        movedProperties.splice(samePropertyAt, 1);
        movableTokens[key] = [token$1];
        movedSameProperty = false;
      } else {
        movableTokens[key] = movableTokens[key] || [];
        movableTokens[key].push(token$1);
      }

      if (movedSameProperty) {
        movedProperties[samePropertyAt] = cloneAndMergeSelectors(movedProperties[samePropertyAt], property);
      } else {
        movedProperties.push(property);
      }
    }

    movedToBeDropped = movedToBeDropped.sort(naturalSorter$1);
    for (j = 0, m = movedToBeDropped.length; j < m; j++) {
      var dropAt = movedToBeDropped[j] - j;
      movedProperties.splice(dropAt, 1);
    }
  }

  var position = tokens[0] && tokens[0][0] == token.AT_RULE && tokens[0][1].indexOf('@charset') === 0 ? 1 : 0;
  for (; position < tokens.length - 1; position++) {
    var isImportRule = tokens[position][0] === token.AT_RULE && tokens[position][1].indexOf('@import') === 0;
    var isComment = tokens[position][0] === token.COMMENT;
    if (!(isImportRule || isComment))
      break;
  }

  for (i = 0; i < movedProperties.length; i++) {
    dropPropertiesAt(position, movedProperties[i]);
  }
}

var restructure_1 = restructure;

var OptimizationLevel$6 = optimizationLevel.OptimizationLevel;



function removeEmpty(tokens) {
  for (var i = 0, l = tokens.length; i < l; i++) {
    var token$1 = tokens[i];
    var isEmpty = false;

    switch (token$1[0]) {
      case token.RULE:
        isEmpty = token$1[1].length === 0 || token$1[2].length === 0;
        break;
      case token.NESTED_BLOCK:
        removeEmpty(token$1[2]);
        isEmpty = token$1[2].length === 0;
        break;
      case token.AT_RULE:
        isEmpty = token$1[1].length === 0;
        break;
      case token.AT_RULE_BLOCK:
        isEmpty = token$1[2].length === 0;
    }

    if (isEmpty) {
      tokens.splice(i, 1);
      i--;
      l--;
    }
  }
}

function recursivelyOptimizeBlocks(tokens, context) {
  for (var i = 0, l = tokens.length; i < l; i++) {
    var token$1 = tokens[i];

    if (token$1[0] == token.NESTED_BLOCK) {
      var isKeyframes = /@(-moz-|-o-|-webkit-)?keyframes/.test(token$1[1][0][1]);
      level2Optimize(token$1[2], context, !isKeyframes);
    }
  }
}

function recursivelyOptimizeProperties(tokens, context) {
  for (var i = 0, l = tokens.length; i < l; i++) {
    var token$1 = tokens[i];

    switch (token$1[0]) {
      case token.RULE:
        optimize$2(token$1[2], true, true, context);
        break;
      case token.NESTED_BLOCK:
        recursivelyOptimizeProperties(token$1[2], context);
    }
  }
}

function level2Optimize(tokens, context, withRestructuring) {
  var levelOptions = context.options.level[OptimizationLevel$6.Two];
  var reduced;
  var i;

  recursivelyOptimizeBlocks(tokens, context);
  recursivelyOptimizeProperties(tokens, context);

  if (levelOptions.removeDuplicateRules) {
    removeDuplicates_1(tokens);
  }

  if (levelOptions.mergeAdjacentRules) {
    mergeAdjacent_1(tokens, context);
  }

  if (levelOptions.reduceNonAdjacentRules) {
    reduceNonAdjacent_1(tokens, context);
  }

  if (levelOptions.mergeNonAdjacentRules && levelOptions.mergeNonAdjacentRules != 'body') {
    mergeNonAdjacentBySelector_1(tokens, context);
  }

  if (levelOptions.mergeNonAdjacentRules && levelOptions.mergeNonAdjacentRules != 'selector') {
    mergeNonAdjacentByBody_1(tokens, context);
  }

  if (levelOptions.restructureRules && levelOptions.mergeAdjacentRules && withRestructuring) {
    restructure_1(tokens, context);
    mergeAdjacent_1(tokens, context);
  }

  if (levelOptions.restructureRules && !levelOptions.mergeAdjacentRules && withRestructuring) {
    restructure_1(tokens, context);
  }

  if (levelOptions.removeDuplicateFontRules) {
    removeDuplicateFontAtRules_1(tokens);
  }

  if (levelOptions.removeDuplicateMediaBlocks) {
    removeDuplicateMediaQueries_1(tokens);
  }

  if (levelOptions.removeUnusedAtRules) {
    removeUnusedAtRules_1(tokens, context);
  }

  if (levelOptions.mergeMedia) {
    reduced = mergeMediaQueries_1(tokens, context);
    for (i = reduced.length - 1; i >= 0; i--) {
      level2Optimize(reduced[i][2], context, false);
    }
  }

  if (levelOptions.removeEmpty) {
    removeEmpty(tokens);
  }

  return tokens;
}

var optimize$3 = level2Optimize;

var functionNoVendorRegexStr = '[A-Z]+(\\-|[A-Z]|[0-9])+\\(.*?\\)';
var functionVendorRegexStr = '\\-(\\-|[A-Z]|[0-9])+\\(.*?\\)';
var variableRegexStr = 'var\\(\\-\\-[^\\)]+\\)';
var functionAnyRegexStr = '(' + variableRegexStr + '|' + functionNoVendorRegexStr + '|' + functionVendorRegexStr + ')';

var calcRegex = new RegExp('^(\\-moz\\-|\\-webkit\\-)?calc\\([^\\)]+\\)$', 'i');
var decimalRegex = /[0-9]/;
var functionAnyRegex = new RegExp('^' + functionAnyRegexStr + '$', 'i');
var hslColorRegex = /^hsl\(\s{0,31}[\-\.]?\d+\s{0,31},\s{0,31}\.?\d+%\s{0,31},\s{0,31}\.?\d+%\s{0,31}\)|hsla\(\s{0,31}[\-\.]?\d+\s{0,31},\s{0,31}\.?\d+%\s{0,31},\s{0,31}\.?\d+%\s{0,31},\s{0,31}\.?\d+\s{0,31}\)$/i;
var identifierRegex = /^(\-[a-z0-9_][a-z0-9\-_]*|[a-z][a-z0-9\-_]*)$/i;
var namedEntityRegex = /^[a-z]+$/i;
var prefixRegex = /^-([a-z0-9]|-)*$/i;
var rgbColorRegex = /^rgb\(\s{0,31}[\d]{1,3}\s{0,31},\s{0,31}[\d]{1,3}\s{0,31},\s{0,31}[\d]{1,3}\s{0,31}\)|rgba\(\s{0,31}[\d]{1,3}\s{0,31},\s{0,31}[\d]{1,3}\s{0,31},\s{0,31}[\d]{1,3}\s{0,31},\s{0,31}[\.\d]+\s{0,31}\)$/i;
var timingFunctionRegex = /^(cubic\-bezier|steps)\([^\)]+\)$/;
var validTimeUnits = ['ms', 's'];
var urlRegex = /^url\([\s\S]+\)$/i;
var variableRegex = new RegExp('^' + variableRegexStr + '$', 'i');

var eightValueColorRegex = /^#[0-9a-f]{8}$/i;
var fourValueColorRegex = /^#[0-9a-f]{4}$/i;
var sixValueColorRegex = /^#[0-9a-f]{6}$/i;
var threeValueColorRegex = /^#[0-9a-f]{3}$/i;

var DECIMAL_DOT = '.';
var MINUS_SIGN = '-';
var PLUS_SIGN = '+';

var Keywords = {
  '^': [
    'inherit',
    'initial',
    'unset'
  ],
  '*-style': [
    'auto',
    'dashed',
    'dotted',
    'double',
    'groove',
    'hidden',
    'inset',
    'none',
    'outset',
    'ridge',
    'solid'
  ],
  '*-timing-function': [
    'ease',
    'ease-in',
    'ease-in-out',
    'ease-out',
    'linear',
    'step-end',
    'step-start'
  ],
  'animation-direction': [
    'alternate',
    'alternate-reverse',
    'normal',
    'reverse'
  ],
  'animation-fill-mode': [
    'backwards',
    'both',
    'forwards',
    'none'
  ],
  'animation-iteration-count': [
    'infinite'
  ],
  'animation-name': [
    'none'
  ],
  'animation-play-state': [
    'paused',
    'running'
  ],
  'background-attachment': [
    'fixed',
    'inherit',
    'local',
    'scroll'
  ],
  'background-clip': [
    'border-box',
    'content-box',
    'inherit',
    'padding-box',
    'text'
  ],
  'background-origin': [
    'border-box',
    'content-box',
    'inherit',
    'padding-box'
  ],
  'background-position': [
    'bottom',
    'center',
    'left',
    'right',
    'top'
  ],
  'background-repeat': [
    'no-repeat',
    'inherit',
    'repeat',
    'repeat-x',
    'repeat-y',
    'round',
    'space'
  ],
  'background-size': [
    'auto',
    'cover',
    'contain'
  ],
  'border-collapse': [
    'collapse',
    'inherit',
    'separate'
  ],
  'bottom': [
    'auto'
  ],
  'clear': [
    'both',
    'left',
    'none',
    'right'
  ],
  'color': [
    'transparent'
  ],
  'cursor': [
    'all-scroll',
    'auto',
    'col-resize',
    'crosshair',
    'default',
    'e-resize',
    'help',
    'move',
    'n-resize',
    'ne-resize',
    'no-drop',
    'not-allowed',
    'nw-resize',
    'pointer',
    'progress',
    'row-resize',
    's-resize',
    'se-resize',
    'sw-resize',
    'text',
    'vertical-text',
    'w-resize',
    'wait'
  ],
  'display': [
    'block',
    'inline',
    'inline-block',
    'inline-table',
    'list-item',
    'none',
    'table',
    'table-caption',
    'table-cell',
    'table-column',
    'table-column-group',
    'table-footer-group',
    'table-header-group',
    'table-row',
    'table-row-group'
  ],
  'float': [
    'left',
    'none',
    'right'
  ],
  'left': [
    'auto'
  ],
  'font': [
    'caption',
    'icon',
    'menu',
    'message-box',
    'small-caption',
    'status-bar',
    'unset'
  ],
  'font-size': [
    'large',
    'larger',
    'medium',
    'small',
    'smaller',
    'x-large',
    'x-small',
    'xx-large',
    'xx-small'
  ],
  'font-stretch': [
    'condensed',
    'expanded',
    'extra-condensed',
    'extra-expanded',
    'normal',
    'semi-condensed',
    'semi-expanded',
    'ultra-condensed',
    'ultra-expanded'
  ],
  'font-style': [
    'italic',
    'normal',
    'oblique'
  ],
  'font-variant': [
    'normal',
    'small-caps'
  ],
  'font-weight': [
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    'bold',
    'bolder',
    'lighter',
    'normal'
  ],
  'line-height': [
    'normal'
  ],
  'list-style-position': [
    'inside',
    'outside'
  ],
  'list-style-type': [
    'armenian',
    'circle',
    'decimal',
    'decimal-leading-zero',
    'disc',
    'decimal|disc', // this is the default value of list-style-type, see comment in compactable.js
    'georgian',
    'lower-alpha',
    'lower-greek',
    'lower-latin',
    'lower-roman',
    'none',
    'square',
    'upper-alpha',
    'upper-latin',
    'upper-roman'
  ],
  'overflow': [
    'auto',
    'hidden',
    'scroll',
    'visible'
  ],
  'position': [
    'absolute',
    'fixed',
    'relative',
    'static'
  ],
  'right': [
    'auto'
  ],
  'text-align': [
    'center',
    'justify',
    'left',
    'left|right', // this is the default value of list-style-type, see comment in compactable.js
    'right'
  ],
  'text-decoration': [
    'line-through',
    'none',
    'overline',
    'underline'
  ],
  'text-overflow': [
    'clip',
    'ellipsis'
  ],
  'top': [
    'auto'
  ],
  'vertical-align': [
    'baseline',
    'bottom',
    'middle',
    'sub',
    'super',
    'text-bottom',
    'text-top',
    'top'
  ],
  'visibility': [
    'collapse',
    'hidden',
    'visible'
  ],
  'white-space': [
    'normal',
    'nowrap',
    'pre'
  ],
  'width': [
    'inherit',
    'initial',
    'medium',
    'thick',
    'thin'
  ]
};

var Units = [
  '%',
  'ch',
  'cm',
  'em',
  'ex',
  'in',
  'mm',
  'pc',
  'pt',
  'px',
  'rem',
  'vh',
  'vm',
  'vmax',
  'vmin',
  'vw'
];

function isColor(value) {
  return value != 'auto' &&
    (
      isKeyword('color')(value) ||
      isHexColor(value) ||
      isColorFunction(value) ||
      isNamedEntity(value)
    );
}

function isColorFunction(value) {
  return isRgbColor(value) || isHslColor(value);
}

function isDynamicUnit(value) {
  return calcRegex.test(value);
}

function isFunction(value) {
  return functionAnyRegex.test(value);
}

function isHexColor(value) {
  return threeValueColorRegex.test(value) || fourValueColorRegex.test(value) || sixValueColorRegex.test(value) || eightValueColorRegex.test(value);
}

function isHslColor(value) {
  return hslColorRegex.test(value);
}

function isIdentifier(value) {
  return identifierRegex.test(value);
}

function isImage(value) {
  return value == 'none' || value == 'inherit' || isUrl$1(value);
}

function isKeyword(propertyName) {
  return function(value) {
    return Keywords[propertyName].indexOf(value) > -1;
  };
}

function isNamedEntity(value) {
  return namedEntityRegex.test(value);
}

function isNumber(value) {
  return scanForNumber(value) == value.length;
}

function isRgbColor(value) {
  return rgbColorRegex.test(value);
}

function isPrefixed(value) {
  return prefixRegex.test(value);
}

function isPositiveNumber(value) {
  return isNumber(value) &&
    parseFloat(value) >= 0;
}

function isVariable(value) {
  return variableRegex.test(value);
}

function isTime(value) {
  var numberUpTo = scanForNumber(value);

  return numberUpTo == value.length && parseInt(value) === 0 ||
    numberUpTo > -1 && validTimeUnits.indexOf(value.slice(numberUpTo + 1)) > -1;
}

function isTimingFunction() {
  var isTimingFunctionKeyword = isKeyword('*-timing-function');

  return function (value) {
    return isTimingFunctionKeyword(value) || timingFunctionRegex.test(value);
  };
}

function isUnit(validUnits, value) {
  var numberUpTo = scanForNumber(value);

  return numberUpTo == value.length && parseInt(value) === 0 ||
    numberUpTo > -1 && validUnits.indexOf(value.slice(numberUpTo + 1)) > -1 ||
    value == 'auto' ||
    value == 'inherit';
}

function isUrl$1(value) {
  return urlRegex.test(value);
}

function isZIndex(value) {
  return value == 'auto' ||
    isNumber(value) ||
    isKeyword('^')(value);
}

function scanForNumber(value) {
  var hasDot = false;
  var hasSign = false;
  var character;
  var i, l;

  for (i = 0, l = value.length; i < l; i++) {
    character = value[i];

    if (i === 0 && (character == PLUS_SIGN || character == MINUS_SIGN)) {
      hasSign = true;
    } else if (i > 0 && hasSign && (character == PLUS_SIGN || character == MINUS_SIGN)) {
      return i - 1;
    } else if (character == DECIMAL_DOT && !hasDot) {
      hasDot = true;
    } else if (character == DECIMAL_DOT && hasDot) {
      return i - 1;
    } else if (decimalRegex.test(character)) {
      continue;
    } else {
      return i - 1;
    }
  }

  return i;
}

function validator(compatibility) {
  var validUnits = Units.slice(0).filter(function (value) {
    return !(value in compatibility.units) || compatibility.units[value] === true;
  });

  return {
    colorOpacity: compatibility.colors.opacity,
    isAnimationDirectionKeyword: isKeyword('animation-direction'),
    isAnimationFillModeKeyword: isKeyword('animation-fill-mode'),
    isAnimationIterationCountKeyword: isKeyword('animation-iteration-count'),
    isAnimationNameKeyword: isKeyword('animation-name'),
    isAnimationPlayStateKeyword: isKeyword('animation-play-state'),
    isTimingFunction: isTimingFunction(),
    isBackgroundAttachmentKeyword: isKeyword('background-attachment'),
    isBackgroundClipKeyword: isKeyword('background-clip'),
    isBackgroundOriginKeyword: isKeyword('background-origin'),
    isBackgroundPositionKeyword: isKeyword('background-position'),
    isBackgroundRepeatKeyword: isKeyword('background-repeat'),
    isBackgroundSizeKeyword: isKeyword('background-size'),
    isColor: isColor,
    isColorFunction: isColorFunction,
    isDynamicUnit: isDynamicUnit,
    isFontKeyword: isKeyword('font'),
    isFontSizeKeyword: isKeyword('font-size'),
    isFontStretchKeyword: isKeyword('font-stretch'),
    isFontStyleKeyword: isKeyword('font-style'),
    isFontVariantKeyword: isKeyword('font-variant'),
    isFontWeightKeyword: isKeyword('font-weight'),
    isFunction: isFunction,
    isGlobal: isKeyword('^'),
    isHslColor: isHslColor,
    isIdentifier: isIdentifier,
    isImage: isImage,
    isKeyword: isKeyword,
    isLineHeightKeyword: isKeyword('line-height'),
    isListStylePositionKeyword: isKeyword('list-style-position'),
    isListStyleTypeKeyword: isKeyword('list-style-type'),
    isNumber: isNumber,
    isPrefixed: isPrefixed,
    isPositiveNumber: isPositiveNumber,
    isRgbColor: isRgbColor,
    isStyleKeyword: isKeyword('*-style'),
    isTime: isTime,
    isUnit: isUnit.bind(null, validUnits),
    isUrl: isUrl$1,
    isVariable: isVariable,
    isWidth: isKeyword('width'),
    isZIndex: isZIndex
  };
}

var validator_1 = validator;

var DEFAULTS$2 = {
  '*': {
    colors: {
      opacity: true // rgba / hsla
    },
    properties: {
      backgroundClipMerging: true, // background-clip to shorthand
      backgroundOriginMerging: true, // background-origin to shorthand
      backgroundSizeMerging: true, // background-size to shorthand
      colors: true, // any kind of color transformations, like `#ff00ff` to `#f0f` or `#fff` into `red`
      ieBangHack: false, // !ie suffix hacks on IE<8
      ieFilters: false, // whether to preserve `filter` and `-ms-filter` properties
      iePrefixHack: false, // underscore / asterisk prefix hacks on IE
      ieSuffixHack: false, // \9 suffix hacks on IE6-9
      merging: true, // merging properties into one
      shorterLengthUnits: false, // optimize pixel units into `pt`, `pc` or `in` units
      spaceAfterClosingBrace: true, // 'url() no-repeat' to 'url()no-repeat'
      urlQuotes: false, // whether to wrap content of `url()` into quotes or not
      zeroUnits: true // 0[unit] -> 0
    },
    selectors: {
      adjacentSpace: false, // div+ nav Android stock browser hack
      ie7Hack: false, // *+html hack
      mergeablePseudoClasses: [
        ':active',
        ':after',
        ':before',
        ':empty',
        ':checked',
        ':disabled',
        ':empty',
        ':enabled',
        ':first-child',
        ':first-letter',
        ':first-line',
        ':first-of-type',
        ':focus',
        ':hover',
        ':lang',
        ':last-child',
        ':last-of-type',
        ':link',
        ':not',
        ':nth-child',
        ':nth-last-child',
        ':nth-last-of-type',
        ':nth-of-type',
        ':only-child',
        ':only-of-type',
        ':root',
        ':target',
        ':visited'
      ], // selectors with these pseudo-classes can be merged as these are universally supported
      mergeablePseudoElements: [
        '::after',
        '::before',
        '::first-letter',
        '::first-line'
      ], // selectors with these pseudo-elements can be merged as these are universally supported
      mergeLimit: 8191, // number of rules that can be safely merged together
      multiplePseudoMerging: true
    },
    units: {
      ch: true,
      in: true,
      pc: true,
      pt: true,
      rem: true,
      vh: true,
      vm: true, // vm is vmin on IE9+ see https://developer.mozilla.org/en-US/docs/Web/CSS/length
      vmax: true,
      vmin: true,
      vw: true
    }
  }
};

DEFAULTS$2.ie11 = DEFAULTS$2['*'];

DEFAULTS$2.ie10 = DEFAULTS$2['*'];

DEFAULTS$2.ie9 = merge(DEFAULTS$2['*'], {
  properties: {
    ieFilters: true,
    ieSuffixHack: true
  }
});

DEFAULTS$2.ie8 = merge(DEFAULTS$2.ie9, {
  colors: {
    opacity: false
  },
  properties: {
    backgroundClipMerging: false,
    backgroundOriginMerging: false,
    backgroundSizeMerging: false,
    iePrefixHack: true,
    merging: false
  },
  selectors: {
    mergeablePseudoClasses: [
      ':after',
      ':before',
      ':first-child',
      ':first-letter',
      ':focus',
      ':hover',
      ':visited'
    ],
    mergeablePseudoElements: []
  },
  units: {
    ch: false,
    rem: false,
    vh: false,
    vm: false,
    vmax: false,
    vmin: false,
    vw: false
  }
});

DEFAULTS$2.ie7 = merge(DEFAULTS$2.ie8, {
  properties: {
    ieBangHack: true
  },
  selectors: {
    ie7Hack: true,
    mergeablePseudoClasses: [
      ':first-child',
      ':first-letter',
      ':hover',
      ':visited'
    ]
  },
});

function compatibilityFrom(source) {
  return merge(DEFAULTS$2['*'], calculateSource(source));
}

function merge(source, target) {
  for (var key in source) {
    var value = source[key];

    if (typeof value === 'object' && !Array.isArray(value)) {
      target[key] = merge(value, target[key] || {});
    } else {
      target[key] = key in target ? target[key] : value;
    }
  }

  return target;
}

function calculateSource(source) {
  if (typeof source == 'object')
    return source;

  if (!/[,\+\-]/.test(source))
    return DEFAULTS$2[source] || DEFAULTS$2['*'];

  var parts = source.split(',');
  var template = parts[0] in DEFAULTS$2 ?
    DEFAULTS$2[parts.shift()] :
    DEFAULTS$2['*'];

  source = {};

  parts.forEach(function (part) {
    var isAdd = part[0] == '+';
    var key = part.substring(1).split('.');
    var group = key[0];
    var option = key[1];

    source[group] = source[group] || {};
    source[group][option] = isAdd;
  });

  return merge(template, source);
}

var compatibility = compatibilityFrom;

var HTTP_RESOURCE_PATTERN = /^http:\/\//;

function isHttpResource(uri) {
  return HTTP_RESOURCE_PATTERN.test(uri);
}

var isHttpResource_1 = isHttpResource;

var HTTPS_RESOURCE_PATTERN = /^https:\/\//;

function isHttpsResource(uri) {
  return HTTPS_RESOURCE_PATTERN.test(uri);
}

var isHttpsResource_1 = isHttpsResource;

var HTTP_PROTOCOL = 'http:';

function loadRemoteResource(uri, inlineRequest, inlineTimeout, callback) {
  var proxyProtocol = inlineRequest.protocol || inlineRequest.hostname;
  var errorHandled = false;
  var requestOptions;
  var fetch;

  requestOptions = override_1(
    url.parse(uri),
    inlineRequest || {}
  );

  if (inlineRequest.hostname !== undefined) {
    // overwrite as we always expect a http proxy currently
    requestOptions.protocol = inlineRequest.protocol || HTTP_PROTOCOL;
    requestOptions.path = requestOptions.href;
  }

  fetch = (proxyProtocol && !isHttpsResource_1(proxyProtocol)) || isHttpResource_1(uri) ?
    http.get :
    https.get;

  fetch(requestOptions, function (res) {
    var chunks = [];
    var movedUri;

    if (errorHandled) {
      return;
    }

    if (res.statusCode < 200 || res.statusCode > 399) {
      return callback(res.statusCode, null);
    } else if (res.statusCode > 299) {
      movedUri = url.resolve(uri, res.headers.location);
      return loadRemoteResource(movedUri, inlineRequest, inlineTimeout, callback);
    }

    res.on('data', function (chunk) {
      chunks.push(chunk.toString());
    });
    res.on('end', function () {
      var body = chunks.join('');
      callback(null, body);
    });
  })
  .on('error', function (res) {
    if (errorHandled) {
      return;
    }

    errorHandled = true;
    callback(res.message, null);
  })
  .on('timeout', function () {
    if (errorHandled) {
      return;
    }

    errorHandled = true;
    callback('timeout', null);
  })
  .setTimeout(inlineTimeout);
}

var loadRemoteResource_1 = loadRemoteResource;

function fetchFrom(callback) {
  return callback || loadRemoteResource_1;
}

var fetch = fetchFrom;

function inlineOptionsFrom(rules) {
  if (Array.isArray(rules)) {
    return rules;
  }

  if (rules === false) {
    return ['none'];
  }

  return undefined === rules ?
    ['local'] :
    rules.split(',');
}

var inline = inlineOptionsFrom;

function inlineRequestFrom(option) {
  return override_1(
    /* jshint camelcase: false */
    proxyOptionsFrom(process.env.HTTP_PROXY || process.env.http_proxy),
    option || {}
  );
}

function proxyOptionsFrom(httpProxy) {
  return httpProxy ?
    {
      hostname: url.parse(httpProxy).hostname,
      port: parseInt(url.parse(httpProxy).port)
    } :
    {};
}

var inlineRequest = inlineRequestFrom;

var DEFAULT_TIMEOUT = 5000;

function inlineTimeoutFrom(option) {
  return option || DEFAULT_TIMEOUT;
}

var inlineTimeout = inlineTimeoutFrom;

function rebaseFrom(rebaseOption) {
  return undefined === rebaseOption ? true : !!rebaseOption;
}

var rebase = rebaseFrom;

function rebaseToFrom(option) {
  return option ? path$2.resolve(option) : process.cwd();
}

var rebaseTo = rebaseToFrom;

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */
var encode = function (number) {
  if (0 <= number && number < intToCharMap.length) {
    return intToCharMap[number];
  }
  throw new TypeError("Must be between 0 and 63: " + number);
};

/**
 * Decode a single base 64 character code digit to an integer. Returns -1 on
 * failure.
 */
var decode = function (charCode) {
  var bigA = 65;     // 'A'
  var bigZ = 90;     // 'Z'

  var littleA = 97;  // 'a'
  var littleZ = 122; // 'z'

  var zero = 48;     // '0'
  var nine = 57;     // '9'

  var plus = 43;     // '+'
  var slash = 47;    // '/'

  var littleOffset = 26;
  var numberOffset = 52;

  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
  if (bigA <= charCode && charCode <= bigZ) {
    return (charCode - bigA);
  }

  // 26 - 51: abcdefghijklmnopqrstuvwxyz
  if (littleA <= charCode && charCode <= littleZ) {
    return (charCode - littleA + littleOffset);
  }

  // 52 - 61: 0123456789
  if (zero <= charCode && charCode <= nine) {
    return (charCode - zero + numberOffset);
  }

  // 62: +
  if (charCode == plus) {
    return 62;
  }

  // 63: /
  if (charCode == slash) {
    return 63;
  }

  // Invalid base64 digit.
  return -1;
};

var base64 = {
	encode: encode,
	decode: decode
};

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



// A single base 64 digit can contain 6 bits of data. For the base 64 variable
// length quantities we use in the source map spec, the first bit is the sign,
// the next four bits are the actual value, and the 6th bit is the
// continuation bit. The continuation bit tells us whether there are more
// digits in this value following this digit.
//
//   Continuation
//   |    Sign
//   |    |
//   V    V
//   101011

var VLQ_BASE_SHIFT = 5;

// binary: 100000
var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

// binary: 011111
var VLQ_BASE_MASK = VLQ_BASE - 1;

// binary: 100000
var VLQ_CONTINUATION_BIT = VLQ_BASE;

/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */
function toVLQSigned(aValue) {
  return aValue < 0
    ? ((-aValue) << 1) + 1
    : (aValue << 1) + 0;
}

/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */
function fromVLQSigned(aValue) {
  var isNegative = (aValue & 1) === 1;
  var shifted = aValue >> 1;
  return isNegative
    ? -shifted
    : shifted;
}

/**
 * Returns the base 64 VLQ encoded value.
 */
var encode$1 = function base64VLQ_encode(aValue) {
  var encoded = "";
  var digit;

  var vlq = toVLQSigned(aValue);

  do {
    digit = vlq & VLQ_BASE_MASK;
    vlq >>>= VLQ_BASE_SHIFT;
    if (vlq > 0) {
      // There are still more digits in this value, so we must make sure the
      // continuation bit is marked.
      digit |= VLQ_CONTINUATION_BIT;
    }
    encoded += base64.encode(digit);
  } while (vlq > 0);

  return encoded;
};

/**
 * Decodes the next base 64 VLQ value from the given string and returns the
 * value and the rest of the string via the out parameter.
 */
var decode$1 = function base64VLQ_decode(aStr, aIndex, aOutParam) {
  var strLen = aStr.length;
  var result = 0;
  var shift = 0;
  var continuation, digit;

  do {
    if (aIndex >= strLen) {
      throw new Error("Expected more digits in base 64 VLQ value.");
    }

    digit = base64.decode(aStr.charCodeAt(aIndex++));
    if (digit === -1) {
      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
    }

    continuation = !!(digit & VLQ_CONTINUATION_BIT);
    digit &= VLQ_BASE_MASK;
    result = result + (digit << shift);
    shift += VLQ_BASE_SHIFT;
  } while (continuation);

  aOutParam.value = fromVLQSigned(result);
  aOutParam.rest = aIndex;
};

var base64Vlq = {
	encode: encode$1,
	decode: decode$1
};

var util = createCommonjsModule(function (module, exports) {
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

/**
 * This is a helper function for getting values from parameter/options
 * objects.
 *
 * @param args The object we are extracting values from
 * @param name The name of the property we are getting.
 * @param defaultValue An optional value to return if the property is missing
 * from the object. If this is not specified and the property is missing, an
 * error will be thrown.
 */
function getArg(aArgs, aName, aDefaultValue) {
  if (aName in aArgs) {
    return aArgs[aName];
  } else if (arguments.length === 3) {
    return aDefaultValue;
  } else {
    throw new Error('"' + aName + '" is a required argument.');
  }
}
exports.getArg = getArg;

var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
var dataUrlRegexp = /^data:.+\,.+$/;

function urlParse(aUrl) {
  var match = aUrl.match(urlRegexp);
  if (!match) {
    return null;
  }
  return {
    scheme: match[1],
    auth: match[2],
    host: match[3],
    port: match[4],
    path: match[5]
  };
}
exports.urlParse = urlParse;

function urlGenerate(aParsedUrl) {
  var url = '';
  if (aParsedUrl.scheme) {
    url += aParsedUrl.scheme + ':';
  }
  url += '//';
  if (aParsedUrl.auth) {
    url += aParsedUrl.auth + '@';
  }
  if (aParsedUrl.host) {
    url += aParsedUrl.host;
  }
  if (aParsedUrl.port) {
    url += ":" + aParsedUrl.port;
  }
  if (aParsedUrl.path) {
    url += aParsedUrl.path;
  }
  return url;
}
exports.urlGenerate = urlGenerate;

/**
 * Normalizes a path, or the path portion of a URL:
 *
 * - Replaces consecutive slashes with one slash.
 * - Removes unnecessary '.' parts.
 * - Removes unnecessary '<dir>/..' parts.
 *
 * Based on code in the Node.js 'path' core module.
 *
 * @param aPath The path or url to normalize.
 */
function normalize(aPath) {
  var path = aPath;
  var url = urlParse(aPath);
  if (url) {
    if (!url.path) {
      return aPath;
    }
    path = url.path;
  }
  var isAbsolute = exports.isAbsolute(path);

  var parts = path.split(/\/+/);
  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
    part = parts[i];
    if (part === '.') {
      parts.splice(i, 1);
    } else if (part === '..') {
      up++;
    } else if (up > 0) {
      if (part === '') {
        // The first part is blank if the path is absolute. Trying to go
        // above the root is a no-op. Therefore we can remove all '..' parts
        // directly after the root.
        parts.splice(i + 1, up);
        up = 0;
      } else {
        parts.splice(i, 2);
        up--;
      }
    }
  }
  path = parts.join('/');

  if (path === '') {
    path = isAbsolute ? '/' : '.';
  }

  if (url) {
    url.path = path;
    return urlGenerate(url);
  }
  return path;
}
exports.normalize = normalize;

/**
 * Joins two paths/URLs.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be joined with the root.
 *
 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
 *   first.
 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
 *   is updated with the result and aRoot is returned. Otherwise the result
 *   is returned.
 *   - If aPath is absolute, the result is aPath.
 *   - Otherwise the two paths are joined with a slash.
 * - Joining for example 'http://' and 'www.example.com' is also supported.
 */
function join(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }
  if (aPath === "") {
    aPath = ".";
  }
  var aPathUrl = urlParse(aPath);
  var aRootUrl = urlParse(aRoot);
  if (aRootUrl) {
    aRoot = aRootUrl.path || '/';
  }

  // `join(foo, '//www.example.org')`
  if (aPathUrl && !aPathUrl.scheme) {
    if (aRootUrl) {
      aPathUrl.scheme = aRootUrl.scheme;
    }
    return urlGenerate(aPathUrl);
  }

  if (aPathUrl || aPath.match(dataUrlRegexp)) {
    return aPath;
  }

  // `join('http://', 'www.example.com')`
  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
    aRootUrl.host = aPath;
    return urlGenerate(aRootUrl);
  }

  var joined = aPath.charAt(0) === '/'
    ? aPath
    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

  if (aRootUrl) {
    aRootUrl.path = joined;
    return urlGenerate(aRootUrl);
  }
  return joined;
}
exports.join = join;

exports.isAbsolute = function (aPath) {
  return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
};

/**
 * Make a path relative to a URL or another path.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be made relative to aRoot.
 */
function relative(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }

  aRoot = aRoot.replace(/\/$/, '');

  // It is possible for the path to be above the root. In this case, simply
  // checking whether the root is a prefix of the path won't work. Instead, we
  // need to remove components from the root one by one, until either we find
  // a prefix that fits, or we run out of components to remove.
  var level = 0;
  while (aPath.indexOf(aRoot + '/') !== 0) {
    var index = aRoot.lastIndexOf("/");
    if (index < 0) {
      return aPath;
    }

    // If the only part of the root that is left is the scheme (i.e. http://,
    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
    // have exhausted all components, so the path is not relative to the root.
    aRoot = aRoot.slice(0, index);
    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
      return aPath;
    }

    ++level;
  }

  // Make sure we add a "../" for each component we removed from the root.
  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
}
exports.relative = relative;

var supportsNullProto = (function () {
  var obj = Object.create(null);
  return !('__proto__' in obj);
}());

function identity (s) {
  return s;
}

/**
 * Because behavior goes wacky when you set `__proto__` on objects, we
 * have to prefix all the strings in our set with an arbitrary character.
 *
 * See https://github.com/mozilla/source-map/pull/31 and
 * https://github.com/mozilla/source-map/issues/30
 *
 * @param String aStr
 */
function toSetString(aStr) {
  if (isProtoString(aStr)) {
    return '$' + aStr;
  }

  return aStr;
}
exports.toSetString = supportsNullProto ? identity : toSetString;

function fromSetString(aStr) {
  if (isProtoString(aStr)) {
    return aStr.slice(1);
  }

  return aStr;
}
exports.fromSetString = supportsNullProto ? identity : fromSetString;

function isProtoString(s) {
  if (!s) {
    return false;
  }

  var length = s.length;

  if (length < 9 /* "__proto__".length */) {
    return false;
  }

  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
      s.charCodeAt(length - 9) !== 95  /* '_' */) {
    return false;
  }

  for (var i = length - 10; i >= 0; i--) {
    if (s.charCodeAt(i) !== 36 /* '$' */) {
      return false;
    }
  }

  return true;
}

/**
 * Comparator between two mappings where the original positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same original source/line/column, but different generated
 * line and column the same. Useful when searching for a mapping with a
 * stubbed out mapping.
 */
function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
  var cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0 || onlyCompareOriginal) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByOriginalPositions = compareByOriginalPositions;

/**
 * Comparator between two mappings with deflated source and name indices where
 * the generated positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same generated line and column, but different
 * source/name/original line and column the same. Useful when searching for a
 * mapping with a stubbed out mapping.
 */
function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0 || onlyCompareGenerated) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

function strcmp(aStr1, aStr2) {
  if (aStr1 === aStr2) {
    return 0;
  }

  if (aStr1 === null) {
    return 1; // aStr2 !== null
  }

  if (aStr2 === null) {
    return -1; // aStr1 !== null
  }

  if (aStr1 > aStr2) {
    return 1;
  }

  return -1;
}

/**
 * Comparator between two mappings with inflated source and name strings where
 * the generated positions are compared.
 */
function compareByGeneratedPositionsInflated(mappingA, mappingB) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

/**
 * Strip any JSON XSSI avoidance prefix from the string (as documented
 * in the source maps specification), and then parse the string as
 * JSON.
 */
function parseSourceMapInput(str) {
  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
}
exports.parseSourceMapInput = parseSourceMapInput;

/**
 * Compute the URL of a source given the the source root, the source's
 * URL, and the source map's URL.
 */
function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
  sourceURL = sourceURL || '';

  if (sourceRoot) {
    // This follows what Chrome does.
    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
      sourceRoot += '/';
    }
    // The spec says:
    //   Line 4: An optional source root, useful for relocating source
    //   files on a server or removing repeated values in the
    //   “sources” entry.  This value is prepended to the individual
    //   entries in the “source” field.
    sourceURL = sourceRoot + sourceURL;
  }

  // Historically, SourceMapConsumer did not take the sourceMapURL as
  // a parameter.  This mode is still somewhat supported, which is why
  // this code block is conditional.  However, it's preferable to pass
  // the source map URL to SourceMapConsumer, so that this function
  // can implement the source URL resolution algorithm as outlined in
  // the spec.  This block is basically the equivalent of:
  //    new URL(sourceURL, sourceMapURL).toString()
  // ... except it avoids using URL, which wasn't available in the
  // older releases of node still supported by this library.
  //
  // The spec says:
  //   If the sources are not absolute URLs after prepending of the
  //   “sourceRoot”, the sources are resolved relative to the
  //   SourceMap (like resolving script src in a html document).
  if (sourceMapURL) {
    var parsed = urlParse(sourceMapURL);
    if (!parsed) {
      throw new Error("sourceMapURL could not be parsed");
    }
    if (parsed.path) {
      // Strip the last path component, but keep the "/".
      var index = parsed.path.lastIndexOf('/');
      if (index >= 0) {
        parsed.path = parsed.path.substring(0, index + 1);
      }
    }
    sourceURL = join(urlGenerate(parsed), sourceURL);
  }

  return normalize(sourceURL);
}
exports.computeSourceURL = computeSourceURL;
});

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */


var has = Object.prototype.hasOwnProperty;
var hasNativeMap = typeof Map !== "undefined";

/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */
function ArraySet() {
  this._array = [];
  this._set = hasNativeMap ? new Map() : Object.create(null);
}

/**
 * Static method for creating ArraySet instances from an existing array.
 */
ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
  var set = new ArraySet();
  for (var i = 0, len = aArray.length; i < len; i++) {
    set.add(aArray[i], aAllowDuplicates);
  }
  return set;
};

/**
 * Return how many unique items are in this ArraySet. If duplicates have been
 * added, than those do not count towards the size.
 *
 * @returns Number
 */
ArraySet.prototype.size = function ArraySet_size() {
  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
};

/**
 * Add the given string to this set.
 *
 * @param String aStr
 */
ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
  var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
  var idx = this._array.length;
  if (!isDuplicate || aAllowDuplicates) {
    this._array.push(aStr);
  }
  if (!isDuplicate) {
    if (hasNativeMap) {
      this._set.set(aStr, idx);
    } else {
      this._set[sStr] = idx;
    }
  }
};

/**
 * Is the given string a member of this set?
 *
 * @param String aStr
 */
ArraySet.prototype.has = function ArraySet_has(aStr) {
  if (hasNativeMap) {
    return this._set.has(aStr);
  } else {
    var sStr = util.toSetString(aStr);
    return has.call(this._set, sStr);
  }
};

/**
 * What is the index of the given string in the array?
 *
 * @param String aStr
 */
ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
  if (hasNativeMap) {
    var idx = this._set.get(aStr);
    if (idx >= 0) {
        return idx;
    }
  } else {
    var sStr = util.toSetString(aStr);
    if (has.call(this._set, sStr)) {
      return this._set[sStr];
    }
  }

  throw new Error('"' + aStr + '" is not in the set.');
};

/**
 * What is the element at the given index?
 *
 * @param Number aIdx
 */
ArraySet.prototype.at = function ArraySet_at(aIdx) {
  if (aIdx >= 0 && aIdx < this._array.length) {
    return this._array[aIdx];
  }
  throw new Error('No element indexed by ' + aIdx);
};

/**
 * Returns the array representation of this set (which has the proper indices
 * indicated by indexOf). Note that this is a copy of the internal array used
 * for storing the members so that no one can mess with internal state.
 */
ArraySet.prototype.toArray = function ArraySet_toArray() {
  return this._array.slice();
};

var ArraySet_1 = ArraySet;

var arraySet = {
	ArraySet: ArraySet_1
};

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2014 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */



/**
 * Determine whether mappingB is after mappingA with respect to generated
 * position.
 */
function generatedPositionAfter(mappingA, mappingB) {
  // Optimized for most common case
  var lineA = mappingA.generatedLine;
  var lineB = mappingB.generatedLine;
  var columnA = mappingA.generatedColumn;
  var columnB = mappingB.generatedColumn;
  return lineB > lineA || lineB == lineA && columnB >= columnA ||
         util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
}

/**
 * A data structure to provide a sorted view of accumulated mappings in a
 * performance conscious manner. It trades a neglibable overhead in general
 * case for a large speedup in case of mappings being added in order.
 */
function MappingList() {
  this._array = [];
  this._sorted = true;
  // Serves as infimum
  this._last = {generatedLine: -1, generatedColumn: 0};
}

/**
 * Iterate through internal items. This method takes the same arguments that
 * `Array.prototype.forEach` takes.
 *
 * NOTE: The order of the mappings is NOT guaranteed.
 */
MappingList.prototype.unsortedForEach =
  function MappingList_forEach(aCallback, aThisArg) {
    this._array.forEach(aCallback, aThisArg);
  };

/**
 * Add the given source mapping.
 *
 * @param Object aMapping
 */
MappingList.prototype.add = function MappingList_add(aMapping) {
  if (generatedPositionAfter(this._last, aMapping)) {
    this._last = aMapping;
    this._array.push(aMapping);
  } else {
    this._sorted = false;
    this._array.push(aMapping);
  }
};

/**
 * Returns the flat, sorted array of mappings. The mappings are sorted by
 * generated position.
 *
 * WARNING: This method returns internal data without copying, for
 * performance. The return value must NOT be mutated, and should be treated as
 * an immutable borrow. If you want to take ownership, you must make your own
 * copy.
 */
MappingList.prototype.toArray = function MappingList_toArray() {
  if (!this._sorted) {
    this._array.sort(util.compareByGeneratedPositionsInflated);
    this._sorted = true;
  }
  return this._array;
};

var MappingList_1 = MappingList;

var mappingList = {
	MappingList: MappingList_1
};

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */



var ArraySet$1 = arraySet.ArraySet;
var MappingList$1 = mappingList.MappingList;

/**
 * An instance of the SourceMapGenerator represents a source map which is
 * being built incrementally. You may pass an object with the following
 * properties:
 *
 *   - file: The filename of the generated source.
 *   - sourceRoot: A root for all relative URLs in this source map.
 */
function SourceMapGenerator(aArgs) {
  if (!aArgs) {
    aArgs = {};
  }
  this._file = util.getArg(aArgs, 'file', null);
  this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
  this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
  this._sources = new ArraySet$1();
  this._names = new ArraySet$1();
  this._mappings = new MappingList$1();
  this._sourcesContents = null;
}

SourceMapGenerator.prototype._version = 3;

/**
 * Creates a new SourceMapGenerator based on a SourceMapConsumer
 *
 * @param aSourceMapConsumer The SourceMap.
 */
SourceMapGenerator.fromSourceMap =
  function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
    var sourceRoot = aSourceMapConsumer.sourceRoot;
    var generator = new SourceMapGenerator({
      file: aSourceMapConsumer.file,
      sourceRoot: sourceRoot
    });
    aSourceMapConsumer.eachMapping(function (mapping) {
      var newMapping = {
        generated: {
          line: mapping.generatedLine,
          column: mapping.generatedColumn
        }
      };

      if (mapping.source != null) {
        newMapping.source = mapping.source;
        if (sourceRoot != null) {
          newMapping.source = util.relative(sourceRoot, newMapping.source);
        }

        newMapping.original = {
          line: mapping.originalLine,
          column: mapping.originalColumn
        };

        if (mapping.name != null) {
          newMapping.name = mapping.name;
        }
      }

      generator.addMapping(newMapping);
    });
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var sourceRelative = sourceFile;
      if (sourceRoot !== null) {
        sourceRelative = util.relative(sourceRoot, sourceFile);
      }

      if (!generator._sources.has(sourceRelative)) {
        generator._sources.add(sourceRelative);
      }

      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        generator.setSourceContent(sourceFile, content);
      }
    });
    return generator;
  };

/**
 * Add a single mapping from original source line and column to the generated
 * source's line and column for this source map being created. The mapping
 * object should have the following properties:
 *
 *   - generated: An object with the generated line and column positions.
 *   - original: An object with the original line and column positions.
 *   - source: The original source file (relative to the sourceRoot).
 *   - name: An optional original token name for this mapping.
 */
SourceMapGenerator.prototype.addMapping =
  function SourceMapGenerator_addMapping(aArgs) {
    var generated = util.getArg(aArgs, 'generated');
    var original = util.getArg(aArgs, 'original', null);
    var source = util.getArg(aArgs, 'source', null);
    var name = util.getArg(aArgs, 'name', null);

    if (!this._skipValidation) {
      this._validateMapping(generated, original, source, name);
    }

    if (source != null) {
      source = String(source);
      if (!this._sources.has(source)) {
        this._sources.add(source);
      }
    }

    if (name != null) {
      name = String(name);
      if (!this._names.has(name)) {
        this._names.add(name);
      }
    }

    this._mappings.add({
      generatedLine: generated.line,
      generatedColumn: generated.column,
      originalLine: original != null && original.line,
      originalColumn: original != null && original.column,
      source: source,
      name: name
    });
  };

/**
 * Set the source content for a source file.
 */
SourceMapGenerator.prototype.setSourceContent =
  function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
    var source = aSourceFile;
    if (this._sourceRoot != null) {
      source = util.relative(this._sourceRoot, source);
    }

    if (aSourceContent != null) {
      // Add the source content to the _sourcesContents map.
      // Create a new _sourcesContents map if the property is null.
      if (!this._sourcesContents) {
        this._sourcesContents = Object.create(null);
      }
      this._sourcesContents[util.toSetString(source)] = aSourceContent;
    } else if (this._sourcesContents) {
      // Remove the source file from the _sourcesContents map.
      // If the _sourcesContents map is empty, set the property to null.
      delete this._sourcesContents[util.toSetString(source)];
      if (Object.keys(this._sourcesContents).length === 0) {
        this._sourcesContents = null;
      }
    }
  };

/**
 * Applies the mappings of a sub-source-map for a specific source file to the
 * source map being generated. Each mapping to the supplied source file is
 * rewritten using the supplied source map. Note: The resolution for the
 * resulting mappings is the minimium of this map and the supplied map.
 *
 * @param aSourceMapConsumer The source map to be applied.
 * @param aSourceFile Optional. The filename of the source file.
 *        If omitted, SourceMapConsumer's file property will be used.
 * @param aSourceMapPath Optional. The dirname of the path to the source map
 *        to be applied. If relative, it is relative to the SourceMapConsumer.
 *        This parameter is needed when the two source maps aren't in the same
 *        directory, and the source map to be applied contains relative source
 *        paths. If so, those relative source paths need to be rewritten
 *        relative to the SourceMapGenerator.
 */
SourceMapGenerator.prototype.applySourceMap =
  function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
    var sourceFile = aSourceFile;
    // If aSourceFile is omitted, we will use the file property of the SourceMap
    if (aSourceFile == null) {
      if (aSourceMapConsumer.file == null) {
        throw new Error(
          'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
          'or the source map\'s "file" property. Both were omitted.'
        );
      }
      sourceFile = aSourceMapConsumer.file;
    }
    var sourceRoot = this._sourceRoot;
    // Make "sourceFile" relative if an absolute Url is passed.
    if (sourceRoot != null) {
      sourceFile = util.relative(sourceRoot, sourceFile);
    }
    // Applying the SourceMap can add and remove items from the sources and
    // the names array.
    var newSources = new ArraySet$1();
    var newNames = new ArraySet$1();

    // Find mappings for the "sourceFile"
    this._mappings.unsortedForEach(function (mapping) {
      if (mapping.source === sourceFile && mapping.originalLine != null) {
        // Check if it can be mapped by the source map, then update the mapping.
        var original = aSourceMapConsumer.originalPositionFor({
          line: mapping.originalLine,
          column: mapping.originalColumn
        });
        if (original.source != null) {
          // Copy mapping
          mapping.source = original.source;
          if (aSourceMapPath != null) {
            mapping.source = util.join(aSourceMapPath, mapping.source);
          }
          if (sourceRoot != null) {
            mapping.source = util.relative(sourceRoot, mapping.source);
          }
          mapping.originalLine = original.line;
          mapping.originalColumn = original.column;
          if (original.name != null) {
            mapping.name = original.name;
          }
        }
      }

      var source = mapping.source;
      if (source != null && !newSources.has(source)) {
        newSources.add(source);
      }

      var name = mapping.name;
      if (name != null && !newNames.has(name)) {
        newNames.add(name);
      }

    }, this);
    this._sources = newSources;
    this._names = newNames;

    // Copy sourcesContents of applied map.
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aSourceMapPath != null) {
          sourceFile = util.join(aSourceMapPath, sourceFile);
        }
        if (sourceRoot != null) {
          sourceFile = util.relative(sourceRoot, sourceFile);
        }
        this.setSourceContent(sourceFile, content);
      }
    }, this);
  };

/**
 * A mapping can have one of the three levels of data:
 *
 *   1. Just the generated position.
 *   2. The Generated position, original position, and original source.
 *   3. Generated and original position, original source, as well as a name
 *      token.
 *
 * To maintain consistency, we validate that any new mapping being added falls
 * in to one of these categories.
 */
SourceMapGenerator.prototype._validateMapping =
  function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
                                              aName) {
    // When aOriginal is truthy but has empty values for .line and .column,
    // it is most likely a programmer error. In this case we throw a very
    // specific error message to try to guide them the right way.
    // For example: https://github.com/Polymer/polymer-bundler/pull/519
    if (aOriginal && typeof aOriginal.line !== 'number' && typeof aOriginal.column !== 'number') {
        throw new Error(
            'original.line and original.column are not numbers -- you probably meant to omit ' +
            'the original mapping entirely and only map the generated position. If so, pass ' +
            'null for the original mapping instead of an object with empty or null values.'
        );
    }

    if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
        && aGenerated.line > 0 && aGenerated.column >= 0
        && !aOriginal && !aSource && !aName) {
      // Case 1.
      return;
    }
    else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
             && aOriginal && 'line' in aOriginal && 'column' in aOriginal
             && aGenerated.line > 0 && aGenerated.column >= 0
             && aOriginal.line > 0 && aOriginal.column >= 0
             && aSource) {
      // Cases 2 and 3.
      return;
    }
    else {
      throw new Error('Invalid mapping: ' + JSON.stringify({
        generated: aGenerated,
        source: aSource,
        original: aOriginal,
        name: aName
      }));
    }
  };

/**
 * Serialize the accumulated mappings in to the stream of base 64 VLQs
 * specified by the source map format.
 */
SourceMapGenerator.prototype._serializeMappings =
  function SourceMapGenerator_serializeMappings() {
    var previousGeneratedColumn = 0;
    var previousGeneratedLine = 1;
    var previousOriginalColumn = 0;
    var previousOriginalLine = 0;
    var previousName = 0;
    var previousSource = 0;
    var result = '';
    var next;
    var mapping;
    var nameIdx;
    var sourceIdx;

    var mappings = this._mappings.toArray();
    for (var i = 0, len = mappings.length; i < len; i++) {
      mapping = mappings[i];
      next = '';

      if (mapping.generatedLine !== previousGeneratedLine) {
        previousGeneratedColumn = 0;
        while (mapping.generatedLine !== previousGeneratedLine) {
          next += ';';
          previousGeneratedLine++;
        }
      }
      else {
        if (i > 0) {
          if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
            continue;
          }
          next += ',';
        }
      }

      next += base64Vlq.encode(mapping.generatedColumn
                                 - previousGeneratedColumn);
      previousGeneratedColumn = mapping.generatedColumn;

      if (mapping.source != null) {
        sourceIdx = this._sources.indexOf(mapping.source);
        next += base64Vlq.encode(sourceIdx - previousSource);
        previousSource = sourceIdx;

        // lines are stored 0-based in SourceMap spec version 3
        next += base64Vlq.encode(mapping.originalLine - 1
                                   - previousOriginalLine);
        previousOriginalLine = mapping.originalLine - 1;

        next += base64Vlq.encode(mapping.originalColumn
                                   - previousOriginalColumn);
        previousOriginalColumn = mapping.originalColumn;

        if (mapping.name != null) {
          nameIdx = this._names.indexOf(mapping.name);
          next += base64Vlq.encode(nameIdx - previousName);
          previousName = nameIdx;
        }
      }

      result += next;
    }

    return result;
  };

SourceMapGenerator.prototype._generateSourcesContent =
  function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
    return aSources.map(function (source) {
      if (!this._sourcesContents) {
        return null;
      }
      if (aSourceRoot != null) {
        source = util.relative(aSourceRoot, source);
      }
      var key = util.toSetString(source);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
        ? this._sourcesContents[key]
        : null;
    }, this);
  };

/**
 * Externalize the source map.
 */
SourceMapGenerator.prototype.toJSON =
  function SourceMapGenerator_toJSON() {
    var map = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    if (this._file != null) {
      map.file = this._file;
    }
    if (this._sourceRoot != null) {
      map.sourceRoot = this._sourceRoot;
    }
    if (this._sourcesContents) {
      map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
    }

    return map;
  };

/**
 * Render the source map being generated to a string.
 */
SourceMapGenerator.prototype.toString =
  function SourceMapGenerator_toString() {
    return JSON.stringify(this.toJSON());
  };

var SourceMapGenerator_1 = SourceMapGenerator;

var sourceMapGenerator = {
	SourceMapGenerator: SourceMapGenerator_1
};

var binarySearch = createCommonjsModule(function (module, exports) {
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

exports.GREATEST_LOWER_BOUND = 1;
exports.LEAST_UPPER_BOUND = 2;

/**
 * Recursive implementation of binary search.
 *
 * @param aLow Indices here and lower do not contain the needle.
 * @param aHigh Indices here and higher do not contain the needle.
 * @param aNeedle The element being searched for.
 * @param aHaystack The non-empty array being searched.
 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 */
function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
  // This function terminates when one of the following is true:
  //
  //   1. We find the exact element we are looking for.
  //
  //   2. We did not find the exact element, but we can return the index of
  //      the next-closest element.
  //
  //   3. We did not find the exact element, and there is no next-closest
  //      element than the one we are searching for, so we return -1.
  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
  var cmp = aCompare(aNeedle, aHaystack[mid], true);
  if (cmp === 0) {
    // Found the element we are looking for.
    return mid;
  }
  else if (cmp > 0) {
    // Our needle is greater than aHaystack[mid].
    if (aHigh - mid > 1) {
      // The element is in the upper half.
      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
    }

    // The exact needle element was not found in this haystack. Determine if
    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return aHigh < aHaystack.length ? aHigh : -1;
    } else {
      return mid;
    }
  }
  else {
    // Our needle is less than aHaystack[mid].
    if (mid - aLow > 1) {
      // The element is in the lower half.
      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
    }

    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return mid;
    } else {
      return aLow < 0 ? -1 : aLow;
    }
  }
}

/**
 * This is an implementation of binary search which will always try and return
 * the index of the closest element if there is no exact hit. This is because
 * mappings between original and generated line/col pairs are single points,
 * and there is an implicit region between each of them, so a miss just means
 * that you aren't on the very start of a region.
 *
 * @param aNeedle The element you are looking for.
 * @param aHaystack The array that is being searched.
 * @param aCompare A function which takes the needle and an element in the
 *     array and returns -1, 0, or 1 depending on whether the needle is less
 *     than, equal to, or greater than the element, respectively.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
 */
exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
  if (aHaystack.length === 0) {
    return -1;
  }

  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
                              aCompare, aBias || exports.GREATEST_LOWER_BOUND);
  if (index < 0) {
    return -1;
  }

  // We have found either the exact element, or the next-closest element than
  // the one we are searching for. However, there may be more than one such
  // element. Make sure we always return the smallest of these.
  while (index - 1 >= 0) {
    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
      break;
    }
    --index;
  }

  return index;
};
});

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

// It turns out that some (most?) JavaScript engines don't self-host
// `Array.prototype.sort`. This makes sense because C++ will likely remain
// faster than JS when doing raw CPU-intensive sorting. However, when using a
// custom comparator function, calling back and forth between the VM's C++ and
// JIT'd JS is rather slow *and* loses JIT type information, resulting in
// worse generated code for the comparator function than would be optimal. In
// fact, when sorting with a comparator, these costs outweigh the benefits of
// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
// a ~3500ms mean speed-up in `bench/bench.html`.

/**
 * Swap the elements indexed by `x` and `y` in the array `ary`.
 *
 * @param {Array} ary
 *        The array.
 * @param {Number} x
 *        The index of the first item.
 * @param {Number} y
 *        The index of the second item.
 */
function swap(ary, x, y) {
  var temp = ary[x];
  ary[x] = ary[y];
  ary[y] = temp;
}

/**
 * Returns a random integer within the range `low .. high` inclusive.
 *
 * @param {Number} low
 *        The lower bound on the range.
 * @param {Number} high
 *        The upper bound on the range.
 */
function randomIntInRange(low, high) {
  return Math.round(low + (Math.random() * (high - low)));
}

/**
 * The Quick Sort algorithm.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 * @param {Number} p
 *        Start index of the array
 * @param {Number} r
 *        End index of the array
 */
function doQuickSort(ary, comparator, p, r) {
  // If our lower bound is less than our upper bound, we (1) partition the
  // array into two pieces and (2) recurse on each half. If it is not, this is
  // the empty array and our base case.

  if (p < r) {
    // (1) Partitioning.
    //
    // The partitioning chooses a pivot between `p` and `r` and moves all
    // elements that are less than or equal to the pivot to the before it, and
    // all the elements that are greater than it after it. The effect is that
    // once partition is done, the pivot is in the exact place it will be when
    // the array is put in sorted order, and it will not need to be moved
    // again. This runs in O(n) time.

    // Always choose a random pivot so that an input array which is reverse
    // sorted does not cause O(n^2) running time.
    var pivotIndex = randomIntInRange(p, r);
    var i = p - 1;

    swap(ary, pivotIndex, r);
    var pivot = ary[r];

    // Immediately after `j` is incremented in this loop, the following hold
    // true:
    //
    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
    //
    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
    for (var j = p; j < r; j++) {
      if (comparator(ary[j], pivot) <= 0) {
        i += 1;
        swap(ary, i, j);
      }
    }

    swap(ary, i + 1, j);
    var q = i + 1;

    // (2) Recurse on each half.

    doQuickSort(ary, comparator, p, q - 1);
    doQuickSort(ary, comparator, q + 1, r);
  }
}

/**
 * Sort the given array in-place with the given comparator function.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 */
var quickSort_1 = function (ary, comparator) {
  doQuickSort(ary, comparator, 0, ary.length - 1);
};

var quickSort = {
	quickSort: quickSort_1
};

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */



var ArraySet$2 = arraySet.ArraySet;

var quickSort$1 = quickSort.quickSort;

function SourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  return sourceMap.sections != null
    ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
    : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
}

SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
  return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
};

/**
 * The version of the source mapping spec that we are consuming.
 */
SourceMapConsumer.prototype._version = 3;

// `__generatedMappings` and `__originalMappings` are arrays that hold the
// parsed mapping coordinates from the source map's "mappings" attribute. They
// are lazily instantiated, accessed via the `_generatedMappings` and
// `_originalMappings` getters respectively, and we only parse the mappings
// and create these arrays once queried for a source location. We jump through
// these hoops because there can be many thousands of mappings, and parsing
// them is expensive, so we only want to do it if we must.
//
// Each object in the arrays is of the form:
//
//     {
//       generatedLine: The line number in the generated code,
//       generatedColumn: The column number in the generated code,
//       source: The path to the original source file that generated this
//               chunk of code,
//       originalLine: The line number in the original source that
//                     corresponds to this chunk of generated code,
//       originalColumn: The column number in the original source that
//                       corresponds to this chunk of generated code,
//       name: The name of the original symbol which generated this chunk of
//             code.
//     }
//
// All properties except for `generatedLine` and `generatedColumn` can be
// `null`.
//
// `_generatedMappings` is ordered by the generated positions.
//
// `_originalMappings` is ordered by the original positions.

SourceMapConsumer.prototype.__generatedMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__generatedMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__generatedMappings;
  }
});

SourceMapConsumer.prototype.__originalMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__originalMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__originalMappings;
  }
});

SourceMapConsumer.prototype._charIsMappingSeparator =
  function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
    var c = aStr.charAt(index);
    return c === ";" || c === ",";
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
SourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    throw new Error("Subclasses must implement _parseMappings");
  };

SourceMapConsumer.GENERATED_ORDER = 1;
SourceMapConsumer.ORIGINAL_ORDER = 2;

SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
SourceMapConsumer.LEAST_UPPER_BOUND = 2;

/**
 * Iterate over each mapping between an original source/line/column and a
 * generated line/column in this source map.
 *
 * @param Function aCallback
 *        The function that is called with each mapping.
 * @param Object aContext
 *        Optional. If specified, this object will be the value of `this` every
 *        time that `aCallback` is called.
 * @param aOrder
 *        Either `SourceMapConsumer.GENERATED_ORDER` or
 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
 *        iterate over the mappings sorted by the generated file's line/column
 *        order or the original's source/line/column order, respectively. Defaults to
 *        `SourceMapConsumer.GENERATED_ORDER`.
 */
SourceMapConsumer.prototype.eachMapping =
  function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
    var context = aContext || null;
    var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

    var mappings;
    switch (order) {
    case SourceMapConsumer.GENERATED_ORDER:
      mappings = this._generatedMappings;
      break;
    case SourceMapConsumer.ORIGINAL_ORDER:
      mappings = this._originalMappings;
      break;
    default:
      throw new Error("Unknown order of iteration.");
    }

    var sourceRoot = this.sourceRoot;
    mappings.map(function (mapping) {
      var source = mapping.source === null ? null : this._sources.at(mapping.source);
      source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
      return {
        source: source,
        generatedLine: mapping.generatedLine,
        generatedColumn: mapping.generatedColumn,
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: mapping.name === null ? null : this._names.at(mapping.name)
      };
    }, this).forEach(aCallback, context);
  };

/**
 * Returns all generated line and column information for the original source,
 * line, and column provided. If no column is provided, returns all mappings
 * corresponding to a either the line we are searching for or the next
 * closest line that has any mappings. Otherwise, returns all mappings
 * corresponding to the given line and either the column we are searching for
 * or the next closest column that has any offsets.
 *
 * The only argument is an object with the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number is 1-based.
 *   - column: Optional. the column number in the original source.
 *    The column number is 0-based.
 *
 * and an array of objects is returned, each with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *    line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *    The column number is 0-based.
 */
SourceMapConsumer.prototype.allGeneratedPositionsFor =
  function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
    var line = util.getArg(aArgs, 'line');

    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
    // returns the index of the closest mapping less than the needle. By
    // setting needle.originalColumn to 0, we thus find the last mapping for
    // the given line, provided such a mapping exists.
    var needle = {
      source: util.getArg(aArgs, 'source'),
      originalLine: line,
      originalColumn: util.getArg(aArgs, 'column', 0)
    };

    needle.source = this._findSourceIndex(needle.source);
    if (needle.source < 0) {
      return [];
    }

    var mappings = [];

    var index = this._findMapping(needle,
                                  this._originalMappings,
                                  "originalLine",
                                  "originalColumn",
                                  util.compareByOriginalPositions,
                                  binarySearch.LEAST_UPPER_BOUND);
    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (aArgs.column === undefined) {
        var originalLine = mapping.originalLine;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we found. Since
        // mappings are sorted, this is guaranteed to find all mappings for
        // the line we found.
        while (mapping && mapping.originalLine === originalLine) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      } else {
        var originalColumn = mapping.originalColumn;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we were searching for.
        // Since mappings are sorted, this is guaranteed to find all mappings for
        // the line we are searching for.
        while (mapping &&
               mapping.originalLine === line &&
               mapping.originalColumn == originalColumn) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      }
    }

    return mappings;
  };

var SourceMapConsumer_1 = SourceMapConsumer;

/**
 * A BasicSourceMapConsumer instance represents a parsed source map which we can
 * query for information about the original file positions by giving it a file
 * position in the generated source.
 *
 * The first parameter is the raw source map (either as a JSON string, or
 * already parsed to an object). According to the spec, source maps have the
 * following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - sources: An array of URLs to the original source files.
 *   - names: An array of identifiers which can be referrenced by individual mappings.
 *   - sourceRoot: Optional. The URL root from which all sources are relative.
 *   - sourcesContent: Optional. An array of contents of the original source files.
 *   - mappings: A string of base64 VLQs which contain the actual mappings.
 *   - file: Optional. The generated file this source map is associated with.
 *
 * Here is an example source map, taken from the source map spec[0]:
 *
 *     {
 *       version : 3,
 *       file: "out.js",
 *       sourceRoot : "",
 *       sources: ["foo.js", "bar.js"],
 *       names: ["src", "maps", "are", "fun"],
 *       mappings: "AA,AB;;ABCDE;"
 *     }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
 */
function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  var version = util.getArg(sourceMap, 'version');
  var sources = util.getArg(sourceMap, 'sources');
  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
  // requires the array) to play nice here.
  var names = util.getArg(sourceMap, 'names', []);
  var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
  var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
  var mappings = util.getArg(sourceMap, 'mappings');
  var file = util.getArg(sourceMap, 'file', null);

  // Once again, Sass deviates from the spec and supplies the version as a
  // string rather than a number, so we use loose equality checking here.
  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  if (sourceRoot) {
    sourceRoot = util.normalize(sourceRoot);
  }

  sources = sources
    .map(String)
    // Some source maps produce relative source paths like "./foo.js" instead of
    // "foo.js".  Normalize these first so that future comparisons will succeed.
    // See bugzil.la/1090768.
    .map(util.normalize)
    // Always ensure that absolute sources are internally stored relative to
    // the source root, if the source root is absolute. Not doing this would
    // be particularly problematic when the source root is a prefix of the
    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
    .map(function (source) {
      return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
        ? util.relative(sourceRoot, source)
        : source;
    });

  // Pass `true` below to allow duplicate names and sources. While source maps
  // are intended to be compressed and deduplicated, the TypeScript compiler
  // sometimes generates source maps with duplicates in them. See Github issue
  // #72 and bugzil.la/889492.
  this._names = ArraySet$2.fromArray(names.map(String), true);
  this._sources = ArraySet$2.fromArray(sources, true);

  this._absoluteSources = this._sources.toArray().map(function (s) {
    return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
  });

  this.sourceRoot = sourceRoot;
  this.sourcesContent = sourcesContent;
  this._mappings = mappings;
  this._sourceMapURL = aSourceMapURL;
  this.file = file;
}

BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

/**
 * Utility function to find the index of a source.  Returns -1 if not
 * found.
 */
BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
  var relativeSource = aSource;
  if (this.sourceRoot != null) {
    relativeSource = util.relative(this.sourceRoot, relativeSource);
  }

  if (this._sources.has(relativeSource)) {
    return this._sources.indexOf(relativeSource);
  }

  // Maybe aSource is an absolute URL as returned by |sources|.  In
  // this case we can't simply undo the transform.
  var i;
  for (i = 0; i < this._absoluteSources.length; ++i) {
    if (this._absoluteSources[i] == aSource) {
      return i;
    }
  }

  return -1;
};

/**
 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
 *
 * @param SourceMapGenerator aSourceMap
 *        The source map that will be consumed.
 * @param String aSourceMapURL
 *        The URL at which the source map can be found (optional)
 * @returns BasicSourceMapConsumer
 */
BasicSourceMapConsumer.fromSourceMap =
  function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
    var smc = Object.create(BasicSourceMapConsumer.prototype);

    var names = smc._names = ArraySet$2.fromArray(aSourceMap._names.toArray(), true);
    var sources = smc._sources = ArraySet$2.fromArray(aSourceMap._sources.toArray(), true);
    smc.sourceRoot = aSourceMap._sourceRoot;
    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                            smc.sourceRoot);
    smc.file = aSourceMap._file;
    smc._sourceMapURL = aSourceMapURL;
    smc._absoluteSources = smc._sources.toArray().map(function (s) {
      return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
    });

    // Because we are modifying the entries (by converting string sources and
    // names to indices into the sources and names ArraySets), we have to make
    // a copy of the entry or else bad things happen. Shared mutable state
    // strikes again! See github issue #191.

    var generatedMappings = aSourceMap._mappings.toArray().slice();
    var destGeneratedMappings = smc.__generatedMappings = [];
    var destOriginalMappings = smc.__originalMappings = [];

    for (var i = 0, length = generatedMappings.length; i < length; i++) {
      var srcMapping = generatedMappings[i];
      var destMapping = new Mapping;
      destMapping.generatedLine = srcMapping.generatedLine;
      destMapping.generatedColumn = srcMapping.generatedColumn;

      if (srcMapping.source) {
        destMapping.source = sources.indexOf(srcMapping.source);
        destMapping.originalLine = srcMapping.originalLine;
        destMapping.originalColumn = srcMapping.originalColumn;

        if (srcMapping.name) {
          destMapping.name = names.indexOf(srcMapping.name);
        }

        destOriginalMappings.push(destMapping);
      }

      destGeneratedMappings.push(destMapping);
    }

    quickSort$1(smc.__originalMappings, util.compareByOriginalPositions);

    return smc;
  };

/**
 * The version of the source mapping spec that we are consuming.
 */
BasicSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
  get: function () {
    return this._absoluteSources.slice();
  }
});

/**
 * Provide the JIT with a nice shape / hidden class.
 */
function Mapping() {
  this.generatedLine = 0;
  this.generatedColumn = 0;
  this.source = null;
  this.originalLine = null;
  this.originalColumn = null;
  this.name = null;
}

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
BasicSourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    var generatedLine = 1;
    var previousGeneratedColumn = 0;
    var previousOriginalLine = 0;
    var previousOriginalColumn = 0;
    var previousSource = 0;
    var previousName = 0;
    var length = aStr.length;
    var index = 0;
    var cachedSegments = {};
    var temp = {};
    var originalMappings = [];
    var generatedMappings = [];
    var mapping, str, segment, end, value;

    while (index < length) {
      if (aStr.charAt(index) === ';') {
        generatedLine++;
        index++;
        previousGeneratedColumn = 0;
      }
      else if (aStr.charAt(index) === ',') {
        index++;
      }
      else {
        mapping = new Mapping();
        mapping.generatedLine = generatedLine;

        // Because each offset is encoded relative to the previous one,
        // many segments often have the same encoding. We can exploit this
        // fact by caching the parsed variable length fields of each segment,
        // allowing us to avoid a second parse if we encounter the same
        // segment again.
        for (end = index; end < length; end++) {
          if (this._charIsMappingSeparator(aStr, end)) {
            break;
          }
        }
        str = aStr.slice(index, end);

        segment = cachedSegments[str];
        if (segment) {
          index += str.length;
        } else {
          segment = [];
          while (index < end) {
            base64Vlq.decode(aStr, index, temp);
            value = temp.value;
            index = temp.rest;
            segment.push(value);
          }

          if (segment.length === 2) {
            throw new Error('Found a source, but no line and column');
          }

          if (segment.length === 3) {
            throw new Error('Found a source and line, but no column');
          }

          cachedSegments[str] = segment;
        }

        // Generated column.
        mapping.generatedColumn = previousGeneratedColumn + segment[0];
        previousGeneratedColumn = mapping.generatedColumn;

        if (segment.length > 1) {
          // Original source.
          mapping.source = previousSource + segment[1];
          previousSource += segment[1];

          // Original line.
          mapping.originalLine = previousOriginalLine + segment[2];
          previousOriginalLine = mapping.originalLine;
          // Lines are stored 0-based
          mapping.originalLine += 1;

          // Original column.
          mapping.originalColumn = previousOriginalColumn + segment[3];
          previousOriginalColumn = mapping.originalColumn;

          if (segment.length > 4) {
            // Original name.
            mapping.name = previousName + segment[4];
            previousName += segment[4];
          }
        }

        generatedMappings.push(mapping);
        if (typeof mapping.originalLine === 'number') {
          originalMappings.push(mapping);
        }
      }
    }

    quickSort$1(generatedMappings, util.compareByGeneratedPositionsDeflated);
    this.__generatedMappings = generatedMappings;

    quickSort$1(originalMappings, util.compareByOriginalPositions);
    this.__originalMappings = originalMappings;
  };

/**
 * Find the mapping that best matches the hypothetical "needle" mapping that
 * we are searching for in the given "haystack" of mappings.
 */
BasicSourceMapConsumer.prototype._findMapping =
  function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                         aColumnName, aComparator, aBias) {
    // To return the position we are searching for, we must first find the
    // mapping for the given position and then return the opposite position it
    // points to. Because the mappings are sorted, we can use binary search to
    // find the best mapping.

    if (aNeedle[aLineName] <= 0) {
      throw new TypeError('Line must be greater than or equal to 1, got '
                          + aNeedle[aLineName]);
    }
    if (aNeedle[aColumnName] < 0) {
      throw new TypeError('Column must be greater than or equal to 0, got '
                          + aNeedle[aColumnName]);
    }

    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
  };

/**
 * Compute the last column for each generated mapping. The last column is
 * inclusive.
 */
BasicSourceMapConsumer.prototype.computeColumnSpans =
  function SourceMapConsumer_computeColumnSpans() {
    for (var index = 0; index < this._generatedMappings.length; ++index) {
      var mapping = this._generatedMappings[index];

      // Mappings do not contain a field for the last generated columnt. We
      // can come up with an optimistic estimate, however, by assuming that
      // mappings are contiguous (i.e. given two consecutive mappings, the
      // first mapping ends where the second one starts).
      if (index + 1 < this._generatedMappings.length) {
        var nextMapping = this._generatedMappings[index + 1];

        if (mapping.generatedLine === nextMapping.generatedLine) {
          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
          continue;
        }
      }

      // The last mapping for each line spans the entire line.
      mapping.lastGeneratedColumn = Infinity;
    }
  };

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
BasicSourceMapConsumer.prototype.originalPositionFor =
  function SourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._generatedMappings,
      "generatedLine",
      "generatedColumn",
      util.compareByGeneratedPositionsDeflated,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._generatedMappings[index];

      if (mapping.generatedLine === needle.generatedLine) {
        var source = util.getArg(mapping, 'source', null);
        if (source !== null) {
          source = this._sources.at(source);
          source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
        }
        var name = util.getArg(mapping, 'name', null);
        if (name !== null) {
          name = this._names.at(name);
        }
        return {
          source: source,
          line: util.getArg(mapping, 'originalLine', null),
          column: util.getArg(mapping, 'originalColumn', null),
          name: name
        };
      }
    }

    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
  function BasicSourceMapConsumer_hasContentsOfAllSources() {
    if (!this.sourcesContent) {
      return false;
    }
    return this.sourcesContent.length >= this._sources.size() &&
      !this.sourcesContent.some(function (sc) { return sc == null; });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
BasicSourceMapConsumer.prototype.sourceContentFor =
  function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    if (!this.sourcesContent) {
      return null;
    }

    var index = this._findSourceIndex(aSource);
    if (index >= 0) {
      return this.sourcesContent[index];
    }

    var relativeSource = aSource;
    if (this.sourceRoot != null) {
      relativeSource = util.relative(this.sourceRoot, relativeSource);
    }

    var url;
    if (this.sourceRoot != null
        && (url = util.urlParse(this.sourceRoot))) {
      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
      // many users. We can help them out when they expect file:// URIs to
      // behave like it would if they were running a local HTTP server. See
      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
      var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
      if (url.scheme == "file"
          && this._sources.has(fileUriAbsPath)) {
        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
      }

      if ((!url.path || url.path == "/")
          && this._sources.has("/" + relativeSource)) {
        return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
      }
    }

    // This function is used recursively from
    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
    // don't want to throw if we can't find the source - we just want to
    // return null, so we provide a flag to exit gracefully.
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + relativeSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
BasicSourceMapConsumer.prototype.generatedPositionFor =
  function SourceMapConsumer_generatedPositionFor(aArgs) {
    var source = util.getArg(aArgs, 'source');
    source = this._findSourceIndex(source);
    if (source < 0) {
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    }

    var needle = {
      source: source,
      originalLine: util.getArg(aArgs, 'line'),
      originalColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      util.compareByOriginalPositions,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (mapping.source === needle.source) {
        return {
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null),
          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
        };
      }
    }

    return {
      line: null,
      column: null,
      lastColumn: null
    };
  };

var BasicSourceMapConsumer_1 = BasicSourceMapConsumer;

/**
 * An IndexedSourceMapConsumer instance represents a parsed source map which
 * we can query for information. It differs from BasicSourceMapConsumer in
 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
 * input.
 *
 * The first parameter is a raw source map (either as a JSON string, or already
 * parsed to an object). According to the spec for indexed source maps, they
 * have the following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - file: Optional. The generated file this source map is associated with.
 *   - sections: A list of section definitions.
 *
 * Each value under the "sections" field has two fields:
 *   - offset: The offset into the original specified at which this section
 *       begins to apply, defined as an object with a "line" and "column"
 *       field.
 *   - map: A source map definition. This source map could also be indexed,
 *       but doesn't have to be.
 *
 * Instead of the "map" field, it's also possible to have a "url" field
 * specifying a URL to retrieve a source map from, but that's currently
 * unsupported.
 *
 * Here's an example source map, taken from the source map spec[0], but
 * modified to omit a section which uses the "url" field.
 *
 *  {
 *    version : 3,
 *    file: "app.js",
 *    sections: [{
 *      offset: {line:100, column:10},
 *      map: {
 *        version : 3,
 *        file: "section.js",
 *        sources: ["foo.js", "bar.js"],
 *        names: ["src", "maps", "are", "fun"],
 *        mappings: "AAAA,E;;ABCDE;"
 *      }
 *    }],
 *  }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
 */
function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  var version = util.getArg(sourceMap, 'version');
  var sections = util.getArg(sourceMap, 'sections');

  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  this._sources = new ArraySet$2();
  this._names = new ArraySet$2();

  var lastOffset = {
    line: -1,
    column: 0
  };
  this._sections = sections.map(function (s) {
    if (s.url) {
      // The url field will require support for asynchronicity.
      // See https://github.com/mozilla/source-map/issues/16
      throw new Error('Support for url field in sections not implemented.');
    }
    var offset = util.getArg(s, 'offset');
    var offsetLine = util.getArg(offset, 'line');
    var offsetColumn = util.getArg(offset, 'column');

    if (offsetLine < lastOffset.line ||
        (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
      throw new Error('Section offsets must be ordered and non-overlapping.');
    }
    lastOffset = offset;

    return {
      generatedOffset: {
        // The offset fields are 0-based, but we use 1-based indices when
        // encoding/decoding from VLQ.
        generatedLine: offsetLine + 1,
        generatedColumn: offsetColumn + 1
      },
      consumer: new SourceMapConsumer(util.getArg(s, 'map'), aSourceMapURL)
    }
  });
}

IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

/**
 * The version of the source mapping spec that we are consuming.
 */
IndexedSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
  get: function () {
    var sources = [];
    for (var i = 0; i < this._sections.length; i++) {
      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
        sources.push(this._sections[i].consumer.sources[j]);
      }
    }
    return sources;
  }
});

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
IndexedSourceMapConsumer.prototype.originalPositionFor =
  function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    // Find the section containing the generated position we're trying to map
    // to an original position.
    var sectionIndex = binarySearch.search(needle, this._sections,
      function(needle, section) {
        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
        if (cmp) {
          return cmp;
        }

        return (needle.generatedColumn -
                section.generatedOffset.generatedColumn);
      });
    var section = this._sections[sectionIndex];

    if (!section) {
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    }

    return section.consumer.originalPositionFor({
      line: needle.generatedLine -
        (section.generatedOffset.generatedLine - 1),
      column: needle.generatedColumn -
        (section.generatedOffset.generatedLine === needle.generatedLine
         ? section.generatedOffset.generatedColumn - 1
         : 0),
      bias: aArgs.bias
    });
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
  function IndexedSourceMapConsumer_hasContentsOfAllSources() {
    return this._sections.every(function (s) {
      return s.consumer.hasContentsOfAllSources();
    });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
IndexedSourceMapConsumer.prototype.sourceContentFor =
  function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      var content = section.consumer.sourceContentFor(aSource, true);
      if (content) {
        return content;
      }
    }
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + aSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based. 
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
IndexedSourceMapConsumer.prototype.generatedPositionFor =
  function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      // Only consider this section if the requested source is in the list of
      // sources of the consumer.
      if (section.consumer._findSourceIndex(util.getArg(aArgs, 'source')) === -1) {
        continue;
      }
      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
      if (generatedPosition) {
        var ret = {
          line: generatedPosition.line +
            (section.generatedOffset.generatedLine - 1),
          column: generatedPosition.column +
            (section.generatedOffset.generatedLine === generatedPosition.line
             ? section.generatedOffset.generatedColumn - 1
             : 0)
        };
        return ret;
      }
    }

    return {
      line: null,
      column: null
    };
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
IndexedSourceMapConsumer.prototype._parseMappings =
  function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    this.__generatedMappings = [];
    this.__originalMappings = [];
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];
      var sectionMappings = section.consumer._generatedMappings;
      for (var j = 0; j < sectionMappings.length; j++) {
        var mapping = sectionMappings[j];

        var source = section.consumer._sources.at(mapping.source);
        source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
        this._sources.add(source);
        source = this._sources.indexOf(source);

        var name = null;
        if (mapping.name) {
          name = section.consumer._names.at(mapping.name);
          this._names.add(name);
          name = this._names.indexOf(name);
        }

        // The mappings coming from the consumer for the section have
        // generated positions relative to the start of the section, so we
        // need to offset them to be relative to the start of the concatenated
        // generated file.
        var adjustedMapping = {
          source: source,
          generatedLine: mapping.generatedLine +
            (section.generatedOffset.generatedLine - 1),
          generatedColumn: mapping.generatedColumn +
            (section.generatedOffset.generatedLine === mapping.generatedLine
            ? section.generatedOffset.generatedColumn - 1
            : 0),
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: name
        };

        this.__generatedMappings.push(adjustedMapping);
        if (typeof adjustedMapping.originalLine === 'number') {
          this.__originalMappings.push(adjustedMapping);
        }
      }
    }

    quickSort$1(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
    quickSort$1(this.__originalMappings, util.compareByOriginalPositions);
  };

var IndexedSourceMapConsumer_1 = IndexedSourceMapConsumer;

var sourceMapConsumer = {
	SourceMapConsumer: SourceMapConsumer_1,
	BasicSourceMapConsumer: BasicSourceMapConsumer_1,
	IndexedSourceMapConsumer: IndexedSourceMapConsumer_1
};

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var SourceMapGenerator$1 = sourceMapGenerator.SourceMapGenerator;


// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
// operating systems these days (capturing the result).
var REGEX_NEWLINE = /(\r?\n)/;

// Newline character code for charCodeAt() comparisons
var NEWLINE_CODE = 10;

// Private symbol for identifying `SourceNode`s when multiple versions of
// the source-map library are loaded. This MUST NOT CHANGE across
// versions!
var isSourceNode = "$$$isSourceNode$$$";

/**
 * SourceNodes provide a way to abstract over interpolating/concatenating
 * snippets of generated JavaScript source code while maintaining the line and
 * column information associated with the original source code.
 *
 * @param aLine The original line number.
 * @param aColumn The original column number.
 * @param aSource The original source's filename.
 * @param aChunks Optional. An array of strings which are snippets of
 *        generated JS, or other SourceNodes.
 * @param aName The original identifier.
 */
function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
  this.children = [];
  this.sourceContents = {};
  this.line = aLine == null ? null : aLine;
  this.column = aColumn == null ? null : aColumn;
  this.source = aSource == null ? null : aSource;
  this.name = aName == null ? null : aName;
  this[isSourceNode] = true;
  if (aChunks != null) this.add(aChunks);
}

/**
 * Creates a SourceNode from generated code and a SourceMapConsumer.
 *
 * @param aGeneratedCode The generated code
 * @param aSourceMapConsumer The SourceMap for the generated code
 * @param aRelativePath Optional. The path that relative sources in the
 *        SourceMapConsumer should be relative to.
 */
SourceNode.fromStringWithSourceMap =
  function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
    // The SourceNode we want to fill with the generated code
    // and the SourceMap
    var node = new SourceNode();

    // All even indices of this array are one line of the generated code,
    // while all odd indices are the newlines between two adjacent lines
    // (since `REGEX_NEWLINE` captures its match).
    // Processed fragments are accessed by calling `shiftNextLine`.
    var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
    var remainingLinesIndex = 0;
    var shiftNextLine = function() {
      var lineContents = getNextLine();
      // The last line of a file might not have a newline.
      var newLine = getNextLine() || "";
      return lineContents + newLine;

      function getNextLine() {
        return remainingLinesIndex < remainingLines.length ?
            remainingLines[remainingLinesIndex++] : undefined;
      }
    };

    // We need to remember the position of "remainingLines"
    var lastGeneratedLine = 1, lastGeneratedColumn = 0;

    // The generate SourceNodes we need a code range.
    // To extract it current and last mapping is used.
    // Here we store the last mapping.
    var lastMapping = null;

    aSourceMapConsumer.eachMapping(function (mapping) {
      if (lastMapping !== null) {
        // We add the code from "lastMapping" to "mapping":
        // First check if there is a new line in between.
        if (lastGeneratedLine < mapping.generatedLine) {
          // Associate first line with "lastMapping"
          addMappingWithCode(lastMapping, shiftNextLine());
          lastGeneratedLine++;
          lastGeneratedColumn = 0;
          // The remaining code is added without mapping
        } else {
          // There is no new line in between.
          // Associate the code between "lastGeneratedColumn" and
          // "mapping.generatedColumn" with "lastMapping"
          var nextLine = remainingLines[remainingLinesIndex] || '';
          var code = nextLine.substr(0, mapping.generatedColumn -
                                        lastGeneratedColumn);
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn -
                                              lastGeneratedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
          addMappingWithCode(lastMapping, code);
          // No more remaining code, continue
          lastMapping = mapping;
          return;
        }
      }
      // We add the generated code until the first mapping
      // to the SourceNode without any mapping.
      // Each line is added as separate string.
      while (lastGeneratedLine < mapping.generatedLine) {
        node.add(shiftNextLine());
        lastGeneratedLine++;
      }
      if (lastGeneratedColumn < mapping.generatedColumn) {
        var nextLine = remainingLines[remainingLinesIndex] || '';
        node.add(nextLine.substr(0, mapping.generatedColumn));
        remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
        lastGeneratedColumn = mapping.generatedColumn;
      }
      lastMapping = mapping;
    }, this);
    // We have processed all mappings.
    if (remainingLinesIndex < remainingLines.length) {
      if (lastMapping) {
        // Associate the remaining code in the current line with "lastMapping"
        addMappingWithCode(lastMapping, shiftNextLine());
      }
      // and add the remaining lines without any mapping
      node.add(remainingLines.splice(remainingLinesIndex).join(""));
    }

    // Copy sourcesContent into SourceNode
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aRelativePath != null) {
          sourceFile = util.join(aRelativePath, sourceFile);
        }
        node.setSourceContent(sourceFile, content);
      }
    });

    return node;

    function addMappingWithCode(mapping, code) {
      if (mapping === null || mapping.source === undefined) {
        node.add(code);
      } else {
        var source = aRelativePath
          ? util.join(aRelativePath, mapping.source)
          : mapping.source;
        node.add(new SourceNode(mapping.originalLine,
                                mapping.originalColumn,
                                source,
                                code,
                                mapping.name));
      }
    }
  };

/**
 * Add a chunk of generated JS to this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.add = function SourceNode_add(aChunk) {
  if (Array.isArray(aChunk)) {
    aChunk.forEach(function (chunk) {
      this.add(chunk);
    }, this);
  }
  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    if (aChunk) {
      this.children.push(aChunk);
    }
  }
  else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};

/**
 * Add a chunk of generated JS to the beginning of this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
  if (Array.isArray(aChunk)) {
    for (var i = aChunk.length-1; i >= 0; i--) {
      this.prepend(aChunk[i]);
    }
  }
  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    this.children.unshift(aChunk);
  }
  else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};

/**
 * Walk over the tree of JS snippets in this node and its children. The
 * walking function is called once for each snippet of JS and is passed that
 * snippet and the its original associated source's line/column location.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walk = function SourceNode_walk(aFn) {
  var chunk;
  for (var i = 0, len = this.children.length; i < len; i++) {
    chunk = this.children[i];
    if (chunk[isSourceNode]) {
      chunk.walk(aFn);
    }
    else {
      if (chunk !== '') {
        aFn(chunk, { source: this.source,
                     line: this.line,
                     column: this.column,
                     name: this.name });
      }
    }
  }
};

/**
 * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
 * each of `this.children`.
 *
 * @param aSep The separator.
 */
SourceNode.prototype.join = function SourceNode_join(aSep) {
  var newChildren;
  var i;
  var len = this.children.length;
  if (len > 0) {
    newChildren = [];
    for (i = 0; i < len-1; i++) {
      newChildren.push(this.children[i]);
      newChildren.push(aSep);
    }
    newChildren.push(this.children[i]);
    this.children = newChildren;
  }
  return this;
};

/**
 * Call String.prototype.replace on the very right-most source snippet. Useful
 * for trimming whitespace from the end of a source node, etc.
 *
 * @param aPattern The pattern to replace.
 * @param aReplacement The thing to replace the pattern with.
 */
SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
  var lastChild = this.children[this.children.length - 1];
  if (lastChild[isSourceNode]) {
    lastChild.replaceRight(aPattern, aReplacement);
  }
  else if (typeof lastChild === 'string') {
    this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
  }
  else {
    this.children.push(''.replace(aPattern, aReplacement));
  }
  return this;
};

/**
 * Set the source content for a source file. This will be added to the SourceMapGenerator
 * in the sourcesContent field.
 *
 * @param aSourceFile The filename of the source file
 * @param aSourceContent The content of the source file
 */
SourceNode.prototype.setSourceContent =
  function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
    this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
  };

/**
 * Walk over the tree of SourceNodes. The walking function is called for each
 * source file content and is passed the filename and source content.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walkSourceContents =
  function SourceNode_walkSourceContents(aFn) {
    for (var i = 0, len = this.children.length; i < len; i++) {
      if (this.children[i][isSourceNode]) {
        this.children[i].walkSourceContents(aFn);
      }
    }

    var sources = Object.keys(this.sourceContents);
    for (var i = 0, len = sources.length; i < len; i++) {
      aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
    }
  };

/**
 * Return the string representation of this source node. Walks over the tree
 * and concatenates all the various snippets together to one string.
 */
SourceNode.prototype.toString = function SourceNode_toString() {
  var str = "";
  this.walk(function (chunk) {
    str += chunk;
  });
  return str;
};

/**
 * Returns the string representation of this source node along with a source
 * map.
 */
SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
  var generated = {
    code: "",
    line: 1,
    column: 0
  };
  var map = new SourceMapGenerator$1(aArgs);
  var sourceMappingActive = false;
  var lastOriginalSource = null;
  var lastOriginalLine = null;
  var lastOriginalColumn = null;
  var lastOriginalName = null;
  this.walk(function (chunk, original) {
    generated.code += chunk;
    if (original.source !== null
        && original.line !== null
        && original.column !== null) {
      if(lastOriginalSource !== original.source
         || lastOriginalLine !== original.line
         || lastOriginalColumn !== original.column
         || lastOriginalName !== original.name) {
        map.addMapping({
          source: original.source,
          original: {
            line: original.line,
            column: original.column
          },
          generated: {
            line: generated.line,
            column: generated.column
          },
          name: original.name
        });
      }
      lastOriginalSource = original.source;
      lastOriginalLine = original.line;
      lastOriginalColumn = original.column;
      lastOriginalName = original.name;
      sourceMappingActive = true;
    } else if (sourceMappingActive) {
      map.addMapping({
        generated: {
          line: generated.line,
          column: generated.column
        }
      });
      lastOriginalSource = null;
      sourceMappingActive = false;
    }
    for (var idx = 0, length = chunk.length; idx < length; idx++) {
      if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
        generated.line++;
        generated.column = 0;
        // Mappings end at eol
        if (idx + 1 === length) {
          lastOriginalSource = null;
          sourceMappingActive = false;
        } else if (sourceMappingActive) {
          map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          });
        }
      } else {
        generated.column++;
      }
    }
  });
  this.walkSourceContents(function (sourceFile, sourceContent) {
    map.setSourceContent(sourceFile, sourceContent);
  });

  return { code: generated.code, map: map };
};

var SourceNode_1 = SourceNode;

var sourceNode = {
	SourceNode: SourceNode_1
};

/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
var SourceMapGenerator$2 = sourceMapGenerator.SourceMapGenerator;
var SourceMapConsumer$1 = sourceMapConsumer.SourceMapConsumer;
var SourceNode$1 = sourceNode.SourceNode;

var sourceMap = {
	SourceMapGenerator: SourceMapGenerator$2,
	SourceMapConsumer: SourceMapConsumer$1,
	SourceNode: SourceNode$1
};

var SourceMapConsumer$2 = sourceMap.SourceMapConsumer;

function inputSourceMapTracker() {
  var maps = {};

  return {
    all: all$2.bind(null, maps),
    isTracking: isTracking.bind(null, maps),
    originalPositionFor: originalPositionFor.bind(null, maps),
    track: track.bind(null, maps)
  };
}

function all$2(maps) {
  return maps;
}

function isTracking(maps, source) {
  return source in maps;
}

function originalPositionFor(maps, metadata, range, selectorFallbacks) {
  var line = metadata[0];
  var column = metadata[1];
  var source = metadata[2];
  var position = {
    line: line,
    column: column + range
  };
  var originalPosition;

  while (!originalPosition && position.column > column) {
    position.column--;
    originalPosition = maps[source].originalPositionFor(position);
  }

  if (!originalPosition || originalPosition.column < 0) {
    return metadata;
  }

  if (originalPosition.line === null && line > 1 && selectorFallbacks > 0) {
    return originalPositionFor(maps, [line - 1, column, source], range, selectorFallbacks - 1);
  }

  return originalPosition.line !== null ?
    toMetadata(originalPosition) :
    metadata;
}

function toMetadata(asHash) {
  return [asHash.line, asHash.column, asHash.source];
}

function track(maps, source, data) {
  maps[source] = new SourceMapConsumer$2(data);
}

var inputSourceMapTracker_1 = inputSourceMapTracker;

var REMOTE_RESOURCE_PATTERN = /^(\w+:\/\/|\/\/)/;

function isRemoteResource(uri) {
  return REMOTE_RESOURCE_PATTERN.test(uri);
}

var isRemoteResource_1 = isRemoteResource;

var NO_PROTOCOL_RESOURCE_PATTERN = /^\/\//;

function hasProtocol(uri) {
  return !NO_PROTOCOL_RESOURCE_PATTERN.test(uri);
}

var hasProtocol_1 = hasProtocol;

var HTTP_PROTOCOL$1 = 'http:';

function isAllowedResource(uri, isRemote, rules) {
  var match;
  var absoluteUri;
  var allowed = isRemote ? false : true;
  var rule;
  var isNegated;
  var normalizedRule;
  var i;

  if (rules.length === 0) {
    return false;
  }

  if (isRemote && !hasProtocol_1(uri)) {
    uri = HTTP_PROTOCOL$1 + uri;
  }

  match = isRemote ?
    url.parse(uri).host :
    uri;

  absoluteUri = isRemote ?
    uri :
    path$2.resolve(uri);

  for (i = 0; i < rules.length; i++) {
    rule = rules[i];
    isNegated = rule[0] == '!';
    normalizedRule = rule.substring(1);

    if (isNegated && isRemote && isRemoteRule(normalizedRule)) {
      allowed = allowed && !isAllowedResource(uri, true, [normalizedRule]);
    } else if (isNegated && !isRemote && !isRemoteRule(normalizedRule)) {
      allowed = allowed && !isAllowedResource(uri, false, [normalizedRule]);
    } else if (isNegated) {
      allowed = allowed && true;
    } else if (rule == 'all') {
      allowed = true;
    } else if (isRemote && rule == 'local') {
      allowed = allowed || false;
    } else if (isRemote && rule == 'remote') {
      allowed = true;
    } else if (!isRemote && rule == 'remote') {
      allowed = false;
    } else if (!isRemote && rule == 'local') {
      allowed = true;
    } else if (rule === match) {
      allowed = true;
    } else if (rule === uri) {
      allowed = true;
    } else if (isRemote && absoluteUri.indexOf(rule) === 0) {
      allowed = true;
    } else if (!isRemote && absoluteUri.indexOf(path$2.resolve(rule)) === 0) {
      allowed = true;
    } else if (isRemote != isRemoteRule(normalizedRule)) {
      allowed = allowed && true;
    } else {
      allowed = false;
    }
  }

  return allowed;
}

function isRemoteRule(rule) {
  return isRemoteResource_1(rule) || url.parse(HTTP_PROTOCOL$1 + '//' + rule).host == rule;
}

var isAllowedResource_1 = isAllowedResource;

var DATA_URI_PATTERN = /^data:(\S*?)?(;charset=[^;]+)?(;[^,]+?)?,(.+)/;

function matchDataUri(uri) {
  return DATA_URI_PATTERN.exec(uri);
}

var matchDataUri_1 = matchDataUri;

function rebaseLocalMap(sourceMap, sourceUri, rebaseTo) {
  var currentPath = path$2.resolve('');
  var absoluteUri = path$2.resolve(currentPath, sourceUri);
  var absoluteUriDirectory = path$2.dirname(absoluteUri);

  sourceMap.sources = sourceMap.sources.map(function(source) {
    return path$2.relative(rebaseTo, path$2.resolve(absoluteUriDirectory, source));
  });

  return sourceMap;
}

var rebaseLocalMap_1 = rebaseLocalMap;

function rebaseRemoteMap(sourceMap, sourceUri) {
  var sourceDirectory = path$2.dirname(sourceUri);

  sourceMap.sources = sourceMap.sources.map(function(source) {
    return url.resolve(sourceDirectory, source);
  });

  return sourceMap;
}

var rebaseRemoteMap_1 = rebaseRemoteMap;

var DATA_URI_PATTERN$1 = /^data:(\S*?)?(;charset=[^;]+)?(;[^,]+?)?,(.+)/;

function isDataUriResource(uri) {
  return DATA_URI_PATTERN$1.test(uri);
}

var isDataUriResource_1 = isDataUriResource;

var MAP_MARKER_PATTERN = /^\/\*# sourceMappingURL=(\S+) \*\/$/;

function applySourceMaps(tokens, context, callback) {
  var applyContext = {
    callback: callback,
    fetch: context.options.fetch,
    index: 0,
    inline: context.options.inline,
    inlineRequest: context.options.inlineRequest,
    inlineTimeout: context.options.inlineTimeout,
    inputSourceMapTracker: context.inputSourceMapTracker,
    localOnly: context.localOnly,
    processedTokens: [],
    rebaseTo: context.options.rebaseTo,
    sourceTokens: tokens,
    warnings: context.warnings
  };

  return context.options.sourceMap && tokens.length > 0 ?
    doApplySourceMaps(applyContext) :
    callback(tokens);
}

function doApplySourceMaps(applyContext) {
  var singleSourceTokens = [];
  var lastSource = findTokenSource(applyContext.sourceTokens[0]);
  var source;
  var token$1;
  var l;

  for (l = applyContext.sourceTokens.length; applyContext.index < l; applyContext.index++) {
    token$1 = applyContext.sourceTokens[applyContext.index];
    source = findTokenSource(token$1);

    if (source != lastSource) {
      singleSourceTokens = [];
      lastSource = source;
    }

    singleSourceTokens.push(token$1);
    applyContext.processedTokens.push(token$1);

    if (token$1[0] == token.COMMENT && MAP_MARKER_PATTERN.test(token$1[1])) {
      return fetchAndApplySourceMap(token$1[1], source, singleSourceTokens, applyContext);
    }
  }

  return applyContext.callback(applyContext.processedTokens);
}

function findTokenSource(token$1) {
  var scope;
  var metadata;

  if (token$1[0] == token.AT_RULE || token$1[0] == token.COMMENT) {
    metadata = token$1[2][0];
  } else {
    scope = token$1[1][0];
    metadata = scope[2][0];
  }

  return metadata[2];
}

function fetchAndApplySourceMap(sourceMapComment, source, singleSourceTokens, applyContext) {
  return extractInputSourceMapFrom(sourceMapComment, applyContext, function (inputSourceMap) {
    if (inputSourceMap) {
      applyContext.inputSourceMapTracker.track(source, inputSourceMap);
      applySourceMapRecursively(singleSourceTokens, applyContext.inputSourceMapTracker);
    }

    applyContext.index++;
    return doApplySourceMaps(applyContext);
  });
}

function extractInputSourceMapFrom(sourceMapComment, applyContext, whenSourceMapReady) {
  var uri = MAP_MARKER_PATTERN.exec(sourceMapComment)[1];
  var absoluteUri;
  var sourceMap;
  var rebasedMap;

  if (isDataUriResource_1(uri)) {
    sourceMap = extractInputSourceMapFromDataUri(uri);
    return whenSourceMapReady(sourceMap);
  } else if (isRemoteResource_1(uri)) {
    return loadInputSourceMapFromRemoteUri(uri, applyContext, function (sourceMap) {
      var parsedMap;

      if (sourceMap) {
        parsedMap = JSON.parse(sourceMap);
        rebasedMap = rebaseRemoteMap_1(parsedMap, uri);
        whenSourceMapReady(rebasedMap);
      } else {
        whenSourceMapReady(null);
      }
    });
  } else {
    // at this point `uri` is already rebased, see lib/reader/rebase.js#rebaseSourceMapComment
    // it is rebased to be consistent with rebasing other URIs
    // however here we need to resolve it back to read it from disk
    absoluteUri = path$2.resolve(applyContext.rebaseTo, uri);
    sourceMap = loadInputSourceMapFromLocalUri(absoluteUri, applyContext);

    if (sourceMap) {
      rebasedMap = rebaseLocalMap_1(sourceMap, absoluteUri, applyContext.rebaseTo);
      return whenSourceMapReady(rebasedMap);
    } else {
      return whenSourceMapReady(null);
    }
  }
}

function extractInputSourceMapFromDataUri(uri) {
  var dataUriMatch = matchDataUri_1(uri);
  var charset = dataUriMatch[2] ? dataUriMatch[2].split(/[=;]/)[2] : 'us-ascii';
  var encoding = dataUriMatch[3] ? dataUriMatch[3].split(';')[1] : 'utf8';
  var data = encoding == 'utf8' ? commonjsGlobal.unescape(dataUriMatch[4]) : dataUriMatch[4];

  var buffer = new Buffer(data, encoding);
  buffer.charset = charset;

  return JSON.parse(buffer.toString());
}

function loadInputSourceMapFromRemoteUri(uri, applyContext, whenLoaded) {
  var isAllowed = isAllowedResource_1(uri, true, applyContext.inline);
  var isRuntimeResource = !hasProtocol_1(uri);

  if (applyContext.localOnly) {
    applyContext.warnings.push('Cannot fetch remote resource from "' + uri + '" as no callback given.');
    return whenLoaded(null);
  } else if (isRuntimeResource) {
    applyContext.warnings.push('Cannot fetch "' + uri + '" as no protocol given.');
    return whenLoaded(null);
  } else if (!isAllowed) {
    applyContext.warnings.push('Cannot fetch "' + uri + '" as resource is not allowed.');
    return whenLoaded(null);
  }

  applyContext.fetch(uri, applyContext.inlineRequest, applyContext.inlineTimeout, function (error, body) {
    if (error) {
      applyContext.warnings.push('Missing source map at "' + uri + '" - ' + error);
      return whenLoaded(null);
    }

    whenLoaded(body);
  });
}

function loadInputSourceMapFromLocalUri(uri, applyContext) {
  var isAllowed = isAllowedResource_1(uri, false, applyContext.inline);
  var sourceMap;

  if (!fs.existsSync(uri) || !fs.statSync(uri).isFile()) {
    applyContext.warnings.push('Ignoring local source map at "' + uri + '" as resource is missing.');
    return null;
  } else if (!isAllowed) {
    applyContext.warnings.push('Cannot fetch "' + uri + '" as resource is not allowed.');
    return null;
  }

  sourceMap = fs.readFileSync(uri, 'utf-8');
  return JSON.parse(sourceMap);
}

function applySourceMapRecursively(tokens, inputSourceMapTracker) {
  var token$1;
  var i, l;

  for (i = 0, l = tokens.length; i < l; i++) {
    token$1 = tokens[i];

    switch (token$1[0]) {
      case token.AT_RULE:
        applySourceMapTo(token$1, inputSourceMapTracker);
        break;
      case token.AT_RULE_BLOCK:
        applySourceMapRecursively(token$1[1], inputSourceMapTracker);
        applySourceMapRecursively(token$1[2], inputSourceMapTracker);
        break;
      case token.AT_RULE_BLOCK_SCOPE:
        applySourceMapTo(token$1, inputSourceMapTracker);
        break;
      case token.NESTED_BLOCK:
        applySourceMapRecursively(token$1[1], inputSourceMapTracker);
        applySourceMapRecursively(token$1[2], inputSourceMapTracker);
        break;
      case token.NESTED_BLOCK_SCOPE:
        applySourceMapTo(token$1, inputSourceMapTracker);
        break;
      case token.COMMENT:
        applySourceMapTo(token$1, inputSourceMapTracker);
        break;
      case token.PROPERTY:
        applySourceMapRecursively(token$1, inputSourceMapTracker);
        break;
      case token.PROPERTY_BLOCK:
        applySourceMapRecursively(token$1[1], inputSourceMapTracker);
        break;
      case token.PROPERTY_NAME:
        applySourceMapTo(token$1, inputSourceMapTracker);
        break;
      case token.PROPERTY_VALUE:
        applySourceMapTo(token$1, inputSourceMapTracker);
        break;
      case token.RULE:
        applySourceMapRecursively(token$1[1], inputSourceMapTracker);
        applySourceMapRecursively(token$1[2], inputSourceMapTracker);
        break;
      case token.RULE_SCOPE:
        applySourceMapTo(token$1, inputSourceMapTracker);
    }
  }

  return tokens;
}

function applySourceMapTo(token, inputSourceMapTracker) {
  var value = token[1];
  var metadata = token[2];
  var newMetadata = [];
  var i, l;

  for (i = 0, l = metadata.length; i < l; i++) {
    newMetadata.push(inputSourceMapTracker.originalPositionFor(metadata[i], value.length));
  }

  token[2] = newMetadata;
}

var applySourceMaps_1 = applySourceMaps;

var BRACE_PREFIX = /^\(/;
var BRACE_SUFFIX = /\)$/;
var IMPORT_PREFIX_PATTERN$1 = /^@import/i;
var QUOTE_PREFIX_PATTERN = /['"]\s*/;
var QUOTE_SUFFIX_PATTERN = /\s*['"]/;
var URL_PREFIX_PATTERN$1 = /^url\(\s*/i;
var URL_SUFFIX_PATTERN = /\s*\)/i;

function extractImportUrlAndMedia(atRuleValue) {
  var uri;
  var mediaQuery;
  var stripped;
  var parts;

  stripped = atRuleValue
    .replace(IMPORT_PREFIX_PATTERN$1, '')
    .trim()
    .replace(URL_PREFIX_PATTERN$1, '(')
    .replace(URL_SUFFIX_PATTERN, ')')
    .replace(QUOTE_PREFIX_PATTERN, '')
    .replace(QUOTE_SUFFIX_PATTERN, '');

  parts = split_1(stripped, ' ');

  uri = parts[0]
    .replace(BRACE_PREFIX, '')
    .replace(BRACE_SUFFIX, '');
  mediaQuery = parts.slice(1).join(' ');

  return [uri, mediaQuery];
}

var extractImportUrlAndMedia_1 = extractImportUrlAndMedia;

function loadOriginalSources(context, callback) {
  var loadContext = {
    callback: callback,
    fetch: context.options.fetch,
    index: 0,
    inline: context.options.inline,
    inlineRequest: context.options.inlineRequest,
    inlineTimeout: context.options.inlineTimeout,
    localOnly: context.localOnly,
    rebaseTo: context.options.rebaseTo,
    sourcesContent: context.sourcesContent,
    uriToSource: uriToSourceMapping(context.inputSourceMapTracker.all()),
    warnings: context.warnings
  };

  return context.options.sourceMap && context.options.sourceMapInlineSources ?
    doLoadOriginalSources(loadContext) :
    callback();
}

function uriToSourceMapping(allSourceMapConsumers) {
  var mapping = {};
  var consumer;
  var uri;
  var source;
  var i, l;

  for (source in allSourceMapConsumers) {
    consumer = allSourceMapConsumers[source];

    for (i = 0, l = consumer.sources.length; i < l; i++) {
      uri = consumer.sources[i];
      source = consumer.sourceContentFor(uri, true);

      mapping[uri] = source;
    }
  }

  return mapping;
}

function doLoadOriginalSources(loadContext) {
  var uris = Object.keys(loadContext.uriToSource);
  var uri;
  var source;
  var total;

  for (total = uris.length; loadContext.index < total; loadContext.index++) {
    uri = uris[loadContext.index];
    source = loadContext.uriToSource[uri];

    if (source) {
      loadContext.sourcesContent[uri] = source;
    } else {
      return loadOriginalSource(uri, loadContext);
    }
  }

  return loadContext.callback();
}

function loadOriginalSource(uri, loadContext) {
  var content;

  if (isRemoteResource_1(uri)) {
    return loadOriginalSourceFromRemoteUri(uri, loadContext, function (content) {
      loadContext.index++;
      loadContext.sourcesContent[uri] = content;
      return doLoadOriginalSources(loadContext);
    });
  } else {
    content = loadOriginalSourceFromLocalUri(uri, loadContext);
    loadContext.index++;
    loadContext.sourcesContent[uri] = content;
    return doLoadOriginalSources(loadContext);
  }
}

function loadOriginalSourceFromRemoteUri(uri, loadContext, whenLoaded) {
  var isAllowed = isAllowedResource_1(uri, true, loadContext.inline);
  var isRuntimeResource = !hasProtocol_1(uri);

  if (loadContext.localOnly) {
    loadContext.warnings.push('Cannot fetch remote resource from "' + uri + '" as no callback given.');
    return whenLoaded(null);
  } else if (isRuntimeResource) {
    loadContext.warnings.push('Cannot fetch "' + uri + '" as no protocol given.');
    return whenLoaded(null);
  } else if (!isAllowed) {
    loadContext.warnings.push('Cannot fetch "' + uri + '" as resource is not allowed.');
    return whenLoaded(null);
  }

  loadContext.fetch(uri, loadContext.inlineRequest, loadContext.inlineTimeout, function (error, content) {
    if (error) {
      loadContext.warnings.push('Missing original source at "' + uri + '" - ' + error);
    }

    whenLoaded(content);
  });
}

function loadOriginalSourceFromLocalUri(relativeUri, loadContext) {
  var isAllowed = isAllowedResource_1(relativeUri, false, loadContext.inline);
  var absoluteUri = path$2.resolve(loadContext.rebaseTo, relativeUri);

  if (!fs.existsSync(absoluteUri) || !fs.statSync(absoluteUri).isFile()) {
    loadContext.warnings.push('Ignoring local source map at "' + absoluteUri + '" as resource is missing.');
    return null;
  } else if (!isAllowed) {
    loadContext.warnings.push('Cannot fetch "' + absoluteUri + '" as resource is not allowed.');
    return null;
  }

  return fs.readFileSync(absoluteUri, 'utf8');
}

var loadOriginalSources_1 = loadOriginalSources;

var UNIX_SEPARATOR = '/';
var WINDOWS_SEPARATOR_PATTERN = /\\/g;

function normalizePath(path) {
  return path.replace(WINDOWS_SEPARATOR_PATTERN, UNIX_SEPARATOR);
}

var normalizePath_1 = normalizePath;

function restoreImport(uri, mediaQuery) {
  return ('@import ' + uri + ' ' + mediaQuery).trim();
}

var restoreImport_1 = restoreImport;

var DOUBLE_QUOTE = '"';
var SINGLE_QUOTE = '\'';
var URL_PREFIX = 'url(';
var URL_SUFFIX = ')';

var QUOTE_PREFIX_PATTERN$1 = /^["']/;
var QUOTE_SUFFIX_PATTERN$1 = /["']$/;
var ROUND_BRACKETS_PATTERN = /[\(\)]/;
var URL_PREFIX_PATTERN$2 = /^url\(/i;
var URL_SUFFIX_PATTERN$1 = /\)$/;
var WHITESPACE_PATTERN$1 = /\s/;

var isWindows = process.platform == 'win32';

function rebase$1(uri, rebaseConfig) {
  if (!rebaseConfig) {
    return uri;
  }

  if (isAbsolute(uri) && !isRemote(rebaseConfig.toBase)) {
    return uri;
  }

  if (isRemote(uri) || isSVGMarker(uri) || isInternal(uri)) {
    return uri;
  }

  if (isData(uri)) {
    return '\'' + uri + '\'';
  }

  if (isRemote(rebaseConfig.toBase)) {
    return url.resolve(rebaseConfig.toBase, uri);
  }

  return rebaseConfig.absolute ?
    normalize$1(absolute(uri, rebaseConfig)) :
    normalize$1(relative(uri, rebaseConfig));
}

function isAbsolute(uri) {
  return path$2.isAbsolute(uri);
}

function isSVGMarker(uri) {
  return uri[0] == '#';
}

function isInternal(uri) {
  return /^\w+:\w+/.test(uri);
}

function isRemote(uri) {
  return /^[^:]+?:\/\//.test(uri) || uri.indexOf('//') === 0;
}

function isData(uri) {
  return uri.indexOf('data:') === 0;
}

function absolute(uri, rebaseConfig) {
  return path$2
    .resolve(path$2.join(rebaseConfig.fromBase || '', uri))
    .replace(rebaseConfig.toBase, '');
}

function relative(uri, rebaseConfig) {
  return path$2.relative(rebaseConfig.toBase, path$2.join(rebaseConfig.fromBase || '', uri));
}

function normalize$1(uri) {
  return isWindows ? uri.replace(/\\/g, '/') : uri;
}

function quoteFor(unquotedUrl) {
  if (unquotedUrl.indexOf(SINGLE_QUOTE) > -1) {
    return DOUBLE_QUOTE;
  } else if (unquotedUrl.indexOf(DOUBLE_QUOTE) > -1) {
    return SINGLE_QUOTE;
  } else if (hasWhitespace(unquotedUrl) || hasRoundBrackets(unquotedUrl)) {
    return SINGLE_QUOTE;
  } else {
    return '';
  }
}

function hasWhitespace(url) {
  return WHITESPACE_PATTERN$1.test(url);
}

function hasRoundBrackets(url) {
  return ROUND_BRACKETS_PATTERN.test(url);
}

function rewriteUrl(originalUrl, rebaseConfig, pathOnly) {
  var strippedUrl = originalUrl
    .replace(URL_PREFIX_PATTERN$2, '')
    .replace(URL_SUFFIX_PATTERN$1, '')
    .trim();

  var unquotedUrl = strippedUrl
    .replace(QUOTE_PREFIX_PATTERN$1, '')
    .replace(QUOTE_SUFFIX_PATTERN$1, '')
    .trim();

  var quote = strippedUrl[0] == SINGLE_QUOTE || strippedUrl[0] == DOUBLE_QUOTE ?
    strippedUrl[0] :
    quoteFor(unquotedUrl);

  return pathOnly ?
    rebase$1(unquotedUrl, rebaseConfig) :
    URL_PREFIX + quote + rebase$1(unquotedUrl, rebaseConfig) + quote + URL_SUFFIX;
}

var rewriteUrl_1 = rewriteUrl;

var IMPORT_PREFIX_PATTERN$2 = /^@import/i;

function isImport$1(value) {
  return IMPORT_PREFIX_PATTERN$2.test(value);
}

var isImport_1 = isImport$1;

var SOURCE_MAP_COMMENT_PATTERN = /^\/\*# sourceMappingURL=(\S+) \*\/$/;

function rebase$2(tokens, rebaseAll, validator, rebaseConfig) {
  return rebaseAll ?
    rebaseEverything(tokens, validator, rebaseConfig) :
    rebaseAtRules(tokens, validator, rebaseConfig);
}

function rebaseEverything(tokens, validator, rebaseConfig) {
  var token$1;
  var i, l;

  for (i = 0, l = tokens.length; i < l; i++) {
    token$1 = tokens[i];

    switch (token$1[0]) {
      case token.AT_RULE:
        rebaseAtRule(token$1, validator, rebaseConfig);
        break;
      case token.AT_RULE_BLOCK:
        rebaseProperties(token$1[2], validator, rebaseConfig);
        break;
      case token.COMMENT:
        rebaseSourceMapComment(token$1, rebaseConfig);
        break;
      case token.NESTED_BLOCK:
        rebaseEverything(token$1[2], validator, rebaseConfig);
        break;
      case token.RULE:
        rebaseProperties(token$1[2], validator, rebaseConfig);
        break;
    }
  }

  return tokens;
}

function rebaseAtRules(tokens, validator, rebaseConfig) {
  var token$1;
  var i, l;

  for (i = 0, l = tokens.length; i < l; i++) {
    token$1 = tokens[i];

    switch (token$1[0]) {
      case token.AT_RULE:
        rebaseAtRule(token$1, validator, rebaseConfig);
        break;
    }
  }

  return tokens;
}

function rebaseAtRule(token, validator, rebaseConfig) {
  if (!isImport_1(token[1])) {
    return;
  }

  var uriAndMediaQuery = extractImportUrlAndMedia_1(token[1]);
  var newUrl = rewriteUrl_1(uriAndMediaQuery[0], rebaseConfig);
  var mediaQuery = uriAndMediaQuery[1];

  token[1] = restoreImport_1(newUrl, mediaQuery);
}

function rebaseSourceMapComment(token, rebaseConfig) {
  var matches = SOURCE_MAP_COMMENT_PATTERN.exec(token[1]);

  if (matches && matches[1].indexOf('data:') === -1) {
    token[1] = token[1].replace(matches[1], rewriteUrl_1(matches[1], rebaseConfig, true));
  }
}

function rebaseProperties(properties, validator, rebaseConfig) {
  var property;
  var value;
  var i, l;
  var j, m;

  for (i = 0, l = properties.length; i < l; i++) {
    property = properties[i];

    for (j = 2 /* 0 is Token.PROPERTY, 1 is name */, m = property.length; j < m; j++) {
      value = property[j][1];

      if (validator.isUrl(value)) {
        property[j][1] = rewriteUrl_1(value, rebaseConfig);
      }
    }
  }
}

var rebase_1 = rebase$2;

var Level$1 = {
  BLOCK: 'block',
  COMMENT: 'comment',
  DOUBLE_QUOTE: 'double-quote',
  RULE: 'rule',
  SINGLE_QUOTE: 'single-quote'
};

var AT_RULES = [
  '@charset',
  '@import'
];

var BLOCK_RULES = [
  '@-moz-document',
  '@document',
  '@-moz-keyframes',
  '@-ms-keyframes',
  '@-o-keyframes',
  '@-webkit-keyframes',
  '@keyframes',
  '@media',
  '@supports'
];

var IGNORE_END_COMMENT_PATTERN = /\/\* clean\-css ignore:end \*\/$/;
var IGNORE_START_COMMENT_PATTERN = /^\/\* clean\-css ignore:start \*\//;

var PAGE_MARGIN_BOXES = [
  '@bottom-center',
  '@bottom-left',
  '@bottom-left-corner',
  '@bottom-right',
  '@bottom-right-corner',
  '@left-bottom',
  '@left-middle',
  '@left-top',
  '@right-bottom',
  '@right-middle',
  '@right-top',
  '@top-center',
  '@top-left',
  '@top-left-corner',
  '@top-right',
  '@top-right-corner'
];

var EXTRA_PAGE_BOXES = [
  '@footnote',
  '@footnotes',
  '@left',
  '@page-float-bottom',
  '@page-float-top',
  '@right'
];

var REPEAT_PATTERN = /^\[\s{0,31}\d+\s{0,31}\]$/;
var RULE_WORD_SEPARATOR_PATTERN = /[\s\(]/;
var TAIL_BROKEN_VALUE_PATTERN = /[\s|\}]*$/;

function tokenize(source, externalContext) {
  var internalContext = {
    level: Level$1.BLOCK,
    position: {
      source: externalContext.source || undefined,
      line: 1,
      column: 0,
      index: 0
    }
  };

  return intoTokens(source, externalContext, internalContext, false);
}

function intoTokens(source, externalContext, internalContext, isNested) {
  var allTokens = [];
  var newTokens = allTokens;
  var lastToken;
  var ruleToken;
  var ruleTokens = [];
  var propertyToken;
  var metadata;
  var metadatas = [];
  var level = internalContext.level;
  var levels = [];
  var buffer = [];
  var buffers = [];
  var serializedBuffer;
  var serializedBufferPart;
  var roundBracketLevel = 0;
  var isQuoted;
  var isSpace;
  var isNewLineNix;
  var isNewLineWin;
  var isCarriageReturn;
  var isCommentStart;
  var wasCommentStart = false;
  var isCommentEnd;
  var wasCommentEnd = false;
  var isCommentEndMarker;
  var isEscaped;
  var wasEscaped = false;
  var isRaw = false;
  var seekingValue = false;
  var seekingPropertyBlockClosing = false;
  var position = internalContext.position;
  var lastCommentStartAt;

  for (; position.index < source.length; position.index++) {
    var character = source[position.index];

    isQuoted = level == Level$1.SINGLE_QUOTE || level == Level$1.DOUBLE_QUOTE;
    isSpace = character == marker.SPACE || character == marker.TAB;
    isNewLineNix = character == marker.NEW_LINE_NIX;
    isNewLineWin = character == marker.NEW_LINE_NIX && source[position.index - 1] == marker.CARRIAGE_RETURN;
    isCarriageReturn = character == marker.CARRIAGE_RETURN && source[position.index + 1] && source[position.index + 1] != marker.NEW_LINE_NIX;
    isCommentStart = !wasCommentEnd && level != Level$1.COMMENT && !isQuoted && character == marker.ASTERISK && source[position.index - 1] == marker.FORWARD_SLASH;
    isCommentEndMarker = !wasCommentStart && !isQuoted && character == marker.FORWARD_SLASH && source[position.index - 1] == marker.ASTERISK;
    isCommentEnd = level == Level$1.COMMENT && isCommentEndMarker;
    roundBracketLevel = Math.max(roundBracketLevel, 0);

    metadata = buffer.length === 0 ?
      [position.line, position.column, position.source] :
      metadata;

    if (isEscaped) {
      // previous character was a backslash
      buffer.push(character);
    } else if (!isCommentEnd && level == Level$1.COMMENT) {
      buffer.push(character);
    } else if (!isCommentStart && !isCommentEnd && isRaw) {
      buffer.push(character);
    } else if (isCommentStart && (level == Level$1.BLOCK || level == Level$1.RULE) && buffer.length > 1) {
      // comment start within block preceded by some content, e.g. div/*<--
      metadatas.push(metadata);
      buffer.push(character);
      buffers.push(buffer.slice(0, buffer.length - 2));

      buffer = buffer.slice(buffer.length - 2);
      metadata = [position.line, position.column - 1, position.source];

      levels.push(level);
      level = Level$1.COMMENT;
    } else if (isCommentStart) {
      // comment start, e.g. /*<--
      levels.push(level);
      level = Level$1.COMMENT;
      buffer.push(character);
    } else if (isCommentEnd && isIgnoreStartComment(buffer)) {
      // ignore:start comment end, e.g. /* clean-css ignore:start */<--
      serializedBuffer = buffer.join('').trim() + character;
      lastToken = [token.COMMENT, serializedBuffer, [originalMetadata(metadata, serializedBuffer, externalContext)]];
      newTokens.push(lastToken);

      isRaw = true;
      metadata = metadatas.pop() || null;
      buffer = buffers.pop() || [];
    } else if (isCommentEnd && isIgnoreEndComment(buffer)) {
      // ignore:start comment end, e.g. /* clean-css ignore:end */<--
      serializedBuffer = buffer.join('') + character;
      lastCommentStartAt = serializedBuffer.lastIndexOf(marker.FORWARD_SLASH + marker.ASTERISK);

      serializedBufferPart = serializedBuffer.substring(0, lastCommentStartAt);
      lastToken = [token.RAW, serializedBufferPart, [originalMetadata(metadata, serializedBufferPart, externalContext)]];
      newTokens.push(lastToken);

      serializedBufferPart = serializedBuffer.substring(lastCommentStartAt);
      metadata = [position.line, position.column - serializedBufferPart.length + 1, position.source];
      lastToken = [token.COMMENT, serializedBufferPart, [originalMetadata(metadata, serializedBufferPart, externalContext)]];
      newTokens.push(lastToken);

      isRaw = false;
      level = levels.pop();
      metadata = metadatas.pop() || null;
      buffer = buffers.pop() || [];
    } else if (isCommentEnd) {
      // comment end, e.g. /* comment */<--
      serializedBuffer = buffer.join('').trim() + character;
      lastToken = [token.COMMENT, serializedBuffer, [originalMetadata(metadata, serializedBuffer, externalContext)]];
      newTokens.push(lastToken);

      level = levels.pop();
      metadata = metadatas.pop() || null;
      buffer = buffers.pop() || [];
    } else if (isCommentEndMarker && source[position.index + 1] != marker.ASTERISK) {
      externalContext.warnings.push('Unexpected \'*/\' at ' + formatPosition_1([position.line, position.column, position.source]) + '.');
      buffer = [];
    } else if (character == marker.SINGLE_QUOTE && !isQuoted) {
      // single quotation start, e.g. a[href^='https<--
      levels.push(level);
      level = Level$1.SINGLE_QUOTE;
      buffer.push(character);
    } else if (character == marker.SINGLE_QUOTE && level == Level$1.SINGLE_QUOTE) {
      // single quotation end, e.g. a[href^='https'<--
      level = levels.pop();
      buffer.push(character);
    } else if (character == marker.DOUBLE_QUOTE && !isQuoted) {
      // double quotation start, e.g. a[href^="<--
      levels.push(level);
      level = Level$1.DOUBLE_QUOTE;
      buffer.push(character);
    } else if (character == marker.DOUBLE_QUOTE && level == Level$1.DOUBLE_QUOTE) {
      // double quotation end, e.g. a[href^="https"<--
      level = levels.pop();
      buffer.push(character);
    } else if (!isCommentStart && !isCommentEnd && character != marker.CLOSE_ROUND_BRACKET && character != marker.OPEN_ROUND_BRACKET && level != Level$1.COMMENT && !isQuoted && roundBracketLevel > 0) {
      // character inside any function, e.g. hsla(.<--
      buffer.push(character);
    } else if (character == marker.OPEN_ROUND_BRACKET && !isQuoted && level != Level$1.COMMENT && !seekingValue) {
      // round open bracket, e.g. @import url(<--
      buffer.push(character);

      roundBracketLevel++;
    } else if (character == marker.CLOSE_ROUND_BRACKET && !isQuoted && level != Level$1.COMMENT && !seekingValue) {
      // round open bracket, e.g. @import url(test.css)<--
      buffer.push(character);

      roundBracketLevel--;
    } else if (character == marker.SEMICOLON && level == Level$1.BLOCK && buffer[0] == marker.AT) {
      // semicolon ending rule at block level, e.g. @import '...';<--
      serializedBuffer = buffer.join('').trim();
      allTokens.push([token.AT_RULE, serializedBuffer, [originalMetadata(metadata, serializedBuffer, externalContext)]]);

      buffer = [];
    } else if (character == marker.COMMA && level == Level$1.BLOCK && ruleToken) {
      // comma separator at block level, e.g. a,div,<--
      serializedBuffer = buffer.join('').trim();
      ruleToken[1].push([tokenScopeFrom(ruleToken[0]), serializedBuffer, [originalMetadata(metadata, serializedBuffer, externalContext, ruleToken[1].length)]]);

      buffer = [];
    } else if (character == marker.COMMA && level == Level$1.BLOCK && tokenTypeFrom(buffer) == token.AT_RULE) {
      // comma separator at block level, e.g. @import url(...) screen,<--
      // keep iterating as end semicolon will create the token
      buffer.push(character);
    } else if (character == marker.COMMA && level == Level$1.BLOCK) {
      // comma separator at block level, e.g. a,<--
      ruleToken = [tokenTypeFrom(buffer), [], []];
      serializedBuffer = buffer.join('').trim();
      ruleToken[1].push([tokenScopeFrom(ruleToken[0]), serializedBuffer, [originalMetadata(metadata, serializedBuffer, externalContext, 0)]]);

      buffer = [];
    } else if (character == marker.OPEN_CURLY_BRACKET && level == Level$1.BLOCK && ruleToken && ruleToken[0] == token.NESTED_BLOCK) {
      // open brace opening at-rule at block level, e.g. @media{<--
      serializedBuffer = buffer.join('').trim();
      ruleToken[1].push([token.NESTED_BLOCK_SCOPE, serializedBuffer, [originalMetadata(metadata, serializedBuffer, externalContext)]]);
      allTokens.push(ruleToken);

      levels.push(level);
      position.column++;
      position.index++;
      buffer = [];

      ruleToken[2] = intoTokens(source, externalContext, internalContext, true);
      ruleToken = null;
    } else if (character == marker.OPEN_CURLY_BRACKET && level == Level$1.BLOCK && tokenTypeFrom(buffer) == token.NESTED_BLOCK) {
      // open brace opening at-rule at block level, e.g. @media{<--
      serializedBuffer = buffer.join('').trim();
      ruleToken = ruleToken || [token.NESTED_BLOCK, [], []];
      ruleToken[1].push([token.NESTED_BLOCK_SCOPE, serializedBuffer, [originalMetadata(metadata, serializedBuffer, externalContext)]]);
      allTokens.push(ruleToken);

      levels.push(level);
      position.column++;
      position.index++;
      buffer = [];

      ruleToken[2] = intoTokens(source, externalContext, internalContext, true);
      ruleToken = null;
    } else if (character == marker.OPEN_CURLY_BRACKET && level == Level$1.BLOCK) {
      // open brace opening rule at block level, e.g. div{<--
      serializedBuffer = buffer.join('').trim();
      ruleToken = ruleToken || [tokenTypeFrom(buffer), [], []];
      ruleToken[1].push([tokenScopeFrom(ruleToken[0]), serializedBuffer, [originalMetadata(metadata, serializedBuffer, externalContext, ruleToken[1].length)]]);
      newTokens = ruleToken[2];
      allTokens.push(ruleToken);

      levels.push(level);
      level = Level$1.RULE;
      buffer = [];
    } else if (character == marker.OPEN_CURLY_BRACKET && level == Level$1.RULE && seekingValue) {
      // open brace opening rule at rule level, e.g. div{--variable:{<--
      ruleTokens.push(ruleToken);
      ruleToken = [token.PROPERTY_BLOCK, []];
      propertyToken.push(ruleToken);
      newTokens = ruleToken[1];

      levels.push(level);
      level = Level$1.RULE;
      seekingValue = false;
    } else if (character == marker.OPEN_CURLY_BRACKET && level == Level$1.RULE && isPageMarginBox(buffer)) {
      // open brace opening page-margin box at rule level, e.g. @page{@top-center{<--
      serializedBuffer = buffer.join('').trim();
      ruleTokens.push(ruleToken);
      ruleToken = [token.AT_RULE_BLOCK, [], []];
      ruleToken[1].push([token.AT_RULE_BLOCK_SCOPE, serializedBuffer, [originalMetadata(metadata, serializedBuffer, externalContext)]]);
      newTokens.push(ruleToken);
      newTokens = ruleToken[2];

      levels.push(level);
      level = Level$1.RULE;
      buffer = [];
    } else if (character == marker.COLON && level == Level$1.RULE && !seekingValue) {
      // colon at rule level, e.g. a{color:<--
      serializedBuffer = buffer.join('').trim();
      propertyToken = [token.PROPERTY, [token.PROPERTY_NAME, serializedBuffer, [originalMetadata(metadata, serializedBuffer, externalContext)]]];
      newTokens.push(propertyToken);

      seekingValue = true;
      buffer = [];
    } else if (character == marker.SEMICOLON && level == Level$1.RULE && propertyToken && ruleTokens.length > 0 && buffer.length > 0 && buffer[0] == marker.AT) {
      // semicolon at rule level for at-rule, e.g. a{--color:{@apply(--other-color);<--
      serializedBuffer = buffer.join('').trim();
      ruleToken[1].push([token.AT_RULE, serializedBuffer, [originalMetadata(metadata, serializedBuffer, externalContext)]]);

      buffer = [];
    } else if (character == marker.SEMICOLON && level == Level$1.RULE && propertyToken && buffer.length > 0) {
      // semicolon at rule level, e.g. a{color:red;<--
      serializedBuffer = buffer.join('').trim();
      propertyToken.push([token.PROPERTY_VALUE, serializedBuffer, [originalMetadata(metadata, serializedBuffer, externalContext)]]);

      propertyToken = null;
      seekingValue = false;
      buffer = [];
    } else if (character == marker.SEMICOLON && level == Level$1.RULE && propertyToken && buffer.length === 0) {
      // semicolon after bracketed value at rule level, e.g. a{color:rgb(...);<--
      propertyToken = null;
      seekingValue = false;
    } else if (character == marker.SEMICOLON && level == Level$1.RULE && buffer.length > 0 && buffer[0] == marker.AT) {
      // semicolon for at-rule at rule level, e.g. a{@apply(--variable);<--
      serializedBuffer = buffer.join('');
      newTokens.push([token.AT_RULE, serializedBuffer, [originalMetadata(metadata, serializedBuffer, externalContext)]]);

      seekingValue = false;
      buffer = [];
    } else if (character == marker.SEMICOLON && level == Level$1.RULE && seekingPropertyBlockClosing) {
      // close brace after a property block at rule level, e.g. a{--custom:{color:red;};<--
      seekingPropertyBlockClosing = false;
      buffer = [];
    } else if (character == marker.SEMICOLON && level == Level$1.RULE && buffer.length === 0) ; else if (character == marker.CLOSE_CURLY_BRACKET && level == Level$1.RULE && propertyToken && seekingValue && buffer.length > 0 && ruleTokens.length > 0) {
      // close brace at rule level, e.g. a{--color:{color:red}<--
      serializedBuffer = buffer.join('');
      propertyToken.push([token.PROPERTY_VALUE, serializedBuffer, [originalMetadata(metadata, serializedBuffer, externalContext)]]);
      propertyToken = null;
      ruleToken = ruleTokens.pop();
      newTokens = ruleToken[2];

      level = levels.pop();
      seekingValue = false;
      buffer = [];
    } else if (character == marker.CLOSE_CURLY_BRACKET && level == Level$1.RULE && propertyToken && buffer.length > 0 && buffer[0] == marker.AT && ruleTokens.length > 0) {
      // close brace at rule level for at-rule, e.g. a{--color:{@apply(--other-color)}<--
      serializedBuffer = buffer.join('');
      ruleToken[1].push([token.AT_RULE, serializedBuffer, [originalMetadata(metadata, serializedBuffer, externalContext)]]);
      propertyToken = null;
      ruleToken = ruleTokens.pop();
      newTokens = ruleToken[2];

      level = levels.pop();
      seekingValue = false;
      buffer = [];
    } else if (character == marker.CLOSE_CURLY_BRACKET && level == Level$1.RULE && propertyToken && ruleTokens.length > 0) {
      // close brace at rule level after space, e.g. a{--color:{color:red }<--
      propertyToken = null;
      ruleToken = ruleTokens.pop();
      newTokens = ruleToken[2];

      level = levels.pop();
      seekingValue = false;
    } else if (character == marker.CLOSE_CURLY_BRACKET && level == Level$1.RULE && propertyToken && buffer.length > 0) {
      // close brace at rule level, e.g. a{color:red}<--
      serializedBuffer = buffer.join('');
      propertyToken.push([token.PROPERTY_VALUE, serializedBuffer, [originalMetadata(metadata, serializedBuffer, externalContext)]]);
      propertyToken = null;
      ruleToken = ruleTokens.pop();
      newTokens = allTokens;

      level = levels.pop();
      seekingValue = false;
      buffer = [];
    } else if (character == marker.CLOSE_CURLY_BRACKET && level == Level$1.RULE && buffer.length > 0 && buffer[0] == marker.AT) {
      // close brace after at-rule at rule level, e.g. a{@apply(--variable)}<--
      propertyToken = null;
      ruleToken = null;
      serializedBuffer = buffer.join('').trim();
      newTokens.push([token.AT_RULE, serializedBuffer, [originalMetadata(metadata, serializedBuffer, externalContext)]]);
      newTokens = allTokens;

      level = levels.pop();
      seekingValue = false;
      buffer = [];
    } else if (character == marker.CLOSE_CURLY_BRACKET && level == Level$1.RULE && levels[levels.length - 1] == Level$1.RULE) {
      // close brace after a property block at rule level, e.g. a{--custom:{color:red;}<--
      propertyToken = null;
      ruleToken = ruleTokens.pop();
      newTokens = ruleToken[2];

      level = levels.pop();
      seekingValue = false;
      seekingPropertyBlockClosing = true;
      buffer = [];
    } else if (character == marker.CLOSE_CURLY_BRACKET && level == Level$1.RULE) {
      // close brace after a rule, e.g. a{color:red;}<--
      propertyToken = null;
      ruleToken = null;
      newTokens = allTokens;

      level = levels.pop();
      seekingValue = false;
    } else if (character == marker.CLOSE_CURLY_BRACKET && level == Level$1.BLOCK && !isNested && position.index <= source.length - 1) {
      // stray close brace at block level, e.g. a{color:red}color:blue}<--
      externalContext.warnings.push('Unexpected \'}\' at ' + formatPosition_1([position.line, position.column, position.source]) + '.');
      buffer.push(character);
    } else if (character == marker.CLOSE_CURLY_BRACKET && level == Level$1.BLOCK) {
      // close brace at block level, e.g. @media screen {...}<--
      break;
    } else if (character == marker.OPEN_ROUND_BRACKET && level == Level$1.RULE && seekingValue) {
      // round open bracket, e.g. a{color:hsla(<--
      buffer.push(character);
      roundBracketLevel++;
    } else if (character == marker.CLOSE_ROUND_BRACKET && level == Level$1.RULE && seekingValue && roundBracketLevel == 1) {
      // round close bracket, e.g. a{color:hsla(0,0%,0%)<--
      buffer.push(character);
      serializedBuffer = buffer.join('').trim();
      propertyToken.push([token.PROPERTY_VALUE, serializedBuffer, [originalMetadata(metadata, serializedBuffer, externalContext)]]);

      roundBracketLevel--;
      buffer = [];
    } else if (character == marker.CLOSE_ROUND_BRACKET && level == Level$1.RULE && seekingValue) {
      // round close bracket within other brackets, e.g. a{width:calc((10rem / 2)<--
      buffer.push(character);
      roundBracketLevel--;
    } else if (character == marker.FORWARD_SLASH && source[position.index + 1] != marker.ASTERISK && level == Level$1.RULE && seekingValue && buffer.length > 0) {
      // forward slash within a property, e.g. a{background:url(image.png) 0 0/<--
      serializedBuffer = buffer.join('').trim();
      propertyToken.push([token.PROPERTY_VALUE, serializedBuffer, [originalMetadata(metadata, serializedBuffer, externalContext)]]);
      propertyToken.push([token.PROPERTY_VALUE, character, [[position.line, position.column, position.source]]]);

      buffer = [];
    } else if (character == marker.FORWARD_SLASH && source[position.index + 1] != marker.ASTERISK && level == Level$1.RULE && seekingValue) {
      // forward slash within a property after space, e.g. a{background:url(image.png) 0 0 /<--
      propertyToken.push([token.PROPERTY_VALUE, character, [[position.line, position.column, position.source]]]);

      buffer = [];
    } else if (character == marker.COMMA && level == Level$1.RULE && seekingValue && buffer.length > 0) {
      // comma within a property, e.g. a{background:url(image.png),<--
      serializedBuffer = buffer.join('').trim();
      propertyToken.push([token.PROPERTY_VALUE, serializedBuffer, [originalMetadata(metadata, serializedBuffer, externalContext)]]);
      propertyToken.push([token.PROPERTY_VALUE, character, [[position.line, position.column, position.source]]]);

      buffer = [];
    } else if (character == marker.COMMA && level == Level$1.RULE && seekingValue) {
      // comma within a property after space, e.g. a{background:url(image.png) ,<--
      propertyToken.push([token.PROPERTY_VALUE, character, [[position.line, position.column, position.source]]]);

      buffer = [];
    } else if (character == marker.CLOSE_SQUARE_BRACKET && propertyToken && propertyToken.length > 1 && buffer.length > 0 && isRepeatToken(buffer)) {
      buffer.push(character);
      serializedBuffer = buffer.join('').trim();
      propertyToken[propertyToken.length - 1][1] += serializedBuffer;

      buffer = [];
    } else if ((isSpace || (isNewLineNix && !isNewLineWin)) && level == Level$1.RULE && seekingValue && propertyToken && buffer.length > 0) {
      // space or *nix newline within property, e.g. a{margin:0 <--
      serializedBuffer = buffer.join('').trim();
      propertyToken.push([token.PROPERTY_VALUE, serializedBuffer, [originalMetadata(metadata, serializedBuffer, externalContext)]]);

      buffer = [];
    } else if (isNewLineWin && level == Level$1.RULE && seekingValue && propertyToken && buffer.length > 1) {
      // win newline within property, e.g. a{margin:0\r\n<--
      serializedBuffer = buffer.join('').trim();
      propertyToken.push([token.PROPERTY_VALUE, serializedBuffer, [originalMetadata(metadata, serializedBuffer, externalContext)]]);

      buffer = [];
    } else if (isNewLineWin && level == Level$1.RULE && seekingValue) {
      // win newline
      buffer = [];
    } else if (buffer.length == 1 && isNewLineWin) {
      // ignore windows newline which is composed of two characters
      buffer.pop();
    } else if (buffer.length > 0 || !isSpace && !isNewLineNix && !isNewLineWin && !isCarriageReturn) {
      // any character
      buffer.push(character);
    }

    wasEscaped = isEscaped;
    isEscaped = !wasEscaped && character == marker.BACK_SLASH;
    wasCommentStart = isCommentStart;
    wasCommentEnd = isCommentEnd;

    position.line = (isNewLineWin || isNewLineNix || isCarriageReturn) ? position.line + 1 : position.line;
    position.column = (isNewLineWin || isNewLineNix || isCarriageReturn) ? 0 : position.column + 1;
  }

  if (seekingValue) {
    externalContext.warnings.push('Missing \'}\' at ' + formatPosition_1([position.line, position.column, position.source]) + '.');
  }

  if (seekingValue && buffer.length > 0) {
    serializedBuffer = buffer.join('').replace(TAIL_BROKEN_VALUE_PATTERN, '');
    propertyToken.push([token.PROPERTY_VALUE, serializedBuffer, [originalMetadata(metadata, serializedBuffer, externalContext)]]);

    buffer = [];
  }

  if (buffer.length > 0) {
    externalContext.warnings.push('Invalid character(s) \'' + buffer.join('') + '\' at ' + formatPosition_1(metadata) + '. Ignoring.');
  }

  return allTokens;
}

function isIgnoreStartComment(buffer) {
  return IGNORE_START_COMMENT_PATTERN.test(buffer.join('') + marker.FORWARD_SLASH);
}

function isIgnoreEndComment(buffer) {
  return IGNORE_END_COMMENT_PATTERN.test(buffer.join('') + marker.FORWARD_SLASH);
}

function originalMetadata(metadata, value, externalContext, selectorFallbacks) {
  var source = metadata[2];

  return externalContext.inputSourceMapTracker.isTracking(source) ?
    externalContext.inputSourceMapTracker.originalPositionFor(metadata, value.length, selectorFallbacks) :
    metadata;
}

function tokenTypeFrom(buffer) {
  var isAtRule = buffer[0] == marker.AT || buffer[0] == marker.UNDERSCORE;
  var ruleWord = buffer.join('').split(RULE_WORD_SEPARATOR_PATTERN)[0];

  if (isAtRule && BLOCK_RULES.indexOf(ruleWord) > -1) {
    return token.NESTED_BLOCK;
  } else if (isAtRule && AT_RULES.indexOf(ruleWord) > -1) {
    return token.AT_RULE;
  } else if (isAtRule) {
    return token.AT_RULE_BLOCK;
  } else {
    return token.RULE;
  }
}

function tokenScopeFrom(tokenType) {
  if (tokenType == token.RULE) {
    return token.RULE_SCOPE;
  } else if (tokenType == token.NESTED_BLOCK) {
    return token.NESTED_BLOCK_SCOPE;
  } else if (tokenType == token.AT_RULE_BLOCK) {
    return token.AT_RULE_BLOCK_SCOPE;
  }
}

function isPageMarginBox(buffer) {
  var serializedBuffer = buffer.join('').trim();

  return PAGE_MARGIN_BOXES.indexOf(serializedBuffer) > -1 || EXTRA_PAGE_BOXES.indexOf(serializedBuffer) > -1;
}

function isRepeatToken(buffer) {
  return REPEAT_PATTERN.test(buffer.join('') + marker.CLOSE_SQUARE_BRACKET);
}

var tokenize_1 = tokenize;

var UNKNOWN_URI = 'uri:unknown';

function readSources(input, context, callback) {
  return doReadSources(input, context, function (tokens) {
    return applySourceMaps_1(tokens, context, function () {
      return loadOriginalSources_1(context, function () { return callback(tokens); });
    });
  });
}

function doReadSources(input, context, callback) {
  if (typeof input == 'string') {
    return fromString(input, context, callback);
  } else if (Buffer.isBuffer(input)) {
    return fromString(input.toString(), context, callback);
  } else if (Array.isArray(input)) {
    return fromArray(input, context, callback);
  } else if (typeof input == 'object') {
    return fromHash(input, context, callback);
  }
}

function fromString(input, context, callback) {
  context.source = undefined;
  context.sourcesContent[undefined] = input;
  context.stats.originalSize += input.length;

  return fromStyles(input, context, { inline: context.options.inline }, callback);
}

function fromArray(input, context, callback) {
  var inputAsImports = input.reduce(function (accumulator, uriOrHash) {
    if (typeof uriOrHash === 'string') {
      return addStringSource(uriOrHash, accumulator);
    } else {
      return addHashSource(uriOrHash, context, accumulator);
    }

  }, []);

  return fromStyles(inputAsImports.join(''), context, { inline: ['all'] }, callback);
}

function fromHash(input, context, callback) {
  var inputAsImports = addHashSource(input, context, []);
  return fromStyles(inputAsImports.join(''), context, { inline: ['all'] }, callback);
}

function addStringSource(input, imports) {
  imports.push(restoreAsImport(normalizeUri(input)));
  return imports;
}

function addHashSource(input, context, imports) {
  var uri;
  var normalizedUri;
  var source;

  for (uri in input) {
    source = input[uri];
    normalizedUri = normalizeUri(uri);

    imports.push(restoreAsImport(normalizedUri));

    context.sourcesContent[normalizedUri] = source.styles;

    if (source.sourceMap) {
      trackSourceMap(source.sourceMap, normalizedUri, context);
    }
  }

  return imports;
}

function normalizeUri(uri) {
  var currentPath = path$2.resolve('');
  var absoluteUri;
  var relativeToCurrentPath;
  var normalizedUri;

  if (isRemoteResource_1(uri)) {
    return uri;
  }

  absoluteUri = path$2.isAbsolute(uri) ?
    uri :
    path$2.resolve(uri);
  relativeToCurrentPath = path$2.relative(currentPath, absoluteUri);
  normalizedUri = normalizePath_1(relativeToCurrentPath);

  return normalizedUri;
}

function trackSourceMap(sourceMap, uri, context) {
  var parsedMap = typeof sourceMap == 'string' ?
      JSON.parse(sourceMap) :
      sourceMap;
  var rebasedMap = isRemoteResource_1(uri) ?
    rebaseRemoteMap_1(parsedMap, uri) :
    rebaseLocalMap_1(parsedMap, uri || UNKNOWN_URI, context.options.rebaseTo);

  context.inputSourceMapTracker.track(uri, rebasedMap);
}

function restoreAsImport(uri) {
  return restoreImport_1('url(' + uri + ')', '') + marker.SEMICOLON;
}

function fromStyles(styles, context, parentInlinerContext, callback) {
  var tokens;
  var rebaseConfig = {};

  if (!context.source) {
    rebaseConfig.fromBase = path$2.resolve('');
    rebaseConfig.toBase = context.options.rebaseTo;
  } else if (isRemoteResource_1(context.source)) {
    rebaseConfig.fromBase = context.source;
    rebaseConfig.toBase = context.source;
  } else if (path$2.isAbsolute(context.source)) {
    rebaseConfig.fromBase = path$2.dirname(context.source);
    rebaseConfig.toBase = context.options.rebaseTo;
  } else {
    rebaseConfig.fromBase = path$2.dirname(path$2.resolve(context.source));
    rebaseConfig.toBase = context.options.rebaseTo;
  }

  tokens = tokenize_1(styles, context);
  tokens = rebase_1(tokens, context.options.rebase, context.validator, rebaseConfig);

  return allowsAnyImports(parentInlinerContext.inline) ?
    inline$1(tokens, context, parentInlinerContext, callback) :
    callback(tokens);
}

function allowsAnyImports(inline) {
  return !(inline.length == 1 && inline[0] == 'none');
}

function inline$1(tokens, externalContext, parentInlinerContext, callback) {
  var inlinerContext = {
    afterContent: false,
    callback: callback,
    errors: externalContext.errors,
    externalContext: externalContext,
    fetch: externalContext.options.fetch,
    inlinedStylesheets: parentInlinerContext.inlinedStylesheets || externalContext.inlinedStylesheets,
    inline: parentInlinerContext.inline,
    inlineRequest: externalContext.options.inlineRequest,
    inlineTimeout: externalContext.options.inlineTimeout,
    isRemote: parentInlinerContext.isRemote || false,
    localOnly: externalContext.localOnly,
    outputTokens: [],
    rebaseTo: externalContext.options.rebaseTo,
    sourceTokens: tokens,
    warnings: externalContext.warnings
  };

  return doInlineImports(inlinerContext);
}

function doInlineImports(inlinerContext) {
  var token$1;
  var i, l;

  for (i = 0, l = inlinerContext.sourceTokens.length; i < l; i++) {
    token$1 = inlinerContext.sourceTokens[i];

    if (token$1[0] == token.AT_RULE && isImport_1(token$1[1])) {
      inlinerContext.sourceTokens.splice(0, i);
      return inlineStylesheet(token$1, inlinerContext);
    } else if (token$1[0] == token.AT_RULE || token$1[0] == token.COMMENT) {
      inlinerContext.outputTokens.push(token$1);
    } else {
      inlinerContext.outputTokens.push(token$1);
      inlinerContext.afterContent = true;
    }
  }

  inlinerContext.sourceTokens = [];
  return inlinerContext.callback(inlinerContext.outputTokens);
}

function inlineStylesheet(token, inlinerContext) {
  var uriAndMediaQuery = extractImportUrlAndMedia_1(token[1]);
  var uri = uriAndMediaQuery[0];
  var mediaQuery = uriAndMediaQuery[1];
  var metadata = token[2];

  return isRemoteResource_1(uri) ?
    inlineRemoteStylesheet(uri, mediaQuery, metadata, inlinerContext) :
    inlineLocalStylesheet(uri, mediaQuery, metadata, inlinerContext);
}

function inlineRemoteStylesheet(uri, mediaQuery, metadata, inlinerContext) {
  var isAllowed = isAllowedResource_1(uri, true, inlinerContext.inline);
  var originalUri = uri;
  var isLoaded = uri in inlinerContext.externalContext.sourcesContent;
  var isRuntimeResource = !hasProtocol_1(uri);

  if (inlinerContext.inlinedStylesheets.indexOf(uri) > -1) {
    inlinerContext.warnings.push('Ignoring remote @import of "' + uri + '" as it has already been imported.');
    inlinerContext.sourceTokens = inlinerContext.sourceTokens.slice(1);
    return doInlineImports(inlinerContext);
  } else if (inlinerContext.localOnly && inlinerContext.afterContent) {
    inlinerContext.warnings.push('Ignoring remote @import of "' + uri + '" as no callback given and after other content.');
    inlinerContext.sourceTokens = inlinerContext.sourceTokens.slice(1);
    return doInlineImports(inlinerContext);
  } else if (isRuntimeResource) {
    inlinerContext.warnings.push('Skipping remote @import of "' + uri + '" as no protocol given.');
    inlinerContext.outputTokens = inlinerContext.outputTokens.concat(inlinerContext.sourceTokens.slice(0, 1));
    inlinerContext.sourceTokens = inlinerContext.sourceTokens.slice(1);
    return doInlineImports(inlinerContext);
  } else if (inlinerContext.localOnly && !isLoaded) {
    inlinerContext.warnings.push('Skipping remote @import of "' + uri + '" as no callback given.');
    inlinerContext.outputTokens = inlinerContext.outputTokens.concat(inlinerContext.sourceTokens.slice(0, 1));
    inlinerContext.sourceTokens = inlinerContext.sourceTokens.slice(1);
    return doInlineImports(inlinerContext);
  } else if (!isAllowed && inlinerContext.afterContent) {
    inlinerContext.warnings.push('Ignoring remote @import of "' + uri + '" as resource is not allowed and after other content.');
    inlinerContext.sourceTokens = inlinerContext.sourceTokens.slice(1);
    return doInlineImports(inlinerContext);
  } else if (!isAllowed) {
    inlinerContext.warnings.push('Skipping remote @import of "' + uri + '" as resource is not allowed.');
    inlinerContext.outputTokens = inlinerContext.outputTokens.concat(inlinerContext.sourceTokens.slice(0, 1));
    inlinerContext.sourceTokens = inlinerContext.sourceTokens.slice(1);
    return doInlineImports(inlinerContext);
  }

  inlinerContext.inlinedStylesheets.push(uri);

  function whenLoaded(error, importedStyles) {
    if (error) {
      inlinerContext.errors.push('Broken @import declaration of "' + uri + '" - ' + error);

      return process.nextTick(function () {
        inlinerContext.outputTokens = inlinerContext.outputTokens.concat(inlinerContext.sourceTokens.slice(0, 1));
        inlinerContext.sourceTokens = inlinerContext.sourceTokens.slice(1);
        doInlineImports(inlinerContext);
      });
    }

    inlinerContext.inline = inlinerContext.externalContext.options.inline;
    inlinerContext.isRemote = true;

    inlinerContext.externalContext.source = originalUri;
    inlinerContext.externalContext.sourcesContent[uri] = importedStyles;
    inlinerContext.externalContext.stats.originalSize += importedStyles.length;

    return fromStyles(importedStyles, inlinerContext.externalContext, inlinerContext, function (importedTokens) {
      importedTokens = wrapInMedia(importedTokens, mediaQuery, metadata);

      inlinerContext.outputTokens = inlinerContext.outputTokens.concat(importedTokens);
      inlinerContext.sourceTokens = inlinerContext.sourceTokens.slice(1);

      return doInlineImports(inlinerContext);
    });
  }

  return isLoaded ?
    whenLoaded(null, inlinerContext.externalContext.sourcesContent[uri]) :
    inlinerContext.fetch(uri, inlinerContext.inlineRequest, inlinerContext.inlineTimeout, whenLoaded);
}

function inlineLocalStylesheet(uri, mediaQuery, metadata, inlinerContext) {
  var currentPath = path$2.resolve('');
  var absoluteUri = path$2.isAbsolute(uri) ?
    path$2.resolve(currentPath, uri[0] == '/' ? uri.substring(1) : uri) :
    path$2.resolve(inlinerContext.rebaseTo, uri);
  var relativeToCurrentPath = path$2.relative(currentPath, absoluteUri);
  var importedStyles;
  var isAllowed = isAllowedResource_1(uri, false, inlinerContext.inline);
  var normalizedPath = normalizePath_1(relativeToCurrentPath);
  var isLoaded = normalizedPath in inlinerContext.externalContext.sourcesContent;

  if (inlinerContext.inlinedStylesheets.indexOf(absoluteUri) > -1) {
    inlinerContext.warnings.push('Ignoring local @import of "' + uri + '" as it has already been imported.');
  } else if (!isLoaded && (!fs.existsSync(absoluteUri) || !fs.statSync(absoluteUri).isFile())) {
    inlinerContext.errors.push('Ignoring local @import of "' + uri + '" as resource is missing.');
  } else if (!isAllowed && inlinerContext.afterContent) {
    inlinerContext.warnings.push('Ignoring local @import of "' + uri + '" as resource is not allowed and after other content.');
  } else if (inlinerContext.afterContent) {
    inlinerContext.warnings.push('Ignoring local @import of "' + uri + '" as after other content.');
  } else if (!isAllowed) {
    inlinerContext.warnings.push('Skipping local @import of "' + uri + '" as resource is not allowed.');
    inlinerContext.outputTokens = inlinerContext.outputTokens.concat(inlinerContext.sourceTokens.slice(0, 1));
  } else {
    importedStyles = isLoaded ?
      inlinerContext.externalContext.sourcesContent[normalizedPath] :
      fs.readFileSync(absoluteUri, 'utf-8');

    inlinerContext.inlinedStylesheets.push(absoluteUri);
    inlinerContext.inline = inlinerContext.externalContext.options.inline;

    inlinerContext.externalContext.source = normalizedPath;
    inlinerContext.externalContext.sourcesContent[normalizedPath] = importedStyles;
    inlinerContext.externalContext.stats.originalSize += importedStyles.length;

    return fromStyles(importedStyles, inlinerContext.externalContext, inlinerContext, function (importedTokens) {
      importedTokens = wrapInMedia(importedTokens, mediaQuery, metadata);

      inlinerContext.outputTokens = inlinerContext.outputTokens.concat(importedTokens);
      inlinerContext.sourceTokens = inlinerContext.sourceTokens.slice(1);

      return doInlineImports(inlinerContext);
    });
  }

  inlinerContext.sourceTokens = inlinerContext.sourceTokens.slice(1);

  return doInlineImports(inlinerContext);
}

function wrapInMedia(tokens, mediaQuery, metadata) {
  if (mediaQuery) {
    return [[token.NESTED_BLOCK, [[token.NESTED_BLOCK_SCOPE, '@media ' + mediaQuery, metadata]], tokens]];
  } else {
    return tokens;
  }
}

var readSources_1 = readSources;

var all$3 = helpers.all;

function store$1(serializeContext, token) {
  var value = typeof token == 'string' ?
    token :
    token[1];
  var wrap = serializeContext.wrap;

  wrap(serializeContext, value);
  track$1(serializeContext, value);
  serializeContext.output.push(value);
}

function wrap(serializeContext, value) {
  if (serializeContext.column + value.length > serializeContext.format.wrapAt) {
    track$1(serializeContext, serializeContext.format.breakWith);
    serializeContext.output.push(serializeContext.format.breakWith);
  }
}

function track$1(serializeContext, value) {
  var parts = value.split('\n');

  serializeContext.line += parts.length - 1;
  serializeContext.column = parts.length > 1 ? 0 : (serializeContext.column + parts.pop().length);
}

function serializeStyles(tokens, context) {
  var serializeContext = {
    column: 0,
    format: context.options.format,
    indentBy: 0,
    indentWith: '',
    line: 1,
    output: [],
    spaceAfterClosingBrace: context.options.compatibility.properties.spaceAfterClosingBrace,
    store: store$1,
    wrap: context.options.format.wrapAt ?
      wrap :
      function () { /* noop */  }
  };

  all$3(serializeContext, tokens);

  return {
    styles: serializeContext.output.join('')
  };
}

var simple = serializeStyles;

var SourceMapGenerator$3 = sourceMap.SourceMapGenerator;
var all$4 = helpers.all;



var isWindows$1 = process.platform == 'win32';

var NIX_SEPARATOR_PATTERN = /\//g;
var UNKNOWN_SOURCE = '$stdin';
var WINDOWS_SEPARATOR = '\\';

function store$2(serializeContext, element) {
  var fromString = typeof element == 'string';
  var value = fromString ? element : element[1];
  var mappings = fromString ? null : element[2];
  var wrap = serializeContext.wrap;

  wrap(serializeContext, value);
  track$2(serializeContext, value, mappings);
  serializeContext.output.push(value);
}

function wrap$1(serializeContext, value) {
  if (serializeContext.column + value.length > serializeContext.format.wrapAt) {
    track$2(serializeContext, serializeContext.format.breakWith, false);
    serializeContext.output.push(serializeContext.format.breakWith);
  }
}

function track$2(serializeContext, value, mappings) {
  var parts = value.split('\n');

  if (mappings) {
    trackAllMappings(serializeContext, mappings);
  }

  serializeContext.line += parts.length - 1;
  serializeContext.column = parts.length > 1 ? 0 : (serializeContext.column + parts.pop().length);
}

function trackAllMappings(serializeContext, mappings) {
  for (var i = 0, l = mappings.length; i < l; i++) {
    trackMapping(serializeContext, mappings[i]);
  }
}

function trackMapping(serializeContext, mapping) {
  var line = mapping[0];
  var column = mapping[1];
  var originalSource = mapping[2];
  var source = originalSource;
  var storedSource = source || UNKNOWN_SOURCE;

  if (isWindows$1 && source && !isRemoteResource_1(source)) {
    storedSource = source.replace(NIX_SEPARATOR_PATTERN, WINDOWS_SEPARATOR);
  }

  serializeContext.outputMap.addMapping({
    generated: {
      line: serializeContext.line,
      column: serializeContext.column
    },
    source: storedSource,
    original: {
      line: line,
      column: column
    }
  });

  if (serializeContext.inlineSources && (originalSource in serializeContext.sourcesContent)) {
    serializeContext.outputMap.setSourceContent(storedSource, serializeContext.sourcesContent[originalSource]);
  }
}

function serializeStylesAndSourceMap(tokens, context) {
  var serializeContext = {
    column: 0,
    format: context.options.format,
    indentBy: 0,
    indentWith: '',
    inlineSources: context.options.sourceMapInlineSources,
    line: 1,
    output: [],
    outputMap: new SourceMapGenerator$3(),
    sourcesContent: context.sourcesContent,
    spaceAfterClosingBrace: context.options.compatibility.properties.spaceAfterClosingBrace,
    store: store$2,
    wrap: context.options.format.wrapAt ?
      wrap$1 :
      function () { /* noop */  }
  };

  all$4(serializeContext, tokens);

  return {
    sourceMap: serializeContext.outputMap,
    styles: serializeContext.output.join('')
  };
}

var sourceMaps = serializeStylesAndSourceMap;

var clean = createCommonjsModule(function (module) {
/**
 * Clean-css - https://github.com/jakubpawlowicz/clean-css
 * Released under the terms of MIT license
 *
 * Copyright (C) 2017 JakubPawlowicz.com
 */








var formatFrom = format.formatFrom;



var OptimizationLevel = optimizationLevel.OptimizationLevel;
var optimizationLevelFrom = optimizationLevel.optimizationLevelFrom;









var CleanCSS = module.exports = function CleanCSS(options) {
  options = options || {};

  this.options = {
    compatibility: compatibility(options.compatibility),
    fetch: fetch(options.fetch),
    format: formatFrom(options.format),
    inline: inline(options.inline),
    inlineRequest: inlineRequest(options.inlineRequest),
    inlineTimeout: inlineTimeout(options.inlineTimeout),
    level: optimizationLevelFrom(options.level),
    rebase: rebase(options.rebase),
    rebaseTo: rebaseTo(options.rebaseTo),
    returnPromise: !!options.returnPromise,
    sourceMap: !!options.sourceMap,
    sourceMapInlineSources: !!options.sourceMapInlineSources
  };
};


// for compatibility with optimize-css-assets-webpack-plugin
CleanCSS.process = function (input, opts) {
  var cleanCss;
  var optsTo = opts.to;

  delete opts.to;
  cleanCss = new CleanCSS(Object.assign({ returnPromise: true, rebaseTo: optsTo }, opts));

  return cleanCss.minify(input)
    .then(function(output) {
      return { css: output.styles };
    });
};


CleanCSS.prototype.minify = function (input, maybeSourceMap, maybeCallback) {
  var options = this.options;

  if (options.returnPromise) {
    return new Promise(function (resolve, reject) {
      minify(input, options, maybeSourceMap, function (errors, output) {
        return errors ?
          reject(errors) :
          resolve(output);
      });
    });
  } else {
    return minify(input, options, maybeSourceMap, maybeCallback);
  }
};

function minify(input, options, maybeSourceMap, maybeCallback) {
  var sourceMap = typeof maybeSourceMap != 'function' ?
    maybeSourceMap :
    null;
  var callback = typeof maybeCallback == 'function' ?
    maybeCallback :
    (typeof maybeSourceMap == 'function' ? maybeSourceMap : null);
  var context = {
    stats: {
      efficiency: 0,
      minifiedSize: 0,
      originalSize: 0,
      startedAt: Date.now(),
      timeSpent: 0
    },
    cache: {
      specificity: {}
    },
    errors: [],
    inlinedStylesheets: [],
    inputSourceMapTracker: inputSourceMapTracker_1(),
    localOnly: !callback,
    options: options,
    source: null,
    sourcesContent: {},
    validator: validator_1(options.compatibility),
    warnings: []
  };

  if (sourceMap) {
    context.inputSourceMapTracker.track(undefined, sourceMap);
  }

  return runner(context.localOnly)(function () {
    return readSources_1(input, context, function (tokens) {
      var serialize = context.options.sourceMap ?
        sourceMaps :
        simple;

      var optimizedTokens = optimize$2(tokens, context);
      var optimizedStyles = serialize(optimizedTokens, context);
      var output = withMetadata(optimizedStyles, context);

      return callback ?
        callback(context.errors.length > 0 ? context.errors : null, output) :
        output;
    });
  });
}

function runner(localOnly) {
  // to always execute code asynchronously when a callback is given
  // more at blog.izs.me/post/59142742143/designing-apis-for-asynchrony
  return localOnly ?
    function (callback) { return callback(); } :
    process.nextTick;
}

function optimize$2(tokens, context) {
  var optimized;

  optimized = optimize(tokens);
  optimized = OptimizationLevel.One in context.options.level ?
    optimize$1(tokens, context) :
    tokens;
  optimized = OptimizationLevel.Two in context.options.level ?
    optimize$3(tokens, context, true) :
    optimized;

  return optimized;
}

function withMetadata(output, context) {
  output.stats = calculateStatsFrom(output.styles, context);
  output.errors = context.errors;
  output.inlinedStylesheets = context.inlinedStylesheets;
  output.warnings = context.warnings;

  return output;
}

function calculateStatsFrom(styles, context) {
  var finishedAt = Date.now();
  var timeSpent = finishedAt - context.stats.startedAt;

  delete context.stats.startedAt;
  context.stats.timeSpent = timeSpent;
  context.stats.efficiency = 1 - styles.length / context.stats.originalSize;
  context.stats.minifiedSize = styles.length;

  return context.stats;
}
});

var he = createCommonjsModule(function (module, exports) {
(function(root) {

	// Detect free variables `exports`.
	var freeExports =  exports;

	// Detect free variable `module`.
	var freeModule =  module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`.
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	// All astral symbols.
	var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
	// All ASCII symbols (not just printable ASCII) except those listed in the
	// first column of the overrides table.
	// https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides
	var regexAsciiWhitelist = /[\x01-\x7F]/g;
	// All BMP symbols that are not ASCII newlines, printable ASCII symbols, or
	// code points listed in the first column of the overrides table on
	// https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides.
	var regexBmpWhitelist = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;

	var regexEncodeNonAscii = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g;
	var encodeMap = {'\xAD':'shy','\u200C':'zwnj','\u200D':'zwj','\u200E':'lrm','\u2063':'ic','\u2062':'it','\u2061':'af','\u200F':'rlm','\u200B':'ZeroWidthSpace','\u2060':'NoBreak','\u0311':'DownBreve','\u20DB':'tdot','\u20DC':'DotDot','\t':'Tab','\n':'NewLine','\u2008':'puncsp','\u205F':'MediumSpace','\u2009':'thinsp','\u200A':'hairsp','\u2004':'emsp13','\u2002':'ensp','\u2005':'emsp14','\u2003':'emsp','\u2007':'numsp','\xA0':'nbsp','\u205F\u200A':'ThickSpace','\u203E':'oline','_':'lowbar','\u2010':'dash','\u2013':'ndash','\u2014':'mdash','\u2015':'horbar',',':'comma',';':'semi','\u204F':'bsemi',':':'colon','\u2A74':'Colone','!':'excl','\xA1':'iexcl','?':'quest','\xBF':'iquest','.':'period','\u2025':'nldr','\u2026':'mldr','\xB7':'middot','\'':'apos','\u2018':'lsquo','\u2019':'rsquo','\u201A':'sbquo','\u2039':'lsaquo','\u203A':'rsaquo','"':'quot','\u201C':'ldquo','\u201D':'rdquo','\u201E':'bdquo','\xAB':'laquo','\xBB':'raquo','(':'lpar',')':'rpar','[':'lsqb',']':'rsqb','{':'lcub','}':'rcub','\u2308':'lceil','\u2309':'rceil','\u230A':'lfloor','\u230B':'rfloor','\u2985':'lopar','\u2986':'ropar','\u298B':'lbrke','\u298C':'rbrke','\u298D':'lbrkslu','\u298E':'rbrksld','\u298F':'lbrksld','\u2990':'rbrkslu','\u2991':'langd','\u2992':'rangd','\u2993':'lparlt','\u2994':'rpargt','\u2995':'gtlPar','\u2996':'ltrPar','\u27E6':'lobrk','\u27E7':'robrk','\u27E8':'lang','\u27E9':'rang','\u27EA':'Lang','\u27EB':'Rang','\u27EC':'loang','\u27ED':'roang','\u2772':'lbbrk','\u2773':'rbbrk','\u2016':'Vert','\xA7':'sect','\xB6':'para','@':'commat','*':'ast','/':'sol','undefined':null,'&':'amp','#':'num','%':'percnt','\u2030':'permil','\u2031':'pertenk','\u2020':'dagger','\u2021':'Dagger','\u2022':'bull','\u2043':'hybull','\u2032':'prime','\u2033':'Prime','\u2034':'tprime','\u2057':'qprime','\u2035':'bprime','\u2041':'caret','`':'grave','\xB4':'acute','\u02DC':'tilde','^':'Hat','\xAF':'macr','\u02D8':'breve','\u02D9':'dot','\xA8':'die','\u02DA':'ring','\u02DD':'dblac','\xB8':'cedil','\u02DB':'ogon','\u02C6':'circ','\u02C7':'caron','\xB0':'deg','\xA9':'copy','\xAE':'reg','\u2117':'copysr','\u2118':'wp','\u211E':'rx','\u2127':'mho','\u2129':'iiota','\u2190':'larr','\u219A':'nlarr','\u2192':'rarr','\u219B':'nrarr','\u2191':'uarr','\u2193':'darr','\u2194':'harr','\u21AE':'nharr','\u2195':'varr','\u2196':'nwarr','\u2197':'nearr','\u2198':'searr','\u2199':'swarr','\u219D':'rarrw','\u219D\u0338':'nrarrw','\u219E':'Larr','\u219F':'Uarr','\u21A0':'Rarr','\u21A1':'Darr','\u21A2':'larrtl','\u21A3':'rarrtl','\u21A4':'mapstoleft','\u21A5':'mapstoup','\u21A6':'map','\u21A7':'mapstodown','\u21A9':'larrhk','\u21AA':'rarrhk','\u21AB':'larrlp','\u21AC':'rarrlp','\u21AD':'harrw','\u21B0':'lsh','\u21B1':'rsh','\u21B2':'ldsh','\u21B3':'rdsh','\u21B5':'crarr','\u21B6':'cularr','\u21B7':'curarr','\u21BA':'olarr','\u21BB':'orarr','\u21BC':'lharu','\u21BD':'lhard','\u21BE':'uharr','\u21BF':'uharl','\u21C0':'rharu','\u21C1':'rhard','\u21C2':'dharr','\u21C3':'dharl','\u21C4':'rlarr','\u21C5':'udarr','\u21C6':'lrarr','\u21C7':'llarr','\u21C8':'uuarr','\u21C9':'rrarr','\u21CA':'ddarr','\u21CB':'lrhar','\u21CC':'rlhar','\u21D0':'lArr','\u21CD':'nlArr','\u21D1':'uArr','\u21D2':'rArr','\u21CF':'nrArr','\u21D3':'dArr','\u21D4':'iff','\u21CE':'nhArr','\u21D5':'vArr','\u21D6':'nwArr','\u21D7':'neArr','\u21D8':'seArr','\u21D9':'swArr','\u21DA':'lAarr','\u21DB':'rAarr','\u21DD':'zigrarr','\u21E4':'larrb','\u21E5':'rarrb','\u21F5':'duarr','\u21FD':'loarr','\u21FE':'roarr','\u21FF':'hoarr','\u2200':'forall','\u2201':'comp','\u2202':'part','\u2202\u0338':'npart','\u2203':'exist','\u2204':'nexist','\u2205':'empty','\u2207':'Del','\u2208':'in','\u2209':'notin','\u220B':'ni','\u220C':'notni','\u03F6':'bepsi','\u220F':'prod','\u2210':'coprod','\u2211':'sum','+':'plus','\xB1':'pm','\xF7':'div','\xD7':'times','<':'lt','\u226E':'nlt','<\u20D2':'nvlt','=':'equals','\u2260':'ne','=\u20E5':'bne','\u2A75':'Equal','>':'gt','\u226F':'ngt','>\u20D2':'nvgt','\xAC':'not','|':'vert','\xA6':'brvbar','\u2212':'minus','\u2213':'mp','\u2214':'plusdo','\u2044':'frasl','\u2216':'setmn','\u2217':'lowast','\u2218':'compfn','\u221A':'Sqrt','\u221D':'prop','\u221E':'infin','\u221F':'angrt','\u2220':'ang','\u2220\u20D2':'nang','\u2221':'angmsd','\u2222':'angsph','\u2223':'mid','\u2224':'nmid','\u2225':'par','\u2226':'npar','\u2227':'and','\u2228':'or','\u2229':'cap','\u2229\uFE00':'caps','\u222A':'cup','\u222A\uFE00':'cups','\u222B':'int','\u222C':'Int','\u222D':'tint','\u2A0C':'qint','\u222E':'oint','\u222F':'Conint','\u2230':'Cconint','\u2231':'cwint','\u2232':'cwconint','\u2233':'awconint','\u2234':'there4','\u2235':'becaus','\u2236':'ratio','\u2237':'Colon','\u2238':'minusd','\u223A':'mDDot','\u223B':'homtht','\u223C':'sim','\u2241':'nsim','\u223C\u20D2':'nvsim','\u223D':'bsim','\u223D\u0331':'race','\u223E':'ac','\u223E\u0333':'acE','\u223F':'acd','\u2240':'wr','\u2242':'esim','\u2242\u0338':'nesim','\u2243':'sime','\u2244':'nsime','\u2245':'cong','\u2247':'ncong','\u2246':'simne','\u2248':'ap','\u2249':'nap','\u224A':'ape','\u224B':'apid','\u224B\u0338':'napid','\u224C':'bcong','\u224D':'CupCap','\u226D':'NotCupCap','\u224D\u20D2':'nvap','\u224E':'bump','\u224E\u0338':'nbump','\u224F':'bumpe','\u224F\u0338':'nbumpe','\u2250':'doteq','\u2250\u0338':'nedot','\u2251':'eDot','\u2252':'efDot','\u2253':'erDot','\u2254':'colone','\u2255':'ecolon','\u2256':'ecir','\u2257':'cire','\u2259':'wedgeq','\u225A':'veeeq','\u225C':'trie','\u225F':'equest','\u2261':'equiv','\u2262':'nequiv','\u2261\u20E5':'bnequiv','\u2264':'le','\u2270':'nle','\u2264\u20D2':'nvle','\u2265':'ge','\u2271':'nge','\u2265\u20D2':'nvge','\u2266':'lE','\u2266\u0338':'nlE','\u2267':'gE','\u2267\u0338':'ngE','\u2268\uFE00':'lvnE','\u2268':'lnE','\u2269':'gnE','\u2269\uFE00':'gvnE','\u226A':'ll','\u226A\u0338':'nLtv','\u226A\u20D2':'nLt','\u226B':'gg','\u226B\u0338':'nGtv','\u226B\u20D2':'nGt','\u226C':'twixt','\u2272':'lsim','\u2274':'nlsim','\u2273':'gsim','\u2275':'ngsim','\u2276':'lg','\u2278':'ntlg','\u2277':'gl','\u2279':'ntgl','\u227A':'pr','\u2280':'npr','\u227B':'sc','\u2281':'nsc','\u227C':'prcue','\u22E0':'nprcue','\u227D':'sccue','\u22E1':'nsccue','\u227E':'prsim','\u227F':'scsim','\u227F\u0338':'NotSucceedsTilde','\u2282':'sub','\u2284':'nsub','\u2282\u20D2':'vnsub','\u2283':'sup','\u2285':'nsup','\u2283\u20D2':'vnsup','\u2286':'sube','\u2288':'nsube','\u2287':'supe','\u2289':'nsupe','\u228A\uFE00':'vsubne','\u228A':'subne','\u228B\uFE00':'vsupne','\u228B':'supne','\u228D':'cupdot','\u228E':'uplus','\u228F':'sqsub','\u228F\u0338':'NotSquareSubset','\u2290':'sqsup','\u2290\u0338':'NotSquareSuperset','\u2291':'sqsube','\u22E2':'nsqsube','\u2292':'sqsupe','\u22E3':'nsqsupe','\u2293':'sqcap','\u2293\uFE00':'sqcaps','\u2294':'sqcup','\u2294\uFE00':'sqcups','\u2295':'oplus','\u2296':'ominus','\u2297':'otimes','\u2298':'osol','\u2299':'odot','\u229A':'ocir','\u229B':'oast','\u229D':'odash','\u229E':'plusb','\u229F':'minusb','\u22A0':'timesb','\u22A1':'sdotb','\u22A2':'vdash','\u22AC':'nvdash','\u22A3':'dashv','\u22A4':'top','\u22A5':'bot','\u22A7':'models','\u22A8':'vDash','\u22AD':'nvDash','\u22A9':'Vdash','\u22AE':'nVdash','\u22AA':'Vvdash','\u22AB':'VDash','\u22AF':'nVDash','\u22B0':'prurel','\u22B2':'vltri','\u22EA':'nltri','\u22B3':'vrtri','\u22EB':'nrtri','\u22B4':'ltrie','\u22EC':'nltrie','\u22B4\u20D2':'nvltrie','\u22B5':'rtrie','\u22ED':'nrtrie','\u22B5\u20D2':'nvrtrie','\u22B6':'origof','\u22B7':'imof','\u22B8':'mumap','\u22B9':'hercon','\u22BA':'intcal','\u22BB':'veebar','\u22BD':'barvee','\u22BE':'angrtvb','\u22BF':'lrtri','\u22C0':'Wedge','\u22C1':'Vee','\u22C2':'xcap','\u22C3':'xcup','\u22C4':'diam','\u22C5':'sdot','\u22C6':'Star','\u22C7':'divonx','\u22C8':'bowtie','\u22C9':'ltimes','\u22CA':'rtimes','\u22CB':'lthree','\u22CC':'rthree','\u22CD':'bsime','\u22CE':'cuvee','\u22CF':'cuwed','\u22D0':'Sub','\u22D1':'Sup','\u22D2':'Cap','\u22D3':'Cup','\u22D4':'fork','\u22D5':'epar','\u22D6':'ltdot','\u22D7':'gtdot','\u22D8':'Ll','\u22D8\u0338':'nLl','\u22D9':'Gg','\u22D9\u0338':'nGg','\u22DA\uFE00':'lesg','\u22DA':'leg','\u22DB':'gel','\u22DB\uFE00':'gesl','\u22DE':'cuepr','\u22DF':'cuesc','\u22E6':'lnsim','\u22E7':'gnsim','\u22E8':'prnsim','\u22E9':'scnsim','\u22EE':'vellip','\u22EF':'ctdot','\u22F0':'utdot','\u22F1':'dtdot','\u22F2':'disin','\u22F3':'isinsv','\u22F4':'isins','\u22F5':'isindot','\u22F5\u0338':'notindot','\u22F6':'notinvc','\u22F7':'notinvb','\u22F9':'isinE','\u22F9\u0338':'notinE','\u22FA':'nisd','\u22FB':'xnis','\u22FC':'nis','\u22FD':'notnivc','\u22FE':'notnivb','\u2305':'barwed','\u2306':'Barwed','\u230C':'drcrop','\u230D':'dlcrop','\u230E':'urcrop','\u230F':'ulcrop','\u2310':'bnot','\u2312':'profline','\u2313':'profsurf','\u2315':'telrec','\u2316':'target','\u231C':'ulcorn','\u231D':'urcorn','\u231E':'dlcorn','\u231F':'drcorn','\u2322':'frown','\u2323':'smile','\u232D':'cylcty','\u232E':'profalar','\u2336':'topbot','\u233D':'ovbar','\u233F':'solbar','\u237C':'angzarr','\u23B0':'lmoust','\u23B1':'rmoust','\u23B4':'tbrk','\u23B5':'bbrk','\u23B6':'bbrktbrk','\u23DC':'OverParenthesis','\u23DD':'UnderParenthesis','\u23DE':'OverBrace','\u23DF':'UnderBrace','\u23E2':'trpezium','\u23E7':'elinters','\u2423':'blank','\u2500':'boxh','\u2502':'boxv','\u250C':'boxdr','\u2510':'boxdl','\u2514':'boxur','\u2518':'boxul','\u251C':'boxvr','\u2524':'boxvl','\u252C':'boxhd','\u2534':'boxhu','\u253C':'boxvh','\u2550':'boxH','\u2551':'boxV','\u2552':'boxdR','\u2553':'boxDr','\u2554':'boxDR','\u2555':'boxdL','\u2556':'boxDl','\u2557':'boxDL','\u2558':'boxuR','\u2559':'boxUr','\u255A':'boxUR','\u255B':'boxuL','\u255C':'boxUl','\u255D':'boxUL','\u255E':'boxvR','\u255F':'boxVr','\u2560':'boxVR','\u2561':'boxvL','\u2562':'boxVl','\u2563':'boxVL','\u2564':'boxHd','\u2565':'boxhD','\u2566':'boxHD','\u2567':'boxHu','\u2568':'boxhU','\u2569':'boxHU','\u256A':'boxvH','\u256B':'boxVh','\u256C':'boxVH','\u2580':'uhblk','\u2584':'lhblk','\u2588':'block','\u2591':'blk14','\u2592':'blk12','\u2593':'blk34','\u25A1':'squ','\u25AA':'squf','\u25AB':'EmptyVerySmallSquare','\u25AD':'rect','\u25AE':'marker','\u25B1':'fltns','\u25B3':'xutri','\u25B4':'utrif','\u25B5':'utri','\u25B8':'rtrif','\u25B9':'rtri','\u25BD':'xdtri','\u25BE':'dtrif','\u25BF':'dtri','\u25C2':'ltrif','\u25C3':'ltri','\u25CA':'loz','\u25CB':'cir','\u25EC':'tridot','\u25EF':'xcirc','\u25F8':'ultri','\u25F9':'urtri','\u25FA':'lltri','\u25FB':'EmptySmallSquare','\u25FC':'FilledSmallSquare','\u2605':'starf','\u2606':'star','\u260E':'phone','\u2640':'female','\u2642':'male','\u2660':'spades','\u2663':'clubs','\u2665':'hearts','\u2666':'diams','\u266A':'sung','\u2713':'check','\u2717':'cross','\u2720':'malt','\u2736':'sext','\u2758':'VerticalSeparator','\u27C8':'bsolhsub','\u27C9':'suphsol','\u27F5':'xlarr','\u27F6':'xrarr','\u27F7':'xharr','\u27F8':'xlArr','\u27F9':'xrArr','\u27FA':'xhArr','\u27FC':'xmap','\u27FF':'dzigrarr','\u2902':'nvlArr','\u2903':'nvrArr','\u2904':'nvHarr','\u2905':'Map','\u290C':'lbarr','\u290D':'rbarr','\u290E':'lBarr','\u290F':'rBarr','\u2910':'RBarr','\u2911':'DDotrahd','\u2912':'UpArrowBar','\u2913':'DownArrowBar','\u2916':'Rarrtl','\u2919':'latail','\u291A':'ratail','\u291B':'lAtail','\u291C':'rAtail','\u291D':'larrfs','\u291E':'rarrfs','\u291F':'larrbfs','\u2920':'rarrbfs','\u2923':'nwarhk','\u2924':'nearhk','\u2925':'searhk','\u2926':'swarhk','\u2927':'nwnear','\u2928':'toea','\u2929':'tosa','\u292A':'swnwar','\u2933':'rarrc','\u2933\u0338':'nrarrc','\u2935':'cudarrr','\u2936':'ldca','\u2937':'rdca','\u2938':'cudarrl','\u2939':'larrpl','\u293C':'curarrm','\u293D':'cularrp','\u2945':'rarrpl','\u2948':'harrcir','\u2949':'Uarrocir','\u294A':'lurdshar','\u294B':'ldrushar','\u294E':'LeftRightVector','\u294F':'RightUpDownVector','\u2950':'DownLeftRightVector','\u2951':'LeftUpDownVector','\u2952':'LeftVectorBar','\u2953':'RightVectorBar','\u2954':'RightUpVectorBar','\u2955':'RightDownVectorBar','\u2956':'DownLeftVectorBar','\u2957':'DownRightVectorBar','\u2958':'LeftUpVectorBar','\u2959':'LeftDownVectorBar','\u295A':'LeftTeeVector','\u295B':'RightTeeVector','\u295C':'RightUpTeeVector','\u295D':'RightDownTeeVector','\u295E':'DownLeftTeeVector','\u295F':'DownRightTeeVector','\u2960':'LeftUpTeeVector','\u2961':'LeftDownTeeVector','\u2962':'lHar','\u2963':'uHar','\u2964':'rHar','\u2965':'dHar','\u2966':'luruhar','\u2967':'ldrdhar','\u2968':'ruluhar','\u2969':'rdldhar','\u296A':'lharul','\u296B':'llhard','\u296C':'rharul','\u296D':'lrhard','\u296E':'udhar','\u296F':'duhar','\u2970':'RoundImplies','\u2971':'erarr','\u2972':'simrarr','\u2973':'larrsim','\u2974':'rarrsim','\u2975':'rarrap','\u2976':'ltlarr','\u2978':'gtrarr','\u2979':'subrarr','\u297B':'suplarr','\u297C':'lfisht','\u297D':'rfisht','\u297E':'ufisht','\u297F':'dfisht','\u299A':'vzigzag','\u299C':'vangrt','\u299D':'angrtvbd','\u29A4':'ange','\u29A5':'range','\u29A6':'dwangle','\u29A7':'uwangle','\u29A8':'angmsdaa','\u29A9':'angmsdab','\u29AA':'angmsdac','\u29AB':'angmsdad','\u29AC':'angmsdae','\u29AD':'angmsdaf','\u29AE':'angmsdag','\u29AF':'angmsdah','\u29B0':'bemptyv','\u29B1':'demptyv','\u29B2':'cemptyv','\u29B3':'raemptyv','\u29B4':'laemptyv','\u29B5':'ohbar','\u29B6':'omid','\u29B7':'opar','\u29B9':'operp','\u29BB':'olcross','\u29BC':'odsold','\u29BE':'olcir','\u29BF':'ofcir','\u29C0':'olt','\u29C1':'ogt','\u29C2':'cirscir','\u29C3':'cirE','\u29C4':'solb','\u29C5':'bsolb','\u29C9':'boxbox','\u29CD':'trisb','\u29CE':'rtriltri','\u29CF':'LeftTriangleBar','\u29CF\u0338':'NotLeftTriangleBar','\u29D0':'RightTriangleBar','\u29D0\u0338':'NotRightTriangleBar','\u29DC':'iinfin','\u29DD':'infintie','\u29DE':'nvinfin','\u29E3':'eparsl','\u29E4':'smeparsl','\u29E5':'eqvparsl','\u29EB':'lozf','\u29F4':'RuleDelayed','\u29F6':'dsol','\u2A00':'xodot','\u2A01':'xoplus','\u2A02':'xotime','\u2A04':'xuplus','\u2A06':'xsqcup','\u2A0D':'fpartint','\u2A10':'cirfnint','\u2A11':'awint','\u2A12':'rppolint','\u2A13':'scpolint','\u2A14':'npolint','\u2A15':'pointint','\u2A16':'quatint','\u2A17':'intlarhk','\u2A22':'pluscir','\u2A23':'plusacir','\u2A24':'simplus','\u2A25':'plusdu','\u2A26':'plussim','\u2A27':'plustwo','\u2A29':'mcomma','\u2A2A':'minusdu','\u2A2D':'loplus','\u2A2E':'roplus','\u2A2F':'Cross','\u2A30':'timesd','\u2A31':'timesbar','\u2A33':'smashp','\u2A34':'lotimes','\u2A35':'rotimes','\u2A36':'otimesas','\u2A37':'Otimes','\u2A38':'odiv','\u2A39':'triplus','\u2A3A':'triminus','\u2A3B':'tritime','\u2A3C':'iprod','\u2A3F':'amalg','\u2A40':'capdot','\u2A42':'ncup','\u2A43':'ncap','\u2A44':'capand','\u2A45':'cupor','\u2A46':'cupcap','\u2A47':'capcup','\u2A48':'cupbrcap','\u2A49':'capbrcup','\u2A4A':'cupcup','\u2A4B':'capcap','\u2A4C':'ccups','\u2A4D':'ccaps','\u2A50':'ccupssm','\u2A53':'And','\u2A54':'Or','\u2A55':'andand','\u2A56':'oror','\u2A57':'orslope','\u2A58':'andslope','\u2A5A':'andv','\u2A5B':'orv','\u2A5C':'andd','\u2A5D':'ord','\u2A5F':'wedbar','\u2A66':'sdote','\u2A6A':'simdot','\u2A6D':'congdot','\u2A6D\u0338':'ncongdot','\u2A6E':'easter','\u2A6F':'apacir','\u2A70':'apE','\u2A70\u0338':'napE','\u2A71':'eplus','\u2A72':'pluse','\u2A73':'Esim','\u2A77':'eDDot','\u2A78':'equivDD','\u2A79':'ltcir','\u2A7A':'gtcir','\u2A7B':'ltquest','\u2A7C':'gtquest','\u2A7D':'les','\u2A7D\u0338':'nles','\u2A7E':'ges','\u2A7E\u0338':'nges','\u2A7F':'lesdot','\u2A80':'gesdot','\u2A81':'lesdoto','\u2A82':'gesdoto','\u2A83':'lesdotor','\u2A84':'gesdotol','\u2A85':'lap','\u2A86':'gap','\u2A87':'lne','\u2A88':'gne','\u2A89':'lnap','\u2A8A':'gnap','\u2A8B':'lEg','\u2A8C':'gEl','\u2A8D':'lsime','\u2A8E':'gsime','\u2A8F':'lsimg','\u2A90':'gsiml','\u2A91':'lgE','\u2A92':'glE','\u2A93':'lesges','\u2A94':'gesles','\u2A95':'els','\u2A96':'egs','\u2A97':'elsdot','\u2A98':'egsdot','\u2A99':'el','\u2A9A':'eg','\u2A9D':'siml','\u2A9E':'simg','\u2A9F':'simlE','\u2AA0':'simgE','\u2AA1':'LessLess','\u2AA1\u0338':'NotNestedLessLess','\u2AA2':'GreaterGreater','\u2AA2\u0338':'NotNestedGreaterGreater','\u2AA4':'glj','\u2AA5':'gla','\u2AA6':'ltcc','\u2AA7':'gtcc','\u2AA8':'lescc','\u2AA9':'gescc','\u2AAA':'smt','\u2AAB':'lat','\u2AAC':'smte','\u2AAC\uFE00':'smtes','\u2AAD':'late','\u2AAD\uFE00':'lates','\u2AAE':'bumpE','\u2AAF':'pre','\u2AAF\u0338':'npre','\u2AB0':'sce','\u2AB0\u0338':'nsce','\u2AB3':'prE','\u2AB4':'scE','\u2AB5':'prnE','\u2AB6':'scnE','\u2AB7':'prap','\u2AB8':'scap','\u2AB9':'prnap','\u2ABA':'scnap','\u2ABB':'Pr','\u2ABC':'Sc','\u2ABD':'subdot','\u2ABE':'supdot','\u2ABF':'subplus','\u2AC0':'supplus','\u2AC1':'submult','\u2AC2':'supmult','\u2AC3':'subedot','\u2AC4':'supedot','\u2AC5':'subE','\u2AC5\u0338':'nsubE','\u2AC6':'supE','\u2AC6\u0338':'nsupE','\u2AC7':'subsim','\u2AC8':'supsim','\u2ACB\uFE00':'vsubnE','\u2ACB':'subnE','\u2ACC\uFE00':'vsupnE','\u2ACC':'supnE','\u2ACF':'csub','\u2AD0':'csup','\u2AD1':'csube','\u2AD2':'csupe','\u2AD3':'subsup','\u2AD4':'supsub','\u2AD5':'subsub','\u2AD6':'supsup','\u2AD7':'suphsub','\u2AD8':'supdsub','\u2AD9':'forkv','\u2ADA':'topfork','\u2ADB':'mlcp','\u2AE4':'Dashv','\u2AE6':'Vdashl','\u2AE7':'Barv','\u2AE8':'vBar','\u2AE9':'vBarv','\u2AEB':'Vbar','\u2AEC':'Not','\u2AED':'bNot','\u2AEE':'rnmid','\u2AEF':'cirmid','\u2AF0':'midcir','\u2AF1':'topcir','\u2AF2':'nhpar','\u2AF3':'parsim','\u2AFD':'parsl','\u2AFD\u20E5':'nparsl','\u266D':'flat','\u266E':'natur','\u266F':'sharp','\xA4':'curren','\xA2':'cent','$':'dollar','\xA3':'pound','\xA5':'yen','\u20AC':'euro','\xB9':'sup1','\xBD':'half','\u2153':'frac13','\xBC':'frac14','\u2155':'frac15','\u2159':'frac16','\u215B':'frac18','\xB2':'sup2','\u2154':'frac23','\u2156':'frac25','\xB3':'sup3','\xBE':'frac34','\u2157':'frac35','\u215C':'frac38','\u2158':'frac45','\u215A':'frac56','\u215D':'frac58','\u215E':'frac78','\uD835\uDCB6':'ascr','\uD835\uDD52':'aopf','\uD835\uDD1E':'afr','\uD835\uDD38':'Aopf','\uD835\uDD04':'Afr','\uD835\uDC9C':'Ascr','\xAA':'ordf','\xE1':'aacute','\xC1':'Aacute','\xE0':'agrave','\xC0':'Agrave','\u0103':'abreve','\u0102':'Abreve','\xE2':'acirc','\xC2':'Acirc','\xE5':'aring','\xC5':'angst','\xE4':'auml','\xC4':'Auml','\xE3':'atilde','\xC3':'Atilde','\u0105':'aogon','\u0104':'Aogon','\u0101':'amacr','\u0100':'Amacr','\xE6':'aelig','\xC6':'AElig','\uD835\uDCB7':'bscr','\uD835\uDD53':'bopf','\uD835\uDD1F':'bfr','\uD835\uDD39':'Bopf','\u212C':'Bscr','\uD835\uDD05':'Bfr','\uD835\uDD20':'cfr','\uD835\uDCB8':'cscr','\uD835\uDD54':'copf','\u212D':'Cfr','\uD835\uDC9E':'Cscr','\u2102':'Copf','\u0107':'cacute','\u0106':'Cacute','\u0109':'ccirc','\u0108':'Ccirc','\u010D':'ccaron','\u010C':'Ccaron','\u010B':'cdot','\u010A':'Cdot','\xE7':'ccedil','\xC7':'Ccedil','\u2105':'incare','\uD835\uDD21':'dfr','\u2146':'dd','\uD835\uDD55':'dopf','\uD835\uDCB9':'dscr','\uD835\uDC9F':'Dscr','\uD835\uDD07':'Dfr','\u2145':'DD','\uD835\uDD3B':'Dopf','\u010F':'dcaron','\u010E':'Dcaron','\u0111':'dstrok','\u0110':'Dstrok','\xF0':'eth','\xD0':'ETH','\u2147':'ee','\u212F':'escr','\uD835\uDD22':'efr','\uD835\uDD56':'eopf','\u2130':'Escr','\uD835\uDD08':'Efr','\uD835\uDD3C':'Eopf','\xE9':'eacute','\xC9':'Eacute','\xE8':'egrave','\xC8':'Egrave','\xEA':'ecirc','\xCA':'Ecirc','\u011B':'ecaron','\u011A':'Ecaron','\xEB':'euml','\xCB':'Euml','\u0117':'edot','\u0116':'Edot','\u0119':'eogon','\u0118':'Eogon','\u0113':'emacr','\u0112':'Emacr','\uD835\uDD23':'ffr','\uD835\uDD57':'fopf','\uD835\uDCBB':'fscr','\uD835\uDD09':'Ffr','\uD835\uDD3D':'Fopf','\u2131':'Fscr','\uFB00':'fflig','\uFB03':'ffilig','\uFB04':'ffllig','\uFB01':'filig','fj':'fjlig','\uFB02':'fllig','\u0192':'fnof','\u210A':'gscr','\uD835\uDD58':'gopf','\uD835\uDD24':'gfr','\uD835\uDCA2':'Gscr','\uD835\uDD3E':'Gopf','\uD835\uDD0A':'Gfr','\u01F5':'gacute','\u011F':'gbreve','\u011E':'Gbreve','\u011D':'gcirc','\u011C':'Gcirc','\u0121':'gdot','\u0120':'Gdot','\u0122':'Gcedil','\uD835\uDD25':'hfr','\u210E':'planckh','\uD835\uDCBD':'hscr','\uD835\uDD59':'hopf','\u210B':'Hscr','\u210C':'Hfr','\u210D':'Hopf','\u0125':'hcirc','\u0124':'Hcirc','\u210F':'hbar','\u0127':'hstrok','\u0126':'Hstrok','\uD835\uDD5A':'iopf','\uD835\uDD26':'ifr','\uD835\uDCBE':'iscr','\u2148':'ii','\uD835\uDD40':'Iopf','\u2110':'Iscr','\u2111':'Im','\xED':'iacute','\xCD':'Iacute','\xEC':'igrave','\xCC':'Igrave','\xEE':'icirc','\xCE':'Icirc','\xEF':'iuml','\xCF':'Iuml','\u0129':'itilde','\u0128':'Itilde','\u0130':'Idot','\u012F':'iogon','\u012E':'Iogon','\u012B':'imacr','\u012A':'Imacr','\u0133':'ijlig','\u0132':'IJlig','\u0131':'imath','\uD835\uDCBF':'jscr','\uD835\uDD5B':'jopf','\uD835\uDD27':'jfr','\uD835\uDCA5':'Jscr','\uD835\uDD0D':'Jfr','\uD835\uDD41':'Jopf','\u0135':'jcirc','\u0134':'Jcirc','\u0237':'jmath','\uD835\uDD5C':'kopf','\uD835\uDCC0':'kscr','\uD835\uDD28':'kfr','\uD835\uDCA6':'Kscr','\uD835\uDD42':'Kopf','\uD835\uDD0E':'Kfr','\u0137':'kcedil','\u0136':'Kcedil','\uD835\uDD29':'lfr','\uD835\uDCC1':'lscr','\u2113':'ell','\uD835\uDD5D':'lopf','\u2112':'Lscr','\uD835\uDD0F':'Lfr','\uD835\uDD43':'Lopf','\u013A':'lacute','\u0139':'Lacute','\u013E':'lcaron','\u013D':'Lcaron','\u013C':'lcedil','\u013B':'Lcedil','\u0142':'lstrok','\u0141':'Lstrok','\u0140':'lmidot','\u013F':'Lmidot','\uD835\uDD2A':'mfr','\uD835\uDD5E':'mopf','\uD835\uDCC2':'mscr','\uD835\uDD10':'Mfr','\uD835\uDD44':'Mopf','\u2133':'Mscr','\uD835\uDD2B':'nfr','\uD835\uDD5F':'nopf','\uD835\uDCC3':'nscr','\u2115':'Nopf','\uD835\uDCA9':'Nscr','\uD835\uDD11':'Nfr','\u0144':'nacute','\u0143':'Nacute','\u0148':'ncaron','\u0147':'Ncaron','\xF1':'ntilde','\xD1':'Ntilde','\u0146':'ncedil','\u0145':'Ncedil','\u2116':'numero','\u014B':'eng','\u014A':'ENG','\uD835\uDD60':'oopf','\uD835\uDD2C':'ofr','\u2134':'oscr','\uD835\uDCAA':'Oscr','\uD835\uDD12':'Ofr','\uD835\uDD46':'Oopf','\xBA':'ordm','\xF3':'oacute','\xD3':'Oacute','\xF2':'ograve','\xD2':'Ograve','\xF4':'ocirc','\xD4':'Ocirc','\xF6':'ouml','\xD6':'Ouml','\u0151':'odblac','\u0150':'Odblac','\xF5':'otilde','\xD5':'Otilde','\xF8':'oslash','\xD8':'Oslash','\u014D':'omacr','\u014C':'Omacr','\u0153':'oelig','\u0152':'OElig','\uD835\uDD2D':'pfr','\uD835\uDCC5':'pscr','\uD835\uDD61':'popf','\u2119':'Popf','\uD835\uDD13':'Pfr','\uD835\uDCAB':'Pscr','\uD835\uDD62':'qopf','\uD835\uDD2E':'qfr','\uD835\uDCC6':'qscr','\uD835\uDCAC':'Qscr','\uD835\uDD14':'Qfr','\u211A':'Qopf','\u0138':'kgreen','\uD835\uDD2F':'rfr','\uD835\uDD63':'ropf','\uD835\uDCC7':'rscr','\u211B':'Rscr','\u211C':'Re','\u211D':'Ropf','\u0155':'racute','\u0154':'Racute','\u0159':'rcaron','\u0158':'Rcaron','\u0157':'rcedil','\u0156':'Rcedil','\uD835\uDD64':'sopf','\uD835\uDCC8':'sscr','\uD835\uDD30':'sfr','\uD835\uDD4A':'Sopf','\uD835\uDD16':'Sfr','\uD835\uDCAE':'Sscr','\u24C8':'oS','\u015B':'sacute','\u015A':'Sacute','\u015D':'scirc','\u015C':'Scirc','\u0161':'scaron','\u0160':'Scaron','\u015F':'scedil','\u015E':'Scedil','\xDF':'szlig','\uD835\uDD31':'tfr','\uD835\uDCC9':'tscr','\uD835\uDD65':'topf','\uD835\uDCAF':'Tscr','\uD835\uDD17':'Tfr','\uD835\uDD4B':'Topf','\u0165':'tcaron','\u0164':'Tcaron','\u0163':'tcedil','\u0162':'Tcedil','\u2122':'trade','\u0167':'tstrok','\u0166':'Tstrok','\uD835\uDCCA':'uscr','\uD835\uDD66':'uopf','\uD835\uDD32':'ufr','\uD835\uDD4C':'Uopf','\uD835\uDD18':'Ufr','\uD835\uDCB0':'Uscr','\xFA':'uacute','\xDA':'Uacute','\xF9':'ugrave','\xD9':'Ugrave','\u016D':'ubreve','\u016C':'Ubreve','\xFB':'ucirc','\xDB':'Ucirc','\u016F':'uring','\u016E':'Uring','\xFC':'uuml','\xDC':'Uuml','\u0171':'udblac','\u0170':'Udblac','\u0169':'utilde','\u0168':'Utilde','\u0173':'uogon','\u0172':'Uogon','\u016B':'umacr','\u016A':'Umacr','\uD835\uDD33':'vfr','\uD835\uDD67':'vopf','\uD835\uDCCB':'vscr','\uD835\uDD19':'Vfr','\uD835\uDD4D':'Vopf','\uD835\uDCB1':'Vscr','\uD835\uDD68':'wopf','\uD835\uDCCC':'wscr','\uD835\uDD34':'wfr','\uD835\uDCB2':'Wscr','\uD835\uDD4E':'Wopf','\uD835\uDD1A':'Wfr','\u0175':'wcirc','\u0174':'Wcirc','\uD835\uDD35':'xfr','\uD835\uDCCD':'xscr','\uD835\uDD69':'xopf','\uD835\uDD4F':'Xopf','\uD835\uDD1B':'Xfr','\uD835\uDCB3':'Xscr','\uD835\uDD36':'yfr','\uD835\uDCCE':'yscr','\uD835\uDD6A':'yopf','\uD835\uDCB4':'Yscr','\uD835\uDD1C':'Yfr','\uD835\uDD50':'Yopf','\xFD':'yacute','\xDD':'Yacute','\u0177':'ycirc','\u0176':'Ycirc','\xFF':'yuml','\u0178':'Yuml','\uD835\uDCCF':'zscr','\uD835\uDD37':'zfr','\uD835\uDD6B':'zopf','\u2128':'Zfr','\u2124':'Zopf','\uD835\uDCB5':'Zscr','\u017A':'zacute','\u0179':'Zacute','\u017E':'zcaron','\u017D':'Zcaron','\u017C':'zdot','\u017B':'Zdot','\u01B5':'imped','\xFE':'thorn','\xDE':'THORN','\u0149':'napos','\u03B1':'alpha','\u0391':'Alpha','\u03B2':'beta','\u0392':'Beta','\u03B3':'gamma','\u0393':'Gamma','\u03B4':'delta','\u0394':'Delta','\u03B5':'epsi','\u03F5':'epsiv','\u0395':'Epsilon','\u03DD':'gammad','\u03DC':'Gammad','\u03B6':'zeta','\u0396':'Zeta','\u03B7':'eta','\u0397':'Eta','\u03B8':'theta','\u03D1':'thetav','\u0398':'Theta','\u03B9':'iota','\u0399':'Iota','\u03BA':'kappa','\u03F0':'kappav','\u039A':'Kappa','\u03BB':'lambda','\u039B':'Lambda','\u03BC':'mu','\xB5':'micro','\u039C':'Mu','\u03BD':'nu','\u039D':'Nu','\u03BE':'xi','\u039E':'Xi','\u03BF':'omicron','\u039F':'Omicron','\u03C0':'pi','\u03D6':'piv','\u03A0':'Pi','\u03C1':'rho','\u03F1':'rhov','\u03A1':'Rho','\u03C3':'sigma','\u03A3':'Sigma','\u03C2':'sigmaf','\u03C4':'tau','\u03A4':'Tau','\u03C5':'upsi','\u03A5':'Upsilon','\u03D2':'Upsi','\u03C6':'phi','\u03D5':'phiv','\u03A6':'Phi','\u03C7':'chi','\u03A7':'Chi','\u03C8':'psi','\u03A8':'Psi','\u03C9':'omega','\u03A9':'ohm','\u0430':'acy','\u0410':'Acy','\u0431':'bcy','\u0411':'Bcy','\u0432':'vcy','\u0412':'Vcy','\u0433':'gcy','\u0413':'Gcy','\u0453':'gjcy','\u0403':'GJcy','\u0434':'dcy','\u0414':'Dcy','\u0452':'djcy','\u0402':'DJcy','\u0435':'iecy','\u0415':'IEcy','\u0451':'iocy','\u0401':'IOcy','\u0454':'jukcy','\u0404':'Jukcy','\u0436':'zhcy','\u0416':'ZHcy','\u0437':'zcy','\u0417':'Zcy','\u0455':'dscy','\u0405':'DScy','\u0438':'icy','\u0418':'Icy','\u0456':'iukcy','\u0406':'Iukcy','\u0457':'yicy','\u0407':'YIcy','\u0439':'jcy','\u0419':'Jcy','\u0458':'jsercy','\u0408':'Jsercy','\u043A':'kcy','\u041A':'Kcy','\u045C':'kjcy','\u040C':'KJcy','\u043B':'lcy','\u041B':'Lcy','\u0459':'ljcy','\u0409':'LJcy','\u043C':'mcy','\u041C':'Mcy','\u043D':'ncy','\u041D':'Ncy','\u045A':'njcy','\u040A':'NJcy','\u043E':'ocy','\u041E':'Ocy','\u043F':'pcy','\u041F':'Pcy','\u0440':'rcy','\u0420':'Rcy','\u0441':'scy','\u0421':'Scy','\u0442':'tcy','\u0422':'Tcy','\u045B':'tshcy','\u040B':'TSHcy','\u0443':'ucy','\u0423':'Ucy','\u045E':'ubrcy','\u040E':'Ubrcy','\u0444':'fcy','\u0424':'Fcy','\u0445':'khcy','\u0425':'KHcy','\u0446':'tscy','\u0426':'TScy','\u0447':'chcy','\u0427':'CHcy','\u045F':'dzcy','\u040F':'DZcy','\u0448':'shcy','\u0428':'SHcy','\u0449':'shchcy','\u0429':'SHCHcy','\u044A':'hardcy','\u042A':'HARDcy','\u044B':'ycy','\u042B':'Ycy','\u044C':'softcy','\u042C':'SOFTcy','\u044D':'ecy','\u042D':'Ecy','\u044E':'yucy','\u042E':'YUcy','\u044F':'yacy','\u042F':'YAcy','\u2135':'aleph','\u2136':'beth','\u2137':'gimel','\u2138':'daleth'};

	var regexEscape = /["&'<>`]/g;
	var escapeMap = {
		'"': '&quot;',
		'&': '&amp;',
		'\'': '&#x27;',
		'<': '&lt;',
		// See https://mathiasbynens.be/notes/ambiguous-ampersands: in HTML, the
		// following is not strictly necessary unless it’s part of a tag or an
		// unquoted attribute value. We’re only escaping it to support those
		// situations, and for XML support.
		'>': '&gt;',
		// In Internet Explorer ≤ 8, the backtick character can be used
		// to break out of (un)quoted attribute values or HTML comments.
		// See http://html5sec.org/#102, http://html5sec.org/#108, and
		// http://html5sec.org/#133.
		'`': '&#x60;'
	};

	var regexInvalidEntity = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/;
	var regexInvalidRawCodePoint = /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
	var regexDecode = /&(CounterClockwiseContourIntegral|DoubleLongLeftRightArrow|ClockwiseContourIntegral|NotNestedGreaterGreater|NotSquareSupersetEqual|DiacriticalDoubleAcute|NotRightTriangleEqual|NotSucceedsSlantEqual|NotPrecedesSlantEqual|CloseCurlyDoubleQuote|NegativeVeryThinSpace|DoubleContourIntegral|FilledVerySmallSquare|CapitalDifferentialD|OpenCurlyDoubleQuote|EmptyVerySmallSquare|NestedGreaterGreater|DoubleLongRightArrow|NotLeftTriangleEqual|NotGreaterSlantEqual|ReverseUpEquilibrium|DoubleLeftRightArrow|NotSquareSubsetEqual|NotDoubleVerticalBar|RightArrowLeftArrow|NotGreaterFullEqual|NotRightTriangleBar|SquareSupersetEqual|DownLeftRightVector|DoubleLongLeftArrow|leftrightsquigarrow|LeftArrowRightArrow|NegativeMediumSpace|blacktriangleright|RightDownVectorBar|PrecedesSlantEqual|RightDoubleBracket|SucceedsSlantEqual|NotLeftTriangleBar|RightTriangleEqual|SquareIntersection|RightDownTeeVector|ReverseEquilibrium|NegativeThickSpace|longleftrightarrow|Longleftrightarrow|LongLeftRightArrow|DownRightTeeVector|DownRightVectorBar|GreaterSlantEqual|SquareSubsetEqual|LeftDownVectorBar|LeftDoubleBracket|VerticalSeparator|rightleftharpoons|NotGreaterGreater|NotSquareSuperset|blacktriangleleft|blacktriangledown|NegativeThinSpace|LeftDownTeeVector|NotLessSlantEqual|leftrightharpoons|DoubleUpDownArrow|DoubleVerticalBar|LeftTriangleEqual|FilledSmallSquare|twoheadrightarrow|NotNestedLessLess|DownLeftTeeVector|DownLeftVectorBar|RightAngleBracket|NotTildeFullEqual|NotReverseElement|RightUpDownVector|DiacriticalTilde|NotSucceedsTilde|circlearrowright|NotPrecedesEqual|rightharpoondown|DoubleRightArrow|NotSucceedsEqual|NonBreakingSpace|NotRightTriangle|LessEqualGreater|RightUpTeeVector|LeftAngleBracket|GreaterFullEqual|DownArrowUpArrow|RightUpVectorBar|twoheadleftarrow|GreaterEqualLess|downharpoonright|RightTriangleBar|ntrianglerighteq|NotSupersetEqual|LeftUpDownVector|DiacriticalAcute|rightrightarrows|vartriangleright|UpArrowDownArrow|DiacriticalGrave|UnderParenthesis|EmptySmallSquare|LeftUpVectorBar|leftrightarrows|DownRightVector|downharpoonleft|trianglerighteq|ShortRightArrow|OverParenthesis|DoubleLeftArrow|DoubleDownArrow|NotSquareSubset|bigtriangledown|ntrianglelefteq|UpperRightArrow|curvearrowright|vartriangleleft|NotLeftTriangle|nleftrightarrow|LowerRightArrow|NotHumpDownHump|NotGreaterTilde|rightthreetimes|LeftUpTeeVector|NotGreaterEqual|straightepsilon|LeftTriangleBar|rightsquigarrow|ContourIntegral|rightleftarrows|CloseCurlyQuote|RightDownVector|LeftRightVector|nLeftrightarrow|leftharpoondown|circlearrowleft|SquareSuperset|OpenCurlyQuote|hookrightarrow|HorizontalLine|DiacriticalDot|NotLessGreater|ntriangleright|DoubleRightTee|InvisibleComma|InvisibleTimes|LowerLeftArrow|DownLeftVector|NotSubsetEqual|curvearrowleft|trianglelefteq|NotVerticalBar|TildeFullEqual|downdownarrows|NotGreaterLess|RightTeeVector|ZeroWidthSpace|looparrowright|LongRightArrow|doublebarwedge|ShortLeftArrow|ShortDownArrow|RightVectorBar|GreaterGreater|ReverseElement|rightharpoonup|LessSlantEqual|leftthreetimes|upharpoonright|rightarrowtail|LeftDownVector|Longrightarrow|NestedLessLess|UpperLeftArrow|nshortparallel|leftleftarrows|leftrightarrow|Leftrightarrow|LeftRightArrow|longrightarrow|upharpoonleft|RightArrowBar|ApplyFunction|LeftTeeVector|leftarrowtail|NotEqualTilde|varsubsetneqq|varsupsetneqq|RightTeeArrow|SucceedsEqual|SucceedsTilde|LeftVectorBar|SupersetEqual|hookleftarrow|DifferentialD|VerticalTilde|VeryThinSpace|blacktriangle|bigtriangleup|LessFullEqual|divideontimes|leftharpoonup|UpEquilibrium|ntriangleleft|RightTriangle|measuredangle|shortparallel|longleftarrow|Longleftarrow|LongLeftArrow|DoubleLeftTee|Poincareplane|PrecedesEqual|triangleright|DoubleUpArrow|RightUpVector|fallingdotseq|looparrowleft|PrecedesTilde|NotTildeEqual|NotTildeTilde|smallsetminus|Proportional|triangleleft|triangledown|UnderBracket|NotHumpEqual|exponentiale|ExponentialE|NotLessTilde|HilbertSpace|RightCeiling|blacklozenge|varsupsetneq|HumpDownHump|GreaterEqual|VerticalLine|LeftTeeArrow|NotLessEqual|DownTeeArrow|LeftTriangle|varsubsetneq|Intersection|NotCongruent|DownArrowBar|LeftUpVector|LeftArrowBar|risingdotseq|GreaterTilde|RoundImplies|SquareSubset|ShortUpArrow|NotSuperset|quaternions|precnapprox|backepsilon|preccurlyeq|OverBracket|blacksquare|MediumSpace|VerticalBar|circledcirc|circleddash|CircleMinus|CircleTimes|LessGreater|curlyeqprec|curlyeqsucc|diamondsuit|UpDownArrow|Updownarrow|RuleDelayed|Rrightarrow|updownarrow|RightVector|nRightarrow|nrightarrow|eqslantless|LeftCeiling|Equilibrium|SmallCircle|expectation|NotSucceeds|thickapprox|GreaterLess|SquareUnion|NotPrecedes|NotLessLess|straightphi|succnapprox|succcurlyeq|SubsetEqual|sqsupseteq|Proportion|Laplacetrf|ImaginaryI|supsetneqq|NotGreater|gtreqqless|NotElement|ThickSpace|TildeEqual|TildeTilde|Fouriertrf|rmoustache|EqualTilde|eqslantgtr|UnderBrace|LeftVector|UpArrowBar|nLeftarrow|nsubseteqq|subsetneqq|nsupseteqq|nleftarrow|succapprox|lessapprox|UpTeeArrow|upuparrows|curlywedge|lesseqqgtr|varepsilon|varnothing|RightFloor|complement|CirclePlus|sqsubseteq|Lleftarrow|circledast|RightArrow|Rightarrow|rightarrow|lmoustache|Bernoullis|precapprox|mapstoleft|mapstodown|longmapsto|dotsquare|downarrow|DoubleDot|nsubseteq|supsetneq|leftarrow|nsupseteq|subsetneq|ThinSpace|ngeqslant|subseteqq|HumpEqual|NotSubset|triangleq|NotCupCap|lesseqgtr|heartsuit|TripleDot|Leftarrow|Coproduct|Congruent|varpropto|complexes|gvertneqq|LeftArrow|LessTilde|supseteqq|MinusPlus|CircleDot|nleqslant|NotExists|gtreqless|nparallel|UnionPlus|LeftFloor|checkmark|CenterDot|centerdot|Mellintrf|gtrapprox|bigotimes|OverBrace|spadesuit|therefore|pitchfork|rationals|PlusMinus|Backslash|Therefore|DownBreve|backsimeq|backprime|DownArrow|nshortmid|Downarrow|lvertneqq|eqvparsl|imagline|imagpart|infintie|integers|Integral|intercal|LessLess|Uarrocir|intlarhk|sqsupset|angmsdaf|sqsubset|llcorner|vartheta|cupbrcap|lnapprox|Superset|SuchThat|succnsim|succneqq|angmsdag|biguplus|curlyvee|trpezium|Succeeds|NotTilde|bigwedge|angmsdah|angrtvbd|triminus|cwconint|fpartint|lrcorner|smeparsl|subseteq|urcorner|lurdshar|laemptyv|DDotrahd|approxeq|ldrushar|awconint|mapstoup|backcong|shortmid|triangle|geqslant|gesdotol|timesbar|circledR|circledS|setminus|multimap|naturals|scpolint|ncongdot|RightTee|boxminus|gnapprox|boxtimes|andslope|thicksim|angmsdaa|varsigma|cirfnint|rtriltri|angmsdab|rppolint|angmsdac|barwedge|drbkarow|clubsuit|thetasym|bsolhsub|capbrcup|dzigrarr|doteqdot|DotEqual|dotminus|UnderBar|NotEqual|realpart|otimesas|ulcorner|hksearow|hkswarow|parallel|PartialD|elinters|emptyset|plusacir|bbrktbrk|angmsdad|pointint|bigoplus|angmsdae|Precedes|bigsqcup|varkappa|notindot|supseteq|precneqq|precnsim|profalar|profline|profsurf|leqslant|lesdotor|raemptyv|subplus|notnivb|notnivc|subrarr|zigrarr|vzigzag|submult|subedot|Element|between|cirscir|larrbfs|larrsim|lotimes|lbrksld|lbrkslu|lozenge|ldrdhar|dbkarow|bigcirc|epsilon|simrarr|simplus|ltquest|Epsilon|luruhar|gtquest|maltese|npolint|eqcolon|npreceq|bigodot|ddagger|gtrless|bnequiv|harrcir|ddotseq|equivDD|backsim|demptyv|nsqsube|nsqsupe|Upsilon|nsubset|upsilon|minusdu|nsucceq|swarrow|nsupset|coloneq|searrow|boxplus|napprox|natural|asympeq|alefsym|congdot|nearrow|bigstar|diamond|supplus|tritime|LeftTee|nvinfin|triplus|NewLine|nvltrie|nvrtrie|nwarrow|nexists|Diamond|ruluhar|Implies|supmult|angzarr|suplarr|suphsub|questeq|because|digamma|Because|olcross|bemptyv|omicron|Omicron|rotimes|NoBreak|intprod|angrtvb|orderof|uwangle|suphsol|lesdoto|orslope|DownTee|realine|cudarrl|rdldhar|OverBar|supedot|lessdot|supdsub|topfork|succsim|rbrkslu|rbrksld|pertenk|cudarrr|isindot|planckh|lessgtr|pluscir|gesdoto|plussim|plustwo|lesssim|cularrp|rarrsim|Cayleys|notinva|notinvb|notinvc|UpArrow|Uparrow|uparrow|NotLess|dwangle|precsim|Product|curarrm|Cconint|dotplus|rarrbfs|ccupssm|Cedilla|cemptyv|notniva|quatint|frac35|frac38|frac45|frac56|frac58|frac78|tridot|xoplus|gacute|gammad|Gammad|lfisht|lfloor|bigcup|sqsupe|gbreve|Gbreve|lharul|sqsube|sqcups|Gcedil|apacir|llhard|lmidot|Lmidot|lmoust|andand|sqcaps|approx|Abreve|spades|circeq|tprime|divide|topcir|Assign|topbot|gesdot|divonx|xuplus|timesd|gesles|atilde|solbar|SOFTcy|loplus|timesb|lowast|lowbar|dlcorn|dlcrop|softcy|dollar|lparlt|thksim|lrhard|Atilde|lsaquo|smashp|bigvee|thinsp|wreath|bkarow|lsquor|lstrok|Lstrok|lthree|ltimes|ltlarr|DotDot|simdot|ltrPar|weierp|xsqcup|angmsd|sigmav|sigmaf|zeetrf|Zcaron|zcaron|mapsto|vsupne|thetav|cirmid|marker|mcomma|Zacute|vsubnE|there4|gtlPar|vsubne|bottom|gtrarr|SHCHcy|shchcy|midast|midcir|middot|minusb|minusd|gtrdot|bowtie|sfrown|mnplus|models|colone|seswar|Colone|mstpos|searhk|gtrsim|nacute|Nacute|boxbox|telrec|hairsp|Tcedil|nbumpe|scnsim|ncaron|Ncaron|ncedil|Ncedil|hamilt|Scedil|nearhk|hardcy|HARDcy|tcedil|Tcaron|commat|nequiv|nesear|tcaron|target|hearts|nexist|varrho|scedil|Scaron|scaron|hellip|Sacute|sacute|hercon|swnwar|compfn|rtimes|rthree|rsquor|rsaquo|zacute|wedgeq|homtht|barvee|barwed|Barwed|rpargt|horbar|conint|swarhk|roplus|nltrie|hslash|hstrok|Hstrok|rmoust|Conint|bprime|hybull|hyphen|iacute|Iacute|supsup|supsub|supsim|varphi|coprod|brvbar|agrave|Supset|supset|igrave|Igrave|notinE|Agrave|iiiint|iinfin|copysr|wedbar|Verbar|vangrt|becaus|incare|verbar|inodot|bullet|drcorn|intcal|drcrop|cularr|vellip|Utilde|bumpeq|cupcap|dstrok|Dstrok|CupCap|cupcup|cupdot|eacute|Eacute|supdot|iquest|easter|ecaron|Ecaron|ecolon|isinsv|utilde|itilde|Itilde|curarr|succeq|Bumpeq|cacute|ulcrop|nparsl|Cacute|nprcue|egrave|Egrave|nrarrc|nrarrw|subsup|subsub|nrtrie|jsercy|nsccue|Jsercy|kappav|kcedil|Kcedil|subsim|ulcorn|nsimeq|egsdot|veebar|kgreen|capand|elsdot|Subset|subset|curren|aacute|lacute|Lacute|emptyv|ntilde|Ntilde|lagran|lambda|Lambda|capcap|Ugrave|langle|subdot|emsp13|numero|emsp14|nvdash|nvDash|nVdash|nVDash|ugrave|ufisht|nvHarr|larrfs|nvlArr|larrhk|larrlp|larrpl|nvrArr|Udblac|nwarhk|larrtl|nwnear|oacute|Oacute|latail|lAtail|sstarf|lbrace|odblac|Odblac|lbrack|udblac|odsold|eparsl|lcaron|Lcaron|ograve|Ograve|lcedil|Lcedil|Aacute|ssmile|ssetmn|squarf|ldquor|capcup|ominus|cylcty|rharul|eqcirc|dagger|rfloor|rfisht|Dagger|daleth|equals|origof|capdot|equest|dcaron|Dcaron|rdquor|oslash|Oslash|otilde|Otilde|otimes|Otimes|urcrop|Ubreve|ubreve|Yacute|Uacute|uacute|Rcedil|rcedil|urcorn|parsim|Rcaron|Vdashl|rcaron|Tstrok|percnt|period|permil|Exists|yacute|rbrack|rbrace|phmmat|ccaron|Ccaron|planck|ccedil|plankv|tstrok|female|plusdo|plusdu|ffilig|plusmn|ffllig|Ccedil|rAtail|dfisht|bernou|ratail|Rarrtl|rarrtl|angsph|rarrpl|rarrlp|rarrhk|xwedge|xotime|forall|ForAll|Vvdash|vsupnE|preceq|bigcap|frac12|frac13|frac14|primes|rarrfs|prnsim|frac15|Square|frac16|square|lesdot|frac18|frac23|propto|prurel|rarrap|rangle|puncsp|frac25|Racute|qprime|racute|lesges|frac34|abreve|AElig|eqsim|utdot|setmn|urtri|Equal|Uring|seArr|uring|searr|dashv|Dashv|mumap|nabla|iogon|Iogon|sdote|sdotb|scsim|napid|napos|equiv|natur|Acirc|dblac|erarr|nbump|iprod|erDot|ucirc|awint|esdot|angrt|ncong|isinE|scnap|Scirc|scirc|ndash|isins|Ubrcy|nearr|neArr|isinv|nedot|ubrcy|acute|Ycirc|iukcy|Iukcy|xutri|nesim|caret|jcirc|Jcirc|caron|twixt|ddarr|sccue|exist|jmath|sbquo|ngeqq|angst|ccaps|lceil|ngsim|UpTee|delta|Delta|rtrif|nharr|nhArr|nhpar|rtrie|jukcy|Jukcy|kappa|rsquo|Kappa|nlarr|nlArr|TSHcy|rrarr|aogon|Aogon|fflig|xrarr|tshcy|ccirc|nleqq|filig|upsih|nless|dharl|nlsim|fjlig|ropar|nltri|dharr|robrk|roarr|fllig|fltns|roang|rnmid|subnE|subne|lAarr|trisb|Ccirc|acirc|ccups|blank|VDash|forkv|Vdash|langd|cedil|blk12|blk14|laquo|strns|diams|notin|vDash|larrb|blk34|block|disin|uplus|vdash|vBarv|aelig|starf|Wedge|check|xrArr|lates|lbarr|lBarr|notni|lbbrk|bcong|frasl|lbrke|frown|vrtri|vprop|vnsup|gamma|Gamma|wedge|xodot|bdquo|srarr|doteq|ldquo|boxdl|boxdL|gcirc|Gcirc|boxDl|boxDL|boxdr|boxdR|boxDr|TRADE|trade|rlhar|boxDR|vnsub|npart|vltri|rlarr|boxhd|boxhD|nprec|gescc|nrarr|nrArr|boxHd|boxHD|boxhu|boxhU|nrtri|boxHu|clubs|boxHU|times|colon|Colon|gimel|xlArr|Tilde|nsime|tilde|nsmid|nspar|THORN|thorn|xlarr|nsube|nsubE|thkap|xhArr|comma|nsucc|boxul|boxuL|nsupe|nsupE|gneqq|gnsim|boxUl|boxUL|grave|boxur|boxuR|boxUr|boxUR|lescc|angle|bepsi|boxvh|varpi|boxvH|numsp|Theta|gsime|gsiml|theta|boxVh|boxVH|boxvl|gtcir|gtdot|boxvL|boxVl|boxVL|crarr|cross|Cross|nvsim|boxvr|nwarr|nwArr|sqsup|dtdot|Uogon|lhard|lharu|dtrif|ocirc|Ocirc|lhblk|duarr|odash|sqsub|Hacek|sqcup|llarr|duhar|oelig|OElig|ofcir|boxvR|uogon|lltri|boxVr|csube|uuarr|ohbar|csupe|ctdot|olarr|olcir|harrw|oline|sqcap|omacr|Omacr|omega|Omega|boxVR|aleph|lneqq|lnsim|loang|loarr|rharu|lobrk|hcirc|operp|oplus|rhard|Hcirc|orarr|Union|order|ecirc|Ecirc|cuepr|szlig|cuesc|breve|reals|eDDot|Breve|hoarr|lopar|utrif|rdquo|Umacr|umacr|efDot|swArr|ultri|alpha|rceil|ovbar|swarr|Wcirc|wcirc|smtes|smile|bsemi|lrarr|aring|parsl|lrhar|bsime|uhblk|lrtri|cupor|Aring|uharr|uharl|slarr|rbrke|bsolb|lsime|rbbrk|RBarr|lsimg|phone|rBarr|rbarr|icirc|lsquo|Icirc|emacr|Emacr|ratio|simne|plusb|simlE|simgE|simeq|pluse|ltcir|ltdot|empty|xharr|xdtri|iexcl|Alpha|ltrie|rarrw|pound|ltrif|xcirc|bumpe|prcue|bumpE|asymp|amacr|cuvee|Sigma|sigma|iiint|udhar|iiota|ijlig|IJlig|supnE|imacr|Imacr|prime|Prime|image|prnap|eogon|Eogon|rarrc|mdash|mDDot|cuwed|imath|supne|imped|Amacr|udarr|prsim|micro|rarrb|cwint|raquo|infin|eplus|range|rangd|Ucirc|radic|minus|amalg|veeeq|rAarr|epsiv|ycirc|quest|sharp|quot|zwnj|Qscr|race|qscr|Qopf|qopf|qint|rang|Rang|Zscr|zscr|Zopf|zopf|rarr|rArr|Rarr|Pscr|pscr|prop|prod|prnE|prec|ZHcy|zhcy|prap|Zeta|zeta|Popf|popf|Zdot|plus|zdot|Yuml|yuml|phiv|YUcy|yucy|Yscr|yscr|perp|Yopf|yopf|part|para|YIcy|Ouml|rcub|yicy|YAcy|rdca|ouml|osol|Oscr|rdsh|yacy|real|oscr|xvee|andd|rect|andv|Xscr|oror|ordm|ordf|xscr|ange|aopf|Aopf|rHar|Xopf|opar|Oopf|xopf|xnis|rhov|oopf|omid|xmap|oint|apid|apos|ogon|ascr|Ascr|odot|odiv|xcup|xcap|ocir|oast|nvlt|nvle|nvgt|nvge|nvap|Wscr|wscr|auml|ntlg|ntgl|nsup|nsub|nsim|Nscr|nscr|nsce|Wopf|ring|npre|wopf|npar|Auml|Barv|bbrk|Nopf|nopf|nmid|nLtv|beta|ropf|Ropf|Beta|beth|nles|rpar|nleq|bnot|bNot|nldr|NJcy|rscr|Rscr|Vscr|vscr|rsqb|njcy|bopf|nisd|Bopf|rtri|Vopf|nGtv|ngtr|vopf|boxh|boxH|boxv|nges|ngeq|boxV|bscr|scap|Bscr|bsim|Vert|vert|bsol|bull|bump|caps|cdot|ncup|scnE|ncap|nbsp|napE|Cdot|cent|sdot|Vbar|nang|vBar|chcy|Mscr|mscr|sect|semi|CHcy|Mopf|mopf|sext|circ|cire|mldr|mlcp|cirE|comp|shcy|SHcy|vArr|varr|cong|copf|Copf|copy|COPY|malt|male|macr|lvnE|cscr|ltri|sime|ltcc|simg|Cscr|siml|csub|Uuml|lsqb|lsim|uuml|csup|Lscr|lscr|utri|smid|lpar|cups|smte|lozf|darr|Lopf|Uscr|solb|lopf|sopf|Sopf|lneq|uscr|spar|dArr|lnap|Darr|dash|Sqrt|LJcy|ljcy|lHar|dHar|Upsi|upsi|diam|lesg|djcy|DJcy|leqq|dopf|Dopf|dscr|Dscr|dscy|ldsh|ldca|squf|DScy|sscr|Sscr|dsol|lcub|late|star|Star|Uopf|Larr|lArr|larr|uopf|dtri|dzcy|sube|subE|Lang|lang|Kscr|kscr|Kopf|kopf|KJcy|kjcy|KHcy|khcy|DZcy|ecir|edot|eDot|Jscr|jscr|succ|Jopf|jopf|Edot|uHar|emsp|ensp|Iuml|iuml|eopf|isin|Iscr|iscr|Eopf|epar|sung|epsi|escr|sup1|sup2|sup3|Iota|iota|supe|supE|Iopf|iopf|IOcy|iocy|Escr|esim|Esim|imof|Uarr|QUOT|uArr|uarr|euml|IEcy|iecy|Idot|Euml|euro|excl|Hscr|hscr|Hopf|hopf|TScy|tscy|Tscr|hbar|tscr|flat|tbrk|fnof|hArr|harr|half|fopf|Fopf|tdot|gvnE|fork|trie|gtcc|fscr|Fscr|gdot|gsim|Gscr|gscr|Gopf|gopf|gneq|Gdot|tosa|gnap|Topf|topf|geqq|toea|GJcy|gjcy|tint|gesl|mid|Sfr|ggg|top|ges|gla|glE|glj|geq|gne|gEl|gel|gnE|Gcy|gcy|gap|Tfr|tfr|Tcy|tcy|Hat|Tau|Ffr|tau|Tab|hfr|Hfr|ffr|Fcy|fcy|icy|Icy|iff|ETH|eth|ifr|Ifr|Eta|eta|int|Int|Sup|sup|ucy|Ucy|Sum|sum|jcy|ENG|ufr|Ufr|eng|Jcy|jfr|els|ell|egs|Efr|efr|Jfr|uml|kcy|Kcy|Ecy|ecy|kfr|Kfr|lap|Sub|sub|lat|lcy|Lcy|leg|Dot|dot|lEg|leq|les|squ|div|die|lfr|Lfr|lgE|Dfr|dfr|Del|deg|Dcy|dcy|lne|lnE|sol|loz|smt|Cup|lrm|cup|lsh|Lsh|sim|shy|map|Map|mcy|Mcy|mfr|Mfr|mho|gfr|Gfr|sfr|cir|Chi|chi|nap|Cfr|vcy|Vcy|cfr|Scy|scy|ncy|Ncy|vee|Vee|Cap|cap|nfr|scE|sce|Nfr|nge|ngE|nGg|vfr|Vfr|ngt|bot|nGt|nis|niv|Rsh|rsh|nle|nlE|bne|Bfr|bfr|nLl|nlt|nLt|Bcy|bcy|not|Not|rlm|wfr|Wfr|npr|nsc|num|ocy|ast|Ocy|ofr|xfr|Xfr|Ofr|ogt|ohm|apE|olt|Rho|ape|rho|Rfr|rfr|ord|REG|ang|reg|orv|And|and|AMP|Rcy|amp|Afr|ycy|Ycy|yen|yfr|Yfr|rcy|par|pcy|Pcy|pfr|Pfr|phi|Phi|afr|Acy|acy|zcy|Zcy|piv|acE|acd|zfr|Zfr|pre|prE|psi|Psi|qfr|Qfr|zwj|Or|ge|Gg|gt|gg|el|oS|lt|Lt|LT|Re|lg|gl|eg|ne|Im|it|le|DD|wp|wr|nu|Nu|dd|lE|Sc|sc|pi|Pi|ee|af|ll|Ll|rx|gE|xi|pm|Xi|ic|pr|Pr|in|ni|mp|mu|ac|Mu|or|ap|Gt|GT|ii);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)(?!;)([=a-zA-Z0-9]?)|&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+)/g;
	var decodeMap = {'aacute':'\xE1','Aacute':'\xC1','abreve':'\u0103','Abreve':'\u0102','ac':'\u223E','acd':'\u223F','acE':'\u223E\u0333','acirc':'\xE2','Acirc':'\xC2','acute':'\xB4','acy':'\u0430','Acy':'\u0410','aelig':'\xE6','AElig':'\xC6','af':'\u2061','afr':'\uD835\uDD1E','Afr':'\uD835\uDD04','agrave':'\xE0','Agrave':'\xC0','alefsym':'\u2135','aleph':'\u2135','alpha':'\u03B1','Alpha':'\u0391','amacr':'\u0101','Amacr':'\u0100','amalg':'\u2A3F','amp':'&','AMP':'&','and':'\u2227','And':'\u2A53','andand':'\u2A55','andd':'\u2A5C','andslope':'\u2A58','andv':'\u2A5A','ang':'\u2220','ange':'\u29A4','angle':'\u2220','angmsd':'\u2221','angmsdaa':'\u29A8','angmsdab':'\u29A9','angmsdac':'\u29AA','angmsdad':'\u29AB','angmsdae':'\u29AC','angmsdaf':'\u29AD','angmsdag':'\u29AE','angmsdah':'\u29AF','angrt':'\u221F','angrtvb':'\u22BE','angrtvbd':'\u299D','angsph':'\u2222','angst':'\xC5','angzarr':'\u237C','aogon':'\u0105','Aogon':'\u0104','aopf':'\uD835\uDD52','Aopf':'\uD835\uDD38','ap':'\u2248','apacir':'\u2A6F','ape':'\u224A','apE':'\u2A70','apid':'\u224B','apos':'\'','ApplyFunction':'\u2061','approx':'\u2248','approxeq':'\u224A','aring':'\xE5','Aring':'\xC5','ascr':'\uD835\uDCB6','Ascr':'\uD835\uDC9C','Assign':'\u2254','ast':'*','asymp':'\u2248','asympeq':'\u224D','atilde':'\xE3','Atilde':'\xC3','auml':'\xE4','Auml':'\xC4','awconint':'\u2233','awint':'\u2A11','backcong':'\u224C','backepsilon':'\u03F6','backprime':'\u2035','backsim':'\u223D','backsimeq':'\u22CD','Backslash':'\u2216','Barv':'\u2AE7','barvee':'\u22BD','barwed':'\u2305','Barwed':'\u2306','barwedge':'\u2305','bbrk':'\u23B5','bbrktbrk':'\u23B6','bcong':'\u224C','bcy':'\u0431','Bcy':'\u0411','bdquo':'\u201E','becaus':'\u2235','because':'\u2235','Because':'\u2235','bemptyv':'\u29B0','bepsi':'\u03F6','bernou':'\u212C','Bernoullis':'\u212C','beta':'\u03B2','Beta':'\u0392','beth':'\u2136','between':'\u226C','bfr':'\uD835\uDD1F','Bfr':'\uD835\uDD05','bigcap':'\u22C2','bigcirc':'\u25EF','bigcup':'\u22C3','bigodot':'\u2A00','bigoplus':'\u2A01','bigotimes':'\u2A02','bigsqcup':'\u2A06','bigstar':'\u2605','bigtriangledown':'\u25BD','bigtriangleup':'\u25B3','biguplus':'\u2A04','bigvee':'\u22C1','bigwedge':'\u22C0','bkarow':'\u290D','blacklozenge':'\u29EB','blacksquare':'\u25AA','blacktriangle':'\u25B4','blacktriangledown':'\u25BE','blacktriangleleft':'\u25C2','blacktriangleright':'\u25B8','blank':'\u2423','blk12':'\u2592','blk14':'\u2591','blk34':'\u2593','block':'\u2588','bne':'=\u20E5','bnequiv':'\u2261\u20E5','bnot':'\u2310','bNot':'\u2AED','bopf':'\uD835\uDD53','Bopf':'\uD835\uDD39','bot':'\u22A5','bottom':'\u22A5','bowtie':'\u22C8','boxbox':'\u29C9','boxdl':'\u2510','boxdL':'\u2555','boxDl':'\u2556','boxDL':'\u2557','boxdr':'\u250C','boxdR':'\u2552','boxDr':'\u2553','boxDR':'\u2554','boxh':'\u2500','boxH':'\u2550','boxhd':'\u252C','boxhD':'\u2565','boxHd':'\u2564','boxHD':'\u2566','boxhu':'\u2534','boxhU':'\u2568','boxHu':'\u2567','boxHU':'\u2569','boxminus':'\u229F','boxplus':'\u229E','boxtimes':'\u22A0','boxul':'\u2518','boxuL':'\u255B','boxUl':'\u255C','boxUL':'\u255D','boxur':'\u2514','boxuR':'\u2558','boxUr':'\u2559','boxUR':'\u255A','boxv':'\u2502','boxV':'\u2551','boxvh':'\u253C','boxvH':'\u256A','boxVh':'\u256B','boxVH':'\u256C','boxvl':'\u2524','boxvL':'\u2561','boxVl':'\u2562','boxVL':'\u2563','boxvr':'\u251C','boxvR':'\u255E','boxVr':'\u255F','boxVR':'\u2560','bprime':'\u2035','breve':'\u02D8','Breve':'\u02D8','brvbar':'\xA6','bscr':'\uD835\uDCB7','Bscr':'\u212C','bsemi':'\u204F','bsim':'\u223D','bsime':'\u22CD','bsol':'\\','bsolb':'\u29C5','bsolhsub':'\u27C8','bull':'\u2022','bullet':'\u2022','bump':'\u224E','bumpe':'\u224F','bumpE':'\u2AAE','bumpeq':'\u224F','Bumpeq':'\u224E','cacute':'\u0107','Cacute':'\u0106','cap':'\u2229','Cap':'\u22D2','capand':'\u2A44','capbrcup':'\u2A49','capcap':'\u2A4B','capcup':'\u2A47','capdot':'\u2A40','CapitalDifferentialD':'\u2145','caps':'\u2229\uFE00','caret':'\u2041','caron':'\u02C7','Cayleys':'\u212D','ccaps':'\u2A4D','ccaron':'\u010D','Ccaron':'\u010C','ccedil':'\xE7','Ccedil':'\xC7','ccirc':'\u0109','Ccirc':'\u0108','Cconint':'\u2230','ccups':'\u2A4C','ccupssm':'\u2A50','cdot':'\u010B','Cdot':'\u010A','cedil':'\xB8','Cedilla':'\xB8','cemptyv':'\u29B2','cent':'\xA2','centerdot':'\xB7','CenterDot':'\xB7','cfr':'\uD835\uDD20','Cfr':'\u212D','chcy':'\u0447','CHcy':'\u0427','check':'\u2713','checkmark':'\u2713','chi':'\u03C7','Chi':'\u03A7','cir':'\u25CB','circ':'\u02C6','circeq':'\u2257','circlearrowleft':'\u21BA','circlearrowright':'\u21BB','circledast':'\u229B','circledcirc':'\u229A','circleddash':'\u229D','CircleDot':'\u2299','circledR':'\xAE','circledS':'\u24C8','CircleMinus':'\u2296','CirclePlus':'\u2295','CircleTimes':'\u2297','cire':'\u2257','cirE':'\u29C3','cirfnint':'\u2A10','cirmid':'\u2AEF','cirscir':'\u29C2','ClockwiseContourIntegral':'\u2232','CloseCurlyDoubleQuote':'\u201D','CloseCurlyQuote':'\u2019','clubs':'\u2663','clubsuit':'\u2663','colon':':','Colon':'\u2237','colone':'\u2254','Colone':'\u2A74','coloneq':'\u2254','comma':',','commat':'@','comp':'\u2201','compfn':'\u2218','complement':'\u2201','complexes':'\u2102','cong':'\u2245','congdot':'\u2A6D','Congruent':'\u2261','conint':'\u222E','Conint':'\u222F','ContourIntegral':'\u222E','copf':'\uD835\uDD54','Copf':'\u2102','coprod':'\u2210','Coproduct':'\u2210','copy':'\xA9','COPY':'\xA9','copysr':'\u2117','CounterClockwiseContourIntegral':'\u2233','crarr':'\u21B5','cross':'\u2717','Cross':'\u2A2F','cscr':'\uD835\uDCB8','Cscr':'\uD835\uDC9E','csub':'\u2ACF','csube':'\u2AD1','csup':'\u2AD0','csupe':'\u2AD2','ctdot':'\u22EF','cudarrl':'\u2938','cudarrr':'\u2935','cuepr':'\u22DE','cuesc':'\u22DF','cularr':'\u21B6','cularrp':'\u293D','cup':'\u222A','Cup':'\u22D3','cupbrcap':'\u2A48','cupcap':'\u2A46','CupCap':'\u224D','cupcup':'\u2A4A','cupdot':'\u228D','cupor':'\u2A45','cups':'\u222A\uFE00','curarr':'\u21B7','curarrm':'\u293C','curlyeqprec':'\u22DE','curlyeqsucc':'\u22DF','curlyvee':'\u22CE','curlywedge':'\u22CF','curren':'\xA4','curvearrowleft':'\u21B6','curvearrowright':'\u21B7','cuvee':'\u22CE','cuwed':'\u22CF','cwconint':'\u2232','cwint':'\u2231','cylcty':'\u232D','dagger':'\u2020','Dagger':'\u2021','daleth':'\u2138','darr':'\u2193','dArr':'\u21D3','Darr':'\u21A1','dash':'\u2010','dashv':'\u22A3','Dashv':'\u2AE4','dbkarow':'\u290F','dblac':'\u02DD','dcaron':'\u010F','Dcaron':'\u010E','dcy':'\u0434','Dcy':'\u0414','dd':'\u2146','DD':'\u2145','ddagger':'\u2021','ddarr':'\u21CA','DDotrahd':'\u2911','ddotseq':'\u2A77','deg':'\xB0','Del':'\u2207','delta':'\u03B4','Delta':'\u0394','demptyv':'\u29B1','dfisht':'\u297F','dfr':'\uD835\uDD21','Dfr':'\uD835\uDD07','dHar':'\u2965','dharl':'\u21C3','dharr':'\u21C2','DiacriticalAcute':'\xB4','DiacriticalDot':'\u02D9','DiacriticalDoubleAcute':'\u02DD','DiacriticalGrave':'`','DiacriticalTilde':'\u02DC','diam':'\u22C4','diamond':'\u22C4','Diamond':'\u22C4','diamondsuit':'\u2666','diams':'\u2666','die':'\xA8','DifferentialD':'\u2146','digamma':'\u03DD','disin':'\u22F2','div':'\xF7','divide':'\xF7','divideontimes':'\u22C7','divonx':'\u22C7','djcy':'\u0452','DJcy':'\u0402','dlcorn':'\u231E','dlcrop':'\u230D','dollar':'$','dopf':'\uD835\uDD55','Dopf':'\uD835\uDD3B','dot':'\u02D9','Dot':'\xA8','DotDot':'\u20DC','doteq':'\u2250','doteqdot':'\u2251','DotEqual':'\u2250','dotminus':'\u2238','dotplus':'\u2214','dotsquare':'\u22A1','doublebarwedge':'\u2306','DoubleContourIntegral':'\u222F','DoubleDot':'\xA8','DoubleDownArrow':'\u21D3','DoubleLeftArrow':'\u21D0','DoubleLeftRightArrow':'\u21D4','DoubleLeftTee':'\u2AE4','DoubleLongLeftArrow':'\u27F8','DoubleLongLeftRightArrow':'\u27FA','DoubleLongRightArrow':'\u27F9','DoubleRightArrow':'\u21D2','DoubleRightTee':'\u22A8','DoubleUpArrow':'\u21D1','DoubleUpDownArrow':'\u21D5','DoubleVerticalBar':'\u2225','downarrow':'\u2193','Downarrow':'\u21D3','DownArrow':'\u2193','DownArrowBar':'\u2913','DownArrowUpArrow':'\u21F5','DownBreve':'\u0311','downdownarrows':'\u21CA','downharpoonleft':'\u21C3','downharpoonright':'\u21C2','DownLeftRightVector':'\u2950','DownLeftTeeVector':'\u295E','DownLeftVector':'\u21BD','DownLeftVectorBar':'\u2956','DownRightTeeVector':'\u295F','DownRightVector':'\u21C1','DownRightVectorBar':'\u2957','DownTee':'\u22A4','DownTeeArrow':'\u21A7','drbkarow':'\u2910','drcorn':'\u231F','drcrop':'\u230C','dscr':'\uD835\uDCB9','Dscr':'\uD835\uDC9F','dscy':'\u0455','DScy':'\u0405','dsol':'\u29F6','dstrok':'\u0111','Dstrok':'\u0110','dtdot':'\u22F1','dtri':'\u25BF','dtrif':'\u25BE','duarr':'\u21F5','duhar':'\u296F','dwangle':'\u29A6','dzcy':'\u045F','DZcy':'\u040F','dzigrarr':'\u27FF','eacute':'\xE9','Eacute':'\xC9','easter':'\u2A6E','ecaron':'\u011B','Ecaron':'\u011A','ecir':'\u2256','ecirc':'\xEA','Ecirc':'\xCA','ecolon':'\u2255','ecy':'\u044D','Ecy':'\u042D','eDDot':'\u2A77','edot':'\u0117','eDot':'\u2251','Edot':'\u0116','ee':'\u2147','efDot':'\u2252','efr':'\uD835\uDD22','Efr':'\uD835\uDD08','eg':'\u2A9A','egrave':'\xE8','Egrave':'\xC8','egs':'\u2A96','egsdot':'\u2A98','el':'\u2A99','Element':'\u2208','elinters':'\u23E7','ell':'\u2113','els':'\u2A95','elsdot':'\u2A97','emacr':'\u0113','Emacr':'\u0112','empty':'\u2205','emptyset':'\u2205','EmptySmallSquare':'\u25FB','emptyv':'\u2205','EmptyVerySmallSquare':'\u25AB','emsp':'\u2003','emsp13':'\u2004','emsp14':'\u2005','eng':'\u014B','ENG':'\u014A','ensp':'\u2002','eogon':'\u0119','Eogon':'\u0118','eopf':'\uD835\uDD56','Eopf':'\uD835\uDD3C','epar':'\u22D5','eparsl':'\u29E3','eplus':'\u2A71','epsi':'\u03B5','epsilon':'\u03B5','Epsilon':'\u0395','epsiv':'\u03F5','eqcirc':'\u2256','eqcolon':'\u2255','eqsim':'\u2242','eqslantgtr':'\u2A96','eqslantless':'\u2A95','Equal':'\u2A75','equals':'=','EqualTilde':'\u2242','equest':'\u225F','Equilibrium':'\u21CC','equiv':'\u2261','equivDD':'\u2A78','eqvparsl':'\u29E5','erarr':'\u2971','erDot':'\u2253','escr':'\u212F','Escr':'\u2130','esdot':'\u2250','esim':'\u2242','Esim':'\u2A73','eta':'\u03B7','Eta':'\u0397','eth':'\xF0','ETH':'\xD0','euml':'\xEB','Euml':'\xCB','euro':'\u20AC','excl':'!','exist':'\u2203','Exists':'\u2203','expectation':'\u2130','exponentiale':'\u2147','ExponentialE':'\u2147','fallingdotseq':'\u2252','fcy':'\u0444','Fcy':'\u0424','female':'\u2640','ffilig':'\uFB03','fflig':'\uFB00','ffllig':'\uFB04','ffr':'\uD835\uDD23','Ffr':'\uD835\uDD09','filig':'\uFB01','FilledSmallSquare':'\u25FC','FilledVerySmallSquare':'\u25AA','fjlig':'fj','flat':'\u266D','fllig':'\uFB02','fltns':'\u25B1','fnof':'\u0192','fopf':'\uD835\uDD57','Fopf':'\uD835\uDD3D','forall':'\u2200','ForAll':'\u2200','fork':'\u22D4','forkv':'\u2AD9','Fouriertrf':'\u2131','fpartint':'\u2A0D','frac12':'\xBD','frac13':'\u2153','frac14':'\xBC','frac15':'\u2155','frac16':'\u2159','frac18':'\u215B','frac23':'\u2154','frac25':'\u2156','frac34':'\xBE','frac35':'\u2157','frac38':'\u215C','frac45':'\u2158','frac56':'\u215A','frac58':'\u215D','frac78':'\u215E','frasl':'\u2044','frown':'\u2322','fscr':'\uD835\uDCBB','Fscr':'\u2131','gacute':'\u01F5','gamma':'\u03B3','Gamma':'\u0393','gammad':'\u03DD','Gammad':'\u03DC','gap':'\u2A86','gbreve':'\u011F','Gbreve':'\u011E','Gcedil':'\u0122','gcirc':'\u011D','Gcirc':'\u011C','gcy':'\u0433','Gcy':'\u0413','gdot':'\u0121','Gdot':'\u0120','ge':'\u2265','gE':'\u2267','gel':'\u22DB','gEl':'\u2A8C','geq':'\u2265','geqq':'\u2267','geqslant':'\u2A7E','ges':'\u2A7E','gescc':'\u2AA9','gesdot':'\u2A80','gesdoto':'\u2A82','gesdotol':'\u2A84','gesl':'\u22DB\uFE00','gesles':'\u2A94','gfr':'\uD835\uDD24','Gfr':'\uD835\uDD0A','gg':'\u226B','Gg':'\u22D9','ggg':'\u22D9','gimel':'\u2137','gjcy':'\u0453','GJcy':'\u0403','gl':'\u2277','gla':'\u2AA5','glE':'\u2A92','glj':'\u2AA4','gnap':'\u2A8A','gnapprox':'\u2A8A','gne':'\u2A88','gnE':'\u2269','gneq':'\u2A88','gneqq':'\u2269','gnsim':'\u22E7','gopf':'\uD835\uDD58','Gopf':'\uD835\uDD3E','grave':'`','GreaterEqual':'\u2265','GreaterEqualLess':'\u22DB','GreaterFullEqual':'\u2267','GreaterGreater':'\u2AA2','GreaterLess':'\u2277','GreaterSlantEqual':'\u2A7E','GreaterTilde':'\u2273','gscr':'\u210A','Gscr':'\uD835\uDCA2','gsim':'\u2273','gsime':'\u2A8E','gsiml':'\u2A90','gt':'>','Gt':'\u226B','GT':'>','gtcc':'\u2AA7','gtcir':'\u2A7A','gtdot':'\u22D7','gtlPar':'\u2995','gtquest':'\u2A7C','gtrapprox':'\u2A86','gtrarr':'\u2978','gtrdot':'\u22D7','gtreqless':'\u22DB','gtreqqless':'\u2A8C','gtrless':'\u2277','gtrsim':'\u2273','gvertneqq':'\u2269\uFE00','gvnE':'\u2269\uFE00','Hacek':'\u02C7','hairsp':'\u200A','half':'\xBD','hamilt':'\u210B','hardcy':'\u044A','HARDcy':'\u042A','harr':'\u2194','hArr':'\u21D4','harrcir':'\u2948','harrw':'\u21AD','Hat':'^','hbar':'\u210F','hcirc':'\u0125','Hcirc':'\u0124','hearts':'\u2665','heartsuit':'\u2665','hellip':'\u2026','hercon':'\u22B9','hfr':'\uD835\uDD25','Hfr':'\u210C','HilbertSpace':'\u210B','hksearow':'\u2925','hkswarow':'\u2926','hoarr':'\u21FF','homtht':'\u223B','hookleftarrow':'\u21A9','hookrightarrow':'\u21AA','hopf':'\uD835\uDD59','Hopf':'\u210D','horbar':'\u2015','HorizontalLine':'\u2500','hscr':'\uD835\uDCBD','Hscr':'\u210B','hslash':'\u210F','hstrok':'\u0127','Hstrok':'\u0126','HumpDownHump':'\u224E','HumpEqual':'\u224F','hybull':'\u2043','hyphen':'\u2010','iacute':'\xED','Iacute':'\xCD','ic':'\u2063','icirc':'\xEE','Icirc':'\xCE','icy':'\u0438','Icy':'\u0418','Idot':'\u0130','iecy':'\u0435','IEcy':'\u0415','iexcl':'\xA1','iff':'\u21D4','ifr':'\uD835\uDD26','Ifr':'\u2111','igrave':'\xEC','Igrave':'\xCC','ii':'\u2148','iiiint':'\u2A0C','iiint':'\u222D','iinfin':'\u29DC','iiota':'\u2129','ijlig':'\u0133','IJlig':'\u0132','Im':'\u2111','imacr':'\u012B','Imacr':'\u012A','image':'\u2111','ImaginaryI':'\u2148','imagline':'\u2110','imagpart':'\u2111','imath':'\u0131','imof':'\u22B7','imped':'\u01B5','Implies':'\u21D2','in':'\u2208','incare':'\u2105','infin':'\u221E','infintie':'\u29DD','inodot':'\u0131','int':'\u222B','Int':'\u222C','intcal':'\u22BA','integers':'\u2124','Integral':'\u222B','intercal':'\u22BA','Intersection':'\u22C2','intlarhk':'\u2A17','intprod':'\u2A3C','InvisibleComma':'\u2063','InvisibleTimes':'\u2062','iocy':'\u0451','IOcy':'\u0401','iogon':'\u012F','Iogon':'\u012E','iopf':'\uD835\uDD5A','Iopf':'\uD835\uDD40','iota':'\u03B9','Iota':'\u0399','iprod':'\u2A3C','iquest':'\xBF','iscr':'\uD835\uDCBE','Iscr':'\u2110','isin':'\u2208','isindot':'\u22F5','isinE':'\u22F9','isins':'\u22F4','isinsv':'\u22F3','isinv':'\u2208','it':'\u2062','itilde':'\u0129','Itilde':'\u0128','iukcy':'\u0456','Iukcy':'\u0406','iuml':'\xEF','Iuml':'\xCF','jcirc':'\u0135','Jcirc':'\u0134','jcy':'\u0439','Jcy':'\u0419','jfr':'\uD835\uDD27','Jfr':'\uD835\uDD0D','jmath':'\u0237','jopf':'\uD835\uDD5B','Jopf':'\uD835\uDD41','jscr':'\uD835\uDCBF','Jscr':'\uD835\uDCA5','jsercy':'\u0458','Jsercy':'\u0408','jukcy':'\u0454','Jukcy':'\u0404','kappa':'\u03BA','Kappa':'\u039A','kappav':'\u03F0','kcedil':'\u0137','Kcedil':'\u0136','kcy':'\u043A','Kcy':'\u041A','kfr':'\uD835\uDD28','Kfr':'\uD835\uDD0E','kgreen':'\u0138','khcy':'\u0445','KHcy':'\u0425','kjcy':'\u045C','KJcy':'\u040C','kopf':'\uD835\uDD5C','Kopf':'\uD835\uDD42','kscr':'\uD835\uDCC0','Kscr':'\uD835\uDCA6','lAarr':'\u21DA','lacute':'\u013A','Lacute':'\u0139','laemptyv':'\u29B4','lagran':'\u2112','lambda':'\u03BB','Lambda':'\u039B','lang':'\u27E8','Lang':'\u27EA','langd':'\u2991','langle':'\u27E8','lap':'\u2A85','Laplacetrf':'\u2112','laquo':'\xAB','larr':'\u2190','lArr':'\u21D0','Larr':'\u219E','larrb':'\u21E4','larrbfs':'\u291F','larrfs':'\u291D','larrhk':'\u21A9','larrlp':'\u21AB','larrpl':'\u2939','larrsim':'\u2973','larrtl':'\u21A2','lat':'\u2AAB','latail':'\u2919','lAtail':'\u291B','late':'\u2AAD','lates':'\u2AAD\uFE00','lbarr':'\u290C','lBarr':'\u290E','lbbrk':'\u2772','lbrace':'{','lbrack':'[','lbrke':'\u298B','lbrksld':'\u298F','lbrkslu':'\u298D','lcaron':'\u013E','Lcaron':'\u013D','lcedil':'\u013C','Lcedil':'\u013B','lceil':'\u2308','lcub':'{','lcy':'\u043B','Lcy':'\u041B','ldca':'\u2936','ldquo':'\u201C','ldquor':'\u201E','ldrdhar':'\u2967','ldrushar':'\u294B','ldsh':'\u21B2','le':'\u2264','lE':'\u2266','LeftAngleBracket':'\u27E8','leftarrow':'\u2190','Leftarrow':'\u21D0','LeftArrow':'\u2190','LeftArrowBar':'\u21E4','LeftArrowRightArrow':'\u21C6','leftarrowtail':'\u21A2','LeftCeiling':'\u2308','LeftDoubleBracket':'\u27E6','LeftDownTeeVector':'\u2961','LeftDownVector':'\u21C3','LeftDownVectorBar':'\u2959','LeftFloor':'\u230A','leftharpoondown':'\u21BD','leftharpoonup':'\u21BC','leftleftarrows':'\u21C7','leftrightarrow':'\u2194','Leftrightarrow':'\u21D4','LeftRightArrow':'\u2194','leftrightarrows':'\u21C6','leftrightharpoons':'\u21CB','leftrightsquigarrow':'\u21AD','LeftRightVector':'\u294E','LeftTee':'\u22A3','LeftTeeArrow':'\u21A4','LeftTeeVector':'\u295A','leftthreetimes':'\u22CB','LeftTriangle':'\u22B2','LeftTriangleBar':'\u29CF','LeftTriangleEqual':'\u22B4','LeftUpDownVector':'\u2951','LeftUpTeeVector':'\u2960','LeftUpVector':'\u21BF','LeftUpVectorBar':'\u2958','LeftVector':'\u21BC','LeftVectorBar':'\u2952','leg':'\u22DA','lEg':'\u2A8B','leq':'\u2264','leqq':'\u2266','leqslant':'\u2A7D','les':'\u2A7D','lescc':'\u2AA8','lesdot':'\u2A7F','lesdoto':'\u2A81','lesdotor':'\u2A83','lesg':'\u22DA\uFE00','lesges':'\u2A93','lessapprox':'\u2A85','lessdot':'\u22D6','lesseqgtr':'\u22DA','lesseqqgtr':'\u2A8B','LessEqualGreater':'\u22DA','LessFullEqual':'\u2266','LessGreater':'\u2276','lessgtr':'\u2276','LessLess':'\u2AA1','lesssim':'\u2272','LessSlantEqual':'\u2A7D','LessTilde':'\u2272','lfisht':'\u297C','lfloor':'\u230A','lfr':'\uD835\uDD29','Lfr':'\uD835\uDD0F','lg':'\u2276','lgE':'\u2A91','lHar':'\u2962','lhard':'\u21BD','lharu':'\u21BC','lharul':'\u296A','lhblk':'\u2584','ljcy':'\u0459','LJcy':'\u0409','ll':'\u226A','Ll':'\u22D8','llarr':'\u21C7','llcorner':'\u231E','Lleftarrow':'\u21DA','llhard':'\u296B','lltri':'\u25FA','lmidot':'\u0140','Lmidot':'\u013F','lmoust':'\u23B0','lmoustache':'\u23B0','lnap':'\u2A89','lnapprox':'\u2A89','lne':'\u2A87','lnE':'\u2268','lneq':'\u2A87','lneqq':'\u2268','lnsim':'\u22E6','loang':'\u27EC','loarr':'\u21FD','lobrk':'\u27E6','longleftarrow':'\u27F5','Longleftarrow':'\u27F8','LongLeftArrow':'\u27F5','longleftrightarrow':'\u27F7','Longleftrightarrow':'\u27FA','LongLeftRightArrow':'\u27F7','longmapsto':'\u27FC','longrightarrow':'\u27F6','Longrightarrow':'\u27F9','LongRightArrow':'\u27F6','looparrowleft':'\u21AB','looparrowright':'\u21AC','lopar':'\u2985','lopf':'\uD835\uDD5D','Lopf':'\uD835\uDD43','loplus':'\u2A2D','lotimes':'\u2A34','lowast':'\u2217','lowbar':'_','LowerLeftArrow':'\u2199','LowerRightArrow':'\u2198','loz':'\u25CA','lozenge':'\u25CA','lozf':'\u29EB','lpar':'(','lparlt':'\u2993','lrarr':'\u21C6','lrcorner':'\u231F','lrhar':'\u21CB','lrhard':'\u296D','lrm':'\u200E','lrtri':'\u22BF','lsaquo':'\u2039','lscr':'\uD835\uDCC1','Lscr':'\u2112','lsh':'\u21B0','Lsh':'\u21B0','lsim':'\u2272','lsime':'\u2A8D','lsimg':'\u2A8F','lsqb':'[','lsquo':'\u2018','lsquor':'\u201A','lstrok':'\u0142','Lstrok':'\u0141','lt':'<','Lt':'\u226A','LT':'<','ltcc':'\u2AA6','ltcir':'\u2A79','ltdot':'\u22D6','lthree':'\u22CB','ltimes':'\u22C9','ltlarr':'\u2976','ltquest':'\u2A7B','ltri':'\u25C3','ltrie':'\u22B4','ltrif':'\u25C2','ltrPar':'\u2996','lurdshar':'\u294A','luruhar':'\u2966','lvertneqq':'\u2268\uFE00','lvnE':'\u2268\uFE00','macr':'\xAF','male':'\u2642','malt':'\u2720','maltese':'\u2720','map':'\u21A6','Map':'\u2905','mapsto':'\u21A6','mapstodown':'\u21A7','mapstoleft':'\u21A4','mapstoup':'\u21A5','marker':'\u25AE','mcomma':'\u2A29','mcy':'\u043C','Mcy':'\u041C','mdash':'\u2014','mDDot':'\u223A','measuredangle':'\u2221','MediumSpace':'\u205F','Mellintrf':'\u2133','mfr':'\uD835\uDD2A','Mfr':'\uD835\uDD10','mho':'\u2127','micro':'\xB5','mid':'\u2223','midast':'*','midcir':'\u2AF0','middot':'\xB7','minus':'\u2212','minusb':'\u229F','minusd':'\u2238','minusdu':'\u2A2A','MinusPlus':'\u2213','mlcp':'\u2ADB','mldr':'\u2026','mnplus':'\u2213','models':'\u22A7','mopf':'\uD835\uDD5E','Mopf':'\uD835\uDD44','mp':'\u2213','mscr':'\uD835\uDCC2','Mscr':'\u2133','mstpos':'\u223E','mu':'\u03BC','Mu':'\u039C','multimap':'\u22B8','mumap':'\u22B8','nabla':'\u2207','nacute':'\u0144','Nacute':'\u0143','nang':'\u2220\u20D2','nap':'\u2249','napE':'\u2A70\u0338','napid':'\u224B\u0338','napos':'\u0149','napprox':'\u2249','natur':'\u266E','natural':'\u266E','naturals':'\u2115','nbsp':'\xA0','nbump':'\u224E\u0338','nbumpe':'\u224F\u0338','ncap':'\u2A43','ncaron':'\u0148','Ncaron':'\u0147','ncedil':'\u0146','Ncedil':'\u0145','ncong':'\u2247','ncongdot':'\u2A6D\u0338','ncup':'\u2A42','ncy':'\u043D','Ncy':'\u041D','ndash':'\u2013','ne':'\u2260','nearhk':'\u2924','nearr':'\u2197','neArr':'\u21D7','nearrow':'\u2197','nedot':'\u2250\u0338','NegativeMediumSpace':'\u200B','NegativeThickSpace':'\u200B','NegativeThinSpace':'\u200B','NegativeVeryThinSpace':'\u200B','nequiv':'\u2262','nesear':'\u2928','nesim':'\u2242\u0338','NestedGreaterGreater':'\u226B','NestedLessLess':'\u226A','NewLine':'\n','nexist':'\u2204','nexists':'\u2204','nfr':'\uD835\uDD2B','Nfr':'\uD835\uDD11','nge':'\u2271','ngE':'\u2267\u0338','ngeq':'\u2271','ngeqq':'\u2267\u0338','ngeqslant':'\u2A7E\u0338','nges':'\u2A7E\u0338','nGg':'\u22D9\u0338','ngsim':'\u2275','ngt':'\u226F','nGt':'\u226B\u20D2','ngtr':'\u226F','nGtv':'\u226B\u0338','nharr':'\u21AE','nhArr':'\u21CE','nhpar':'\u2AF2','ni':'\u220B','nis':'\u22FC','nisd':'\u22FA','niv':'\u220B','njcy':'\u045A','NJcy':'\u040A','nlarr':'\u219A','nlArr':'\u21CD','nldr':'\u2025','nle':'\u2270','nlE':'\u2266\u0338','nleftarrow':'\u219A','nLeftarrow':'\u21CD','nleftrightarrow':'\u21AE','nLeftrightarrow':'\u21CE','nleq':'\u2270','nleqq':'\u2266\u0338','nleqslant':'\u2A7D\u0338','nles':'\u2A7D\u0338','nless':'\u226E','nLl':'\u22D8\u0338','nlsim':'\u2274','nlt':'\u226E','nLt':'\u226A\u20D2','nltri':'\u22EA','nltrie':'\u22EC','nLtv':'\u226A\u0338','nmid':'\u2224','NoBreak':'\u2060','NonBreakingSpace':'\xA0','nopf':'\uD835\uDD5F','Nopf':'\u2115','not':'\xAC','Not':'\u2AEC','NotCongruent':'\u2262','NotCupCap':'\u226D','NotDoubleVerticalBar':'\u2226','NotElement':'\u2209','NotEqual':'\u2260','NotEqualTilde':'\u2242\u0338','NotExists':'\u2204','NotGreater':'\u226F','NotGreaterEqual':'\u2271','NotGreaterFullEqual':'\u2267\u0338','NotGreaterGreater':'\u226B\u0338','NotGreaterLess':'\u2279','NotGreaterSlantEqual':'\u2A7E\u0338','NotGreaterTilde':'\u2275','NotHumpDownHump':'\u224E\u0338','NotHumpEqual':'\u224F\u0338','notin':'\u2209','notindot':'\u22F5\u0338','notinE':'\u22F9\u0338','notinva':'\u2209','notinvb':'\u22F7','notinvc':'\u22F6','NotLeftTriangle':'\u22EA','NotLeftTriangleBar':'\u29CF\u0338','NotLeftTriangleEqual':'\u22EC','NotLess':'\u226E','NotLessEqual':'\u2270','NotLessGreater':'\u2278','NotLessLess':'\u226A\u0338','NotLessSlantEqual':'\u2A7D\u0338','NotLessTilde':'\u2274','NotNestedGreaterGreater':'\u2AA2\u0338','NotNestedLessLess':'\u2AA1\u0338','notni':'\u220C','notniva':'\u220C','notnivb':'\u22FE','notnivc':'\u22FD','NotPrecedes':'\u2280','NotPrecedesEqual':'\u2AAF\u0338','NotPrecedesSlantEqual':'\u22E0','NotReverseElement':'\u220C','NotRightTriangle':'\u22EB','NotRightTriangleBar':'\u29D0\u0338','NotRightTriangleEqual':'\u22ED','NotSquareSubset':'\u228F\u0338','NotSquareSubsetEqual':'\u22E2','NotSquareSuperset':'\u2290\u0338','NotSquareSupersetEqual':'\u22E3','NotSubset':'\u2282\u20D2','NotSubsetEqual':'\u2288','NotSucceeds':'\u2281','NotSucceedsEqual':'\u2AB0\u0338','NotSucceedsSlantEqual':'\u22E1','NotSucceedsTilde':'\u227F\u0338','NotSuperset':'\u2283\u20D2','NotSupersetEqual':'\u2289','NotTilde':'\u2241','NotTildeEqual':'\u2244','NotTildeFullEqual':'\u2247','NotTildeTilde':'\u2249','NotVerticalBar':'\u2224','npar':'\u2226','nparallel':'\u2226','nparsl':'\u2AFD\u20E5','npart':'\u2202\u0338','npolint':'\u2A14','npr':'\u2280','nprcue':'\u22E0','npre':'\u2AAF\u0338','nprec':'\u2280','npreceq':'\u2AAF\u0338','nrarr':'\u219B','nrArr':'\u21CF','nrarrc':'\u2933\u0338','nrarrw':'\u219D\u0338','nrightarrow':'\u219B','nRightarrow':'\u21CF','nrtri':'\u22EB','nrtrie':'\u22ED','nsc':'\u2281','nsccue':'\u22E1','nsce':'\u2AB0\u0338','nscr':'\uD835\uDCC3','Nscr':'\uD835\uDCA9','nshortmid':'\u2224','nshortparallel':'\u2226','nsim':'\u2241','nsime':'\u2244','nsimeq':'\u2244','nsmid':'\u2224','nspar':'\u2226','nsqsube':'\u22E2','nsqsupe':'\u22E3','nsub':'\u2284','nsube':'\u2288','nsubE':'\u2AC5\u0338','nsubset':'\u2282\u20D2','nsubseteq':'\u2288','nsubseteqq':'\u2AC5\u0338','nsucc':'\u2281','nsucceq':'\u2AB0\u0338','nsup':'\u2285','nsupe':'\u2289','nsupE':'\u2AC6\u0338','nsupset':'\u2283\u20D2','nsupseteq':'\u2289','nsupseteqq':'\u2AC6\u0338','ntgl':'\u2279','ntilde':'\xF1','Ntilde':'\xD1','ntlg':'\u2278','ntriangleleft':'\u22EA','ntrianglelefteq':'\u22EC','ntriangleright':'\u22EB','ntrianglerighteq':'\u22ED','nu':'\u03BD','Nu':'\u039D','num':'#','numero':'\u2116','numsp':'\u2007','nvap':'\u224D\u20D2','nvdash':'\u22AC','nvDash':'\u22AD','nVdash':'\u22AE','nVDash':'\u22AF','nvge':'\u2265\u20D2','nvgt':'>\u20D2','nvHarr':'\u2904','nvinfin':'\u29DE','nvlArr':'\u2902','nvle':'\u2264\u20D2','nvlt':'<\u20D2','nvltrie':'\u22B4\u20D2','nvrArr':'\u2903','nvrtrie':'\u22B5\u20D2','nvsim':'\u223C\u20D2','nwarhk':'\u2923','nwarr':'\u2196','nwArr':'\u21D6','nwarrow':'\u2196','nwnear':'\u2927','oacute':'\xF3','Oacute':'\xD3','oast':'\u229B','ocir':'\u229A','ocirc':'\xF4','Ocirc':'\xD4','ocy':'\u043E','Ocy':'\u041E','odash':'\u229D','odblac':'\u0151','Odblac':'\u0150','odiv':'\u2A38','odot':'\u2299','odsold':'\u29BC','oelig':'\u0153','OElig':'\u0152','ofcir':'\u29BF','ofr':'\uD835\uDD2C','Ofr':'\uD835\uDD12','ogon':'\u02DB','ograve':'\xF2','Ograve':'\xD2','ogt':'\u29C1','ohbar':'\u29B5','ohm':'\u03A9','oint':'\u222E','olarr':'\u21BA','olcir':'\u29BE','olcross':'\u29BB','oline':'\u203E','olt':'\u29C0','omacr':'\u014D','Omacr':'\u014C','omega':'\u03C9','Omega':'\u03A9','omicron':'\u03BF','Omicron':'\u039F','omid':'\u29B6','ominus':'\u2296','oopf':'\uD835\uDD60','Oopf':'\uD835\uDD46','opar':'\u29B7','OpenCurlyDoubleQuote':'\u201C','OpenCurlyQuote':'\u2018','operp':'\u29B9','oplus':'\u2295','or':'\u2228','Or':'\u2A54','orarr':'\u21BB','ord':'\u2A5D','order':'\u2134','orderof':'\u2134','ordf':'\xAA','ordm':'\xBA','origof':'\u22B6','oror':'\u2A56','orslope':'\u2A57','orv':'\u2A5B','oS':'\u24C8','oscr':'\u2134','Oscr':'\uD835\uDCAA','oslash':'\xF8','Oslash':'\xD8','osol':'\u2298','otilde':'\xF5','Otilde':'\xD5','otimes':'\u2297','Otimes':'\u2A37','otimesas':'\u2A36','ouml':'\xF6','Ouml':'\xD6','ovbar':'\u233D','OverBar':'\u203E','OverBrace':'\u23DE','OverBracket':'\u23B4','OverParenthesis':'\u23DC','par':'\u2225','para':'\xB6','parallel':'\u2225','parsim':'\u2AF3','parsl':'\u2AFD','part':'\u2202','PartialD':'\u2202','pcy':'\u043F','Pcy':'\u041F','percnt':'%','period':'.','permil':'\u2030','perp':'\u22A5','pertenk':'\u2031','pfr':'\uD835\uDD2D','Pfr':'\uD835\uDD13','phi':'\u03C6','Phi':'\u03A6','phiv':'\u03D5','phmmat':'\u2133','phone':'\u260E','pi':'\u03C0','Pi':'\u03A0','pitchfork':'\u22D4','piv':'\u03D6','planck':'\u210F','planckh':'\u210E','plankv':'\u210F','plus':'+','plusacir':'\u2A23','plusb':'\u229E','pluscir':'\u2A22','plusdo':'\u2214','plusdu':'\u2A25','pluse':'\u2A72','PlusMinus':'\xB1','plusmn':'\xB1','plussim':'\u2A26','plustwo':'\u2A27','pm':'\xB1','Poincareplane':'\u210C','pointint':'\u2A15','popf':'\uD835\uDD61','Popf':'\u2119','pound':'\xA3','pr':'\u227A','Pr':'\u2ABB','prap':'\u2AB7','prcue':'\u227C','pre':'\u2AAF','prE':'\u2AB3','prec':'\u227A','precapprox':'\u2AB7','preccurlyeq':'\u227C','Precedes':'\u227A','PrecedesEqual':'\u2AAF','PrecedesSlantEqual':'\u227C','PrecedesTilde':'\u227E','preceq':'\u2AAF','precnapprox':'\u2AB9','precneqq':'\u2AB5','precnsim':'\u22E8','precsim':'\u227E','prime':'\u2032','Prime':'\u2033','primes':'\u2119','prnap':'\u2AB9','prnE':'\u2AB5','prnsim':'\u22E8','prod':'\u220F','Product':'\u220F','profalar':'\u232E','profline':'\u2312','profsurf':'\u2313','prop':'\u221D','Proportion':'\u2237','Proportional':'\u221D','propto':'\u221D','prsim':'\u227E','prurel':'\u22B0','pscr':'\uD835\uDCC5','Pscr':'\uD835\uDCAB','psi':'\u03C8','Psi':'\u03A8','puncsp':'\u2008','qfr':'\uD835\uDD2E','Qfr':'\uD835\uDD14','qint':'\u2A0C','qopf':'\uD835\uDD62','Qopf':'\u211A','qprime':'\u2057','qscr':'\uD835\uDCC6','Qscr':'\uD835\uDCAC','quaternions':'\u210D','quatint':'\u2A16','quest':'?','questeq':'\u225F','quot':'"','QUOT':'"','rAarr':'\u21DB','race':'\u223D\u0331','racute':'\u0155','Racute':'\u0154','radic':'\u221A','raemptyv':'\u29B3','rang':'\u27E9','Rang':'\u27EB','rangd':'\u2992','range':'\u29A5','rangle':'\u27E9','raquo':'\xBB','rarr':'\u2192','rArr':'\u21D2','Rarr':'\u21A0','rarrap':'\u2975','rarrb':'\u21E5','rarrbfs':'\u2920','rarrc':'\u2933','rarrfs':'\u291E','rarrhk':'\u21AA','rarrlp':'\u21AC','rarrpl':'\u2945','rarrsim':'\u2974','rarrtl':'\u21A3','Rarrtl':'\u2916','rarrw':'\u219D','ratail':'\u291A','rAtail':'\u291C','ratio':'\u2236','rationals':'\u211A','rbarr':'\u290D','rBarr':'\u290F','RBarr':'\u2910','rbbrk':'\u2773','rbrace':'}','rbrack':']','rbrke':'\u298C','rbrksld':'\u298E','rbrkslu':'\u2990','rcaron':'\u0159','Rcaron':'\u0158','rcedil':'\u0157','Rcedil':'\u0156','rceil':'\u2309','rcub':'}','rcy':'\u0440','Rcy':'\u0420','rdca':'\u2937','rdldhar':'\u2969','rdquo':'\u201D','rdquor':'\u201D','rdsh':'\u21B3','Re':'\u211C','real':'\u211C','realine':'\u211B','realpart':'\u211C','reals':'\u211D','rect':'\u25AD','reg':'\xAE','REG':'\xAE','ReverseElement':'\u220B','ReverseEquilibrium':'\u21CB','ReverseUpEquilibrium':'\u296F','rfisht':'\u297D','rfloor':'\u230B','rfr':'\uD835\uDD2F','Rfr':'\u211C','rHar':'\u2964','rhard':'\u21C1','rharu':'\u21C0','rharul':'\u296C','rho':'\u03C1','Rho':'\u03A1','rhov':'\u03F1','RightAngleBracket':'\u27E9','rightarrow':'\u2192','Rightarrow':'\u21D2','RightArrow':'\u2192','RightArrowBar':'\u21E5','RightArrowLeftArrow':'\u21C4','rightarrowtail':'\u21A3','RightCeiling':'\u2309','RightDoubleBracket':'\u27E7','RightDownTeeVector':'\u295D','RightDownVector':'\u21C2','RightDownVectorBar':'\u2955','RightFloor':'\u230B','rightharpoondown':'\u21C1','rightharpoonup':'\u21C0','rightleftarrows':'\u21C4','rightleftharpoons':'\u21CC','rightrightarrows':'\u21C9','rightsquigarrow':'\u219D','RightTee':'\u22A2','RightTeeArrow':'\u21A6','RightTeeVector':'\u295B','rightthreetimes':'\u22CC','RightTriangle':'\u22B3','RightTriangleBar':'\u29D0','RightTriangleEqual':'\u22B5','RightUpDownVector':'\u294F','RightUpTeeVector':'\u295C','RightUpVector':'\u21BE','RightUpVectorBar':'\u2954','RightVector':'\u21C0','RightVectorBar':'\u2953','ring':'\u02DA','risingdotseq':'\u2253','rlarr':'\u21C4','rlhar':'\u21CC','rlm':'\u200F','rmoust':'\u23B1','rmoustache':'\u23B1','rnmid':'\u2AEE','roang':'\u27ED','roarr':'\u21FE','robrk':'\u27E7','ropar':'\u2986','ropf':'\uD835\uDD63','Ropf':'\u211D','roplus':'\u2A2E','rotimes':'\u2A35','RoundImplies':'\u2970','rpar':')','rpargt':'\u2994','rppolint':'\u2A12','rrarr':'\u21C9','Rrightarrow':'\u21DB','rsaquo':'\u203A','rscr':'\uD835\uDCC7','Rscr':'\u211B','rsh':'\u21B1','Rsh':'\u21B1','rsqb':']','rsquo':'\u2019','rsquor':'\u2019','rthree':'\u22CC','rtimes':'\u22CA','rtri':'\u25B9','rtrie':'\u22B5','rtrif':'\u25B8','rtriltri':'\u29CE','RuleDelayed':'\u29F4','ruluhar':'\u2968','rx':'\u211E','sacute':'\u015B','Sacute':'\u015A','sbquo':'\u201A','sc':'\u227B','Sc':'\u2ABC','scap':'\u2AB8','scaron':'\u0161','Scaron':'\u0160','sccue':'\u227D','sce':'\u2AB0','scE':'\u2AB4','scedil':'\u015F','Scedil':'\u015E','scirc':'\u015D','Scirc':'\u015C','scnap':'\u2ABA','scnE':'\u2AB6','scnsim':'\u22E9','scpolint':'\u2A13','scsim':'\u227F','scy':'\u0441','Scy':'\u0421','sdot':'\u22C5','sdotb':'\u22A1','sdote':'\u2A66','searhk':'\u2925','searr':'\u2198','seArr':'\u21D8','searrow':'\u2198','sect':'\xA7','semi':';','seswar':'\u2929','setminus':'\u2216','setmn':'\u2216','sext':'\u2736','sfr':'\uD835\uDD30','Sfr':'\uD835\uDD16','sfrown':'\u2322','sharp':'\u266F','shchcy':'\u0449','SHCHcy':'\u0429','shcy':'\u0448','SHcy':'\u0428','ShortDownArrow':'\u2193','ShortLeftArrow':'\u2190','shortmid':'\u2223','shortparallel':'\u2225','ShortRightArrow':'\u2192','ShortUpArrow':'\u2191','shy':'\xAD','sigma':'\u03C3','Sigma':'\u03A3','sigmaf':'\u03C2','sigmav':'\u03C2','sim':'\u223C','simdot':'\u2A6A','sime':'\u2243','simeq':'\u2243','simg':'\u2A9E','simgE':'\u2AA0','siml':'\u2A9D','simlE':'\u2A9F','simne':'\u2246','simplus':'\u2A24','simrarr':'\u2972','slarr':'\u2190','SmallCircle':'\u2218','smallsetminus':'\u2216','smashp':'\u2A33','smeparsl':'\u29E4','smid':'\u2223','smile':'\u2323','smt':'\u2AAA','smte':'\u2AAC','smtes':'\u2AAC\uFE00','softcy':'\u044C','SOFTcy':'\u042C','sol':'/','solb':'\u29C4','solbar':'\u233F','sopf':'\uD835\uDD64','Sopf':'\uD835\uDD4A','spades':'\u2660','spadesuit':'\u2660','spar':'\u2225','sqcap':'\u2293','sqcaps':'\u2293\uFE00','sqcup':'\u2294','sqcups':'\u2294\uFE00','Sqrt':'\u221A','sqsub':'\u228F','sqsube':'\u2291','sqsubset':'\u228F','sqsubseteq':'\u2291','sqsup':'\u2290','sqsupe':'\u2292','sqsupset':'\u2290','sqsupseteq':'\u2292','squ':'\u25A1','square':'\u25A1','Square':'\u25A1','SquareIntersection':'\u2293','SquareSubset':'\u228F','SquareSubsetEqual':'\u2291','SquareSuperset':'\u2290','SquareSupersetEqual':'\u2292','SquareUnion':'\u2294','squarf':'\u25AA','squf':'\u25AA','srarr':'\u2192','sscr':'\uD835\uDCC8','Sscr':'\uD835\uDCAE','ssetmn':'\u2216','ssmile':'\u2323','sstarf':'\u22C6','star':'\u2606','Star':'\u22C6','starf':'\u2605','straightepsilon':'\u03F5','straightphi':'\u03D5','strns':'\xAF','sub':'\u2282','Sub':'\u22D0','subdot':'\u2ABD','sube':'\u2286','subE':'\u2AC5','subedot':'\u2AC3','submult':'\u2AC1','subne':'\u228A','subnE':'\u2ACB','subplus':'\u2ABF','subrarr':'\u2979','subset':'\u2282','Subset':'\u22D0','subseteq':'\u2286','subseteqq':'\u2AC5','SubsetEqual':'\u2286','subsetneq':'\u228A','subsetneqq':'\u2ACB','subsim':'\u2AC7','subsub':'\u2AD5','subsup':'\u2AD3','succ':'\u227B','succapprox':'\u2AB8','succcurlyeq':'\u227D','Succeeds':'\u227B','SucceedsEqual':'\u2AB0','SucceedsSlantEqual':'\u227D','SucceedsTilde':'\u227F','succeq':'\u2AB0','succnapprox':'\u2ABA','succneqq':'\u2AB6','succnsim':'\u22E9','succsim':'\u227F','SuchThat':'\u220B','sum':'\u2211','Sum':'\u2211','sung':'\u266A','sup':'\u2283','Sup':'\u22D1','sup1':'\xB9','sup2':'\xB2','sup3':'\xB3','supdot':'\u2ABE','supdsub':'\u2AD8','supe':'\u2287','supE':'\u2AC6','supedot':'\u2AC4','Superset':'\u2283','SupersetEqual':'\u2287','suphsol':'\u27C9','suphsub':'\u2AD7','suplarr':'\u297B','supmult':'\u2AC2','supne':'\u228B','supnE':'\u2ACC','supplus':'\u2AC0','supset':'\u2283','Supset':'\u22D1','supseteq':'\u2287','supseteqq':'\u2AC6','supsetneq':'\u228B','supsetneqq':'\u2ACC','supsim':'\u2AC8','supsub':'\u2AD4','supsup':'\u2AD6','swarhk':'\u2926','swarr':'\u2199','swArr':'\u21D9','swarrow':'\u2199','swnwar':'\u292A','szlig':'\xDF','Tab':'\t','target':'\u2316','tau':'\u03C4','Tau':'\u03A4','tbrk':'\u23B4','tcaron':'\u0165','Tcaron':'\u0164','tcedil':'\u0163','Tcedil':'\u0162','tcy':'\u0442','Tcy':'\u0422','tdot':'\u20DB','telrec':'\u2315','tfr':'\uD835\uDD31','Tfr':'\uD835\uDD17','there4':'\u2234','therefore':'\u2234','Therefore':'\u2234','theta':'\u03B8','Theta':'\u0398','thetasym':'\u03D1','thetav':'\u03D1','thickapprox':'\u2248','thicksim':'\u223C','ThickSpace':'\u205F\u200A','thinsp':'\u2009','ThinSpace':'\u2009','thkap':'\u2248','thksim':'\u223C','thorn':'\xFE','THORN':'\xDE','tilde':'\u02DC','Tilde':'\u223C','TildeEqual':'\u2243','TildeFullEqual':'\u2245','TildeTilde':'\u2248','times':'\xD7','timesb':'\u22A0','timesbar':'\u2A31','timesd':'\u2A30','tint':'\u222D','toea':'\u2928','top':'\u22A4','topbot':'\u2336','topcir':'\u2AF1','topf':'\uD835\uDD65','Topf':'\uD835\uDD4B','topfork':'\u2ADA','tosa':'\u2929','tprime':'\u2034','trade':'\u2122','TRADE':'\u2122','triangle':'\u25B5','triangledown':'\u25BF','triangleleft':'\u25C3','trianglelefteq':'\u22B4','triangleq':'\u225C','triangleright':'\u25B9','trianglerighteq':'\u22B5','tridot':'\u25EC','trie':'\u225C','triminus':'\u2A3A','TripleDot':'\u20DB','triplus':'\u2A39','trisb':'\u29CD','tritime':'\u2A3B','trpezium':'\u23E2','tscr':'\uD835\uDCC9','Tscr':'\uD835\uDCAF','tscy':'\u0446','TScy':'\u0426','tshcy':'\u045B','TSHcy':'\u040B','tstrok':'\u0167','Tstrok':'\u0166','twixt':'\u226C','twoheadleftarrow':'\u219E','twoheadrightarrow':'\u21A0','uacute':'\xFA','Uacute':'\xDA','uarr':'\u2191','uArr':'\u21D1','Uarr':'\u219F','Uarrocir':'\u2949','ubrcy':'\u045E','Ubrcy':'\u040E','ubreve':'\u016D','Ubreve':'\u016C','ucirc':'\xFB','Ucirc':'\xDB','ucy':'\u0443','Ucy':'\u0423','udarr':'\u21C5','udblac':'\u0171','Udblac':'\u0170','udhar':'\u296E','ufisht':'\u297E','ufr':'\uD835\uDD32','Ufr':'\uD835\uDD18','ugrave':'\xF9','Ugrave':'\xD9','uHar':'\u2963','uharl':'\u21BF','uharr':'\u21BE','uhblk':'\u2580','ulcorn':'\u231C','ulcorner':'\u231C','ulcrop':'\u230F','ultri':'\u25F8','umacr':'\u016B','Umacr':'\u016A','uml':'\xA8','UnderBar':'_','UnderBrace':'\u23DF','UnderBracket':'\u23B5','UnderParenthesis':'\u23DD','Union':'\u22C3','UnionPlus':'\u228E','uogon':'\u0173','Uogon':'\u0172','uopf':'\uD835\uDD66','Uopf':'\uD835\uDD4C','uparrow':'\u2191','Uparrow':'\u21D1','UpArrow':'\u2191','UpArrowBar':'\u2912','UpArrowDownArrow':'\u21C5','updownarrow':'\u2195','Updownarrow':'\u21D5','UpDownArrow':'\u2195','UpEquilibrium':'\u296E','upharpoonleft':'\u21BF','upharpoonright':'\u21BE','uplus':'\u228E','UpperLeftArrow':'\u2196','UpperRightArrow':'\u2197','upsi':'\u03C5','Upsi':'\u03D2','upsih':'\u03D2','upsilon':'\u03C5','Upsilon':'\u03A5','UpTee':'\u22A5','UpTeeArrow':'\u21A5','upuparrows':'\u21C8','urcorn':'\u231D','urcorner':'\u231D','urcrop':'\u230E','uring':'\u016F','Uring':'\u016E','urtri':'\u25F9','uscr':'\uD835\uDCCA','Uscr':'\uD835\uDCB0','utdot':'\u22F0','utilde':'\u0169','Utilde':'\u0168','utri':'\u25B5','utrif':'\u25B4','uuarr':'\u21C8','uuml':'\xFC','Uuml':'\xDC','uwangle':'\u29A7','vangrt':'\u299C','varepsilon':'\u03F5','varkappa':'\u03F0','varnothing':'\u2205','varphi':'\u03D5','varpi':'\u03D6','varpropto':'\u221D','varr':'\u2195','vArr':'\u21D5','varrho':'\u03F1','varsigma':'\u03C2','varsubsetneq':'\u228A\uFE00','varsubsetneqq':'\u2ACB\uFE00','varsupsetneq':'\u228B\uFE00','varsupsetneqq':'\u2ACC\uFE00','vartheta':'\u03D1','vartriangleleft':'\u22B2','vartriangleright':'\u22B3','vBar':'\u2AE8','Vbar':'\u2AEB','vBarv':'\u2AE9','vcy':'\u0432','Vcy':'\u0412','vdash':'\u22A2','vDash':'\u22A8','Vdash':'\u22A9','VDash':'\u22AB','Vdashl':'\u2AE6','vee':'\u2228','Vee':'\u22C1','veebar':'\u22BB','veeeq':'\u225A','vellip':'\u22EE','verbar':'|','Verbar':'\u2016','vert':'|','Vert':'\u2016','VerticalBar':'\u2223','VerticalLine':'|','VerticalSeparator':'\u2758','VerticalTilde':'\u2240','VeryThinSpace':'\u200A','vfr':'\uD835\uDD33','Vfr':'\uD835\uDD19','vltri':'\u22B2','vnsub':'\u2282\u20D2','vnsup':'\u2283\u20D2','vopf':'\uD835\uDD67','Vopf':'\uD835\uDD4D','vprop':'\u221D','vrtri':'\u22B3','vscr':'\uD835\uDCCB','Vscr':'\uD835\uDCB1','vsubne':'\u228A\uFE00','vsubnE':'\u2ACB\uFE00','vsupne':'\u228B\uFE00','vsupnE':'\u2ACC\uFE00','Vvdash':'\u22AA','vzigzag':'\u299A','wcirc':'\u0175','Wcirc':'\u0174','wedbar':'\u2A5F','wedge':'\u2227','Wedge':'\u22C0','wedgeq':'\u2259','weierp':'\u2118','wfr':'\uD835\uDD34','Wfr':'\uD835\uDD1A','wopf':'\uD835\uDD68','Wopf':'\uD835\uDD4E','wp':'\u2118','wr':'\u2240','wreath':'\u2240','wscr':'\uD835\uDCCC','Wscr':'\uD835\uDCB2','xcap':'\u22C2','xcirc':'\u25EF','xcup':'\u22C3','xdtri':'\u25BD','xfr':'\uD835\uDD35','Xfr':'\uD835\uDD1B','xharr':'\u27F7','xhArr':'\u27FA','xi':'\u03BE','Xi':'\u039E','xlarr':'\u27F5','xlArr':'\u27F8','xmap':'\u27FC','xnis':'\u22FB','xodot':'\u2A00','xopf':'\uD835\uDD69','Xopf':'\uD835\uDD4F','xoplus':'\u2A01','xotime':'\u2A02','xrarr':'\u27F6','xrArr':'\u27F9','xscr':'\uD835\uDCCD','Xscr':'\uD835\uDCB3','xsqcup':'\u2A06','xuplus':'\u2A04','xutri':'\u25B3','xvee':'\u22C1','xwedge':'\u22C0','yacute':'\xFD','Yacute':'\xDD','yacy':'\u044F','YAcy':'\u042F','ycirc':'\u0177','Ycirc':'\u0176','ycy':'\u044B','Ycy':'\u042B','yen':'\xA5','yfr':'\uD835\uDD36','Yfr':'\uD835\uDD1C','yicy':'\u0457','YIcy':'\u0407','yopf':'\uD835\uDD6A','Yopf':'\uD835\uDD50','yscr':'\uD835\uDCCE','Yscr':'\uD835\uDCB4','yucy':'\u044E','YUcy':'\u042E','yuml':'\xFF','Yuml':'\u0178','zacute':'\u017A','Zacute':'\u0179','zcaron':'\u017E','Zcaron':'\u017D','zcy':'\u0437','Zcy':'\u0417','zdot':'\u017C','Zdot':'\u017B','zeetrf':'\u2128','ZeroWidthSpace':'\u200B','zeta':'\u03B6','Zeta':'\u0396','zfr':'\uD835\uDD37','Zfr':'\u2128','zhcy':'\u0436','ZHcy':'\u0416','zigrarr':'\u21DD','zopf':'\uD835\uDD6B','Zopf':'\u2124','zscr':'\uD835\uDCCF','Zscr':'\uD835\uDCB5','zwj':'\u200D','zwnj':'\u200C'};
	var decodeMapLegacy = {'aacute':'\xE1','Aacute':'\xC1','acirc':'\xE2','Acirc':'\xC2','acute':'\xB4','aelig':'\xE6','AElig':'\xC6','agrave':'\xE0','Agrave':'\xC0','amp':'&','AMP':'&','aring':'\xE5','Aring':'\xC5','atilde':'\xE3','Atilde':'\xC3','auml':'\xE4','Auml':'\xC4','brvbar':'\xA6','ccedil':'\xE7','Ccedil':'\xC7','cedil':'\xB8','cent':'\xA2','copy':'\xA9','COPY':'\xA9','curren':'\xA4','deg':'\xB0','divide':'\xF7','eacute':'\xE9','Eacute':'\xC9','ecirc':'\xEA','Ecirc':'\xCA','egrave':'\xE8','Egrave':'\xC8','eth':'\xF0','ETH':'\xD0','euml':'\xEB','Euml':'\xCB','frac12':'\xBD','frac14':'\xBC','frac34':'\xBE','gt':'>','GT':'>','iacute':'\xED','Iacute':'\xCD','icirc':'\xEE','Icirc':'\xCE','iexcl':'\xA1','igrave':'\xEC','Igrave':'\xCC','iquest':'\xBF','iuml':'\xEF','Iuml':'\xCF','laquo':'\xAB','lt':'<','LT':'<','macr':'\xAF','micro':'\xB5','middot':'\xB7','nbsp':'\xA0','not':'\xAC','ntilde':'\xF1','Ntilde':'\xD1','oacute':'\xF3','Oacute':'\xD3','ocirc':'\xF4','Ocirc':'\xD4','ograve':'\xF2','Ograve':'\xD2','ordf':'\xAA','ordm':'\xBA','oslash':'\xF8','Oslash':'\xD8','otilde':'\xF5','Otilde':'\xD5','ouml':'\xF6','Ouml':'\xD6','para':'\xB6','plusmn':'\xB1','pound':'\xA3','quot':'"','QUOT':'"','raquo':'\xBB','reg':'\xAE','REG':'\xAE','sect':'\xA7','shy':'\xAD','sup1':'\xB9','sup2':'\xB2','sup3':'\xB3','szlig':'\xDF','thorn':'\xFE','THORN':'\xDE','times':'\xD7','uacute':'\xFA','Uacute':'\xDA','ucirc':'\xFB','Ucirc':'\xDB','ugrave':'\xF9','Ugrave':'\xD9','uml':'\xA8','uuml':'\xFC','Uuml':'\xDC','yacute':'\xFD','Yacute':'\xDD','yen':'\xA5','yuml':'\xFF'};
	var decodeMapNumeric = {'0':'\uFFFD','128':'\u20AC','130':'\u201A','131':'\u0192','132':'\u201E','133':'\u2026','134':'\u2020','135':'\u2021','136':'\u02C6','137':'\u2030','138':'\u0160','139':'\u2039','140':'\u0152','142':'\u017D','145':'\u2018','146':'\u2019','147':'\u201C','148':'\u201D','149':'\u2022','150':'\u2013','151':'\u2014','152':'\u02DC','153':'\u2122','154':'\u0161','155':'\u203A','156':'\u0153','158':'\u017E','159':'\u0178'};
	var invalidReferenceCodePoints = [1,2,3,4,5,6,7,8,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,64976,64977,64978,64979,64980,64981,64982,64983,64984,64985,64986,64987,64988,64989,64990,64991,64992,64993,64994,64995,64996,64997,64998,64999,65000,65001,65002,65003,65004,65005,65006,65007,65534,65535,131070,131071,196606,196607,262142,262143,327678,327679,393214,393215,458750,458751,524286,524287,589822,589823,655358,655359,720894,720895,786430,786431,851966,851967,917502,917503,983038,983039,1048574,1048575,1114110,1114111];

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	var object = {};
	var hasOwnProperty = object.hasOwnProperty;
	var has = function(object, propertyName) {
		return hasOwnProperty.call(object, propertyName);
	};

	var contains = function(array, value) {
		var index = -1;
		var length = array.length;
		while (++index < length) {
			if (array[index] == value) {
				return true;
			}
		}
		return false;
	};

	var merge = function(options, defaults) {
		if (!options) {
			return defaults;
		}
		var result = {};
		var key;
		for (key in defaults) {
			// A `hasOwnProperty` check is not needed here, since only recognized
			// option names are used anyway. Any others are ignored.
			result[key] = has(options, key) ? options[key] : defaults[key];
		}
		return result;
	};

	// Modified version of `ucs2encode`; see https://mths.be/punycode.
	var codePointToSymbol = function(codePoint, strict) {
		var output = '';
		if ((codePoint >= 0xD800 && codePoint <= 0xDFFF) || codePoint > 0x10FFFF) {
			// See issue #4:
			// “Otherwise, if the number is in the range 0xD800 to 0xDFFF or is
			// greater than 0x10FFFF, then this is a parse error. Return a U+FFFD
			// REPLACEMENT CHARACTER.”
			if (strict) {
				parseError('character reference outside the permissible Unicode range');
			}
			return '\uFFFD';
		}
		if (has(decodeMapNumeric, codePoint)) {
			if (strict) {
				parseError('disallowed character reference');
			}
			return decodeMapNumeric[codePoint];
		}
		if (strict && contains(invalidReferenceCodePoints, codePoint)) {
			parseError('disallowed character reference');
		}
		if (codePoint > 0xFFFF) {
			codePoint -= 0x10000;
			output += stringFromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);
			codePoint = 0xDC00 | codePoint & 0x3FF;
		}
		output += stringFromCharCode(codePoint);
		return output;
	};

	var hexEscape = function(codePoint) {
		return '&#x' + codePoint.toString(16).toUpperCase() + ';';
	};

	var decEscape = function(codePoint) {
		return '&#' + codePoint + ';';
	};

	var parseError = function(message) {
		throw Error('Parse error: ' + message);
	};

	/*--------------------------------------------------------------------------*/

	var encode = function(string, options) {
		options = merge(options, encode.options);
		var strict = options.strict;
		if (strict && regexInvalidRawCodePoint.test(string)) {
			parseError('forbidden code point');
		}
		var encodeEverything = options.encodeEverything;
		var useNamedReferences = options.useNamedReferences;
		var allowUnsafeSymbols = options.allowUnsafeSymbols;
		var escapeCodePoint = options.decimal ? decEscape : hexEscape;

		var escapeBmpSymbol = function(symbol) {
			return escapeCodePoint(symbol.charCodeAt(0));
		};

		if (encodeEverything) {
			// Encode ASCII symbols.
			string = string.replace(regexAsciiWhitelist, function(symbol) {
				// Use named references if requested & possible.
				if (useNamedReferences && has(encodeMap, symbol)) {
					return '&' + encodeMap[symbol] + ';';
				}
				return escapeBmpSymbol(symbol);
			});
			// Shorten a few escapes that represent two symbols, of which at least one
			// is within the ASCII range.
			if (useNamedReferences) {
				string = string
					.replace(/&gt;\u20D2/g, '&nvgt;')
					.replace(/&lt;\u20D2/g, '&nvlt;')
					.replace(/&#x66;&#x6A;/g, '&fjlig;');
			}
			// Encode non-ASCII symbols.
			if (useNamedReferences) {
				// Encode non-ASCII symbols that can be replaced with a named reference.
				string = string.replace(regexEncodeNonAscii, function(string) {
					// Note: there is no need to check `has(encodeMap, string)` here.
					return '&' + encodeMap[string] + ';';
				});
			}
			// Note: any remaining non-ASCII symbols are handled outside of the `if`.
		} else if (useNamedReferences) {
			// Apply named character references.
			// Encode `<>"'&` using named character references.
			if (!allowUnsafeSymbols) {
				string = string.replace(regexEscape, function(string) {
					return '&' + encodeMap[string] + ';'; // no need to check `has()` here
				});
			}
			// Shorten escapes that represent two symbols, of which at least one is
			// `<>"'&`.
			string = string
				.replace(/&gt;\u20D2/g, '&nvgt;')
				.replace(/&lt;\u20D2/g, '&nvlt;');
			// Encode non-ASCII symbols that can be replaced with a named reference.
			string = string.replace(regexEncodeNonAscii, function(string) {
				// Note: there is no need to check `has(encodeMap, string)` here.
				return '&' + encodeMap[string] + ';';
			});
		} else if (!allowUnsafeSymbols) {
			// Encode `<>"'&` using hexadecimal escapes, now that they’re not handled
			// using named character references.
			string = string.replace(regexEscape, escapeBmpSymbol);
		}
		return string
			// Encode astral symbols.
			.replace(regexAstralSymbols, function($0) {
				// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
				var high = $0.charCodeAt(0);
				var low = $0.charCodeAt(1);
				var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
				return escapeCodePoint(codePoint);
			})
			// Encode any remaining BMP symbols that are not printable ASCII symbols
			// using a hexadecimal escape.
			.replace(regexBmpWhitelist, escapeBmpSymbol);
	};
	// Expose default options (so they can be overridden globally).
	encode.options = {
		'allowUnsafeSymbols': false,
		'encodeEverything': false,
		'strict': false,
		'useNamedReferences': false,
		'decimal' : false
	};

	var decode = function(html, options) {
		options = merge(options, decode.options);
		var strict = options.strict;
		if (strict && regexInvalidEntity.test(html)) {
			parseError('malformed character reference');
		}
		return html.replace(regexDecode, function($0, $1, $2, $3, $4, $5, $6, $7, $8) {
			var codePoint;
			var semicolon;
			var decDigits;
			var hexDigits;
			var reference;
			var next;

			if ($1) {
				reference = $1;
				// Note: there is no need to check `has(decodeMap, reference)`.
				return decodeMap[reference];
			}

			if ($2) {
				// Decode named character references without trailing `;`, e.g. `&amp`.
				// This is only a parse error if it gets converted to `&`, or if it is
				// followed by `=` in an attribute context.
				reference = $2;
				next = $3;
				if (next && options.isAttributeValue) {
					if (strict && next == '=') {
						parseError('`&` did not start a character reference');
					}
					return $0;
				} else {
					if (strict) {
						parseError(
							'named character reference was not terminated by a semicolon'
						);
					}
					// Note: there is no need to check `has(decodeMapLegacy, reference)`.
					return decodeMapLegacy[reference] + (next || '');
				}
			}

			if ($4) {
				// Decode decimal escapes, e.g. `&#119558;`.
				decDigits = $4;
				semicolon = $5;
				if (strict && !semicolon) {
					parseError('character reference was not terminated by a semicolon');
				}
				codePoint = parseInt(decDigits, 10);
				return codePointToSymbol(codePoint, strict);
			}

			if ($6) {
				// Decode hexadecimal escapes, e.g. `&#x1D306;`.
				hexDigits = $6;
				semicolon = $7;
				if (strict && !semicolon) {
					parseError('character reference was not terminated by a semicolon');
				}
				codePoint = parseInt(hexDigits, 16);
				return codePointToSymbol(codePoint, strict);
			}

			// If we’re still here, `if ($7)` is implied; it’s an ambiguous
			// ampersand for sure. https://mths.be/notes/ambiguous-ampersands
			if (strict) {
				parseError(
					'named character reference was not terminated by a semicolon'
				);
			}
			return $0;
		});
	};
	// Expose default options (so they can be overridden globally).
	decode.options = {
		'isAttributeValue': false,
		'strict': false
	};

	var escape = function(string) {
		return string.replace(regexEscape, function($0) {
			// Note: there is no need to check `has(escapeMap, $0)` here.
			return escapeMap[$0];
		});
	};

	/*--------------------------------------------------------------------------*/

	var he = {
		'version': '1.2.0',
		'encode': encode,
		'decode': decode,
		'escape': escape,
		'unescape': decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = he;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (var key in he) {
				has(he, key) && (freeExports[key] = he[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.he = he;
	}

}(commonjsGlobal));
});

function createMap(values, ignoreCase) {
  var map = {};
  values.forEach(function(value) {
    map[value] = 1;
  });
  return ignoreCase ? function(value) {
    return map[value.toLowerCase()] === 1;
  } : function(value) {
    return map[value] === 1;
  };
}

var createMap_1 = createMap;
var createMapFromString = function(values, ignoreCase) {
  return createMap(values.split(/,/), ignoreCase);
};

var utils = {
	createMap: createMap_1,
	createMapFromString: createMapFromString
};

var createMapFromString$1 = utils.createMapFromString;

function makeMap(values) {
  return createMapFromString$1(values, true);
}

// Empty Elements
var empty = makeMap('area,base,basefont,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr');

// Inline Elements
var inline$2 = makeMap('a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,noscript,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,svg,textarea,tt,u,var');

// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap('colgroup,dd,dt,li,option,p,td,tfoot,th,thead,tr,source');

// Attributes that have their values filled in disabled='disabled'
var fillAttrs = makeMap('checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected');

// Special Elements (can contain anything)
var special = makeMap('script,style');

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var nonPhrasing = makeMap('address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,ol,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track,ul');

var constants =
{
	// Output
	ABSOLUTE:      "absolute",
	PATH_RELATIVE: "pathRelative",
	ROOT_RELATIVE: "rootRelative",
	SHORTEST:      "shortest"
};

function formatAuth(urlObj, options)
{
	if (urlObj.auth && !options.removeAuth && (urlObj.extra.relation.maximumHost || options.output===constants.ABSOLUTE))
	{
		return urlObj.auth + "@";
	}
	
	return "";
}



function formatHash(urlObj, options)
{
	return urlObj.hash ? urlObj.hash : "";
}



function formatHost(urlObj, options)
{
	if (urlObj.host.full && (urlObj.extra.relation.maximumAuth || options.output===constants.ABSOLUTE))
	{
		return urlObj.host.full;
	}
	
	return "";
}



function formatPath(urlObj, options)
{
	var str = "";
	
	var absolutePath = urlObj.path.absolute.string;
	var relativePath = urlObj.path.relative.string;
	var resource = showResource(urlObj, options);
	
	if (urlObj.extra.relation.maximumHost || options.output===constants.ABSOLUTE || options.output===constants.ROOT_RELATIVE)
	{
		str = absolutePath;
	}
	else if (relativePath.length<=absolutePath.length && options.output===constants.SHORTEST || options.output===constants.PATH_RELATIVE)
	{
		str = relativePath;
		
		if (str === "")
		{
			var query = showQuery(urlObj,options) && !!getQuery(urlObj,options);
			
			if (urlObj.extra.relation.maximumPath && !resource)
			{
				str = "./";
			}
			else if (urlObj.extra.relation.overridesQuery && !resource && !query)
			{
				str = "./";
			}
		}
	}
	else
	{
		str = absolutePath;
	}
	
	if ( str==="/" && !resource && options.removeRootTrailingSlash && (!urlObj.extra.relation.minimumPort || options.output===constants.ABSOLUTE) )
	{
		str = "";
	}
	
	return str;
}



function formatPort(urlObj, options)
{
	if (urlObj.port && !urlObj.extra.portIsDefault && urlObj.extra.relation.maximumHost)
	{
		return ":" + urlObj.port;
	}
	
	return "";
}



function formatQuery(urlObj, options)
{
	return showQuery(urlObj,options) ? getQuery(urlObj, options) : "";
}



function formatResource(urlObj, options)
{
	return showResource(urlObj,options) ? urlObj.resource : "";
}



function formatScheme(urlObj, options)
{
	var str = "";
	
	if (urlObj.extra.relation.maximumHost || options.output===constants.ABSOLUTE)
	{
		if (!urlObj.extra.relation.minimumScheme || !options.schemeRelative || options.output===constants.ABSOLUTE)
		{
			str += urlObj.scheme + "://";
		}
		else
		{
			str += "//";
		}
	}
	
	return str;
}



function formatUrl(urlObj, options)
{
	var url = "";
	
	url += formatScheme(urlObj, options);
	url += formatAuth(urlObj, options);
	url += formatHost(urlObj, options);
	url += formatPort(urlObj);
	url += formatPath(urlObj, options);
	url += formatResource(urlObj, options);
	url += formatQuery(urlObj, options);
	url += formatHash(urlObj);
	
	return url;
}



function getQuery(urlObj, options)
{
	var stripQuery = options.removeEmptyQueries && urlObj.extra.relation.minimumPort;
	
	return urlObj.query.string[ stripQuery ? "stripped" : "full" ];
}



function showQuery(urlObj, options)
{
	return !urlObj.extra.relation.minimumQuery || options.output===constants.ABSOLUTE || options.output===constants.ROOT_RELATIVE;
}



function showResource(urlObj, options)
{
	var removeIndex = options.removeDirectoryIndexes && urlObj.extra.resourceIsIndex;
	var removeMatchingResource = urlObj.extra.relation.minimumResource && options.output!==constants.ABSOLUTE && options.output!==constants.ROOT_RELATIVE;
	
	return !!urlObj.resource && !removeMatchingResource && !removeIndex;
}



var format$1 = formatUrl;

/*
	Deep-clone an object.
*/
function clone$1(obj)
{
	if (obj instanceof Object)
	{
		var clonedObj = (obj instanceof Array) ? [] : {};
		
		for (var i in obj)
		{
			if ( obj.hasOwnProperty(i) )
			{
				clonedObj[i] = clone$1( obj[i] );
			}
		}
		
		return clonedObj;
	}
	
	return obj;
}



/*
	https://github.com/jonschlinkert/is-plain-object
*/
function isPlainObject(obj)
{
	return !!obj && typeof obj==="object" && obj.constructor===Object;
}



/*
	Shallow-merge two objects.
*/
function shallowMerge(target, source)
{
	if (target instanceof Object && source instanceof Object)
	{
		for (var i in source)
		{
			if ( source.hasOwnProperty(i) )
			{
				target[i] = source[i];
			}
		}
	}
	
	return target;
}



var object =
{
	clone: clone$1,
	isPlainObject: isPlainObject,
	shallowMerge: shallowMerge
};

function getOptions(options, defaults)
{
	if ( object.isPlainObject(options) )
	{
		var newOptions = {};
		
		for (var i in defaults)
		{
			if ( defaults.hasOwnProperty(i) )
			{
				if (options[i] !== undefined)
				{
					newOptions[i] = mergeOption(options[i], defaults[i]);
				}
				else
				{
					newOptions[i] = defaults[i];
				}
			}
		}
		
		return newOptions;
	}
	else
	{
		return defaults;
	}
}



function mergeOption(newValues, defaultValues)
{
	if (defaultValues instanceof Object && newValues instanceof Object)
	{
		if (defaultValues instanceof Array && newValues instanceof Array)
		{
			return defaultValues.concat(newValues);
		}
		else
		{
			return object.shallowMerge(newValues, defaultValues);
		}
	}
	
	return newValues;
}



var options = getOptions;

function hrefInfo(urlObj)
{
	var minimumPathOnly     = (!urlObj.scheme && !urlObj.auth && !urlObj.host.full && !urlObj.port);
	var minimumResourceOnly = (minimumPathOnly && !urlObj.path.absolute.string);
	var minimumQueryOnly    = (minimumResourceOnly && !urlObj.resource);
	var minimumHashOnly     = (minimumQueryOnly && !urlObj.query.string.full.length);
	var empty               = (minimumHashOnly && !urlObj.hash);
	
	urlObj.extra.hrefInfo.minimumPathOnly     = minimumPathOnly;
	urlObj.extra.hrefInfo.minimumResourceOnly = minimumResourceOnly;
	urlObj.extra.hrefInfo.minimumQueryOnly    = minimumQueryOnly;
	urlObj.extra.hrefInfo.minimumHashOnly     = minimumHashOnly;
	urlObj.extra.hrefInfo.empty = empty;
}



var hrefInfo_1 = hrefInfo;

function parseHost(urlObj, options)
{
	// TWEAK :: condition only for speed optimization
	if (options.ignore_www)
	{
		var host = urlObj.host.full;
		
		if (host)
		{
			var stripped = host;
			
			if (host.indexOf("www.") === 0)
			{
				stripped = host.substr(4);
			}
			
			urlObj.host.stripped = stripped;
		}
	}
}



var host = parseHost;

function isDirectoryIndex(resource, options)
{
	var verdict = false;
	
	options.directoryIndexes.every( function(index)
	{
		if (index === resource)
		{
			verdict = true;
			return false;
		}
		
		return true;
	});
	
	return verdict;
}



function parsePath(urlObj, options)
{
	var path = urlObj.path.absolute.string;
	
	if (path)
	{
		var lastSlash = path.lastIndexOf("/");
		
		if (lastSlash > -1)
		{
			if (++lastSlash < path.length)
			{
				var resource = path.substr(lastSlash);
				
				if (resource!=="." && resource!=="..")
				{
					urlObj.resource = resource;
					path = path.substr(0, lastSlash);
				}
				else
				{
					path += "/";
				}
			}
			
			urlObj.path.absolute.string = path;
			urlObj.path.absolute.array = splitPath(path);
		}
		else if (path==="." || path==="..")
		{
			// "..?var", "..#anchor", etc ... not "..index.html"
			path += "/";
			
			urlObj.path.absolute.string = path;
			urlObj.path.absolute.array = splitPath(path);
		}
		else
		{
			// Resource-only
			urlObj.resource = path;
			urlObj.path.absolute.string = null;
		}
		
		urlObj.extra.resourceIsIndex = isDirectoryIndex(urlObj.resource, options);
	}
	// Else: query/hash-only or empty
}



function splitPath(path)
{
	// TWEAK :: condition only for speed optimization
	if (path !== "/")
	{
		var cleaned = [];
		
		path.split("/").forEach( function(dir)
		{
			// Cleanup -- splitting "/dir/" becomes ["","dir",""]
			if (dir !== "")
			{
				cleaned.push(dir);
			}
		});
		
		return cleaned;
	}
	else
	{
		// Faster to skip the above block and just create an array
		return [];
	}
}



var path = parsePath;

function parsePort(urlObj, options)
{
	var defaultPort = -1;
	
	for (var i in options.defaultPorts)
	{
		if ( i===urlObj.scheme && options.defaultPorts.hasOwnProperty(i) )
		{
			defaultPort = options.defaultPorts[i];
			break;
		}
	}
	
	if (defaultPort > -1)
	{
		// Force same type as urlObj.port
		defaultPort = defaultPort.toString();
		
		if (urlObj.port === null)
		{
			urlObj.port = defaultPort;
		}
		
		urlObj.extra.portIsDefault = (urlObj.port === defaultPort);
	}
}



var port = parsePort;

var hasOwnProperty = Object.prototype.hasOwnProperty;



function parseQuery(urlObj, options)
{
	urlObj.query.string.full = stringify(urlObj.query.object, false);
	
	// TWEAK :: condition only for speed optimization
	if (options.removeEmptyQueries)
	{
		urlObj.query.string.stripped = stringify(urlObj.query.object, true);
	}
}



function stringify(queryObj, removeEmptyQueries)
{
	var count = 0;
	var str = "";
	
	for (var i in queryObj)
	{
		if ( i!=="" && hasOwnProperty.call(queryObj, i)===true )
		{
			var value = queryObj[i];
			
			if (value !== "" || !removeEmptyQueries)
			{
				str += (++count===1) ? "?" : "&";
				
				i = encodeURIComponent(i);
				
				if (value !== "")
				{
					str += i +"="+ encodeURIComponent(value).replace(/%20/g,"+");
				}
				else
				{
					str += i;
				}
			}
		}
	}
	
	return str;
}



var query = parseQuery;

var _parseUrl = url.parse;



/*
	Customize the URL object that Node generates
	because:
	
	* necessary data for later
	* urlObj.host is useless
	* urlObj.hostname is too long
	* urlObj.path is useless
	* urlObj.pathname is too long
	* urlObj.protocol is inaccurate; should be called "scheme"
	* urlObj.search is mostly useless
*/
function clean$1(urlObj)
{
	var scheme = urlObj.protocol;
	
	if (scheme)
	{
		// Remove ":" suffix
		if (scheme.indexOf(":") === scheme.length-1)
		{
			scheme = scheme.substr(0, scheme.length-1);
		}
	}
	
	urlObj.host =
	{
		// TODO :: unescape(encodeURIComponent(s)) ? ... http://ecmanaut.blogspot.ca/2006/07/encoding-decoding-utf8-in-javascript.html
		full: urlObj.hostname,
		stripped: null
	};
	
	urlObj.path =
	{
		absolute:
		{
			array: null,
			string: urlObj.pathname
		},
		relative:
		{
			array: null,
			string: null
		}
	};
	
	urlObj.query =
	{
		object: urlObj.query,
		string:
		{
			full: null,
			stripped: null
		}
	};
	
	urlObj.extra =
	{
		hrefInfo:
		{
			minimumPathOnly: null,
			minimumResourceOnly: null,
			minimumQueryOnly: null,
			minimumHashOnly: null,
			empty: null,
			
			separatorOnlyQuery: urlObj.search==="?"
		},
		portIsDefault: null,
		relation:
		{
			maximumScheme: null,
			maximumAuth: null,
			maximumHost: null,
			maximumPort: null,
			maximumPath: null,
			maximumResource: null,
			maximumQuery: null,
			maximumHash: null,
			
			minimumScheme: null,
			minimumAuth: null,
			minimumHost: null,
			minimumPort: null,
			minimumPath: null,
			minimumResource: null,
			minimumQuery: null,
			minimumHash: null,
			
			overridesQuery: null
		},
		resourceIsIndex: null,
		slashes: urlObj.slashes
	};
	
	urlObj.resource = null;
	urlObj.scheme = scheme;
	delete urlObj.hostname;
	delete urlObj.pathname;
	delete urlObj.protocol;
	delete urlObj.search;
	delete urlObj.slashes;
	
	return urlObj;
}



function validScheme(url, options)
{
	var valid = true;
	
	options.rejectedSchemes.every( function(rejectedScheme)
	{
		valid = !(url.indexOf(rejectedScheme+":") === 0);
		
		// Break loop
		return valid;
	});
	
	return valid;
}



function parseUrlString(url, options)
{
	if ( validScheme(url,options) )
	{
		return clean$1( _parseUrl(url, true, options.slashesDenoteHost) );
	}
	else
	{
		return {href:url, valid:false};
	}
}



var urlstring = parseUrlString;

function joinPath(pathArray)
{
	if (pathArray.length > 0)
	{
		return pathArray.join("/") + "/";
	}
	else
	{
		return "";
	}
}



function resolveDotSegments(pathArray)
{
	var pathAbsolute = [];
	
	pathArray.forEach( function(dir)
	{
		if (dir !== "..")
		{
			if (dir !== ".")
			{
				pathAbsolute.push(dir);
			}
		}
		else
		{
			// Remove parent
			if (pathAbsolute.length > 0)
			{
				pathAbsolute.splice(pathAbsolute.length-1, 1);
			}
		}
	});
	
	return pathAbsolute;
}



var path$1 =
{
	join: joinPath,
	resolveDotSegments: resolveDotSegments
};

function parseFromUrl(url, options, fallback)
{
	if (url)
	{
		var urlObj = parseUrl(url, options);
		
		// Because the following occurs in the relate stage for "to" URLs,
		// such had to be mostly duplicated here
		
		var pathArray = path$1.resolveDotSegments(urlObj.path.absolute.array);
		
		urlObj.path.absolute.array  = pathArray;
		urlObj.path.absolute.string = "/" + path$1.join(pathArray);
		
		return urlObj;
	}
	else
	{
		return fallback;
	}
}



function parseUrl(url, options)
{
	var urlObj = urlstring(url, options);
	
	if (urlObj.valid===false) return urlObj;
	
	host(urlObj, options);
	port(urlObj, options);
	path(urlObj, options);
	query(urlObj, options);
	hrefInfo_1(urlObj);
	
	return urlObj;
}



var parse =
{
	from: parseFromUrl,
	to:   parseUrl
};

function findRelation_upToPath(urlObj, siteUrlObj, options)
{
	// Path- or root-relative URL
	var pathOnly = urlObj.extra.hrefInfo.minimumPathOnly;
	
	// Matching scheme, scheme-relative or path-only
	var minimumScheme = (urlObj.scheme===siteUrlObj.scheme || !urlObj.scheme);
	
	// Matching auth, ignoring auth or path-only
	var minimumAuth = minimumScheme && (urlObj.auth===siteUrlObj.auth || options.removeAuth || pathOnly);
	
	// Matching host or path-only
	var www = options.ignore_www ? "stripped" : "full";
	var minimumHost = minimumAuth && (urlObj.host[www]===siteUrlObj.host[www] || pathOnly);
	
	// Matching port or path-only
	var minimumPort = minimumHost && (urlObj.port===siteUrlObj.port || pathOnly);
	
	urlObj.extra.relation.minimumScheme = minimumScheme;
	urlObj.extra.relation.minimumAuth   = minimumAuth;
	urlObj.extra.relation.minimumHost   = minimumHost;
	urlObj.extra.relation.minimumPort   = minimumPort;
	
	urlObj.extra.relation.maximumScheme = !minimumScheme || minimumScheme && !minimumAuth;
	urlObj.extra.relation.maximumAuth   = !minimumScheme || minimumScheme && !minimumHost;
	urlObj.extra.relation.maximumHost   = !minimumScheme || minimumScheme && !minimumPort;
}



function findRelation_pathOn(urlObj, siteUrlObj, options)
{
	var queryOnly = urlObj.extra.hrefInfo.minimumQueryOnly;
	var hashOnly  = urlObj.extra.hrefInfo.minimumHashOnly;
	var empty     = urlObj.extra.hrefInfo.empty;	// not required, but self-documenting
	
	// From upToPath()
	var minimumPort   = urlObj.extra.relation.minimumPort;
	var minimumScheme = urlObj.extra.relation.minimumScheme;
	
	// Matching port and path
	var minimumPath = minimumPort && urlObj.path.absolute.string===siteUrlObj.path.absolute.string;
	
	// Matching resource or query/hash-only or empty
	var matchingResource = (urlObj.resource===siteUrlObj.resource || !urlObj.resource && siteUrlObj.extra.resourceIsIndex) || (options.removeDirectoryIndexes && urlObj.extra.resourceIsIndex && !siteUrlObj.resource);
	var minimumResource = minimumPath && (matchingResource || queryOnly || hashOnly || empty);
	
	// Matching query or hash-only/empty
	var query = options.removeEmptyQueries ? "stripped" : "full";
	var urlQuery = urlObj.query.string[query];
	var siteUrlQuery = siteUrlObj.query.string[query];
	var minimumQuery = (minimumResource && !!urlQuery && urlQuery===siteUrlQuery) || ((hashOnly || empty) && !urlObj.extra.hrefInfo.separatorOnlyQuery);
	
	var minimumHash = minimumQuery && urlObj.hash===siteUrlObj.hash;
	
	urlObj.extra.relation.minimumPath     = minimumPath;
	urlObj.extra.relation.minimumResource = minimumResource;
	urlObj.extra.relation.minimumQuery    = minimumQuery;
	urlObj.extra.relation.minimumHash     = minimumHash;
	
	urlObj.extra.relation.maximumPort     = !minimumScheme || minimumScheme && !minimumPath;
	urlObj.extra.relation.maximumPath     = !minimumScheme || minimumScheme && !minimumResource;
	urlObj.extra.relation.maximumResource = !minimumScheme || minimumScheme && !minimumQuery;
	urlObj.extra.relation.maximumQuery    = !minimumScheme || minimumScheme && !minimumHash;
	urlObj.extra.relation.maximumHash     = !minimumScheme || minimumScheme && !minimumHash;	// there's nothing after hash, so it's the same as maximumQuery
	
	// Matching path and/or resource with existing but non-matching site query
	urlObj.extra.relation.overridesQuery  = minimumPath && urlObj.extra.relation.maximumResource && !minimumQuery && !!siteUrlQuery;
}



var findRelation =
{
	pathOn:   findRelation_pathOn,
	upToPath: findRelation_upToPath
};

function absolutize(urlObj, siteUrlObj, options)
{
	findRelation.upToPath(urlObj, siteUrlObj, options);
	
	// Fill in relative URLs
	if (urlObj.extra.relation.minimumScheme) urlObj.scheme = siteUrlObj.scheme;
	if (urlObj.extra.relation.minimumAuth)   urlObj.auth   = siteUrlObj.auth;
	if (urlObj.extra.relation.minimumHost)   urlObj.host   = object.clone(siteUrlObj.host);
	if (urlObj.extra.relation.minimumPort)   copyPort(urlObj, siteUrlObj);
	if (urlObj.extra.relation.minimumScheme) copyPath(urlObj, siteUrlObj);
	
	// Check remaining relativeness now that path has been copied and/or resolved
	findRelation.pathOn(urlObj, siteUrlObj, options);
	
	// Fill in relative URLs
	if (urlObj.extra.relation.minimumResource) copyResource(urlObj, siteUrlObj);
	if (urlObj.extra.relation.minimumQuery)    urlObj.query = object.clone(siteUrlObj.query);
	if (urlObj.extra.relation.minimumHash)     urlObj.hash  = siteUrlObj.hash;
}



/*
	Get an absolute path that's relative to site url.
*/
function copyPath(urlObj, siteUrlObj)
{
	if (urlObj.extra.relation.maximumHost || !urlObj.extra.hrefInfo.minimumResourceOnly)
	{
		var pathArray = urlObj.path.absolute.array;
		var pathString = "/";
		
		// If not erroneous URL
		if (pathArray)
		{
			// If is relative path
			if (urlObj.extra.hrefInfo.minimumPathOnly && urlObj.path.absolute.string.indexOf("/")!==0)
			{
				// Append path to site path
				pathArray = siteUrlObj.path.absolute.array.concat(pathArray);
			}
			
			pathArray   = path$1.resolveDotSegments(pathArray);
			pathString += path$1.join(pathArray);
		}
		else
		{
			pathArray = [];
		}
		
		urlObj.path.absolute.array  = pathArray;
		urlObj.path.absolute.string = pathString;
	}
	else
	{
		// Resource-, query- or hash-only or empty
		urlObj.path = object.clone(siteUrlObj.path);
	}
}



function copyPort(urlObj, siteUrlObj)
{
	urlObj.port = siteUrlObj.port;
	
	urlObj.extra.portIsDefault = siteUrlObj.extra.portIsDefault;
}



function copyResource(urlObj, siteUrlObj)
{
	urlObj.resource = siteUrlObj.resource;
	
	urlObj.extra.resourceIsIndex = siteUrlObj.extra.resourceIsIndex;
}



var absolutize_1 = absolutize;

/*
	Get a path relative to the site path.
*/
function relatePath(absolutePath, siteAbsolutePath)
{
	var relativePath = [];
	
	// At this point, it's related to the host/port
	var related = true;
	var parentIndex = -1;
	
	// Find parents
	siteAbsolutePath.forEach( function(siteAbsoluteDir, i)
	{
		if (related)
		{
			if (absolutePath[i] !== siteAbsoluteDir)
			{
				related = false;
			}
			else
			{
				parentIndex = i;
			}
		}
		
		if (!related)
		{
			// Up one level
			relativePath.push("..");
		}
	});
	
	// Form path
	absolutePath.forEach( function(dir, i)
	{
		if (i > parentIndex)
		{
			relativePath.push(dir);
		}
	});
	
	return relativePath;
}



function relativize(urlObj, siteUrlObj, options)
{
	if (urlObj.extra.relation.minimumScheme)
	{
		var pathArray = relatePath(urlObj.path.absolute.array, siteUrlObj.path.absolute.array);
		
		urlObj.path.relative.array  = pathArray;
		urlObj.path.relative.string = path$1.join(pathArray);
	}
}



var relativize_1 = relativize;

function relateUrl(siteUrlObj, urlObj, options)
{
	absolutize_1(urlObj, siteUrlObj, options);
	relativize_1(urlObj, siteUrlObj);
	
	return urlObj;
}



var relate = relateUrl;

function RelateUrl(from, options$1)
{
	this.options = options(options$1,
	{
		defaultPorts: {ftp:21, http:80, https:443},
		directoryIndexes: ["index.html"],
		ignore_www: false,
		output: RelateUrl.SHORTEST,
		rejectedSchemes: ["data","javascript","mailto"],
		removeAuth: false,
		removeDirectoryIndexes: true,
		removeEmptyQueries: false,
		removeRootTrailingSlash: true,
		schemeRelative: true,
		site: undefined,
		slashesDenoteHost: true
	});
	
	this.from = parse.from(from, this.options, null);
}



/*
	Usage: instance=new RelateUrl(); instance.relate();
*/
RelateUrl.prototype.relate = function(from, to, options$1)
{
	// relate(to,options)
	if ( object.isPlainObject(to) )
	{
		options$1 = to;
		to = from;
		from = null;
	}
	// relate(to)
	else if (!to)
	{
		to = from;
		from = null;
	}
	
	options$1 = options(options$1, this.options);
	from = from || options$1.site;
	from = parse.from(from, options$1, this.from);
	
	if (!from || !from.href)
	{
		throw new Error("from value not defined.");
	}
	else if (from.extra.hrefInfo.minimumPathOnly)
	{
		throw new Error("from value supplied is not absolute: "+from.href);
	}
	
	to = parse.to(to, options$1);
	
	if (to.valid===false) return to.href;
	
	to = relate(from, to, options$1);
	to = format$1(to, options$1);
	
	return to;
};



/*
	Usage: RelateUrl.relate();
*/
RelateUrl.relate = function(from, to, options)
{
	return new RelateUrl().relate(from, to, options);
};



// Make constants accessible from API
object.shallowMerge(RelateUrl, constants);

var bundle_min = createCommonjsModule(function (module, exports) {
!function(e,t){t(exports,sourceMap);}(commonjsGlobal,(function(e,t){function n(e){return e.split("")}function i(e,t){return t.includes(e)}t=t&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t;class r extends Error{constructor(e,t){super(),this.name="DefaultsError",this.message=e,this.defs=t;}}function o(e,t,n){!0===e&&(e={});const i=e||{};if(n)for(const e in i)if(D(i,e)&&!D(t,e))throw new r("`"+e+"` is not a supported option",t);for(const n in t)if(D(t,n))if(e&&D(e,n))if("ecma"===n){let t=0|e[n];t>5&&t<2015&&(t+=2009),i[n]=t;}else i[n]=e&&D(e,n)?e[n]:t[n];else i[n]=t[n];return i}function a(){}function s(){return !1}function u(){return !0}function c(){return this}function l(){return null}var f=function(){function e(e,o,a){var s,u=[],c=[];function l(){var l=o(e[s],s),f=l instanceof r;return f&&(l=l.v),l instanceof n?(l=l.v)instanceof i?c.push.apply(c,a?l.v.slice().reverse():l.v):c.push(l):l!==t&&(l instanceof i?u.push.apply(u,a?l.v.slice().reverse():l.v):u.push(l)),f}if(Array.isArray(e))if(a){for(s=e.length;--s>=0&&!l(););u.reverse(),c.reverse();}else for(s=0;s<e.length&&!l();++s);else for(s in e)if(D(e,s)&&l())break;return c.concat(u)}e.at_top=function(e){return new n(e)},e.splice=function(e){return new i(e)},e.last=function(e){return new r(e)};var t=e.skip={};function n(e){this.v=e;}function i(e){this.v=e;}function r(e){this.v=e;}return e}();function p(e,t,n){return n||(n={}),t&&(n.start||(n.start=t.start),n.end||(n.end=t.end)),new e(n)}function _(e,t){e.includes(t)||e.push(t);}function d(e,t){return e.replace(/{(.+?)}/g,(function(e,n){return t&&t[n]}))}function m(e,t){for(var n=e.length;--n>=0;)e[n]===t&&e.splice(n,1);}function h(e,t){if(e.length<2)return e.slice();return function e(n){if(n.length<=1)return n;var i=Math.floor(n.length/2),r=n.slice(0,i),o=n.slice(i);return function(e,n){for(var i=[],r=0,o=0,a=0;r<e.length&&o<n.length;)t(e[r],n[o])<=0?i[a++]=e[r++]:i[a++]=n[o++];return r<e.length&&i.push.apply(i,e.slice(r)),o<n.length&&i.push.apply(i,n.slice(o)),i}(r=e(r),o=e(o))}(e)}function E(e){return Array.isArray(e)||(e=e.split(" ")),new Set(e)}function g(e,t,n){e.has(t)?e.get(t).push(n):e.set(t,[n]);}function D(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function S(e,t){return !0===e||e instanceof RegExp&&e.test(t)}var v={"\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"};function A(e){return e.replace(/[\n\r\u2028\u2029]/g,(function(t,n){return ("\\"==e[n-1]&&("\\"!=e[n-2]||/(?:^|[^\\])(?:\\{2})*$/.test(e.slice(0,n-1)))?"":"\\")+v[t]}))}function T(e,t){return e._annotations&t}function y(e,t){e._annotations|=t;}var b="break case catch class const continue debugger default delete do else export extends finally for function if in instanceof let new return switch throw try typeof var void while with",C="false null true",O="enum implements import interface package private protected public static super this "+C+" "+b,F="return new delete throw else case yield await";b=E(b),O=E(O),F=E(F),C=E(C);var M=E(n("+-*&%=<>!?|~^")),R=/[0-9a-f]/i,w=/^0x[0-9a-f]+$/i,x=/^0[0-7]+$/,N=/^0o[0-7]+$/i,k=/^0b[01]+$/i,I=/^\d*\.?\d*(?:e[+-]?\d*(?:\d\.?|\.?\d)\d*)?$/i,L=/^(0[xob])?[0-9a-f]+n$/i,P=E(["in","instanceof","typeof","new","void","delete","++","--","+","-","!","~","&","|","^","*","**","/","%",">>","<<",">>>","<",">","<=",">=","==","===","!=","!==","?","=","+=","-=","/=","*=","**=","%=",">>=","<<=",">>>=","|=","^=","&=","&&","??","||"]),V=E(n("  \n\r\t\f\v​           \u2028\u2029  　\ufeff")),B=E(n("\n\r\u2028\u2029")),K=E(n(";]),:")),U=E(n("[{(,;:")),G=E(n("[]{}(),;:")),H={ID_Start:/[$A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,ID_Continue:/(?:[$0-9A-Z_a-z\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF])+/};function X(e,t){if(z(e.charCodeAt(t))){if(W(e.charCodeAt(t+1)))return e.charAt(t)+e.charAt(t+1)}else if(W(e.charCodeAt(t))&&z(e.charCodeAt(t-1)))return e.charAt(t-1)+e.charAt(t);return e.charAt(t)}function z(e){return e>=55296&&e<=56319}function W(e){return e>=56320&&e<=57343}function Y(e){return e>=48&&e<=57}function q(e){return H.ID_Start.test(e)}function $(e){return H.ID_Continue.test(e)}function j(e){return /^[a-z_$][a-z0-9_$]*$/i.test(e)}function Z(e,t){if(/^[a-z_$][a-z0-9_$]*$/i.test(e))return !0;if(!t&&/[\ud800-\udfff]/.test(e))return !1;var n=H.ID_Start.exec(e);return !(!n||0!==n.index)&&(!(e=e.slice(n[0].length))||!!(n=H.ID_Continue.exec(e))&&n[0].length===e.length)}function J(e,t=!0){if(!t&&e.includes("e"))return NaN;if(w.test(e))return parseInt(e.substr(2),16);if(x.test(e))return parseInt(e.substr(1),8);if(N.test(e))return parseInt(e.substr(2),8);if(k.test(e))return parseInt(e.substr(2),2);if(I.test(e))return parseFloat(e);var n=parseFloat(e);return n==e?n:void 0}class Q extends Error{constructor(e,t,n,i,r){super(),this.name="SyntaxError",this.message=e,this.filename=t,this.line=n,this.col=i,this.pos=r;}}function ee(e,t,n,i,r){throw new Q(e,t,n,i,r)}function te(e,t,n){return e.type==t&&(null==n||e.value==n)}var ne={};function ie(e,t,n,i){var r={text:e,filename:t,pos:0,tokpos:0,line:1,tokline:0,col:0,tokcol:0,newline_before:!1,regex_allowed:!1,brace_counter:0,template_braces:[],comments_before:[],directives:{},directive_stack:[]};function o(){return X(r.text,r.pos)}function a(e,t){var n=X(r.text,r.pos++);if(e&&!n)throw ne;return B.has(n)?(r.newline_before=r.newline_before||!t,++r.line,r.col=0,"\r"==n&&"\n"==o()&&(++r.pos,n="\n")):(n.length>1&&(++r.pos,++r.col),++r.col),n}function s(e){for(;e--;)a();}function u(e){return r.text.substr(r.pos,e.length)==e}function c(e,t){var n=r.text.indexOf(e,r.pos);if(t&&-1==n)throw ne;return n}function l(){r.tokline=r.line,r.tokcol=r.col,r.tokpos=r.pos;}var f=!1,p=null;function _(n,i,o){r.regex_allowed="operator"==n&&!oe.has(i)||"keyword"==n&&F.has(i)||"punc"==n&&U.has(i)||"arrow"==n,"punc"==n&&"."==i?f=!0:o||(f=!1);var a={type:n,value:i,line:r.tokline,col:r.tokcol,pos:r.tokpos,endline:r.line,endcol:r.col,endpos:r.pos,nlb:r.newline_before,file:t};return /^(?:num|string|regexp)$/i.test(n)&&(a.raw=e.substring(a.pos,a.endpos)),o||(a.comments_before=r.comments_before,a.comments_after=r.comments_before=[]),r.newline_before=!1,a=new fe(a),o||(p=a),a}function d(){for(;V.has(o());)a();}function m(e){ee(e,t,r.tokline,r.tokcol,r.tokpos);}function h(e){var t=!1,n=!1,i=!1,r="."==e,s=!1,u=!1,c=function(e){for(var t,n="",i=0;(t=o())&&e(t,i++);)n+=a();return n}((function(o,a){if(s)return !1;switch(o.charCodeAt(0)){case 95:return u=!0;case 98:case 66:return i=!0;case 111:case 79:case 120:case 88:return !i&&(i=!0);case 101:case 69:return !!i||!t&&(t=n=!0);case 45:return n||0==a&&!e;case 43:return n;case n=!1,46:return !(r||i||t)&&(r=!0)}return "n"===o?(s=!0,!0):R.test(o)}));if(e&&(c=e+c),x.test(c)&&H.has_directive("use strict")&&m("Legacy octal literals are not allowed in strict mode"),u&&(c.endsWith("_")?m("Numeric separators are not allowed at the end of numeric literals"):c.includes("__")&&m("Only one underscore is allowed as numeric separator"),c=c.replace(/_/g,"")),c.endsWith("n")){const e=c.slice(0,-1),t=J(e,w.test(e));if(!r&&L.test(c)&&!isNaN(t))return _("big_int",e);m("Invalid or unexpected token");}var l=J(c);if(!isNaN(l))return _("num",l);m("Invalid syntax: "+c);}function E(e){return e>="0"&&e<="7"}function g(e,t,n){var i,s=a(!0,e);switch(s.charCodeAt(0)){case 110:return "\n";case 114:return "\r";case 116:return "\t";case 98:return "\b";case 118:return "\v";case 102:return "\f";case 120:return String.fromCharCode(D(2,t));case 117:if("{"==o()){for(a(!0),"}"===o()&&m("Expecting hex-character between {}");"0"==o();)a(!0);var u,l=c("}",!0)-r.pos;return (l>6||(u=D(l,t))>1114111)&&m("Unicode reference out of bounds"),a(!0),(i=u)>65535?(i-=65536,String.fromCharCode(55296+(i>>10))+String.fromCharCode(i%1024+56320)):String.fromCharCode(i)}return String.fromCharCode(D(4,t));case 10:return "";case 13:if("\n"==o())return a(!0,e),""}if(E(s)){if(n&&t){"0"===s&&!E(o())||m("Octal escape sequences are not allowed in template strings");}return function(e,t){var n=o();n>="0"&&n<="7"&&(e+=a(!0))[0]<="3"&&(n=o())>="0"&&n<="7"&&(e+=a(!0));if("0"===e)return "\0";e.length>0&&H.has_directive("use strict")&&t&&m("Legacy octal escape sequences are not allowed in strict mode");return String.fromCharCode(parseInt(e,8))}(s,t)}return s}function D(e,t){for(var n=0;e>0;--e){if(!t&&isNaN(parseInt(o(),16)))return parseInt(n,16)||"";var i=a(!0);isNaN(parseInt(i,16))&&m("Invalid hex-character pattern in string"),n+=i;}return parseInt(n,16)}var S=K("Unterminated string constant",(function(){for(var e=a(),t="";;){var n=a(!0,!0);if("\\"==n)n=g(!0,!0);else if("\r"==n||"\n"==n)m("Unterminated string constant");else if(n==e)break;t+=n;}var i=_("string",t);return i.quote=e,i})),v=K("Unterminated template",(function(e){e&&r.template_braces.push(r.brace_counter);var t,n,i="",s="";for(a(!0,!0);"`"!=(t=a(!0,!0));){if("\r"==t)"\n"==o()&&++r.pos,t="\n";else if("$"==t&&"{"==o())return a(!0,!0),r.brace_counter++,(n=_(e?"template_head":"template_substitution",i)).raw=s,n;if(s+=t,"\\"==t){var u=r.pos;t=g(!0,!(p&&("name"===p.type||"punc"===p.type&&(")"===p.value||"]"===p.value))),!0),s+=r.text.substr(u,r.pos-u);}i+=t;}return r.template_braces.pop(),(n=_(e?"template_head":"template_substitution",i)).raw=s,n.end=!0,n}));function A(e){var t,n=r.regex_allowed,i=function(){for(var e=r.text,t=r.pos,n=r.text.length;t<n;++t){var i=e[t];if(B.has(i))return t}return -1}();return -1==i?(t=r.text.substr(r.pos),r.pos=r.text.length):(t=r.text.substring(r.pos,i),r.pos=i),r.col=r.tokcol+(r.pos-r.tokpos),r.comments_before.push(_(e,t,!0)),r.regex_allowed=n,H}var T=K("Unterminated multiline comment",(function(){var e=r.regex_allowed,t=c("*/",!0),n=r.text.substring(r.pos,t).replace(/\r\n|\r|\u2028|\u2029/g,"\n");return s(function(e){for(var t=0,n=0;n<e.length;n++)z(e.charCodeAt(n))&&W(e.charCodeAt(n+1))&&(t++,n++);return e.length-t}(n)+2),r.comments_before.push(_("comment2",n,!0)),r.newline_before=r.newline_before||n.includes("\n"),r.regex_allowed=e,H})),y=K("Unterminated identifier name",(function(){var e,t,n=!1,i=function(){return n=!0,a(),"u"!==o()&&m("Expecting UnicodeEscapeSequence -- uXXXX or u{XXXX}"),g(!1,!0)};if("\\"===(e=o()))q(e=i())||m("First identifier char is an invalid identifier char");else {if(!q(e))return "";a();}for(;null!=(t=o());){if("\\"===(t=o()))$(t=i())||m("Invalid escaped identifier char");else {if(!$(t))break;a();}e+=t;}return O.has(e)&&n&&m("Escaped characters are not allowed in keywords"),e})),N=K("Unterminated regular expression",(function(e){for(var t,n=!1,i=!1;t=a(!0);)if(B.has(t))m("Unexpected line terminator");else if(n)e+="\\"+t,n=!1;else if("["==t)i=!0,e+=t;else if("]"==t&&i)i=!1,e+=t;else {if("/"==t&&!i)break;"\\"==t?n=!0:e+=t;}return _("regexp",{source:e,flags:y()})}));function k(e){return _("operator",function e(t){if(!o())return t;var n=t+o();return P.has(n)?(a(),e(n)):t}(e||a()))}function I(){switch(a(),o()){case"/":return a(),A("comment1");case"*":return a(),T()}return r.regex_allowed?N(""):k("/")}function K(e,t){return function(n){try{return t(n)}catch(t){if(t!==ne)throw t;m(e);}}}function H(e){if(null!=e)return N(e);for(i&&0==r.pos&&u("#!")&&(l(),s(2),A("comment5"));;){if(d(),l(),n){if(u("\x3c!--")){s(4),A("comment3");continue}if(u("--\x3e")&&r.newline_before){s(3),A("comment4");continue}}var t=o();if(!t)return _("eof");var c=t.charCodeAt(0);switch(c){case 34:case 39:return S();case 46:return a(),Y(o().charCodeAt(0))?h("."):"."===o()?(a(),a(),_("expand","...")):_("punc",".");case 47:var p=I();if(p===H)continue;return p;case 61:return a(),">"===o()?(a(),_("arrow","=>")):k("=");case 96:return v(!0);case 123:r.brace_counter++;break;case 125:if(r.brace_counter--,r.template_braces.length>0&&r.template_braces[r.template_braces.length-1]===r.brace_counter)return v(!1)}if(Y(c))return h();if(G.has(t))return _("punc",a());if(M.has(t))return k();if(92==c||q(t))return E=void 0,E=y(),f?_("name",E):C.has(E)?_("atom",E):b.has(E)?P.has(E)?_("operator",E):_("keyword",E):_("name",E);break}var E;m("Unexpected character '"+t+"'");}return H.next=a,H.peek=o,H.context=function(e){return e&&(r=e),r},H.add_directive=function(e){r.directive_stack[r.directive_stack.length-1].push(e),void 0===r.directives[e]?r.directives[e]=1:r.directives[e]++;},H.push_directives_stack=function(){r.directive_stack.push([]);},H.pop_directives_stack=function(){for(var e=r.directive_stack[r.directive_stack.length-1],t=0;t<e.length;t++)r.directives[e[t]]--;r.directive_stack.pop();},H.has_directive=function(e){return r.directives[e]>0},H}var re=E(["typeof","void","delete","--","++","!","~","-","+"]),oe=E(["--","++"]),ae=E(["=","+=","-=","/=","*=","**=","%=",">>=","<<=",">>>=","|=","^=","&="]),se=function(e,t){for(var n=0;n<e.length;++n)for(var i=e[n],r=0;r<i.length;++r)t[i[r]]=n+1;return t}([["||"],["??"],["&&"],["|"],["^"],["&"],["==","===","!=","!=="],["<",">","<=",">=","in","instanceof"],[">>","<<",">>>"],["+","-"],["*","/","%"],["**"]],{}),ue=E(["atom","num","big_int","string","regexp","name"]);function ce(e,t){const n=new Map;t=o(t,{bare_returns:!1,ecma:2017,expression:!1,filename:null,html5_comments:!0,module:!1,shebang:!0,strict:!1,toplevel:null},!0);var i={input:"string"==typeof e?ie(e,t.filename,t.html5_comments,t.shebang):e,token:null,prev:null,peeked:null,in_function:0,in_async:-1,in_generator:-1,in_directives:!0,in_loop:0,labels:[]};function r(e,t){return te(i.token,e,t)}function a(){return i.peeked||(i.peeked=i.input())}function s(){return i.prev=i.token,i.peeked||a(),i.token=i.peeked,i.peeked=null,i.in_directives=i.in_directives&&("string"==i.token.type||r("punc",";")),i.token}function u(){return i.prev}function c(e,t,n,r){var o=i.input.context();ee(e,o.filename,null!=t?t:o.tokline,null!=n?n:o.tokcol,null!=r?r:o.tokpos);}function l(e,t){c(t,e.line,e.col);}function f(e){null==e&&(e=i.token),l(e,"Unexpected token: "+e.type+" ("+e.value+")");}function p(e,t){if(r(e,t))return s();l(i.token,"Unexpected token "+i.token.type+" «"+i.token.value+"», expected "+e+" «"+t+"»");}function _(e){return p("punc",e)}function d(e){return e.nlb||!e.comments_before.every(e=>!e.nlb)}function m(){return !t.strict&&(r("eof")||r("punc","}")||d(i.token))}function h(){return i.in_generator===i.in_function}function E(){return i.in_async===i.in_function}function g(e){r("punc",";")?s():e||m()||f();}function D(){_("(");var e=qe(!0);return _(")"),e}function S(e){return function(...t){const n=i.token,r=e(...t);return r.start=n,r.end=u(),r}}function v(){(r("operator","/")||r("operator","/="))&&(i.peeked=null,i.token=i.input(i.token.value.substr(1)));}i.token=s();var A=S((function(e,n,o){switch(v(),i.token.type){case"string":if(i.in_directives){var h=a();!i.token.raw.includes("\\")&&(te(h,"punc",";")||te(h,"punc","}")||d(h)||te(h,"eof"))?i.input.add_directive(i.token.value):i.in_directives=!1;}var S=i.in_directives,y=T();return S&&y.body instanceof fn?new me(y.body):y;case"template_head":case"num":case"big_int":case"regexp":case"operator":case"atom":return T();case"name":if("async"==i.token.value&&te(a(),"keyword","function"))return s(),s(),n&&c("functions are not allowed as the body of a loop"),F(Be,!1,!0,e);if("import"==i.token.value&&!te(a(),"punc","(")){s();var C=function(){var e,t,n=u();r("name")&&(e=le(en));r("punc",",")&&s();((t=J(!0))||e)&&p("name","from");var o=i.token;"string"!==o.type&&f();return s(),new _t({start:n,imported_name:e,imported_names:t,module_name:new fn({start:o,value:o.value,quote:o.quote,end:o}),end:i.token})}();return g(),C}return te(a(),"punc",":")?function(){var e=le(nn);"await"===e.name&&E()&&l(i.prev,"await cannot be used as label inside async function");i.labels.some(t=>t.name===e.name)&&c("Label "+e.name+" defined twice");_(":"),i.labels.push(e);var t=A();i.labels.pop(),t instanceof ye||e.references.forEach((function(t){t instanceof je&&(t=t.label.start,c("Continue label `"+e.name+"` refers to non-IterationStatement.",t.line,t.col,t.pos));}));return new Te({body:t,label:e})}():T();case"punc":switch(i.token.value){case"{":return new Se({start:i.token,body:N(),end:u()});case"[":case"(":return T();case";":return i.in_directives=!1,s(),new ve;default:f();}case"keyword":switch(i.token.value){case"break":return s(),b($e);case"continue":return s(),b(je);case"debugger":return s(),g(),new de;case"do":s();var O=tt(A);p("keyword","while");var M=D();return g(!0),new Ce({body:O,condition:M});case"while":return s(),new Oe({condition:D(),body:tt((function(){return A(!1,!0)}))});case"for":return s(),function(){var e="`for await` invalid in this context",t=i.token;"name"==t.type&&"await"==t.value?(E()||l(t,e),s()):t=!1;_("(");var n=null;if(r("punc",";"))t&&l(t,e);else {n=r("keyword","var")?(s(),L(!0)):r("keyword","let")?(s(),P(!0)):r("keyword","const")?(s(),V(!0)):qe(!0,!0);var o=r("operator","in"),a=r("name","of");if(t&&!a&&l(t,e),o||a)return n instanceof st?n.definitions.length>1&&l(n.start,"Only one variable declaration allowed in for..in loop"):xe(n)||(n=Xe(n))instanceof Ke||l(n.start,"Invalid left-hand side in for..in loop"),s(),o?function(e){var t=qe(!0);return _(")"),new Me({init:e,object:t,body:tt((function(){return A(!1,!0)}))})}(n):function(e,t){var n=e instanceof st?e.definitions[0].name:null,i=qe(!0);return _(")"),new Re({await:t,init:e,name:n,object:i,body:tt((function(){return A(!1,!0)}))})}(n,!!t)}return function(e){_(";");var t=r("punc",";")?null:qe(!0);_(";");var n=r("punc",")")?null:qe(!0);return _(")"),new Fe({init:e,condition:t,step:n,body:tt((function(){return A(!1,!0)}))})}(n)}();case"class":return s(),n&&c("classes are not allowed as the body of a loop"),o&&c("classes are not allowed as the body of an if"),q(Pt);case"function":return s(),n&&c("functions are not allowed as the body of a loop"),F(Be,!1,!1,e);case"if":return s(),function(){var e=D(),t=A(!1,!1,!0),n=null;r("keyword","else")&&(s(),n=A(!1,!1,!0));return new Qe({condition:e,body:t,alternative:n})}();case"return":0!=i.in_function||t.bare_returns||c("'return' outside of function"),s();var w=null;return r("punc",";")?s():m()||(w=qe(!0),g()),new We({value:w});case"switch":return s(),new et({expression:D(),body:tt(k)});case"throw":s(),d(i.token)&&c("Illegal newline after 'throw'");w=qe(!0);return g(),new Ye({value:w});case"try":return s(),function(){var e=N(),t=null,n=null;if(r("keyword","catch")){var o=i.token;if(s(),r("punc","{"))var a=null;else {_("(");a=R(void 0,Qt);_(")");}t=new ot({start:o,argname:a,body:N(),end:u()});}if(r("keyword","finally")){o=i.token;s(),n=new at({start:o,body:N(),end:u()});}t||n||c("Missing catch/finally blocks");return new rt({body:e,bcatch:t,bfinally:n})}();case"var":s();C=L();return g(),C;case"let":s();C=P();return g(),C;case"const":s();C=V();return g(),C;case"with":return i.input.has_directive("use strict")&&c("Strict mode may not include a with statement"),s(),new we({expression:D(),body:A()});case"export":if(!te(a(),"punc","(")){s();C=function(){var e,t,n,o,c,l=i.token;if(r("keyword","default"))e=!0,s();else if(t=J(!1)){if(r("name","from")){s();var p=i.token;return "string"!==p.type&&f(),s(),new dt({start:l,is_default:e,exported_names:t,module_name:new fn({start:p,value:p.value,quote:p.quote,end:p}),end:u()})}return new dt({start:l,is_default:e,exported_names:t,end:u()})}r("punc","{")||e&&(r("keyword","class")||r("keyword","function"))&&te(a(),"punc")?(o=qe(!1),g()):(n=A(e))instanceof st&&e?f(n.start):n instanceof st||n instanceof Ie||n instanceof Pt?c=n:n instanceof he?o=n.body:f(n.start);return new dt({start:l,is_default:e,exported_value:o,exported_definition:c,end:u()})}();return r("punc",";")&&g(),C}}}f();}));function T(e){return new he({body:(e=qe(!0),g(),e)})}function b(e){var t,n=null;m()||(n=le(sn,!0)),null!=n?((t=i.labels.find(e=>e.name===n.name))||c("Undefined label "+n.name),n.thedef=t):0==i.in_loop&&c(e.TYPE+" not inside a loop or switch"),g();var r=new e({label:n});return t&&t.references.push(r),r}var C=function(e,t,n){d(i.token)&&c("Unexpected newline before arrow (=>)"),p("arrow","=>");var o=x(r("punc","{"),!1,n),a=o instanceof Array&&o.length?o[o.length-1].end:o instanceof Array?e:o.end;return new Ve({start:e,end:a,async:n,argnames:t,body:o})},F=function(e,t,n,i){var o=e===Be,a=r("operator","*");a&&s();var c=r("name")?le(o?Yt:jt):null;o&&!c&&(i?e=Pe:f()),!c||e===Le||c instanceof Ut||f(u());var l=[],p=x(!0,a||t,n,c,l);return new e({start:l.start,end:p.end,is_generator:a,async:n,name:c,argnames:l,body:p})};function M(e,t){var n=new Set,i=!1,r=!1,o=!1,a=!!t,s={add_parameter:function(t){if(n.has(t.value))!1===i&&(i=t),s.check_strict();else if(n.add(t.value),e)switch(t.value){case"arguments":case"eval":case"yield":a&&l(t,"Unexpected "+t.value+" identifier as parameter inside strict mode");break;default:O.has(t.value)&&f();}},mark_default_assignment:function(e){!1===r&&(r=e);},mark_spread:function(e){!1===o&&(o=e);},mark_strict_mode:function(){a=!0;},is_strict:function(){return !1!==r||!1!==o||a},check_strict:function(){s.is_strict()&&!1!==i&&l(i,"Parameter "+i.value+" was used already");}};return s}function R(e,t){var n,o=!1;return void 0===e&&(e=M(!0,i.input.has_directive("use strict"))),r("expand","...")&&(o=i.token,e.mark_spread(i.token),s()),n=w(e,t),r("operator","=")&&!1===o&&(e.mark_default_assignment(i.token),s(),n=new Ot({start:n.start,left:n,operator:"=",right:qe(!1),end:i.token})),!1!==o&&(r("punc",")")||f(),n=new ke({start:o,expression:n,end:o})),e.check_strict(),n}function w(e,t){var n,o=[],l=!0,p=!1,d=i.token;if(void 0===e&&(e=M(!1,i.input.has_directive("use strict"))),t=void 0===t?Wt:t,r("punc","[")){for(s();!r("punc","]");){if(l?l=!1:_(","),r("expand","...")&&(p=!0,n=i.token,e.mark_spread(i.token),s()),r("punc"))switch(i.token.value){case",":o.push(new Dn({start:i.token,end:i.token}));continue;case"]":break;case"[":case"{":o.push(w(e,t));break;default:f();}else r("name")?(e.add_parameter(i.token),o.push(le(t))):c("Invalid function parameter");r("operator","=")&&!1===p&&(e.mark_default_assignment(i.token),s(),o[o.length-1]=new Ot({start:o[o.length-1].start,left:o[o.length-1],operator:"=",right:qe(!1),end:i.token})),p&&(r("punc","]")||c("Rest element must be last element"),o[o.length-1]=new ke({start:n,expression:o[o.length-1],end:n}));}return _("]"),e.check_strict(),new Ke({start:d,names:o,is_array:!0,end:u()})}if(r("punc","{")){for(s();!r("punc","}");){if(l?l=!1:_(","),r("expand","...")&&(p=!0,n=i.token,e.mark_spread(i.token),s()),r("name")&&(te(a(),"punc")||te(a(),"operator"))&&[",","}","="].includes(a().value)){e.add_parameter(i.token);var m=u(),h=le(t);p?o.push(new ke({start:n,expression:h,end:h.end})):o.push(new wt({start:m,key:h.name,value:h,end:h.end}));}else {if(r("punc","}"))continue;var E=i.token,g=Q();null===g?f(u()):"name"!==u().type||r("punc",":")?(_(":"),o.push(new wt({start:E,quote:E.quote,key:g,value:w(e,t),end:u()}))):o.push(new wt({start:u(),key:g,value:new t({start:u(),name:g,end:u()}),end:u()}));}p?r("punc","}")||c("Rest element must be last element"):r("operator","=")&&(e.mark_default_assignment(i.token),s(),o[o.length-1].value=new Ot({start:o[o.length-1].value.start,left:o[o.length-1].value,operator:"=",right:qe(!1),end:i.token}));}return _("}"),e.check_strict(),new Ke({start:d,names:o,is_array:!1,end:u()})}if(r("name"))return e.add_parameter(i.token),le(t);c("Invalid function parameter");}function x(e,n,o,a,u){var c=i.in_loop,l=i.labels,p=i.in_generator,d=i.in_async;if(++i.in_function,n&&(i.in_generator=i.in_function),o&&(i.in_async=i.in_function),u&&function(e){var n=M(!0,i.input.has_directive("use strict"));for(_("(");!r("punc",")");){var o=R(n);if(e.push(o),r("punc",")")||(_(","),r("punc",")")&&t.ecma<2017&&f()),o instanceof ke)break}s();}(u),e&&(i.in_directives=!0),i.in_loop=0,i.labels=[],e){i.input.push_directives_stack();var m=N();a&&ce(a),u&&u.forEach(ce),i.input.pop_directives_stack();}else m=[new We({start:i.token,value:qe(!1),end:i.token})];return --i.in_function,i.in_loop=c,i.labels=l,i.in_generator=p,i.in_async=d,m}function N(){_("{");for(var e=[];!r("punc","}");)r("eof")&&f(),e.push(A());return s(),e}function k(){_("{");for(var e,t=[],n=null,o=null;!r("punc","}");)r("eof")&&f(),r("keyword","case")?(o&&(o.end=u()),n=[],o=new it({start:(e=i.token,s(),e),expression:qe(!0),body:n}),t.push(o),_(":")):r("keyword","default")?(o&&(o.end=u()),n=[],o=new nt({start:(e=i.token,s(),_(":"),e),body:n}),t.push(o)):(n||f(),n.push(A()));return o&&(o.end=u()),s(),t}function I(e,t){for(var n,o=[];;){var a="var"===t?Gt:"const"===t?Xt:"let"===t?zt:null;if(r("punc","{")||r("punc","[")?n=new ft({start:i.token,name:w(void 0,a),value:r("operator","=")?(p("operator","="),qe(!1,e)):null,end:u()}):"import"==(n=new ft({start:i.token,name:le(a),value:r("operator","=")?(s(),qe(!1,e)):e||"const"!==t?null:c("Missing initializer in const declaration"),end:u()})).name.name&&c("Unexpected token: import"),o.push(n),!r("punc",","))break;s();}return o}var L=function(e){return new ut({start:u(),definitions:I(e,"var"),end:u()})},P=function(e){return new ct({start:u(),definitions:I(e,"let"),end:u()})},V=function(e){return new lt({start:u(),definitions:I(e,"const"),end:u()})};function B(){var e,t=i.token;switch(t.type){case"name":e=ne(rn);break;case"num":e=new pn({start:t,end:t,value:t.value});break;case"big_int":e=new _n({start:t,end:t,value:t.value});break;case"string":e=new fn({start:t,end:t,value:t.value,quote:t.quote});break;case"regexp":e=new dn({start:t,end:t,value:t.value});break;case"atom":switch(t.value){case"false":e=new An({start:t,end:t});break;case"true":e=new Tn({start:t,end:t});break;case"null":e=new hn({start:t,end:t});}}return s(),e}function U(e,t,n,i){var r=function(e,t){return t?new Ot({start:e.start,left:e,operator:"=",right:t,end:t.end}):e};return e instanceof Mt?r(new Ke({start:e.start,end:e.end,is_array:!1,names:e.properties.map(U)}),i):e instanceof wt?(e.value=U(e.value,0,[e.key]),r(e,i)):e instanceof Dn?e:e instanceof Ke?(e.names=e.names.map(U),r(e,i)):e instanceof rn?r(new Wt({name:e.name,start:e.start,end:e.end}),i):e instanceof ke?(e.expression=U(e.expression),r(e,i)):e instanceof Ft?r(new Ke({start:e.start,end:e.end,is_array:!0,names:e.elements.map(U)}),i):e instanceof Ct?r(U(e.left,void 0,void 0,e.right),i):e instanceof Ot?(e.left=U(e.left,0,[e.left]),e):void c("Invalid function parameter",e.start.line,e.start.col)}var G=function(e,o){if(r("operator","new"))return function(e){var n=i.token;if(p("operator","new"),r("punc","."))return s(),p("name","target"),_e(new Kt({start:n,end:u()}),e);var o,a=G(!1);r("punc","(")?(s(),o=X(")",t.ecma>=2017)):o=[];var c=new ht({start:n,expression:a,args:o,end:u()});return fe(c),_e(c,e)}(e);var c,l=i.token,d=r("name","async")&&"["!=(c=a()).value&&"arrow"!=c.type&&B();if(r("punc")){switch(i.token.value){case"(":if(d&&!e)break;var m=function(e,n){var o,a,c,l=[];for(_("(");!r("punc",")");)o&&f(o),r("expand","...")?(o=i.token,n&&(a=i.token),s(),l.push(new ke({start:u(),expression:qe(),end:i.token}))):l.push(qe()),r("punc",")")||(_(","),r("punc",")")&&(t.ecma<2017&&f(),c=u(),n&&(a=c)));return _(")"),e&&r("arrow","=>")?o&&c&&f(c):a&&f(a),l}(o,!d);if(o&&r("arrow","=>"))return C(l,m.map(U),!!d);var h=d?new mt({expression:d,args:m}):1==m.length?m[0]:new Et({expressions:m});if(h.start){const e=l.comments_before.length;if(n.set(l,e),h.start.comments_before.unshift(...l.comments_before),l.comments_before=h.start.comments_before,0==e&&l.comments_before.length>0){var E=l.comments_before[0];E.nlb||(E.nlb=l.nlb,l.nlb=!1);}l.comments_after=h.start.comments_after;}h.start=l;var g=u();return h.end&&(g.comments_before=h.end.comments_before,h.end.comments_after.push(...g.comments_after),g.comments_after=h.end.comments_after),h.end=g,h instanceof mt&&fe(h),_e(h,e);case"[":return _e(z(),e);case"{":return _e(Y(),e)}d||f();}if(o&&r("name")&&te(a(),"arrow")){var D=new Wt({name:i.token.value,start:l,end:l});return s(),C(l,[D],!!d)}if(r("keyword","function")){s();var S=F(Pe,!1,!!d);return S.start=l,S.end=u(),_e(S,e)}if(d)return _e(d,e);if(r("keyword","class")){s();var v=q(Vt);return v.start=l,v.end=u(),_e(v,e)}return r("template_head")?_e(H(),e):ue.has(i.token.type)?_e(B(),e):void f()};function H(){var e=[],t=i.token;for(e.push(new He({start:i.token,raw:i.token.raw,value:i.token.value,end:i.token}));!i.token.end;)s(),v(),e.push(qe(!0)),te("template_substitution")||f(),e.push(new He({start:i.token,raw:i.token.raw,value:i.token.value,end:i.token}));return s(),new Ge({start:t,segments:e,end:i.token})}function X(e,t,n){for(var o=!0,a=[];!r("punc",e)&&(o?o=!1:_(","),!t||!r("punc",e));)r("punc",",")&&n?a.push(new Dn({start:i.token,end:i.token})):r("expand","...")?(s(),a.push(new ke({start:u(),expression:qe(),end:i.token}))):a.push(qe(!1));return s(),a}var z=S((function(){return _("["),new Ft({elements:X("]",!t.strict,!0)})})),W=S((e,t)=>F(Le,e,t)),Y=S((function(){var e=i.token,n=!0,o=[];for(_("{");!r("punc","}")&&(n?n=!1:_(","),t.strict||!r("punc","}"));)if("expand"!=(e=i.token).type){var a,c=Q();if(r("punc",":"))null===c?f(u()):(s(),a=qe(!1));else {var l=$(c,e);if(l){o.push(l);continue}a=new rn({start:u(),name:c,end:u()});}r("operator","=")&&(s(),a=new Ct({start:e,left:a,operator:"=",right:qe(!1),end:u()})),o.push(new wt({start:e,quote:e.quote,key:c instanceof pe?c:""+c,value:a,end:u()}));}else s(),o.push(new ke({start:e,expression:qe(!1),end:u()}));return s(),new Mt({properties:o})}));function q(e){var t,n,o,a,c=[];for(i.input.push_directives_stack(),i.input.add_directive("use strict"),"name"==i.token.type&&"extends"!=i.token.value&&(o=le(e===Pt?Zt:Jt)),e!==Pt||o||f(),"extends"==i.token.value&&(s(),a=qe(!0)),_("{");r("punc",";");)s();for(;!r("punc","}");)for(t=i.token,(n=$(Q(),t,!0))||f(),c.push(n);r("punc",";");)s();return i.input.pop_directives_stack(),s(),new e({start:t,name:o,extends:a,properties:c,end:u()})}function $(e,t,n){var o=function(e,t){return "string"==typeof e||"number"==typeof e?new qt({start:t,name:""+e,end:u()}):(null===e&&f(),e)};var a=!1,c=!1,l=!1,p=t;if(n&&"static"===e&&!r("punc","(")&&(c=!0,p=i.token,e=Q()),"async"!==e||r("punc","(")||r("punc",",")||r("punc","}")||r("operator","=")||(a=!0,p=i.token,e=Q()),null===e&&(l=!0,p=i.token,null===(e=Q())&&f()),r("punc","("))return e=o(e,t),new kt({start:t,static:c,is_generator:l,async:a,key:e,quote:e instanceof qt?p.quote:void 0,value:W(l,a),end:u()});const _=i.token;if("get"==e){if(!r("punc")||r("punc","["))return e=o(Q(),t),new Nt({start:t,static:c,key:e,quote:e instanceof qt?_.quote:void 0,value:W(),end:u()})}else if("set"==e&&(!r("punc")||r("punc","[")))return e=o(Q(),t),new xt({start:t,static:c,key:e,quote:e instanceof qt?_.quote:void 0,value:W(),end:u()});if(n){const n=(e=>"string"==typeof e||"number"==typeof e?new $t({start:p,end:p,name:""+e}):(null===e&&f(),e))(e),i=n instanceof $t?p.quote:void 0;if(r("operator","="))return s(),new Lt({start:t,static:c,quote:i,key:n,value:qe(!1),end:u()});if(r("name")||r("punc",";")||r("punc","}"))return new Lt({start:t,static:c,quote:i,key:n,end:u()})}}function j(e){function t(e){return new e({name:Q(),start:u(),end:u()})}var n,o,a=e?tn:an,c=e?en:on,l=i.token;return e?n=t(a):o=t(c),r("name","as")?(s(),e?o=t(c):n=t(a)):e?o=new c(n):n=new a(o),new pt({start:l,foreign_name:n,name:o,end:u()})}function Z(e,t){var n,r=e?tn:an,o=e?en:on,a=i.token,s=u();return t=t||new o({name:"*",start:a,end:s}),n=new r({name:"*",start:a,end:s}),new pt({start:a,foreign_name:n,name:t,end:s})}function J(e){var t;if(r("punc","{")){for(s(),t=[];!r("punc","}");)t.push(j(e)),r("punc",",")&&s();s();}else if(r("operator","*")){var n;s(),e&&r("name","as")&&(s(),n=le(e?en:an)),t=[Z(e,n)];}return t}function Q(){var e=i.token;switch(e.type){case"punc":if("["===e.value){s();var t=qe(!1);return _("]"),t}f(e);case"operator":if("*"===e.value)return s(),null;["delete","in","instanceof","new","typeof","void"].includes(e.value)||f(e);case"name":case"string":case"num":case"big_int":case"keyword":case"atom":return s(),e.value;default:f(e);}}function ne(e){var t=i.token.value;return new("this"==t?un:"super"==t?cn:e)({name:String(t),start:i.token,end:i.token})}function ce(e){var t=e.name;h()&&"yield"==t&&l(e.start,"Yield cannot be used as identifier inside generators"),i.input.has_directive("use strict")&&("yield"==t&&l(e.start,"Unexpected yield identifier inside strict mode"),e instanceof Ut&&("arguments"==t||"eval"==t)&&l(e.start,"Unexpected "+t+" in strict mode"));}function le(e,t){if(!r("name"))return t||c("Name expected"),null;var n=ne(e);return ce(n),s(),n}function fe(e){var t=e.start,i=t.comments_before;const r=n.get(t);for(var o=null!=r?r:i.length;--o>=0;){var a=i[o];if(/[@#]__/.test(a.value)){if(/[@#]__PURE__/.test(a.value)){y(e,Mn);break}if(/[@#]__INLINE__/.test(a.value)){y(e,Rn);break}if(/[@#]__NOINLINE__/.test(a.value)){y(e,wn);break}}}}var _e=function(e,t){var n,o=e.start;if(r("punc","."))return s(),_e(new Dt({start:o,expression:e,property:(n=i.token,"name"!=n.type&&f(),s(),n.value),end:u()}),t);if(r("punc","[")){s();var a=qe(!0);return _("]"),_e(new St({start:o,expression:e,property:a,end:u()}),t)}if(t&&r("punc","(")){s();var c=new mt({start:o,expression:e,args:Ee(),end:u()});return fe(c),_e(c,!0)}return r("template_head")?_e(new Ue({start:o,prefix:e,template_string:H(),end:u()}),t):e};function Ee(){for(var e=[];!r("punc",")");)r("expand","...")?(s(),e.push(new ke({start:u(),expression:qe(!1),end:u()}))):e.push(qe(!1)),r("punc",")")||(_(","),r("punc",")")&&t.ecma<2017&&f());return s(),e}var ge=function(e,t){var n=i.token;if("name"==n.type&&"await"==n.value){if(E())return s(),E()||c("Unexpected await expression outside async function",i.prev.line,i.prev.col,i.prev.pos),new Ze({start:u(),end:i.token,expression:ge(!0)});i.input.has_directive("use strict")&&l(i.token,"Unexpected await identifier inside strict mode");}if(r("operator")&&re.has(n.value)){s(),v();var o=De(At,n,ge(e));return o.start=n,o.end=u(),o}for(var a=G(e,t);r("operator")&&oe.has(i.token.value)&&!d(i.token);)a instanceof Ve&&f(),(a=De(Tt,i.token,a)).start=n,a.end=i.token,s();return a};function De(e,t,n){var r=t.value;switch(r){case"++":case"--":xe(n)||c("Invalid use of "+r+" operator",t.line,t.col,t.pos);break;case"delete":n instanceof rn&&i.input.has_directive("use strict")&&c("Calling delete on expression not allowed in strict mode",n.start.line,n.start.col,n.start.pos);}return new e({operator:r,expression:n})}var Ae=function(e,t,n){var o=r("operator")?i.token.value:null;"in"==o&&n&&(o=null),"**"==o&&e instanceof At&&!te(e.start,"punc","(")&&"--"!==e.operator&&"++"!==e.operator&&f(e.start);var a=null!=o?se[o]:null;if(null!=a&&(a>t||"**"===o&&t===a)){s();var u=Ae(ge(!0),a,n);return Ae(new yt({start:e.start,left:e,operator:o,right:u,end:u.end}),t,n)}return e};var be=function(e){var t=i.token,n=function(e){return Ae(ge(!0,!0),0,e)}(e);if(r("operator","?")){s();var o=qe(!1);return _(":"),new bt({start:t,condition:n,consequent:o,alternative:qe(!1,e),end:u()})}return n};function xe(e){return e instanceof gt||e instanceof rn}function Xe(e){if(e instanceof Mt)e=new Ke({start:e.start,names:e.properties.map(Xe),is_array:!1,end:e.end});else if(e instanceof Ft){for(var t=[],n=0;n<e.elements.length;n++)e.elements[n]instanceof ke&&(n+1!==e.elements.length&&l(e.elements[n].start,"Spread must the be last element in destructuring array"),e.elements[n].expression=Xe(e.elements[n].expression)),t.push(Xe(e.elements[n]));e=new Ke({start:e.start,names:t,is_array:!0,end:e.end});}else e instanceof Rt?e.value=Xe(e.value):e instanceof Ct&&(e=new Ot({start:e.start,left:e.left,operator:"=",right:e.right,end:e.end}));return e}var ze=function(e){v();var t=i.token;if("name"==t.type&&"yield"==t.value){if(h())return s(),function(){h()||c("Unexpected yield expression outside generator function",i.prev.line,i.prev.col,i.prev.pos);var e=i.token,t=!1,n=!0;return m()||r("punc")&&K.has(i.token.value)?n=!1:r("operator","*")&&(t=!0,s()),new Je({start:e,is_star:t,expression:n?qe():null,end:u()})}();i.input.has_directive("use strict")&&l(i.token,"Unexpected yield identifier inside strict mode");}var n=be(e),o=i.token.value;if(r("operator")&&ae.has(o)){if(xe(n)||(n=Xe(n))instanceof Ke)return s(),new Ct({start:t,left:n,operator:o,right:ze(e),end:u()});c("Invalid assignment");}return n},qe=function(e,t){for(var n=i.token,o=[];o.push(ze(t)),e&&r("punc",",");)s(),e=!0;return 1==o.length?o[0]:new Et({start:n,expressions:o,end:a()})};function tt(e){++i.in_loop;var t=e();return --i.in_loop,t}return t.expression?qe(!0):function(){var e=i.token,n=[];for(i.input.push_directives_stack(),t.module&&i.input.add_directive("use strict");!r("eof");)n.push(A());i.input.pop_directives_stack();var o=u(),a=t.toplevel;return a?(a.body=a.body.concat(n),a.end=o):a=new Ne({start:e,body:n,end:o}),a}()}function le(e,t,n,i=pe){var r=t=t?t.split(/\s+/):[];i&&i.PROPS&&(t=t.concat(i.PROPS));for(var o="return function AST_"+e+"(props){ if (props) { ",a=t.length;--a>=0;)o+="this."+t[a]+" = props."+t[a]+";";const s=i&&Object.create(i.prototype);(s&&s.initialize||n&&n.initialize)&&(o+="this.initialize();"),o+="}",o+="this.flags = 0;",o+="}";var u=new Function(o)();if(s&&(u.prototype=s,u.BASE=i),i&&i.SUBCLASSES.push(u),u.prototype.CTOR=u,u.prototype.constructor=u,u.PROPS=t||null,u.SELF_PROPS=r,u.SUBCLASSES=[],e&&(u.prototype.TYPE=u.TYPE=e),n)for(a in n)D(n,a)&&("$"===a[0]?u[a.substr(1)]=n[a]:u.prototype[a]=n[a]);return u.DEFMETHOD=function(e,t){this.prototype[e]=t;},u}var fe=le("Token","type value line col pos endline endcol endpos nlb comments_before comments_after file raw quote end",{},null),pe=le("Node","start end",{_clone:function(e){if(e){var t=this.clone();return t.transform(new Fn((function(e){if(e!==t)return e.clone(!0)})))}return new this.CTOR(this)},clone:function(e){return this._clone(e)},$documentation:"Base class of all AST nodes",$propdoc:{start:"[AST_Token] The first token of this node",end:"[AST_Token] The last token of this node"},_walk:function(e){return e._visit(this)},walk:function(e){return this._walk(e)},_children_backwards:()=>{}},null);pe.warn_function=null,pe.warn=function(e,t){pe.warn_function&&pe.warn_function(d(e,t));};var _e=le("Statement",null,{$documentation:"Base class of all statements"}),de=le("Debugger",null,{$documentation:"Represents a debugger statement"},_e),me=le("Directive","value quote",{$documentation:'Represents a directive, like "use strict";',$propdoc:{value:"[string] The value of this directive as a plain string (it's not an AST_String!)",quote:"[string] the original quote character"}},_e),he=le("SimpleStatement","body",{$documentation:"A statement consisting of an expression, i.e. a = 1 + 2",$propdoc:{body:"[AST_Node] an expression node (should not be instanceof AST_Statement)"},_walk:function(e){return e._visit(this,(function(){this.body._walk(e);}))},_children_backwards(e){e(this.body);}},_e);function Ee(e,t){const n=e.body;for(var i=0,r=n.length;i<r;i++)n[i]._walk(t);}function ge(e){var t=this._clone(e);return this.block_scope&&(t.block_scope=this.block_scope.clone()),t}var De=le("Block","body block_scope",{$documentation:"A body of statements (usually braced)",$propdoc:{body:"[AST_Statement*] an array of statements",block_scope:"[AST_Scope] the block scope"},_walk:function(e){return e._visit(this,(function(){Ee(this,e);}))},_children_backwards(e){let t=this.body.length;for(;t--;)e(this.body[t]);},clone:ge},_e),Se=le("BlockStatement",null,{$documentation:"A block statement"},De),ve=le("EmptyStatement",null,{$documentation:"The empty statement (empty block or simply a semicolon)"},_e),Ae=le("StatementWithBody","body",{$documentation:"Base class for all statements that contain one nested body: `For`, `ForIn`, `Do`, `While`, `With`",$propdoc:{body:"[AST_Statement] the body; this should always be present, even if it's an AST_EmptyStatement"}},_e),Te=le("LabeledStatement","label",{$documentation:"Statement with a label",$propdoc:{label:"[AST_Label] a label definition"},_walk:function(e){return e._visit(this,(function(){this.label._walk(e),this.body._walk(e);}))},_children_backwards(e){e(this.body),e(this.label);},clone:function(e){var t=this._clone(e);if(e){var n=t.label,i=this.label;t.walk(new On((function(e){e instanceof qe&&e.label&&e.label.thedef===i&&(e.label.thedef=n,n.references.push(e));})));}return t}},Ae),ye=le("IterationStatement","block_scope",{$documentation:"Internal class.  All loops inherit from it.",$propdoc:{block_scope:"[AST_Scope] the block scope for this iteration statement."},clone:ge},Ae),be=le("DWLoop","condition",{$documentation:"Base class for do/while statements",$propdoc:{condition:"[AST_Node] the loop condition.  Should not be instanceof AST_Statement"}},ye),Ce=le("Do",null,{$documentation:"A `do` statement",_walk:function(e){return e._visit(this,(function(){this.body._walk(e),this.condition._walk(e);}))},_children_backwards(e){e(this.condition),e(this.body);}},be),Oe=le("While",null,{$documentation:"A `while` statement",_walk:function(e){return e._visit(this,(function(){this.condition._walk(e),this.body._walk(e);}))},_children_backwards(e){e(this.body),e(this.condition);}},be),Fe=le("For","init condition step",{$documentation:"A `for` statement",$propdoc:{init:"[AST_Node?] the `for` initialization code, or null if empty",condition:"[AST_Node?] the `for` termination clause, or null if empty",step:"[AST_Node?] the `for` update clause, or null if empty"},_walk:function(e){return e._visit(this,(function(){this.init&&this.init._walk(e),this.condition&&this.condition._walk(e),this.step&&this.step._walk(e),this.body._walk(e);}))},_children_backwards(e){e(this.body),this.step&&e(this.step),this.condition&&e(this.condition),this.init&&e(this.init);}},ye),Me=le("ForIn","init object",{$documentation:"A `for ... in` statement",$propdoc:{init:"[AST_Node] the `for/in` initialization code",object:"[AST_Node] the object that we're looping through"},_walk:function(e){return e._visit(this,(function(){this.init._walk(e),this.object._walk(e),this.body._walk(e);}))},_children_backwards(e){e(this.body),this.object&&e(this.object),this.init&&e(this.init);}},ye),Re=le("ForOf","await",{$documentation:"A `for ... of` statement"},Me),we=le("With","expression",{$documentation:"A `with` statement",$propdoc:{expression:"[AST_Node] the `with` expression"},_walk:function(e){return e._visit(this,(function(){this.expression._walk(e),this.body._walk(e);}))},_children_backwards(e){e(this.body),e(this.expression);}},Ae),xe=le("Scope","variables functions uses_with uses_eval parent_scope enclosed cname _var_name_cache",{$documentation:"Base class for all statements introducing a lexical scope",$propdoc:{variables:"[Map/S] a map of name -> SymbolDef for all variables/functions defined in this scope",functions:"[Map/S] like `variables`, but only lists function declarations",uses_with:"[boolean/S] tells whether this scope uses the `with` statement",uses_eval:"[boolean/S] tells whether this scope contains a direct call to the global `eval`",parent_scope:"[AST_Scope?/S] link to the parent scope",enclosed:"[SymbolDef*/S] a list of all symbol definitions that are accessed from this scope or any subscopes",cname:"[integer/S] current index for mangling variables (used internally by the mangler)"},get_defun_scope:function(){for(var e=this;e.is_block_scope();)e=e.parent_scope;return e},clone:function(e){var t=this._clone(e);return this.variables&&(t.variables=new Map(this.variables)),this.functions&&(t.functions=new Map(this.functions)),this.enclosed&&(t.enclosed=this.enclosed.slice()),this._block_scope&&(t._block_scope=this._block_scope),t},pinned:function(){return this.uses_eval||this.uses_with}},De),Ne=le("Toplevel","globals",{$documentation:"The toplevel scope",$propdoc:{globals:"[Map/S] a map of name -> SymbolDef for all undeclared names"},wrap_commonjs:function(e){var t=this.body,n="(function(exports){'$ORIG';})(typeof "+e+"=='undefined'?("+e+"={}):"+e+");";return n=(n=ce(n)).transform(new Fn((function(e){if(e instanceof me&&"$ORIG"==e.value)return f.splice(t)})))},wrap_enclose:function(e){"string"!=typeof e&&(e="");var t=e.indexOf(":");t<0&&(t=e.length);var n=this.body;return ce(["(function(",e.slice(0,t),'){"$ORIG"})(',e.slice(t+1),")"].join("")).transform(new Fn((function(e){if(e instanceof me&&"$ORIG"==e.value)return f.splice(n)})))}},xe),ke=le("Expansion","expression",{$documentation:"An expandible argument, such as ...rest, a splat, such as [1,2,...all], or an expansion in a variable declaration, such as var [first, ...rest] = list",$propdoc:{expression:"[AST_Node] the thing to be expanded"},_walk:function(e){return e._visit(this,(function(){this.expression.walk(e);}))},_children_backwards(e){e(this.expression);}}),Ie=le("Lambda","name argnames uses_arguments is_generator async",{$documentation:"Base class for functions",$propdoc:{name:"[AST_SymbolDeclaration?] the name of this function",argnames:"[AST_SymbolFunarg|AST_Destructuring|AST_Expansion|AST_DefaultAssign*] array of function arguments, destructurings, or expanding arguments",uses_arguments:"[boolean/S] tells whether this function accesses the arguments array",is_generator:"[boolean] is this a generator method",async:"[boolean] is this method async"},args_as_names:function(){for(var e=[],t=0;t<this.argnames.length;t++)this.argnames[t]instanceof Ke?e.push(...this.argnames[t].all_symbols()):e.push(this.argnames[t]);return e},_walk:function(e){return e._visit(this,(function(){this.name&&this.name._walk(e);for(var t=this.argnames,n=0,i=t.length;n<i;n++)t[n]._walk(e);Ee(this,e);}))},_children_backwards(e){let t=this.body.length;for(;t--;)e(this.body[t]);for(t=this.argnames.length;t--;)e(this.argnames[t]);this.name&&e(this.name);}},xe),Le=le("Accessor",null,{$documentation:"A setter/getter function.  The `name` property is always null."},Ie),Pe=le("Function",null,{$documentation:"A function expression"},Ie),Ve=le("Arrow",null,{$documentation:"An ES6 Arrow function ((a) => b)"},Ie),Be=le("Defun",null,{$documentation:"A function definition"},Ie),Ke=le("Destructuring","names is_array",{$documentation:"A destructuring of several names. Used in destructuring assignment and with destructuring function argument names",$propdoc:{names:"[AST_Node*] Array of properties or elements",is_array:"[Boolean] Whether the destructuring represents an object or array"},_walk:function(e){return e._visit(this,(function(){this.names.forEach((function(t){t._walk(e);}));}))},_children_backwards(e){let t=this.names.length;for(;t--;)e(this.names[t]);},all_symbols:function(){var e=[];return this.walk(new On((function(t){t instanceof Bt&&e.push(t);}))),e}}),Ue=le("PrefixedTemplateString","template_string prefix",{$documentation:"A templatestring with a prefix, such as String.raw`foobarbaz`",$propdoc:{template_string:"[AST_TemplateString] The template string",prefix:"[AST_SymbolRef|AST_PropAccess] The prefix, which can be a symbol such as `foo` or a dotted expression such as `String.raw`."},_walk:function(e){return e._visit(this,(function(){this.prefix._walk(e),this.template_string._walk(e);}))},_children_backwards(e){e(this.template_string),e(this.prefix);}}),Ge=le("TemplateString","segments",{$documentation:"A template string literal",$propdoc:{segments:"[AST_Node*] One or more segments, starting with AST_TemplateSegment. AST_Node may follow AST_TemplateSegment, but each AST_Node must be followed by AST_TemplateSegment."},_walk:function(e){return e._visit(this,(function(){this.segments.forEach((function(t){t._walk(e);}));}))},_children_backwards(e){let t=this.segments.length;for(;t--;)e(this.segments[t]);}}),He=le("TemplateSegment","value raw",{$documentation:"A segment of a template string literal",$propdoc:{value:"Content of the segment",raw:"Raw content of the segment"}}),Xe=le("Jump",null,{$documentation:"Base class for “jumps” (for now that's `return`, `throw`, `break` and `continue`)"},_e),ze=le("Exit","value",{$documentation:"Base class for “exits” (`return` and `throw`)",$propdoc:{value:"[AST_Node?] the value returned or thrown by this statement; could be null for AST_Return"},_walk:function(e){return e._visit(this,this.value&&function(){this.value._walk(e);})},_children_backwards(e){this.value&&e(this.value);}},Xe),We=le("Return",null,{$documentation:"A `return` statement"},ze),Ye=le("Throw",null,{$documentation:"A `throw` statement"},ze),qe=le("LoopControl","label",{$documentation:"Base class for loop control statements (`break` and `continue`)",$propdoc:{label:"[AST_LabelRef?] the label, or null if none"},_walk:function(e){return e._visit(this,this.label&&function(){this.label._walk(e);})},_children_backwards(e){this.label&&e(this.label);}},Xe),$e=le("Break",null,{$documentation:"A `break` statement"},qe),je=le("Continue",null,{$documentation:"A `continue` statement"},qe),Ze=le("Await","expression",{$documentation:"An `await` statement",$propdoc:{expression:"[AST_Node] the mandatory expression being awaited"},_walk:function(e){return e._visit(this,(function(){this.expression._walk(e);}))},_children_backwards(e){e(this.expression);}}),Je=le("Yield","expression is_star",{$documentation:"A `yield` statement",$propdoc:{expression:"[AST_Node?] the value returned or thrown by this statement; could be null (representing undefined) but only when is_star is set to false",is_star:"[Boolean] Whether this is a yield or yield* statement"},_walk:function(e){return e._visit(this,this.expression&&function(){this.expression._walk(e);})},_children_backwards(e){this.expression&&e(this.expression);}}),Qe=le("If","condition alternative",{$documentation:"A `if` statement",$propdoc:{condition:"[AST_Node] the `if` condition",alternative:"[AST_Statement?] the `else` part, or null if not present"},_walk:function(e){return e._visit(this,(function(){this.condition._walk(e),this.body._walk(e),this.alternative&&this.alternative._walk(e);}))},_children_backwards(e){this.alternative&&e(this.alternative),e(this.body),e(this.condition);}},Ae),et=le("Switch","expression",{$documentation:"A `switch` statement",$propdoc:{expression:"[AST_Node] the `switch` “discriminant”"},_walk:function(e){return e._visit(this,(function(){this.expression._walk(e),Ee(this,e);}))},_children_backwards(e){let t=this.body.length;for(;t--;)e(this.body[t]);e(this.expression);}},De),tt=le("SwitchBranch",null,{$documentation:"Base class for `switch` branches"},De),nt=le("Default",null,{$documentation:"A `default` switch branch"},tt),it=le("Case","expression",{$documentation:"A `case` switch branch",$propdoc:{expression:"[AST_Node] the `case` expression"},_walk:function(e){return e._visit(this,(function(){this.expression._walk(e),Ee(this,e);}))},_children_backwards(e){let t=this.body.length;for(;t--;)e(this.body[t]);e(this.expression);}},tt),rt=le("Try","bcatch bfinally",{$documentation:"A `try` statement",$propdoc:{bcatch:"[AST_Catch?] the catch block, or null if not present",bfinally:"[AST_Finally?] the finally block, or null if not present"},_walk:function(e){return e._visit(this,(function(){Ee(this,e),this.bcatch&&this.bcatch._walk(e),this.bfinally&&this.bfinally._walk(e);}))},_children_backwards(e){this.bfinally&&e(this.bfinally),this.bcatch&&e(this.bcatch);let t=this.body.length;for(;t--;)e(this.body[t]);}},De),ot=le("Catch","argname",{$documentation:"A `catch` node; only makes sense as part of a `try` statement",$propdoc:{argname:"[AST_SymbolCatch|AST_Destructuring|AST_Expansion|AST_DefaultAssign] symbol for the exception"},_walk:function(e){return e._visit(this,(function(){this.argname&&this.argname._walk(e),Ee(this,e);}))},_children_backwards(e){let t=this.body.length;for(;t--;)e(this.body[t]);this.argname&&e(this.argname);}},De),at=le("Finally",null,{$documentation:"A `finally` node; only makes sense as part of a `try` statement"},De),st=le("Definitions","definitions",{$documentation:"Base class for `var` or `const` nodes (variable declarations/initializations)",$propdoc:{definitions:"[AST_VarDef*] array of variable definitions"},_walk:function(e){return e._visit(this,(function(){for(var t=this.definitions,n=0,i=t.length;n<i;n++)t[n]._walk(e);}))},_children_backwards(e){let t=this.definitions.length;for(;t--;)e(this.definitions[t]);}},_e),ut=le("Var",null,{$documentation:"A `var` statement"},st),ct=le("Let",null,{$documentation:"A `let` statement"},st),lt=le("Const",null,{$documentation:"A `const` statement"},st),ft=le("VarDef","name value",{$documentation:"A variable declaration; only appears in a AST_Definitions node",$propdoc:{name:"[AST_Destructuring|AST_SymbolConst|AST_SymbolLet|AST_SymbolVar] name of the variable",value:"[AST_Node?] initializer, or null of there's no initializer"},_walk:function(e){return e._visit(this,(function(){this.name._walk(e),this.value&&this.value._walk(e);}))},_children_backwards(e){this.value&&e(this.value),e(this.name);}}),pt=le("NameMapping","foreign_name name",{$documentation:"The part of the export/import statement that declare names from a module.",$propdoc:{foreign_name:"[AST_SymbolExportForeign|AST_SymbolImportForeign] The name being exported/imported (as specified in the module)",name:"[AST_SymbolExport|AST_SymbolImport] The name as it is visible to this module."},_walk:function(e){return e._visit(this,(function(){this.foreign_name._walk(e),this.name._walk(e);}))},_children_backwards(e){e(this.name),e(this.foreign_name);}}),_t=le("Import","imported_name imported_names module_name",{$documentation:"An `import` statement",$propdoc:{imported_name:"[AST_SymbolImport] The name of the variable holding the module's default export.",imported_names:"[AST_NameMapping*] The names of non-default imported variables",module_name:"[AST_String] String literal describing where this module came from"},_walk:function(e){return e._visit(this,(function(){this.imported_name&&this.imported_name._walk(e),this.imported_names&&this.imported_names.forEach((function(t){t._walk(e);})),this.module_name._walk(e);}))},_children_backwards(e){if(e(this.module_name),this.imported_names){let t=this.imported_names.length;for(;t--;)e(this.imported_names[t]);}this.imported_name&&e(this.imported_name);}}),dt=le("Export","exported_definition exported_value is_default exported_names module_name",{$documentation:"An `export` statement",$propdoc:{exported_definition:"[AST_Defun|AST_Definitions|AST_DefClass?] An exported definition",exported_value:"[AST_Node?] An exported value",exported_names:"[AST_NameMapping*?] List of exported names",module_name:"[AST_String?] Name of the file to load exports from",is_default:"[Boolean] Whether this is the default exported value of this module"},_walk:function(e){return e._visit(this,(function(){this.exported_definition&&this.exported_definition._walk(e),this.exported_value&&this.exported_value._walk(e),this.exported_names&&this.exported_names.forEach((function(t){t._walk(e);})),this.module_name&&this.module_name._walk(e);}))},_children_backwards(e){if(this.module_name&&e(this.module_name),this.exported_names){let t=this.exported_names.length;for(;t--;)e(this.exported_names[t]);}this.exported_value&&e(this.exported_value),this.exported_definition&&e(this.exported_definition);}},_e),mt=le("Call","expression args _annotations",{$documentation:"A function call expression",$propdoc:{expression:"[AST_Node] expression to invoke as function",args:"[AST_Node*] array of arguments",_annotations:"[number] bitfield containing information about the call"},initialize(){null==this._annotations&&(this._annotations=0);},_walk(e){return e._visit(this,(function(){for(var t=this.args,n=0,i=t.length;n<i;n++)t[n]._walk(e);this.expression._walk(e);}))},_children_backwards(e){let t=this.args.length;for(;t--;)e(this.args[t]);e(this.expression);}}),ht=le("New",null,{$documentation:"An object instantiation.  Derives from a function call since it has exactly the same properties"},mt),Et=le("Sequence","expressions",{$documentation:"A sequence expression (comma-separated expressions)",$propdoc:{expressions:"[AST_Node*] array of expressions (at least two)"},_walk:function(e){return e._visit(this,(function(){this.expressions.forEach((function(t){t._walk(e);}));}))},_children_backwards(e){let t=this.expressions.length;for(;t--;)e(this.expressions[t]);}}),gt=le("PropAccess","expression property",{$documentation:'Base class for property access expressions, i.e. `a.foo` or `a["foo"]`',$propdoc:{expression:"[AST_Node] the “container” expression",property:"[AST_Node|string] the property to access.  For AST_Dot this is always a plain string, while for AST_Sub it's an arbitrary AST_Node"}}),Dt=le("Dot","quote",{$documentation:"A dotted property access expression",$propdoc:{quote:"[string] the original quote character when transformed from AST_Sub"},_walk:function(e){return e._visit(this,(function(){this.expression._walk(e);}))},_children_backwards(e){e(this.expression);}},gt),St=le("Sub",null,{$documentation:'Index-style property access, i.e. `a["foo"]`',_walk:function(e){return e._visit(this,(function(){this.expression._walk(e),this.property._walk(e);}))},_children_backwards(e){e(this.property),e(this.expression);}},gt),vt=le("Unary","operator expression",{$documentation:"Base class for unary expressions",$propdoc:{operator:"[string] the operator",expression:"[AST_Node] expression that this unary operator applies to"},_walk:function(e){return e._visit(this,(function(){this.expression._walk(e);}))},_children_backwards(e){e(this.expression);}}),At=le("UnaryPrefix",null,{$documentation:"Unary prefix expression, i.e. `typeof i` or `++i`"},vt),Tt=le("UnaryPostfix",null,{$documentation:"Unary postfix expression, i.e. `i++`"},vt),yt=le("Binary","operator left right",{$documentation:"Binary expression, i.e. `a + b`",$propdoc:{left:"[AST_Node] left-hand side expression",operator:"[string] the operator",right:"[AST_Node] right-hand side expression"},_walk:function(e){return e._visit(this,(function(){this.left._walk(e),this.right._walk(e);}))},_children_backwards(e){e(this.right),e(this.left);}}),bt=le("Conditional","condition consequent alternative",{$documentation:"Conditional expression using the ternary operator, i.e. `a ? b : c`",$propdoc:{condition:"[AST_Node]",consequent:"[AST_Node]",alternative:"[AST_Node]"},_walk:function(e){return e._visit(this,(function(){this.condition._walk(e),this.consequent._walk(e),this.alternative._walk(e);}))},_children_backwards(e){e(this.alternative),e(this.consequent),e(this.condition);}}),Ct=le("Assign",null,{$documentation:"An assignment expression — `a = b + 5`"},yt),Ot=le("DefaultAssign",null,{$documentation:"A default assignment expression like in `(a = 3) => a`"},yt),Ft=le("Array","elements",{$documentation:"An array literal",$propdoc:{elements:"[AST_Node*] array of elements"},_walk:function(e){return e._visit(this,(function(){for(var t=this.elements,n=0,i=t.length;n<i;n++)t[n]._walk(e);}))},_children_backwards(e){let t=this.elements.length;for(;t--;)e(this.elements[t]);}}),Mt=le("Object","properties",{$documentation:"An object literal",$propdoc:{properties:"[AST_ObjectProperty*] array of properties"},_walk:function(e){return e._visit(this,(function(){for(var t=this.properties,n=0,i=t.length;n<i;n++)t[n]._walk(e);}))},_children_backwards(e){let t=this.properties.length;for(;t--;)e(this.properties[t]);}}),Rt=le("ObjectProperty","key value",{$documentation:"Base class for literal object properties",$propdoc:{key:"[string|AST_Node] property name. For ObjectKeyVal this is a string. For getters, setters and computed property this is an AST_Node.",value:"[AST_Node] property value.  For getters and setters this is an AST_Accessor."},_walk:function(e){return e._visit(this,(function(){this.key instanceof pe&&this.key._walk(e),this.value._walk(e);}))},_children_backwards(e){e(this.value),this.key instanceof pe&&e(this.key);}}),wt=le("ObjectKeyVal","quote",{$documentation:"A key: value object property",$propdoc:{quote:"[string] the original quote character"},computed_key(){return this.key instanceof pe}},Rt),xt=le("ObjectSetter","quote static",{$propdoc:{quote:"[string|undefined] the original quote character, if any",static:"[boolean] whether this is a static setter (classes only)"},$documentation:"An object setter property",computed_key(){return !(this.key instanceof qt)}},Rt),Nt=le("ObjectGetter","quote static",{$propdoc:{quote:"[string|undefined] the original quote character, if any",static:"[boolean] whether this is a static getter (classes only)"},$documentation:"An object getter property",computed_key(){return !(this.key instanceof qt)}},Rt),kt=le("ConciseMethod","quote static is_generator async",{$propdoc:{quote:"[string|undefined] the original quote character, if any",static:"[boolean] is this method static (classes only)",is_generator:"[boolean] is this a generator method",async:"[boolean] is this method async"},$documentation:"An ES6 concise method inside an object or class",computed_key(){return !(this.key instanceof qt)}},Rt),It=le("Class","name extends properties",{$propdoc:{name:"[AST_SymbolClass|AST_SymbolDefClass?] optional class name.",extends:"[AST_Node]? optional parent class",properties:"[AST_ObjectProperty*] array of properties"},$documentation:"An ES6 class",_walk:function(e){return e._visit(this,(function(){this.name&&this.name._walk(e),this.extends&&this.extends._walk(e),this.properties.forEach(t=>t._walk(e));}))},_children_backwards(e){let t=this.properties.length;for(;t--;)e(this.properties[t]);this.extends&&e(this.extends),this.name&&e(this.name);}},xe),Lt=le("ClassProperty","static quote",{$documentation:"A class property",$propdoc:{static:"[boolean] whether this is a static key",quote:"[string] which quote is being used"},_walk:function(e){return e._visit(this,(function(){this.key instanceof pe&&this.key._walk(e),this.value instanceof pe&&this.value._walk(e);}))},_children_backwards(e){this.value instanceof pe&&e(this.value),this.key instanceof pe&&e(this.key);},computed_key(){return !(this.key instanceof $t)}},Rt),Pt=le("DefClass",null,{$documentation:"A class definition"},It),Vt=le("ClassExpression",null,{$documentation:"A class expression."},It),Bt=le("Symbol","scope name thedef",{$propdoc:{name:"[string] name of this symbol",scope:"[AST_Scope/S] the current scope (not necessarily the definition scope)",thedef:"[SymbolDef/S] the definition of this symbol"},$documentation:"Base class for all symbols"}),Kt=le("NewTarget",null,{$documentation:"A reference to new.target"}),Ut=le("SymbolDeclaration","init",{$documentation:"A declaration symbol (symbol in var/const, function name or argument, symbol in catch)"},Bt),Gt=le("SymbolVar",null,{$documentation:"Symbol defining a variable"},Ut),Ht=le("SymbolBlockDeclaration",null,{$documentation:"Base class for block-scoped declaration symbols"},Ut),Xt=le("SymbolConst",null,{$documentation:"A constant declaration"},Ht),zt=le("SymbolLet",null,{$documentation:"A block-scoped `let` declaration"},Ht),Wt=le("SymbolFunarg",null,{$documentation:"Symbol naming a function argument"},Gt),Yt=le("SymbolDefun",null,{$documentation:"Symbol defining a function"},Ut),qt=le("SymbolMethod",null,{$documentation:"Symbol in an object defining a method"},Bt),$t=le("SymbolClassProperty",null,{$documentation:"Symbol for a class property"},Bt),jt=le("SymbolLambda",null,{$documentation:"Symbol naming a function expression"},Ut),Zt=le("SymbolDefClass",null,{$documentation:"Symbol naming a class's name in a class declaration. Lexically scoped to its containing scope, and accessible within the class."},Ht),Jt=le("SymbolClass",null,{$documentation:"Symbol naming a class's name. Lexically scoped to the class."},Ut),Qt=le("SymbolCatch",null,{$documentation:"Symbol naming the exception in catch"},Ht),en=le("SymbolImport",null,{$documentation:"Symbol referring to an imported name"},Ht),tn=le("SymbolImportForeign",null,{$documentation:"A symbol imported from a module, but it is defined in the other module, and its real name is irrelevant for this module's purposes"},Bt),nn=le("Label","references",{$documentation:"Symbol naming a label (declaration)",$propdoc:{references:"[AST_LoopControl*] a list of nodes referring to this label"},initialize:function(){this.references=[],this.thedef=this;}},Bt),rn=le("SymbolRef",null,{$documentation:"Reference to some symbol (not definition/declaration)"},Bt),on=le("SymbolExport",null,{$documentation:"Symbol referring to a name to export"},rn),an=le("SymbolExportForeign",null,{$documentation:"A symbol exported from this module, but it is used in the other module, and its real name is irrelevant for this module's purposes"},Bt),sn=le("LabelRef",null,{$documentation:"Reference to a label symbol"},Bt),un=le("This",null,{$documentation:"The `this` symbol"},Bt),cn=le("Super",null,{$documentation:"The `super` symbol"},un),ln=le("Constant",null,{$documentation:"Base class for all constants",getValue:function(){return this.value}}),fn=le("String","value quote",{$documentation:"A string literal",$propdoc:{value:"[string] the contents of this string",quote:"[string] the original quote character"}},ln),pn=le("Number","value literal",{$documentation:"A number literal",$propdoc:{value:"[number] the numeric value",literal:"[string] numeric value as string (optional)"}},ln),_n=le("BigInt","value",{$documentation:"A big int literal",$propdoc:{value:"[string] big int value"}},ln),dn=le("RegExp","value",{$documentation:"A regexp literal",$propdoc:{value:"[RegExp] the actual regexp"}},ln),mn=le("Atom",null,{$documentation:"Base class for atoms"},ln),hn=le("Null",null,{$documentation:"The `null` atom",value:null},mn),En=le("NaN",null,{$documentation:"The impossible value",value:NaN},mn),gn=le("Undefined",null,{$documentation:"The `undefined` value",value:void 0},mn),Dn=le("Hole",null,{$documentation:"A hole in an array",value:void 0},mn),Sn=le("Infinity",null,{$documentation:"The `Infinity` value",value:1/0},mn),vn=le("Boolean",null,{$documentation:"Base class for booleans"},mn),An=le("False",null,{$documentation:"The `false` atom",value:!1},vn),Tn=le("True",null,{$documentation:"The `true` atom",value:!0},vn);function yn(e,t,n=[e]){const i=n.push.bind(n);for(;n.length;){const e=n.pop(),r=t(e,n);if(r){if(r===Cn)return !0}else e._children_backwards(i);}return !1}function bn(e,t,n){const i=[e],r=i.push.bind(i),o=n?n.slice():[],a=[];let s;const u={parent:(e=0)=>-1===e?s:n&&e>=o.length?(e-=o.length,n[n.length-(e+1)]):o[o.length-(1+e)]};for(;i.length;){for(s=i.pop();a.length&&i.length==a[a.length-1];)o.pop(),a.pop();const e=t(s,u);if(e){if(e===Cn)return !0;continue}const n=i.length;s._children_backwards(r),i.length>n&&(o.push(s),a.push(n-1));}return !1}const Cn=Symbol("abort walk");class On{constructor(e){this.visit=e,this.stack=[],this.directives=Object.create(null);}_visit(e,t){this.push(e);var n=this.visit(e,t?function(){t.call(e);}:a);return !n&&t&&t.call(e),this.pop(),n}parent(e){return this.stack[this.stack.length-2-(e||0)]}push(e){e instanceof Ie?this.directives=Object.create(this.directives):e instanceof me&&!this.directives[e.value]?this.directives[e.value]=e:e instanceof It&&(this.directives=Object.create(this.directives),this.directives["use strict"]||(this.directives["use strict"]=e)),this.stack.push(e);}pop(){var e=this.stack.pop();(e instanceof Ie||e instanceof It)&&(this.directives=Object.getPrototypeOf(this.directives));}self(){return this.stack[this.stack.length-1]}find_parent(e){for(var t=this.stack,n=t.length;--n>=0;){var i=t[n];if(i instanceof e)return i}}has_directive(e){var t=this.directives[e];if(t)return t;var n=this.stack[this.stack.length-1];if(n instanceof xe&&n.body)for(var i=0;i<n.body.length;++i){var r=n.body[i];if(!(r instanceof me))break;if(r.value==e)return r}}loopcontrol_target(e){var t=this.stack;if(e.label)for(var n=t.length;--n>=0;){if((i=t[n])instanceof Te&&i.label.name==e.label.name)return i.body}else for(n=t.length;--n>=0;){var i;if((i=t[n])instanceof ye||e instanceof $e&&i instanceof et)return i}}}class Fn extends On{constructor(e,t){super(),this.before=e,this.after=t;}}const Mn=1,Rn=2,wn=4;var xn=Object.freeze({__proto__:null,AST_Accessor:Le,AST_Array:Ft,AST_Arrow:Ve,AST_Assign:Ct,AST_Atom:mn,AST_Await:Ze,AST_BigInt:_n,AST_Binary:yt,AST_Block:De,AST_BlockStatement:Se,AST_Boolean:vn,AST_Break:$e,AST_Call:mt,AST_Case:it,AST_Catch:ot,AST_Class:It,AST_ClassExpression:Vt,AST_ClassProperty:Lt,AST_ConciseMethod:kt,AST_Conditional:bt,AST_Const:lt,AST_Constant:ln,AST_Continue:je,AST_Debugger:de,AST_Default:nt,AST_DefaultAssign:Ot,AST_DefClass:Pt,AST_Definitions:st,AST_Defun:Be,AST_Destructuring:Ke,AST_Directive:me,AST_Do:Ce,AST_Dot:Dt,AST_DWLoop:be,AST_EmptyStatement:ve,AST_Exit:ze,AST_Expansion:ke,AST_Export:dt,AST_False:An,AST_Finally:at,AST_For:Fe,AST_ForIn:Me,AST_ForOf:Re,AST_Function:Pe,AST_Hole:Dn,AST_If:Qe,AST_Import:_t,AST_Infinity:Sn,AST_IterationStatement:ye,AST_Jump:Xe,AST_Label:nn,AST_LabeledStatement:Te,AST_LabelRef:sn,AST_Lambda:Ie,AST_Let:ct,AST_LoopControl:qe,AST_NameMapping:pt,AST_NaN:En,AST_New:ht,AST_NewTarget:Kt,AST_Node:pe,AST_Null:hn,AST_Number:pn,AST_Object:Mt,AST_ObjectGetter:Nt,AST_ObjectKeyVal:wt,AST_ObjectProperty:Rt,AST_ObjectSetter:xt,AST_PrefixedTemplateString:Ue,AST_PropAccess:gt,AST_RegExp:dn,AST_Return:We,AST_Scope:xe,AST_Sequence:Et,AST_SimpleStatement:he,AST_Statement:_e,AST_StatementWithBody:Ae,AST_String:fn,AST_Sub:St,AST_Super:cn,AST_Switch:et,AST_SwitchBranch:tt,AST_Symbol:Bt,AST_SymbolBlockDeclaration:Ht,AST_SymbolCatch:Qt,AST_SymbolClass:Jt,AST_SymbolClassProperty:$t,AST_SymbolConst:Xt,AST_SymbolDeclaration:Ut,AST_SymbolDefClass:Zt,AST_SymbolDefun:Yt,AST_SymbolExport:on,AST_SymbolExportForeign:an,AST_SymbolFunarg:Wt,AST_SymbolImport:en,AST_SymbolImportForeign:tn,AST_SymbolLambda:jt,AST_SymbolLet:zt,AST_SymbolMethod:qt,AST_SymbolRef:rn,AST_SymbolVar:Gt,AST_TemplateSegment:He,AST_TemplateString:Ge,AST_This:un,AST_Throw:Ye,AST_Token:fe,AST_Toplevel:Ne,AST_True:Tn,AST_Try:rt,AST_Unary:vt,AST_UnaryPostfix:Tt,AST_UnaryPrefix:At,AST_Undefined:gn,AST_Var:ut,AST_VarDef:ft,AST_While:Oe,AST_With:we,AST_Yield:Je,TreeTransformer:Fn,TreeWalker:On,walk:yn,walk_abort:Cn,walk_body:Ee,walk_parent:bn,_INLINE:Rn,_NOINLINE:wn,_PURE:Mn});function Nn(e,t){e.DEFMETHOD("transform",(function(e,n){let i=void 0;if(e.push(this),e.before&&(i=e.before(this,t,n)),void 0===i&&(i=this,t(i,e),e.after)){const t=e.after(i,n);void 0!==t&&(i=t);}return e.pop(),i}));}function kn(e,t){return f(e,(function(e){return e.transform(t,!0)}))}function In(e){let t=e.parent(-1);for(let n,i=0;n=e.parent(i);i++){if(n instanceof _e&&n.body===t)return !0;if(!(n instanceof Et&&n.expressions[0]===t||"Call"===n.TYPE&&n.expression===t||n instanceof Ue&&n.prefix===t||n instanceof Dt&&n.expression===t||n instanceof St&&n.expression===t||n instanceof bt&&n.condition===t||n instanceof yt&&n.left===t||n instanceof Tt&&n.expression===t))return !1;t=n;}}Nn(pe,a),Nn(Te,(function(e,t){e.label=e.label.transform(t),e.body=e.body.transform(t);})),Nn(he,(function(e,t){e.body=e.body.transform(t);})),Nn(De,(function(e,t){e.body=kn(e.body,t);})),Nn(Ce,(function(e,t){e.body=e.body.transform(t),e.condition=e.condition.transform(t);})),Nn(Oe,(function(e,t){e.condition=e.condition.transform(t),e.body=e.body.transform(t);})),Nn(Fe,(function(e,t){e.init&&(e.init=e.init.transform(t)),e.condition&&(e.condition=e.condition.transform(t)),e.step&&(e.step=e.step.transform(t)),e.body=e.body.transform(t);})),Nn(Me,(function(e,t){e.init=e.init.transform(t),e.object=e.object.transform(t),e.body=e.body.transform(t);})),Nn(we,(function(e,t){e.expression=e.expression.transform(t),e.body=e.body.transform(t);})),Nn(ze,(function(e,t){e.value&&(e.value=e.value.transform(t));})),Nn(qe,(function(e,t){e.label&&(e.label=e.label.transform(t));})),Nn(Qe,(function(e,t){e.condition=e.condition.transform(t),e.body=e.body.transform(t),e.alternative&&(e.alternative=e.alternative.transform(t));})),Nn(et,(function(e,t){e.expression=e.expression.transform(t),e.body=kn(e.body,t);})),Nn(it,(function(e,t){e.expression=e.expression.transform(t),e.body=kn(e.body,t);})),Nn(rt,(function(e,t){e.body=kn(e.body,t),e.bcatch&&(e.bcatch=e.bcatch.transform(t)),e.bfinally&&(e.bfinally=e.bfinally.transform(t));})),Nn(ot,(function(e,t){e.argname&&(e.argname=e.argname.transform(t)),e.body=kn(e.body,t);})),Nn(st,(function(e,t){e.definitions=kn(e.definitions,t);})),Nn(ft,(function(e,t){e.name=e.name.transform(t),e.value&&(e.value=e.value.transform(t));})),Nn(Ke,(function(e,t){e.names=kn(e.names,t);})),Nn(Ie,(function(e,t){e.name&&(e.name=e.name.transform(t)),e.argnames=kn(e.argnames,t),e.body instanceof pe?e.body=e.body.transform(t):e.body=kn(e.body,t);})),Nn(mt,(function(e,t){e.expression=e.expression.transform(t),e.args=kn(e.args,t);})),Nn(Et,(function(e,t){const n=kn(e.expressions,t);e.expressions=n.length?n:[new pn({value:0})];})),Nn(Dt,(function(e,t){e.expression=e.expression.transform(t);})),Nn(St,(function(e,t){e.expression=e.expression.transform(t),e.property=e.property.transform(t);})),Nn(Je,(function(e,t){e.expression&&(e.expression=e.expression.transform(t));})),Nn(Ze,(function(e,t){e.expression=e.expression.transform(t);})),Nn(vt,(function(e,t){e.expression=e.expression.transform(t);})),Nn(yt,(function(e,t){e.left=e.left.transform(t),e.right=e.right.transform(t);})),Nn(bt,(function(e,t){e.condition=e.condition.transform(t),e.consequent=e.consequent.transform(t),e.alternative=e.alternative.transform(t);})),Nn(Ft,(function(e,t){e.elements=kn(e.elements,t);})),Nn(Mt,(function(e,t){e.properties=kn(e.properties,t);})),Nn(Rt,(function(e,t){e.key instanceof pe&&(e.key=e.key.transform(t)),e.value&&(e.value=e.value.transform(t));})),Nn(It,(function(e,t){e.name&&(e.name=e.name.transform(t)),e.extends&&(e.extends=e.extends.transform(t)),e.properties=kn(e.properties,t);})),Nn(ke,(function(e,t){e.expression=e.expression.transform(t);})),Nn(pt,(function(e,t){e.foreign_name=e.foreign_name.transform(t),e.name=e.name.transform(t);})),Nn(_t,(function(e,t){e.imported_name&&(e.imported_name=e.imported_name.transform(t)),e.imported_names&&kn(e.imported_names,t),e.module_name=e.module_name.transform(t);})),Nn(dt,(function(e,t){e.exported_definition&&(e.exported_definition=e.exported_definition.transform(t)),e.exported_value&&(e.exported_value=e.exported_value.transform(t)),e.exported_names&&kn(e.exported_names,t),e.module_name&&(e.module_name=e.module_name.transform(t));})),Nn(Ge,(function(e,t){e.segments=kn(e.segments,t);})),Nn(Ue,(function(e,t){e.prefix=e.prefix.transform(t),e.template_string=e.template_string.transform(t);}));const Ln=/^$|[;{][\s\n]*$/,Pn=/[@#]__(PURE|INLINE|NOINLINE)__/g;function Vn(e){return ("comment2"===e.type||"comment1"===e.type)&&/@preserve|@lic|@cc_on|^\**!/i.test(e.value)}function Bn(e){var t=!e;void 0===(e=o(e,{ascii_only:!1,beautify:!1,braces:!1,comments:"some",ecma:5,ie8:!1,indent_level:4,indent_start:0,inline_script:!0,keep_numbers:!1,keep_quoted_props:!1,max_line_len:!1,preamble:null,preserve_annotations:!1,quote_keys:!1,quote_style:0,safari10:!1,semicolons:!0,shebang:!0,shorthand:void 0,source_map:null,webkit:!1,width:80,wrap_iife:!1,wrap_func_args:!0},!0)).shorthand&&(e.shorthand=e.ecma>5);var n=s;if(e.comments){let t=e.comments;if("string"==typeof e.comments&&/^\/.*\/[a-zA-Z]*$/.test(e.comments)){var i=e.comments.lastIndexOf("/");t=new RegExp(e.comments.substr(1,i-1),e.comments.substr(i+1));}n=t instanceof RegExp?function(e){return "comment5"!=e.type&&t.test(e.value)}:"function"==typeof t?function(e){return "comment5"!=e.type&&t(this,e)}:"some"===t?Vn:u;}var r=0,c=0,l=1,f=0,p="";let _=new Set;var d=e.ascii_only?function(t,n){return e.ecma>=2015&&(t=t.replace(/[\ud800-\udbff][\udc00-\udfff]/g,(function(e){return "\\u{"+function(e,t){return z(e.charCodeAt(t))?65536+(e.charCodeAt(t)-55296<<10)+e.charCodeAt(t+1)-56320:e.charCodeAt(t)}(e,0).toString(16)+"}"}))),t.replace(/[\u0000-\u001f\u007f-\uffff]/g,(function(e){var t=e.charCodeAt(0).toString(16);if(t.length<=2&&!n){for(;t.length<2;)t="0"+t;return "\\x"+t}for(;t.length<4;)t="0"+t;return "\\u"+t}))}:function(e){return e.replace(/[\ud800-\udbff][\udc00-\udfff]|([\ud800-\udbff]|[\udc00-\udfff])/g,(function(e,t){return t?"\\u"+t.charCodeAt(0).toString(16):e}))};function m(t,n){var i=function(t,n){var i=0,r=0;function o(){return "'"+t.replace(/\x27/g,"\\'")+"'"}function a(){return '"'+t.replace(/\x22/g,'\\"')+'"'}if(t=t.replace(/[\\\b\f\n\r\v\t\x22\x27\u2028\u2029\0\ufeff]/g,(function(n,o){switch(n){case'"':return ++i,'"';case"'":return ++r,"'";case"\\":return "\\\\";case"\n":return "\\n";case"\r":return "\\r";case"\t":return "\\t";case"\b":return "\\b";case"\f":return "\\f";case"\v":return e.ie8?"\\x0B":"\\v";case"\u2028":return "\\u2028";case"\u2029":return "\\u2029";case"\ufeff":return "\\ufeff";case"\0":return /[0-9]/.test(X(t,o+1))?"\\x00":"\\0"}return n})),t=d(t),"`"===n)return "`"+t.replace(/`/g,"\\`")+"`";switch(e.quote_style){case 1:return o();case 2:return a();case 3:return "'"==n?o():a();default:return i>r?o():a()}}(t,n);return e.inline_script&&(i=(i=(i=i.replace(/<\x2f(script)([>\/\t\n\f\r ])/gi,"<\\/$1$2")).replace(/\x3c!--/g,"\\x3c!--")).replace(/--\x3e/g,"--\\x3e")),i}var h,g,D=!1,S=!1,v=!1,A=0,T=!1,y=!1,b=-1,C="",O=e.source_map&&[],F=O?function(){O.forEach((function(t){try{e.source_map.add(t.token.file,t.line,t.col,t.token.line,t.token.col,t.name||"name"!=t.token.type?t.name:t.token.value);}catch(e){null!=t.token.file&&pe.warn("Couldn't figure out mapping for {file}:{line},{col} → {cline},{ccol} [{name}]",{file:t.token.file,line:t.token.line,col:t.token.col,cline:t.line,ccol:t.col,name:t.name||""});}})),O=[];}:a,M=e.max_line_len?function(){if(c>e.max_line_len){if(A){var t=p.slice(0,A),n=p.slice(A);if(O){var i=n.length-c;O.forEach((function(e){e.line++,e.col+=i;}));}p=t+"\n"+n,l++,f++,c=n.length;}c>e.max_line_len&&pe.warn("Output exceeds {max_line_len} characters",e);}A&&(A=0,F());}:a,R=E("( [ + * / - , . `");function w(t){var n=X(t=String(t),0);T&&n&&(T=!1,"\n"!==n&&(w("\n"),N())),y&&n&&(y=!1,/[\s;})]/.test(n)||x()),b=-1;var i=C.charAt(C.length-1);v&&(v=!1,(":"!==i||"}"!==n)&&(n&&";}".includes(n)||";"===i)||(e.semicolons||R.has(n)?(p+=";",c++,f++):(M(),c>0&&(p+="\n",f++,l++,c=0),/^\s+$/.test(t)&&(v=!0)),e.beautify||(S=!1))),S&&(($(i)&&($(n)||"\\"==n)||"/"==n&&n==i||("+"==n||"-"==n)&&n==C)&&(p+=" ",c++,f++),S=!1),h&&(O.push({token:h,name:g,line:l,col:c}),h=!1,A||F()),p+=t,D="("==t[t.length-1],f+=t.length;var r=t.split(/\r?\n/),o=r.length-1;l+=o,c+=r[0].length,o>0&&(M(),c=r[o].length),C=t;}var x=e.beautify?function(){w(" ");}:function(){S=!0;},N=e.beautify?function(t){var n;e.beautify&&w((n=t?.5:0," ".repeat(e.indent_start+r-n*e.indent_level)));}:a,k=e.beautify?function(e,t){!0===e&&(e=V());var n=r;r=e;var i=t();return r=n,i}:function(e,t){return t()},I=e.beautify?function(){if(b<0)return w("\n");"\n"!=p[b]&&(p=p.slice(0,b)+"\n"+p.slice(b),f++,l++),b++;}:e.max_line_len?function(){M(),A=p.length;}:a,L=e.beautify?function(){w(";");}:function(){v=!0;};function P(){v=!1,w(";");}function V(){return r+e.indent_level}function B(){return A&&M(),p}function K(){let e=p.length-1;for(;e>=0;){const t=p.charCodeAt(e);if(10===t)return !0;if(32!==t)return !1;e--;}return !0}function U(t){return e.preserve_annotations||(t=t.replace(Pn," ")),/^\s*$/.test(t)?"":t.replace(/(<\s*\/\s*)(script)/i,"<\\/$2")}var G=[];return {get:B,toString:B,indent:N,in_directive:!1,use_asm:null,active_scope:null,indentation:function(){return r},current_width:function(){return c-r},should_break:function(){return e.width&&this.current_width()>=e.width},has_parens:function(){return D},newline:I,print:w,star:function(){w("*");},space:x,comma:function(){w(","),x();},colon:function(){w(":"),x();},last:function(){return C},semicolon:L,force_semicolon:P,to_utf8:d,print_name:function(e){w(function(e){return e=e.toString(),e=d(e,!0)}(e));},print_string:function(e,t,n){var i=m(e,t);!0!==n||i.includes("\\")||(Ln.test(p)||P(),P()),w(i);},print_template_string_chars:function(e){var t=m(e,"`").replace(/\${/g,"\\${");return w(t.substr(1,t.length-2))},encode_string:m,next_indent:V,with_indent:k,with_block:function(e){var t;return w("{"),I(),k(V(),(function(){t=e();})),N(),w("}"),t},with_parens:function(e){w("(");var t=e();return w(")"),t},with_square:function(e){w("[");var t=e();return w("]"),t},add_mapping:O?function(e,t){h=e,g=t;}:a,option:function(t){return e[t]},printed_comments:_,prepend_comments:t?a:function(t){var i=t.start;if(!i)return;var r=this.printed_comments;const o=t instanceof ze&&t.value;if(i.comments_before&&r.has(i.comments_before)){if(!o)return;i.comments_before=[];}var a=i.comments_before;if(a||(a=i.comments_before=[]),r.add(a),o){var s=new On((function(e){var t=s.parent();if(!(t instanceof ze||t instanceof yt&&t.left===e||"Call"==t.TYPE&&t.expression===e||t instanceof bt&&t.condition===e||t instanceof Dt&&t.expression===e||t instanceof Et&&t.expressions[0]===e||t instanceof St&&t.expression===e||t instanceof Tt))return !0;if(e.start){var n=e.start.comments_before;n&&!r.has(n)&&(r.add(n),a=a.concat(n));}}));s.push(t),t.value.walk(s);}if(0==f){a.length>0&&e.shebang&&"comment5"===a[0].type&&!r.has(a[0])&&(w("#!"+a.shift().value+"\n"),N());var u=e.preamble;u&&w(u.replace(/\r\n?|[\n\u2028\u2029]|\s*$/g,"\n"));}if(0!=(a=a.filter(n,t).filter(e=>!r.has(e))).length){var c=K();a.forEach((function(e,t){if(r.add(e),c||(e.nlb?(w("\n"),N(),c=!0):t>0&&x()),/comment[134]/.test(e.type))(n=U(e.value))&&(w("//"+n+"\n"),N()),c=!0;else if("comment2"==e.type){var n;(n=U(e.value))&&w("/*"+n+"*/"),c=!1;}})),c||(i.nlb?(w("\n"),N()):x());}},append_comments:t||n===s?a:function(e,t){var i=e.end;if(i){var r=this.printed_comments,o=i[t?"comments_before":"comments_after"];if(o&&!r.has(o)&&(e instanceof _e||o.every(e=>!/comment[134]/.test(e.type)))){r.add(o);var a=p.length;o.filter(n,e).forEach((function(e,n){if(!r.has(e))if(r.add(e),y=!1,T?(w("\n"),N(),T=!1):e.nlb&&(n>0||!K())?(w("\n"),N()):(n>0||!t)&&x(),/comment[134]/.test(e.type)){const t=U(e.value);t&&w("//"+t),T=!0;}else if("comment2"==e.type){const t=U(e.value);t&&w("/*"+t+"*/"),y=!0;}})),p.length>a&&(b=a);}}},line:function(){return l},col:function(){return c},pos:function(){return f},push_node:function(e){G.push(e);},pop_node:function(){return G.pop()},parent:function(e){return G[G.length-2-(e||0)]}}}!function(){function e(e,t){e.DEFMETHOD("_codegen",t);}function t(e,n){Array.isArray(e)?e.forEach((function(e){t(e,n);})):e.DEFMETHOD("needs_parens",n);}function n(e,t,n,i){var r=e.length-1;n.in_directive=i,e.forEach((function(e,i){!0!==n.in_directive||e instanceof me||e instanceof ve||e instanceof he&&e.body instanceof fn||(n.in_directive=!1),e instanceof ve||(n.indent(),e.print(n),i==r&&t||(n.newline(),t&&n.newline())),!0===n.in_directive&&e instanceof he&&e.body instanceof fn&&(n.in_directive=!1);})),n.in_directive=!1;}function i(e,t){t.print("{"),t.with_indent(t.next_indent(),(function(){t.append_comments(e,!0);})),t.print("}");}function r(e,t,r){e.body.length>0?t.with_block((function(){n(e.body,!1,t,r);})):i(e,t);}function o(e,t,n){var i=!1;n&&(i=yn(e,e=>e instanceof xe||(e instanceof yt&&"in"==e.operator?Cn:void 0))),e.print(t,i);}function u(e,t,n){return n.option("quote_keys")?n.print_string(e):""+ +e==e&&e>=0?n.option("keep_numbers")?n.print(e):n.print(p(e)):(O.has(e)?n.option("ie8"):n.option("ecma")<2015?!j(e):!Z(e,!0))||t&&n.option("keep_quoted_props")?n.print_string(e,t):n.print_name(e)}pe.DEFMETHOD("print",(function(e,t){var n=this,i=n._codegen;function r(){e.prepend_comments(n),n.add_source_map(e),i(n,e),e.append_comments(n);}n instanceof xe?e.active_scope=n:!e.use_asm&&n instanceof me&&"use asm"==n.value&&(e.use_asm=e.active_scope),e.push_node(n),t||n.needs_parens(e)?e.with_parens(r):r(),e.pop_node(),n===e.use_asm&&(e.use_asm=null);})),pe.DEFMETHOD("_print",pe.prototype.print),pe.DEFMETHOD("print_to_string",(function(e){var t=Bn(e);return this.print(t),t.get()})),t(pe,s),t(Pe,(function(e){if(!e.has_parens()&&In(e))return !0;var t;if(e.option("webkit")&&((t=e.parent())instanceof gt&&t.expression===this))return !0;if(e.option("wrap_iife")&&((t=e.parent())instanceof mt&&t.expression===this))return !0;if(e.option("wrap_func_args")&&((t=e.parent())instanceof mt&&t.args.includes(this)))return !0;return !1})),t(Ve,(function(e){var t=e.parent();return t instanceof gt&&t.expression===this})),t(Mt,(function(e){return !e.has_parens()&&In(e)})),t(Vt,In),t(vt,(function(e){var t=e.parent();return t instanceof gt&&t.expression===this||t instanceof mt&&t.expression===this||t instanceof yt&&"**"===t.operator&&this instanceof At&&t.left===this&&"++"!==this.operator&&"--"!==this.operator})),t(Ze,(function(e){var t=e.parent();return t instanceof gt&&t.expression===this||t instanceof mt&&t.expression===this||e.option("safari10")&&t instanceof At})),t(Et,(function(e){var t=e.parent();return t instanceof mt||t instanceof vt||t instanceof yt||t instanceof ft||t instanceof gt||t instanceof Ft||t instanceof Rt||t instanceof bt||t instanceof Ve||t instanceof Ot||t instanceof ke||t instanceof Re&&this===t.object||t instanceof Je||t instanceof dt})),t(yt,(function(e){var t=e.parent();if(t instanceof mt&&t.expression===this)return !0;if(t instanceof vt)return !0;if(t instanceof gt&&t.expression===this)return !0;if(t instanceof yt){const e=t.operator,n=this.operator;if("??"===n&&("||"===e||"&&"===e))return !0;const i=se[e],r=se[n];if(i>r||i==r&&(this===t.right||"**"==e))return !0}})),t(Je,(function(e){var t=e.parent();return t instanceof yt&&"="!==t.operator||(t instanceof mt&&t.expression===this||(t instanceof bt&&t.condition===this||(t instanceof vt||(t instanceof gt&&t.expression===this||void 0))))})),t(gt,(function(e){var t=e.parent();if(t instanceof ht&&t.expression===this)return yn(this,e=>e instanceof xe||(e instanceof mt?Cn:void 0))})),t(mt,(function(e){var t,n=e.parent();return !!(n instanceof ht&&n.expression===this||n instanceof dt&&n.is_default&&this.expression instanceof Pe)||this.expression instanceof Pe&&n instanceof gt&&n.expression===this&&(t=e.parent(1))instanceof Ct&&t.left===n})),t(ht,(function(e){var t=e.parent();if(0===this.args.length&&(t instanceof gt||t instanceof mt&&t.expression===this))return !0})),t(pn,(function(e){var t=e.parent();if(t instanceof gt&&t.expression===this){var n=this.getValue();if(n<0||/^0/.test(p(n)))return !0}})),t(_n,(function(e){var t=e.parent();if(t instanceof gt&&t.expression===this&&this.getValue().startsWith("-"))return !0})),t([Ct,bt],(function(e){var t=e.parent();return t instanceof vt||(t instanceof yt&&!(t instanceof Ct)||(t instanceof mt&&t.expression===this||(t instanceof bt&&t.condition===this||(t instanceof gt&&t.expression===this||(this instanceof Ct&&this.left instanceof Ke&&!1===this.left.is_array||void 0)))))})),e(me,(function(e,t){t.print_string(e.value,e.quote),t.semicolon();})),e(ke,(function(e,t){t.print("..."),e.expression.print(t);})),e(Ke,(function(e,t){t.print(e.is_array?"[":"{");var n=e.names.length;e.names.forEach((function(e,i){i>0&&t.comma(),e.print(t),i==n-1&&e instanceof Dn&&t.comma();})),t.print(e.is_array?"]":"}");})),e(de,(function(e,t){t.print("debugger"),t.semicolon();})),Ae.DEFMETHOD("_do_print_body",(function(e){f(this.body,e);})),e(_e,(function(e,t){e.body.print(t),t.semicolon();})),e(Ne,(function(e,t){n(e.body,!0,t,!0),t.print("");})),e(Te,(function(e,t){e.label.print(t),t.colon(),e.body.print(t);})),e(he,(function(e,t){e.body.print(t),t.semicolon();})),e(Se,(function(e,t){r(e,t);})),e(ve,(function(e,t){t.semicolon();})),e(Ce,(function(e,t){t.print("do"),t.space(),_(e.body,t),t.space(),t.print("while"),t.space(),t.with_parens((function(){e.condition.print(t);})),t.semicolon();})),e(Oe,(function(e,t){t.print("while"),t.space(),t.with_parens((function(){e.condition.print(t);})),t.space(),e._do_print_body(t);})),e(Fe,(function(e,t){t.print("for"),t.space(),t.with_parens((function(){e.init?(e.init instanceof st?e.init.print(t):o(e.init,t,!0),t.print(";"),t.space()):t.print(";"),e.condition?(e.condition.print(t),t.print(";"),t.space()):t.print(";"),e.step&&e.step.print(t);})),t.space(),e._do_print_body(t);})),e(Me,(function(e,t){t.print("for"),e.await&&(t.space(),t.print("await")),t.space(),t.with_parens((function(){e.init.print(t),t.space(),t.print(e instanceof Re?"of":"in"),t.space(),e.object.print(t);})),t.space(),e._do_print_body(t);})),e(we,(function(e,t){t.print("with"),t.space(),t.with_parens((function(){e.expression.print(t);})),t.space(),e._do_print_body(t);})),Ie.DEFMETHOD("_do_print",(function(e,t){var n=this;t||(n.async&&(e.print("async"),e.space()),e.print("function"),n.is_generator&&e.star(),n.name&&e.space()),n.name instanceof Bt?n.name.print(e):t&&n.name instanceof pe&&e.with_square((function(){n.name.print(e);})),e.with_parens((function(){n.argnames.forEach((function(t,n){n&&e.comma(),t.print(e);}));})),e.space(),r(n,e,!0);})),e(Ie,(function(e,t){e._do_print(t);})),e(Ue,(function(e,t){var n=e.prefix,i=n instanceof Ie||n instanceof yt||n instanceof bt||n instanceof Et||n instanceof vt||n instanceof Dt&&n.expression instanceof Mt;i&&t.print("("),e.prefix.print(t),i&&t.print(")"),e.template_string.print(t);})),e(Ge,(function(e,t){var n=t.parent()instanceof Ue;t.print("`");for(var i=0;i<e.segments.length;i++)e.segments[i]instanceof He?n?t.print(e.segments[i].raw):t.print_template_string_chars(e.segments[i].value):(t.print("${"),e.segments[i].print(t),t.print("}"));t.print("`");})),Ve.DEFMETHOD("_do_print",(function(e){var t=this,n=e.parent(),i=n instanceof yt&&!(n instanceof Ct)||n instanceof vt||n instanceof mt&&t===n.expression;i&&e.print("("),t.async&&(e.print("async"),e.space()),1===t.argnames.length&&t.argnames[0]instanceof Bt?t.argnames[0].print(e):e.with_parens((function(){t.argnames.forEach((function(t,n){n&&e.comma(),t.print(e);}));})),e.space(),e.print("=>"),e.space();const o=t.body[0];if(1===t.body.length&&o instanceof We){const t=o.value;t?!function e(t){return t instanceof Mt||(t instanceof Et?e(t.expressions[0]):"Call"===t.TYPE?e(t.expression):t instanceof Ue?e(t.prefix):t instanceof Dt||t instanceof St?e(t.expression):t instanceof bt?e(t.condition):t instanceof yt?e(t.left):t instanceof Tt&&e(t.expression))}(t)?t.print(e):(e.print("("),t.print(e),e.print(")")):e.print("{}");}else r(t,e);i&&e.print(")");})),ze.DEFMETHOD("_do_print",(function(e,t){if(e.print(t),this.value){e.space();const t=this.value.start.comments_before;t&&t.length&&!e.printed_comments.has(t)?(e.print("("),this.value.print(e),e.print(")")):this.value.print(e);}e.semicolon();})),e(We,(function(e,t){e._do_print(t,"return");})),e(Ye,(function(e,t){e._do_print(t,"throw");})),e(Je,(function(e,t){var n=e.is_star?"*":"";t.print("yield"+n),e.expression&&(t.space(),e.expression.print(t));})),e(Ze,(function(e,t){t.print("await"),t.space();var n=e.expression,i=!(n instanceof mt||n instanceof rn||n instanceof gt||n instanceof vt||n instanceof ln);i&&t.print("("),e.expression.print(t),i&&t.print(")");})),qe.DEFMETHOD("_do_print",(function(e,t){e.print(t),this.label&&(e.space(),this.label.print(e)),e.semicolon();})),e($e,(function(e,t){e._do_print(t,"break");})),e(je,(function(e,t){e._do_print(t,"continue");})),e(Qe,(function(e,t){t.print("if"),t.space(),t.with_parens((function(){e.condition.print(t);})),t.space(),e.alternative?(!function(e,t){var n=e.body;if(t.option("braces")||t.option("ie8")&&n instanceof Ce)return _(n,t);if(!n)return t.force_semicolon();for(;;)if(n instanceof Qe){if(!n.alternative)return void _(e.body,t);n=n.alternative;}else {if(!(n instanceof Ae))break;n=n.body;}f(e.body,t);}(e,t),t.space(),t.print("else"),t.space(),e.alternative instanceof Qe?e.alternative.print(t):f(e.alternative,t)):e._do_print_body(t);})),e(et,(function(e,t){t.print("switch"),t.space(),t.with_parens((function(){e.expression.print(t);})),t.space();var n=e.body.length-1;n<0?i(e,t):t.with_block((function(){e.body.forEach((function(e,i){t.indent(!0),e.print(t),i<n&&e.body.length>0&&t.newline();}));}));})),tt.DEFMETHOD("_do_print_body",(function(e){e.newline(),this.body.forEach((function(t){e.indent(),t.print(e),e.newline();}));})),e(nt,(function(e,t){t.print("default:"),e._do_print_body(t);})),e(it,(function(e,t){t.print("case"),t.space(),e.expression.print(t),t.print(":"),e._do_print_body(t);})),e(rt,(function(e,t){t.print("try"),t.space(),r(e,t),e.bcatch&&(t.space(),e.bcatch.print(t)),e.bfinally&&(t.space(),e.bfinally.print(t));})),e(ot,(function(e,t){t.print("catch"),e.argname&&(t.space(),t.with_parens((function(){e.argname.print(t);}))),t.space(),r(e,t);})),e(at,(function(e,t){t.print("finally"),t.space(),r(e,t);})),st.DEFMETHOD("_do_print",(function(e,t){e.print(t),e.space(),this.definitions.forEach((function(t,n){n&&e.comma(),t.print(e);}));var n=e.parent();(!(n instanceof Fe||n instanceof Me)||n&&n.init!==this)&&e.semicolon();})),e(ct,(function(e,t){e._do_print(t,"let");})),e(ut,(function(e,t){e._do_print(t,"var");})),e(lt,(function(e,t){e._do_print(t,"const");})),e(_t,(function(e,t){t.print("import"),t.space(),e.imported_name&&e.imported_name.print(t),e.imported_name&&e.imported_names&&(t.print(","),t.space()),e.imported_names&&(1===e.imported_names.length&&"*"===e.imported_names[0].foreign_name.name?e.imported_names[0].print(t):(t.print("{"),e.imported_names.forEach((function(n,i){t.space(),n.print(t),i<e.imported_names.length-1&&t.print(",");})),t.space(),t.print("}"))),(e.imported_name||e.imported_names)&&(t.space(),t.print("from"),t.space()),e.module_name.print(t),t.semicolon();})),e(pt,(function(e,t){var n=t.parent()instanceof _t,i=e.name.definition();(i&&i.mangled_name||e.name.name)!==e.foreign_name.name?(n?t.print(e.foreign_name.name):e.name.print(t),t.space(),t.print("as"),t.space(),n?e.name.print(t):t.print(e.foreign_name.name)):e.name.print(t);})),e(dt,(function(e,t){if(t.print("export"),t.space(),e.is_default&&(t.print("default"),t.space()),e.exported_names)1===e.exported_names.length&&"*"===e.exported_names[0].name.name?e.exported_names[0].print(t):(t.print("{"),e.exported_names.forEach((function(n,i){t.space(),n.print(t),i<e.exported_names.length-1&&t.print(",");})),t.space(),t.print("}"));else if(e.exported_value)e.exported_value.print(t);else if(e.exported_definition&&(e.exported_definition.print(t),e.exported_definition instanceof st))return;e.module_name&&(t.space(),t.print("from"),t.space(),e.module_name.print(t)),(e.exported_value&&!(e.exported_value instanceof Be||e.exported_value instanceof Pe||e.exported_value instanceof It)||e.module_name||e.exported_names)&&t.semicolon();})),e(ft,(function(e,t){if(e.name.print(t),e.value){t.space(),t.print("="),t.space();var n=t.parent(1),i=n instanceof Fe||n instanceof Me;o(e.value,t,i);}})),e(mt,(function(e,t){e.expression.print(t),e instanceof ht&&0===e.args.length||((e.expression instanceof mt||e.expression instanceof Ie)&&t.add_mapping(e.start),t.with_parens((function(){e.args.forEach((function(e,n){n&&t.comma(),e.print(t);}));})));})),e(ht,(function(e,t){t.print("new"),t.space(),mt.prototype._codegen(e,t);})),Et.DEFMETHOD("_do_print",(function(e){this.expressions.forEach((function(t,n){n>0&&(e.comma(),e.should_break()&&(e.newline(),e.indent())),t.print(e);}));})),e(Et,(function(e,t){e._do_print(t);})),e(Dt,(function(e,t){var n=e.expression;n.print(t);var i=e.property;(O.has(i)?t.option("ie8"):!Z(i,t.option("ecma")>=2015))?(t.print("["),t.add_mapping(e.end),t.print_string(i),t.print("]")):(n instanceof pn&&n.getValue()>=0&&(/[xa-f.)]/i.test(t.last())||t.print(".")),t.print("."),t.add_mapping(e.end),t.print_name(i));})),e(St,(function(e,t){e.expression.print(t),t.print("["),e.property.print(t),t.print("]");})),e(At,(function(e,t){var n=e.operator;t.print(n),(/^[a-z]/i.test(n)||/[+-]$/.test(n)&&e.expression instanceof At&&/^[+-]/.test(e.expression.operator))&&t.space(),e.expression.print(t);})),e(Tt,(function(e,t){e.expression.print(t),t.print(e.operator);})),e(yt,(function(e,t){var n=e.operator;e.left.print(t),">"==n[0]&&e.left instanceof Tt&&"--"==e.left.operator?t.print(" "):t.space(),t.print(n),("<"==n||"<<"==n)&&e.right instanceof At&&"!"==e.right.operator&&e.right.expression instanceof At&&"--"==e.right.expression.operator?t.print(" "):t.space(),e.right.print(t);})),e(bt,(function(e,t){e.condition.print(t),t.space(),t.print("?"),t.space(),e.consequent.print(t),t.space(),t.colon(),e.alternative.print(t);})),e(Ft,(function(e,t){t.with_square((function(){var n=e.elements,i=n.length;i>0&&t.space(),n.forEach((function(e,n){n&&t.comma(),e.print(t),n===i-1&&e instanceof Dn&&t.comma();})),i>0&&t.space();}));})),e(Mt,(function(e,t){e.properties.length>0?t.with_block((function(){e.properties.forEach((function(e,n){n&&(t.print(","),t.newline()),t.indent(),e.print(t);})),t.newline();})):i(e,t);})),e(It,(function(e,t){if(t.print("class"),t.space(),e.name&&(e.name.print(t),t.space()),e.extends){var n=!(e.extends instanceof rn||e.extends instanceof gt||e.extends instanceof Vt||e.extends instanceof Pe);t.print("extends"),n?t.print("("):t.space(),e.extends.print(t),n?t.print(")"):t.space();}e.properties.length>0?t.with_block((function(){e.properties.forEach((function(e,n){n&&t.newline(),t.indent(),e.print(t);})),t.newline();})):t.print("{}");})),e(Kt,(function(e,t){t.print("new.target");})),e(wt,(function(e,t){function n(e){var t=e.definition();return t?t.mangled_name||t.name:e.name}var i=t.option("shorthand");i&&e.value instanceof Bt&&Z(e.key,t.option("ecma")>=2015)&&n(e.value)===e.key&&!O.has(e.key)?u(e.key,e.quote,t):i&&e.value instanceof Ot&&e.value.left instanceof Bt&&Z(e.key,t.option("ecma")>=2015)&&n(e.value.left)===e.key?(u(e.key,e.quote,t),t.space(),t.print("="),t.space(),e.value.right.print(t)):(e.key instanceof pe?t.with_square((function(){e.key.print(t);})):u(e.key,e.quote,t),t.colon(),e.value.print(t));})),e(Lt,(e,t)=>{e.static&&(t.print("static"),t.space()),e.key instanceof $t?u(e.key.name,e.quote,t):(t.print("["),e.key.print(t),t.print("]")),e.value&&(t.print("="),e.value.print(t)),t.semicolon();}),Rt.DEFMETHOD("_print_getter_setter",(function(e,t){var n=this;n.static&&(t.print("static"),t.space()),e&&(t.print(e),t.space()),n.key instanceof qt?u(n.key.name,n.quote,t):t.with_square((function(){n.key.print(t);})),n.value._do_print(t,!0);})),e(xt,(function(e,t){e._print_getter_setter("set",t);})),e(Nt,(function(e,t){e._print_getter_setter("get",t);})),e(kt,(function(e,t){var n;e.is_generator&&e.async?n="async*":e.is_generator?n="*":e.async&&(n="async"),e._print_getter_setter(n,t);})),Bt.DEFMETHOD("_do_print",(function(e){var t=this.definition();e.print_name(t?t.mangled_name||t.name:this.name);})),e(Bt,(function(e,t){e._do_print(t);})),e(Dn,a),e(un,(function(e,t){t.print("this");})),e(cn,(function(e,t){t.print("super");})),e(ln,(function(e,t){t.print(e.getValue());})),e(fn,(function(e,t){t.print_string(e.getValue(),e.quote,t.in_directive);})),e(pn,(function(e,t){(t.option("keep_numbers")||t.use_asm)&&e.start&&null!=e.start.raw?t.print(e.start.raw):t.print(p(e.getValue()));})),e(_n,(function(e,t){t.print(e.getValue()+"n");}));const c=/(<\s*\/\s*script)/i,l=(e,t)=>t.replace("/","\\/");function f(e,t){t.option("braces")?_(e,t):!e||e instanceof ve?t.force_semicolon():e.print(t);}function p(e){var t,n,i,r=e.toString(10).replace(/^0\./,".").replace("e+","e"),o=[r];return Math.floor(e)===e&&(e<0?o.push("-0x"+(-e).toString(16).toLowerCase()):o.push("0x"+e.toString(16).toLowerCase())),(t=/^\.0+/.exec(r))?(n=t[0].length,i=r.slice(n),o.push(i+"e-"+(i.length+n-1))):(t=/0+$/.exec(r))?(n=t[0].length,o.push(r.slice(0,-n)+"e"+n)):(t=/^(\d)\.(\d+)e(-?\d+)$/.exec(r))&&o.push(t[1]+t[2]+"e"+(t[3]-t[2].length)),function(e){for(var t=e[0],n=t.length,i=1;i<e.length;++i)e[i].length<n&&(n=(t=e[i]).length);return t}(o)}function _(e,t){!e||e instanceof ve?t.print("{}"):e instanceof Se?e.print(t):t.with_block((function(){t.indent(),e.print(t),t.newline();}));}function d(e,t){e.forEach((function(e){e.DEFMETHOD("add_source_map",t);}));}e(dn,(function(e,t){let{source:n,flags:i}=e.getValue();n=A(n),i=i?function(e){const t=new Set(e.split(""));let n="";for(const e of "gimuy")t.has(e)&&(n+=e,t.delete(e));return t.size&&t.forEach(e=>{n+=e;}),n}(i):"",n=n.replace(c,l),t.print(t.to_utf8(`/${n}/${i}`));const r=t.parent();r instanceof yt&&/^\w/.test(r.operator)&&r.left===e&&t.print(" ");})),d([pe,Te,Ne],a),d([Ft,Se,ot,It,ln,de,st,me,at,Xe,Ie,ht,Mt,Ae,Bt,et,tt,Ge,He,rt],(function(e){e.add_mapping(this.start);})),d([Nt,xt],(function(e){e.add_mapping(this.start,this.key.name);})),d([Rt],(function(e){e.add_mapping(this.start,this.key);}));}();const Kn=(e,t)=>null===e&&null===t||e.TYPE===t.TYPE&&e.shallow_cmp(t),Un=e=>{const t=Object.keys(e).map(t=>{if("eq"===e[t])return `this.${t} === other.${t}`;if("exist"===e[t])return `(this.${t} == null ? other.${t} == null : this.${t} === other.${t})`;throw new Error(`mkshallow: Unexpected instruction: ${e[t]}`)}).join(" && ");return new Function("other","return "+t)},Gn=()=>!0;pe.prototype.shallow_cmp=function(){throw new Error("did not find a shallow_cmp function for "+this.constructor.name)},de.prototype.shallow_cmp=Gn,me.prototype.shallow_cmp=Un({value:"eq"}),he.prototype.shallow_cmp=Gn,De.prototype.shallow_cmp=Gn,ve.prototype.shallow_cmp=Gn,Te.prototype.shallow_cmp=Un({"label.name":"eq"}),Ce.prototype.shallow_cmp=Gn,Oe.prototype.shallow_cmp=Gn,Fe.prototype.shallow_cmp=Un({init:"exist",condition:"exist",step:"exist"}),Me.prototype.shallow_cmp=Gn,Re.prototype.shallow_cmp=Gn,we.prototype.shallow_cmp=Gn,Ne.prototype.shallow_cmp=Gn,ke.prototype.shallow_cmp=Gn,Ie.prototype.shallow_cmp=Un({is_generator:"eq",async:"eq"}),Ke.prototype.shallow_cmp=Un({is_array:"eq"}),Ue.prototype.shallow_cmp=Gn,Ge.prototype.shallow_cmp=Gn,He.prototype.shallow_cmp=Un({value:"eq"}),Xe.prototype.shallow_cmp=Gn,qe.prototype.shallow_cmp=Gn,Ze.prototype.shallow_cmp=Gn,Je.prototype.shallow_cmp=Un({is_star:"eq"}),Qe.prototype.shallow_cmp=Un({alternative:"exist"}),et.prototype.shallow_cmp=Gn,tt.prototype.shallow_cmp=Gn,rt.prototype.shallow_cmp=Un({bcatch:"exist",bfinally:"exist"}),ot.prototype.shallow_cmp=Un({argname:"exist"}),at.prototype.shallow_cmp=Gn,st.prototype.shallow_cmp=Gn,ft.prototype.shallow_cmp=Un({value:"exist"}),pt.prototype.shallow_cmp=Gn,_t.prototype.shallow_cmp=Un({imported_name:"exist",imported_names:"exist"}),dt.prototype.shallow_cmp=Un({exported_definition:"exist",exported_value:"exist",exported_names:"exist",module_name:"eq",is_default:"eq"}),mt.prototype.shallow_cmp=Gn,Et.prototype.shallow_cmp=Gn,gt.prototype.shallow_cmp=Gn,Dt.prototype.shallow_cmp=Un({property:"eq"}),vt.prototype.shallow_cmp=Un({operator:"eq"}),yt.prototype.shallow_cmp=Un({operator:"eq"}),bt.prototype.shallow_cmp=Gn,Ft.prototype.shallow_cmp=Gn,Mt.prototype.shallow_cmp=Gn,Rt.prototype.shallow_cmp=Gn,wt.prototype.shallow_cmp=Un({key:"eq"}),xt.prototype.shallow_cmp=Un({static:"eq"}),Nt.prototype.shallow_cmp=Un({static:"eq"}),kt.prototype.shallow_cmp=Un({static:"eq",is_generator:"eq",async:"eq"}),It.prototype.shallow_cmp=Un({name:"exist",extends:"exist"}),Lt.prototype.shallow_cmp=Un({static:"eq"}),Bt.prototype.shallow_cmp=Un({name:"eq"}),Kt.prototype.shallow_cmp=Gn,un.prototype.shallow_cmp=Gn,cn.prototype.shallow_cmp=Gn,fn.prototype.shallow_cmp=Un({value:"eq"}),pn.prototype.shallow_cmp=Un({value:"eq"}),_n.prototype.shallow_cmp=Un({value:"eq"}),dn.prototype.shallow_cmp=function(e){return this.value.flags===e.value.flags&&this.value.source===e.value.source},mn.prototype.shallow_cmp=Gn;let Hn=null,Xn=null;class zn{constructor(e,t,n){this.name=t.name,this.orig=[t],this.init=n,this.eliminated=0,this.assignments=0,this.scope=e,this.replaced=0,this.global=!1,this.export=0,this.mangled_name=null,this.undeclared=!1,this.id=zn.next_id++,this.chained=!1,this.direct_access=!1,this.escaped=0,this.recursive_refs=0,this.references=[],this.should_replace=void 0,this.single_use=!1,this.fixed=!1,Object.seal(this);}fixed_value(){return !this.fixed||this.fixed instanceof pe?this.fixed:this.fixed()}unmangleable(e){return e||(e={}),!!(Hn&&Hn.has(this.id)&&S(e.keep_fnames,this.orig[0].name))||(this.global&&!e.toplevel||1&this.export||this.undeclared||!e.eval&&this.scope.pinned()||(this.orig[0]instanceof jt||this.orig[0]instanceof Yt)&&S(e.keep_fnames,this.orig[0].name)||this.orig[0]instanceof qt||(this.orig[0]instanceof Jt||this.orig[0]instanceof Zt)&&S(e.keep_classnames,this.orig[0].name))}mangle(e){const t=e.cache&&e.cache.props;if(this.global&&t&&t.has(this.name))this.mangled_name=t.get(this.name);else if(!this.mangled_name&&!this.unmangleable(e)){var n=this.scope,i=this.orig[0];e.ie8&&i instanceof jt&&(n=n.parent_scope);const r=Wn(this);this.mangled_name=r?r.mangled_name||r.name:n.next_mangled(e,this),this.global&&t&&t.set(this.name,this.mangled_name);}}}function Wn(e){if(e.orig[0]instanceof Qt&&e.scope.is_block_scope())return e.scope.get_defun_scope().variables.get(e.name)}function Yn(e,t){var n=e.enclosed;e:for(;;){var i=qn(++e.cname);if(!O.has(i)&&!(t.reserved.has(i)||Xn&&Xn.has(i))){for(let e=n.length;--e>=0;){const r=n[e];if(i==(r.mangled_name||r.unmangleable(t)&&r.name))continue e}return i}}}zn.next_id=1,xe.DEFMETHOD("figure_out_scope",(function(e,{parent_scope:t=null,toplevel:n=this}={}){if(e=o(e,{cache:null,ie8:!1,safari10:!1}),!(n instanceof Ne))throw new Error("Invalid toplevel scope");var i=this.parent_scope=t,r=new Map,a=null,s=null,u=[],c=new On((t,n)=>{if(t.is_block_scope()){const r=i;t.block_scope=i=new xe(t),i._block_scope=!0;const o=t instanceof ot?r.parent_scope:r;if(i.init_scope_vars(o),i.uses_with=r.uses_with,i.uses_eval=r.uses_eval,e.safari10&&(t instanceof Fe||t instanceof Me)&&u.push(i),t instanceof et){const e=i;i=r,t.expression.walk(c),i=e;for(let e=0;e<t.body.length;e++)t.body[e].walk(c);}else n();return i=r,!0}if(t instanceof Ke){const e=s;return s=t,n(),s=e,!0}if(t instanceof xe){t.init_scope_vars(i);var o=i,f=a,p=r;return a=i=t,r=new Map,n(),i=o,a=f,r=p,!0}if(t instanceof Te){var _=t.label;if(r.has(_.name))throw new Error(d("Label {name} defined twice",_));return r.set(_.name,_),n(),r.delete(_.name),!0}if(t instanceof we)for(var m=i;m;m=m.parent_scope)m.uses_with=!0;else {if(t instanceof Bt&&(t.scope=i),t instanceof nn&&(t.thedef=t,t.references=[]),t instanceof jt)a.def_function(t,"arguments"==t.name?void 0:a);else if(t instanceof Yt)l((t.scope=a.parent_scope.get_defun_scope()).def_function(t,a),1);else if(t instanceof Jt)l(a.def_variable(t,a),1);else if(t instanceof en)i.def_variable(t);else if(t instanceof Zt)l((t.scope=a.parent_scope).def_function(t,a),1);else if(t instanceof Gt||t instanceof zt||t instanceof Xt||t instanceof Qt){if((h=t instanceof Ht?i.def_variable(t,null):a.def_variable(t,"SymbolVar"==t.TYPE?null:void 0)).orig.every(e=>e===t||(t instanceof Ht?e instanceof jt:!(e instanceof zt||e instanceof Xt)))||ee(`"${t.name}" is redeclared`,t.start.file,t.start.line,t.start.col,t.start.pos),t instanceof Wt||l(h,2),a!==i){t.mark_enclosed();var h=i.find_variable(t);t.thedef!==h&&(t.thedef=h,t.reference());}}else if(t instanceof sn){var E=r.get(t.name);if(!E)throw new Error(d("Undefined label {name} [{line},{col}]",{name:t.name,line:t.start.line,col:t.start.col}));t.thedef=E;}i instanceof Ne||!(t instanceof dt||t instanceof _t)||ee(`"${t.TYPE}" statement may only appear at the top level`,t.start.file,t.start.line,t.start.col,t.start.pos);}});function l(e,t){if(s){var n=0;do{t++;}while(c.parent(n++)!==s)}var i=c.parent(t);if(e.export=i instanceof dt?1:0){var r=i.exported_definition;(r instanceof Be||r instanceof Pt)&&i.is_default&&(e.export=2);}}this.walk(c),this instanceof Ne&&(this.globals=new Map);c=new On(e=>{if(e instanceof qe&&e.label)return e.label.thedef.references.push(e),!0;if(e instanceof rn){var t,i=e.name;if("eval"==i&&c.parent()instanceof mt)for(var r=e.scope;r&&!r.uses_eval;r=r.parent_scope)r.uses_eval=!0;return c.parent()instanceof pt&&c.parent(1).module_name||!(t=e.scope.find_variable(i))?(t=n.def_global(e),e instanceof on&&(t.export=1)):t.scope instanceof Ie&&"arguments"==i&&(t.scope.uses_arguments=!0),e.thedef=t,e.reference(),!e.scope.is_block_scope()||t.orig[0]instanceof Ht||(e.scope=e.scope.get_defun_scope()),!0}var o;if(e instanceof Qt&&(o=Wn(e.definition())))for(r=e.scope;r&&(_(r.enclosed,o),r!==o.scope);)r=r.parent_scope;});if(this.walk(c),(e.ie8||e.safari10)&&yn(this,e=>{if(e instanceof Qt){var t=e.name,i=e.thedef.references,r=e.scope.get_defun_scope(),o=r.find_variable(t)||n.globals.get(t)||r.def_variable(e);return i.forEach((function(e){e.thedef=o,e.reference();})),e.thedef=o,e.reference(),!0}}),e.safari10)for(const e of u)e.parent_scope.variables.forEach((function(t){_(e.enclosed,t);}));})),Ne.DEFMETHOD("def_global",(function(e){var t=this.globals,n=e.name;if(t.has(n))return t.get(n);var i=new zn(this,e);return i.undeclared=!0,i.global=!0,t.set(n,i),i})),xe.DEFMETHOD("init_scope_vars",(function(e){this.variables=new Map,this.functions=new Map,this.uses_with=!1,this.uses_eval=!1,this.parent_scope=e,this.enclosed=[],this.cname=-1,this._var_name_cache=null;})),xe.DEFMETHOD("var_names",(function e(){var t=this._var_name_cache;return t||(this._var_name_cache=t=new Set(this.parent_scope?e.call(this.parent_scope):null),this._added_var_names&&this._added_var_names.forEach(e=>{t.add(e);}),this.enclosed.forEach((function(e){t.add(e.name);})),this.variables.forEach((function(e,n){t.add(n);}))),t})),xe.DEFMETHOD("add_var_name",(function(e){this._added_var_names||(this._added_var_names=new Set),this._added_var_names.add(e),this._var_name_cache||this.var_names(),this._var_name_cache.add(e);})),xe.DEFMETHOD("add_child_scope",(function(e){if(e.parent_scope===this)return;e.parent_scope=this,e._var_name_cache=null,e._added_var_names&&e._added_var_names.forEach(t=>e.add_var_name(t));const t=new Set(e.enclosed),n=(()=>{const e=[];let t=this;do{e.push(t);}while(t=t.parent_scope);return e.reverse(),e})(),i=[];for(const e of n){i.forEach(t=>_(e.enclosed,t));for(const n of e.variables.values())t.has(n)&&(_(i,n),_(e.enclosed,n));}})),pe.DEFMETHOD("is_block_scope",s),It.DEFMETHOD("is_block_scope",s),Ie.DEFMETHOD("is_block_scope",s),Ne.DEFMETHOD("is_block_scope",s),tt.DEFMETHOD("is_block_scope",s),De.DEFMETHOD("is_block_scope",u),xe.DEFMETHOD("is_block_scope",(function(){return this._block_scope||!1})),ye.DEFMETHOD("is_block_scope",u),Ie.DEFMETHOD("init_scope_vars",(function(){xe.prototype.init_scope_vars.apply(this,arguments),this.uses_arguments=!1,this.def_variable(new Wt({name:"arguments",start:this.start,end:this.end}));})),Ve.DEFMETHOD("init_scope_vars",(function(){xe.prototype.init_scope_vars.apply(this,arguments),this.uses_arguments=!1;})),Bt.DEFMETHOD("mark_enclosed",(function(){for(var e=this.definition(),t=this.scope;t&&(_(t.enclosed,e),t!==e.scope);)t=t.parent_scope;})),Bt.DEFMETHOD("reference",(function(){this.definition().references.push(this),this.mark_enclosed();})),xe.DEFMETHOD("find_variable",(function(e){return e instanceof Bt&&(e=e.name),this.variables.get(e)||this.parent_scope&&this.parent_scope.find_variable(e)})),xe.DEFMETHOD("def_function",(function(e,t){var n=this.def_variable(e,t);return (!n.init||n.init instanceof Be)&&(n.init=t),this.functions.set(e.name,n),n})),xe.DEFMETHOD("def_variable",(function(e,t){var n=this.variables.get(e.name);return n?(n.orig.push(e),n.init&&(n.scope!==e.scope||n.init instanceof Pe)&&(n.init=t)):(n=new zn(this,e,t),this.variables.set(e.name,n),n.global=!this.parent_scope),e.thedef=n})),xe.DEFMETHOD("next_mangled",(function(e){return Yn(this,e)})),Ne.DEFMETHOD("next_mangled",(function(e){let t;const n=this.mangled_names;do{t=Yn(this,e);}while(n.has(t));return t})),Pe.DEFMETHOD("next_mangled",(function(e,t){for(var n=t.orig[0]instanceof Wt&&this.name&&this.name.definition(),i=n?n.mangled_name||n.name:null;;){var r=Yn(this,e);if(!i||i!=r)return r}})),Bt.DEFMETHOD("unmangleable",(function(e){var t=this.definition();return !t||t.unmangleable(e)})),nn.DEFMETHOD("unmangleable",s),Bt.DEFMETHOD("unreferenced",(function(){return !this.definition().references.length&&!this.scope.pinned()})),Bt.DEFMETHOD("definition",(function(){return this.thedef})),Bt.DEFMETHOD("global",(function(){return this.thedef.global})),Ne.DEFMETHOD("_default_mangler_options",(function(e){return (e=o(e,{eval:!1,ie8:!1,keep_classnames:!1,keep_fnames:!1,module:!1,reserved:[],toplevel:!1})).module&&(e.toplevel=!0),Array.isArray(e.reserved)||e.reserved instanceof Set||(e.reserved=[]),e.reserved=new Set(e.reserved),e.reserved.add("arguments"),e})),Ne.DEFMETHOD("mangle_names",(function(e){e=this._default_mangler_options(e);var t=-1,n=[];e.keep_fnames&&(Hn=new Set);const i=this.mangled_names=new Set;e.cache&&(this.globals.forEach(o),e.cache.props&&e.cache.props.forEach((function(e){i.add(e);})));var r=new On((function(i,r){if(i instanceof Te){var a=t;return r(),t=a,!0}if(i instanceof xe)i.variables.forEach(o);else if(i.is_block_scope())i.block_scope.variables.forEach(o);else if(Hn&&i instanceof ft&&i.value instanceof Ie&&!i.value.name&&S(e.keep_fnames,i.name.name))Hn.add(i.name.definition().id);else {if(i instanceof nn){let e;do{e=qn(++t);}while(O.has(e));return i.mangled_name=e,!0}!e.ie8&&!e.safari10&&i instanceof Qt&&n.push(i.definition());}}));function o(t){!(e.reserved.has(t.name)||1&t.export)&&n.push(t);}this.walk(r),(e.keep_fnames||e.keep_classnames)&&(Xn=new Set,n.forEach(t=>{t.name.length<6&&t.unmangleable(e)&&Xn.add(t.name);})),n.forEach(t=>{t.mangle(e);}),Hn=null,Xn=null;})),Ne.DEFMETHOD("find_colliding_names",(function(e){const t=e.cache&&e.cache.props,n=new Set;return e.reserved.forEach(i),this.globals.forEach(r),this.walk(new On((function(e){e instanceof xe&&e.variables.forEach(r),e instanceof Qt&&r(e.definition());}))),n;function i(e){n.add(e);}function r(n){var r=n.name;if(n.global&&t&&t.has(r))r=t.get(r);else if(!n.unmangleable(e))return;i(r);}})),Ne.DEFMETHOD("expand_names",(function(e){qn.reset(),qn.sort(),e=this._default_mangler_options(e);var t=this.find_colliding_names(e),n=0;function i(i){if(i.global&&e.cache)return;if(i.unmangleable(e))return;if(e.reserved.has(i.name))return;const r=Wn(i),o=i.name=r?r.name:function(){var e;do{e=qn(n++);}while(t.has(e)||O.has(e));return e}();i.orig.forEach((function(e){e.name=o;})),i.references.forEach((function(e){e.name=o;}));}this.globals.forEach(i),this.walk(new On((function(e){e instanceof xe&&e.variables.forEach(i),e instanceof Qt&&i(e.definition());})));})),pe.DEFMETHOD("tail_node",c),Et.DEFMETHOD("tail_node",(function(){return this.expressions[this.expressions.length-1]})),Ne.DEFMETHOD("compute_char_frequency",(function(e){e=this._default_mangler_options(e);try{pe.prototype.print=function(t,n){this._print(t,n),this instanceof Bt&&!this.unmangleable(e)?qn.consider(this.name,-1):e.properties&&(this instanceof Dt?qn.consider(this.property,-1):this instanceof St&&function e(t){t instanceof fn?qn.consider(t.value,-1):t instanceof bt?(e(t.consequent),e(t.alternative)):t instanceof Et&&e(t.tail_node());}(this.property));},qn.consider(this.print_to_string(),1);}finally{pe.prototype.print=pe.prototype._print;}qn.sort();}));const qn=(()=>{const e="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_".split(""),t="0123456789".split("");let n,i;function r(){i=new Map,e.forEach((function(e){i.set(e,0);})),t.forEach((function(e){i.set(e,0);}));}function o(e,t){return i.get(t)-i.get(e)}function a(e){var t="",i=54;e++;do{e--,t+=n[e%i],e=Math.floor(e/i),i=64;}while(e>0);return t}return a.consider=function(e,t){for(var n=e.length;--n>=0;)i.set(e[n],i.get(e[n])+t);},a.sort=function(){n=h(e,o).concat(h(t,o));},a.reset=r,r(),a})();function $n(){const e={};return Object.keys(jn({0:0})).forEach(t=>{const n=jn({[t]:{0:0}});n&&(e[t]=n);}),e}function jn(e){var t=gr("",e);return t.error&&t.error.defs}let Zn=void 0;pe.prototype.size=function(e,t){Zn=$n.mangle;let n=0;return bn(this,(e,t)=>{n+=e._size(t);},t||e&&e.stack),Zn=void 0,n},pe.prototype._size=()=>0,de.prototype._size=()=>8,me.prototype._size=function(){return 2+this.value.length};const Jn=e=>e.length&&e.length-1;De.prototype._size=function(){return 2+Jn(this.body)},Ne.prototype._size=function(){return Jn(this.body)},ve.prototype._size=()=>1,Te.prototype._size=()=>2,Ce.prototype._size=()=>9,Oe.prototype._size=()=>7,Fe.prototype._size=()=>8,Me.prototype._size=()=>8,we.prototype._size=()=>6,ke.prototype._size=()=>3;const Qn=e=>(e.is_generator?1:0)+(e.async?6:0);Le.prototype._size=function(){return Qn(this)+4+Jn(this.argnames)+Jn(this.body)},Pe.prototype._size=function(e){return 2*!!In(e)+Qn(this)+12+Jn(this.argnames)+Jn(this.body)},Be.prototype._size=function(){return Qn(this)+13+Jn(this.argnames)+Jn(this.body)},Ve.prototype._size=function(){let e=2+Jn(this.argnames);return 1===this.argnames.length&&this.argnames[0]instanceof Bt||(e+=2),Qn(this)+e+(Array.isArray(this.body)?Jn(this.body):this.body._size())},Ke.prototype._size=()=>2,Ge.prototype._size=function(){return 2+3*Math.floor(this.segments.length/2)},He.prototype._size=function(){return this.value.length},We.prototype._size=function(){return this.value?7:6},Ye.prototype._size=()=>6,$e.prototype._size=function(){return this.label?6:5},je.prototype._size=function(){return this.label?9:8},Qe.prototype._size=()=>4,et.prototype._size=function(){return 8+Jn(this.body)},it.prototype._size=function(){return 5+Jn(this.body)},nt.prototype._size=function(){return 8+Jn(this.body)},rt.prototype._size=function(){return 3+Jn(this.body)},ot.prototype._size=function(){let e=7+Jn(this.body);return this.argname&&(e+=2),e},at.prototype._size=function(){return 7+Jn(this.body)};const ei=(e,t)=>e+Jn(t.definitions);ut.prototype._size=function(){return ei(4,this)},ct.prototype._size=function(){return ei(4,this)},lt.prototype._size=function(){return ei(6,this)},ft.prototype._size=function(){return this.value?1:0},pt.prototype._size=function(){return this.name?4:0},_t.prototype._size=function(){let e=6;return this.imported_name&&(e+=1),(this.imported_name||this.imported_names)&&(e+=5),this.imported_names&&(e+=2+Jn(this.imported_names)),e},dt.prototype._size=function(){let e=7+(this.is_default?8:0);return this.exported_value&&(e+=this.exported_value._size()),this.exported_names&&(e+=2+Jn(this.exported_names)),this.module_name&&(e+=5),e},mt.prototype._size=function(){return 2+Jn(this.args)},ht.prototype._size=function(){return 6+Jn(this.args)},Et.prototype._size=function(){return Jn(this.expressions)},Dt.prototype._size=function(){return this.property.length+1},St.prototype._size=()=>2,vt.prototype._size=function(){return "typeof"===this.operator?7:"void"===this.operator?5:this.operator.length},yt.prototype._size=function(e){if("in"===this.operator)return 4;let t=this.operator.length;return ("+"===this.operator||"-"===this.operator)&&this.right instanceof vt&&this.right.operator===this.operator&&(t+=1),this.needs_parens(e)&&(t+=2),t},bt.prototype._size=()=>3,Ft.prototype._size=function(){return 2+Jn(this.elements)},Mt.prototype._size=function(e){let t=2;return In(e)&&(t+=2),t+Jn(this.properties)};const ti=e=>"string"==typeof e?e.length:0;wt.prototype._size=function(){return ti(this.key)+1};const ni=e=>e?7:0;Nt.prototype._size=function(){return 5+ni(this.static)+ti(this.key)},xt.prototype._size=function(){return 5+ni(this.static)+ti(this.key)},kt.prototype._size=function(){return ni(this.static)+ti(this.key)+Qn(this)},It.prototype._size=function(){return (this.name?8:7)+(this.extends?8:0)},Lt.prototype._size=function(){return ni(this.static)+("string"==typeof this.key?this.key.length+2:0)+(this.value?1:0)},Bt.prototype._size=function(){return !Zn||this.definition().unmangleable(Zn)?this.name.length:2},$t.prototype._size=function(){return this.name.length},rn.prototype._size=function(){const{name:e,thedef:t}=this;return t&&t.global?e.length:"arguments"===e?9:2},Kt.prototype._size=()=>10,tn.prototype._size=function(){return this.name.length},an.prototype._size=function(){return this.name.length},un.prototype._size=()=>4,cn.prototype._size=()=>5,fn.prototype._size=function(){return this.value.length+2},pn.prototype._size=function(){const{value:e}=this;return 0===e?1:e>0&&Math.floor(e)===e?Math.floor(Math.log10(e)+1):e.toString().length},_n.prototype._size=function(){return this.value.length},dn.prototype._size=function(){return this.value.toString().length},hn.prototype._size=()=>4,En.prototype._size=()=>3,gn.prototype._size=()=>6,Dn.prototype._size=()=>0,Sn.prototype._size=()=>8,Tn.prototype._size=()=>4,An.prototype._size=()=>5,Ze.prototype._size=()=>6,Je.prototype._size=()=>6;const ii=(e,t)=>e.flags&t,ri=(e,t)=>{e.flags|=t;},oi=(e,t)=>{e.flags&=~t;};class ai extends On{constructor(e,t){super(),void 0===e.defaults||e.defaults||(t=!0),this.options=o(e,{arguments:!1,arrows:!t,booleans:!t,booleans_as_integers:!1,collapse_vars:!t,comparisons:!t,computed_props:!t,conditionals:!t,dead_code:!t,defaults:!0,directives:!t,drop_console:!1,drop_debugger:!t,ecma:5,evaluate:!t,expression:!1,global_defs:!1,hoist_funs:!1,hoist_props:!t,hoist_vars:!1,ie8:!1,if_return:!t,inline:!t,join_vars:!t,keep_classnames:!1,keep_fargs:!0,keep_fnames:!1,keep_infinity:!1,loops:!t,module:!1,negate_iife:!t,passes:1,properties:!t,pure_getters:!t&&"strict",pure_funcs:null,reduce_funcs:null,reduce_vars:!t,sequences:!t,side_effects:!t,switches:!t,top_retain:null,toplevel:!(!e||!e.top_retain),typeofs:!t,unsafe:!1,unsafe_arrows:!1,unsafe_comps:!1,unsafe_Function:!1,unsafe_math:!1,unsafe_symbols:!1,unsafe_methods:!1,unsafe_proto:!1,unsafe_regexp:!1,unsafe_undefined:!1,unused:!t,warnings:!1},!0);var n=this.options.global_defs;if("object"==typeof n)for(var i in n)"@"===i[0]&&D(n,i)&&(n[i.slice(1)]=ce(n[i],{expression:!0}));!0===this.options.inline&&(this.options.inline=3);var r=this.options.pure_funcs;this.pure_funcs="function"==typeof r?r:r?function(e){return !r.includes(e.expression.print_to_string())}:u;var a=this.options.top_retain;a instanceof RegExp?this.top_retain=function(e){return a.test(e.name)}:"function"==typeof a?this.top_retain=a:a&&("string"==typeof a&&(a=a.split(/,/)),this.top_retain=function(e){return a.includes(e.name)}),this.options.module&&(this.directives["use strict"]=!0,this.options.toplevel=!0);var s=this.options.toplevel;this.toplevel="string"==typeof s?{funcs:/funcs/.test(s),vars:/vars/.test(s)}:{funcs:s,vars:s};var c=this.options.sequences;this.sequences_limit=1==c?800:0|c,this.warnings_produced={},this.evaluated_regexps=new Map;}option(e){return this.options[e]}exposed(e){if(e.export)return !0;if(e.global)for(var t=0,n=e.orig.length;t<n;t++)if(!this.toplevel[e.orig[t]instanceof Yt?"funcs":"vars"])return !0;return !1}in_boolean_context(){if(!this.option("booleans"))return !1;for(var e,t=this.self(),n=0;e=this.parent(n);n++){if(e instanceof he||e instanceof bt&&e.condition===t||e instanceof be&&e.condition===t||e instanceof Fe&&e.condition===t||e instanceof Qe&&e.condition===t||e instanceof At&&"!"==e.operator&&e.expression===t)return !0;if(!(e instanceof yt&&("&&"==e.operator||"||"==e.operator||"??"==e.operator)||e instanceof bt||e.tail_node()===t))return !1;t=e;}}compress(e){e=e.resolve_defines(this),this.option("expression")&&e.process_expression(!0);for(var t=+this.options.passes||1,n=1/0,i=!1,r={ie8:this.option("ie8")},o=0;o<t;o++)if(e.figure_out_scope(r),0===o&&this.option("drop_console")&&(e=e.drop_console()),(o>0||this.option("reduce_vars"))&&e.reset_opt_flags(this),e=e.transform(this),t>1){let t=0;if(yn(e,()=>{t++;}),this.info("pass "+o+": last_count: "+n+", count: "+t),t<n)n=t,i=!1;else {if(i)break;i=!0;}}return this.option("expression")&&e.process_expression(!1),e}info(...e){"verbose"==this.options.warnings&&pe.warn(...e);}warn(e,t){if(this.options.warnings){var n=d(e,t);n in this.warnings_produced||(this.warnings_produced[n]=!0,pe.warn.apply(pe,arguments));}}clear_warnings(){this.warnings_produced={};}before(e,t){if(ii(e,256))return e;var n=!1;e instanceof xe&&(e=(e=e.hoist_properties(this)).hoist_declarations(this),n=!0),t(e,this),t(e,this);var i=e.optimize(this);return n&&i instanceof xe&&(i.drop_unused(this),t(i,this)),i===e&&ri(i,256),i}}function si(e,t){e.DEFMETHOD("optimize",(function(e){if(ii(this,512))return this;if(e.has_directive("use asm"))return this;var n=t(this,e);return ri(n,512),n}));}function ui(e,t){if(!((t=wi(t))instanceof pe)){var n;if(e instanceof Ft){var i=e.elements;if("length"==t)return hi(i.length,e);"number"==typeof t&&t in i&&(n=i[t]);}else if(e instanceof Mt){t=""+t;for(var r=e.properties,o=r.length;--o>=0;){if(!(r[o]instanceof wt))return;n||r[o].key!==t||(n=r[o].value);}}return n instanceof rn&&n.fixed_value()||n}}function ci(e,t,n,i,r,o){var a=t.parent(r),s=Ii(n,a);if(s)return s;if(!o&&a instanceof mt&&a.expression===n&&!(i instanceof Ve)&&!(i instanceof It)&&!a.is_expr_pure(e)&&(!(i instanceof Pe)||!(a instanceof ht)&&i.contains_this()))return !0;if(a instanceof Ft)return ci(e,t,a,a,r+1);if(a instanceof wt&&n===a.value){var u=t.parent(r+1);return ci(e,t,u,u,r+2)}if(a instanceof gt&&a.expression===n){var c=ui(i,a.property);return !o&&ci(e,t,a,c,r+1)}}function li(e){return e instanceof Ve||e instanceof Pe}function fi(e){if(e instanceof un)return !0;if(e instanceof rn)return e.definition().orig[0]instanceof jt;if(e instanceof gt){if((e=e.expression)instanceof rn){if(e.is_immutable())return !1;e=e.fixed_value();}return !e||!(e instanceof dn)&&(e instanceof ln||fi(e))}return !1}function pi(e,t){if(!(e instanceof rn))return !1;for(var n=e.definition().orig,i=n.length;--i>=0;)if(n[i]instanceof t)return !0}function _i(e){for(let t=0;;t++){const n=e.parent(t);if(n instanceof Ne)return n;if(n instanceof Ie)return n;if(n.block_scope)return n.block_scope}}function di(e,t){for(var n,i=0;(n=e.parent(i++))&&!(n instanceof xe);)if(n instanceof ot&&n.argname){n=n.argname.definition().scope;break}return n.find_variable(t)}function mi(e,t){if(1==t.length)return t[0];if(0==t.length)throw new Error("trying to create a sequence with length zero!");return p(Et,e,{expressions:t.reduce(gi,[])})}function hi(e,t){switch(typeof e){case"string":return p(fn,t,{value:e});case"number":return isNaN(e)?p(En,t):isFinite(e)?1/e<0?p(At,t,{operator:"-",expression:p(pn,t,{value:-e})}):p(pn,t,{value:e}):e<0?p(At,t,{operator:"-",expression:p(Sn,t)}):p(Sn,t);case"boolean":return p(e?Tn:An,t);case"undefined":return p(gn,t);default:if(null===e)return p(hn,t,{value:null});if(e instanceof RegExp)return p(dn,t,{value:{source:A(e.source),flags:e.flags}});throw new Error(d("Can't handle constant of type: {type}",{type:typeof e}))}}function Ei(e,t,n){return e instanceof At&&"delete"==e.operator||e instanceof mt&&e.expression===t&&(n instanceof gt||n instanceof rn&&"eval"==n.name)?mi(t,[p(pn,t,{value:0}),n]):n}function gi(e,t){return t instanceof Et?e.push(...t.expressions):e.push(t),e}function Di(e){if(null===e)return [];if(e instanceof Se)return e.body;if(e instanceof ve)return [];if(e instanceof _e)return [e];throw new Error("Can't convert thing to statement array")}function Si(e){return null===e||(e instanceof ve||e instanceof Se&&0==e.body.length)}function vi(e){return !(e instanceof Pt||e instanceof Be||e instanceof ct||e instanceof lt||e instanceof dt||e instanceof _t)}function Ai(e){return e instanceof ye&&e.body instanceof Se?e.body:e}function Ti(e){return "Call"==e.TYPE&&(e.expression instanceof Pe||Ti(e.expression))}function yi(e){return e instanceof rn&&e.definition().undeclared}si(pe,(function(e){return e})),Ne.DEFMETHOD("drop_console",(function(){return this.transform(new Fn((function(e){if("Call"==e.TYPE){var t=e.expression;if(t instanceof gt){for(var n=t.expression;n.expression;)n=n.expression;if(yi(n)&&"console"==n.name)return p(gn,e)}}})))})),pe.DEFMETHOD("equivalent_to",(function(e){return ((e,t)=>{if(!Kn(e,t))return !1;const n=[e],i=[t],r=n.push.bind(n),o=i.push.bind(i);for(;n.length&&i.length;){const e=n.pop(),t=i.pop();if(!Kn(e,t))return !1;if(e._children_backwards(r),t._children_backwards(o),n.length!==i.length)return !1}return 0==n.length&&0==i.length})(this,e)})),xe.DEFMETHOD("process_expression",(function(e,t){var n=this,i=new Fn((function(r){if(e&&r instanceof he)return p(We,r,{value:r.body});if(!e&&r instanceof We){if(t){var o=r.value&&r.value.drop_side_effect_free(t,!0);return o?p(he,r,{body:o}):p(ve,r)}return p(he,r,{body:r.value||p(At,r,{operator:"void",expression:p(pn,r,{value:0})})})}if(r instanceof It||r instanceof Ie&&r!==n)return r;if(r instanceof De){var a=r.body.length-1;a>=0&&(r.body[a]=r.body[a].transform(i));}else r instanceof Qe?(r.body=r.body.transform(i),r.alternative&&(r.alternative=r.alternative.transform(i))):r instanceof we&&(r.body=r.body.transform(i));return r}));n.transform(i);})),function(e){function t(e,t){t.assignments=0,t.chained=!1,t.direct_access=!1,t.escaped=0,t.recursive_refs=0,t.references=[],t.should_replace=void 0,t.single_use=void 0,t.scope.pinned()?t.fixed=!1:t.orig[0]instanceof Xt||!e.exposed(t)?t.fixed=t.init:t.fixed=!1;}function n(e,n,i){i.variables.forEach((function(i){t(n,i),null===i.fixed?(e.defs_to_safe_ids.set(i.id,e.safe_ids),s(e,i,!0)):i.fixed&&(e.loop_ids.set(i.id,e.in_loop),s(e,i,!0));}));}function i(e,n){n.block_scope&&n.block_scope.variables.forEach(n=>{t(e,n);});}function r(e){e.safe_ids=Object.create(e.safe_ids);}function o(e){e.safe_ids=Object.getPrototypeOf(e.safe_ids);}function s(e,t,n){e.safe_ids[t.id]=n;}function u(e,t){if("m"==t.single_use)return !1;if(e.safe_ids[t.id]){if(null==t.fixed){var n=t.orig[0];if(n instanceof Wt||"arguments"==n.name)return !1;t.fixed=p(gn,n);}return !0}return t.fixed instanceof Be}function c(e,t,n,i){if(void 0===t.fixed)return !0;let r;return null===t.fixed&&(r=e.defs_to_safe_ids.get(t.id))?(r[t.id]=!1,e.defs_to_safe_ids.delete(t.id),!0):!!D(e.safe_ids,t.id)&&(!!u(e,t)&&(!1!==t.fixed&&(!(null!=t.fixed&&(!i||t.references.length>t.assignments))&&(t.fixed instanceof Be?i instanceof pe&&t.fixed.parent_scope===n:t.orig.every(e=>!(e instanceof Xt||e instanceof Yt||e instanceof jt))))))}function l(e,t,n,i,r,o,a){var s=e.parent(o);if(r){if(r.is_constant())return;if(r instanceof Vt)return}if(s instanceof Ct&&"="==s.operator&&i===s.right||s instanceof mt&&(i!==s.expression||s instanceof ht)||s instanceof ze&&i===s.value&&i.scope!==t.scope||s instanceof ft&&i===s.value||s instanceof Je&&i===s.value&&i.scope!==t.scope)return !(a>1)||r&&r.is_constant_expression(n)||(a=1),void((!t.escaped||t.escaped>a)&&(t.escaped=a));if(s instanceof Ft||s instanceof Ze||s instanceof yt&&Ni.has(s.operator)||s instanceof bt&&i!==s.condition||s instanceof ke||s instanceof Et&&i===s.tail_node())l(e,t,n,s,s,o+1,a);else if(s instanceof wt&&i===s.value){var u=e.parent(o+1);l(e,t,n,u,u,o+2,a);}else if(s instanceof gt&&i===s.expression&&(l(e,t,n,s,r=ui(r,s.property),o+1,a+1),r))return;o>0||s instanceof Et&&i!==s.tail_node()||s instanceof he||(t.direct_access=!0);}e(pe,a);const f=e=>yn(e,e=>{if(e instanceof Bt){var t=e.definition();t&&(e instanceof rn&&t.references.push(e),t.fixed=!1);}});e(Le,(function(e,t,i){return r(e),n(e,i,this),t(),o(e),!0})),e(Ct,(function(e,t,n){var i=this;if(i.left instanceof Ke)f(i.left);else {var r=i.left;if(r instanceof rn){var o=r.definition(),a=c(e,o,r.scope,i.right);if(o.assignments++,a){var u=o.fixed;if(u||"="==i.operator){var _="="==i.operator,d=_?i.right:i;if(!ci(n,e,i,d,0))return o.references.push(r),_||(o.chained=!0),o.fixed=_?function(){return i.right}:function(){return p(yt,i,{operator:i.operator.slice(0,-1),left:u instanceof pe?u:u(),right:i.right})},s(e,o,!1),i.right.walk(e),s(e,o,!0),l(e,o,r.scope,i,d,0,1),!0}}}}})),e(yt,(function(e){if(Ni.has(this.operator))return this.left.walk(e),r(e),this.right.walk(e),o(e),!0})),e(De,(function(e,t,n){i(n,this);})),e(it,(function(e){return r(e),this.expression.walk(e),o(e),r(e),Ee(this,e),o(e),!0})),e(It,(function(e,t){return oi(this,16),r(e),t(),o(e),!0})),e(bt,(function(e){return this.condition.walk(e),r(e),this.consequent.walk(e),o(e),r(e),this.alternative.walk(e),o(e),!0})),e(nt,(function(e,t){return r(e),t(),o(e),!0})),e(Ie,(function(e,t,i){return oi(this,16),r(e),n(e,i,this),this.uses_arguments?(t(),void o(e)):(!this.name&&(a=e.parent())instanceof mt&&a.expression===this&&!a.args.some(e=>e instanceof ke)&&this.argnames.every(e=>e instanceof Bt)&&this.argnames.forEach((t,n)=>{if(t.definition){var i=t.definition();i.orig.length>1||(void 0!==i.fixed||this.uses_arguments&&!e.has_directive("use strict")?i.fixed=!1:(i.fixed=function(){return a.args[n]||p(gn,a)},e.loop_ids.set(i.id,e.in_loop),s(e,i,!0)));}}),t(),o(e),!0);var a;})),e(Ce,(function(e,t,n){i(n,this);const a=e.in_loop;return e.in_loop=this,r(e),this.body.walk(e),$i(this)&&(o(e),r(e)),this.condition.walk(e),o(e),e.in_loop=a,!0})),e(Fe,(function(e,t,n){i(n,this),this.init&&this.init.walk(e);const a=e.in_loop;return e.in_loop=this,r(e),this.condition&&this.condition.walk(e),this.body.walk(e),this.step&&($i(this)&&(o(e),r(e)),this.step.walk(e)),o(e),e.in_loop=a,!0})),e(Me,(function(e,t,n){i(n,this),f(this.init),this.object.walk(e);const a=e.in_loop;return e.in_loop=this,r(e),this.body.walk(e),o(e),e.in_loop=a,!0})),e(Qe,(function(e){return this.condition.walk(e),r(e),this.body.walk(e),o(e),this.alternative&&(r(e),this.alternative.walk(e),o(e)),!0})),e(Te,(function(e){return r(e),this.body.walk(e),o(e),!0})),e(Qt,(function(){this.definition().fixed=!1;})),e(rn,(function(e,t,n){var i,r,o=this.definition();o.references.push(this),1==o.references.length&&!o.fixed&&o.orig[0]instanceof Yt&&e.loop_ids.set(o.id,e.in_loop),void 0!==o.fixed&&u(e,o)?o.fixed&&((i=this.fixed_value())instanceof Ie&&Ji(e,o)?o.recursive_refs++:i&&!n.exposed(o)&&function(e,t,n){return t.option("unused")&&!n.scope.pinned()&&n.references.length-n.recursive_refs==1&&e.loop_ids.get(n.id)===e.in_loop}(e,n,o)?o.single_use=i instanceof Ie&&!i.pinned()||i instanceof It||o.scope===this.scope&&i.is_constant_expression():o.single_use=!1,ci(n,e,this,i,0,!!(r=i)&&(r.is_constant()||r instanceof Ie||r instanceof un))&&(o.single_use?o.single_use="m":o.fixed=!1)):o.fixed=!1,l(e,o,this.scope,this,i,0,1);})),e(Ne,(function(e,i,r){this.globals.forEach((function(e){t(r,e);})),n(e,r,this);})),e(rt,(function(e,t,n){return i(n,this),r(e),Ee(this,e),o(e),this.bcatch&&(r(e),this.bcatch.walk(e),o(e)),this.bfinally&&this.bfinally.walk(e),!0})),e(vt,(function(e){var t=this;if("++"===t.operator||"--"===t.operator){var n=t.expression;if(n instanceof rn){var i=n.definition(),r=c(e,i,n.scope,!0);if(i.assignments++,r){var o=i.fixed;if(o)return i.references.push(n),i.chained=!0,i.fixed=function(){return p(yt,t,{operator:t.operator.slice(0,-1),left:p(At,t,{operator:"+",expression:o instanceof pe?o:o()}),right:p(pn,t,{value:1})})},s(e,i,!0),!0}}}})),e(ft,(function(e,t){var n=this;if(n.name instanceof Ke)f(n.name);else {var i=n.name.definition();if(n.value){if(c(e,i,n.name.scope,n.value))return i.fixed=function(){return n.value},e.loop_ids.set(i.id,e.in_loop),s(e,i,!1),t(),s(e,i,!0),!0;i.fixed=!1;}}})),e(Oe,(function(e,t,n){i(n,this);const a=e.in_loop;return e.in_loop=this,r(e),t(),o(e),e.in_loop=a,!0}));}((function(e,t){e.DEFMETHOD("reduce_vars",t);})),Ne.DEFMETHOD("reset_opt_flags",(function(e){const t=this,n=e.option("reduce_vars"),i=new On((function(r,o){if(oi(r,1792),n)return e.top_retain&&r instanceof Be&&i.parent()===t&&ri(r,1024),r.reduce_vars(i,o,e)}));i.safe_ids=Object.create(null),i.in_loop=null,i.loop_ids=new Map,i.defs_to_safe_ids=new Map,t.walk(i);})),Bt.DEFMETHOD("fixed_value",(function(){var e=this.thedef.fixed;return !e||e instanceof pe?e:e()})),rn.DEFMETHOD("is_immutable",(function(){var e=this.definition().orig;return 1==e.length&&e[0]instanceof jt}));var bi=E("Array Boolean clearInterval clearTimeout console Date decodeURI decodeURIComponent encodeURI encodeURIComponent Error escape eval EvalError Function isFinite isNaN JSON Math Number parseFloat parseInt RangeError ReferenceError RegExp Object setInterval setTimeout String SyntaxError TypeError unescape URIError");rn.DEFMETHOD("is_declared",(function(e){return !this.definition().undeclared||e.option("unsafe")&&bi.has(this.name)}));var Ci,Oi=E("Infinity NaN undefined");function Fi(e){return e instanceof Sn||e instanceof En||e instanceof gn}function Mi(e,t){var n,r,o=t.find_parent(xe).get_defun_scope();!function(){var e=t.self(),i=0;do{if(e instanceof ot||e instanceof at)i++;else if(e instanceof ye)n=!0;else {if(e instanceof xe){o=e;break}e instanceof rt&&(r=!0);}}while(e=t.parent(i++))}();var a,s=10;do{a=!1,c(e),t.option("dead_code")&&_(e,t),t.option("if_return")&&l(e,t),t.sequences_limit>0&&(h(e,t),g(e,t)),t.option("join_vars")&&S(e),t.option("collapse_vars")&&u(e,t);}while(a&&s-- >0);function u(e,t){if(o.pinned())return e;for(var s,u=[],c=e.length,l=new Fn((function(e){if(M)return e;if(!F)return e!==d[m]?e:++m<d.length?I(e):(F=!0,(g=function e(t,n,i){var r=l.parent(n);if(r instanceof Ct)return i&&!(r.left instanceof gt||v.has(r.left.name))?e(r,n+1,i):t;if(r instanceof yt)return !i||Ni.has(r.operator)&&r.left!==t?t:e(r,n+1,i);if(r instanceof mt)return t;if(r instanceof it)return t;if(r instanceof bt)return i&&r.condition===t?e(r,n+1,i):t;if(r instanceof st)return e(r,n+1,!0);if(r instanceof ze)return i?e(r,n+1,i):t;if(r instanceof Qe)return i&&r.condition===t?e(r,n+1,i):t;if(r instanceof ye)return t;if(r instanceof Et)return e(r,n+1,r.tail_node()!==t);if(r instanceof he)return e(r,n+1,!0);return r instanceof et||r instanceof ft?t:null}(e,0))===e&&(M=!0),e);var n,i=l.parent();if(e instanceof Ct&&"="!=e.operator&&S.equivalent_to(e.left)||e instanceof Ze||e instanceof mt&&S instanceof gt&&S.equivalent_to(e.expression)||e instanceof de||e instanceof Ke||e instanceof ke&&e.expression instanceof Bt&&e.expression.definition().references.length>1||e instanceof ye&&!(e instanceof Fe)||e instanceof qe||e instanceof rt||e instanceof we||e instanceof Je||e instanceof dt||e instanceof It||i instanceof Fe&&e!==i.init||!b&&e instanceof rn&&!e.is_declared(t)&&!Xi.has(e)||e instanceof rn&&i instanceof mt&&T(i,wn))return M=!0,e;if(D||A&&b||!(i instanceof yt&&Ni.has(i.operator)&&i.left!==e||i instanceof bt&&i.condition!==e||i instanceof Qe&&i.condition!==e)||(D=i),w&&!(e instanceof Ut)&&S.equivalent_to(e)){if(D)return M=!0,e;if(Ii(e,i))return E&&R++,e;if(R++,E&&h instanceof ft)return e;if(a=M=!0,t.info("Collapsing {name} [{file}:{line},{col}]",{name:e.print_to_string(),file:e.start.file,line:e.start.line,col:e.start.col}),h instanceof Tt)return p(At,h,h);if(h instanceof ft){var s=h.name.definition(),u=h.value;return s.references.length-s.replaced!=1||t.exposed(s)?p(Ct,h,{operator:"=",left:p(rn,h.name,h.name),right:u}):(s.replaced++,O&&Fi(u)?u.transform(t):Ei(i,e,u))}return oi(h,32),h}return (e instanceof mt||e instanceof ze&&(y||S instanceof gt||W(S))||e instanceof gt&&(y||e.expression.may_throw_on_access(t))||e instanceof rn&&(v.get(e.name)||y&&W(e))||e instanceof ft&&e.value&&(v.has(e.name.name)||y&&W(e.name))||(n=Ii(e.left,e))&&(n instanceof gt||v.has(n.name))||C&&(r?e.has_side_effects(t):function e(t,n){if(t instanceof Ct)return e(t.left,!0);if(t instanceof vt)return e(t.expression,!0);if(t instanceof ft)return t.value&&e(t.value);if(n){if(t instanceof Dt)return e(t.expression,!0);if(t instanceof St)return e(t.expression,!0);if(t instanceof rn)return t.definition().scope!==o}return !1}(e)))&&(g=e,e instanceof xe&&(M=!0)),I(e)}),(function(e){M||(g===e&&(M=!0),D===e&&(D=null));})),_=new Fn((function(e){if(M)return e;if(!F){if(e!==d[m])return e;if(++m<d.length)return;return F=!0,e}return e instanceof rn&&e.name==k.name?(--R||(M=!0),Ii(e,_.parent())?e:(k.replaced++,E.replaced--,h.value)):e instanceof nt||e instanceof xe?e:void 0}));--c>=0;){0==c&&t.option("unused")&&P();var d=[];for(V(e[c]);u.length>0;){d=u.pop();var m=0,h=d[d.length-1],E=null,g=null,D=null,S=B(h);if(S&&!fi(S)&&!S.has_side_effects(t)){var v=U(h),A=H(S);S instanceof rn&&v.set(S.name,!1);var y=X(h),b=z(),C=h.may_throw(t),O=h.name instanceof Wt,F=O,M=!1,R=0,w=!s||!F;if(!w){for(var x=t.self().argnames.lastIndexOf(h.name)+1;!M&&x<s.length;x++)s[x].transform(l);w=!0;}for(var N=c;!M&&N<e.length;N++)e[N].transform(l);if(E){var k=h.name.definition();if(M&&k.references.length-k.replaced>R)R=!1;else {M=!1,m=0,F=O;for(N=c;!M&&N<e.length;N++)e[N].transform(_);E.single_use=!1;}}R&&!G(h)&&e.splice(c,1);}}}function I(e){if(e instanceof xe)return e;if(e instanceof et){e.expression=e.expression.transform(l);for(var t=0,n=e.body.length;!M&&t<n;t++){var i=e.body[t];if(i instanceof it){if(!F){if(i!==d[m])continue;m++;}if(i.expression=i.expression.transform(l),!b)break}}return M=!0,e}}function L(e,t,n){var i=!1,r=!(e instanceof Ve);return t.walk(new On((function(t,a){if(i)return !0;if(t instanceof rn&&(e.variables.has(t.name)||function(e,t){if(e.global)return !1;let n=e.scope;for(;n&&n!==t;){if(n.variables.has(e.name))return !0;n=n.parent_scope;}return !1}(t.definition(),e))){var s=t.definition().scope;if(s!==o)for(;s=s.parent_scope;)if(s===o)return !0;return i=!0}if((n||r)&&t instanceof un)return i=!0;if(t instanceof xe&&!(t instanceof Ve)){var u=r;return r=!1,a(),r=u,!0}}))),i}function P(){var e,n=t.self();if(li(n)&&!n.name&&!n.uses_arguments&&!n.pinned()&&(e=t.parent())instanceof mt&&e.expression===n&&e.args.every(e=>!(e instanceof ke))){var r=t.has_directive("use strict");r&&!i(r,n.body)&&(r=!1);var o=n.argnames.length;s=e.args.slice(o);for(var a=new Set,c=o;--c>=0;){var l=n.argnames[c],f=e.args[c];const i=l.definition&&l.definition();if(!(i&&i.orig.length>1)&&(s.unshift(p(ft,l,{name:l,value:f})),!a.has(l.name)))if(a.add(l.name),l instanceof ke){var _=e.args.slice(c);_.every(e=>!L(n,e,r))&&u.unshift([p(ft,l,{name:l.expression,value:p(Ft,e,{elements:_})})]);}else f?(f instanceof Ie&&f.pinned()||L(n,f,r))&&(f=null):f=p(gn,l).transform(t),f&&u.unshift([p(ft,l,{name:l,value:f})]);}}}function V(e){if(d.push(e),e instanceof Ct)e.left.has_side_effects(t)||u.push(d.slice()),V(e.right);else if(e instanceof yt)V(e.left),V(e.right);else if(e instanceof mt&&!T(e,wn))V(e.expression),e.args.forEach(V);else if(e instanceof it)V(e.expression);else if(e instanceof bt)V(e.condition),V(e.consequent),V(e.alternative);else if(e instanceof st){var n=e.definitions.length,i=n-200;for(i<0&&(i=0);i<n;i++)V(e.definitions[i]);}else e instanceof be?(V(e.condition),e.body instanceof De||V(e.body)):e instanceof ze?e.value&&V(e.value):e instanceof Fe?(e.init&&V(e.init),e.condition&&V(e.condition),e.step&&V(e.step),e.body instanceof De||V(e.body)):e instanceof Me?(V(e.object),e.body instanceof De||V(e.body)):e instanceof Qe?(V(e.condition),e.body instanceof De||V(e.body),!e.alternative||e.alternative instanceof De||V(e.alternative)):e instanceof Et?e.expressions.forEach(V):e instanceof he?V(e.body):e instanceof et?(V(e.expression),e.body.forEach(V)):e instanceof vt?"++"!=e.operator&&"--"!=e.operator||u.push(d.slice()):e instanceof ft&&e.value&&(u.push(d.slice()),V(e.value));d.pop();}function B(e){if(!(e instanceof ft&&e.name instanceof Ut)){const t=e[e instanceof Ct?"left":"expression"];return !pi(t,Xt)&&!pi(t,zt)&&t}var n=e.name.definition();if(i(e.name,n.orig)){var r=n.references.length-n.replaced;if(r)return n.orig.length-n.eliminated>1&&!(e.name instanceof Wt)||(r>1?function(e){var t=e.value;if(t instanceof rn&&"arguments"!=t.name){var n=t.definition();if(!n.undeclared)return E=n}}(e):!t.exposed(n))?p(rn,e.name,e.name):void 0}}function K(e){return e[e instanceof Ct?"right":"value"]}function U(e){var n=new Map;if(e instanceof vt)return n;var i=new On((function(e){for(var r=e;r instanceof gt;)r=r.expression;(r instanceof rn||r instanceof un)&&n.set(r.name,n.get(r.name)||ci(t,i,e,e,0));}));return K(e).walk(i),n}function G(n){if(n.name instanceof Wt){var i=t.parent(),r=t.self().argnames,o=r.indexOf(n.name);if(o<0)i.args.length=Math.min(i.args.length,r.length-1);else {var a=i.args;a[o]&&(a[o]=p(pn,a[o],{value:0}));}return !0}var s=!1;return e[c].transform(new Fn((function(e,t,i){return s?e:e===n||e.body===n?(s=!0,e instanceof ft?(e.value=e.name instanceof Xt?p(gn,e.value):null,e):i?f.skip:null):void 0}),(function(e){if(e instanceof Et)switch(e.expressions.length){case 0:return null;case 1:return e.expressions[0]}})))}function H(e){for(;e instanceof gt;)e=e.expression;return e instanceof rn&&e.definition().scope===o&&!(n&&(v.has(e.name)||h instanceof vt||h instanceof Ct&&"="!=h.operator))}function X(e){return e instanceof vt?ki.has(e.operator):K(e).has_side_effects(t)}function z(){if(y)return !1;if(E)return !0;if(S instanceof rn){var e=S.definition();if(e.references.length-e.replaced==(h instanceof ft?1:2))return !0}return !1}function W(e){if(!e.definition)return !0;var t=e.definition();return !(1==t.orig.length&&t.orig[0]instanceof Yt)&&(t.scope.get_defun_scope()!==o||!t.references.every(e=>{var t=e.scope.get_defun_scope();return "Scope"==t.TYPE&&(t=t.parent_scope),t===o}))}}function c(e){for(var t=[],n=0;n<e.length;){var i=e[n];i instanceof Se&&i.body.every(vi)?(a=!0,c(i.body),e.splice(n,1,...i.body),n+=i.body.length):i instanceof ve?(a=!0,e.splice(n,1)):i instanceof me?t.indexOf(i.value)<0?(n++,t.push(i.value)):(a=!0,e.splice(n,1)):n++;}}function l(e,t){for(var n=t.self(),i=function(e){for(var t=0,n=e.length;--n>=0;){var i=e[n];if(i instanceof Qe&&i.body instanceof We&&++t>1)return !0}return !1}(e),r=n instanceof Ie,o=e.length;--o>=0;){var s=e[o],u=S(o),c=e[u];if(r&&!c&&s instanceof We){if(!s.value){a=!0,e.splice(o,1);continue}if(s.value instanceof At&&"void"==s.value.operator){a=!0,e[o]=p(he,s,{body:s.value.expression});continue}}if(s instanceof Qe){var l;if(E(l=zi(s.body))){l.label&&m(l.label.thedef.references,l),a=!0,(s=s.clone()).condition=s.condition.negate(t);var f=D(s.body,l);s.body=p(Se,s,{body:Di(s.alternative).concat(g())}),s.alternative=p(Se,s,{body:f}),e[o]=s.transform(t);continue}if(E(l=zi(s.alternative))){l.label&&m(l.label.thedef.references,l),a=!0,(s=s.clone()).body=p(Se,s.body,{body:Di(s.body).concat(g())});f=D(s.alternative,l);s.alternative=p(Se,s.alternative,{body:f}),e[o]=s.transform(t);continue}}if(s instanceof Qe&&s.body instanceof We){var _=s.body.value;if(!_&&!s.alternative&&(r&&!c||c instanceof We&&!c.value)){a=!0,e[o]=p(he,s.condition,{body:s.condition});continue}if(_&&!s.alternative&&c instanceof We&&c.value){a=!0,(s=s.clone()).alternative=c,e[o]=s.transform(t),e.splice(u,1);continue}if(_&&!s.alternative&&(!c&&r&&i||c instanceof We)){a=!0,(s=s.clone()).alternative=c||p(We,s,{value:null}),e[o]=s.transform(t),c&&e.splice(u,1);continue}var h=e[v(o)];if(t.option("sequences")&&r&&!s.alternative&&h instanceof Qe&&h.body instanceof We&&S(u)==e.length&&c instanceof he){a=!0,(s=s.clone()).alternative=p(Se,c,{body:[c,p(We,c,{value:null})]}),e[o]=s.transform(t),e.splice(u,1);continue}}}function E(i){if(!i)return !1;for(var a=o+1,s=e.length;a<s;a++){var u=e[a];if(u instanceof lt||u instanceof ct)return !1}var c=i instanceof qe?t.loopcontrol_target(i):null;return i instanceof We&&r&&function(e){return !e||e instanceof At&&"void"==e.operator}(i.value)||i instanceof je&&n===Ai(c)||i instanceof $e&&c instanceof Se&&n===c}function g(){var t=e.slice(o+1);return e.length=o+1,t.filter((function(t){return !(t instanceof Be)||(e.push(t),!1)}))}function D(e,t){var n=Di(e).slice(0,-1);return t.value&&n.push(p(he,t.value,{body:t.value.expression})),n}function S(t){for(var n=t+1,i=e.length;n<i;n++){var r=e[n];if(!(r instanceof ut&&d(r)))break}return n}function v(t){for(var n=t;--n>=0;){var i=e[n];if(!(i instanceof ut&&d(i)))break}return n}}function _(e,t){for(var n,i=t.self(),r=0,o=0,s=e.length;r<s;r++){var u=e[r];if(u instanceof qe){var c=t.loopcontrol_target(u);u instanceof $e&&!(c instanceof ye)&&Ai(c)===i||u instanceof je&&Ai(c)===i?u.label&&m(u.label.thedef.references,u):e[o++]=u;}else e[o++]=u;if(zi(u)){n=e.slice(r+1);break}}e.length=o,a=o!=s,n&&n.forEach((function(n){Ri(t,n,e);}));}function d(e){return e.definitions.every(e=>!e.value)}function h(e,t){if(!(e.length<2)){for(var n=[],i=0,r=0,o=e.length;r<o;r++){var s=e[r];if(s instanceof he){n.length>=t.sequences_limit&&c();var u=s.body;n.length>0&&(u=u.drop_side_effect_free(t)),u&&gi(n,u);}else s instanceof st&&d(s)||s instanceof Be||c(),e[i++]=s;}c(),e.length=i,i!=o&&(a=!0);}function c(){if(n.length){var t=mi(n[0],n);e[i++]=p(he,t,{body:t}),n=[];}}}function E(e,t){if(!(e instanceof Se))return e;for(var n=null,i=0,r=e.body.length;i<r;i++){var o=e.body[i];if(o instanceof ut&&d(o))t.push(o);else {if(n)return !1;n=o;}}return n}function g(e,t){function n(e){r--,a=!0;var n=i.body;return mi(n,[n,e]).transform(t)}for(var i,r=0,o=0;o<e.length;o++){var s=e[o];if(i)if(s instanceof ze)s.value=n(s.value||p(gn,s).transform(t));else if(s instanceof Fe){if(!(s.init instanceof st)){yn(i.body,e=>e instanceof xe||(e instanceof yt&&"in"===e.operator?Cn:void 0))||(s.init?s.init=n(s.init):(s.init=i.body,r--,a=!0));}}else s instanceof Me?s.init instanceof lt||s.init instanceof ct||(s.object=n(s.object)):s instanceof Qe?s.condition=n(s.condition):(s instanceof et||s instanceof we)&&(s.expression=n(s.expression));if(t.option("conditionals")&&s instanceof Qe){var u=[],c=E(s.body,u),l=E(s.alternative,u);if(!1!==c&&!1!==l&&u.length>0){var f=u.length;u.push(p(Qe,s,{condition:s.condition,body:c||p(ve,s.body),alternative:l})),u.unshift(r,1),[].splice.apply(e,u),o+=f,r+=f+1,i=null,a=!0;continue}}e[r++]=s,i=s instanceof he?s:null;}e.length=r;}function D(e,n){if(e instanceof st){var i,r=e.definitions[e.definitions.length-1];if(r.value instanceof Mt)if(n instanceof Ct?i=[n]:n instanceof Et&&(i=n.expressions.slice()),i){var a=!1;do{var s=i[0];if(!(s instanceof Ct))break;if("="!=s.operator)break;if(!(s.left instanceof gt))break;var u=s.left.expression;if(!(u instanceof rn))break;if(r.name.name!=u.name)break;if(!s.right.is_constant_expression(o))break;var c=s.left.property;if(c instanceof pe&&(c=c.evaluate(t)),c instanceof pe)break;c=""+c;var l=t.option("ecma")<2015&&t.has_directive("use strict")?function(e){return e.key!=c&&e.key&&e.key.name!=c}:function(e){return e.key&&e.key.name!=c};if(!r.value.properties.every(l))break;var f=r.value.properties.filter((function(e){return e.key===c}))[0];f?f.value=new Et({start:f.start,expressions:[f.value.clone(),s.right.clone()],end:f.end}):r.value.properties.push(p(wt,s,{key:c,value:s.right})),i.shift(),a=!0;}while(i.length);return a&&i}}}function S(e){for(var t,n=0,i=-1,r=e.length;n<r;n++){var o=e[n],s=e[i];if(o instanceof st)s&&s.TYPE==o.TYPE?(s.definitions=s.definitions.concat(o.definitions),a=!0):t&&t.TYPE==o.TYPE&&d(o)?(t.definitions=t.definitions.concat(o.definitions),a=!0):(e[++i]=o,t=o);else if(o instanceof ze)o.value=c(o.value);else if(o instanceof Fe){(u=D(s,o.init))?(a=!0,o.init=u.length?mi(o.init,u):null,e[++i]=o):s instanceof ut&&(!o.init||o.init.TYPE==s.TYPE)?(o.init&&(s.definitions=s.definitions.concat(o.init.definitions)),o.init=s,e[i]=o,a=!0):t&&o.init&&t.TYPE==o.init.TYPE&&d(o.init)?(t.definitions=t.definitions.concat(o.init.definitions),o.init=null,e[++i]=o,a=!0):e[++i]=o;}else if(o instanceof Me)o.object=c(o.object);else if(o instanceof Qe)o.condition=c(o.condition);else if(o instanceof he){var u;if(u=D(s,o.body)){if(a=!0,!u.length)continue;o.body=mi(o.body,u);}e[++i]=o;}else o instanceof et||o instanceof we?o.expression=c(o.expression):e[++i]=o;}function c(t){e[++i]=o;var n=D(s,t);return n?(a=!0,n.length?mi(t,n):t instanceof Et?t.tail_node().left:t.left):t}e.length=i+1;}}function Ri(e,t,n){t instanceof Be||e.warn("Dropping unreachable code [{file}:{line},{col}]",t.start),yn(t,i=>i instanceof ut?(e.warn("Declarations in unreachable code! [{file}:{line},{col}]",i.start),i.remove_initializers(),n.push(i),!0):i instanceof Be&&(i===t||!e.has_directive("use strict"))?(n.push(i===t?i:p(ut,i,{definitions:[p(ft,i,{name:p(Gt,i.name,i.name),value:null})]})),!0):i instanceof xe||void 0);}function wi(e){return e instanceof ln?e.getValue():e instanceof At&&"void"==e.operator&&e.expression instanceof ln?void 0:e}function xi(e,t){return ii(e,8)||e instanceof gn||e instanceof At&&"void"==e.operator&&!e.expression.has_side_effects(t)}!function(e){function t(e){return /strict/.test(e.option("pure_getters"))}pe.DEFMETHOD("may_throw_on_access",(function(e){return !e.option("pure_getters")||this._dot_throw(e)})),e(pe,t),e(hn,u),e(gn,u),e(ln,s),e(Ft,s),e(Mt,(function(e){if(!t(e))return !1;for(var n=this.properties.length;--n>=0;)if(this.properties[n]._dot_throw(e))return !0;return !1})),e(It,s),e(Rt,s),e(Nt,u),e(ke,(function(e){return this.expression._dot_throw(e)})),e(Pe,s),e(Ve,s),e(Tt,s),e(At,(function(){return "void"==this.operator})),e(yt,(function(e){return ("&&"==this.operator||"||"==this.operator||"??"==this.operator)&&(this.left._dot_throw(e)||this.right._dot_throw(e))})),e(Ct,(function(e){return "="==this.operator&&this.right._dot_throw(e)})),e(bt,(function(e){return this.consequent._dot_throw(e)||this.alternative._dot_throw(e)})),e(Dt,(function(e){return !!t(e)&&!(this.expression instanceof Pe&&"prototype"==this.property)})),e(Et,(function(e){return this.tail_node()._dot_throw(e)})),e(rn,(function(e){if("arguments"===this.name)return !1;if(ii(this,8))return !0;if(!t(e))return !1;if(yi(this)&&this.is_declared(e))return !1;if(this.is_immutable())return !1;var n=this.fixed_value();return !n||n._dot_throw(e)}));}((function(e,t){e.DEFMETHOD("_dot_throw",t);})),function(e){const t=E("! delete"),n=E("in instanceof == != === !== < <= >= >");e(pe,s),e(At,(function(){return t.has(this.operator)})),e(yt,(function(){return n.has(this.operator)||Ni.has(this.operator)&&this.left.is_boolean()&&this.right.is_boolean()})),e(bt,(function(){return this.consequent.is_boolean()&&this.alternative.is_boolean()})),e(Ct,(function(){return "="==this.operator&&this.right.is_boolean()})),e(Et,(function(){return this.tail_node().is_boolean()})),e(Tn,u),e(An,u);}((function(e,t){e.DEFMETHOD("is_boolean",t);})),function(e){e(pe,s),e(pn,u);var t=E("+ - ~ ++ --");e(vt,(function(){return t.has(this.operator)}));var n=E("- * / % & | ^ << >> >>>");e(yt,(function(e){return n.has(this.operator)||"+"==this.operator&&this.left.is_number(e)&&this.right.is_number(e)})),e(Ct,(function(e){return n.has(this.operator.slice(0,-1))||"="==this.operator&&this.right.is_number(e)})),e(Et,(function(e){return this.tail_node().is_number(e)})),e(bt,(function(e){return this.consequent.is_number(e)&&this.alternative.is_number(e)}));}((function(e,t){e.DEFMETHOD("is_number",t);})),(Ci=function(e,t){e.DEFMETHOD("is_string",t);})(pe,s),Ci(fn,u),Ci(Ge,u),Ci(At,(function(){return "typeof"==this.operator})),Ci(yt,(function(e){return "+"==this.operator&&(this.left.is_string(e)||this.right.is_string(e))})),Ci(Ct,(function(e){return ("="==this.operator||"+="==this.operator)&&this.right.is_string(e)})),Ci(Et,(function(e){return this.tail_node().is_string(e)})),Ci(bt,(function(e){return this.consequent.is_string(e)&&this.alternative.is_string(e)}));var Ni=E("&& || ??"),ki=E("delete ++ --");function Ii(e,t){return t instanceof vt&&ki.has(t.operator)?t.expression:t instanceof Ct&&t.left===e?e:void 0}function Li(e,t){return e.size()>t.size()?t:e}function Pi(e,t){return Li(p(he,e,{body:e}),p(he,t,{body:t})).body}function Vi(e,t,n){return (In(e)?Pi:Li)(t,n)}function Bi(e){const t=new Map;for(var n of Object.keys(e))t.set(n,E(e[n]));return t}!function(e){function t(e,t){e.warn("global_defs "+t.print_to_string()+" redefined [{file}:{line},{col}]",t.start);}Ne.DEFMETHOD("resolve_defines",(function(e){return e.option("global_defs")?(this.figure_out_scope({ie8:e.option("ie8")}),this.transform(new Fn((function(n){var i=n._find_defs(e,"");if(i){for(var r,o=0,a=n;(r=this.parent(o++))&&r instanceof gt&&r.expression===a;)a=r;if(!Ii(a,r))return i;t(e,n);}})))):this})),e(pe,a),e(Dt,(function(e,t){return this.expression._find_defs(e,"."+this.property+t)})),e(Ut,(function(e){this.global()&&D(e.option("global_defs"),this.name)&&t(e,this);})),e(rn,(function(e,t){if(this.global()){var n=e.option("global_defs"),i=this.name+t;return D(n,i)?function e(t,n){if(t instanceof pe)return p(t.CTOR,n,t);if(Array.isArray(t))return p(Ft,n,{elements:t.map((function(t){return e(t,n)}))});if(t&&"object"==typeof t){var i=[];for(var r in t)D(t,r)&&i.push(p(wt,n,{key:r,value:e(t[r],n)}));return p(Mt,n,{properties:i})}return hi(t,n)}(n[i],this):void 0}}));}((function(e,t){e.DEFMETHOD("_find_defs",t);}));var Ki=["constructor","toString","valueOf"],Ui=Bi({Array:["indexOf","join","lastIndexOf","slice"].concat(Ki),Boolean:Ki,Function:Ki,Number:["toExponential","toFixed","toPrecision"].concat(Ki),Object:Ki,RegExp:["test"].concat(Ki),String:["charAt","charCodeAt","concat","indexOf","italics","lastIndexOf","match","replace","search","slice","split","substr","substring","toLowerCase","toUpperCase","trim"].concat(Ki)}),Gi=Bi({Array:["isArray"],Math:["abs","acos","asin","atan","ceil","cos","exp","floor","log","round","sin","sqrt","tan","atan2","pow","max","min"],Number:["isFinite","isNaN"],Object:["create","getOwnPropertyDescriptor","getOwnPropertyNames","getPrototypeOf","isExtensible","isFrozen","isSealed","keys"],String:["fromCharCode"]});!function(e){pe.DEFMETHOD("evaluate",(function(e){if(!e.option("evaluate"))return this;var t=this._eval(e,1);return !t||t instanceof RegExp?t:"function"==typeof t||"object"==typeof t?this:t}));var t=E("! ~ - + void");pe.DEFMETHOD("is_constant",(function(){return this instanceof ln?!(this instanceof dn):this instanceof At&&this.expression instanceof ln&&t.has(this.operator)})),e(_e,(function(){throw new Error(d("Cannot evaluate a statement [{file}:{line},{col}]",this.start))})),e(Ie,c),e(It,c),e(pe,c),e(ln,(function(){return this.getValue()})),e(_n,c),e(dn,(function(e){let t=e.evaluated_regexps.get(this);if(void 0===t){try{t=(0,eval)(this.print_to_string());}catch(e){t=null;}e.evaluated_regexps.set(this,t);}return t||this})),e(Ge,(function(){return 1!==this.segments.length?this:this.segments[0].value})),e(Pe,(function(e){if(e.option("unsafe")){var t=function(){};return t.node=this,t.toString=function(){return this.node.print_to_string()},t}return this})),e(Ft,(function(e,t){if(e.option("unsafe")){for(var n=[],i=0,r=this.elements.length;i<r;i++){var o=this.elements[i],a=o._eval(e,t);if(o===a)return this;n.push(a);}return n}return this})),e(Mt,(function(e,t){if(e.option("unsafe")){for(var n={},i=0,r=this.properties.length;i<r;i++){var o=this.properties[i];if(o instanceof ke)return this;var a=o.key;if(a instanceof Bt)a=a.name;else if(a instanceof pe&&(a=a._eval(e,t))===o.key)return this;if("function"==typeof Object.prototype[a])return this;if(!(o.value instanceof Pe)&&(n[a]=o.value._eval(e,t),n[a]===o.value))return this}return n}return this}));var n=E("! typeof void");e(At,(function(e,t){var i=this.expression;if(e.option("typeofs")&&"typeof"==this.operator&&(i instanceof Ie||i instanceof rn&&i.fixed_value()instanceof Ie))return "function";if(n.has(this.operator)||t++,(i=i._eval(e,t))===this.expression)return this;switch(this.operator){case"!":return !i;case"typeof":return i instanceof RegExp?this:typeof i;case"void":return;case"~":return ~i;case"-":return -i;case"+":return +i}return this}));var i=E("&& || ?? === !==");e(yt,(function(e,t){i.has(this.operator)||t++;var n=this.left._eval(e,t);if(n===this.left)return this;var r,o=this.right._eval(e,t);if(o===this.right)return this;switch(this.operator){case"&&":r=n&&o;break;case"||":r=n||o;break;case"??":r=null!=n?n:o;break;case"|":r=n|o;break;case"&":r=n&o;break;case"^":r=n^o;break;case"+":r=n+o;break;case"*":r=n*o;break;case"**":r=Math.pow(n,o);break;case"/":r=n/o;break;case"%":r=n%o;break;case"-":r=n-o;break;case"<<":r=n<<o;break;case">>":r=n>>o;break;case">>>":r=n>>>o;break;case"==":r=n==o;break;case"===":r=n===o;break;case"!=":r=n!=o;break;case"!==":r=n!==o;break;case"<":r=n<o;break;case"<=":r=n<=o;break;case">":r=n>o;break;case">=":r=n>=o;break;default:return this}return isNaN(r)&&e.find_parent(we)?this:r})),e(bt,(function(e,t){var n=this.condition._eval(e,t);if(n===this.condition)return this;var i=n?this.consequent:this.alternative,r=i._eval(e,t);return r===i?this:r})),e(rn,(function(e,t){var n,i=this.fixed_value();if(!i)return this;if(D(i,"_eval"))n=i._eval();else {if(this._eval=c,n=i._eval(e,t),delete this._eval,n===i)return this;i._eval=function(){return n};}if(n&&"object"==typeof n){var r=this.definition().escaped;if(r&&t>r)return this}return n}));var r={Array:Array,Math:Math,Number:Number,Object:Object,String:String},o=Bi({Math:["E","LN10","LN2","LOG2E","LOG10E","PI","SQRT1_2","SQRT2"],Number:["MAX_VALUE","MIN_VALUE","NaN","NEGATIVE_INFINITY","POSITIVE_INFINITY"]});e(gt,(function(e,t){if(e.option("unsafe")){var n=this.property;if(n instanceof pe&&(n=n._eval(e,t))===this.property)return this;var i,a=this.expression;if(yi(a)){var s,u="hasOwnProperty"===a.name&&"call"===n&&(s=e.parent()&&e.parent().args)&&s&&s[0]&&s[0].evaluate(e);if(null==(u=u instanceof Dt?u.expression:u)||u.thedef&&u.thedef.undeclared)return this.clone();var c=o.get(a.name);if(!c||!c.has(n))return this;i=r[a.name];}else {if(!(i=a._eval(e,t+1))||i===a||!D(i,n))return this;if("function"==typeof i)switch(n){case"name":return i.node.name?i.node.name.name:"";case"length":return i.node.argnames.length;default:return this}}return i[n]}return this})),e(mt,(function(e,t){var n=this.expression;if(e.option("unsafe")&&n instanceof gt){var i,o=n.property;if(o instanceof pe&&(o=o._eval(e,t))===n.property)return this;var a=n.expression;if(yi(a)){var s="hasOwnProperty"===a.name&&"call"===o&&this.args[0]&&this.args[0].evaluate(e);if(null==(s=s instanceof Dt?s.expression:s)||s.thedef&&s.thedef.undeclared)return this.clone();var u=Gi.get(a.name);if(!u||!u.has(o))return this;i=r[a.name];}else {if((i=a._eval(e,t+1))===a||!i)return this;var c=Ui.get(i.constructor.name);if(!c||!c.has(o))return this}for(var l=[],f=0,p=this.args.length;f<p;f++){var _=this.args[f],d=_._eval(e,t);if(_===d)return this;l.push(d);}try{return i[o].apply(i,l)}catch(t){e.warn("Error evaluating {code} [{file}:{line},{col}]",{code:this.print_to_string(),file:this.start.file,line:this.start.line,col:this.start.col});}}return this})),e(ht,c);}((function(e,t){e.DEFMETHOD("_eval",t);})),function(e){function t(e){return p(At,e,{operator:"!",expression:e})}function n(e,n,i){var r=t(e);if(i){var o=p(he,n,{body:n});return Li(r,o)===o?n:r}return Li(r,n)}e(pe,(function(){return t(this)})),e(_e,(function(){throw new Error("Cannot negate a statement")})),e(Pe,(function(){return t(this)})),e(Ve,(function(){return t(this)})),e(At,(function(){return "!"==this.operator?this.expression:t(this)})),e(Et,(function(e){var t=this.expressions.slice();return t.push(t.pop().negate(e)),mi(this,t)})),e(bt,(function(e,t){var i=this.clone();return i.consequent=i.consequent.negate(e),i.alternative=i.alternative.negate(e),n(this,i,t)})),e(yt,(function(e,i){var r=this.clone(),o=this.operator;if(e.option("unsafe_comps"))switch(o){case"<=":return r.operator=">",r;case"<":return r.operator=">=",r;case">=":return r.operator="<",r;case">":return r.operator="<=",r}switch(o){case"==":return r.operator="!=",r;case"!=":return r.operator="==",r;case"===":return r.operator="!==",r;case"!==":return r.operator="===",r;case"&&":return r.operator="||",r.left=r.left.negate(e,i),r.right=r.right.negate(e),n(this,r,i);case"||":return r.operator="&&",r.left=r.left.negate(e,i),r.right=r.right.negate(e),n(this,r,i);case"??":return r.right=r.right.negate(e),n(this,r,i)}return t(this)}));}((function(e,t){e.DEFMETHOD("negate",(function(e,n){return t.call(this,e,n)}));}));var Hi=E("Boolean decodeURI decodeURIComponent Date encodeURI encodeURIComponent Error escape EvalError isFinite isNaN Number Object parseFloat parseInt RangeError ReferenceError String SyntaxError TypeError unescape URIError");mt.DEFMETHOD("is_expr_pure",(function(e){if(e.option("unsafe")){var t=this.expression,n=this.args&&this.args[0]&&this.args[0].evaluate(e);if(t.expression&&"hasOwnProperty"===t.expression.name&&(null==n||n.thedef&&n.thedef.undeclared))return !1;if(yi(t)&&Hi.has(t.name))return !0;let i;if(t instanceof Dt&&yi(t.expression)&&(i=Gi.get(t.expression.name))&&i.has(t.property))return !0}return !!T(this,Mn)||!e.pure_funcs(this)})),pe.DEFMETHOD("is_call_pure",s),Dt.DEFMETHOD("is_call_pure",(function(e){if(!e.option("unsafe"))return;const t=this.expression;let n;return t instanceof Ft?n=Ui.get("Array"):t.is_boolean()?n=Ui.get("Boolean"):t.is_number(e)?n=Ui.get("Number"):t instanceof dn?n=Ui.get("RegExp"):t.is_string(e)?n=Ui.get("String"):this.may_throw_on_access(e)||(n=Ui.get("Object")),n&&n.has(this.property)}));const Xi=new Set(["Number","String","Array","Object","Function","Promise"]);function zi(e){return e&&e.aborts()}!function(e){function t(e,t){for(var n=e.length;--n>=0;)if(e[n].has_side_effects(t))return !0;return !1}e(pe,u),e(ve,s),e(ln,s),e(un,s),e(De,(function(e){return t(this.body,e)})),e(mt,(function(e){return !(this.is_expr_pure(e)||this.expression.is_call_pure(e)&&!this.expression.has_side_effects(e))||t(this.args,e)})),e(et,(function(e){return this.expression.has_side_effects(e)||t(this.body,e)})),e(it,(function(e){return this.expression.has_side_effects(e)||t(this.body,e)})),e(rt,(function(e){return t(this.body,e)||this.bcatch&&this.bcatch.has_side_effects(e)||this.bfinally&&this.bfinally.has_side_effects(e)})),e(Qe,(function(e){return this.condition.has_side_effects(e)||this.body&&this.body.has_side_effects(e)||this.alternative&&this.alternative.has_side_effects(e)})),e(Te,(function(e){return this.body.has_side_effects(e)})),e(he,(function(e){return this.body.has_side_effects(e)})),e(Ie,s),e(It,(function(e){return !(!this.extends||!this.extends.has_side_effects(e))||t(this.properties,e)})),e(yt,(function(e){return this.left.has_side_effects(e)||this.right.has_side_effects(e)})),e(Ct,u),e(bt,(function(e){return this.condition.has_side_effects(e)||this.consequent.has_side_effects(e)||this.alternative.has_side_effects(e)})),e(vt,(function(e){return ki.has(this.operator)||this.expression.has_side_effects(e)})),e(rn,(function(e){return !this.is_declared(e)&&!Xi.has(this.name)})),e($t,s),e(Ut,s),e(Mt,(function(e){return t(this.properties,e)})),e(Rt,(function(e){return this.computed_key()&&this.key.has_side_effects(e)||this.value.has_side_effects(e)})),e(Lt,(function(e){return this.computed_key()&&this.key.has_side_effects(e)||this.static&&this.value&&this.value.has_side_effects(e)})),e(kt,(function(e){return this.computed_key()&&this.key.has_side_effects(e)})),e(Nt,(function(e){return this.computed_key()&&this.key.has_side_effects(e)})),e(xt,(function(e){return this.computed_key()&&this.key.has_side_effects(e)})),e(Ft,(function(e){return t(this.elements,e)})),e(Dt,(function(e){return this.expression.may_throw_on_access(e)||this.expression.has_side_effects(e)})),e(St,(function(e){return this.expression.may_throw_on_access(e)||this.expression.has_side_effects(e)||this.property.has_side_effects(e)})),e(Et,(function(e){return t(this.expressions,e)})),e(st,(function(e){return t(this.definitions,e)})),e(ft,(function(){return this.value})),e(He,s),e(Ge,(function(e){return t(this.segments,e)}));}((function(e,t){e.DEFMETHOD("has_side_effects",t);})),function(e){function t(e,t){for(var n=e.length;--n>=0;)if(e[n].may_throw(t))return !0;return !1}e(pe,u),e(ln,s),e(ve,s),e(Ie,s),e(Ut,s),e(un,s),e(It,(function(e){return !(!this.extends||!this.extends.may_throw(e))||t(this.properties,e)})),e(Ft,(function(e){return t(this.elements,e)})),e(Ct,(function(e){return !!this.right.may_throw(e)||!(!e.has_directive("use strict")&&"="==this.operator&&this.left instanceof rn)&&this.left.may_throw(e)})),e(yt,(function(e){return this.left.may_throw(e)||this.right.may_throw(e)})),e(De,(function(e){return t(this.body,e)})),e(mt,(function(e){return !!t(this.args,e)||!this.is_expr_pure(e)&&(!!this.expression.may_throw(e)||(!(this.expression instanceof Ie)||t(this.expression.body,e)))})),e(it,(function(e){return this.expression.may_throw(e)||t(this.body,e)})),e(bt,(function(e){return this.condition.may_throw(e)||this.consequent.may_throw(e)||this.alternative.may_throw(e)})),e(st,(function(e){return t(this.definitions,e)})),e(Dt,(function(e){return this.expression.may_throw_on_access(e)||this.expression.may_throw(e)})),e(Qe,(function(e){return this.condition.may_throw(e)||this.body&&this.body.may_throw(e)||this.alternative&&this.alternative.may_throw(e)})),e(Te,(function(e){return this.body.may_throw(e)})),e(Mt,(function(e){return t(this.properties,e)})),e(Rt,(function(e){return this.value.may_throw(e)})),e(Lt,(function(e){return this.computed_key()&&this.key.may_throw(e)||this.static&&this.value&&this.value.may_throw(e)})),e(kt,(function(e){return this.computed_key()&&this.key.may_throw(e)})),e(Nt,(function(e){return this.computed_key()&&this.key.may_throw(e)})),e(xt,(function(e){return this.computed_key()&&this.key.may_throw(e)})),e(We,(function(e){return this.value&&this.value.may_throw(e)})),e(Et,(function(e){return t(this.expressions,e)})),e(he,(function(e){return this.body.may_throw(e)})),e(St,(function(e){return this.expression.may_throw_on_access(e)||this.expression.may_throw(e)||this.property.may_throw(e)})),e(et,(function(e){return this.expression.may_throw(e)||t(this.body,e)})),e(rn,(function(e){return !this.is_declared(e)&&!Xi.has(this.name)})),e($t,s),e(rt,(function(e){return this.bcatch?this.bcatch.may_throw(e):t(this.body,e)||this.bfinally&&this.bfinally.may_throw(e)})),e(vt,(function(e){return !("typeof"==this.operator&&this.expression instanceof rn)&&this.expression.may_throw(e)})),e(ft,(function(e){return !!this.value&&this.value.may_throw(e)}));}((function(e,t){e.DEFMETHOD("may_throw",t);})),function(e){function t(e){let t=!0;return yn(this,n=>{if(n instanceof rn){if(ii(this,16))return t=!1,Cn;var r=n.definition();if(i(r,this.enclosed)&&!this.variables.has(r.name)){if(e){var o=e.find_variable(n);if(r.undeclared?!o:o===r)return t="f",!0}return t=!1,Cn}return !0}if(n instanceof un&&this instanceof Ve)return t=!1,Cn}),t}e(pe,s),e(ln,u),e(It,(function(e){if(this.extends&&!this.extends.is_constant_expression(e))return !1;for(const t of this.properties){if(t.computed_key()&&!t.key.is_constant_expression(e))return !1;if(t.static&&t.value&&!t.value.is_constant_expression(e))return !1}return t.call(this,e)})),e(Ie,t),e(vt,(function(){return this.expression.is_constant_expression()})),e(yt,(function(){return this.left.is_constant_expression()&&this.right.is_constant_expression()})),e(Ft,(function(){return this.elements.every(e=>e.is_constant_expression())})),e(Mt,(function(){return this.properties.every(e=>e.is_constant_expression())})),e(Rt,(function(){return !(this.key instanceof pe)&&this.value.is_constant_expression()}));}((function(e,t){e.DEFMETHOD("is_constant_expression",t);})),function(e){function t(){for(var e=0;e<this.body.length;e++)if(zi(this.body[e]))return this.body[e];return null}e(_e,l),e(Xe,c),e(_t,(function(){return null})),e(Se,t),e(tt,t),e(Qe,(function(){return this.alternative&&zi(this.body)&&zi(this.alternative)&&this}));}((function(e,t){e.DEFMETHOD("aborts",t);}));var Wi=new Set(["use asm","use strict"]);function Yi(e,t){return Mi(e.body,t),t.option("side_effects")&&1==e.body.length&&e.body[0]===t.has_directive("use strict")&&(e.body.length=0),e}si(me,(function(e,t){return !t.option("directives")||Wi.has(e.value)&&t.has_directive(e.value)===e?e:p(ve,e)})),si(de,(function(e,t){return t.option("drop_debugger")?p(ve,e):e})),si(Te,(function(e,t){return e.body instanceof $e&&t.loopcontrol_target(e.body)===e.body?p(ve,e):0==e.label.references.length?e.body:e})),si(De,(function(e,t){return Mi(e.body,t),e})),si(Se,(function(e,t){switch(Mi(e.body,t),e.body.length){case 1:if(!t.has_directive("use strict")&&t.parent()instanceof Qe&&!((n=e.body[0])instanceof lt||n instanceof ct||n instanceof It)||vi(e.body[0]))return e.body[0];break;case 0:return p(ve,e)}var n;return e})),si(Ie,Yi);const qi=/keep_assign/;function $i(e,t){var n=!1,i=new On((function(t){return !!(n||t instanceof xe)||(t instanceof qe&&i.loopcontrol_target(t)===e?n=!0:void 0)}));return t instanceof Te&&i.push(t),i.push(e),e.body.walk(i),n}function ji(e,t){return t.top_retain&&e instanceof Be&&ii(e,1024)&&e.name&&t.top_retain(e.name)}xe.DEFMETHOD("drop_unused",(function(e){if(!e.option("unused"))return;if(e.has_directive("use asm"))return;var t=this;if(t.pinned())return;var n=!(t instanceof Ne)||e.toplevel.funcs,i=!(t instanceof Ne)||e.toplevel.vars;const r=qi.test(e.option("unused"))?s:function(e){return e instanceof Ct&&(ii(e,32)||"="==e.operator)?e.left:e instanceof vt&&ii(e,32)?e.expression:void 0};var o=new Map,a=new Map;t instanceof Ne&&e.top_retain&&t.variables.forEach((function(t){e.top_retain(t)&&!o.has(t.id)&&o.set(t.id,t);}));var u=new Map,c=new Map,l=this,_=new On((function(r,s){if(r instanceof Ie&&r.uses_arguments&&!_.has_directive("use strict")&&r.argnames.forEach((function(e){if(e instanceof Ut){var t=e.definition();o.has(t.id)||o.set(t.id,t);}})),r!==t){if(r instanceof Be||r instanceof Pt){var f=r.name.definition();if((_.parent()instanceof dt||!n&&l===t)&&f.global&&!o.has(f.id)&&o.set(f.id,f),r instanceof Pt){r.extends&&(r.extends.has_side_effects(e)||r.extends.may_throw(e))&&r.extends.walk(_);for(const t of r.properties)(t.has_side_effects(e)||t.may_throw(e))&&t.walk(_);}return g(c,f.id,r),!0}if(r instanceof Wt&&l===t&&g(u,r.definition().id,r),r instanceof st&&l===t){const t=_.parent()instanceof dt;return r.definitions.forEach((function(n){if(n.name instanceof Gt&&g(u,n.name.definition().id,n),!t&&i||yn(n.name,e=>{if(e instanceof Ut){const n=e.definition();!t&&!n.global||o.has(n.id)||o.set(n.id,n);}}),n.value){if(n.name instanceof Ke)n.walk(_);else {var r=n.name.definition();g(c,r.id,n.value),r.chained||n.name.fixed_value()!==n.value||a.set(r.id,n);}n.value.has_side_effects(e)&&n.value.walk(_);}})),!0}return h(r,s)}}));t.walk(_),_=new On(h),o.forEach((function(e){var t=c.get(e.id);t&&t.forEach((function(e){e.walk(_);}));}));var d=new Fn((function(s,c,_){var h=d.parent();if(i){const e=r(s);if(e instanceof rn){var E=e.definition(),g=o.has(E.id);if(s instanceof Ct){if(!g||a.has(E.id)&&a.get(E.id)!==s)return Ei(h,s,s.right.transform(d))}else if(!g)return _?f.skip:p(pn,s,{value:0})}}if(l===t){if(s.name&&(s instanceof Vt&&!S(e.option("keep_classnames"),(E=s.name.definition()).name)||s instanceof Pe&&!S(e.option("keep_fnames"),(E=s.name.definition()).name))&&(!o.has(E.id)||E.orig.length>1)&&(s.name=null),s instanceof Ie&&!(s instanceof Le))for(var D=!e.option("keep_fargs"),v=s.argnames,A=v.length;--A>=0;){var T=v[A];T instanceof ke&&(T=T.expression),T instanceof Ot&&(T=T.left),T instanceof Ke||o.has(T.definition().id)?D=!1:(ri(T,1),D&&(v.pop(),e[T.unreferenced()?"warn":"info"]("Dropping unused function argument {name} [{file}:{line},{col}]",R(T))));}if((s instanceof Be||s instanceof Pt)&&s!==t){const t=s.name.definition();if(!(t.global&&!n||o.has(t.id))){if(e[s.name.unreferenced()?"warn":"info"]("Dropping unused function {name} [{file}:{line},{col}]",R(s.name)),t.eliminated++,s instanceof Pt){const t=s.drop_side_effect_free(e);if(t)return p(he,s,{body:t})}return _?f.skip:p(ve,s)}}if(s instanceof st&&!(h instanceof Me&&h.init===s)){var y=!(h instanceof Ne||s instanceof ut),b=[],C=[],O=[],F=[];switch(s.definitions.forEach((function(t){t.value&&(t.value=t.value.transform(d));var n=t.name instanceof Ke,r=n?new zn(null,{name:"<destructure>"}):t.name.definition();if(y&&r.global)return O.push(t);if(!i&&!y||n&&(t.name.names.length||t.name.is_array||1!=e.option("pure_getters"))||o.has(r.id)){if(t.value&&a.has(r.id)&&a.get(r.id)!==t&&(t.value=t.value.drop_side_effect_free(e)),t.name instanceof Gt){var c=u.get(r.id);if(c.length>1&&(!t.value||r.orig.indexOf(t.name)>r.eliminated)){if(e.warn("Dropping duplicated definition of variable {name} [{file}:{line},{col}]",R(t.name)),t.value){var l=p(rn,t.name,t.name);r.references.push(l);var f=p(Ct,t,{operator:"=",left:l,right:t.value});a.get(r.id)===t&&a.set(r.id,f),F.push(f.transform(d));}return m(c,t),void r.eliminated++}}t.value?(F.length>0&&(O.length>0?(F.push(t.value),t.value=mi(t.value,F)):b.push(p(he,s,{body:mi(s,F)})),F=[]),O.push(t)):C.push(t);}else if(r.orig[0]instanceof Qt){(_=t.value&&t.value.drop_side_effect_free(e))&&F.push(_),t.value=null,C.push(t);}else {var _;(_=t.value&&t.value.drop_side_effect_free(e))?(n||e.warn("Side effects in initialization of unused variable {name} [{file}:{line},{col}]",R(t.name)),F.push(_)):n||e[t.name.unreferenced()?"warn":"info"]("Dropping unused variable {name} [{file}:{line},{col}]",R(t.name)),r.eliminated++;}})),(C.length>0||O.length>0)&&(s.definitions=C.concat(O),b.push(s)),F.length>0&&b.push(p(he,s,{body:mi(s,F)})),b.length){case 0:return _?f.skip:p(ve,s);case 1:return b[0];default:return _?f.splice(b):p(Se,s,{body:b})}}if(s instanceof Fe)return c(s,this),s.init instanceof Se&&(M=s.init,s.init=M.body.pop(),M.body.push(s)),s.init instanceof he?s.init=s.init.body:Si(s.init)&&(s.init=null),M?_?f.splice(M.body):M:s;if(s instanceof Te&&s.body instanceof Fe){if(c(s,this),s.body instanceof Se){var M=s.body;return s.body=M.body.pop(),M.body.push(s),_?f.splice(M.body):M}return s}if(s instanceof Se)return c(s,this),_&&s.body.every(vi)?f.splice(s.body):s;if(s instanceof xe){const e=l;return l=s,c(s,this),l=e,s}}function R(e){return {name:e.name,file:e.start.file,line:e.start.line,col:e.start.col}}}));function h(e,n){var i;const s=r(e);if(s instanceof rn&&!pi(e.left,Ht)&&t.variables.get(s.name)===(i=s.definition()))return e instanceof Ct&&(e.right.walk(_),i.chained||e.left.fixed_value()!==e.right||a.set(i.id,e)),!0;if(e instanceof rn){if(i=e.definition(),!o.has(i.id)&&(o.set(i.id,i),i.orig[0]instanceof Qt)){const e=i.scope.is_block_scope()&&i.scope.get_defun_scope().variables.get(i.name);e&&o.set(e.id,e);}return !0}if(e instanceof xe){var u=l;return l=e,n(),l=u,!0}}t.transform(d);})),xe.DEFMETHOD("hoist_declarations",(function(e){var t=this;if(e.has_directive("use asm"))return t;if(!Array.isArray(t.body))return t;var n=e.option("hoist_funs"),i=e.option("hoist_vars");if(n||i){var r=[],o=[],a=new Map,s=0,u=0;yn(t,e=>e instanceof xe&&e!==t||(e instanceof ut?(++u,!0):void 0)),i=i&&u>1;var c=new Fn((function(u){if(u!==t){if(u instanceof me)return r.push(u),p(ve,u);if(n&&u instanceof Be&&!(c.parent()instanceof dt)&&c.parent()===t)return o.push(u),p(ve,u);if(i&&u instanceof ut){u.definitions.forEach((function(e){e.name instanceof Ke||(a.set(e.name.name,e),++s);}));var l=u.to_assignments(e),f=c.parent();if(f instanceof Me&&f.init===u){if(null==l){var _=u.definitions[0].name;return p(rn,_,_)}return l}return f instanceof Fe&&f.init===u?l:l?p(he,u,{body:l}):p(ve,u)}if(u instanceof xe)return u}}));if(t=t.transform(c),s>0){var l=[];const e=t instanceof Ie,n=e?t.args_as_names():null;if(a.forEach((t,i)=>{e&&n.some(e=>e.name===t.name.name)?a.delete(i):((t=t.clone()).value=null,l.push(t),a.set(i,t));}),l.length>0){for(var f=0;f<t.body.length;){if(t.body[f]instanceof he){var _,d,h=t.body[f].body;if(h instanceof Ct&&"="==h.operator&&(_=h.left)instanceof Bt&&a.has(_.name)){if((E=a.get(_.name)).value)break;E.value=h.right,m(l,E),l.push(E),t.body.splice(f,1);continue}if(h instanceof Et&&(d=h.expressions[0])instanceof Ct&&"="==d.operator&&(_=d.left)instanceof Bt&&a.has(_.name)){var E;if((E=a.get(_.name)).value)break;E.value=d.right,m(l,E),l.push(E),t.body[f].body=mi(h,h.expressions.slice(1));continue}}if(t.body[f]instanceof ve)t.body.splice(f,1);else {if(!(t.body[f]instanceof Se))break;var g=[f,1].concat(t.body[f].body);t.body.splice.apply(t.body,g);}}l=p(ut,t,{definitions:l}),o.push(l);}}t.body=r.concat(o,t.body);}return t})),xe.DEFMETHOD("make_var_name",(function(e){for(var t=this.var_names(),n=e=e.replace(/(?:^[^a-z_$]|[^a-z0-9_$])/gi,"_"),i=0;t.has(n);i++)n=e+"$"+i;return this.add_var_name(n),n})),xe.DEFMETHOD("hoist_properties",(function(e){var t=this;if(!e.option("hoist_props")||e.has_directive("use asm"))return t;var n=t instanceof Ne&&e.top_retain||s,i=new Map,r=new Fn((function(o,a){if(o instanceof st&&r.parent()instanceof dt)return o;if(o instanceof ft){const r=o.name;let u,c;if(r.scope===t&&1!=(u=r.definition()).escaped&&!u.assignments&&!u.direct_access&&!u.single_use&&!e.exposed(u)&&!n(u)&&(c=r.fixed_value())===o.value&&c instanceof Mt&&c.properties.every(e=>"string"==typeof e.key)){a(o,this);const e=new Map,t=[];return c.properties.forEach((function(n){t.push(p(ft,o,{name:s(r,n.key,e),value:n.value}));})),i.set(u.id,e),f.splice(t)}}else if(o instanceof gt&&o.expression instanceof rn){const e=i.get(o.expression.definition().id);if(e){const t=e.get(String(wi(o.property))),n=p(rn,o,{name:t.name,scope:o.expression.scope,thedef:t});return n.reference({}),n}}function s(e,n,i){const r=p(e.CTOR,e,{name:t.make_var_name(e.name+"_"+n),scope:t}),o=t.def_variable(r);return i.set(String(n),o),t.enclosed.push(o),r}}));return t.transform(r)})),function(e){function t(e,t,n){var i=e.length;if(!i)return null;for(var r=[],o=!1,a=0;a<i;a++){var s=e[a].drop_side_effect_free(t,n);o|=s!==e[a],s&&(r.push(s),n=!1);}return o?r.length?r:null:e}e(pe,c),e(ln,l),e(un,l),e(mt,(function(e,n){if(!this.is_expr_pure(e)){if(this.expression.is_call_pure(e)){var i=this.args.slice();return i.unshift(this.expression.expression),(i=t(i,e,n))&&mi(this,i)}if(li(this.expression)&&(!this.expression.name||!this.expression.name.definition().references.length)){var r=this.clone();return r.expression.process_expression(!1,e),r}return this}T(this,Mn)&&e.warn("Dropping __PURE__ call [{file}:{line},{col}]",this.start);var o=t(this.args,e,n);return o&&mi(this,o)})),e(Le,l),e(Pe,l),e(Ve,l),e(It,(function(e){const t=[],n=this.extends&&this.extends.drop_side_effect_free(e);n&&t.push(n);for(const n of this.properties){const i=n.drop_side_effect_free(e);i&&t.push(i);}return t.length?mi(this,t):null})),e(yt,(function(e,t){var n=this.right.drop_side_effect_free(e);if(!n)return this.left.drop_side_effect_free(e,t);if(Ni.has(this.operator)){if(n===this.right)return this;var i=this.clone();return i.right=n,i}var r=this.left.drop_side_effect_free(e,t);return r?mi(this,[r,n]):this.right.drop_side_effect_free(e,t)})),e(Ct,(function(e){var t=this.left;if(t.has_side_effects(e)||e.has_directive("use strict")&&t instanceof gt&&t.expression.is_constant())return this;for(ri(this,32);t instanceof gt;)t=t.expression;return t.is_constant_expression(e.find_parent(xe))?this.right.drop_side_effect_free(e):this})),e(bt,(function(e){var t=this.consequent.drop_side_effect_free(e),n=this.alternative.drop_side_effect_free(e);if(t===this.consequent&&n===this.alternative)return this;if(!t)return n?p(yt,this,{operator:"||",left:this.condition,right:n}):this.condition.drop_side_effect_free(e);if(!n)return p(yt,this,{operator:"&&",left:this.condition,right:t});var i=this.clone();return i.consequent=t,i.alternative=n,i})),e(vt,(function(e,t){if(ki.has(this.operator))return this.expression.has_side_effects(e)?oi(this,32):ri(this,32),this;if("typeof"==this.operator&&this.expression instanceof rn)return null;var n=this.expression.drop_side_effect_free(e,t);return t&&n&&Ti(n)?n===this.expression&&"!"==this.operator?this:n.negate(e,t):n})),e(rn,(function(e){return this.is_declared(e)||Xi.has(this.name)?null:this})),e(Mt,(function(e,n){var i=t(this.properties,e,n);return i&&mi(this,i)})),e(Rt,(function(e,t){const n=this instanceof wt&&this.key instanceof pe&&this.key.drop_side_effect_free(e,t),i=this.value.drop_side_effect_free(e,t);return n&&i?mi(this,[n,i]):n||i})),e(Lt,(function(e){const t=this.computed_key()&&this.key.drop_side_effect_free(e),n=this.static&&this.value&&this.value.drop_side_effect_free(e);return t&&n?mi(this,[t,n]):t||n||null})),e(kt,(function(){return this.computed_key()?this.key:null})),e(Nt,(function(){return this.computed_key()?this.key:null})),e(xt,(function(){return this.computed_key()?this.key:null})),e(Ft,(function(e,n){var i=t(this.elements,e,n);return i&&mi(this,i)})),e(Dt,(function(e,t){return this.expression.may_throw_on_access(e)?this:this.expression.drop_side_effect_free(e,t)})),e(St,(function(e,t){if(this.expression.may_throw_on_access(e))return this;var n=this.expression.drop_side_effect_free(e,t);if(!n)return this.property.drop_side_effect_free(e,t);var i=this.property.drop_side_effect_free(e);return i?mi(this,[n,i]):n})),e(Et,(function(e){var t=this.tail_node(),n=t.drop_side_effect_free(e);if(n===t)return this;var i=this.expressions.slice(0,-1);return n&&i.push(n),i.length?mi(this,i):p(pn,this,{value:0})})),e(ke,(function(e,t){return this.expression.drop_side_effect_free(e,t)})),e(He,l),e(Ge,(function(e){var n=t(this.segments,e,In);return n&&mi(this,n)}));}((function(e,t){e.DEFMETHOD("drop_side_effect_free",t);})),si(he,(function(e,t){if(t.option("side_effects")){var n=e.body,i=n.drop_side_effect_free(t,!0);if(!i)return t.warn("Dropping side-effect-free statement [{file}:{line},{col}]",e.start),p(ve,e);if(i!==n)return p(he,e,{body:i})}return e})),si(Oe,(function(e,t){return t.option("loops")?p(Fe,e,e).optimize(t):e})),si(Ce,(function(e,t){if(!t.option("loops"))return e;var n=e.condition.tail_node().evaluate(t);if(!(n instanceof pe)){if(n)return p(Fe,e,{body:p(Se,e.body,{body:[e.body,p(he,e.condition,{body:e.condition})]})}).optimize(t);if(!$i(e,t.parent()))return p(Se,e.body,{body:[e.body,p(he,e.condition,{body:e.condition})]}).optimize(t)}return e})),si(Fe,(function(e,t){if(!t.option("loops"))return e;if(t.option("side_effects")&&e.init&&(e.init=e.init.drop_side_effect_free(t)),e.condition){var n=e.condition.evaluate(t);if(!(n instanceof pe))if(n)e.condition=null;else if(!t.option("dead_code")){var i=e.condition;e.condition=hi(n,e.condition),e.condition=Li(e.condition.transform(t),i);}if(t.option("dead_code")&&(n instanceof pe&&(n=e.condition.tail_node().evaluate(t)),!n)){var r=[];return Ri(t,e.body,r),e.init instanceof _e?r.push(e.init):e.init&&r.push(p(he,e.init,{body:e.init})),r.push(p(he,e.condition,{body:e.condition})),p(Se,e,{body:r}).optimize(t)}}return function e(t,n){var i=t.body instanceof Se?t.body.body[0]:t.body;if(n.option("dead_code")&&o(i)){var r=[];return t.init instanceof _e?r.push(t.init):t.init&&r.push(p(he,t.init,{body:t.init})),t.condition&&r.push(p(he,t.condition,{body:t.condition})),Ri(n,t.body,r),p(Se,t,{body:r})}return i instanceof Qe&&(o(i.body)?(t.condition?t.condition=p(yt,t.condition,{left:t.condition,operator:"&&",right:i.condition.negate(n)}):t.condition=i.condition.negate(n),a(i.alternative)):o(i.alternative)&&(t.condition?t.condition=p(yt,t.condition,{left:t.condition,operator:"&&",right:i.condition}):t.condition=i.condition,a(i.body))),t;function o(e){return e instanceof $e&&n.loopcontrol_target(e)===n.self()}function a(i){i=Di(i),t.body instanceof Se?(t.body=t.body.clone(),t.body.body=i.concat(t.body.body.slice(1)),t.body=t.body.transform(n)):t.body=p(Se,t.body,{body:i}).transform(n),t=e(t,n);}}(e,t)})),si(Qe,(function(e,t){if(Si(e.alternative)&&(e.alternative=null),!t.option("conditionals"))return e;var n=e.condition.evaluate(t);if(!(t.option("dead_code")||n instanceof pe)){var i=e.condition;e.condition=hi(n,i),e.condition=Li(e.condition.transform(t),i);}if(t.option("dead_code")){if(n instanceof pe&&(n=e.condition.tail_node().evaluate(t)),!n){t.warn("Condition always false [{file}:{line},{col}]",e.condition.start);var r=[];return Ri(t,e.body,r),r.push(p(he,e.condition,{body:e.condition})),e.alternative&&r.push(e.alternative),p(Se,e,{body:r}).optimize(t)}if(!(n instanceof pe))return t.warn("Condition always true [{file}:{line},{col}]",e.condition.start),(r=[]).push(p(he,e.condition,{body:e.condition})),r.push(e.body),e.alternative&&Ri(t,e.alternative,r),p(Se,e,{body:r}).optimize(t)}var o=e.condition.negate(t),a=e.condition.size(),s=o.size(),u=s<a;if(e.alternative&&u){u=!1,e.condition=o;var c=e.body;e.body=e.alternative||p(ve,e),e.alternative=c;}if(Si(e.body)&&Si(e.alternative))return p(he,e.condition,{body:e.condition.clone()}).optimize(t);if(e.body instanceof he&&e.alternative instanceof he)return p(he,e,{body:p(bt,e,{condition:e.condition,consequent:e.body.body,alternative:e.alternative.body})}).optimize(t);if(Si(e.alternative)&&e.body instanceof he)return a===s&&!u&&e.condition instanceof yt&&"||"==e.condition.operator&&(u=!0),u?p(he,e,{body:p(yt,e,{operator:"||",left:o,right:e.body.body})}).optimize(t):p(he,e,{body:p(yt,e,{operator:"&&",left:e.condition,right:e.body.body})}).optimize(t);if(e.body instanceof ve&&e.alternative instanceof he)return p(he,e,{body:p(yt,e,{operator:"||",left:e.condition,right:e.alternative.body})}).optimize(t);if(e.body instanceof ze&&e.alternative instanceof ze&&e.body.TYPE==e.alternative.TYPE)return p(e.body.CTOR,e,{value:p(bt,e,{condition:e.condition,consequent:e.body.value||p(gn,e.body),alternative:e.alternative.value||p(gn,e.alternative)}).transform(t)}).optimize(t);if(e.body instanceof Qe&&!e.body.alternative&&!e.alternative&&(e=p(Qe,e,{condition:p(yt,e.condition,{operator:"&&",left:e.condition,right:e.body.condition}),body:e.body.body,alternative:null})),zi(e.body)&&e.alternative){var l=e.alternative;return e.alternative=null,p(Se,e,{body:[e,l]}).optimize(t)}if(zi(e.alternative)){r=e.body;return e.body=e.alternative,e.condition=u?o:e.condition.negate(t),e.alternative=null,p(Se,e,{body:[e,r]}).optimize(t)}return e})),si(et,(function(e,t){if(!t.option("switches"))return e;var n,i=e.expression.evaluate(t);if(!(i instanceof pe)){var r=e.expression;e.expression=hi(i,r),e.expression=Li(e.expression.transform(t),r);}if(!t.option("dead_code"))return e;i instanceof pe&&(i=e.expression.tail_node().evaluate(t));for(var o,a,s=[],u=[],c=0,l=e.body.length;c<l&&!a;c++){if((n=e.body[c])instanceof nt)o?D(n,u[u.length-1]):o=n;else if(!(i instanceof pe)){if(!((E=n.expression.evaluate(t))instanceof pe)&&E!==i){D(n,u[u.length-1]);continue}if(E instanceof pe&&(E=n.expression.tail_node().evaluate(t)),E===i&&(a=n,o)){var f=u.indexOf(o);u.splice(f,1),D(o,u[f-1]),o=null;}}if(zi(n)){var _=u[u.length-1];zi(_)&&_.body.length==n.body.length&&p(Se,_,_).equivalent_to(p(Se,n,n))&&(_.body=[]);}u.push(n);}for(;c<l;)D(e.body[c++],u[u.length-1]);for(u.length>0&&(u[0].body=s.concat(u[0].body)),e.body=u;n=u[u.length-1];){var d=n.body[n.body.length-1];if(d instanceof $e&&t.loopcontrol_target(d)===e&&n.body.pop(),n.body.length||n instanceof it&&(o||n.expression.has_side_effects(t)))break;u.pop()===o&&(o=null);}if(0==u.length)return p(Se,e,{body:s.concat(p(he,e.expression,{body:e.expression}))}).optimize(t);if(1==u.length&&(u[0]===a||u[0]===o)){var m=!1,h=new On((function(t){if(m||t instanceof Ie||t instanceof he)return !0;t instanceof $e&&h.loopcontrol_target(t)===e&&(m=!0);}));if(e.walk(h),!m){var E,g=u[0].body.slice();return (E=u[0].expression)&&g.unshift(p(he,E,{body:E})),g.unshift(p(he,e.expression,{body:e.expression})),p(Se,e,{body:g}).optimize(t)}}return e;function D(e,n){n&&!zi(n)?n.body=n.body.concat(e.body):Ri(t,e,s);}})),si(rt,(function(e,t){if(Mi(e.body,t),e.bcatch&&e.bfinally&&e.bfinally.body.every(Si)&&(e.bfinally=null),t.option("dead_code")&&e.body.every(Si)){var n=[];return e.bcatch&&Ri(t,e.bcatch,n),e.bfinally&&n.push(...e.bfinally.body),p(Se,e,{body:n}).optimize(t)}return e})),st.DEFMETHOD("remove_initializers",(function(){var e=[];this.definitions.forEach((function(t){t.name instanceof Ut?(t.value=null,e.push(t)):yn(t.name,n=>{n instanceof Ut&&e.push(p(ft,t,{name:n,value:null}));});})),this.definitions=e;})),st.DEFMETHOD("to_assignments",(function(e){var t=e.option("reduce_vars"),n=this.definitions.reduce((function(e,n){if(!n.value||n.name instanceof Ke){if(n.value){var i=p(ft,n,{name:n.name,value:n.value}),r=p(ut,n,{definitions:[i]});e.push(r);}}else {var o=p(rn,n.name,n.name);e.push(p(Ct,n,{operator:"=",left:o,right:n.value})),t&&(o.definition().fixed=!1);}return (n=n.name.definition()).eliminated++,n.replaced--,e}),[]);return 0==n.length?null:mi(this,n)})),si(st,(function(e){return 0==e.definitions.length?p(ve,e):e})),si(_t,(function(e){return e})),si(mt,(function(e,t){var n=e.expression,i=n;sr(e,t,e.args);var r=e.args.every(e=>!(e instanceof ke));if(t.option("reduce_vars")&&i instanceof rn&&!T(e,wn)){const e=i.fixed_value();ji(e,t)||(i=e);}var o=i instanceof Ie;if(t.option("unused")&&r&&o&&!i.uses_arguments&&!i.pinned()){for(var a=0,s=0,u=0,c=e.args.length;u<c;u++){if(i.argnames[u]instanceof ke){if(ii(i.argnames[u].expression,1))for(;u<c;){(D=e.args[u++].drop_side_effect_free(t))&&(e.args[a++]=D);}else for(;u<c;)e.args[a++]=e.args[u++];s=a;break}var l=u>=i.argnames.length;if(l||ii(i.argnames[u],1)){if(D=e.args[u].drop_side_effect_free(t))e.args[a++]=D;else if(!l){e.args[a++]=p(pn,e.args[u],{value:0});continue}}else e.args[a++]=e.args[u];s=a;}e.args.length=s;}if(t.option("unsafe"))if(yi(n))switch(n.name){case"Array":if(1!=e.args.length)return p(Ft,e,{elements:e.args}).optimize(t);if(e.args[0]instanceof pn&&e.args[0].value<=11){const t=[];for(let n=0;n<e.args[0].value;n++)t.push(new Dn);return new Ft({elements:t})}break;case"Object":if(0==e.args.length)return p(Mt,e,{properties:[]});break;case"String":if(0==e.args.length)return p(fn,e,{value:""});if(e.args.length<=1)return p(yt,e,{left:e.args[0],operator:"+",right:p(fn,e,{value:""})}).optimize(t);break;case"Number":if(0==e.args.length)return p(pn,e,{value:0});if(1==e.args.length&&t.option("unsafe_math"))return p(At,e,{expression:e.args[0],operator:"+"}).optimize(t);break;case"Symbol":1==e.args.length&&e.args[0]instanceof fn&&t.option("unsafe_symbols")&&(e.args.length=0);break;case"Boolean":if(0==e.args.length)return p(An,e);if(1==e.args.length)return p(At,e,{expression:p(At,e,{expression:e.args[0],operator:"!"}),operator:"!"}).optimize(t);break;case"RegExp":var f=[];if(e.args.length>=1&&e.args.length<=2&&e.args.every(e=>{var n=e.evaluate(t);return f.push(n),e!==n})){let[n,i]=f;n=A(new RegExp(n).source);const r=p(dn,e,{value:{source:n,flags:i}});if(r._eval(t)!==r)return r;t.warn("Error converting {expr} [{file}:{line},{col}]",{expr:e.print_to_string(),file:e.start.file,line:e.start.line,col:e.start.col});}}else if(n instanceof Dt)switch(n.property){case"toString":if(0==e.args.length&&!n.expression.may_throw_on_access(t))return p(yt,e,{left:p(fn,e,{value:""}),operator:"+",right:n.expression}).optimize(t);break;case"join":if(n.expression instanceof Ft)e:{var _;if(!(e.args.length>0&&(_=e.args[0].evaluate(t))===e.args[0])){var d,m=[],h=[];for(u=0,c=n.expression.elements.length;u<c;u++){var E=n.expression.elements[u];if(E instanceof ke)break e;var g=E.evaluate(t);g!==E?h.push(g):(h.length>0&&(m.push(p(fn,e,{value:h.join(_)})),h.length=0),m.push(E));}return h.length>0&&m.push(p(fn,e,{value:h.join(_)})),0==m.length?p(fn,e,{value:""}):1==m.length?m[0].is_string(t)?m[0]:p(yt,m[0],{operator:"+",left:p(fn,e,{value:""}),right:m[0]}):""==_?(d=m[0].is_string(t)||m[1].is_string(t)?m.shift():p(fn,e,{value:""}),m.reduce((function(e,t){return p(yt,t,{operator:"+",left:e,right:t})}),d).optimize(t)):((D=e.clone()).expression=D.expression.clone(),D.expression.expression=D.expression.expression.clone(),D.expression.expression.elements=m,Vi(t,e,D));var D;}}break;case"charAt":if(n.expression.is_string(t)){var S=e.args[0],v=S?S.evaluate(t):0;if(v!==S)return p(St,n,{expression:n.expression,property:hi(0|v,S||n)}).optimize(t)}break;case"apply":if(2==e.args.length&&e.args[1]instanceof Ft)return (L=e.args[1].elements.slice()).unshift(e.args[0]),p(mt,e,{expression:p(Dt,n,{expression:n.expression,property:"call"}),args:L}).optimize(t);break;case"call":var y=n.expression;if(y instanceof rn&&(y=y.fixed_value()),y instanceof Ie&&!y.contains_this())return (e.args.length?mi(this,[e.args[0],p(mt,e,{expression:n.expression,args:e.args.slice(1)})]):p(mt,e,{expression:n.expression,args:[]})).optimize(t)}if(t.option("unsafe_Function")&&yi(n)&&"Function"==n.name){if(0==e.args.length)return p(Pe,e,{argnames:[],body:[]}).optimize(t);if(e.args.every(e=>e instanceof fn))try{var b=ce(M="n(function("+e.args.slice(0,-1).map((function(e){return e.value})).join(",")+"){"+e.args[e.args.length-1].value+"})"),C={ie8:t.option("ie8")};b.figure_out_scope(C);var O,F=new ai(t.options);(b=b.transform(F)).figure_out_scope(C),qn.reset(),b.compute_char_frequency(C),b.mangle_names(C),yn(b,e=>{if(li(e))return O=e,Cn});var M=Bn();return Se.prototype._codegen.call(O,O,M),e.args=[p(fn,e,{value:O.argnames.map((function(e){return e.print_to_string()})).join(",")}),p(fn,e.args[e.args.length-1],{value:M.get().replace(/^{|}$/g,"")})],e}catch(n){if(!(n instanceof Q))throw n;t.warn("Error parsing code passed to new Function [{file}:{line},{col}]",e.args[e.args.length-1].start),t.warn(n.toString());}}var R=o&&i.body[0],w=o&&!i.is_generator&&!i.async,x=w&&t.option("inline")&&!e.is_expr_pure(t);if(x&&R instanceof We){let n=R.value;if(!n||n.is_constant_expression()){n=n?n.clone(!0):p(gn,e);const i=e.args.concat(n);return mi(e,i).optimize(t)}if(1===i.argnames.length&&i.argnames[0]instanceof Wt&&e.args.length<2&&n instanceof rn&&n.name===i.argnames[0].name){let n;return e.args[0]instanceof gt&&(n=t.parent())instanceof mt&&n.expression===e?mi(e,[p(pn,e,{value:0}),e.args[0].optimize(t)]):(e.args[0]||p(gn)).optimize(t)}}if(x){var N,k,I=-1;let o,a,s;if(r&&!i.uses_arguments&&!i.pinned()&&!(t.parent()instanceof It)&&!(i.name&&i instanceof Pe)&&(a=function(e){var n=i.body,r=n.length;if(t.option("inline")<3)return 1==r&&V(e);e=null;for(var o=0;o<r;o++){var a=n[o];if(a instanceof ut){if(e&&!a.definitions.every(e=>!e.value))return !1}else {if(e)return !1;a instanceof ve||(e=a);}}return V(e)}(R))&&(n===i||T(e,Rn)||t.option("unused")&&1==(o=n.definition()).references.length&&!Ji(t,o)&&i.is_constant_expression(n.scope))&&!T(e,Mn|wn)&&!i.contains_this()&&function(){var n=new Set;do{if((N=t.parent(++I)).is_block_scope()&&N.block_scope&&N.block_scope.variables.forEach((function(e){n.add(e.name);})),N instanceof ot)N.argname&&n.add(N.argname.name);else if(N instanceof ye)k=[];else if(N instanceof rn&&N.fixed_value()instanceof xe)return !1}while(!(N instanceof xe));var r=!(N instanceof Ne)||t.toplevel.vars,o=t.option("inline");return !!function(e,t){for(var n=i.body.length,r=0;r<n;r++){var o=i.body[r];if(o instanceof ut){if(!t)return !1;for(var a=o.definitions.length;--a>=0;){var s=o.definitions[a].name;if(s instanceof Ke||e.has(s.name)||Oi.has(s.name)||N.var_names().has(s.name))return !1;k&&k.push(s.definition());}}}return !0}(n,o>=3&&r)&&(!!function(e,t){for(var n=0,r=i.argnames.length;n<r;n++){var o=i.argnames[n];if(o instanceof Ot){if(ii(o.left,1))continue;return !1}if(o instanceof Ke)return !1;if(o instanceof ke){if(ii(o.expression,1))continue;return !1}if(!ii(o,1)){if(!t||e.has(o.name)||Oi.has(o.name)||N.var_names().has(o.name))return !1;k&&k.push(o.definition());}}return !0}(n,o>=2&&r)&&(!!function(){var t=new Set;const n=e=>{if(e instanceof xe){var n=new Set;return e.enclosed.forEach((function(e){n.add(e.name);})),e.variables.forEach((function(e){n.delete(e);})),n.forEach((function(e){t.add(e);})),!0}};for(let t=0;t<e.args.length;t++)yn(e.args[t],n);if(0==t.size)return !0;for(let e=0,n=i.argnames.length;e<n;e++){var r=i.argnames[e];if(!(r instanceof Ot&&ii(r.left,1))&&(!(r instanceof ke&&ii(r.expression,1))&&!ii(r,1)&&t.has(r.name)))return !1}for(let e=0,n=i.body.length;e<n;e++){var o=i.body[e];if(o instanceof ut)for(var a=o.definitions.length;--a>=0;){var s=o.definitions[a].name;if(s instanceof Ke||t.has(s.name))return !1}}return !0}()&&(!k||0==k.length||!tr(i,k))))}()&&(s=_i(t))&&!Qi(s,i)&&!function(){let e,n=0;for(;e=t.parent(n++);){if(e instanceof Ot)return !0;if(e instanceof De)break}return !1}()&&!(N instanceof It))return ri(i,256),s.add_child_scope(i),mi(e,function(n){var r=[],o=[];if(function(t,n){for(var r=i.argnames.length,o=e.args.length;--o>=r;)n.push(e.args[o]);for(o=r;--o>=0;){var a=i.argnames[o],s=e.args[o];if(ii(a,1)||!a.name||N.var_names().has(a.name))s&&n.push(s);else {var u=p(Gt,a,a);a.definition().orig.push(u),!s&&k&&(s=p(gn,e)),B(t,n,u,s);}}t.reverse(),n.reverse();}(r,o),function(e,t){for(var n=t.length,r=0,o=i.body.length;r<o;r++){var a=i.body[r];if(a instanceof ut)for(var s=0,u=a.definitions.length;s<u;s++){var c=a.definitions[s],l=c.name;if(B(e,t,l,c.value),k&&i.argnames.every(e=>e.name!=l.name)){var f=i.variables.get(l.name),_=p(rn,l,l);f.references.push(_),t.splice(n++,0,p(Ct,c,{operator:"=",left:_,right:p(gn,l)}));}}}}(r,o),o.push(n),r.length){const e=N.body.indexOf(t.parent(I-1))+1;N.body.splice(e,0,p(ut,i,{definitions:r}));}return o.map(e=>e.clone(!0))}(a)).optimize(t)}if(w&&t.option("side_effects")&&i.body.every(Si)){var L=e.args.concat(p(gn,e));return mi(e,L).optimize(t)}if(t.option("negate_iife")&&t.parent()instanceof he&&Ti(e))return e.negate(t,!0);var P=e.evaluate(t);return P!==e?(P=hi(P,e).optimize(t),Vi(t,P,e)):e;function V(t){return t?t instanceof We?t.value?t.value.clone(!0):p(gn,e):t instanceof he?p(At,t,{operator:"void",expression:t.body.clone(!0)}):void 0:p(gn,e)}function B(t,n,i,r){var o=i.definition();N.variables.set(i.name,o),N.enclosed.push(o),N.var_names().has(i.name)||(N.add_var_name(i.name),t.push(p(ft,i,{name:i,value:null})));var a=p(rn,i,i);o.references.push(a),r&&n.push(p(Ct,e,{operator:"=",left:a,right:r.clone()}));}})),si(ht,(function(e,t){return t.option("unsafe")&&yi(e.expression)&&["Object","RegExp","Function","Error","Array"].includes(e.expression.name)?p(mt,e,e).transform(t):e})),si(Et,(function(e,t){if(!t.option("side_effects"))return e;var n,i,r=[];n=In(t),i=e.expressions.length-1,e.expressions.forEach((function(e,o){o<i&&(e=e.drop_side_effect_free(t,n)),e&&(gi(r,e),n=!1);}));var o=r.length-1;return function(){for(;o>0&&xi(r[o],t);)o--;o<r.length-1&&(r[o]=p(At,e,{operator:"void",expression:r[o]}),r.length=o+1);}(),0==o?((e=Ei(t.parent(),t.self(),r[0]))instanceof Et||(e=e.optimize(t)),e):(e.expressions=r,e)})),vt.DEFMETHOD("lift_sequences",(function(e){if(e.option("sequences")&&this.expression instanceof Et){var t=this.expression.expressions.slice(),n=this.clone();return n.expression=t.pop(),t.push(n),mi(this,t).optimize(e)}return this})),si(Tt,(function(e,t){return e.lift_sequences(t)})),si(At,(function(e,t){var n=e.expression;if("delete"==e.operator&&!(n instanceof rn||n instanceof gt||Fi(n))){if(n instanceof Et){const i=n.expressions.slice();return i.push(p(Tn,e)),mi(e,i).optimize(t)}return mi(e,[n,p(Tn,e)]).optimize(t)}var i=e.lift_sequences(t);if(i!==e)return i;if(t.option("side_effects")&&"void"==e.operator)return (n=n.drop_side_effect_free(t))?(e.expression=n,e):p(gn,e).optimize(t);if(t.in_boolean_context())switch(e.operator){case"!":if(n instanceof At&&"!"==n.operator)return n.expression;n instanceof yt&&(e=Vi(t,e,n.negate(t,In(t))));break;case"typeof":return t.warn("Boolean expression always true [{file}:{line},{col}]",e.start),(n instanceof rn?p(Tn,e):mi(e,[n,p(Tn,e)])).optimize(t)}if("-"==e.operator&&n instanceof Sn&&(n=n.transform(t)),n instanceof yt&&("+"==e.operator||"-"==e.operator)&&("*"==n.operator||"/"==n.operator||"%"==n.operator))return p(yt,e,{operator:n.operator,left:p(At,n.left,{operator:e.operator,expression:n.left}),right:n.right});if("-"!=e.operator||!(n instanceof pn||n instanceof Sn||n instanceof _n)){var r=e.evaluate(t);if(r!==e)return Vi(t,r=hi(r,e).optimize(t),e)}return e})),yt.DEFMETHOD("lift_sequences",(function(e){if(e.option("sequences")){if(this.left instanceof Et){var t=this.left.expressions.slice();return (n=this.clone()).left=t.pop(),t.push(n),mi(this,t).optimize(e)}if(this.right instanceof Et&&!this.left.has_side_effects(e)){for(var n,i="="==this.operator&&this.left instanceof rn,r=(t=this.right.expressions).length-1,o=0;o<r&&(i||!t[o].has_side_effects(e));o++);if(o==r)return t=t.slice(),(n=this.clone()).right=t.pop(),t.push(n),mi(this,t).optimize(e);if(o>0)return (n=this.clone()).right=mi(this.right,t.slice(o)),(t=t.slice(0,o)).push(n),mi(this,t).optimize(e)}}return this}));var Zi=E("== === != !== * & | ^");function Ji(e,t){for(var n,i=0;n=e.parent(i);i++)if(n instanceof Ie||n instanceof It){var r=n.name;if(r&&r.definition()===t)break}return n}function Qi(e,t){for(const n of t.enclosed){if(t.variables.has(n.name))continue;const i=e.find_variable(n.name);if(i){if(i===n)continue;return !0}}return !1}function er(e,t){return e instanceof rn||e.TYPE===t.TYPE}function tr(e,t){const n=e=>{if(e instanceof rn&&i(e.definition(),t))return Cn};return bn(e,(t,i)=>{if(t instanceof xe&&t!==e){var r=i.parent();if(r instanceof mt&&r.expression===t)return;return !yn(t,n)||Cn}})}si(yt,(function(e,t){function n(){return e.left.is_constant()||e.right.is_constant()||!e.left.has_side_effects(t)&&!e.right.has_side_effects(t)}function i(t){if(n()){t&&(e.operator=t);var i=e.left;e.left=e.right,e.right=i;}}if(Zi.has(e.operator)&&e.right.is_constant()&&!e.left.is_constant()&&(e.left instanceof yt&&se[e.left.operator]>=se[e.operator]||i()),e=e.lift_sequences(t),t.option("comparisons"))switch(e.operator){case"===":case"!==":var r=!0;(e.left.is_string(t)&&e.right.is_string(t)||e.left.is_number(t)&&e.right.is_number(t)||e.left.is_boolean()&&e.right.is_boolean()||e.left.equivalent_to(e.right))&&(e.operator=e.operator.substr(0,2));case"==":case"!=":if(!r&&xi(e.left,t))e.left=p(hn,e.left);else if(t.option("typeofs")&&e.left instanceof fn&&"undefined"==e.left.value&&e.right instanceof At&&"typeof"==e.right.operator){var o=e.right.expression;(o instanceof rn?!o.is_declared(t):o instanceof gt&&t.option("ie8"))||(e.right=o,e.left=p(gn,e.left).optimize(t),2==e.operator.length&&(e.operator+="="));}else if(e.left instanceof rn&&e.right instanceof rn&&e.left.definition()===e.right.definition()&&((u=e.left.fixed_value())instanceof Ft||u instanceof Ie||u instanceof Mt||u instanceof It))return p("="==e.operator[0]?Tn:An,e);break;case"&&":case"||":var a=e.left;if(a.operator==e.operator&&(a=a.right),a instanceof yt&&a.operator==("&&"==e.operator?"!==":"===")&&e.right instanceof yt&&a.operator==e.right.operator&&(xi(a.left,t)&&e.right.left instanceof hn||a.left instanceof hn&&xi(e.right.left,t))&&!a.right.has_side_effects(t)&&a.right.equivalent_to(e.right.right)){var s=p(yt,e,{operator:a.operator.slice(0,-1),left:p(hn,e),right:a.right});return a!==e.left&&(s=p(yt,e,{operator:e.operator,left:e.left.left,right:s})),s}}var u;if("+"==e.operator&&t.in_boolean_context()){var c=e.left.evaluate(t),l=e.right.evaluate(t);if(c&&"string"==typeof c)return t.warn("+ in boolean context always true [{file}:{line},{col}]",e.start),mi(e,[e.right,p(Tn,e)]).optimize(t);if(l&&"string"==typeof l)return t.warn("+ in boolean context always true [{file}:{line},{col}]",e.start),mi(e,[e.left,p(Tn,e)]).optimize(t)}if(t.option("comparisons")&&e.is_boolean()){if(!(t.parent()instanceof yt)||t.parent()instanceof Ct){var f=p(At,e,{operator:"!",expression:e.negate(t,In(t))});e=Vi(t,e,f);}if(t.option("unsafe_comps"))switch(e.operator){case"<":i(">");break;case"<=":i(">=");}}if("+"==e.operator){if(e.right instanceof fn&&""==e.right.getValue()&&e.left.is_string(t))return e.left;if(e.left instanceof fn&&""==e.left.getValue()&&e.right.is_string(t))return e.right;if(e.left instanceof yt&&"+"==e.left.operator&&e.left.left instanceof fn&&""==e.left.left.getValue()&&e.right.is_string(t))return e.left=e.left.right,e.transform(t)}if(t.option("evaluate")){switch(e.operator){case"&&":if(!(c=!!ii(e.left,2)||!ii(e.left,4)&&e.left.evaluate(t)))return t.warn("Condition left of && always false [{file}:{line},{col}]",e.start),Ei(t.parent(),t.self(),e.left).optimize(t);if(!(c instanceof pe))return t.warn("Condition left of && always true [{file}:{line},{col}]",e.start),mi(e,[e.left,e.right]).optimize(t);if(l=e.right.evaluate(t)){if(!(l instanceof pe)){if("&&"==(_=t.parent()).operator&&_.left===t.self()||t.in_boolean_context())return t.warn("Dropping side-effect-free && [{file}:{line},{col}]",e.start),e.left.optimize(t)}}else {if(t.in_boolean_context())return t.warn("Boolean && always false [{file}:{line},{col}]",e.start),mi(e,[e.left,p(An,e)]).optimize(t);ri(e,4);}if("||"==e.left.operator)if(!(d=e.left.right.evaluate(t)))return p(bt,e,{condition:e.left.left,consequent:e.right,alternative:e.left.right}).optimize(t);break;case"||":var _,d;if(!(c=!!ii(e.left,2)||!ii(e.left,4)&&e.left.evaluate(t)))return t.warn("Condition left of || always false [{file}:{line},{col}]",e.start),mi(e,[e.left,e.right]).optimize(t);if(!(c instanceof pe))return t.warn("Condition left of || always true [{file}:{line},{col}]",e.start),Ei(t.parent(),t.self(),e.left).optimize(t);if(l=e.right.evaluate(t)){if(!(l instanceof pe)){if(t.in_boolean_context())return t.warn("Boolean || always true [{file}:{line},{col}]",e.start),mi(e,[e.left,p(Tn,e)]).optimize(t);ri(e,2);}}else if("||"==(_=t.parent()).operator&&_.left===t.self()||t.in_boolean_context())return t.warn("Dropping side-effect-free || [{file}:{line},{col}]",e.start),e.left.optimize(t);if("&&"==e.left.operator)if((d=e.left.right.evaluate(t))&&!(d instanceof pe))return p(bt,e,{condition:e.left.left,consequent:e.left.right,alternative:e.right}).optimize(t);break;case"??":if(rr(e.left))return e.right;if(!((c=e.left.evaluate(t))instanceof pe))return null==c?e.right:e.left;if(t.in_boolean_context()){const n=e.right.evaluate(t);if(!(n instanceof pe||n))return e.left}}var m=!0;switch(e.operator){case"+":if(e.left instanceof ln&&e.right instanceof yt&&"+"==e.right.operator&&e.right.is_string(t)){var h=(g=p(yt,e,{operator:"+",left:e.left,right:e.right.left})).optimize(t);g!==h&&(e=p(yt,e,{operator:"+",left:h,right:e.right.right}));}if(e.right instanceof ln&&e.left instanceof yt&&"+"==e.left.operator&&e.left.is_string(t)){var E=(g=p(yt,e,{operator:"+",left:e.left.right,right:e.right})).optimize(t);g!==E&&(e=p(yt,e,{operator:"+",left:e.left.left,right:E}));}if(e.left instanceof yt&&"+"==e.left.operator&&e.left.is_string(t)&&e.right instanceof yt&&"+"==e.right.operator&&e.right.is_string(t)){var g,D=(g=p(yt,e,{operator:"+",left:e.left.right,right:e.right.left})).optimize(t);g!==D&&(e=p(yt,e,{operator:"+",left:p(yt,e.left,{operator:"+",left:e.left.left,right:D}),right:e.right.right}));}if(e.right instanceof At&&"-"==e.right.operator&&e.left.is_number(t)){e=p(yt,e,{operator:"-",left:e.left,right:e.right.expression});break}if(e.left instanceof At&&"-"==e.left.operator&&n()&&e.right.is_number(t)){e=p(yt,e,{operator:"-",left:e.right,right:e.left.expression});break}if(e.left instanceof Ge){h=e.left;if((E=e.right.evaluate(t))!=e.right)return h.segments[h.segments.length-1].value+=E.toString(),h}if(e.right instanceof Ge){E=e.right;if((h=e.left.evaluate(t))!=e.left)return E.segments[0].value=h.toString()+E.segments[0].value,E}if(e.left instanceof Ge&&e.right instanceof Ge){var S=(h=e.left).segments;E=e.right;S[S.length-1].value+=E.segments[0].value;for(var v=1;v<E.segments.length;v++)S.push(E.segments[v]);return h}case"*":m=t.option("unsafe_math");case"&":case"|":case"^":if(e.left.is_number(t)&&e.right.is_number(t)&&n()&&!(e.left instanceof yt&&e.left.operator!=e.operator&&se[e.left.operator]>=se[e.operator])){var A=p(yt,e,{operator:e.operator,left:e.right,right:e.left});e=e.right instanceof ln&&!(e.left instanceof ln)?Vi(t,A,e):Vi(t,e,A);}m&&e.is_number(t)&&(e.right instanceof yt&&e.right.operator==e.operator&&(e=p(yt,e,{operator:e.operator,left:p(yt,e.left,{operator:e.operator,left:e.left,right:e.right.left,start:e.left.start,end:e.right.left.end}),right:e.right.right})),e.right instanceof ln&&e.left instanceof yt&&e.left.operator==e.operator&&(e.left.left instanceof ln?e=p(yt,e,{operator:e.operator,left:p(yt,e.left,{operator:e.operator,left:e.left.left,right:e.right,start:e.left.left.start,end:e.right.end}),right:e.left.right}):e.left.right instanceof ln&&(e=p(yt,e,{operator:e.operator,left:p(yt,e.left,{operator:e.operator,left:e.left.right,right:e.right,start:e.left.right.start,end:e.right.end}),right:e.left.left}))),e.left instanceof yt&&e.left.operator==e.operator&&e.left.right instanceof ln&&e.right instanceof yt&&e.right.operator==e.operator&&e.right.left instanceof ln&&(e=p(yt,e,{operator:e.operator,left:p(yt,e.left,{operator:e.operator,left:p(yt,e.left.left,{operator:e.operator,left:e.left.right,right:e.right.left,start:e.left.right.start,end:e.right.left.end}),right:e.left.left}),right:e.right.right})));}}if(e.right instanceof yt&&e.right.operator==e.operator&&(Ni.has(e.operator)||"+"==e.operator&&(e.right.left.is_string(t)||e.left.is_string(t)&&e.right.right.is_string(t))))return e.left=p(yt,e.left,{operator:e.operator,left:e.left,right:e.right.left}),e.right=e.right.right,e.transform(t);var T=e.evaluate(t);return T!==e?(T=hi(T,e).optimize(t),Vi(t,T,e)):e})),si(on,(function(e){return e})),si(rn,(function(e,t){if(!t.option("ie8")&&yi(e)&&(!e.scope.uses_with||!t.find_parent(we)))switch(e.name){case"undefined":return p(gn,e).optimize(t);case"NaN":return p(En,e).optimize(t);case"Infinity":return p(Sn,e).optimize(t)}var n=t.parent();if(t.option("reduce_vars")&&Ii(e,n)!==e){const f=e.definition();if(t.top_retain&&f.global&&t.top_retain(f))return f.fixed=!1,f.should_replace=!1,f.single_use=!1,e;var i=e.fixed_value(),r=f.single_use&&!(n instanceof mt&&n.is_expr_pure(t)||T(n,wn));if(r&&(i instanceof Ie||i instanceof It))if(ji(i,t))r=!1;else if(f.scope!==e.scope&&(1==f.escaped||ii(i,16)||function(e){for(var t,n=0;t=e.parent(n++);){if(t instanceof _e)return !1;if(t instanceof Ft||t instanceof wt||t instanceof Mt)return !0}return !1}(t)))r=!1;else if(Ji(t,f))r=!1;else if((f.scope!==e.scope||f.orig[0]instanceof Wt)&&"f"==(r=i.is_constant_expression(e.scope))){var o=e.scope;do{(o instanceof Be||li(o))&&ri(o,16);}while(o=o.parent_scope)}if(r&&i instanceof Ie){const o=_i(t);r=f.scope===e.scope&&!Qi(o,i)||n instanceof mt&&n.expression===e&&!Qi(o,i);}if(r&&i instanceof It){r=(!i.extends||!i.extends.may_throw(t)&&!i.extends.has_side_effects(t))&&!i.properties.some(e=>e.may_throw(t)||e.has_side_effects(t));}if(r&&i){if(i instanceof Pt&&(ri(i,256),i=p(Vt,i,i)),i instanceof Be&&(ri(i,256),i=p(Pe,i,i)),f.recursive_refs>0&&i.name instanceof Yt){const e=i.name.definition();let t=i.variables.get(i.name.name),n=t&&t.orig[0];n instanceof jt||(n=p(jt,i.name,i.name),n.scope=i,i.name=n,t=i.def_function(n)),yn(i,n=>{n instanceof rn&&n.definition()===e&&(n.thedef=t,t.references.push(n));});}return (i instanceof Ie||i instanceof It)&&_i(t).add_child_scope(i),i.optimize(t)}if(i&&void 0===f.should_replace){let e;if(i instanceof un)f.orig[0]instanceof Wt||!f.references.every(e=>f.scope===e.scope)||(e=i);else {var a=i.evaluate(t);a===i||!t.option("unsafe_regexp")&&a instanceof RegExp||(e=hi(a,i));}if(e){var s,u=e.optimize(t).size();yn(i,e=>{if(e instanceof rn)return Cn})?s=function(){var n=e.optimize(t);return n===e?n.clone(!0):n}:(u=Math.min(u,i.size()),s=function(){var n=Li(e.optimize(t),i);return n===e||n===i?n.clone(!0):n});var c=f.name.length,l=0;t.option("unused")&&!t.exposed(f)&&(l=(c+2+u)/(f.references.length-f.assignments)),f.should_replace=u<=c+l&&s;}else f.should_replace=!1;}if(f.should_replace)return f.should_replace()}return e})),si(gn,(function(e,t){if(t.option("unsafe_undefined")){var n=di(t,"undefined");if(n){var i=p(rn,e,{name:"undefined",scope:n.scope,thedef:n});return ri(i,8),i}}var r=Ii(t.self(),t.parent());return r&&er(r,e)?e:p(At,e,{operator:"void",expression:p(pn,e,{value:0})})})),si(Sn,(function(e,t){var n=Ii(t.self(),t.parent());return n&&er(n,e)?e:!t.option("keep_infinity")||n&&!er(n,e)||di(t,"Infinity")?p(yt,e,{operator:"/",left:p(pn,e,{value:1}),right:p(pn,e,{value:0})}):e})),si(En,(function(e,t){var n=Ii(t.self(),t.parent());return n&&!er(n,e)||di(t,"NaN")?p(yt,e,{operator:"/",left:p(pn,e,{value:0}),right:p(pn,e,{value:0})}):e}));const nr=E("+ - / * % >> << >>> | ^ &"),ir=E("* | ^ &");function rr(e){let t;return e instanceof hn||xi(e)||e instanceof rn&&(t=e.definition().fixed)instanceof pe&&rr(t)}function or(e,t){return e instanceof rn&&(e=e.fixed_value()),!!e&&(!(e instanceof Ie||e instanceof It)||(!(e instanceof Ie&&e.contains_this())||t.parent()instanceof ht))}function ar(e,t){return t.in_boolean_context()?Vi(t,e,mi(e,[e,p(Tn,e)]).optimize(t)):e}function sr(e,t,n){for(var i=0;i<n.length;i++){var r=n[i];if(r instanceof ke){var o=r.expression;o instanceof Ft&&(n.splice(i,1,...o.elements),i--);}}return e}function ur(e,t){if(!t.option("computed_props"))return e;if(!(e.key instanceof ln))return e;if(e.key instanceof fn||e.key instanceof pn){if("__proto__"===e.key.value)return e;if("constructor"==e.key.value&&t.parent()instanceof It)return e;e.key=e instanceof wt?e.key.value:p(e instanceof Lt?$t:qt,e.key,{name:e.key.value});}return e}si(Ct,(function(e,t){var n;if(t.option("dead_code")&&e.left instanceof rn&&(n=e.left.definition()).scope===t.find_parent(Ie)){var i,r=0,o=e;do{if(i=o,(o=t.parent(r++))instanceof ze){if(a(r,o))break;if(tr(n.scope,[n]))break;return "="==e.operator?e.right:(n.fixed=!1,p(yt,e,{operator:e.operator.slice(0,-1),left:e.left,right:e.right}).optimize(t))}}while(o instanceof yt&&o.right===i||o instanceof Et&&o.tail_node()===i)}return "="==(e=e.lift_sequences(t)).operator&&e.left instanceof rn&&e.right instanceof yt&&(e.right.left instanceof rn&&e.right.left.name==e.left.name&&nr.has(e.right.operator)?(e.operator=e.right.operator+"=",e.right=e.right.right):e.right.right instanceof rn&&e.right.right.name==e.left.name&&ir.has(e.right.operator)&&!e.right.left.has_side_effects(t)&&(e.operator=e.right.operator+"=",e.right=e.right.left)),e;function a(n,i){var r=e.right;e.right=p(hn,r);var o=i.may_throw(t);e.right=r;for(var a,s=e.left.definition().scope;(a=t.parent(n++))!==s;)if(a instanceof rt){if(a.bfinally)return !0;if(o&&a.bcatch)return !0}}})),si(Ot,(function(e,t){if(!t.option("evaluate"))return e;var n=e.right.evaluate(t);return void 0===n?e=e.left:n!==e.right&&(n=hi(n,e.right),e.right=Li(n,e.right)),e})),si(bt,(function(e,t){if(!t.option("conditionals"))return e;if(e.condition instanceof Et){var n=e.condition.expressions.slice();return e.condition=n.pop(),n.push(e),mi(e,n)}var i=e.condition.evaluate(t);if(i!==e.condition)return i?(t.warn("Condition always true [{file}:{line},{col}]",e.start),Ei(t.parent(),t.self(),e.consequent)):(t.warn("Condition always false [{file}:{line},{col}]",e.start),Ei(t.parent(),t.self(),e.alternative));var r=i.negate(t,In(t));Vi(t,i,r)===r&&(e=p(bt,e,{condition:r,consequent:e.alternative,alternative:e.consequent}));var o,a=e.condition,s=e.consequent,u=e.alternative;if(a instanceof rn&&s instanceof rn&&a.definition()===s.definition())return p(yt,e,{operator:"||",left:a,right:u});if(s instanceof Ct&&u instanceof Ct&&s.operator==u.operator&&s.left.equivalent_to(u.left)&&(!e.condition.has_side_effects(t)||"="==s.operator&&!s.left.has_side_effects(t)))return p(Ct,e,{operator:s.operator,left:s.left,right:p(bt,e,{condition:e.condition,consequent:s.right,alternative:u.right})});if(s instanceof mt&&u.TYPE===s.TYPE&&s.args.length>0&&s.args.length==u.args.length&&s.expression.equivalent_to(u.expression)&&!e.condition.has_side_effects(t)&&!s.expression.has_side_effects(t)&&"number"==typeof(o=function(){for(var e=s.args,t=u.args,n=0,i=e.length;n<i;n++){if(e[n]instanceof ke)return;if(!e[n].equivalent_to(t[n])){if(t[n]instanceof ke)return;for(var r=n+1;r<i;r++){if(e[r]instanceof ke)return;if(!e[r].equivalent_to(t[r]))return}return n}}}())){var c=s.clone();return c.args[o]=p(bt,e,{condition:e.condition,consequent:s.args[o],alternative:u.args[o]}),c}if(u instanceof bt&&s.equivalent_to(u.consequent))return p(bt,e,{condition:p(yt,e,{operator:"||",left:a,right:u.condition}),consequent:s,alternative:u.alternative}).optimize(t);if(t.option("ecma")>=2020&&function(e,t,n){if(t.may_throw(n))return !1;let i;if(e instanceof yt&&"=="===e.operator&&((i=rr(e.left)&&e.left)||(i=rr(e.right)&&e.right))&&(i===e.left?e.right:e.left).equivalent_to(t))return !0;if(e instanceof yt&&"||"===e.operator){let n,i;const r=e=>{if(!(e instanceof yt)||"==="!==e.operator&&"=="!==e.operator)return !1;let r,o=0;return e.left instanceof hn&&(o++,n=e,r=e.right),e.right instanceof hn&&(o++,n=e,r=e.left),xi(e.left)&&(o++,i=e,r=e.right),xi(e.right)&&(o++,i=e,r=e.left),1===o&&!!r.equivalent_to(t)};if(!r(e.left))return !1;if(!r(e.right))return !1;if(n&&i&&n!==i)return !0}return !1}(a,u,t))return p(yt,e,{operator:"??",left:u,right:s}).optimize(t);if(u instanceof Et&&s.equivalent_to(u.expressions[u.expressions.length-1]))return mi(e,[p(yt,e,{operator:"||",left:a,right:mi(e,u.expressions.slice(0,-1))}),s]).optimize(t);if(u instanceof yt&&"&&"==u.operator&&s.equivalent_to(u.right))return p(yt,e,{operator:"&&",left:p(yt,e,{operator:"||",left:a,right:u.left}),right:s}).optimize(t);if(s instanceof bt&&s.alternative.equivalent_to(u))return p(bt,e,{condition:p(yt,e,{left:e.condition,operator:"&&",right:s.condition}),consequent:s.consequent,alternative:u});if(s.equivalent_to(u))return mi(e,[e.condition,s]).optimize(t);if(s instanceof yt&&"||"==s.operator&&s.right.equivalent_to(u))return p(yt,e,{operator:"||",left:p(yt,e,{operator:"&&",left:e.condition,right:s.left}),right:u}).optimize(t);var l=t.in_boolean_context();return _(e.consequent)?d(e.alternative)?f(e.condition):p(yt,e,{operator:"||",left:f(e.condition),right:e.alternative}):d(e.consequent)?_(e.alternative)?f(e.condition.negate(t)):p(yt,e,{operator:"&&",left:f(e.condition.negate(t)),right:e.alternative}):_(e.alternative)?p(yt,e,{operator:"||",left:f(e.condition.negate(t)),right:e.consequent}):d(e.alternative)?p(yt,e,{operator:"&&",left:f(e.condition),right:e.consequent}):e;function f(e){return e.is_boolean()?e:p(At,e,{operator:"!",expression:e.negate(t)})}function _(e){return e instanceof Tn||l&&e instanceof ln&&e.getValue()||e instanceof At&&"!"==e.operator&&e.expression instanceof ln&&!e.expression.getValue()}function d(e){return e instanceof An||l&&e instanceof ln&&!e.getValue()||e instanceof At&&"!"==e.operator&&e.expression instanceof ln&&e.expression.getValue()}})),si(vn,(function(e,t){if(t.in_boolean_context())return p(pn,e,{value:+e.value});var n=t.parent();return t.option("booleans_as_integers")?(n instanceof yt&&("==="==n.operator||"!=="==n.operator)&&(n.operator=n.operator.replace(/=$/,"")),p(pn,e,{value:+e.value})):t.option("booleans")?n instanceof yt&&("=="==n.operator||"!="==n.operator)?(t.warn("Non-strict equality against boolean: {operator} {value} [{file}:{line},{col}]",{operator:n.operator,value:e.value,file:n.start.file,line:n.start.line,col:n.start.col}),p(pn,e,{value:+e.value})):p(At,e,{operator:"!",expression:p(pn,e,{value:1-e.value})}):e})),si(St,(function(e,t){var n,i=e.expression,r=e.property;if(t.option("properties")){var o=r.evaluate(t);if(o!==r){if("string"==typeof o)if("undefined"==o)o=void 0;else (A=parseFloat(o)).toString()==o&&(o=A);r=e.property=Li(r,hi(o,r).transform(t));var a=""+o;if(j(a)&&a.length<=r.size()+1)return p(Dt,e,{expression:i,property:a,quote:r.quote}).optimize(t)}}e:if(t.option("arguments")&&i instanceof rn&&"arguments"==i.name&&1==i.definition().orig.length&&(n=i.scope)instanceof Ie&&n.uses_arguments&&!(n instanceof Ve)&&r instanceof pn){for(var s=r.getValue(),u=new Set,c=n.argnames,l=0;l<c.length;l++){if(!(c[l]instanceof Wt))break e;var f=c[l].name;if(u.has(f))break e;u.add(f);}var _=n.argnames[s];if(_&&t.has_directive("use strict")){var d=_.definition();(!t.option("reduce_vars")||d.assignments||d.orig.length>1)&&(_=null);}else if(!_&&!t.option("keep_fargs")&&s<n.argnames.length+5)for(;s>=n.argnames.length;)_=p(Wt,n,{name:n.make_var_name("argument_"+n.argnames.length),scope:n}),n.argnames.push(_),n.enclosed.push(n.def_variable(_));if(_){var m=p(rn,e,_);return m.reference({}),oi(_,1),m}}if(Ii(e,t.parent()))return e;if(o!==r){var h=e.flatten_object(a,t);h&&(i=e.expression=h.expression,r=e.property=h.property);}if(t.option("properties")&&t.option("side_effects")&&r instanceof pn&&i instanceof Ft){s=r.getValue();var E=i.elements,g=E[s];e:if(or(g,t)){for(var D=!0,S=[],v=E.length;--v>s;){(A=E[v].drop_side_effect_free(t))&&(S.unshift(A),D&&A.has_side_effects(t)&&(D=!1));}if(g instanceof ke)break e;for(g=g instanceof Dn?p(gn,g):g,D||S.unshift(g);--v>=0;){var A;if((A=E[v])instanceof ke)break e;(A=A.drop_side_effect_free(t))?S.unshift(A):s--;}return D?(S.push(g),mi(e,S).optimize(t)):p(St,e,{expression:p(Ft,i,{elements:S}),property:p(pn,r,{value:s})})}}var T=e.evaluate(t);return T!==e?Vi(t,T=hi(T,e).optimize(t),e):e})),Ie.DEFMETHOD("contains_this",(function(){return yn(this,e=>e instanceof un?Cn:e!==this&&e instanceof xe&&!(e instanceof Ve)||void 0)})),gt.DEFMETHOD("flatten_object",(function(e,t){if(t.option("properties")){var n=t.option("unsafe_arrows")&&t.option("ecma")>=2015,i=this.expression;if(i instanceof Mt)for(var r=i.properties,o=r.length;--o>=0;){var a=r[o];if(""+(a instanceof kt?a.key.name:a.key)==e){if(!r.every(e=>e instanceof wt||n&&e instanceof kt&&!e.is_generator))break;if(!or(a.value,t))break;return p(St,this,{expression:p(Ft,i,{elements:r.map((function(e){var t=e.value;t instanceof Le&&(t=p(Pe,t,t));var n=e.key;return n instanceof pe&&!(n instanceof qt)?mi(e,[n,t]):t}))}),property:p(pn,this,{value:o})})}}}})),si(Dt,(function(e,t){"arguments"!=e.property&&"caller"!=e.property||t.warn("Function.prototype.{prop} not supported [{file}:{line},{col}]",{prop:e.property,file:e.start.file,line:e.start.line,col:e.start.col});const n=t.parent();if(Ii(e,n))return e;if(t.option("unsafe_proto")&&e.expression instanceof Dt&&"prototype"==e.expression.property){var i=e.expression.expression;if(yi(i))switch(i.name){case"Array":e.expression=p(Ft,e.expression,{elements:[]});break;case"Function":e.expression=p(Pe,e.expression,{argnames:[],body:[]});break;case"Number":e.expression=p(pn,e.expression,{value:0});break;case"Object":e.expression=p(Mt,e.expression,{properties:[]});break;case"RegExp":e.expression=p(dn,e.expression,{value:{source:"t",flags:""}});break;case"String":e.expression=p(fn,e.expression,{value:""});}}if(!(n instanceof mt&&T(n,wn))){const n=e.flatten_object(e.property,t);if(n)return n.optimize(t)}let r=e.evaluate(t);return r!==e?(r=hi(r,e).optimize(t),Vi(t,r,e)):e})),si(Ft,(function(e,t){var n=ar(e,t);return n!==e?n:sr(e,0,e.elements)})),si(Mt,(function(e,t){var n=ar(e,t);if(n!==e)return n;for(var i=e.properties,r=0;r<i.length;r++){var o=i[r];if(o instanceof ke){var a=o.expression;a instanceof Mt?(i.splice.apply(i,[r,1].concat(o.expression.properties)),r--):a instanceof ln&&!(a instanceof fn)&&i.splice(r,1);}}return e})),si(dn,ar),si(We,(function(e,t){return e.value&&xi(e.value,t)&&(e.value=null),e})),si(Ve,Yi),si(Pe,(function(e,t){if(e=Yi(e,t),t.option("unsafe_arrows")&&t.option("ecma")>=2015&&!e.name&&!e.is_generator&&!e.uses_arguments&&!e.pinned()){if(!yn(e,e=>{if(e instanceof un)return Cn}))return p(Ve,e,e).optimize(t)}return e})),si(It,(function(e){return e})),si(Je,(function(e,t){return e.expression&&!e.is_star&&xi(e.expression,t)&&(e.expression=null),e})),si(Ge,(function(e,t){if(!t.option("evaluate")||t.parent()instanceof Ue)return e;for(var n=[],i=0;i<e.segments.length;i++){var r=e.segments[i];if(r instanceof pe){var o=r.evaluate(t);if(o!==r&&(o+"").length<=r.size()+"${}".length){n[n.length-1].value=n[n.length-1].value+o+e.segments[++i].value;continue}if(r instanceof Ge){var a=r.segments;n[n.length-1].value+=a[0].value;for(var s=1;s<a.length;s++)r=a[s],n.push(r);continue}}n.push(r);}if(e.segments=n,1==n.length)return p(fn,e,n[0]);if(3===n.length&&n[1]instanceof pe){if(""===n[2].value)return p(yt,e,{operator:"+",left:p(fn,e,{value:n[0].value}),right:n[1]});if(""===n[0].value)return p(yt,e,{operator:"+",left:n[1],right:p(fn,e,{value:n[2].value})})}return e})),si(Ue,(function(e){return e})),si(Rt,ur),si(kt,(function(e,t){if(ur(e,t),t.option("arrows")&&t.parent()instanceof Mt&&!e.is_generator&&!e.value.uses_arguments&&!e.value.pinned()&&1==e.value.body.length&&e.value.body[0]instanceof We&&e.value.body[0].value&&!e.value.contains_this()){var n=p(Ve,e.value,e.value);return n.async=e.async,n.is_generator=e.is_generator,p(wt,e,{key:e.key instanceof qt?e.key.name:e.key,value:n,quote:e.quote})}return e})),si(wt,(function(e,t){ur(e,t);var n=t.option("unsafe_methods");if(n&&t.option("ecma")>=2015&&(!(n instanceof RegExp)||n.test(e.key+""))){var i=e.key,r=e.value;if((r instanceof Ve&&Array.isArray(r.body)&&!r.contains_this()||r instanceof Pe)&&!r.name)return p(kt,e,{async:r.async,is_generator:r.is_generator,key:i instanceof pe?i:p(qt,e,{name:i}),value:p(Le,r,r),quote:e.quote})}return e})),si(Ke,(function(e,t){if(1==t.option("pure_getters")&&t.option("unused")&&!e.is_array&&Array.isArray(e.names)&&!function(e){for(var t=[/^VarDef$/,/^(Const|Let|Var)$/,/^Export$/],n=0,i=0,r=t.length;n<r;i++){var o=e.parent(i);if(!o)return !1;if(0!==n||"Destructuring"!=o.TYPE){if(!t[n].test(o.TYPE))return !1;n++;}}return !0}(t)){for(var n=[],i=0;i<e.names.length;i++){var r=e.names[i];r instanceof wt&&"string"==typeof r.key&&r.value instanceof Ut&&!o(t,r.value.definition())||n.push(r);}n.length!=e.names.length&&(e.names=n);}return e;function o(e,t){return !!t.references.length||!!t.global&&(!e.toplevel.vars||!!e.top_retain&&e.top_retain(t))}}));var cr=["$&","$'","$*","$+","$1","$2","$3","$4","$5","$6","$7","$8","$9","$_","$`","$input","@@iterator","ABORT_ERR","ACTIVE","ACTIVE_ATTRIBUTES","ACTIVE_TEXTURE","ACTIVE_UNIFORMS","ADDITION","ALIASED_LINE_WIDTH_RANGE","ALIASED_POINT_SIZE_RANGE","ALLOW_KEYBOARD_INPUT","ALLPASS","ALPHA","ALPHA_BITS","ALT_MASK","ALWAYS","ANY_TYPE","ANY_UNORDERED_NODE_TYPE","ARRAY_BUFFER","ARRAY_BUFFER_BINDING","ATTACHED_SHADERS","ATTRIBUTE_NODE","AT_TARGET","AddSearchProvider","AnalyserNode","AnimationEvent","AnonXMLHttpRequest","ApplicationCache","ApplicationCacheErrorEvent","Array","ArrayBuffer","Attr","Audio","AudioBuffer","AudioBufferSourceNode","AudioContext","AudioDestinationNode","AudioListener","AudioNode","AudioParam","AudioProcessingEvent","AudioStreamTrack","AutocompleteErrorEvent","BACK","BAD_BOUNDARYPOINTS_ERR","BANDPASS","BLEND","BLEND_COLOR","BLEND_DST_ALPHA","BLEND_DST_RGB","BLEND_EQUATION","BLEND_EQUATION_ALPHA","BLEND_EQUATION_RGB","BLEND_SRC_ALPHA","BLEND_SRC_RGB","BLUE_BITS","BLUR","BOOL","BOOLEAN_TYPE","BOOL_VEC2","BOOL_VEC3","BOOL_VEC4","BOTH","BROWSER_DEFAULT_WEBGL","BUBBLING_PHASE","BUFFER_SIZE","BUFFER_USAGE","BYTE","BYTES_PER_ELEMENT","BarProp","BaseHref","BatteryManager","BeforeLoadEvent","BeforeUnloadEvent","BiquadFilterNode","Blob","BlobEvent","Boolean","CAPTURING_PHASE","CCW","CDATASection","CDATA_SECTION_NODE","CHANGE","CHARSET_RULE","CHECKING","CLAMP_TO_EDGE","CLICK","CLOSED","CLOSING","COLOR_ATTACHMENT0","COLOR_BUFFER_BIT","COLOR_CLEAR_VALUE","COLOR_WRITEMASK","COMMENT_NODE","COMPILE_STATUS","COMPRESSED_RGBA_S3TC_DXT1_EXT","COMPRESSED_RGBA_S3TC_DXT3_EXT","COMPRESSED_RGBA_S3TC_DXT5_EXT","COMPRESSED_RGB_S3TC_DXT1_EXT","COMPRESSED_TEXTURE_FORMATS","CONNECTING","CONSTANT_ALPHA","CONSTANT_COLOR","CONSTRAINT_ERR","CONTEXT_LOST_WEBGL","CONTROL_MASK","COUNTER_STYLE_RULE","CSS","CSS2Properties","CSSCharsetRule","CSSConditionRule","CSSCounterStyleRule","CSSFontFaceRule","CSSFontFeatureValuesRule","CSSGroupingRule","CSSImportRule","CSSKeyframeRule","CSSKeyframesRule","CSSMediaRule","CSSMozDocumentRule","CSSNameSpaceRule","CSSPageRule","CSSPrimitiveValue","CSSRule","CSSRuleList","CSSStyleDeclaration","CSSStyleRule","CSSStyleSheet","CSSSupportsRule","CSSUnknownRule","CSSValue","CSSValueList","CSSVariablesDeclaration","CSSVariablesRule","CSSViewportRule","CSS_ATTR","CSS_CM","CSS_COUNTER","CSS_CUSTOM","CSS_DEG","CSS_DIMENSION","CSS_EMS","CSS_EXS","CSS_FILTER_BLUR","CSS_FILTER_BRIGHTNESS","CSS_FILTER_CONTRAST","CSS_FILTER_CUSTOM","CSS_FILTER_DROP_SHADOW","CSS_FILTER_GRAYSCALE","CSS_FILTER_HUE_ROTATE","CSS_FILTER_INVERT","CSS_FILTER_OPACITY","CSS_FILTER_REFERENCE","CSS_FILTER_SATURATE","CSS_FILTER_SEPIA","CSS_GRAD","CSS_HZ","CSS_IDENT","CSS_IN","CSS_INHERIT","CSS_KHZ","CSS_MATRIX","CSS_MATRIX3D","CSS_MM","CSS_MS","CSS_NUMBER","CSS_PC","CSS_PERCENTAGE","CSS_PERSPECTIVE","CSS_PRIMITIVE_VALUE","CSS_PT","CSS_PX","CSS_RAD","CSS_RECT","CSS_RGBCOLOR","CSS_ROTATE","CSS_ROTATE3D","CSS_ROTATEX","CSS_ROTATEY","CSS_ROTATEZ","CSS_S","CSS_SCALE","CSS_SCALE3D","CSS_SCALEX","CSS_SCALEY","CSS_SCALEZ","CSS_SKEW","CSS_SKEWX","CSS_SKEWY","CSS_STRING","CSS_TRANSLATE","CSS_TRANSLATE3D","CSS_TRANSLATEX","CSS_TRANSLATEY","CSS_TRANSLATEZ","CSS_UNKNOWN","CSS_URI","CSS_VALUE_LIST","CSS_VH","CSS_VMAX","CSS_VMIN","CSS_VW","CULL_FACE","CULL_FACE_MODE","CURRENT_PROGRAM","CURRENT_VERTEX_ATTRIB","CUSTOM","CW","CanvasGradient","CanvasPattern","CanvasRenderingContext2D","CaretPosition","ChannelMergerNode","ChannelSplitterNode","CharacterData","ClientRect","ClientRectList","Clipboard","ClipboardEvent","CloseEvent","Collator","CommandEvent","Comment","CompositionEvent","Console","Controllers","ConvolverNode","Counter","Crypto","CryptoKey","CustomEvent","DATABASE_ERR","DATA_CLONE_ERR","DATA_ERR","DBLCLICK","DECR","DECR_WRAP","DELETE_STATUS","DEPTH_ATTACHMENT","DEPTH_BITS","DEPTH_BUFFER_BIT","DEPTH_CLEAR_VALUE","DEPTH_COMPONENT","DEPTH_COMPONENT16","DEPTH_FUNC","DEPTH_RANGE","DEPTH_STENCIL","DEPTH_STENCIL_ATTACHMENT","DEPTH_TEST","DEPTH_WRITEMASK","DIRECTION_DOWN","DIRECTION_LEFT","DIRECTION_RIGHT","DIRECTION_UP","DISABLED","DISPATCH_REQUEST_ERR","DITHER","DOCUMENT_FRAGMENT_NODE","DOCUMENT_NODE","DOCUMENT_POSITION_CONTAINED_BY","DOCUMENT_POSITION_CONTAINS","DOCUMENT_POSITION_DISCONNECTED","DOCUMENT_POSITION_FOLLOWING","DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC","DOCUMENT_POSITION_PRECEDING","DOCUMENT_TYPE_NODE","DOMCursor","DOMError","DOMException","DOMImplementation","DOMImplementationLS","DOMMatrix","DOMMatrixReadOnly","DOMParser","DOMPoint","DOMPointReadOnly","DOMQuad","DOMRect","DOMRectList","DOMRectReadOnly","DOMRequest","DOMSTRING_SIZE_ERR","DOMSettableTokenList","DOMStringList","DOMStringMap","DOMTokenList","DOMTransactionEvent","DOM_DELTA_LINE","DOM_DELTA_PAGE","DOM_DELTA_PIXEL","DOM_INPUT_METHOD_DROP","DOM_INPUT_METHOD_HANDWRITING","DOM_INPUT_METHOD_IME","DOM_INPUT_METHOD_KEYBOARD","DOM_INPUT_METHOD_MULTIMODAL","DOM_INPUT_METHOD_OPTION","DOM_INPUT_METHOD_PASTE","DOM_INPUT_METHOD_SCRIPT","DOM_INPUT_METHOD_UNKNOWN","DOM_INPUT_METHOD_VOICE","DOM_KEY_LOCATION_JOYSTICK","DOM_KEY_LOCATION_LEFT","DOM_KEY_LOCATION_MOBILE","DOM_KEY_LOCATION_NUMPAD","DOM_KEY_LOCATION_RIGHT","DOM_KEY_LOCATION_STANDARD","DOM_VK_0","DOM_VK_1","DOM_VK_2","DOM_VK_3","DOM_VK_4","DOM_VK_5","DOM_VK_6","DOM_VK_7","DOM_VK_8","DOM_VK_9","DOM_VK_A","DOM_VK_ACCEPT","DOM_VK_ADD","DOM_VK_ALT","DOM_VK_ALTGR","DOM_VK_AMPERSAND","DOM_VK_ASTERISK","DOM_VK_AT","DOM_VK_ATTN","DOM_VK_B","DOM_VK_BACKSPACE","DOM_VK_BACK_QUOTE","DOM_VK_BACK_SLASH","DOM_VK_BACK_SPACE","DOM_VK_C","DOM_VK_CANCEL","DOM_VK_CAPS_LOCK","DOM_VK_CIRCUMFLEX","DOM_VK_CLEAR","DOM_VK_CLOSE_BRACKET","DOM_VK_CLOSE_CURLY_BRACKET","DOM_VK_CLOSE_PAREN","DOM_VK_COLON","DOM_VK_COMMA","DOM_VK_CONTEXT_MENU","DOM_VK_CONTROL","DOM_VK_CONVERT","DOM_VK_CRSEL","DOM_VK_CTRL","DOM_VK_D","DOM_VK_DECIMAL","DOM_VK_DELETE","DOM_VK_DIVIDE","DOM_VK_DOLLAR","DOM_VK_DOUBLE_QUOTE","DOM_VK_DOWN","DOM_VK_E","DOM_VK_EISU","DOM_VK_END","DOM_VK_ENTER","DOM_VK_EQUALS","DOM_VK_EREOF","DOM_VK_ESCAPE","DOM_VK_EXCLAMATION","DOM_VK_EXECUTE","DOM_VK_EXSEL","DOM_VK_F","DOM_VK_F1","DOM_VK_F10","DOM_VK_F11","DOM_VK_F12","DOM_VK_F13","DOM_VK_F14","DOM_VK_F15","DOM_VK_F16","DOM_VK_F17","DOM_VK_F18","DOM_VK_F19","DOM_VK_F2","DOM_VK_F20","DOM_VK_F21","DOM_VK_F22","DOM_VK_F23","DOM_VK_F24","DOM_VK_F25","DOM_VK_F26","DOM_VK_F27","DOM_VK_F28","DOM_VK_F29","DOM_VK_F3","DOM_VK_F30","DOM_VK_F31","DOM_VK_F32","DOM_VK_F33","DOM_VK_F34","DOM_VK_F35","DOM_VK_F36","DOM_VK_F4","DOM_VK_F5","DOM_VK_F6","DOM_VK_F7","DOM_VK_F8","DOM_VK_F9","DOM_VK_FINAL","DOM_VK_FRONT","DOM_VK_G","DOM_VK_GREATER_THAN","DOM_VK_H","DOM_VK_HANGUL","DOM_VK_HANJA","DOM_VK_HASH","DOM_VK_HELP","DOM_VK_HK_TOGGLE","DOM_VK_HOME","DOM_VK_HYPHEN_MINUS","DOM_VK_I","DOM_VK_INSERT","DOM_VK_J","DOM_VK_JUNJA","DOM_VK_K","DOM_VK_KANA","DOM_VK_KANJI","DOM_VK_L","DOM_VK_LEFT","DOM_VK_LEFT_TAB","DOM_VK_LESS_THAN","DOM_VK_M","DOM_VK_META","DOM_VK_MODECHANGE","DOM_VK_MULTIPLY","DOM_VK_N","DOM_VK_NONCONVERT","DOM_VK_NUMPAD0","DOM_VK_NUMPAD1","DOM_VK_NUMPAD2","DOM_VK_NUMPAD3","DOM_VK_NUMPAD4","DOM_VK_NUMPAD5","DOM_VK_NUMPAD6","DOM_VK_NUMPAD7","DOM_VK_NUMPAD8","DOM_VK_NUMPAD9","DOM_VK_NUM_LOCK","DOM_VK_O","DOM_VK_OEM_1","DOM_VK_OEM_102","DOM_VK_OEM_2","DOM_VK_OEM_3","DOM_VK_OEM_4","DOM_VK_OEM_5","DOM_VK_OEM_6","DOM_VK_OEM_7","DOM_VK_OEM_8","DOM_VK_OEM_COMMA","DOM_VK_OEM_MINUS","DOM_VK_OEM_PERIOD","DOM_VK_OEM_PLUS","DOM_VK_OPEN_BRACKET","DOM_VK_OPEN_CURLY_BRACKET","DOM_VK_OPEN_PAREN","DOM_VK_P","DOM_VK_PA1","DOM_VK_PAGEDOWN","DOM_VK_PAGEUP","DOM_VK_PAGE_DOWN","DOM_VK_PAGE_UP","DOM_VK_PAUSE","DOM_VK_PERCENT","DOM_VK_PERIOD","DOM_VK_PIPE","DOM_VK_PLAY","DOM_VK_PLUS","DOM_VK_PRINT","DOM_VK_PRINTSCREEN","DOM_VK_PROCESSKEY","DOM_VK_PROPERITES","DOM_VK_Q","DOM_VK_QUESTION_MARK","DOM_VK_QUOTE","DOM_VK_R","DOM_VK_REDO","DOM_VK_RETURN","DOM_VK_RIGHT","DOM_VK_S","DOM_VK_SCROLL_LOCK","DOM_VK_SELECT","DOM_VK_SEMICOLON","DOM_VK_SEPARATOR","DOM_VK_SHIFT","DOM_VK_SLASH","DOM_VK_SLEEP","DOM_VK_SPACE","DOM_VK_SUBTRACT","DOM_VK_T","DOM_VK_TAB","DOM_VK_TILDE","DOM_VK_U","DOM_VK_UNDERSCORE","DOM_VK_UNDO","DOM_VK_UNICODE","DOM_VK_UP","DOM_VK_V","DOM_VK_VOLUME_DOWN","DOM_VK_VOLUME_MUTE","DOM_VK_VOLUME_UP","DOM_VK_W","DOM_VK_WIN","DOM_VK_WINDOW","DOM_VK_WIN_ICO_00","DOM_VK_WIN_ICO_CLEAR","DOM_VK_WIN_ICO_HELP","DOM_VK_WIN_OEM_ATTN","DOM_VK_WIN_OEM_AUTO","DOM_VK_WIN_OEM_BACKTAB","DOM_VK_WIN_OEM_CLEAR","DOM_VK_WIN_OEM_COPY","DOM_VK_WIN_OEM_CUSEL","DOM_VK_WIN_OEM_ENLW","DOM_VK_WIN_OEM_FINISH","DOM_VK_WIN_OEM_FJ_JISHO","DOM_VK_WIN_OEM_FJ_LOYA","DOM_VK_WIN_OEM_FJ_MASSHOU","DOM_VK_WIN_OEM_FJ_ROYA","DOM_VK_WIN_OEM_FJ_TOUROKU","DOM_VK_WIN_OEM_JUMP","DOM_VK_WIN_OEM_PA1","DOM_VK_WIN_OEM_PA2","DOM_VK_WIN_OEM_PA3","DOM_VK_WIN_OEM_RESET","DOM_VK_WIN_OEM_WSCTRL","DOM_VK_X","DOM_VK_XF86XK_ADD_FAVORITE","DOM_VK_XF86XK_APPLICATION_LEFT","DOM_VK_XF86XK_APPLICATION_RIGHT","DOM_VK_XF86XK_AUDIO_CYCLE_TRACK","DOM_VK_XF86XK_AUDIO_FORWARD","DOM_VK_XF86XK_AUDIO_LOWER_VOLUME","DOM_VK_XF86XK_AUDIO_MEDIA","DOM_VK_XF86XK_AUDIO_MUTE","DOM_VK_XF86XK_AUDIO_NEXT","DOM_VK_XF86XK_AUDIO_PAUSE","DOM_VK_XF86XK_AUDIO_PLAY","DOM_VK_XF86XK_AUDIO_PREV","DOM_VK_XF86XK_AUDIO_RAISE_VOLUME","DOM_VK_XF86XK_AUDIO_RANDOM_PLAY","DOM_VK_XF86XK_AUDIO_RECORD","DOM_VK_XF86XK_AUDIO_REPEAT","DOM_VK_XF86XK_AUDIO_REWIND","DOM_VK_XF86XK_AUDIO_STOP","DOM_VK_XF86XK_AWAY","DOM_VK_XF86XK_BACK","DOM_VK_XF86XK_BACK_FORWARD","DOM_VK_XF86XK_BATTERY","DOM_VK_XF86XK_BLUE","DOM_VK_XF86XK_BLUETOOTH","DOM_VK_XF86XK_BOOK","DOM_VK_XF86XK_BRIGHTNESS_ADJUST","DOM_VK_XF86XK_CALCULATOR","DOM_VK_XF86XK_CALENDAR","DOM_VK_XF86XK_CD","DOM_VK_XF86XK_CLOSE","DOM_VK_XF86XK_COMMUNITY","DOM_VK_XF86XK_CONTRAST_ADJUST","DOM_VK_XF86XK_COPY","DOM_VK_XF86XK_CUT","DOM_VK_XF86XK_CYCLE_ANGLE","DOM_VK_XF86XK_DISPLAY","DOM_VK_XF86XK_DOCUMENTS","DOM_VK_XF86XK_DOS","DOM_VK_XF86XK_EJECT","DOM_VK_XF86XK_EXCEL","DOM_VK_XF86XK_EXPLORER","DOM_VK_XF86XK_FAVORITES","DOM_VK_XF86XK_FINANCE","DOM_VK_XF86XK_FORWARD","DOM_VK_XF86XK_FRAME_BACK","DOM_VK_XF86XK_FRAME_FORWARD","DOM_VK_XF86XK_GAME","DOM_VK_XF86XK_GO","DOM_VK_XF86XK_GREEN","DOM_VK_XF86XK_HIBERNATE","DOM_VK_XF86XK_HISTORY","DOM_VK_XF86XK_HOME_PAGE","DOM_VK_XF86XK_HOT_LINKS","DOM_VK_XF86XK_I_TOUCH","DOM_VK_XF86XK_KBD_BRIGHTNESS_DOWN","DOM_VK_XF86XK_KBD_BRIGHTNESS_UP","DOM_VK_XF86XK_KBD_LIGHT_ON_OFF","DOM_VK_XF86XK_LAUNCH0","DOM_VK_XF86XK_LAUNCH1","DOM_VK_XF86XK_LAUNCH2","DOM_VK_XF86XK_LAUNCH3","DOM_VK_XF86XK_LAUNCH4","DOM_VK_XF86XK_LAUNCH5","DOM_VK_XF86XK_LAUNCH6","DOM_VK_XF86XK_LAUNCH7","DOM_VK_XF86XK_LAUNCH8","DOM_VK_XF86XK_LAUNCH9","DOM_VK_XF86XK_LAUNCH_A","DOM_VK_XF86XK_LAUNCH_B","DOM_VK_XF86XK_LAUNCH_C","DOM_VK_XF86XK_LAUNCH_D","DOM_VK_XF86XK_LAUNCH_E","DOM_VK_XF86XK_LAUNCH_F","DOM_VK_XF86XK_LIGHT_BULB","DOM_VK_XF86XK_LOG_OFF","DOM_VK_XF86XK_MAIL","DOM_VK_XF86XK_MAIL_FORWARD","DOM_VK_XF86XK_MARKET","DOM_VK_XF86XK_MEETING","DOM_VK_XF86XK_MEMO","DOM_VK_XF86XK_MENU_KB","DOM_VK_XF86XK_MENU_PB","DOM_VK_XF86XK_MESSENGER","DOM_VK_XF86XK_MON_BRIGHTNESS_DOWN","DOM_VK_XF86XK_MON_BRIGHTNESS_UP","DOM_VK_XF86XK_MUSIC","DOM_VK_XF86XK_MY_COMPUTER","DOM_VK_XF86XK_MY_SITES","DOM_VK_XF86XK_NEW","DOM_VK_XF86XK_NEWS","DOM_VK_XF86XK_OFFICE_HOME","DOM_VK_XF86XK_OPEN","DOM_VK_XF86XK_OPEN_URL","DOM_VK_XF86XK_OPTION","DOM_VK_XF86XK_PASTE","DOM_VK_XF86XK_PHONE","DOM_VK_XF86XK_PICTURES","DOM_VK_XF86XK_POWER_DOWN","DOM_VK_XF86XK_POWER_OFF","DOM_VK_XF86XK_RED","DOM_VK_XF86XK_REFRESH","DOM_VK_XF86XK_RELOAD","DOM_VK_XF86XK_REPLY","DOM_VK_XF86XK_ROCKER_DOWN","DOM_VK_XF86XK_ROCKER_ENTER","DOM_VK_XF86XK_ROCKER_UP","DOM_VK_XF86XK_ROTATE_WINDOWS","DOM_VK_XF86XK_ROTATION_KB","DOM_VK_XF86XK_ROTATION_PB","DOM_VK_XF86XK_SAVE","DOM_VK_XF86XK_SCREEN_SAVER","DOM_VK_XF86XK_SCROLL_CLICK","DOM_VK_XF86XK_SCROLL_DOWN","DOM_VK_XF86XK_SCROLL_UP","DOM_VK_XF86XK_SEARCH","DOM_VK_XF86XK_SEND","DOM_VK_XF86XK_SHOP","DOM_VK_XF86XK_SPELL","DOM_VK_XF86XK_SPLIT_SCREEN","DOM_VK_XF86XK_STANDBY","DOM_VK_XF86XK_START","DOM_VK_XF86XK_STOP","DOM_VK_XF86XK_SUBTITLE","DOM_VK_XF86XK_SUPPORT","DOM_VK_XF86XK_SUSPEND","DOM_VK_XF86XK_TASK_PANE","DOM_VK_XF86XK_TERMINAL","DOM_VK_XF86XK_TIME","DOM_VK_XF86XK_TOOLS","DOM_VK_XF86XK_TOP_MENU","DOM_VK_XF86XK_TO_DO_LIST","DOM_VK_XF86XK_TRAVEL","DOM_VK_XF86XK_USER1KB","DOM_VK_XF86XK_USER2KB","DOM_VK_XF86XK_USER_PB","DOM_VK_XF86XK_UWB","DOM_VK_XF86XK_VENDOR_HOME","DOM_VK_XF86XK_VIDEO","DOM_VK_XF86XK_VIEW","DOM_VK_XF86XK_WAKE_UP","DOM_VK_XF86XK_WEB_CAM","DOM_VK_XF86XK_WHEEL_BUTTON","DOM_VK_XF86XK_WLAN","DOM_VK_XF86XK_WORD","DOM_VK_XF86XK_WWW","DOM_VK_XF86XK_XFER","DOM_VK_XF86XK_YELLOW","DOM_VK_XF86XK_ZOOM_IN","DOM_VK_XF86XK_ZOOM_OUT","DOM_VK_Y","DOM_VK_Z","DOM_VK_ZOOM","DONE","DONT_CARE","DOWNLOADING","DRAGDROP","DST_ALPHA","DST_COLOR","DYNAMIC_DRAW","DataChannel","DataTransfer","DataTransferItem","DataTransferItemList","DataView","Date","DateTimeFormat","DelayNode","DesktopNotification","DesktopNotificationCenter","DeviceLightEvent","DeviceMotionEvent","DeviceOrientationEvent","DeviceProximityEvent","DeviceStorage","DeviceStorageChangeEvent","Document","DocumentFragment","DocumentType","DragEvent","DynamicsCompressorNode","E","ELEMENT_ARRAY_BUFFER","ELEMENT_ARRAY_BUFFER_BINDING","ELEMENT_NODE","EMPTY","ENCODING_ERR","ENDED","END_TO_END","END_TO_START","ENTITY_NODE","ENTITY_REFERENCE_NODE","EPSILON","EQUAL","EQUALPOWER","ERROR","EXPONENTIAL_DISTANCE","Element","ElementQuery","Entity","EntityReference","Error","ErrorEvent","EvalError","Event","EventException","EventSource","EventTarget","External","FASTEST","FIDOSDK","FILTER_ACCEPT","FILTER_INTERRUPT","FILTER_REJECT","FILTER_SKIP","FINISHED_STATE","FIRST_ORDERED_NODE_TYPE","FLOAT","FLOAT_MAT2","FLOAT_MAT3","FLOAT_MAT4","FLOAT_VEC2","FLOAT_VEC3","FLOAT_VEC4","FOCUS","FONT_FACE_RULE","FONT_FEATURE_VALUES_RULE","FRAGMENT_SHADER","FRAGMENT_SHADER_DERIVATIVE_HINT_OES","FRAMEBUFFER","FRAMEBUFFER_ATTACHMENT_OBJECT_NAME","FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE","FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE","FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL","FRAMEBUFFER_BINDING","FRAMEBUFFER_COMPLETE","FRAMEBUFFER_INCOMPLETE_ATTACHMENT","FRAMEBUFFER_INCOMPLETE_DIMENSIONS","FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT","FRAMEBUFFER_UNSUPPORTED","FRONT","FRONT_AND_BACK","FRONT_FACE","FUNC_ADD","FUNC_REVERSE_SUBTRACT","FUNC_SUBTRACT","Feed","FeedEntry","File","FileError","FileList","FileReader","FindInPage","Float32Array","Float64Array","FocusEvent","FontFace","FormData","Function","GENERATE_MIPMAP_HINT","GEQUAL","GREATER","GREEN_BITS","GainNode","Gamepad","GamepadButton","GamepadEvent","GestureEvent","HAVE_CURRENT_DATA","HAVE_ENOUGH_DATA","HAVE_FUTURE_DATA","HAVE_METADATA","HAVE_NOTHING","HEADERS_RECEIVED","HIDDEN","HIERARCHY_REQUEST_ERR","HIGHPASS","HIGHSHELF","HIGH_FLOAT","HIGH_INT","HORIZONTAL","HORIZONTAL_AXIS","HRTF","HTMLAllCollection","HTMLAnchorElement","HTMLAppletElement","HTMLAreaElement","HTMLAudioElement","HTMLBRElement","HTMLBaseElement","HTMLBaseFontElement","HTMLBlockquoteElement","HTMLBodyElement","HTMLButtonElement","HTMLCanvasElement","HTMLCollection","HTMLCommandElement","HTMLContentElement","HTMLDListElement","HTMLDataElement","HTMLDataListElement","HTMLDetailsElement","HTMLDialogElement","HTMLDirectoryElement","HTMLDivElement","HTMLDocument","HTMLElement","HTMLEmbedElement","HTMLFieldSetElement","HTMLFontElement","HTMLFormControlsCollection","HTMLFormElement","HTMLFrameElement","HTMLFrameSetElement","HTMLHRElement","HTMLHeadElement","HTMLHeadingElement","HTMLHtmlElement","HTMLIFrameElement","HTMLImageElement","HTMLInputElement","HTMLIsIndexElement","HTMLKeygenElement","HTMLLIElement","HTMLLabelElement","HTMLLegendElement","HTMLLinkElement","HTMLMapElement","HTMLMarqueeElement","HTMLMediaElement","HTMLMenuElement","HTMLMenuItemElement","HTMLMetaElement","HTMLMeterElement","HTMLModElement","HTMLOListElement","HTMLObjectElement","HTMLOptGroupElement","HTMLOptionElement","HTMLOptionsCollection","HTMLOutputElement","HTMLParagraphElement","HTMLParamElement","HTMLPictureElement","HTMLPreElement","HTMLProgressElement","HTMLPropertiesCollection","HTMLQuoteElement","HTMLScriptElement","HTMLSelectElement","HTMLShadowElement","HTMLSourceElement","HTMLSpanElement","HTMLStyleElement","HTMLTableCaptionElement","HTMLTableCellElement","HTMLTableColElement","HTMLTableElement","HTMLTableRowElement","HTMLTableSectionElement","HTMLTemplateElement","HTMLTextAreaElement","HTMLTimeElement","HTMLTitleElement","HTMLTrackElement","HTMLUListElement","HTMLUnknownElement","HTMLVideoElement","HashChangeEvent","Headers","History","ICE_CHECKING","ICE_CLOSED","ICE_COMPLETED","ICE_CONNECTED","ICE_FAILED","ICE_GATHERING","ICE_WAITING","IDBCursor","IDBCursorWithValue","IDBDatabase","IDBDatabaseException","IDBFactory","IDBFileHandle","IDBFileRequest","IDBIndex","IDBKeyRange","IDBMutableFile","IDBObjectStore","IDBOpenDBRequest","IDBRequest","IDBTransaction","IDBVersionChangeEvent","IDLE","IMPLEMENTATION_COLOR_READ_FORMAT","IMPLEMENTATION_COLOR_READ_TYPE","IMPORT_RULE","INCR","INCR_WRAP","INDEX_SIZE_ERR","INT","INT_VEC2","INT_VEC3","INT_VEC4","INUSE_ATTRIBUTE_ERR","INVALID_ACCESS_ERR","INVALID_CHARACTER_ERR","INVALID_ENUM","INVALID_EXPRESSION_ERR","INVALID_FRAMEBUFFER_OPERATION","INVALID_MODIFICATION_ERR","INVALID_NODE_TYPE_ERR","INVALID_OPERATION","INVALID_STATE_ERR","INVALID_VALUE","INVERSE_DISTANCE","INVERT","IceCandidate","Image","ImageBitmap","ImageData","Infinity","InputEvent","InputMethodContext","InstallTrigger","Int16Array","Int32Array","Int8Array","Intent","InternalError","Intl","IsSearchProviderInstalled","Iterator","JSON","KEEP","KEYDOWN","KEYFRAMES_RULE","KEYFRAME_RULE","KEYPRESS","KEYUP","KeyEvent","KeyboardEvent","LENGTHADJUST_SPACING","LENGTHADJUST_SPACINGANDGLYPHS","LENGTHADJUST_UNKNOWN","LEQUAL","LESS","LINEAR","LINEAR_DISTANCE","LINEAR_MIPMAP_LINEAR","LINEAR_MIPMAP_NEAREST","LINES","LINE_LOOP","LINE_STRIP","LINE_WIDTH","LINK_STATUS","LIVE","LN10","LN2","LOADED","LOADING","LOG10E","LOG2E","LOWPASS","LOWSHELF","LOW_FLOAT","LOW_INT","LSException","LSParserFilter","LUMINANCE","LUMINANCE_ALPHA","LocalMediaStream","Location","MAX_COMBINED_TEXTURE_IMAGE_UNITS","MAX_CUBE_MAP_TEXTURE_SIZE","MAX_FRAGMENT_UNIFORM_VECTORS","MAX_RENDERBUFFER_SIZE","MAX_SAFE_INTEGER","MAX_TEXTURE_IMAGE_UNITS","MAX_TEXTURE_MAX_ANISOTROPY_EXT","MAX_TEXTURE_SIZE","MAX_VALUE","MAX_VARYING_VECTORS","MAX_VERTEX_ATTRIBS","MAX_VERTEX_TEXTURE_IMAGE_UNITS","MAX_VERTEX_UNIFORM_VECTORS","MAX_VIEWPORT_DIMS","MEDIA_ERR_ABORTED","MEDIA_ERR_DECODE","MEDIA_ERR_ENCRYPTED","MEDIA_ERR_NETWORK","MEDIA_ERR_SRC_NOT_SUPPORTED","MEDIA_KEYERR_CLIENT","MEDIA_KEYERR_DOMAIN","MEDIA_KEYERR_HARDWARECHANGE","MEDIA_KEYERR_OUTPUT","MEDIA_KEYERR_SERVICE","MEDIA_KEYERR_UNKNOWN","MEDIA_RULE","MEDIUM_FLOAT","MEDIUM_INT","META_MASK","MIN_SAFE_INTEGER","MIN_VALUE","MIRRORED_REPEAT","MODE_ASYNCHRONOUS","MODE_SYNCHRONOUS","MODIFICATION","MOUSEDOWN","MOUSEDRAG","MOUSEMOVE","MOUSEOUT","MOUSEOVER","MOUSEUP","MOZ_KEYFRAMES_RULE","MOZ_KEYFRAME_RULE","MOZ_SOURCE_CURSOR","MOZ_SOURCE_ERASER","MOZ_SOURCE_KEYBOARD","MOZ_SOURCE_MOUSE","MOZ_SOURCE_PEN","MOZ_SOURCE_TOUCH","MOZ_SOURCE_UNKNOWN","MSGESTURE_FLAG_BEGIN","MSGESTURE_FLAG_CANCEL","MSGESTURE_FLAG_END","MSGESTURE_FLAG_INERTIA","MSGESTURE_FLAG_NONE","MSPOINTER_TYPE_MOUSE","MSPOINTER_TYPE_PEN","MSPOINTER_TYPE_TOUCH","MS_ASYNC_CALLBACK_STATUS_ASSIGN_DELEGATE","MS_ASYNC_CALLBACK_STATUS_CANCEL","MS_ASYNC_CALLBACK_STATUS_CHOOSEANY","MS_ASYNC_CALLBACK_STATUS_ERROR","MS_ASYNC_CALLBACK_STATUS_JOIN","MS_ASYNC_OP_STATUS_CANCELED","MS_ASYNC_OP_STATUS_ERROR","MS_ASYNC_OP_STATUS_SUCCESS","MS_MANIPULATION_STATE_ACTIVE","MS_MANIPULATION_STATE_CANCELLED","MS_MANIPULATION_STATE_COMMITTED","MS_MANIPULATION_STATE_DRAGGING","MS_MANIPULATION_STATE_INERTIA","MS_MANIPULATION_STATE_PRESELECT","MS_MANIPULATION_STATE_SELECTING","MS_MANIPULATION_STATE_STOPPED","MS_MEDIA_ERR_ENCRYPTED","MS_MEDIA_KEYERR_CLIENT","MS_MEDIA_KEYERR_DOMAIN","MS_MEDIA_KEYERR_HARDWARECHANGE","MS_MEDIA_KEYERR_OUTPUT","MS_MEDIA_KEYERR_SERVICE","MS_MEDIA_KEYERR_UNKNOWN","Map","Math","MediaController","MediaDevices","MediaElementAudioSourceNode","MediaEncryptedEvent","MediaError","MediaKeyError","MediaKeyEvent","MediaKeyMessageEvent","MediaKeyNeededEvent","MediaKeySession","MediaKeyStatusMap","MediaKeySystemAccess","MediaKeys","MediaList","MediaQueryList","MediaQueryListEvent","MediaRecorder","MediaSource","MediaStream","MediaStreamAudioDestinationNode","MediaStreamAudioSourceNode","MediaStreamEvent","MediaStreamTrack","MediaStreamTrackEvent","MessageChannel","MessageEvent","MessagePort","Methods","MimeType","MimeTypeArray","MouseEvent","MouseScrollEvent","MozAnimation","MozAnimationDelay","MozAnimationDirection","MozAnimationDuration","MozAnimationFillMode","MozAnimationIterationCount","MozAnimationName","MozAnimationPlayState","MozAnimationTimingFunction","MozAppearance","MozBackfaceVisibility","MozBinding","MozBorderBottomColors","MozBorderEnd","MozBorderEndColor","MozBorderEndStyle","MozBorderEndWidth","MozBorderImage","MozBorderLeftColors","MozBorderRightColors","MozBorderStart","MozBorderStartColor","MozBorderStartStyle","MozBorderStartWidth","MozBorderTopColors","MozBoxAlign","MozBoxDirection","MozBoxFlex","MozBoxOrdinalGroup","MozBoxOrient","MozBoxPack","MozBoxSizing","MozCSSKeyframeRule","MozCSSKeyframesRule","MozColumnCount","MozColumnFill","MozColumnGap","MozColumnRule","MozColumnRuleColor","MozColumnRuleStyle","MozColumnRuleWidth","MozColumnWidth","MozColumns","MozContactChangeEvent","MozFloatEdge","MozFontFeatureSettings","MozFontLanguageOverride","MozForceBrokenImageIcon","MozHyphens","MozImageRegion","MozMarginEnd","MozMarginStart","MozMmsEvent","MozMmsMessage","MozMobileMessageThread","MozOSXFontSmoothing","MozOrient","MozOutlineRadius","MozOutlineRadiusBottomleft","MozOutlineRadiusBottomright","MozOutlineRadiusTopleft","MozOutlineRadiusTopright","MozPaddingEnd","MozPaddingStart","MozPerspective","MozPerspectiveOrigin","MozPowerManager","MozSettingsEvent","MozSmsEvent","MozSmsMessage","MozStackSizing","MozTabSize","MozTextAlignLast","MozTextDecorationColor","MozTextDecorationLine","MozTextDecorationStyle","MozTextSizeAdjust","MozTransform","MozTransformOrigin","MozTransformStyle","MozTransition","MozTransitionDelay","MozTransitionDuration","MozTransitionProperty","MozTransitionTimingFunction","MozUserFocus","MozUserInput","MozUserModify","MozUserSelect","MozWindowDragging","MozWindowShadow","MutationEvent","MutationObserver","MutationRecord","NAMESPACE_ERR","NAMESPACE_RULE","NEAREST","NEAREST_MIPMAP_LINEAR","NEAREST_MIPMAP_NEAREST","NEGATIVE_INFINITY","NETWORK_EMPTY","NETWORK_ERR","NETWORK_IDLE","NETWORK_LOADED","NETWORK_LOADING","NETWORK_NO_SOURCE","NEVER","NEW","NEXT","NEXT_NO_DUPLICATE","NICEST","NODE_AFTER","NODE_BEFORE","NODE_BEFORE_AND_AFTER","NODE_INSIDE","NONE","NON_TRANSIENT_ERR","NOTATION_NODE","NOTCH","NOTEQUAL","NOT_ALLOWED_ERR","NOT_FOUND_ERR","NOT_READABLE_ERR","NOT_SUPPORTED_ERR","NO_DATA_ALLOWED_ERR","NO_ERR","NO_ERROR","NO_MODIFICATION_ALLOWED_ERR","NUMBER_TYPE","NUM_COMPRESSED_TEXTURE_FORMATS","NaN","NamedNodeMap","Navigator","NearbyLinks","NetworkInformation","Node","NodeFilter","NodeIterator","NodeList","Notation","Notification","NotifyPaintEvent","Number","NumberFormat","OBSOLETE","ONE","ONE_MINUS_CONSTANT_ALPHA","ONE_MINUS_CONSTANT_COLOR","ONE_MINUS_DST_ALPHA","ONE_MINUS_DST_COLOR","ONE_MINUS_SRC_ALPHA","ONE_MINUS_SRC_COLOR","OPEN","OPENED","OPENING","ORDERED_NODE_ITERATOR_TYPE","ORDERED_NODE_SNAPSHOT_TYPE","OUT_OF_MEMORY","Object","OfflineAudioCompletionEvent","OfflineAudioContext","OfflineResourceList","Option","OscillatorNode","OverflowEvent","PACK_ALIGNMENT","PAGE_RULE","PARSE_ERR","PATHSEG_ARC_ABS","PATHSEG_ARC_REL","PATHSEG_CLOSEPATH","PATHSEG_CURVETO_CUBIC_ABS","PATHSEG_CURVETO_CUBIC_REL","PATHSEG_CURVETO_CUBIC_SMOOTH_ABS","PATHSEG_CURVETO_CUBIC_SMOOTH_REL","PATHSEG_CURVETO_QUADRATIC_ABS","PATHSEG_CURVETO_QUADRATIC_REL","PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS","PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL","PATHSEG_LINETO_ABS","PATHSEG_LINETO_HORIZONTAL_ABS","PATHSEG_LINETO_HORIZONTAL_REL","PATHSEG_LINETO_REL","PATHSEG_LINETO_VERTICAL_ABS","PATHSEG_LINETO_VERTICAL_REL","PATHSEG_MOVETO_ABS","PATHSEG_MOVETO_REL","PATHSEG_UNKNOWN","PATH_EXISTS_ERR","PEAKING","PERMISSION_DENIED","PERSISTENT","PI","PLAYING_STATE","POINTS","POLYGON_OFFSET_FACTOR","POLYGON_OFFSET_FILL","POLYGON_OFFSET_UNITS","POSITION_UNAVAILABLE","POSITIVE_INFINITY","PREV","PREV_NO_DUPLICATE","PROCESSING_INSTRUCTION_NODE","PageChangeEvent","PageTransitionEvent","PaintRequest","PaintRequestList","PannerNode","Path2D","Performance","PerformanceEntry","PerformanceMark","PerformanceMeasure","PerformanceNavigation","PerformanceResourceTiming","PerformanceTiming","PeriodicWave","Plugin","PluginArray","PopStateEvent","PopupBlockedEvent","ProcessingInstruction","ProgressEvent","Promise","PropertyNodeList","Proxy","PushManager","PushSubscription","Q","QUOTA_ERR","QUOTA_EXCEEDED_ERR","QueryInterface","READ_ONLY","READ_ONLY_ERR","READ_WRITE","RED_BITS","REMOVAL","RENDERBUFFER","RENDERBUFFER_ALPHA_SIZE","RENDERBUFFER_BINDING","RENDERBUFFER_BLUE_SIZE","RENDERBUFFER_DEPTH_SIZE","RENDERBUFFER_GREEN_SIZE","RENDERBUFFER_HEIGHT","RENDERBUFFER_INTERNAL_FORMAT","RENDERBUFFER_RED_SIZE","RENDERBUFFER_STENCIL_SIZE","RENDERBUFFER_WIDTH","RENDERER","RENDERING_INTENT_ABSOLUTE_COLORIMETRIC","RENDERING_INTENT_AUTO","RENDERING_INTENT_PERCEPTUAL","RENDERING_INTENT_RELATIVE_COLORIMETRIC","RENDERING_INTENT_SATURATION","RENDERING_INTENT_UNKNOWN","REPEAT","REPLACE","RGB","RGB565","RGB5_A1","RGBA","RGBA4","RGBColor","ROTATION_CLOCKWISE","ROTATION_COUNTERCLOCKWISE","RTCDataChannelEvent","RTCIceCandidate","RTCPeerConnectionIceEvent","RTCRtpReceiver","RTCRtpSender","RTCSessionDescription","RTCStatsReport","RadioNodeList","Range","RangeError","RangeException","RecordErrorEvent","Rect","ReferenceError","RegExp","Request","Response","SAMPLER_2D","SAMPLER_CUBE","SAMPLES","SAMPLE_ALPHA_TO_COVERAGE","SAMPLE_BUFFERS","SAMPLE_COVERAGE","SAMPLE_COVERAGE_INVERT","SAMPLE_COVERAGE_VALUE","SAWTOOTH","SCHEDULED_STATE","SCISSOR_BOX","SCISSOR_TEST","SCROLL_PAGE_DOWN","SCROLL_PAGE_UP","SDP_ANSWER","SDP_OFFER","SDP_PRANSWER","SECURITY_ERR","SELECT","SERIALIZE_ERR","SEVERITY_ERROR","SEVERITY_FATAL_ERROR","SEVERITY_WARNING","SHADER_COMPILER","SHADER_TYPE","SHADING_LANGUAGE_VERSION","SHIFT_MASK","SHORT","SHOWING","SHOW_ALL","SHOW_ATTRIBUTE","SHOW_CDATA_SECTION","SHOW_COMMENT","SHOW_DOCUMENT","SHOW_DOCUMENT_FRAGMENT","SHOW_DOCUMENT_TYPE","SHOW_ELEMENT","SHOW_ENTITY","SHOW_ENTITY_REFERENCE","SHOW_NOTATION","SHOW_PROCESSING_INSTRUCTION","SHOW_TEXT","SINE","SOUNDFIELD","SQLException","SQRT1_2","SQRT2","SQUARE","SRC_ALPHA","SRC_ALPHA_SATURATE","SRC_COLOR","START_TO_END","START_TO_START","STATIC_DRAW","STENCIL_ATTACHMENT","STENCIL_BACK_FAIL","STENCIL_BACK_FUNC","STENCIL_BACK_PASS_DEPTH_FAIL","STENCIL_BACK_PASS_DEPTH_PASS","STENCIL_BACK_REF","STENCIL_BACK_VALUE_MASK","STENCIL_BACK_WRITEMASK","STENCIL_BITS","STENCIL_BUFFER_BIT","STENCIL_CLEAR_VALUE","STENCIL_FAIL","STENCIL_FUNC","STENCIL_INDEX","STENCIL_INDEX8","STENCIL_PASS_DEPTH_FAIL","STENCIL_PASS_DEPTH_PASS","STENCIL_REF","STENCIL_TEST","STENCIL_VALUE_MASK","STENCIL_WRITEMASK","STREAM_DRAW","STRING_TYPE","STYLE_RULE","SUBPIXEL_BITS","SUPPORTS_RULE","SVGAElement","SVGAltGlyphDefElement","SVGAltGlyphElement","SVGAltGlyphItemElement","SVGAngle","SVGAnimateColorElement","SVGAnimateElement","SVGAnimateMotionElement","SVGAnimateTransformElement","SVGAnimatedAngle","SVGAnimatedBoolean","SVGAnimatedEnumeration","SVGAnimatedInteger","SVGAnimatedLength","SVGAnimatedLengthList","SVGAnimatedNumber","SVGAnimatedNumberList","SVGAnimatedPreserveAspectRatio","SVGAnimatedRect","SVGAnimatedString","SVGAnimatedTransformList","SVGAnimationElement","SVGCircleElement","SVGClipPathElement","SVGColor","SVGComponentTransferFunctionElement","SVGCursorElement","SVGDefsElement","SVGDescElement","SVGDiscardElement","SVGDocument","SVGElement","SVGElementInstance","SVGElementInstanceList","SVGEllipseElement","SVGException","SVGFEBlendElement","SVGFEColorMatrixElement","SVGFEComponentTransferElement","SVGFECompositeElement","SVGFEConvolveMatrixElement","SVGFEDiffuseLightingElement","SVGFEDisplacementMapElement","SVGFEDistantLightElement","SVGFEDropShadowElement","SVGFEFloodElement","SVGFEFuncAElement","SVGFEFuncBElement","SVGFEFuncGElement","SVGFEFuncRElement","SVGFEGaussianBlurElement","SVGFEImageElement","SVGFEMergeElement","SVGFEMergeNodeElement","SVGFEMorphologyElement","SVGFEOffsetElement","SVGFEPointLightElement","SVGFESpecularLightingElement","SVGFESpotLightElement","SVGFETileElement","SVGFETurbulenceElement","SVGFilterElement","SVGFontElement","SVGFontFaceElement","SVGFontFaceFormatElement","SVGFontFaceNameElement","SVGFontFaceSrcElement","SVGFontFaceUriElement","SVGForeignObjectElement","SVGGElement","SVGGeometryElement","SVGGlyphElement","SVGGlyphRefElement","SVGGradientElement","SVGGraphicsElement","SVGHKernElement","SVGImageElement","SVGLength","SVGLengthList","SVGLineElement","SVGLinearGradientElement","SVGMPathElement","SVGMarkerElement","SVGMaskElement","SVGMatrix","SVGMetadataElement","SVGMissingGlyphElement","SVGNumber","SVGNumberList","SVGPaint","SVGPathElement","SVGPathSeg","SVGPathSegArcAbs","SVGPathSegArcRel","SVGPathSegClosePath","SVGPathSegCurvetoCubicAbs","SVGPathSegCurvetoCubicRel","SVGPathSegCurvetoCubicSmoothAbs","SVGPathSegCurvetoCubicSmoothRel","SVGPathSegCurvetoQuadraticAbs","SVGPathSegCurvetoQuadraticRel","SVGPathSegCurvetoQuadraticSmoothAbs","SVGPathSegCurvetoQuadraticSmoothRel","SVGPathSegLinetoAbs","SVGPathSegLinetoHorizontalAbs","SVGPathSegLinetoHorizontalRel","SVGPathSegLinetoRel","SVGPathSegLinetoVerticalAbs","SVGPathSegLinetoVerticalRel","SVGPathSegList","SVGPathSegMovetoAbs","SVGPathSegMovetoRel","SVGPatternElement","SVGPoint","SVGPointList","SVGPolygonElement","SVGPolylineElement","SVGPreserveAspectRatio","SVGRadialGradientElement","SVGRect","SVGRectElement","SVGRenderingIntent","SVGSVGElement","SVGScriptElement","SVGSetElement","SVGStopElement","SVGStringList","SVGStyleElement","SVGSwitchElement","SVGSymbolElement","SVGTRefElement","SVGTSpanElement","SVGTextContentElement","SVGTextElement","SVGTextPathElement","SVGTextPositioningElement","SVGTitleElement","SVGTransform","SVGTransformList","SVGUnitTypes","SVGUseElement","SVGVKernElement","SVGViewElement","SVGViewSpec","SVGZoomAndPan","SVGZoomEvent","SVG_ANGLETYPE_DEG","SVG_ANGLETYPE_GRAD","SVG_ANGLETYPE_RAD","SVG_ANGLETYPE_UNKNOWN","SVG_ANGLETYPE_UNSPECIFIED","SVG_CHANNEL_A","SVG_CHANNEL_B","SVG_CHANNEL_G","SVG_CHANNEL_R","SVG_CHANNEL_UNKNOWN","SVG_COLORTYPE_CURRENTCOLOR","SVG_COLORTYPE_RGBCOLOR","SVG_COLORTYPE_RGBCOLOR_ICCCOLOR","SVG_COLORTYPE_UNKNOWN","SVG_EDGEMODE_DUPLICATE","SVG_EDGEMODE_NONE","SVG_EDGEMODE_UNKNOWN","SVG_EDGEMODE_WRAP","SVG_FEBLEND_MODE_COLOR","SVG_FEBLEND_MODE_COLOR_BURN","SVG_FEBLEND_MODE_COLOR_DODGE","SVG_FEBLEND_MODE_DARKEN","SVG_FEBLEND_MODE_DIFFERENCE","SVG_FEBLEND_MODE_EXCLUSION","SVG_FEBLEND_MODE_HARD_LIGHT","SVG_FEBLEND_MODE_HUE","SVG_FEBLEND_MODE_LIGHTEN","SVG_FEBLEND_MODE_LUMINOSITY","SVG_FEBLEND_MODE_MULTIPLY","SVG_FEBLEND_MODE_NORMAL","SVG_FEBLEND_MODE_OVERLAY","SVG_FEBLEND_MODE_SATURATION","SVG_FEBLEND_MODE_SCREEN","SVG_FEBLEND_MODE_SOFT_LIGHT","SVG_FEBLEND_MODE_UNKNOWN","SVG_FECOLORMATRIX_TYPE_HUEROTATE","SVG_FECOLORMATRIX_TYPE_LUMINANCETOALPHA","SVG_FECOLORMATRIX_TYPE_MATRIX","SVG_FECOLORMATRIX_TYPE_SATURATE","SVG_FECOLORMATRIX_TYPE_UNKNOWN","SVG_FECOMPONENTTRANSFER_TYPE_DISCRETE","SVG_FECOMPONENTTRANSFER_TYPE_GAMMA","SVG_FECOMPONENTTRANSFER_TYPE_IDENTITY","SVG_FECOMPONENTTRANSFER_TYPE_LINEAR","SVG_FECOMPONENTTRANSFER_TYPE_TABLE","SVG_FECOMPONENTTRANSFER_TYPE_UNKNOWN","SVG_FECOMPOSITE_OPERATOR_ARITHMETIC","SVG_FECOMPOSITE_OPERATOR_ATOP","SVG_FECOMPOSITE_OPERATOR_IN","SVG_FECOMPOSITE_OPERATOR_OUT","SVG_FECOMPOSITE_OPERATOR_OVER","SVG_FECOMPOSITE_OPERATOR_UNKNOWN","SVG_FECOMPOSITE_OPERATOR_XOR","SVG_INVALID_VALUE_ERR","SVG_LENGTHTYPE_CM","SVG_LENGTHTYPE_EMS","SVG_LENGTHTYPE_EXS","SVG_LENGTHTYPE_IN","SVG_LENGTHTYPE_MM","SVG_LENGTHTYPE_NUMBER","SVG_LENGTHTYPE_PC","SVG_LENGTHTYPE_PERCENTAGE","SVG_LENGTHTYPE_PT","SVG_LENGTHTYPE_PX","SVG_LENGTHTYPE_UNKNOWN","SVG_MARKERUNITS_STROKEWIDTH","SVG_MARKERUNITS_UNKNOWN","SVG_MARKERUNITS_USERSPACEONUSE","SVG_MARKER_ORIENT_ANGLE","SVG_MARKER_ORIENT_AUTO","SVG_MARKER_ORIENT_UNKNOWN","SVG_MASKTYPE_ALPHA","SVG_MASKTYPE_LUMINANCE","SVG_MATRIX_NOT_INVERTABLE","SVG_MEETORSLICE_MEET","SVG_MEETORSLICE_SLICE","SVG_MEETORSLICE_UNKNOWN","SVG_MORPHOLOGY_OPERATOR_DILATE","SVG_MORPHOLOGY_OPERATOR_ERODE","SVG_MORPHOLOGY_OPERATOR_UNKNOWN","SVG_PAINTTYPE_CURRENTCOLOR","SVG_PAINTTYPE_NONE","SVG_PAINTTYPE_RGBCOLOR","SVG_PAINTTYPE_RGBCOLOR_ICCCOLOR","SVG_PAINTTYPE_UNKNOWN","SVG_PAINTTYPE_URI","SVG_PAINTTYPE_URI_CURRENTCOLOR","SVG_PAINTTYPE_URI_NONE","SVG_PAINTTYPE_URI_RGBCOLOR","SVG_PAINTTYPE_URI_RGBCOLOR_ICCCOLOR","SVG_PRESERVEASPECTRATIO_NONE","SVG_PRESERVEASPECTRATIO_UNKNOWN","SVG_PRESERVEASPECTRATIO_XMAXYMAX","SVG_PRESERVEASPECTRATIO_XMAXYMID","SVG_PRESERVEASPECTRATIO_XMAXYMIN","SVG_PRESERVEASPECTRATIO_XMIDYMAX","SVG_PRESERVEASPECTRATIO_XMIDYMID","SVG_PRESERVEASPECTRATIO_XMIDYMIN","SVG_PRESERVEASPECTRATIO_XMINYMAX","SVG_PRESERVEASPECTRATIO_XMINYMID","SVG_PRESERVEASPECTRATIO_XMINYMIN","SVG_SPREADMETHOD_PAD","SVG_SPREADMETHOD_REFLECT","SVG_SPREADMETHOD_REPEAT","SVG_SPREADMETHOD_UNKNOWN","SVG_STITCHTYPE_NOSTITCH","SVG_STITCHTYPE_STITCH","SVG_STITCHTYPE_UNKNOWN","SVG_TRANSFORM_MATRIX","SVG_TRANSFORM_ROTATE","SVG_TRANSFORM_SCALE","SVG_TRANSFORM_SKEWX","SVG_TRANSFORM_SKEWY","SVG_TRANSFORM_TRANSLATE","SVG_TRANSFORM_UNKNOWN","SVG_TURBULENCE_TYPE_FRACTALNOISE","SVG_TURBULENCE_TYPE_TURBULENCE","SVG_TURBULENCE_TYPE_UNKNOWN","SVG_UNIT_TYPE_OBJECTBOUNDINGBOX","SVG_UNIT_TYPE_UNKNOWN","SVG_UNIT_TYPE_USERSPACEONUSE","SVG_WRONG_TYPE_ERR","SVG_ZOOMANDPAN_DISABLE","SVG_ZOOMANDPAN_MAGNIFY","SVG_ZOOMANDPAN_UNKNOWN","SYNTAX_ERR","SavedPages","Screen","ScreenOrientation","Script","ScriptProcessorNode","ScrollAreaEvent","SecurityPolicyViolationEvent","Selection","ServiceWorker","ServiceWorkerContainer","ServiceWorkerRegistration","SessionDescription","Set","ShadowRoot","SharedWorker","SimpleGestureEvent","SpeechSynthesisEvent","SpeechSynthesisUtterance","StopIteration","Storage","StorageEvent","String","StyleSheet","StyleSheetList","SubtleCrypto","Symbol","SyntaxError","TEMPORARY","TEXTPATH_METHODTYPE_ALIGN","TEXTPATH_METHODTYPE_STRETCH","TEXTPATH_METHODTYPE_UNKNOWN","TEXTPATH_SPACINGTYPE_AUTO","TEXTPATH_SPACINGTYPE_EXACT","TEXTPATH_SPACINGTYPE_UNKNOWN","TEXTURE","TEXTURE0","TEXTURE1","TEXTURE10","TEXTURE11","TEXTURE12","TEXTURE13","TEXTURE14","TEXTURE15","TEXTURE16","TEXTURE17","TEXTURE18","TEXTURE19","TEXTURE2","TEXTURE20","TEXTURE21","TEXTURE22","TEXTURE23","TEXTURE24","TEXTURE25","TEXTURE26","TEXTURE27","TEXTURE28","TEXTURE29","TEXTURE3","TEXTURE30","TEXTURE31","TEXTURE4","TEXTURE5","TEXTURE6","TEXTURE7","TEXTURE8","TEXTURE9","TEXTURE_2D","TEXTURE_BINDING_2D","TEXTURE_BINDING_CUBE_MAP","TEXTURE_CUBE_MAP","TEXTURE_CUBE_MAP_NEGATIVE_X","TEXTURE_CUBE_MAP_NEGATIVE_Y","TEXTURE_CUBE_MAP_NEGATIVE_Z","TEXTURE_CUBE_MAP_POSITIVE_X","TEXTURE_CUBE_MAP_POSITIVE_Y","TEXTURE_CUBE_MAP_POSITIVE_Z","TEXTURE_MAG_FILTER","TEXTURE_MAX_ANISOTROPY_EXT","TEXTURE_MIN_FILTER","TEXTURE_WRAP_S","TEXTURE_WRAP_T","TEXT_NODE","TIMEOUT","TIMEOUT_ERR","TOO_LARGE_ERR","TRANSACTION_INACTIVE_ERR","TRIANGLE","TRIANGLES","TRIANGLE_FAN","TRIANGLE_STRIP","TYPE_BACK_FORWARD","TYPE_ERR","TYPE_MISMATCH_ERR","TYPE_NAVIGATE","TYPE_RELOAD","TYPE_RESERVED","Text","TextDecoder","TextEncoder","TextEvent","TextMetrics","TextTrack","TextTrackCue","TextTrackCueList","TextTrackList","TimeEvent","TimeRanges","Touch","TouchEvent","TouchList","TrackEvent","TransitionEvent","TreeWalker","TypeError","UIEvent","UNCACHED","UNKNOWN_ERR","UNKNOWN_RULE","UNMASKED_RENDERER_WEBGL","UNMASKED_VENDOR_WEBGL","UNORDERED_NODE_ITERATOR_TYPE","UNORDERED_NODE_SNAPSHOT_TYPE","UNPACK_ALIGNMENT","UNPACK_COLORSPACE_CONVERSION_WEBGL","UNPACK_FLIP_Y_WEBGL","UNPACK_PREMULTIPLY_ALPHA_WEBGL","UNSCHEDULED_STATE","UNSENT","UNSIGNED_BYTE","UNSIGNED_INT","UNSIGNED_SHORT","UNSIGNED_SHORT_4_4_4_4","UNSIGNED_SHORT_5_5_5_1","UNSIGNED_SHORT_5_6_5","UNSPECIFIED_EVENT_TYPE_ERR","UPDATEREADY","URIError","URL","URLSearchParams","URLUnencoded","URL_MISMATCH_ERR","UTC","Uint16Array","Uint32Array","Uint8Array","Uint8ClampedArray","UserMessageHandler","UserMessageHandlersNamespace","UserProximityEvent","VALIDATE_STATUS","VALIDATION_ERR","VARIABLES_RULE","VENDOR","VERSION","VERSION_CHANGE","VERSION_ERR","VERTEX_ATTRIB_ARRAY_BUFFER_BINDING","VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE","VERTEX_ATTRIB_ARRAY_ENABLED","VERTEX_ATTRIB_ARRAY_NORMALIZED","VERTEX_ATTRIB_ARRAY_POINTER","VERTEX_ATTRIB_ARRAY_SIZE","VERTEX_ATTRIB_ARRAY_STRIDE","VERTEX_ATTRIB_ARRAY_TYPE","VERTEX_SHADER","VERTICAL","VERTICAL_AXIS","VER_ERR","VIEWPORT","VIEWPORT_RULE","VTTCue","VTTRegion","ValidityState","VideoStreamTrack","WEBKIT_FILTER_RULE","WEBKIT_KEYFRAMES_RULE","WEBKIT_KEYFRAME_RULE","WEBKIT_REGION_RULE","WRONG_DOCUMENT_ERR","WaveShaperNode","WeakMap","WeakSet","WebGLActiveInfo","WebGLBuffer","WebGLContextEvent","WebGLFramebuffer","WebGLProgram","WebGLRenderbuffer","WebGLRenderingContext","WebGLShader","WebGLShaderPrecisionFormat","WebGLTexture","WebGLUniformLocation","WebGLVertexArray","WebKitAnimationEvent","WebKitBlobBuilder","WebKitCSSFilterRule","WebKitCSSFilterValue","WebKitCSSKeyframeRule","WebKitCSSKeyframesRule","WebKitCSSMatrix","WebKitCSSRegionRule","WebKitCSSTransformValue","WebKitDataCue","WebKitGamepad","WebKitMediaKeyError","WebKitMediaKeyMessageEvent","WebKitMediaKeySession","WebKitMediaKeys","WebKitMediaSource","WebKitMutationObserver","WebKitNamespace","WebKitPlaybackTargetAvailabilityEvent","WebKitPoint","WebKitShadowRoot","WebKitSourceBuffer","WebKitSourceBufferList","WebKitTransitionEvent","WebSocket","WheelEvent","Window","Worker","XMLDocument","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestException","XMLHttpRequestProgressEvent","XMLHttpRequestUpload","XMLSerializer","XMLStylesheetProcessingInstruction","XPathEvaluator","XPathException","XPathExpression","XPathNSResolver","XPathResult","XSLTProcessor","ZERO","_XD0M_","_YD0M_","__defineGetter__","__defineSetter__","__lookupGetter__","__lookupSetter__","__opera","__proto__","_browserjsran","a","aLink","abbr","abort","abs","absolute","acceleration","accelerationIncludingGravity","accelerator","accept","acceptCharset","acceptNode","accessKey","accessKeyLabel","accuracy","acos","acosh","action","actionURL","active","activeCues","activeElement","activeSourceBuffers","activeSourceCount","activeTexture","add","addBehavior","addCandidate","addColorStop","addCue","addElement","addEventListener","addFilter","addFromString","addFromUri","addIceCandidate","addImport","addListener","addNamed","addPageRule","addPath","addPointer","addRange","addRegion","addRule","addSearchEngine","addSourceBuffer","addStream","addTextTrack","addTrack","addWakeLockListener","addedNodes","additionalName","additiveSymbols","addons","adoptNode","adr","advance","alert","algorithm","align","align-content","align-items","align-self","alignContent","alignItems","alignSelf","alignmentBaseline","alinkColor","all","allSettled","allowFullscreen","allowedDirections","alpha","alt","altGraphKey","altHtml","altKey","altLeft","altitude","altitudeAccuracy","amplitude","ancestorOrigins","anchor","anchorNode","anchorOffset","anchors","angle","animVal","animate","animatedInstanceRoot","animatedNormalizedPathSegList","animatedPathSegList","animatedPoints","animation","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","animationDelay","animationDirection","animationDuration","animationFillMode","animationIterationCount","animationName","animationPlayState","animationStartTime","animationTimingFunction","animationsPaused","anniversary","any","app","appCodeName","appMinorVersion","appName","appNotifications","appVersion","append","appendBuffer","appendChild","appendData","appendItem","appendMedium","appendNamed","appendRule","appendStream","appendWindowEnd","appendWindowStart","applets","applicationCache","apply","applyElement","arc","arcTo","archive","areas","arguments","arrayBuffer","asin","asinh","assert","assign","async","atEnd","atan","atan2","atanh","atob","attachEvent","attachShader","attachShadow","attachments","attack","attrChange","attrName","attributeFilter","attributeName","attributeNamespace","attributeOldValue","attributes","audioTracks","autoIncrement","autobuffer","autocapitalize","autocomplete","autocorrect","autofocus","autoplay","availHeight","availLeft","availTop","availWidth","availability","available","aversion","axes","axis","azimuth","b","back","backface-visibility","backfaceVisibility","background","background-attachment","background-blend-mode","background-clip","background-color","background-image","background-origin","background-position","background-repeat","background-size","backgroundAttachment","backgroundBlendMode","backgroundClip","backgroundColor","backgroundImage","backgroundOrigin","backgroundPosition","backgroundPositionX","backgroundPositionY","backgroundRepeat","backgroundSize","badInput","balance","baseFrequencyX","baseFrequencyY","baseNode","baseOffset","baseURI","baseVal","baselineShift","battery","bday","beginElement","beginElementAt","beginPath","behavior","behaviorCookie","behaviorPart","behaviorUrns","beta","bezierCurveTo","bgColor","bgProperties","bias","big","binaryType","bind","bindAttribLocation","bindBuffer","bindFramebuffer","bindRenderbuffer","bindTexture","blendColor","blendEquation","blendEquationSeparate","blendFunc","blendFuncSeparate","blink","blob","blockDirection","blue","blur","body","bodyUsed","bold","bookmarks","booleanValue","border","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","borderBottom","borderBottomColor","borderBottomLeftRadius","borderBottomRightRadius","borderBottomStyle","borderBottomWidth","borderCollapse","borderColor","borderColorDark","borderColorLight","borderImage","borderImageOutset","borderImageRepeat","borderImageSlice","borderImageSource","borderImageWidth","borderLeft","borderLeftColor","borderLeftStyle","borderLeftWidth","borderRadius","borderRight","borderRightColor","borderRightStyle","borderRightWidth","borderSpacing","borderStyle","borderTop","borderTopColor","borderTopLeftRadius","borderTopRightRadius","borderTopStyle","borderTopWidth","borderWidth","bottom","bottomMargin","bound","boundElements","boundingClientRect","boundingHeight","boundingLeft","boundingTop","boundingWidth","bounds","box-decoration-break","box-shadow","box-sizing","boxDecorationBreak","boxShadow","boxSizing","breakAfter","breakBefore","breakInside","browserLanguage","btoa","bubbles","buffer","bufferData","bufferDepth","bufferSize","bufferSubData","buffered","bufferedAmount","buildID","buildNumber","button","buttonID","buttons","byteLength","byteOffset","c","call","caller","canBeFormatted","canBeMounted","canBeShared","canHaveChildren","canHaveHTML","canPlayType","cancel","cancelAnimationFrame","cancelBubble","cancelScheduledValues","cancelable","candidate","canvas","caption","caption-side","captionSide","capture","captureEvents","captureStackTrace","caretPositionFromPoint","caretRangeFromPoint","cast","catch","category","cbrt","cd","ceil","cellIndex","cellPadding","cellSpacing","cells","ch","chOff","chain","challenge","changedTouches","channel","channelCount","channelCountMode","channelInterpretation","char","charAt","charCode","charCodeAt","charIndex","characterData","characterDataOldValue","characterSet","charging","chargingTime","charset","checkEnclosure","checkFramebufferStatus","checkIntersection","checkValidity","checked","childElementCount","childList","childNodes","children","chrome","ciphertext","cite","classList","className","classid","clear","clearAttributes","clearColor","clearData","clearDepth","clearImmediate","clearInterval","clearMarks","clearMeasures","clearParameters","clearRect","clearResourceTimings","clearShadow","clearStencil","clearTimeout","clearWatch","click","clickCount","clientHeight","clientInformation","clientLeft","clientRect","clientRects","clientTop","clientWidth","clientX","clientY","clip","clip-path","clip-rule","clipBottom","clipLeft","clipPath","clipPathUnits","clipRight","clipRule","clipTop","clipboardData","clone","cloneContents","cloneNode","cloneRange","close","closePath","closed","closest","clz","clz32","cmp","code","codeBase","codePointAt","codeType","colSpan","collapse","collapseToEnd","collapseToStart","collapsed","collect","colno","color","color-interpolation","color-interpolation-filters","colorDepth","colorInterpolation","colorInterpolationFilters","colorMask","colorType","cols","columnCount","columnFill","columnGap","columnNumber","columnRule","columnRuleColor","columnRuleStyle","columnRuleWidth","columnSpan","columnWidth","columns","command","commitPreferences","commonAncestorContainer","compact","compareBoundaryPoints","compareDocumentPosition","compareEndPoints","compareNode","comparePoint","compatMode","compatible","compile","compileShader","complete","componentFromPoint","compositionEndOffset","compositionStartOffset","compressedTexImage2D","compressedTexSubImage2D","concat","conditionText","coneInnerAngle","coneOuterAngle","coneOuterGain","confirm","confirmComposition","confirmSiteSpecificTrackingException","confirmWebWideTrackingException","connect","connectEnd","connectStart","connected","connection","connectionSpeed","console","consolidate","constrictionActive","constructor","contactID","contains","containsNode","content","contentDocument","contentEditable","contentOverflow","contentScriptType","contentStyleType","contentType","contentWindow","context","contextMenu","contextmenu","continue","continuous","control","controller","controls","convertToSpecifiedUnits","cookie","cookieEnabled","coords","copyFromChannel","copyTexImage2D","copyTexSubImage2D","copyToChannel","copyWithin","correspondingElement","correspondingUseElement","cos","cosh","count","counter-increment","counter-reset","counterIncrement","counterReset","cpuClass","cpuSleepAllowed","create","createAnalyser","createAnswer","createAttribute","createAttributeNS","createBiquadFilter","createBuffer","createBufferSource","createCDATASection","createCSSStyleSheet","createCaption","createChannelMerger","createChannelSplitter","createComment","createContextualFragment","createControlRange","createConvolver","createDTMFSender","createDataChannel","createDelay","createDelayNode","createDocument","createDocumentFragment","createDocumentType","createDynamicsCompressor","createElement","createElementNS","createEntityReference","createEvent","createEventObject","createExpression","createFramebuffer","createFunction","createGain","createGainNode","createHTMLDocument","createImageBitmap","createImageData","createIndex","createJavaScriptNode","createLinearGradient","createMediaElementSource","createMediaKeys","createMediaStreamDestination","createMediaStreamSource","createMutableFile","createNSResolver","createNodeIterator","createNotification","createObjectStore","createObjectURL","createOffer","createOscillator","createPanner","createPattern","createPeriodicWave","createPopup","createProcessingInstruction","createProgram","createRadialGradient","createRange","createRangeCollection","createRenderbuffer","createSVGAngle","createSVGLength","createSVGMatrix","createSVGNumber","createSVGPathSegArcAbs","createSVGPathSegArcRel","createSVGPathSegClosePath","createSVGPathSegCurvetoCubicAbs","createSVGPathSegCurvetoCubicRel","createSVGPathSegCurvetoCubicSmoothAbs","createSVGPathSegCurvetoCubicSmoothRel","createSVGPathSegCurvetoQuadraticAbs","createSVGPathSegCurvetoQuadraticRel","createSVGPathSegCurvetoQuadraticSmoothAbs","createSVGPathSegCurvetoQuadraticSmoothRel","createSVGPathSegLinetoAbs","createSVGPathSegLinetoHorizontalAbs","createSVGPathSegLinetoHorizontalRel","createSVGPathSegLinetoRel","createSVGPathSegLinetoVerticalAbs","createSVGPathSegLinetoVerticalRel","createSVGPathSegMovetoAbs","createSVGPathSegMovetoRel","createSVGPoint","createSVGRect","createSVGTransform","createSVGTransformFromMatrix","createScriptProcessor","createSession","createShader","createShadowRoot","createStereoPanner","createStyleSheet","createTBody","createTFoot","createTHead","createTextNode","createTextRange","createTexture","createTouch","createTouchList","createTreeWalker","createWaveShaper","creationTime","crossOrigin","crypto","csi","cssFloat","cssRules","cssText","cssValueType","ctrlKey","ctrlLeft","cues","cullFace","currentNode","currentPage","currentScale","currentScript","currentSrc","currentState","currentStyle","currentTarget","currentTime","currentTranslate","currentView","cursor","curve","customError","cx","cy","d","data","dataFld","dataFormatAs","dataPageSize","dataSrc","dataTransfer","database","dataset","dateTime","db","debug","debuggerEnabled","declare","decode","decodeAudioData","decodeURI","decodeURIComponent","decodingInfo","decrypt","default","defaultCharset","defaultChecked","defaultMuted","defaultPlaybackRate","defaultPrevented","defaultSelected","defaultStatus","defaultURL","defaultValue","defaultView","defaultstatus","defer","defineMagicFunction","defineMagicVariable","defineProperties","defineProperty","delayTime","delete","deleteBuffer","deleteCaption","deleteCell","deleteContents","deleteData","deleteDatabase","deleteFramebuffer","deleteFromDocument","deleteIndex","deleteMedium","deleteObjectStore","deleteProgram","deleteRenderbuffer","deleteRow","deleteRule","deleteShader","deleteTFoot","deleteTHead","deleteTexture","deliverChangeRecords","delivery","deliveryInfo","deliveryStatus","deliveryTimestamp","delta","deltaMode","deltaX","deltaY","deltaZ","depthFunc","depthMask","depthRange","deriveBits","deriveKey","description","deselectAll","designMode","destination","destinationURL","detach","detachEvent","detachShader","detail","detune","devicePixelRatio","deviceXDPI","deviceYDPI","diffuseConstant","digest","dimensions","dir","dirName","direction","dirxml","disable","disableVertexAttribArray","disabled","dischargingTime","disconnect","dispatchEvent","display","distanceModel","divisor","djsapi","djsproxy","doImport","doNotTrack","doScroll","doctype","document","documentElement","documentMode","documentURI","dolphin","dolphinGameCenter","dolphininfo","dolphinmeta","domComplete","domContentLoadedEventEnd","domContentLoadedEventStart","domInteractive","domLoading","domain","domainLookupEnd","domainLookupStart","dominant-baseline","dominantBaseline","done","dopplerFactor","download","dragDrop","draggable","drawArrays","drawArraysInstancedANGLE","drawCustomFocusRing","drawElements","drawElementsInstancedANGLE","drawFocusIfNeeded","drawImage","drawImageFromRect","drawSystemFocusRing","drawingBufferHeight","drawingBufferWidth","dropEffect","droppedVideoFrames","dropzone","dump","duplicate","duration","dvname","dvnum","dx","dy","dynsrc","e","edgeMode","effectAllowed","elapsedTime","elementFromPoint","elements","elevation","ellipse","email","embeds","empty","empty-cells","emptyCells","enable","enableBackground","enableStyleSheetsForSet","enableVertexAttribArray","enabled","enabledPlugin","encode","encodeURI","encodeURIComponent","encoding","encrypt","enctype","end","endContainer","endElement","endElementAt","endOfStream","endOffset","endTime","ended","endsWith","entities","entries","entryType","enumerate","enumerateEditable","error","errorCode","escape","eval","evaluate","event","eventPhase","every","exception","exec","execCommand","execCommandShowHelp","execScript","exitFullscreen","exitPointerLock","exp","expand","expandEntityReferences","expando","expansion","expiryDate","explicitOriginalTarget","expm1","exponent","exponentialRampToValueAtTime","exportKey","extend","extensions","extentNode","extentOffset","external","externalResourcesRequired","extractContents","extractable","f","face","factoryReset","fallback","familyName","farthestViewportElement","fastSeek","fatal","fetch","fetchStart","fftSize","fgColor","fileCreatedDate","fileHandle","fileModifiedDate","fileName","fileSize","fileUpdatedDate","filename","files","fill","fill-opacity","fill-rule","fillOpacity","fillRect","fillRule","fillStyle","fillText","filter","filterResX","filterResY","filterUnits","filters","finally","find","findIndex","findRule","findText","finish","fireEvent","firstChild","firstElementChild","firstPage","fixed","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","flexBasis","flexDirection","flexFlow","flexGrow","flexShrink","flexWrap","flipX","flipY","float","flood-color","flood-opacity","floodColor","floodOpacity","floor","flush","focus","focusNode","focusOffset","font","font-family","font-feature-settings","font-kerning","font-language-override","font-size","font-size-adjust","font-stretch","font-style","font-synthesis","font-variant","font-variant-alternates","font-variant-caps","font-variant-east-asian","font-variant-ligatures","font-variant-numeric","font-variant-position","font-weight","fontFamily","fontFeatureSettings","fontKerning","fontLanguageOverride","fontSize","fontSizeAdjust","fontSmoothingEnabled","fontStretch","fontStyle","fontSynthesis","fontVariant","fontVariantAlternates","fontVariantCaps","fontVariantEastAsian","fontVariantLigatures","fontVariantNumeric","fontVariantPosition","fontWeight","fontcolor","fonts","fontsize","for","forEach","forceRedraw","form","formAction","formEnctype","formMethod","formNoValidate","formTarget","format","formatToParts","forms","forward","fr","frame","frameBorder","frameElement","frameSpacing","framebufferRenderbuffer","framebufferTexture2D","frames","freeSpace","freeze","frequency","frequencyBinCount","from","fromCharCode","fromCodePoint","fromElement","frontFace","fround","fullScreen","fullscreenElement","fullscreenEnabled","fx","fy","gain","gamepad","gamma","genderIdentity","generateKey","generateMipmap","generateRequest","geolocation","gestureObject","get","getActiveAttrib","getActiveUniform","getAdjacentText","getAll","getAllResponseHeaders","getAsFile","getAsString","getAttachedShaders","getAttribLocation","getAttribute","getAttributeNS","getAttributeNode","getAttributeNodeNS","getAudioTracks","getBBox","getBattery","getBlob","getBookmark","getBoundingClientRect","getBufferParameter","getByteFrequencyData","getByteTimeDomainData","getCSSCanvasContext","getCTM","getCandidateWindowClientRect","getChannelData","getCharNumAtPosition","getClientRect","getClientRects","getCompositionAlternatives","getComputedStyle","getComputedTextLength","getConfiguration","getContext","getContextAttributes","getCounterValue","getCueAsHTML","getCueById","getCurrentPosition","getCurrentTime","getData","getDatabaseNames","getDate","getDay","getDefaultComputedStyle","getDestinationInsertionPoints","getDistributedNodes","getEditable","getElementById","getElementsByClassName","getElementsByName","getElementsByTagName","getElementsByTagNameNS","getEnclosureList","getEndPositionOfChar","getEntries","getEntriesByName","getEntriesByType","getError","getExtension","getExtentOfChar","getFeature","getFile","getFloat32","getFloat64","getFloatFrequencyData","getFloatTimeDomainData","getFloatValue","getFramebufferAttachmentParameter","getFrequencyResponse","getFullYear","getGamepads","getHours","getImageData","getInt16","getInt32","getInt8","getIntersectionList","getItem","getItems","getKey","getLineDash","getLocalStreams","getMarks","getMatchedCSSRules","getMeasures","getMetadata","getMilliseconds","getMinutes","getModifierState","getMonth","getNamedItem","getNamedItemNS","getNotifier","getNumberOfChars","getOverrideHistoryNavigationMode","getOverrideStyle","getOwnPropertyDescriptor","getOwnPropertyNames","getOwnPropertySymbols","getParameter","getPathSegAtLength","getPointAtLength","getPreference","getPreferenceDefault","getPresentationAttribute","getPreventDefault","getProgramInfoLog","getProgramParameter","getPropertyCSSValue","getPropertyPriority","getPropertyShorthand","getPropertyValue","getPrototypeOf","getRGBColorValue","getRandomValues","getRangeAt","getReceivers","getRectValue","getRegistration","getRemoteStreams","getRenderbufferParameter","getResponseHeader","getRoot","getRotationOfChar","getSVGDocument","getScreenCTM","getSeconds","getSelection","getSenders","getShaderInfoLog","getShaderParameter","getShaderPrecisionFormat","getShaderSource","getSimpleDuration","getSiteIcons","getSources","getSpeculativeParserUrls","getStartPositionOfChar","getStartTime","getStats","getStorageUpdates","getStreamById","getStringValue","getSubStringLength","getSubscription","getSupportedExtensions","getTexParameter","getTime","getTimezoneOffset","getTotalLength","getTrackById","getTracks","getTransformToElement","getUTCDate","getUTCDay","getUTCFullYear","getUTCHours","getUTCMilliseconds","getUTCMinutes","getUTCMonth","getUTCSeconds","getUint16","getUint32","getUint8","getUniform","getUniformLocation","getUserMedia","getValues","getVarDate","getVariableValue","getVertexAttrib","getVertexAttribOffset","getVideoPlaybackQuality","getVideoTracks","getWakeLockState","getYear","givenName","global","globalAlpha","globalCompositeOperation","glyphOrientationHorizontal","glyphOrientationVertical","glyphRef","go","gradientTransform","gradientUnits","grammars","green","group","groupCollapsed","groupEnd","hardwareConcurrency","has","hasAttribute","hasAttributeNS","hasAttributes","hasChildNodes","hasComposition","hasExtension","hasFeature","hasFocus","hasLayout","hasOwnProperty","hash","head","headers","heading","height","hidden","hide","hideFocus","high","hint","history","honorificPrefix","honorificSuffix","horizontalOverflow","host","hostname","href","hreflang","hspace","html5TagCheckInerface","htmlFor","htmlText","httpEquiv","hwTimestamp","hypot","iccId","iceConnectionState","iceGatheringState","icon","id","identifier","identity","ignoreBOM","ignoreCase","image-orientation","image-rendering","imageOrientation","imageRendering","images","ime-mode","imeMode","implementation","importKey","importNode","importStylesheet","imports","impp","imul","in1","in2","inBandMetadataTrackDispatchType","inRange","includes","incremental","indeterminate","index","indexNames","indexOf","indexedDB","inertiaDestinationX","inertiaDestinationY","info","init","initAnimationEvent","initBeforeLoadEvent","initClipboardEvent","initCloseEvent","initCommandEvent","initCompositionEvent","initCustomEvent","initData","initDeviceMotionEvent","initDeviceOrientationEvent","initDragEvent","initErrorEvent","initEvent","initFocusEvent","initGestureEvent","initHashChangeEvent","initKeyEvent","initKeyboardEvent","initMSManipulationEvent","initMessageEvent","initMouseEvent","initMouseScrollEvent","initMouseWheelEvent","initMutationEvent","initNSMouseEvent","initOverflowEvent","initPageEvent","initPageTransitionEvent","initPointerEvent","initPopStateEvent","initProgressEvent","initScrollAreaEvent","initSimpleGestureEvent","initStorageEvent","initTextEvent","initTimeEvent","initTouchEvent","initTransitionEvent","initUIEvent","initWebKitAnimationEvent","initWebKitTransitionEvent","initWebKitWheelEvent","initWheelEvent","initialTime","initialize","initiatorType","inner","innerHTML","innerHeight","innerText","innerWidth","input","inputBuffer","inputEncoding","inputMethod","insertAdjacentElement","insertAdjacentHTML","insertAdjacentText","insertBefore","insertCell","insertData","insertItemBefore","insertNode","insertRow","insertRule","instanceRoot","intercept","interimResults","internalSubset","intersectsNode","interval","invalidIteratorState","inverse","invertSelf","is","is2D","isAlternate","isArray","isBingCurrentSearchDefault","isBuffer","isCandidateWindowVisible","isChar","isCollapsed","isComposing","isContentEditable","isContentHandlerRegistered","isContextLost","isDefaultNamespace","isDisabled","isEnabled","isEqual","isEqualNode","isExtensible","isFinite","isFramebuffer","isFrozen","isGenerator","isId","isInjected","isInteger","isMap","isMultiLine","isNaN","isOpen","isPointInFill","isPointInPath","isPointInRange","isPointInStroke","isPrefAlternate","isPrimary","isProgram","isPropertyImplicit","isProtocolHandlerRegistered","isPrototypeOf","isRenderbuffer","isSafeInteger","isSameNode","isSealed","isShader","isSupported","isTextEdit","isTexture","isTrusted","isTypeSupported","isView","isolation","italics","item","itemId","itemProp","itemRef","itemScope","itemType","itemValue","iterateNext","iterator","javaEnabled","jobTitle","join","json","justify-content","justifyContent","k1","k2","k3","k4","kernelMatrix","kernelUnitLengthX","kernelUnitLengthY","kerning","key","keyCode","keyFor","keyIdentifier","keyLightEnabled","keyLocation","keyPath","keySystem","keyText","keyUsage","keys","keytype","kind","knee","label","labels","lang","language","languages","largeArcFlag","lastChild","lastElementChild","lastEventId","lastIndex","lastIndexOf","lastMatch","lastMessageSubject","lastMessageType","lastModified","lastModifiedDate","lastPage","lastParen","lastState","lastStyleSheetSet","latitude","layerX","layerY","layoutFlow","layoutGrid","layoutGridChar","layoutGridLine","layoutGridMode","layoutGridType","lbound","left","leftContext","leftMargin","length","lengthAdjust","lengthComputable","letter-spacing","letterSpacing","level","lighting-color","lightingColor","limitingConeAngle","line","line-height","lineAlign","lineBreak","lineCap","lineDashOffset","lineHeight","lineJoin","lineNumber","lineTo","lineWidth","linearRampToValueAtTime","lineno","link","linkColor","linkProgram","links","list","list-style","list-style-image","list-style-position","list-style-type","listStyle","listStyleImage","listStylePosition","listStyleType","listener","load","loadEventEnd","loadEventStart","loadTimes","loaded","localDescription","localName","localStorage","locale","localeCompare","location","locationbar","lock","lockedFile","log","log10","log1p","log2","logicalXDPI","logicalYDPI","longDesc","longitude","lookupNamespaceURI","lookupPrefix","loop","loopEnd","loopStart","looping","low","lower","lowerBound","lowerOpen","lowsrc","m11","m12","m13","m14","m21","m22","m23","m24","m31","m32","m33","m34","m41","m42","m43","m44","manifest","map","mapping","margin","margin-bottom","margin-left","margin-right","margin-top","marginBottom","marginHeight","marginLeft","marginRight","marginTop","marginWidth","mark","marker","marker-end","marker-mid","marker-offset","marker-start","markerEnd","markerHeight","markerMid","markerOffset","markerStart","markerUnits","markerWidth","marks","mask","mask-type","maskContentUnits","maskType","maskUnits","match","matchMedia","matchMedium","matches","matrix","matrixTransform","max","max-height","max-width","maxAlternatives","maxChannelCount","maxConnectionsPerServer","maxDecibels","maxDistance","maxHeight","maxLength","maxTouchPoints","maxValue","maxWidth","measure","measureText","media","mediaCapabilities","mediaDevices","mediaElement","mediaGroup","mediaKeys","mediaText","meetOrSlice","memory","menubar","mergeAttributes","message","messageClass","messageHandlers","metaKey","method","mimeType","mimeTypes","min","min-height","min-width","minDecibels","minHeight","minValue","minWidth","miterLimit","mix-blend-mode","mixBlendMode","mode","modify","mount","move","moveBy","moveEnd","moveFirst","moveFocusDown","moveFocusLeft","moveFocusRight","moveFocusUp","moveNext","moveRow","moveStart","moveTo","moveToBookmark","moveToElementText","moveToPoint","mozAdd","mozAnimationStartTime","mozAnon","mozApps","mozAudioCaptured","mozAudioChannelType","mozAutoplayEnabled","mozCancelAnimationFrame","mozCancelFullScreen","mozCancelRequestAnimationFrame","mozCaptureStream","mozCaptureStreamUntilEnded","mozClearDataAt","mozContact","mozContacts","mozCreateFileHandle","mozCurrentTransform","mozCurrentTransformInverse","mozCursor","mozDash","mozDashOffset","mozDecodedFrames","mozExitPointerLock","mozFillRule","mozFragmentEnd","mozFrameDelay","mozFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozGetAll","mozGetAllKeys","mozGetAsFile","mozGetDataAt","mozGetMetadata","mozGetUserMedia","mozHasAudio","mozHasItem","mozHidden","mozImageSmoothingEnabled","mozIndexedDB","mozInnerScreenX","mozInnerScreenY","mozInputSource","mozIsTextField","mozItem","mozItemCount","mozItems","mozLength","mozLockOrientation","mozMatchesSelector","mozMovementX","mozMovementY","mozOpaque","mozOrientation","mozPaintCount","mozPaintedFrames","mozParsedFrames","mozPay","mozPointerLockElement","mozPresentedFrames","mozPreservesPitch","mozPressure","mozPrintCallback","mozRTCIceCandidate","mozRTCPeerConnection","mozRTCSessionDescription","mozRemove","mozRequestAnimationFrame","mozRequestFullScreen","mozRequestPointerLock","mozSetDataAt","mozSetImageElement","mozSourceNode","mozSrcObject","mozSystem","mozTCPSocket","mozTextStyle","mozTypesAt","mozUnlockOrientation","mozUserCancelled","mozVisibilityState","msAnimation","msAnimationDelay","msAnimationDirection","msAnimationDuration","msAnimationFillMode","msAnimationIterationCount","msAnimationName","msAnimationPlayState","msAnimationStartTime","msAnimationTimingFunction","msBackfaceVisibility","msBlockProgression","msCSSOMElementFloatMetrics","msCaching","msCachingEnabled","msCancelRequestAnimationFrame","msCapsLockWarningOff","msClearImmediate","msClose","msContentZoomChaining","msContentZoomFactor","msContentZoomLimit","msContentZoomLimitMax","msContentZoomLimitMin","msContentZoomSnap","msContentZoomSnapPoints","msContentZoomSnapType","msContentZooming","msConvertURL","msCrypto","msDoNotTrack","msElementsFromPoint","msElementsFromRect","msExitFullscreen","msExtendedCode","msFillRule","msFirstPaint","msFlex","msFlexAlign","msFlexDirection","msFlexFlow","msFlexItemAlign","msFlexLinePack","msFlexNegative","msFlexOrder","msFlexPack","msFlexPositive","msFlexPreferredSize","msFlexWrap","msFlowFrom","msFlowInto","msFontFeatureSettings","msFullscreenElement","msFullscreenEnabled","msGetInputContext","msGetRegionContent","msGetUntransformedBounds","msGraphicsTrustStatus","msGridColumn","msGridColumnAlign","msGridColumnSpan","msGridColumns","msGridRow","msGridRowAlign","msGridRowSpan","msGridRows","msHidden","msHighContrastAdjust","msHyphenateLimitChars","msHyphenateLimitLines","msHyphenateLimitZone","msHyphens","msImageSmoothingEnabled","msImeAlign","msIndexedDB","msInterpolationMode","msIsStaticHTML","msKeySystem","msKeys","msLaunchUri","msLockOrientation","msManipulationViewsEnabled","msMatchMedia","msMatchesSelector","msMaxTouchPoints","msOrientation","msOverflowStyle","msPerspective","msPerspectiveOrigin","msPlayToDisabled","msPlayToPreferredSourceUri","msPlayToPrimary","msPointerEnabled","msRegionOverflow","msReleasePointerCapture","msRequestAnimationFrame","msRequestFullscreen","msSaveBlob","msSaveOrOpenBlob","msScrollChaining","msScrollLimit","msScrollLimitXMax","msScrollLimitXMin","msScrollLimitYMax","msScrollLimitYMin","msScrollRails","msScrollSnapPointsX","msScrollSnapPointsY","msScrollSnapType","msScrollSnapX","msScrollSnapY","msScrollTranslation","msSetImmediate","msSetMediaKeys","msSetPointerCapture","msTextCombineHorizontal","msTextSizeAdjust","msToBlob","msTouchAction","msTouchSelect","msTraceAsyncCallbackCompleted","msTraceAsyncCallbackStarting","msTraceAsyncOperationCompleted","msTraceAsyncOperationStarting","msTransform","msTransformOrigin","msTransformStyle","msTransition","msTransitionDelay","msTransitionDuration","msTransitionProperty","msTransitionTimingFunction","msUnlockOrientation","msUpdateAsyncCallbackRelation","msUserSelect","msVisibilityState","msWrapFlow","msWrapMargin","msWrapThrough","msWriteProfilerMark","msZoom","msZoomTo","mt","multiEntry","multiSelectionObj","multiline","multiple","multiply","multiplySelf","mutableFile","muted","n","name","nameProp","namedItem","namedRecordset","names","namespaceURI","namespaces","naturalHeight","naturalWidth","navigate","navigation","navigationMode","navigationStart","navigator","near","nearestViewportElement","negative","netscape","networkState","newScale","newTranslate","newURL","newValue","newValueSpecifiedUnits","newVersion","newhome","next","nextElementSibling","nextNode","nextPage","nextSibling","nickname","noHref","noResize","noShade","noValidate","noWrap","nodeName","nodeType","nodeValue","normalize","normalizedPathSegList","notationName","notations","note","noteGrainOn","noteOff","noteOn","now","numOctaves","number","numberOfChannels","numberOfInputs","numberOfItems","numberOfOutputs","numberValue","oMatchesSelector","object","object-fit","object-position","objectFit","objectPosition","objectStore","objectStoreNames","observe","of","offscreenBuffering","offset","offsetHeight","offsetLeft","offsetNode","offsetParent","offsetTop","offsetWidth","offsetX","offsetY","ok","oldURL","oldValue","oldVersion","olderShadowRoot","onLine","onabort","onactivate","onactive","onaddstream","onaddtrack","onafterprint","onafterscriptexecute","onafterupdate","onaudioend","onaudioprocess","onaudiostart","onautocomplete","onautocompleteerror","onbeforeactivate","onbeforecopy","onbeforecut","onbeforedeactivate","onbeforeeditfocus","onbeforepaste","onbeforeprint","onbeforescriptexecute","onbeforeunload","onbeforeupdate","onblocked","onblur","onbounce","onboundary","oncached","oncancel","oncandidatewindowhide","oncandidatewindowshow","oncandidatewindowupdate","oncanplay","oncanplaythrough","once","oncellchange","onchange","onchargingchange","onchargingtimechange","onchecking","onclick","onclose","oncompassneedscalibration","oncomplete","oncontextmenu","oncontrolselect","oncopy","oncuechange","oncut","ondataavailable","ondatachannel","ondatasetchanged","ondatasetcomplete","ondblclick","ondeactivate","ondevicelight","ondevicemotion","ondeviceorientation","ondeviceproximity","ondischargingtimechange","ondisplay","ondownloading","ondrag","ondragend","ondragenter","ondragleave","ondragover","ondragstart","ondrop","ondurationchange","onemptied","onencrypted","onend","onended","onenter","onerror","onerrorupdate","onexit","onfilterchange","onfinish","onfocus","onfocusin","onfocusout","onfullscreenchange","onfullscreenerror","ongesturechange","ongestureend","ongesturestart","ongotpointercapture","onhashchange","onhelp","onicecandidate","oniceconnectionstatechange","oninactive","oninput","oninvalid","onkeydown","onkeypress","onkeyup","onlanguagechange","onlayoutcomplete","onlevelchange","onload","onloadeddata","onloadedmetadata","onloadend","onloadstart","onlosecapture","onlostpointercapture","only","onmark","onmessage","onmousedown","onmouseenter","onmouseleave","onmousemove","onmouseout","onmouseover","onmouseup","onmousewheel","onmove","onmoveend","onmovestart","onmozfullscreenchange","onmozfullscreenerror","onmozorientationchange","onmozpointerlockchange","onmozpointerlockerror","onmscontentzoom","onmsfullscreenchange","onmsfullscreenerror","onmsgesturechange","onmsgesturedoubletap","onmsgestureend","onmsgesturehold","onmsgesturestart","onmsgesturetap","onmsgotpointercapture","onmsinertiastart","onmslostpointercapture","onmsmanipulationstatechanged","onmsneedkey","onmsorientationchange","onmspointercancel","onmspointerdown","onmspointerenter","onmspointerhover","onmspointerleave","onmspointermove","onmspointerout","onmspointerover","onmspointerup","onmssitemodejumplistitemremoved","onmsthumbnailclick","onnegotiationneeded","onnomatch","onnoupdate","onobsolete","onoffline","ononline","onopen","onorientationchange","onpagechange","onpagehide","onpageshow","onpaste","onpause","onplay","onplaying","onpluginstreamstart","onpointercancel","onpointerdown","onpointerenter","onpointerleave","onpointerlockchange","onpointerlockerror","onpointermove","onpointerout","onpointerover","onpointerup","onpopstate","onprogress","onpropertychange","onratechange","onreadystatechange","onremovestream","onremovetrack","onreset","onresize","onresizeend","onresizestart","onresourcetimingbufferfull","onresult","onresume","onrowenter","onrowexit","onrowsdelete","onrowsinserted","onscroll","onsearch","onseeked","onseeking","onselect","onselectionchange","onselectstart","onshow","onsignalingstatechange","onsoundend","onsoundstart","onspeechend","onspeechstart","onstalled","onstart","onstatechange","onstop","onstorage","onstoragecommit","onsubmit","onsuccess","onsuspend","ontextinput","ontimeout","ontimeupdate","ontoggle","ontouchcancel","ontouchend","ontouchmove","ontouchstart","ontransitionend","onunload","onupdateready","onupgradeneeded","onuserproximity","onversionchange","onvoiceschanged","onvolumechange","onwaiting","onwarning","onwebkitanimationend","onwebkitanimationiteration","onwebkitanimationstart","onwebkitcurrentplaybacktargetiswirelesschanged","onwebkitfullscreenchange","onwebkitfullscreenerror","onwebkitkeyadded","onwebkitkeyerror","onwebkitkeymessage","onwebkitneedkey","onwebkitorientationchange","onwebkitplaybacktargetavailabilitychanged","onwebkitpointerlockchange","onwebkitpointerlockerror","onwebkitresourcetimingbufferfull","onwebkittransitionend","onwheel","onzoom","opacity","open","openCursor","openDatabase","openKeyCursor","opener","opera","operationType","operator","opr","optimum","options","order","orderX","orderY","ordered","org","orient","orientAngle","orientType","orientation","origin","originalTarget","orphans","oscpu","outerHTML","outerHeight","outerText","outerWidth","outline","outline-color","outline-offset","outline-style","outline-width","outlineColor","outlineOffset","outlineStyle","outlineWidth","outputBuffer","overflow","overflow-x","overflow-y","overflowX","overflowY","overrideMimeType","oversample","ownerDocument","ownerElement","ownerNode","ownerRule","ownerSVGElement","owningElement","p1","p2","p3","p4","pad","padding","padding-bottom","padding-left","padding-right","padding-top","paddingBottom","paddingLeft","paddingRight","paddingTop","page","page-break-after","page-break-before","page-break-inside","pageBreakAfter","pageBreakBefore","pageBreakInside","pageCount","pageX","pageXOffset","pageY","pageYOffset","pages","paint-order","paintOrder","paintRequests","paintType","palette","panningModel","parent","parentElement","parentNode","parentRule","parentStyleSheet","parentTextEdit","parentWindow","parse","parseFloat","parseFromString","parseInt","participants","passive","password","pasteHTML","path","pathLength","pathSegList","pathSegType","pathSegTypeAsLetter","pathname","pattern","patternContentUnits","patternMismatch","patternTransform","patternUnits","pause","pauseAnimations","pauseOnExit","paused","pending","performance","permission","persisted","personalbar","perspective","perspective-origin","perspectiveOrigin","phoneticFamilyName","phoneticGivenName","photo","ping","pitch","pixelBottom","pixelDepth","pixelHeight","pixelLeft","pixelRight","pixelStorei","pixelTop","pixelUnitToMillimeterX","pixelUnitToMillimeterY","pixelWidth","placeholder","platform","play","playbackRate","playbackState","playbackTime","played","plugins","pluginspage","pname","pointer-events","pointerBeforeReferenceNode","pointerEnabled","pointerEvents","pointerId","pointerLockElement","pointerType","points","pointsAtX","pointsAtY","pointsAtZ","polygonOffset","pop","popupWindowFeatures","popupWindowName","popupWindowURI","port","port1","port2","ports","posBottom","posHeight","posLeft","posRight","posTop","posWidth","position","positionAlign","postError","postMessage","poster","pow","powerOff","preMultiplySelf","precision","preferredStyleSheetSet","preferredStylesheetSet","prefix","preload","prepend","preserveAlpha","preserveAspectRatio","preserveAspectRatioString","pressed","pressure","prevValue","preventDefault","preventExtensions","previousElementSibling","previousNode","previousPage","previousScale","previousSibling","previousTranslate","primaryKey","primitiveType","primitiveUnits","principals","print","privateKey","probablySupportsContext","process","processIceMessage","product","productSub","profile","profileEnd","profiles","prompt","properties","propertyIsEnumerable","propertyName","protocol","protocolLong","prototype","pseudoClass","pseudoElement","publicId","publicKey","published","push","pushNotification","pushState","put","putImageData","quadraticCurveTo","qualifier","queryCommandEnabled","queryCommandIndeterm","queryCommandState","queryCommandSupported","queryCommandText","queryCommandValue","querySelector","querySelectorAll","quote","quotes","r","r1","r2","race","radiogroup","radiusX","radiusY","random","range","rangeCount","rangeMax","rangeMin","rangeOffset","rangeOverflow","rangeParent","rangeUnderflow","rate","ratio","raw","read","readAsArrayBuffer","readAsBinaryString","readAsBlob","readAsDataURL","readAsText","readOnly","readPixels","readReportRequested","readyState","reason","reboot","receiver","receivers","recordNumber","recordset","rect","red","redirectCount","redirectEnd","redirectStart","reduce","reduceRight","reduction","refDistance","refX","refY","referenceNode","referrer","refresh","region","regionAnchorX","regionAnchorY","regionId","regions","register","registerContentHandler","registerElement","registerProtocolHandler","reject","rel","relList","relatedNode","relatedTarget","release","releaseCapture","releaseEvents","releasePointerCapture","releaseShaderCompiler","reliable","reload","remainingSpace","remoteDescription","remove","removeAllRanges","removeAttribute","removeAttributeNS","removeAttributeNode","removeBehavior","removeChild","removeCue","removeEventListener","removeFilter","removeImport","removeItem","removeListener","removeNamedItem","removeNamedItemNS","removeNode","removeParameter","removeProperty","removeRange","removeRegion","removeRule","removeSiteSpecificTrackingException","removeSourceBuffer","removeStream","removeTrack","removeVariable","removeWakeLockListener","removeWebWideTrackingException","removedNodes","renderbufferStorage","renderedBuffer","renderingMode","repeat","replace","replaceAdjacentText","replaceChild","replaceData","replaceId","replaceItem","replaceNode","replaceState","replaceTrack","replaceWholeText","reportValidity","requestAnimationFrame","requestAutocomplete","requestData","requestFullscreen","requestMediaKeySystemAccess","requestPermission","requestPointerLock","requestStart","requestingWindow","required","requiredExtensions","requiredFeatures","reset","resetTransform","resize","resizeBy","resizeTo","resolve","response","responseBody","responseEnd","responseStart","responseText","responseType","responseURL","responseXML","restore","result","resultType","resume","returnValue","rev","reverse","reversed","revocable","revokeObjectURL","rgbColor","right","rightContext","rightMargin","rolloffFactor","root","rootElement","rotate","rotateAxisAngle","rotateAxisAngleSelf","rotateFromVector","rotateFromVectorSelf","rotateSelf","rotation","rotationRate","round","rowIndex","rowSpan","rows","rubyAlign","rubyOverhang","rubyPosition","rules","runtime","runtimeStyle","rx","ry","safari","sampleCoverage","sampleRate","sandbox","save","scale","scale3d","scale3dSelf","scaleNonUniform","scaleNonUniformSelf","scaleSelf","scheme","scissor","scope","scopeName","scoped","screen","screenBrightness","screenEnabled","screenLeft","screenPixelToMillimeterX","screenPixelToMillimeterY","screenTop","screenX","screenY","scripts","scroll","scroll-behavior","scrollAmount","scrollBehavior","scrollBy","scrollByLines","scrollByPages","scrollDelay","scrollHeight","scrollIntoView","scrollIntoViewIfNeeded","scrollLeft","scrollLeftMax","scrollMaxX","scrollMaxY","scrollTo","scrollTop","scrollTopMax","scrollWidth","scrollX","scrollY","scrollbar3dLightColor","scrollbarArrowColor","scrollbarBaseColor","scrollbarDarkShadowColor","scrollbarFaceColor","scrollbarHighlightColor","scrollbarShadowColor","scrollbarTrackColor","scrollbars","scrolling","sdp","sdpMLineIndex","sdpMid","seal","search","searchBox","searchBoxJavaBridge_","searchParams","sectionRowIndex","secureConnectionStart","security","seed","seekable","seeking","select","selectAllChildren","selectNode","selectNodeContents","selectNodes","selectSingleNode","selectSubString","selected","selectedIndex","selectedOptions","selectedStyleSheetSet","selectedStylesheetSet","selection","selectionDirection","selectionEnd","selectionStart","selector","selectorText","self","send","sendAsBinary","sendBeacon","sender","sentTimestamp","separator","serializeToString","serviceWorker","sessionId","sessionStorage","set","setActive","setAlpha","setAttribute","setAttributeNS","setAttributeNode","setAttributeNodeNS","setBaseAndExtent","setBingCurrentSearchDefault","setCapture","setColor","setCompositeOperation","setCurrentTime","setCustomValidity","setData","setDate","setDragImage","setEnd","setEndAfter","setEndBefore","setEndPoint","setFillColor","setFilterRes","setFloat32","setFloat64","setFloatValue","setFullYear","setHours","setImmediate","setInt16","setInt32","setInt8","setInterval","setItem","setLineCap","setLineDash","setLineJoin","setLineWidth","setLocalDescription","setMatrix","setMatrixValue","setMediaKeys","setMilliseconds","setMinutes","setMiterLimit","setMonth","setNamedItem","setNamedItemNS","setNonUserCodeExceptions","setOrientToAngle","setOrientToAuto","setOrientation","setOverrideHistoryNavigationMode","setPaint","setParameter","setPeriodicWave","setPointerCapture","setPosition","setPreference","setProperty","setPrototypeOf","setRGBColor","setRGBColorICCColor","setRadius","setRangeText","setRemoteDescription","setRequestHeader","setResizable","setResourceTimingBufferSize","setRotate","setScale","setSeconds","setSelectionRange","setServerCertificate","setShadow","setSkewX","setSkewY","setStart","setStartAfter","setStartBefore","setStdDeviation","setStringValue","setStrokeColor","setSuggestResult","setTargetAtTime","setTargetValueAtTime","setTime","setTimeout","setTransform","setTranslate","setUTCDate","setUTCFullYear","setUTCHours","setUTCMilliseconds","setUTCMinutes","setUTCMonth","setUTCSeconds","setUint16","setUint32","setUint8","setUri","setValueAtTime","setValueCurveAtTime","setVariable","setVelocity","setVersion","setYear","settingName","settingValue","sex","shaderSource","shadowBlur","shadowColor","shadowOffsetX","shadowOffsetY","shadowRoot","shape","shape-rendering","shapeRendering","sheet","shift","shiftKey","shiftLeft","show","showHelp","showModal","showModalDialog","showModelessDialog","showNotification","sidebar","sign","signalingState","sin","singleNodeValue","sinh","size","sizeToContent","sizes","skewX","skewXSelf","skewY","skewYSelf","slice","slope","small","smil","smooth","smoothingTimeConstant","snapToLines","snapshotItem","snapshotLength","some","sort","source","sourceBuffer","sourceBuffers","sourceIndex","spacing","span","speakAs","speaking","specified","specularConstant","specularExponent","speechSynthesis","speed","speedOfSound","spellcheck","splice","split","splitText","spreadMethod","sqrt","src","srcElement","srcFilter","srcUrn","srcdoc","srclang","srcset","stack","stackTraceLimit","stacktrace","standalone","standby","start","startContainer","startIce","startOffset","startRendering","startTime","startsWith","state","status","statusMessage","statusText","statusbar","stdDeviationX","stdDeviationY","stencilFunc","stencilFuncSeparate","stencilMask","stencilMaskSeparate","stencilOp","stencilOpSeparate","step","stepDown","stepMismatch","stepUp","sticky","stitchTiles","stop","stop-color","stop-opacity","stopColor","stopImmediatePropagation","stopOpacity","stopPropagation","storageArea","storageName","storageStatus","storeSiteSpecificTrackingException","storeWebWideTrackingException","stpVersion","stream","strike","stringValue","stringify","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","strokeDasharray","strokeDashoffset","strokeLinecap","strokeLinejoin","strokeMiterlimit","strokeOpacity","strokeRect","strokeStyle","strokeText","strokeWidth","style","styleFloat","styleMedia","styleSheet","styleSheetSets","styleSheets","sub","subarray","subject","submit","subscribe","substr","substring","substringData","subtle","subtree","suffix","suffixes","summary","sup","supports","surfaceScale","surroundContents","suspend","suspendRedraw","swapCache","swapNode","sweepFlag","symbols","system","systemCode","systemId","systemLanguage","systemXDPI","systemYDPI","tBodies","tFoot","tHead","tabIndex","table","table-layout","tableLayout","tableValues","tag","tagName","tagUrn","tags","taintEnabled","takeRecords","tan","tanh","target","targetElement","targetTouches","targetX","targetY","tel","terminate","test","texImage2D","texParameterf","texParameteri","texSubImage2D","text","text-align","text-anchor","text-decoration","text-decoration-color","text-decoration-line","text-decoration-style","text-indent","text-overflow","text-rendering","text-shadow","text-transform","textAlign","textAlignLast","textAnchor","textAutospace","textBaseline","textContent","textDecoration","textDecorationBlink","textDecorationColor","textDecorationLine","textDecorationLineThrough","textDecorationNone","textDecorationOverline","textDecorationStyle","textDecorationUnderline","textIndent","textJustify","textJustifyTrim","textKashida","textKashidaSpace","textLength","textOverflow","textRendering","textShadow","textTracks","textTransform","textUnderlinePosition","then","threadId","threshold","tiltX","tiltY","time","timeEnd","timeStamp","timeout","timestamp","timestampOffset","timing","title","toArray","toBlob","toDataURL","toDateString","toElement","toExponential","toFixed","toFloat32Array","toFloat64Array","toGMTString","toISOString","toJSON","toLocaleDateString","toLocaleFormat","toLocaleLowerCase","toLocaleString","toLocaleTimeString","toLocaleUpperCase","toLowerCase","toMethod","toPrecision","toSdp","toSource","toStaticHTML","toString","toStringTag","toTimeString","toUTCString","toUpperCase","toggle","toggleLongPressEnabled","tooLong","toolbar","top","topMargin","total","totalFrameDelay","totalVideoFrames","touchAction","touches","trace","track","transaction","transactions","transform","transform-origin","transform-style","transformOrigin","transformPoint","transformString","transformStyle","transformToDocument","transformToFragment","transition","transition-delay","transition-duration","transition-property","transition-timing-function","transitionDelay","transitionDuration","transitionProperty","transitionTimingFunction","translate","translateSelf","translationX","translationY","trim","trimLeft","trimRight","trueSpeed","trunc","truncate","type","typeDetail","typeMismatch","typeMustMatch","types","ubound","undefined","unescape","uneval","unicode-bidi","unicodeBidi","uniform1f","uniform1fv","uniform1i","uniform1iv","uniform2f","uniform2fv","uniform2i","uniform2iv","uniform3f","uniform3fv","uniform3i","uniform3iv","uniform4f","uniform4fv","uniform4i","uniform4iv","uniformMatrix2fv","uniformMatrix3fv","uniformMatrix4fv","unique","uniqueID","uniqueNumber","unitType","units","unloadEventEnd","unloadEventStart","unlock","unmount","unobserve","unpause","unpauseAnimations","unreadCount","unregister","unregisterContentHandler","unregisterProtocolHandler","unscopables","unselectable","unshift","unsubscribe","unsuspendRedraw","unsuspendRedrawAll","unwatch","unwrapKey","update","updateCommands","updateIce","updateInterval","updateSettings","updated","updating","upload","upper","upperBound","upperOpen","uri","url","urn","urns","usages","useCurrentView","useMap","useProgram","usedSpace","userAgent","userLanguage","username","v8BreakIterator","vAlign","vLink","valid","validateProgram","validationMessage","validity","value","valueAsDate","valueAsNumber","valueAsString","valueInSpecifiedUnits","valueMissing","valueOf","valueText","valueType","values","vector-effect","vectorEffect","velocityAngular","velocityExpansion","velocityX","velocityY","vendor","vendorSub","verify","version","vertexAttrib1f","vertexAttrib1fv","vertexAttrib2f","vertexAttrib2fv","vertexAttrib3f","vertexAttrib3fv","vertexAttrib4f","vertexAttrib4fv","vertexAttribDivisorANGLE","vertexAttribPointer","vertical","vertical-align","verticalAlign","verticalOverflow","vibrate","videoHeight","videoTracks","videoWidth","view","viewBox","viewBoxString","viewTarget","viewTargetString","viewport","viewportAnchorX","viewportAnchorY","viewportElement","visibility","visibilityState","visible","vlinkColor","voice","volume","vrml","vspace","w","wand","warn","wasClean","watch","watchPosition","webdriver","webkitAddKey","webkitAnimation","webkitAnimationDelay","webkitAnimationDirection","webkitAnimationDuration","webkitAnimationFillMode","webkitAnimationIterationCount","webkitAnimationName","webkitAnimationPlayState","webkitAnimationTimingFunction","webkitAppearance","webkitAudioContext","webkitAudioDecodedByteCount","webkitAudioPannerNode","webkitBackfaceVisibility","webkitBackground","webkitBackgroundAttachment","webkitBackgroundClip","webkitBackgroundColor","webkitBackgroundImage","webkitBackgroundOrigin","webkitBackgroundPosition","webkitBackgroundPositionX","webkitBackgroundPositionY","webkitBackgroundRepeat","webkitBackgroundSize","webkitBackingStorePixelRatio","webkitBorderImage","webkitBorderImageOutset","webkitBorderImageRepeat","webkitBorderImageSlice","webkitBorderImageSource","webkitBorderImageWidth","webkitBoxAlign","webkitBoxDirection","webkitBoxFlex","webkitBoxOrdinalGroup","webkitBoxOrient","webkitBoxPack","webkitBoxSizing","webkitCancelAnimationFrame","webkitCancelFullScreen","webkitCancelKeyRequest","webkitCancelRequestAnimationFrame","webkitClearResourceTimings","webkitClosedCaptionsVisible","webkitConvertPointFromNodeToPage","webkitConvertPointFromPageToNode","webkitCreateShadowRoot","webkitCurrentFullScreenElement","webkitCurrentPlaybackTargetIsWireless","webkitDirectionInvertedFromDevice","webkitDisplayingFullscreen","webkitEnterFullScreen","webkitEnterFullscreen","webkitExitFullScreen","webkitExitFullscreen","webkitExitPointerLock","webkitFullScreenKeyboardInputAllowed","webkitFullscreenElement","webkitFullscreenEnabled","webkitGenerateKeyRequest","webkitGetAsEntry","webkitGetDatabaseNames","webkitGetEntries","webkitGetEntriesByName","webkitGetEntriesByType","webkitGetFlowByName","webkitGetGamepads","webkitGetImageDataHD","webkitGetNamedFlows","webkitGetRegionFlowRanges","webkitGetUserMedia","webkitHasClosedCaptions","webkitHidden","webkitIDBCursor","webkitIDBDatabase","webkitIDBDatabaseError","webkitIDBDatabaseException","webkitIDBFactory","webkitIDBIndex","webkitIDBKeyRange","webkitIDBObjectStore","webkitIDBRequest","webkitIDBTransaction","webkitImageSmoothingEnabled","webkitIndexedDB","webkitInitMessageEvent","webkitIsFullScreen","webkitKeys","webkitLineDashOffset","webkitLockOrientation","webkitMatchesSelector","webkitMediaStream","webkitNotifications","webkitOfflineAudioContext","webkitOrientation","webkitPeerConnection00","webkitPersistentStorage","webkitPointerLockElement","webkitPostMessage","webkitPreservesPitch","webkitPutImageDataHD","webkitRTCPeerConnection","webkitRegionOverset","webkitRequestAnimationFrame","webkitRequestFileSystem","webkitRequestFullScreen","webkitRequestFullscreen","webkitRequestPointerLock","webkitResolveLocalFileSystemURL","webkitSetMediaKeys","webkitSetResourceTimingBufferSize","webkitShadowRoot","webkitShowPlaybackTargetPicker","webkitSlice","webkitSpeechGrammar","webkitSpeechGrammarList","webkitSpeechRecognition","webkitSpeechRecognitionError","webkitSpeechRecognitionEvent","webkitStorageInfo","webkitSupportsFullscreen","webkitTemporaryStorage","webkitTextSizeAdjust","webkitTransform","webkitTransformOrigin","webkitTransition","webkitTransitionDelay","webkitTransitionDuration","webkitTransitionProperty","webkitTransitionTimingFunction","webkitURL","webkitUnlockOrientation","webkitUserSelect","webkitVideoDecodedByteCount","webkitVisibilityState","webkitWirelessVideoPlaybackDisabled","webkitdropzone","webstore","weight","whatToShow","wheelDelta","wheelDeltaX","wheelDeltaY","which","white-space","whiteSpace","wholeText","widows","width","will-change","willChange","willValidate","window","withCredentials","word-break","word-spacing","word-wrap","wordBreak","wordSpacing","wordWrap","wrap","wrapKey","write","writeln","writingMode","x","x1","x2","xChannelSelector","xmlEncoding","xmlStandalone","xmlVersion","xmlbase","xmllang","xmlspace","y","y1","y2","yChannelSelector","yandex","z","z-index","zIndex","zoom","zoomAndPan","zoomRectScreen"];function lr(e,t){function n(e){_(t,e);}e.walk(new On((function(e){e instanceof wt&&e.quote?n(e.key):e instanceof Rt&&e.quote?n(e.key.name):e instanceof St&&fr(e.property,n);})));}function fr(e,t){e.walk(new On((function(e){return e instanceof Et?fr(e.tail_node(),t):e instanceof fn?t(e.value):e instanceof bt&&(fr(e.consequent,t),fr(e.alternative,t)),!0})));}function pr(e,t){var n=(t=o(t,{builtins:!1,cache:null,debug:!1,keep_quoted:!1,only_cache:!1,regex:null,reserved:null,undeclared:!1},!0)).reserved;Array.isArray(n)||(n=[n]);var i=new Set(n);t.builtins||function(e){cr.forEach(i);var t={},n="object"==typeof commonjsGlobal?commonjsGlobal:self;function i(t){e.add(t);}["Symbol","Map","Promise","Proxy","Reflect","Set","WeakMap","WeakSet"].forEach((function(e){t[e]=n[e]||new Function;})),["null","true","false","NaN","Infinity","-Infinity","undefined"].forEach(i),[Object,Array,Function,Number,String,Boolean,Error,Math,Date,RegExp,t.Symbol,ArrayBuffer,DataView,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,eval,EvalError,Float32Array,Float64Array,Int8Array,Int16Array,Int32Array,isFinite,isNaN,JSON,t.Map,parseFloat,parseInt,t.Promise,t.Proxy,RangeError,ReferenceError,t.Reflect,t.Set,SyntaxError,TypeError,Uint8Array,Uint8ClampedArray,Uint16Array,Uint32Array,URIError,t.WeakMap,t.WeakSet].forEach((function(e){Object.getOwnPropertyNames(e).map(i),e.prototype&&Object.getOwnPropertyNames(e.prototype).map(i);}));}(i);var r,a=-1;t.cache?(r=t.cache.props).forEach((function(e){i.add(e);})):r=new Map;var s,u=t.regex&&new RegExp(t.regex),c=!1!==t.debug;c&&(s=!0===t.debug?"":t.debug);var l=new Set,f=new Set,p="strict"===t.keep_quoted;return e.walk(new On((function(e){if(e instanceof wt)"string"!=typeof e.key||p&&e.quote||m(e.key);else if(e instanceof Rt)p&&e.key.end.quote||m(e.key.name);else if(e instanceof Dt){var n=!!t.undeclared;if(!n){for(var i=e;i.expression;)i=i.expression;n=!(i.thedef&&i.thedef.undeclared);}!n||p&&e.quote||m(e.property);}else e instanceof St?p||fr(e.property,m):e instanceof mt&&"Object.defineProperty"==e.expression.print_to_string()&&fr(e.args[1],m);}))),e.transform(new Fn((function(e){e instanceof wt?"string"!=typeof e.key||p&&e.quote||(e.key=h(e.key)):e instanceof Rt?p&&e.key.end.quote||(e.key.name=h(e.key.name)):e instanceof Dt?p&&e.quote||(e.property=h(e.property)):!t.keep_quoted&&e instanceof St?e.property=E(e.property):e instanceof mt&&"Object.defineProperty"==e.expression.print_to_string()&&(e.args[1]=E(e.args[1]));})));function _(e){return !f.has(e)&&(!i.has(e)&&(t.only_cache?r.has(e):!/^-?[0-9]+(\.[0-9]+)?(e[+-][0-9]+)?$/.test(e)))}function d(e){return !(u&&!u.test(e))&&(!i.has(e)&&(r.has(e)||l.has(e)))}function m(e){_(e)&&l.add(e),d(e)||f.add(e);}function h(e){if(!d(e))return e;var t=r.get(e);if(!t){if(c){var n="_$"+e+"$"+s+"_";_(n)&&(t=n);}if(!t)do{t=qn(++a);}while(!_(t));r.set(e,t);}return t}function E(e){return e.transform(new Fn((function(e){if(e instanceof Et){var t=e.expressions.length-1;e.expressions[t]=E(e.expressions[t]);}else e instanceof fn?e.value=h(e.value):e instanceof bt&&(e.consequent=E(e.consequent),e.alternative=E(e.alternative));return e})))}}var _r="undefined"==typeof atob?function(e){return Buffer.from(e,"base64").toString()}:atob,dr="undefined"==typeof btoa?function(e){return Buffer.from(e).toString("base64")}:btoa;function mr(e,t,n){t[e]&&n.forEach((function(n){t[n]&&("object"!=typeof t[n]&&(t[n]={}),e in t[n]||(t[n][e]=t[e]));}));}function hr(e){e&&("props"in e?e.props instanceof Map||(e.props=function(e){var t=new Map;for(var n in e)D(e,n)&&"$"===n.charAt(0)&&t.set(n.substr(1),e[n]);return t}(e.props)):e.props=new Map);}function Er(e){return {props:(t=e.props,n=Object.create(null),t.forEach((function(e,t){n["$"+t]=e;})),n)};var t,n;}function gr(e,n){var i,r,a=pe.warn_function;try{var s,u=(n=o(n,{compress:{},ecma:void 0,enclose:!1,ie8:!1,keep_classnames:void 0,keep_fnames:!1,mangle:{},module:!1,nameCache:null,output:{},parse:{},rename:void 0,safari10:!1,sourceMap:!1,timings:!1,toplevel:!1,warnings:!1,wrap:!1},!0)).timings&&{start:Date.now()};void 0===n.keep_classnames&&(n.keep_classnames=n.keep_fnames),void 0===n.rename&&(n.rename=n.compress&&n.mangle),mr("ecma",n,["parse","compress","output"]),mr("ie8",n,["compress","mangle","output"]),mr("keep_classnames",n,["compress","mangle"]),mr("keep_fnames",n,["compress","mangle"]),mr("module",n,["parse","compress","mangle"]),mr("safari10",n,["mangle","output"]),mr("toplevel",n,["compress","mangle"]),mr("warnings",n,["compress"]),n.mangle&&(n.mangle=o(n.mangle,{cache:n.nameCache&&(n.nameCache.vars||{}),eval:!1,ie8:!1,keep_classnames:!1,keep_fnames:!1,module:!1,properties:!1,reserved:[],safari10:!1,toplevel:!1},!0),n.mangle.properties&&("object"!=typeof n.mangle.properties&&(n.mangle.properties={}),n.mangle.properties.keep_quoted&&(s=n.mangle.properties.reserved,Array.isArray(s)||(s=[]),n.mangle.properties.reserved=s),!n.nameCache||"cache"in n.mangle.properties||(n.mangle.properties.cache=n.nameCache.props||{})),hr(n.mangle.cache),hr(n.mangle.properties.cache)),n.sourceMap&&(n.sourceMap=o(n.sourceMap,{asObject:!1,content:null,filename:null,includeSources:!1,root:null,url:null},!0));var c,l=[];if(n.warnings&&!pe.warn_function&&(pe.warn_function=function(e){l.push(e);}),u&&(u.parse=Date.now()),e instanceof Ne)c=e;else {for(var f in "string"==typeof e&&(e=[e]),n.parse=n.parse||{},n.parse.toplevel=null,e)if(D(e,f)&&(n.parse.filename=f,n.parse.toplevel=ce(e[f],n.parse),n.sourceMap&&"inline"==n.sourceMap.content)){if(Object.keys(e).length>1)throw new Error("inline source map only works with singular input");n.sourceMap.content=(i=e[f],r=void 0,(r=/(?:^|[^.])\/\/# sourceMappingURL=data:application\/json(;[\w=-]*)?;base64,([+/0-9A-Za-z]*=*)\s*$/.exec(i))?_r(r[2]):(pe.warn("inline source map not found"),null));}c=n.parse.toplevel;}s&&"strict"!==n.mangle.properties.keep_quoted&&lr(c,s),n.wrap&&(c=c.wrap_commonjs(n.wrap)),n.enclose&&(c=c.wrap_enclose(n.enclose)),u&&(u.rename=Date.now()),u&&(u.compress=Date.now()),n.compress&&(c=new ai(n.compress).compress(c)),u&&(u.scope=Date.now()),n.mangle&&c.figure_out_scope(n.mangle),u&&(u.mangle=Date.now()),n.mangle&&(qn.reset(),c.compute_char_frequency(n.mangle),c.mangle_names(n.mangle)),u&&(u.properties=Date.now()),n.mangle&&n.mangle.properties&&(c=pr(c,n.mangle.properties)),u&&(u.output=Date.now());var p={};if(n.output.ast&&(p.ast=c),!D(n.output,"code")||n.output.code){if(n.sourceMap&&("string"==typeof n.sourceMap.content&&(n.sourceMap.content=JSON.parse(n.sourceMap.content)),n.output.source_map=function(e){e=o(e,{file:null,root:null,orig:null,orig_line_diff:0,dest_line_diff:0});var n=new t.SourceMapGenerator({file:e.file,sourceRoot:e.root}),i=e.orig&&new t.SourceMapConsumer(e.orig);return i&&i.sources.forEach((function(e){var t=i.sourceContentFor(e,!0);t&&n.setSourceContent(e,t);})),{add:function(t,r,o,a,s,u){if(i){var c=i.originalPositionFor({line:a,column:s});if(null===c.source)return;t=c.source,a=c.line,s=c.column,u=c.name||u;}n.addMapping({generated:{line:r+e.dest_line_diff,column:o},original:{line:a+e.orig_line_diff,column:s},source:t,name:u});},get:function(){return n},toString:function(){return JSON.stringify(n.toJSON())}}}({file:n.sourceMap.filename,orig:n.sourceMap.content,root:n.sourceMap.root}),n.sourceMap.includeSources)){if(e instanceof Ne)throw new Error("original source content unavailable");for(var f in e)D(e,f)&&n.output.source_map.get().setSourceContent(f,e[f]);}delete n.output.ast,delete n.output.code;var _=Bn(n.output);if(c.print(_),p.code=_.get(),n.sourceMap)if(n.sourceMap.asObject?p.map=n.output.source_map.get().toJSON():p.map=n.output.source_map.toString(),"inline"==n.sourceMap.url){var d="object"==typeof p.map?JSON.stringify(p.map):p.map;p.code+="\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,"+dr(d);}else n.sourceMap.url&&(p.code+="\n//# sourceMappingURL="+n.sourceMap.url);}return n.nameCache&&n.mangle&&(n.mangle.cache&&(n.nameCache.vars=Er(n.mangle.cache)),n.mangle.properties&&n.mangle.properties.cache&&(n.nameCache.props=Er(n.mangle.properties.cache))),u&&(u.end=Date.now(),p.timings={parse:.001*(u.rename-u.parse),rename:.001*(u.compress-u.rename),compress:.001*(u.scope-u.compress),scope:.001*(u.mangle-u.scope),mangle:.001*(u.properties-u.mangle),properties:.001*(u.output-u.properties),output:.001*(u.end-u.output),total:.001*(u.end-u.start)}),l.length&&(p.warnings=l),p}catch(e){return {error:e}}finally{pe.warn_function=a;}}!function(){var e=function(e){for(var t=!0,n=0;n<e.length;n++)t&&e[n]instanceof _e&&e[n].body instanceof fn?e[n]=new me({start:e[n].start,end:e[n].end,value:e[n].body.value}):!t||e[n]instanceof _e&&e[n].body instanceof fn||(t=!1);return e},t={Program:function(t){return new Ne({start:i(t),end:r(t),body:e(t.body.map(s))})},ArrayPattern:function(e){return new Ke({start:i(e),end:r(e),names:e.elements.map((function(e){return null===e?new Dn:s(e)})),is_array:!0})},ObjectPattern:function(e){return new Ke({start:i(e),end:r(e),names:e.properties.map(s),is_array:!1})},AssignmentPattern:function(e){return new Ot({start:i(e),end:r(e),left:s(e.left),operator:"=",right:s(e.right)})},SpreadElement:function(e){return new ke({start:i(e),end:r(e),expression:s(e.argument)})},RestElement:function(e){return new ke({start:i(e),end:r(e),expression:s(e.argument)})},TemplateElement:function(e){return new He({start:i(e),end:r(e),value:e.value.cooked,raw:e.value.raw})},TemplateLiteral:function(e){for(var t=[],n=0;n<e.quasis.length;n++)t.push(s(e.quasis[n])),e.expressions[n]&&t.push(s(e.expressions[n]));return new Ge({start:i(e),end:r(e),segments:t})},TaggedTemplateExpression:function(e){return new Ue({start:i(e),end:r(e),template_string:s(e.quasi),prefix:s(e.tag)})},FunctionDeclaration:function(t){return new Be({start:i(t),end:r(t),name:s(t.id),argnames:t.params.map(s),is_generator:t.generator,async:t.async,body:e(s(t.body).body)})},FunctionExpression:function(t){return new Pe({start:i(t),end:r(t),name:s(t.id),argnames:t.params.map(s),is_generator:t.generator,async:t.async,body:e(s(t.body).body)})},ArrowFunctionExpression:function(e){const t="BlockStatement"===e.body.type?s(e.body).body:[p(We,{},{value:s(e.body)})];return new Ve({start:i(e),end:r(e),argnames:e.params.map(s),body:t,async:e.async})},ExpressionStatement:function(e){return new he({start:i(e),end:r(e),body:s(e.expression)})},TryStatement:function(e){var t=e.handlers||[e.handler];if(t.length>1||e.guardedHandlers&&e.guardedHandlers.length)throw new Error("Multiple catch clauses are not supported.");return new rt({start:i(e),end:r(e),body:s(e.block).body,bcatch:s(t[0]),bfinally:e.finalizer?new at(s(e.finalizer)):null})},Property:function(e){var t=e.key,n={start:i(t||e.value),end:r(e.value),key:"Identifier"==t.type?t.name:t.value,value:s(e.value)};return e.computed&&(n.key=s(e.key)),e.method?(n.is_generator=e.value.generator,n.async=e.value.async,e.computed?n.key=s(e.key):n.key=new qt({name:n.key}),new kt(n)):"init"==e.kind?("Identifier"!=t.type&&"Literal"!=t.type&&(n.key=s(t)),new wt(n)):("string"!=typeof n.key&&"number"!=typeof n.key||(n.key=new qt({name:n.key})),n.value=new Le(n.value),"get"==e.kind?new Nt(n):"set"==e.kind?new xt(n):"method"==e.kind?(n.async=e.value.async,n.is_generator=e.value.generator,n.quote=e.computed?'"':null,new kt(n)):void 0)},MethodDefinition:function(e){var t={start:i(e),end:r(e),key:e.computed?s(e.key):new qt({name:e.key.name||e.key.value}),value:s(e.value),static:e.static};return "get"==e.kind?new Nt(t):"set"==e.kind?new xt(t):(t.is_generator=e.value.generator,t.async=e.value.async,new kt(t))},FieldDefinition:function(e){let t;if(e.computed)t=s(e.key);else {if("Identifier"!==e.key.type)throw new Error("Non-Identifier key in FieldDefinition");t=s(e.key);}return new Lt({start:i(e),end:r(e),key:t,value:s(e.value),static:e.static})},ArrayExpression:function(e){return new Ft({start:i(e),end:r(e),elements:e.elements.map((function(e){return null===e?new Dn:s(e)}))})},ObjectExpression:function(e){return new Mt({start:i(e),end:r(e),properties:e.properties.map((function(e){return "SpreadElement"===e.type||(e.type="Property"),s(e)}))})},SequenceExpression:function(e){return new Et({start:i(e),end:r(e),expressions:e.expressions.map(s)})},MemberExpression:function(e){return new(e.computed?St:Dt)({start:i(e),end:r(e),property:e.computed?s(e.property):e.property.name,expression:s(e.object)})},SwitchCase:function(e){return new(e.test?it:nt)({start:i(e),end:r(e),expression:s(e.test),body:e.consequent.map(s)})},VariableDeclaration:function(e){return new("const"===e.kind?lt:"let"===e.kind?ct:ut)({start:i(e),end:r(e),definitions:e.declarations.map(s)})},ImportDeclaration:function(e){var t=null,n=null;return e.specifiers.forEach((function(e){"ImportSpecifier"===e.type?(n||(n=[]),n.push(new pt({start:i(e),end:r(e),foreign_name:s(e.imported),name:s(e.local)}))):"ImportDefaultSpecifier"===e.type?t=s(e.local):"ImportNamespaceSpecifier"===e.type&&(n||(n=[]),n.push(new pt({start:i(e),end:r(e),foreign_name:new tn({name:"*"}),name:s(e.local)})));})),new _t({start:i(e),end:r(e),imported_name:t,imported_names:n,module_name:s(e.source)})},ExportAllDeclaration:function(e){return new dt({start:i(e),end:r(e),exported_names:[new pt({name:new an({name:"*"}),foreign_name:new an({name:"*"})})],module_name:s(e.source)})},ExportNamedDeclaration:function(e){return new dt({start:i(e),end:r(e),exported_definition:s(e.declaration),exported_names:e.specifiers&&e.specifiers.length?e.specifiers.map((function(e){return new pt({foreign_name:s(e.exported),name:s(e.local)})})):null,module_name:s(e.source)})},ExportDefaultDeclaration:function(e){return new dt({start:i(e),end:r(e),exported_value:s(e.declaration),is_default:!0})},Literal:function(e){var t=e.value,n={start:i(e),end:r(e)},o=e.regex;if(o&&o.pattern)return n.value={source:o.pattern,flags:o.flags},new dn(n);if(o){const i=e.raw||t,r=i.match(/^\/(.*)\/(\w*)$/);if(!r)throw new Error("Invalid regex source "+i);const[o,a,s]=r;return n.value={source:a,flags:s},new dn(n)}if(null===t)return new hn(n);switch(typeof t){case"string":return n.value=t,new fn(n);case"number":return n.value=t,new pn(n);case"boolean":return new(t?Tn:An)(n)}},MetaProperty:function(e){if("new"===e.meta.name&&"target"===e.property.name)return new Kt({start:i(e),end:r(e)})},Identifier:function(e){var t=a[a.length-2];return new("LabeledStatement"==t.type?nn:"VariableDeclarator"==t.type&&t.id===e?"const"==t.kind?Xt:"let"==t.kind?zt:Gt:/Import.*Specifier/.test(t.type)?t.local===e?en:tn:"ExportSpecifier"==t.type?t.local===e?on:an:"FunctionExpression"==t.type?t.id===e?jt:Wt:"FunctionDeclaration"==t.type?t.id===e?Yt:Wt:"ArrowFunctionExpression"==t.type?t.params.includes(e)?Wt:rn:"ClassExpression"==t.type?t.id===e?Jt:rn:"Property"==t.type?t.key===e&&t.computed||t.value===e?rn:qt:"FieldDefinition"==t.type?t.key===e&&t.computed||t.value===e?rn:$t:"ClassDeclaration"==t.type?t.id===e?Zt:rn:"MethodDefinition"==t.type?t.computed?rn:qt:"CatchClause"==t.type?Qt:"BreakStatement"==t.type||"ContinueStatement"==t.type?sn:rn)({start:i(e),end:r(e),name:e.name})},BigIntLiteral:e=>new _n({start:i(e),end:r(e),value:e.value})};function n(e){if("Literal"==e.type)return null!=e.raw?e.raw:e.value+""}function i(e){var t=e.loc,i=t&&t.start,r=e.range;return new fe({file:t&&t.source,line:i&&i.line,col:i&&i.column,pos:r?r[0]:e.start,endline:i&&i.line,endcol:i&&i.column,endpos:r?r[0]:e.start,raw:n(e)})}function r(e){var t=e.loc,i=t&&t.end,r=e.range;return new fe({file:t&&t.source,line:i&&i.line,col:i&&i.column,pos:r?r[1]:e.end,endline:i&&i.line,endcol:i&&i.column,endpos:r?r[1]:e.end,raw:n(e)})}function o(e,n,o){var a="function From_Moz_"+e+"(M){\n";a+="return new U2."+n.name+"({\nstart: my_start_token(M),\nend: my_end_token(M)";var c="function To_Moz_"+e+"(M){\n";c+="return {\ntype: "+JSON.stringify(e),o&&o.split(/\s*,\s*/).forEach((function(e){var t=/([a-z0-9$_]+)([=@>%])([a-z0-9$_]+)/i.exec(e);if(!t)throw new Error("Can't understand property map: "+e);var n=t[1],i=t[2],r=t[3];switch(a+=",\n"+r+": ",c+=",\n"+n+": ",i){case"@":a+="M."+n+".map(from_moz)",c+="M."+r+".map(to_moz)";break;case">":a+="from_moz(M."+n+")",c+="to_moz(M."+r+")";break;case"=":a+="M."+n,c+="M."+r;break;case"%":a+="from_moz(M."+n+").body",c+="to_moz_block(M)";break;default:throw new Error("Can't understand operator in propmap: "+e)}})),a+="\n})\n}",c+="\n}\n}",a=new Function("U2","my_start_token","my_end_token","from_moz","return("+a+")")(xn,i,r,s),c=new Function("to_moz","to_moz_block","to_moz_scope","return("+c+")")(l,_,d),t[e]=a,u(n,c);}t.UpdateExpression=t.UnaryExpression=function(e){return new(("prefix"in e?e.prefix:"UnaryExpression"==e.type)?At:Tt)({start:i(e),end:r(e),operator:e.operator,expression:s(e.argument)})},t.ClassDeclaration=t.ClassExpression=function(e){return new("ClassDeclaration"===e.type?Pt:Vt)({start:i(e),end:r(e),name:s(e.id),extends:s(e.superClass),properties:e.body.body.map(s)})},o("EmptyStatement",ve),o("BlockStatement",Se,"body@body"),o("IfStatement",Qe,"test>condition, consequent>body, alternate>alternative"),o("LabeledStatement",Te,"label>label, body>body"),o("BreakStatement",$e,"label>label"),o("ContinueStatement",je,"label>label"),o("WithStatement",we,"object>expression, body>body"),o("SwitchStatement",et,"discriminant>expression, cases@body"),o("ReturnStatement",We,"argument>value"),o("ThrowStatement",Ye,"argument>value"),o("WhileStatement",Oe,"test>condition, body>body"),o("DoWhileStatement",Ce,"test>condition, body>body"),o("ForStatement",Fe,"init>init, test>condition, update>step, body>body"),o("ForInStatement",Me,"left>init, right>object, body>body"),o("ForOfStatement",Re,"left>init, right>object, body>body, await=await"),o("AwaitExpression",Ze,"argument>expression"),o("YieldExpression",Je,"argument>expression, delegate=is_star"),o("DebuggerStatement",de),o("VariableDeclarator",ft,"id>name, init>value"),o("CatchClause",ot,"param>argname, body%body"),o("ThisExpression",un),o("Super",cn),o("BinaryExpression",yt,"operator=operator, left>left, right>right"),o("LogicalExpression",yt,"operator=operator, left>left, right>right"),o("AssignmentExpression",Ct,"operator=operator, left>left, right>right"),o("ConditionalExpression",bt,"test>condition, consequent>consequent, alternate>alternative"),o("NewExpression",ht,"callee>expression, arguments@args"),o("CallExpression",mt,"callee>expression, arguments@args"),u(Ne,(function(e){return d("Program",e)})),u(ke,(function(e){return {type:f()?"RestElement":"SpreadElement",argument:l(e.expression)}})),u(Ue,(function(e){return {type:"TaggedTemplateExpression",tag:l(e.prefix),quasi:l(e.template_string)}})),u(Ge,(function(e){for(var t=[],n=[],i=0;i<e.segments.length;i++)i%2!=0?n.push(l(e.segments[i])):t.push({type:"TemplateElement",value:{raw:e.segments[i].raw,cooked:e.segments[i].value},tail:i===e.segments.length-1});return {type:"TemplateLiteral",quasis:t,expressions:n}})),u(Be,(function(e){return {type:"FunctionDeclaration",id:l(e.name),params:e.argnames.map(l),generator:e.is_generator,async:e.async,body:d("BlockStatement",e)}})),u(Pe,(function(e,t){var n=void 0!==t.is_generator?t.is_generator:e.is_generator;return {type:"FunctionExpression",id:l(e.name),params:e.argnames.map(l),generator:n,async:e.async,body:d("BlockStatement",e)}})),u(Ve,(function(e){var t={type:"BlockStatement",body:e.body.map(l)};return {type:"ArrowFunctionExpression",params:e.argnames.map(l),async:e.async,body:t}})),u(Ke,(function(e){return e.is_array?{type:"ArrayPattern",elements:e.names.map(l)}:{type:"ObjectPattern",properties:e.names.map(l)}})),u(me,(function(e){return {type:"ExpressionStatement",expression:{type:"Literal",value:e.value,raw:e.print_to_string()},directive:e.value}})),u(he,(function(e){return {type:"ExpressionStatement",expression:l(e.body)}})),u(tt,(function(e){return {type:"SwitchCase",test:l(e.expression),consequent:e.body.map(l)}})),u(rt,(function(e){return {type:"TryStatement",block:_(e),handler:l(e.bcatch),guardedHandlers:[],finalizer:l(e.bfinally)}})),u(ot,(function(e){return {type:"CatchClause",param:l(e.argname),guard:null,body:_(e)}})),u(st,(function(e){return {type:"VariableDeclaration",kind:e instanceof lt?"const":e instanceof ct?"let":"var",declarations:e.definitions.map(l)}})),u(dt,(function(e){return e.exported_names?"*"===e.exported_names[0].name.name?{type:"ExportAllDeclaration",source:l(e.module_name)}:{type:"ExportNamedDeclaration",specifiers:e.exported_names.map((function(e){return {type:"ExportSpecifier",exported:l(e.foreign_name),local:l(e.name)}})),declaration:l(e.exported_definition),source:l(e.module_name)}:{type:e.is_default?"ExportDefaultDeclaration":"ExportNamedDeclaration",declaration:l(e.exported_value||e.exported_definition)}})),u(_t,(function(e){var t=[];return e.imported_name&&t.push({type:"ImportDefaultSpecifier",local:l(e.imported_name)}),e.imported_names&&"*"===e.imported_names[0].foreign_name.name?t.push({type:"ImportNamespaceSpecifier",local:l(e.imported_names[0].name)}):e.imported_names&&e.imported_names.forEach((function(e){t.push({type:"ImportSpecifier",local:l(e.name),imported:l(e.foreign_name)});})),{type:"ImportDeclaration",specifiers:t,source:l(e.module_name)}})),u(Et,(function(e){return {type:"SequenceExpression",expressions:e.expressions.map(l)}})),u(gt,(function(e){var t=e instanceof St;return {type:"MemberExpression",object:l(e.expression),computed:t,property:t?l(e.property):{type:"Identifier",name:e.property}}})),u(vt,(function(e){return {type:"++"==e.operator||"--"==e.operator?"UpdateExpression":"UnaryExpression",operator:e.operator,prefix:e instanceof At,argument:l(e.expression)}})),u(yt,(function(e){if("="==e.operator&&f())return {type:"AssignmentPattern",left:l(e.left),right:l(e.right)};return {type:"&&"==e.operator||"||"==e.operator||"??"===e.operator?"LogicalExpression":"BinaryExpression",left:l(e.left),operator:e.operator,right:l(e.right)}})),u(Ft,(function(e){return {type:"ArrayExpression",elements:e.elements.map(l)}})),u(Mt,(function(e){return {type:"ObjectExpression",properties:e.properties.map(l)}})),u(Rt,(function(e,t){var n,i=e.key instanceof pe?l(e.key):{type:"Identifier",value:e.key};"number"==typeof e.key&&(i={type:"Literal",value:Number(e.key)}),"string"==typeof e.key&&(i={type:"Identifier",name:e.key});var r="string"==typeof e.key||"number"==typeof e.key,o=!r&&(!(e.key instanceof Bt)||e.key instanceof rn);return e instanceof wt?(n="init",o=!r):e instanceof Nt?n="get":e instanceof xt&&(n="set"),e instanceof Lt?{type:"FieldDefinition",computed:o,key:i,value:l(e.value),static:e.static}:t instanceof It?{type:"MethodDefinition",computed:o,kind:n,static:e.static,key:l(e.key),value:l(e.value)}:{type:"Property",computed:o,kind:n,key:i,value:l(e.value)}})),u(kt,(function(e,t){return t instanceof Mt?{type:"Property",computed:!(e.key instanceof Bt)||e.key instanceof rn,kind:"init",method:!0,shorthand:!1,key:l(e.key),value:l(e.value)}:{type:"MethodDefinition",computed:!(e.key instanceof Bt)||e.key instanceof rn,kind:"constructor"===e.key?"constructor":"method",static:e.static,key:l(e.key),value:l(e.value)}})),u(It,(function(e){return {type:e instanceof Vt?"ClassExpression":"ClassDeclaration",superClass:l(e.extends),id:e.name?l(e.name):null,body:{type:"ClassBody",body:e.properties.map(l)}}})),u(Kt,(function(){return {type:"MetaProperty",meta:{type:"Identifier",name:"new"},property:{type:"Identifier",name:"target"}}})),u(Bt,(function(e,t){if(e instanceof qt&&t.quote)return {type:"Literal",value:e.name};var n=e.definition();return {type:"Identifier",name:n?n.mangled_name||n.name:e.name}})),u(dn,(function(e){const t=e.value.source,n=e.value.flags;return {type:"Literal",value:null,raw:e.print_to_string(),regex:{pattern:t,flags:n}}})),u(ln,(function(e){var t=e.value;return "number"==typeof t&&(t<0||0===t&&1/t<0)?{type:"UnaryExpression",operator:"-",prefix:!0,argument:{type:"Literal",value:-t,raw:e.start.raw}}:{type:"Literal",value:t,raw:e.start.raw}})),u(mn,(function(e){return {type:"Identifier",name:String(e.value)}})),u(_n,e=>({type:"BigIntLiteral",value:e.value})),vn.DEFMETHOD("to_mozilla_ast",ln.prototype.to_mozilla_ast),hn.DEFMETHOD("to_mozilla_ast",ln.prototype.to_mozilla_ast),Dn.DEFMETHOD("to_mozilla_ast",(function(){return null})),De.DEFMETHOD("to_mozilla_ast",Se.prototype.to_mozilla_ast),Ie.DEFMETHOD("to_mozilla_ast",Pe.prototype.to_mozilla_ast);var a=null;function s(e){a.push(e);var n=null!=e?t[e.type](e):null;return a.pop(),n}function u(e,t){e.DEFMETHOD("to_mozilla_ast",(function(e){return n=this,i=t(this,e),r=n.start,o=n.end,r&&o?(null!=r.pos&&null!=o.endpos&&(i.range=[r.pos,o.endpos]),r.line&&(i.loc={start:{line:r.line,column:r.col},end:o.endline?{line:o.endline,column:o.endcol}:null},r.file&&(i.loc.source=r.file)),i):i;var n,i,r,o;}));}pe.from_mozilla_ast=function(e){var t=a;a=[];var n=s(e);return a=t,n};var c=null;function l(e){null===c&&(c=[]),c.push(e);var t=null!=e?e.to_mozilla_ast(c[c.length-2]):null;return c.pop(),0===c.length&&(c=null),t}function f(){for(var e=c.length;e--;)if(c[e]instanceof Ke)return !0;return !1}function _(e){return {type:"BlockStatement",body:e.body.map(l)}}function d(e,t){var n=t.body.map(l);return t.body[0]instanceof he&&t.body[0].body instanceof fn&&n.unshift(l(new ve(t.body[0]))),{type:e,body:n}}}(),e.AST_Accessor=Le,e.AST_Array=Ft,e.AST_Arrow=Ve,e.AST_Assign=Ct,e.AST_Atom=mn,e.AST_Await=Ze,e.AST_Binary=yt,e.AST_Block=De,e.AST_BlockStatement=Se,e.AST_Boolean=vn,e.AST_Break=$e,e.AST_Call=mt,e.AST_Case=it,e.AST_Catch=ot,e.AST_Class=It,e.AST_ClassExpression=Vt,e.AST_ConciseMethod=kt,e.AST_Conditional=bt,e.AST_Const=lt,e.AST_Constant=ln,e.AST_Continue=je,e.AST_DWLoop=be,e.AST_Debugger=de,e.AST_DefClass=Pt,e.AST_Default=nt,e.AST_DefaultAssign=Ot,e.AST_Definitions=st,e.AST_Defun=Be,e.AST_Destructuring=Ke,e.AST_Directive=me,e.AST_Do=Ce,e.AST_Dot=Dt,e.AST_EmptyStatement=ve,e.AST_Exit=ze,e.AST_Expansion=ke,e.AST_Export=dt,e.AST_False=An,e.AST_Finally=at,e.AST_For=Fe,e.AST_ForIn=Me,e.AST_ForOf=Re,e.AST_Function=Pe,e.AST_Hole=Dn,e.AST_If=Qe,e.AST_Import=_t,e.AST_Infinity=Sn,e.AST_IterationStatement=ye,e.AST_Jump=Xe,e.AST_Label=nn,e.AST_LabelRef=sn,e.AST_LabeledStatement=Te,e.AST_Lambda=Ie,e.AST_Let=ct,e.AST_LoopControl=qe,e.AST_NaN=En,e.AST_NameMapping=pt,e.AST_New=ht,e.AST_NewTarget=Kt,e.AST_Node=pe,e.AST_Null=hn,e.AST_Number=pn,e.AST_Object=Mt,e.AST_ObjectGetter=Nt,e.AST_ObjectKeyVal=wt,e.AST_ObjectProperty=Rt,e.AST_ObjectSetter=xt,e.AST_PrefixedTemplateString=Ue,e.AST_PropAccess=gt,e.AST_RegExp=dn,e.AST_Return=We,e.AST_Scope=xe,e.AST_Sequence=Et,e.AST_SimpleStatement=he,e.AST_Statement=_e,e.AST_StatementWithBody=Ae,e.AST_String=fn,e.AST_Sub=St,e.AST_Super=cn,e.AST_Switch=et,e.AST_SwitchBranch=tt,e.AST_Symbol=Bt,e.AST_SymbolBlockDeclaration=Ht,e.AST_SymbolCatch=Qt,e.AST_SymbolClass=Jt,e.AST_SymbolConst=Xt,e.AST_SymbolDeclaration=Ut,e.AST_SymbolDefClass=Zt,e.AST_SymbolDefun=Yt,e.AST_SymbolExport=on,e.AST_SymbolExportForeign=an,e.AST_SymbolFunarg=Wt,e.AST_SymbolImport=en,e.AST_SymbolImportForeign=tn,e.AST_SymbolLambda=jt,e.AST_SymbolLet=zt,e.AST_SymbolMethod=qt,e.AST_SymbolRef=rn,e.AST_SymbolVar=Gt,e.AST_TemplateSegment=He,e.AST_TemplateString=Ge,e.AST_This=un,e.AST_Throw=Ye,e.AST_Token=fe,e.AST_Toplevel=Ne,e.AST_True=Tn,e.AST_Try=rt,e.AST_Unary=vt,e.AST_UnaryPostfix=Tt,e.AST_UnaryPrefix=At,e.AST_Undefined=gn,e.AST_Var=ut,e.AST_VarDef=ft,e.AST_While=Oe,e.AST_With=we,e.AST_Yield=Je,e.Compressor=ai,e.OutputStream=Bn,e.TreeTransformer=Fn,e.TreeWalker=On,e._INLINE=Rn,e._JS_Parse_Error=Q,e._NOINLINE=wn,e._PURE=Mn,e._has_annotation=T,e._tokenizer=ie,e.base54=qn,e.default_options=$n,e.defaults=o,e.mangle_properties=pr,e.minify=gr,e.parse=ce,e.push_uniq=_,e.reserve_quoted_keys=lr,e.string_template=d,e.to_ascii=_r;}));

});

var decode$2 = he.decode;

var createMapFromString$2 = utils.createMapFromString;
// non-empty tags that will maintain whitespace around them
var inlineTags = createMapFromString$2('a,abbr,acronym,b,bdi,bdo,big,button,cite,code,del,dfn,em,font,i,ins,kbd,label,mark,math,nobr,object,q,rp,rt,rtc,ruby,s,samp,select,small,span,strike,strong,sub,sup,svg,textarea,time,tt,u,var');
// non-empty tags that will maintain whitespace within them
var inlineTextTags = createMapFromString$2('a,abbr,acronym,b,big,del,em,font,i,ins,kbd,mark,nobr,rp,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var');
// self-closing tags that will maintain whitespace around them
var selfClosingInlineTags = createMapFromString$2('comment,img,input,wbr');

// https://mathiasbynens.be/demo/javascript-mime-type
// https://developer.mozilla.org/en/docs/Web/HTML/Element/script#attr-type
var executableScriptsMimetypes = utils.createMap([
  'text/javascript',
  'text/ecmascript',
  'text/jscript',
  'application/javascript',
  'application/x-javascript',
  'application/ecmascript',
  'module'
]);

var keepScriptsMimetypes = utils.createMap([
  'module'
]);

var isSimpleBoolean = createMapFromString$2('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,truespeed,typemustmatch,visible');
var isBooleanValue = createMapFromString$2('true,false');

var srcsetTags = createMapFromString$2('img,source');

// Tag omission rules from https://html.spec.whatwg.org/multipage/syntax.html#optional-tags
// with the following deviations:
// - retain <body> if followed by <noscript>
// - </rb>, </rt>, </rtc>, </rp> & </tfoot> follow https://www.w3.org/TR/html5/syntax.html#optional-tags
// - retain all tags which are adjacent to non-standard HTML tags
var optionalStartTags = createMapFromString$2('html,head,body,colgroup,tbody');
var optionalEndTags = createMapFromString$2('html,head,body,li,dt,dd,p,rb,rt,rtc,rp,optgroup,option,colgroup,caption,thead,tbody,tfoot,tr,td,th');
var headerTags = createMapFromString$2('meta,link,script,style,template,noscript');
var descriptionTags = createMapFromString$2('dt,dd');
var pBlockTags = createMapFromString$2('address,article,aside,blockquote,details,div,dl,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,hr,main,menu,nav,ol,p,pre,section,table,ul');
var pInlineTags = createMapFromString$2('a,audio,del,ins,map,noscript,video');
var rubyTags = createMapFromString$2('rb,rt,rtc,rp');
var rtcTag = createMapFromString$2('rb,rtc,rp');
var optionTag = createMapFromString$2('option,optgroup');
var tableContentTags = createMapFromString$2('tbody,tfoot');
var tableSectionTags = createMapFromString$2('thead,tbody,tfoot');
var cellTags = createMapFromString$2('td,th');
var topLevelTags = createMapFromString$2('html,head,body');
var compactTags = createMapFromString$2('html,body');
var looseTags = createMapFromString$2('head,colgroup,caption');
var trailingTags = createMapFromString$2('dt,thead');
var htmlTags = createMapFromString$2('a,abbr,acronym,address,applet,area,article,aside,audio,b,base,basefont,bdi,bdo,bgsound,big,blink,blockquote,body,br,button,canvas,caption,center,cite,code,col,colgroup,command,content,data,datalist,dd,del,details,dfn,dialog,dir,div,dl,dt,element,em,embed,fieldset,figcaption,figure,font,footer,form,frame,frameset,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,image,img,input,ins,isindex,kbd,keygen,label,legend,li,link,listing,main,map,mark,marquee,menu,menuitem,meta,meter,multicol,nav,nobr,noembed,noframes,noscript,object,ol,optgroup,option,output,p,param,picture,plaintext,pre,progress,q,rb,rp,rt,rtc,ruby,s,samp,script,section,select,shadow,small,source,spacer,span,strike,strong,style,sub,summary,sup,table,tbody,td,template,textarea,tfoot,th,thead,time,title,tr,track,tt,u,ul,var,video,wbr,xmp');

var specialContentTags = createMapFromString$2('script,style');
