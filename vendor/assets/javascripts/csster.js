// Csster version 1.1.0; Copyright (c) Andrew J. Peterson / ndpsoftware.com. All Rights Reserved
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(18);
	__webpack_require__(14);
	__webpack_require__(25);
	__webpack_require__(15);
	__webpack_require__(26);
	module.exports = __webpack_require__(27);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var isArray = function isArray(object) {
	  return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && Object.prototype.toString.call(object) === '[object Array]';
	};

	// "each_with_index" from Ruby style
	var arrayEach = function arrayEach(a, fn) {
	  for (var i = 0; i < a.length;) {
	    fn(a[i], i++);
	  }
	  return a;
	};

	var arrayInject = function arrayInject(a, memo, iterator) {
	  arrayEach(a, function (value, index) {
	    memo = iterator(memo, value, index);
	  });
	  return memo;
	};

	var arrayFlatten = function arrayFlatten(a) {
	  return arrayInject(a, [], function (array, value) {
	    if (isArray(value)) return array.concat(arrayFlatten(value));
	    array.push(value);
	    return array;
	  });
	};

	exports.isArray = isArray;
	exports.arrayEach = arrayEach;
	exports.arrayInject = arrayInject;
	exports.arrayFlatten = arrayFlatten;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//  mergeHashInto(hashA, hashB, hashC...)
	// merge all properties from B, C into hash A.
	var mergeHashInto = function mergeHashInto(dest) {
	  for (var _len = arguments.length, hashes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    hashes[_key - 1] = arguments[_key];
	  }

	  for (var i = 0; i < hashes.length; i++) {
	    for (var k in hashes[i]) {
	      dest[k] = hashes[i][k];
	    }
	  }
	  return dest;
	};

	exports.mergeHashInto = mergeHashInto;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// S T R I N G s
	var dasherize = function dasherize(s) {
	  return s.replace(/([A-Z])/g, function ($1) {
	    return "-" + $1.toLowerCase();
	  });
	};

	exports.dasherize = dasherize;

/***/ },
/* 4 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// Lifted from jQuery: http://docs.jquery.com/Utilities/jQuery.browser
	var browser = {};

	function uaMatch(ua) {
	  ua = ua.toLowerCase();

	  var match = /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || !/compatible/.test(ua) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(ua) || [];

	  return { browser: match[1] || "", version: match[2] || "0" };
	}

	if (typeof navigator !== 'undefined') {
	  var browserMatch = uaMatch(navigator.userAgent);
	  if (browserMatch.browser) {
	    browser[browserMatch.browser] = true;
	    browser.version = browserMatch.version;
	  }
	}

	var browserInfo = function browserInfo() {
	  if (typeof global !== 'undefined' && global.browserOverride) {
	    return global.browserOverride;
	  } else {
	    return browser;
	  }
	};

	exports.browser = browser;
	exports. // legacy static structure
	browserInfo // fn that can be overridden for tests
	 = browserInfo;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _macros = __webpack_require__(6);

	var macros = _interopRequireWildcard(_macros);

	var _array = __webpack_require__(1);

	var _property_name_validator = __webpack_require__(14);

	var _rule_post_processors = __webpack_require__(15);

	var _browser = __webpack_require__(4);

	var _rulePostProcessor = __webpack_require__(16);

	var _propertyPreprocessor = __webpack_require__(17);

	var _color = __webpack_require__(18);

	var _buildRules = __webpack_require__(19);

	var _buildRules2 = _interopRequireDefault(_buildRules);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	if (!window.Csster) {
	  window.Csster = {};
	}

	Csster.macros = macros;

	Csster.arrayFlatten = _array.arrayFlatten;

	Csster.propertyNameValidator = _property_name_validator.propertyNameValidator;

	Csster.compressSelectors = _rule_post_processors.compressSelectors;

	Csster.browser = _browser.browser;

	Csster.browserInfo = _browser.browserInfo;

	Csster.rulesPostProcessors = _rulePostProcessor.rulesPostProcessors;

	Csster.propertyPreprocessors = _propertyPreprocessor.propertyPreprocessors;

	Csster.hslToHexColor = _color.hslToHexColor;
	(0, _color.colorizeString)();

	//import { propertyNameOf } from './propertyNameOf.es6'
	//Csster.propertyNameOf = propertyNameOf

	var stringifyRules = __webpack_require__(22).default;
	var insertCss = __webpack_require__(24).default;
	Csster.insertCss = insertCss;

	Csster.buildRules = _buildRules2.default;

	Csster.style = function (o) {
	  var rules = Csster.buildRules(o);
	  var css = stringifyRules(rules);
	  Csster.insertCss(css);
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.imageReplacement = exports.clearfix = exports.linearGradient = exports.verticalCentering = exports.horizontalCentering = exports.boxShadow = exports.roundedCorners = undefined;

	var _roundedCorners = __webpack_require__(7);

	var _roundedCorners2 = _interopRequireDefault(_roundedCorners);

	var _boxShadow = __webpack_require__(8);

	var _boxShadow2 = _interopRequireDefault(_boxShadow);

	var _horizontalCentering = __webpack_require__(9);

	var _horizontalCentering2 = _interopRequireDefault(_horizontalCentering);

	var _verticalCentering = __webpack_require__(10);

	var _verticalCentering2 = _interopRequireDefault(_verticalCentering);

	var _linearGradient = __webpack_require__(11);

	var _linearGradient2 = _interopRequireDefault(_linearGradient);

	var _clearfix = __webpack_require__(12);

	var _clearfix2 = _interopRequireDefault(_clearfix);

	var _imageReplacement = __webpack_require__(13);

	var _imageReplacement2 = _interopRequireDefault(_imageReplacement);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.roundedCorners = _roundedCorners2.default;
	exports.boxShadow = _boxShadow2.default;
	exports.horizontalCentering = _horizontalCentering2.default;
	exports.verticalCentering = _verticalCentering2.default;
	exports.linearGradient = _linearGradient2.default;
	exports.clearfix = _clearfix2.default;
	exports.imageReplacement = _imageReplacement2.default; /*
	                                                        * Functions that return a set of properties and their values.
	                                                        * They can be inserted as style rules using "has" property.
	                                                        */

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = roundedCorners;
	/**
	 *  Return rounded corner properties. Call with an optional side and a radius.
	 *
	 * roundedCorners(10);
	 * roundedCorners('left', 8);
	 * roundedCorners('tl', 6);
	 *
	 * @param side  tl, tr, bl, br, left, right, top or bottom or "all", the default
	 * @param radius pixel measurement
	 */
	function roundedCorners(side, radius) {
	  if (!radius) {
	    radius = side || 10;
	    side = 'all';
	  }
	  if (side == 'all') {
	    return {
	      '-moz-border-radius': radius,
	      'border-radius': radius,
	      '-webkit-border-radius': radius
	      //            behavior: 'url(src/border-radius.htc)',
	      //            position: 'relative',zoom: '1'
	    };
	  } else {
	      var rules = {};
	      if (side == 'tl' || side == 'top' || side == 'left') {
	        rules['-moz-border-radius-topleft'] = radius;
	        rules['-webkit-border-top-left-radius'] = radius;
	        rules['border-top-left-radius'] = radius;
	      }
	      if (side == 'tr' || side == 'top' || side == 'right') {
	        rules['-webkit-border-top-right-radius'] = radius;
	        rules['-moz-border-radius-topright'] = radius;
	        rules['border-top-right-radius'] = radius;
	      }
	      if (side == 'bl' || side == 'bottom' || side == 'left') {
	        rules['-webkit-border-bottom-left-radius'] = radius;
	        rules['-moz-border-radius-bottomleft'] = radius;
	        rules['border-bottom-left-radius'] = radius;
	      }
	      if (side == 'br' || side == 'bottom' || side == 'right') {
	        rules['-webkit-border-bottom-right-radius'] = radius;
	        rules['-moz-border-radius-bottomright'] = radius;
	        rules['border-bottom-right-radius'] = radius;
	      }
	      return rules;
	    }
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = boxShadow;
	/*
	 Cross-browser box shadow code.

	 offsetOrDirection: an array holding the x offset and y offset
	 radius: radius of the shadow
	 color: color of the shadow

	 */
	function boxShadow(offsetOrDirection, radius, color) {
	  var xOffset, yOffset, strength, direction;
	  if (typeof offsetOrDirection.length == 'undefined') {
	    throw 'Not yet supported';
	  } else if (offsetOrDirection.length == 2) {
	    xOffset = offsetOrDirection[0];
	    yOffset = offsetOrDirection[1];
	    strength = 4;
	    direction = 135; // should be angle (atan) of above numbers
	  } else {
	      throw "boxShadow requires a direction (degree) or [xOffset, yOffset] in px measurements.";
	    }

	  return {
	    '-moz-box-shadow': '' + xOffset + 'px ' + yOffset + 'px ' + radius + 'px ' + color,
	    '-webkit-box-shadow': '' + xOffset + 'px ' + yOffset + 'px ' + radius + 'px ' + color,
	    boxShadow: '' + xOffset + 'px ' + yOffset + 'px ' + radius + 'px ' + color,
	    '-ms-filter': "progid:DXImageTransform.Microsoft.Shadow(Strength=" + strength + ", Direction=" + direction + ", Color='" + color + "')", // IE 8
	    filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=" + strength + ", Direction=" + direction + ", Color='" + color + "')" // IE 5.5 - 7
	  };
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = horizontalCentering;
	// http://stackoverflow.com/questions/148251/css-centering-tricks
	function horizontalCentering(width) {
	  return {
	    width: width,
	    position: 'absolute',
	    left: '50%',
	    marginLeft: -(width / 2)
	  };
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = verticalCentering;
	// http://stackoverflow.com/questions/148251/css-centering-tricks
	function verticalCentering(height) {
	  return {
	    height: height,
	    position: 'absolute',
	    top: '50%',
	    marginTop: -(height / 2)
	  };
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = linearGradient;

	var _browser = __webpack_require__(4);

	var _array = __webpack_require__(1);

	function linearGradient(startingPoint, color1, color2, etc) {
	  var prefix = '',
	      result = '';
	  if ((0, _browser.browserInfo)().webkit) {
	    prefix = '-webkit';
	  } else if ((0, _browser.browserInfo)().mozilla) {
	    prefix = '-moz';
	  }

	  var stops = [];
	  for (var i = 0; i < arguments.length; i++) {
	    var argument = arguments[i];
	    if (typeof argument == 'string') {
	      stops.push(argument);
	    } else if ((0, _array.isArray)(argument)) {
	      for (var j = 0; j < argument.length; j++) {
	        stops.push(argument[j]);
	      }
	    } else {
	      for (var p in arguments[i]) {
	        stops.push(argument[p] + (p != 0 && p != '100' ? ' ' + p + '%' : ''));
	      }
	    }
	  }

	  result = prefix + '-linear-gradient(';
	  for (i = 0; i < stops.length; i++) {
	    if (i !== 0) result += ', ';
	    result += stops[i];
	  }
	  result += ')';
	  return result;
	}

	//    },generateLinearGradient:function() {
	//        var props = c.gradientProps,
	//                g = props.type + "-gradient(",e = "";
	//        $sample = c.sample,
	//                gCount = a.getPaletteLength(),
	//                palette = a.getPalette();
	//        if (props.xStart !== props.xEnd) {
	//            g = g + props.xStart + " "
	//        }
	//        if (props.yStart !== props.yEnd) {
	//            g = g + props.yStart
	//        }
	//        g = g + ", ";
	//        var h = c.getColor;
	//        $.each(palette, function(i, j) {
	//            if (i > 0) {
	//                e = e + " "
	//            }
	//            e = e + h(j) + " " + j.position + "%,"
	//        });
	//        g = g + e;
	//        g = g.substr(0, g.length - 1) + ")";
	//        return g
	//    generateWebkitGradient:function() {
	//        var j = c.gradientProps,l = "-webkit-gradient(" + j.type + "," + c.fetchGradientStart() + "," + c.fetchGradientEnd() + ",",g = "";
	//        var e = a.getPalette(),f = e.length,k,m;
	//        for (var h = 0; h < f; h++) {
	//            m = e[h];
	//            k = (m.position / 100);
	//            g = g + "color-stop(" + k + ", rgb(" + m.rgb.r + "," + m.rgb.g + "," + m.rgb.b + ")),"
	//        }
	//        l = l + g;
	//        l = l.substr(0, l.length - 1) + ");";
	//        return l

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = clearfix;

	var _browser = __webpack_require__(4);

	function clearfix() {
	  var css = {
	    display: 'inline-block',
	    '&:after': {
	      content: ' ',
	      display: 'block',
	      width: 0,
	      height: 0,
	      lineHeight: 0,
	      fontSize: 0,
	      clear: 'both',
	      visibility: 'hidden'
	    }
	  };
	  if ((0, _browser.browserInfo)().msie) {
	    css['zoom'] = '1';
	  }
	  return css;
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = imageReplacement;
	/**
	 Basic Phark image replacement, defined here:
	 http://www.mezzoblue.com/tests/revised-image-replacement/

	 Supports sprites with option image positioning parameters (which default to 0).
	 These values will (generally) be negative.

	 width: width in pixels
	 height: height in pixels
	 img: url for the image, suitable for putting into a url() wrapper

	 */
	function imageReplacement(width, height, img, imgXPosition, imgYPosition) {
	  if (typeof width == 'undefined' || typeof height == 'undefined' || typeof img == 'undefined') {
	    throw "imageReplacement() requires width, height and img";
	  }
	  return {
	    display: 'block',
	    width: width,
	    height: height,
	    backgroundImage: 'url(' + img + ')',
	    backgroundRepeat: 'no-repeat',
	    backgroundPosition: '' + (imgXPosition || 0) + 'px ' + (imgYPosition || 0) + 'px',
	    textIndent: -20000,
	    overflow: 'hidden'
	  };
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Add more valid properties to the list of valid property names.
	 */
	var arrayFlatten = __webpack_require__(1).arrayFlatten

	var propertyNameValidator = {

	  propertyNamesHash: {},

	  addNames: function (propertyNames) {
	    if (!this.propertyNamesHash) {
	      this.propertyNamesHash = {};
	    }
	    for (var a = 0; a < arguments.length; a++) {
	      var names = arrayFlatten([arguments[a]]);
	      for (var i = 0; i < names.length; i++) {
	        var name                     = names[i];
	        this.propertyNamesHash[name] = true;
	      }
	    }
	  },

	  validate: function (name) {
	    return this.propertyNamesHash[name] ? name : null;
	  }
	}


	propertyNameValidator.addNames(['accelerator',
	  'azimuth',
	  'background',
	  'background-attachment',
	  'background-color',
	  'background-image',
	  'background-position',
	  'background-position-x',
	  'background-position-y',
	  'background-repeat',
	  'behavior',
	  'border',
	  'border-bottom',
	  'border-bottom-right-radius',
	  'border-bottom-left-radius',
	  'border-bottom-color',
	  'border-bottom-style',
	  'border-bottom-width',
	  'border-collapse',
	  'border-color',
	  'border-left',
	  'border-left-color',
	  'border-left-style',
	  'border-left-width',
	  'border-radius',
	  'border-right',
	  'border-right-color',
	  'border-right-style',
	  'border-right-width',
	  'border-spacing',
	  'border-style',
	  'border-top',
	  'border-top-color',
	  'border-top-style',
	  'border-top-width',
	  'border-top-left-radius',
	  'border-top-right-radius',
	  'border-width',
	  'box-shadow',
	  'bottom',
	  'caption-side',
	  'clear',
	  'clip',
	  'color',
	  'content',
	  'counter-increment',
	  'counter-reset',
	  'cue',
	  'cue-after',
	  'cue-before',
	  'cursor',
	  'direction',
	  'display',
	  'elevation',
	  'empty-cells',
	  'filter',
	  'float',
	  'font',
	  'font-family',
	  'font-size',
	  'font-size-adjust',
	  'font-stretch',
	  'font-style',
	  'font-variant',
	  'font-weight',
	  'height',
	  'ime-mode',
	  'include-source',
	  'layer-background-color',
	  'layer-background-image',
	  'layout-flow',
	  'layout-grid',
	  'layout-grid-char',
	  'layout-grid-char-spacing',
	  'layout-grid-line',
	  'layout-grid-mode',
	  'layout-grid-type',
	  'letter-spacing',
	  'left',
	  'line-break',
	  'line-height',
	  'list-style',
	  'list-style-image',
	  'list-style-position',
	  'list-style-type',
	  'margin',
	  'margin-bottom',
	  'margin-left',
	  'margin-right',
	  'margin-top',
	  'marker-offset',
	  'marks',
	  'max-height',
	  'max-width',
	  'min-height',
	  'min-width',
	  '-ms-filter',
	  'opacity',
	  'orphans',
	  'outline',
	  'outline-color',
	  'outline-style',
	  'outline-width',
	  'overflow',
	  'overflow-X',
	  'overflow-Y',
	  'padding',
	  'padding-bottom',
	  'padding-left',
	  'padding-right',
	  'padding-top',
	  'page',
	  'page-break-after',
	  'page-break-before',
	  'page-break-inside',
	  'pause',
	  'pause-after',
	  'pause-before',
	  'pitch',
	  'pitch-range',
	  'play-during',
	  'position',
	  'quotes',
	  'richness',
	  'right',
	  'size',
	  'speak',
	  'speak-header',
	  'speak-numeral',
	  'speak-punctuation',
	  'speech-rate',
	  'stress',
	  'scrollbar-arrow-color',
	  'scrollbar-base-color',
	  'scrollbar-dark-shadow-color',
	  'scrollbar-face-color',
	  'scrollbar-highlight-color',
	  'scrollbar-shadow-color',
	  'scrollbar-3d-light-color',
	  'scrollbar-track-color',
	  'table-layout',
	  'text-align',
	  'text-align-last',
	  'text-decoration',
	  'text-indent',
	  'text-justify',
	  'text-offset',
	  'text-overflow',
	  'text-shadow',
	  'text-transform',
	  'text-autospace',
	  'text-kashida-space',
	  'text-underline-position',
	  'top',
	  'unicode-bidi',
	  'vertical-align',
	  'visibility',
	  'voice-family',
	  'volume',
	  'white-space',
	  'widows',
	  'width',
	  'word-break',
	  'word-spacing',
	  'word-wrap',
	  'writing-mode',
	  'z-index',
	  'zoom']);
	propertyNameValidator.addNames([
	  '-moz-binding',
	  '-moz-border-radius',
	  '-moz-border-radius-topleft',
	  '-moz-border-radius-topright',
	  '-moz-border-radius-bottomright',
	  '-moz-border-radius-bottomleft',
	  '-moz-border-top-colors',
	  '-moz-border-right-colors',
	  '-moz-border-bottom-colors',
	  '-moz-border-left-colors',
	  '-moz-box-shadow',
	  '-moz-opacity',
	  '-moz-outline',
	  '-moz-outline-color',
	  '-moz-outline-style',
	  '-moz-outline-width',
	  '-moz-user-focus',
	  '-moz-user-input',
	  '-moz-user-modify',
	  '-moz-user-select'
	]);
	propertyNameValidator.addNames([
	  '-webkit-animation',
	  '-webkit-animation-delay',
	  '-webkit-animation-direction',
	  '-webkit-animation-duration',
	  '-webkit-animation-iteration-count',
	  '-webkit-animation-name',
	  '-webkit-animation-play-state',
	  '-webkit-animation-timing-function',
	  '-webkit-appearance',
	  '-webkit-backface-visibility',
	  '-webkit-background-clip',
	  '-webkit-background-composite',
	  '-webkit-background-origin',
	  '-webkit-background-size',
	  '-webkit-border-bottom-left-radius',
	  '-webkit-border-bottom-right-radius',
	  '-webkit-border-horizontal-spacing',
	  '-webkit-border-image',
	  '-webkit-border-radius',
	  '-webkit-border-top-left-radius',
	  '-webkit-border-top-right-radius',
	  '-webkit-border-vertical-spacing',
	  '-webkit-box-align',
	  '-webkit-box-direction',
	  '-webkit-box-flex',
	  '-webkit-box-flex-group',
	  '-webkit-box-lines',
	  '-webkit-box-ordinal-group',
	  '-webkit-box-orient',
	  '-webkit-box-pack',
	  '-webkit-box-reflect',
	  '-webkit-box-shadow',
	  '-webkit-box-sizing',
	  '-webkit-column-break-after',
	  '-webkit-column-break-before',
	  '-webkit-column-break-inside',
	  '-webkit-column-count',
	  '-webkit-column-gap',
	  '-webkit-column-rule',
	  '-webkit-column-rule-color',
	  '-webkit-column-rule-style',
	  '-webkit-column-rule-width',
	  '-webkit-column-width',
	  '-webkit-columns',
	  '-webkit-dashboard-region',
	  '-webkit-line-break',
	  '-webkit-margin-bottom-collapse',
	  '-webkit-margin-collapse',
	  '-webkit-margin-start',
	  '-webkit-margin-top-collapse',
	  '-webkit-marquee',
	  '-webkit-marquee-direction',
	  '-webkit-marquee-increment',
	  '-webkit-marquee-repetition',
	  '-webkit-marquee-speed',
	  '-webkit-marquee-style',
	  '-webkit-mask',
	  '-webkit-mask-attachment',
	  '-webkit-mask-box-image',
	  '-webkit-mask-clip',
	  '-webkit-mask-composite',
	  '-webkit-mask-image',
	  '-webkit-mask-origin',
	  '-webkit-mask-position',
	  '-webkit-mask-position-x',
	  '-webkit-mask-position-y',
	  '-webkit-mask-repeat',
	  '-webkit-mask-size',
	  '-webkit-nbsp-mode',
	  '-webkit-padding-start',
	  '-webkit-perspective',
	  '-webkit-perspective-origin',
	  '-webkit-rtl-ordering',
	  '-webkit-tap-highlight-color',
	  '-webkit-text-fill-color',
	  '-webkit-text-security',
	  '-webkit-text-size-adjust',
	  '-webkit-text-stroke',
	  '-webkit-text-stroke-color',
	  '-webkit-text-stroke-width',
	  '-webkit-touch-callout',
	  '-webkit-transform',
	  '-webkit-transform-origin',
	  '-webkit-transform-origin-x',
	  '-webkit-transform-origin-y',
	  '-webkit-transform-origin-z',
	  '-webkit-transform-style',
	  '-webkit-transition',
	  '-webkit-transition-delay',
	  '-webkit-transition-duration',
	  '-webkit-transition-property',
	  '-webkit-transition-timing-function',
	  '-webkit-user-drag',
	  '-webkit-user-modify',
	  '-webkit-user-select']);


	module.exports = propertyNameValidator


/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * Rule post-processor to remove "redundant" id selectors. For example,
	 * if the generated selected ends up being '#a #b #c', this post-processor
	 * will reduce it to '#c'. In general this is great, as it makes the rules
	 * more readable on the output side. You are, however, losing the specificity,
	 * creating a cascade you might not expect.
	 *
	 * To wire it in:
	 * Csster.rulesPostProcessors.push(Csster.compressSelectors);
	 */
	var compressSelectors = function(rules) {
	  for (var i = 0; i < rules.length; i++) {
	    while (rules[i].sel.match(/.*#.*#.*/)) {
	      rules[i].sel = rules[i].sel.replace(/^.*#.*#/, '#');
	    }
	  }
	};

	module.exports = {
	  compressSelectors: compressSelectors
	}

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var rulesPostProcessors = [];

	var postProcessRules = function postProcessRules(rules) {
	  for (var i = 0; i < rulesPostProcessors.length; i++) {
	    rulesPostProcessors[i].apply(rules, [rules]);
	  }
	};

	exports.rulesPostProcessors = rulesPostProcessors;
	exports.postProcessRules = postProcessRules;

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var propertyPreprocessors = [];

	var preprocessProperties = function preprocessProperties(properties) {
	  for (var i = 0; i < propertyPreprocessors.length; i++) {
	    propertyPreprocessors[i].apply(properties, [properties]);
	  }
	};

	var pushPropertyPreprocessor = function pushPropertyPreprocessor(pp) {
	  propertyPreprocessors.push(pp);
	};

	exports.preprocessProperties = preprocessProperties;
	exports.pushPropertyPreprocessor = pushPropertyPreprocessor;
	exports.propertyPreprocessors = propertyPreprocessors;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.colorizeString = exports.hslToHexColor = undefined;

	var _array = __webpack_require__(1);

	var HTML4_COLORS = {
	  'black': '#000000',
	  'silver': '#c0c0c0',
	  'gray': '#808080',
	  'white': '#ffffff',
	  'maroon': '#800000',
	  'red': '#ff0000',
	  'purple': '#800080',
	  'fuchsia': '#ff00ff',
	  'green': '#008000',
	  'lime': '#00ff00',
	  'olive': '#808000',
	  'yellow': '#ffff00',
	  'navy': '#000080',
	  'blue': '#0000ff',
	  'teal': '#008080',
	  'aqua': '#00ffff'
	};

	/*
	 Use a singleton cache of all color strings we see.
	 Each key points to a structure, which can have hex, rgb, etc. values in it.
	 */
	var immutableCache = {};

	// returns (or creates) the cached color structure
	var colorCache = function colorCache(c) {
	  if (!immutableCache[c]) immutableCache[c] = {};
	  return immutableCache[c];
	};

	var toHexColor = function toHexColor() {
	  if (this.substr(0, 1) == '#' && this.length == 7) {
	    colorCache(this)['hex'] = '' + this;
	  } else if (this.substr(0, 1) == '#' && this.length == 4) {
	    colorCache(this)['hex'] = '#' + this.substr(1, 1) + this.substr(1, 1) + this.substr(2, 1) + this.substr(2, 1) + this.substr(3, 1) + this.substr(3, 1);
	  } else {
	    colorCache(this)['hex'] = HTML4_COLORS[this];
	  }
	  return colorCache(this)['hex'];
	};

	var toRGB = function toRGB() {
	  var cache = colorCache(this);
	  if (cache.rgb) return cache.rgb;
	  var h = this.toHexColor();
	  cache.rgb = [parseInt(h.substr(1, 2), 16), parseInt(h.substr(3, 2), 16), parseInt(h.substr(5, 2), 16)];
	  return cache.rgb;
	};

	var red = function red() {
	  return this.toRGB()[0];
	};
	var green = function green() {
	  return this.toRGB()[1];
	};
	var blue = function blue() {
	  return this.toRGB()[2];
	};
	var lighten = function lighten(percent) {
	  var hsl = this.toHSL();
	  var newHSL = [hsl[0], hsl[1], Math.min(100, hsl[2] + percent)];
	  return hslToHexColor(newHSL);
	};

	var darken = function darken(percent) {
	  var hsl = this.toHSL();
	  var newHSL = [hsl[0], hsl[1], Math.max(0, hsl[2] - percent)];
	  return hslToHexColor(newHSL);
	};

	/**
	 * Increase or decrease the saturation of a color.
	 * @param percent positive values increase saturation, negative values desaturate.
	 */
	var saturate = function saturate(percent) {
	  var hsl = this.toHSL();
	  var newHSL = [hsl[0], Math.min(100, Math.max(0, hsl[1] + percent)), hsl[2]];
	  return hslToHexColor(newHSL);
	};

	// [0..360, 0..100, 0.100]
	// Ref. http://www.easyrgb.com/index.php?X=MATH&H=18#text18
	var toHSL = function toHSL() {
	  var rgb = this.toRGB();
	  var r = this.red() / 255,
	      g = this.green() / 255,
	      b = this.blue() / 255;
	  var max = Math.max(r, g, b),
	      min = Math.min(r, g, b);
	  var d = max - min; // Delta RGB value
	  var h = undefined,
	      s = undefined,
	      l = (max + min) / 2;

	  if (d == 0) {
	    // gray?, no chroma...
	    h = 0; // HSl results from 0 to 1
	    s = 0;
	  } else {
	    // Chromatic data...
	    s = d / (l < 0.5 ? max + min : 2 - max - min);

	    var del_R = ((max - r) / 6 + d / 2) / d;
	    var del_G = ((max - g) / 6 + d / 2) / d;
	    var del_B = ((max - b) / 6 + d / 2) / d;

	    if (r == max) h = del_B - del_G;else if (g == max) h = 1 / 3 + del_R - del_B;else if (b == max) h = 2 / 3 + del_G - del_R;

	    if (h < 0) h += 1;
	    if (h > 0) h -= 1;
	  }

	  h = Math.round(h * 360);
	  if (h < 0) h += 360;

	  var cache = colorCache(this);
	  cache.hsl = [h, Math.round(s * 100), Math.round(l * 100)];
	  return cache.hsl;
	};

	var hslToHexColor = function hslToHexColor(h, s, l) {
	  if ((0, _array.isArray)(h)) {
	    l = h[2] || 0;
	    s = h[1] || 0;
	    h = h[0] || 0;
	  }
	  //HSL from 0 to 1
	  s = s / 100.0;
	  l = l / 100.0;
	  h = (h + 360) % 360.0 / 360;

	  function hsl2rgb(h, s, l) {
	    // HSL 0 to 1
	    //RGB results from 0 to 255
	    var r = undefined,
	        g = undefined,
	        b = undefined;

	    if (s == 0) {
	      r = l * 255;
	      g = l * 255;
	      b = l * 255;
	    } else {
	      var var_2 = l < 0.5 ? l * (1 + s) : l + s - s * l;
	      var var_1 = 2 * l - var_2;

	      r = 255 * h2rgb(var_1, var_2, h + 1 / 3);
	      g = 255 * h2rgb(var_1, var_2, h);
	      b = 255 * h2rgb(var_1, var_2, h - 1 / 3);
	    }
	    return [r, g, b];
	  }

	  function h2rgb(v1, v2, vH) {
	    if (vH < 0) vH += 1;
	    if (vH > 1) vH -= 1;
	    if (6 * vH < 1) return v1 + (v2 - v1) * 6 * vH;
	    if (2 * vH < 1) return v2;
	    if (3 * vH < 2) return v1 + (v2 - v1) * (2 / 3 - vH) * 6;
	    return v1;
	  }

	  function hex2(n) {
	    var h = Math.round(n).toString(16);
	    if (h.length == 1) h = '0' + h;
	    return h.substr(0, 1) + h.substr(1, 1);
	  }

	  var rgb = hsl2rgb(h, s, l);
	  return "#" + hex2(rgb[0]) + hex2(rgb[1]) + hex2(rgb[2]);
	};

	var colorizeString = function colorizeString() {
	  String.prototype.toHexColor = toHexColor;
	  String.prototype.toRGB = toRGB;
	  String.prototype.red = red;
	  String.prototype.green = green;
	  String.prototype.blue = blue;
	  String.prototype.lighten = lighten;
	  String.prototype.darken = darken;
	  String.prototype.saturate = saturate;
	  String.prototype.toHSL = toHSL;
	};

	exports.hslToHexColor = hslToHexColor;
	exports.colorizeString = colorizeString;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (obj) {

	  // @param cssRule { selector: { prop1: value, prop2: value, subselector: { prop3: value}}
	  var resolveRuleHash = function resolveRuleHash(cssRule) {
	    var result = [];
	    for (var key in cssRule) {
	      result.push((0, _ruleBuilder.ruleBuilder)(key, cssRule[key]));
	    }
	    return result;
	  };

	  var rules = [];
	  (0, _array.arrayEach)((0, _array.arrayFlatten)([obj]), function (r) {
	    rules.push(resolveRuleHash(r));
	  });
	  rules = (0, _array.arrayFlatten)(rules);

	  (0, _rulePostProcessor.postProcessRules)(rules);
	  return rules;
	};

	var _array = __webpack_require__(1);

	var _ruleBuilder = __webpack_require__(20);

	var _rulePostProcessor = __webpack_require__(16);

	;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ruleBuilder = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _propertyPreprocessor = __webpack_require__(17);

	var _propertyNameOf = __webpack_require__(21);

	var trimString = function trimString(s) {
	  return s.replace(/^\s*/, "").replace(/\s*$/, "");
	};

	var ruleBuilder = function ruleBuilder(selector, propertiesAndSubselectors) {

	  selector = trimString(selector);

	  (0, _propertyPreprocessor.preprocessProperties)(propertiesAndSubselectors);

	  // ...all properties that look like properties
	  // Output selector...
	  var props = {};
	  for (var p in propertiesAndSubselectors) {
	    if ((0, _propertyNameOf.propertyNameOf)(p)) {
	      props[p] = propertiesAndSubselectors[p];
	      delete propertiesAndSubselectors[p];
	    }
	  }
	  var rules = [{ sel: selector, props: props }];

	  // ... finally, sub-selectors
	  for (p in propertiesAndSubselectors) {

	    if (typeof propertiesAndSubselectors[p] === 'string' || typeof propertiesAndSubselectors[p] === 'number') {
	      throw "Unknown CSS property \"" + p + "\" (" + _typeof(propertiesAndSubselectors[p]) + "). Rule rejected for selector " + selector;
	    }

	    var subs = p.split(',');
	    for (var s = 0; s < subs.length; s++) {
	      var str = subs[s];
	      var ampRule = str.substr(0, 1) == '&';
	      subs[s] = selector + (ampRule ? str.substr(1) : ' ' + trimString(str));
	    }
	    rules.push(ruleBuilder(subs.join(','), propertiesAndSubselectors[p])); // Recurse
	  }

	  return rules;
	};

	exports.ruleBuilder = ruleBuilder;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.propertyNameOf = undefined;

	var _string = __webpack_require__(3);

	var _property_name_validator = __webpack_require__(14);

	var propertyNameValidator = _interopRequireWildcard(_property_name_validator);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	/*
	 Returns the CSS-correct lowercase property name, if it's recognized
	 as a property. Null otherwise.
	 */
	var propertyNameOf = function propertyNameOf(p) {
	  var name = (0, _string.dasherize)(p);
	  return propertyNameValidator.validate(name);
	};

	exports.propertyNameOf = propertyNameOf;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (rules) {
	  var s = '';
	  for (var i = 0; i < rules.length; i++) {
	    s += rules[i].sel + ' { ';
	    s += formatProperties(rules[i].props);
	    s += '}\r';
	  }
	  return s;
	};

	var _propertyFormatter = __webpack_require__(23);

	// IE doesn't seem to matter:  http://msdn.microsoft.com/en-us/library/ms535871(v=VS.85).aspx


	var formatProperties = function formatProperties(props) {
	  var result = '';
	  for (var p in props) {
	    result += (0, _propertyFormatter.propertyFormatter)(p, props[p]);
	  }
	  return result;
	}; // convert rules to textual string

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.propertyFormatter = undefined;

	var _propertyNameOf = __webpack_require__(21);

	var propertyFormatter = function propertyFormatter(p, value) {
	  p = (0, _propertyNameOf.propertyNameOf)(p);
	  if (value && typeof value == 'number' && p != 'z-index' && p != 'opacity' && p != 'zoom') {
	    value = '' + value + 'px';
	  }
	  return p + ": " + value + ";\r";
	};

	exports.propertyFormatter = propertyFormatter;

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (css) {
	  var e = document.createElement('STYLE');
	  var a = document.createAttribute('type');
	  a.nodeValue = 'text/css';
	  e.setAttributeNode(a);
	  var head = document.getElementsByTagName('HEAD')[0];
	  head.appendChild(e);
	  try {
	    e.appendChild(document.createTextNode(css));
	  } catch (e) {
	    var ss = document.styleSheets[document.styleSheets.length - 1];
	    ss.cssText = '' + ss.cssText + css;
	  }
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (macroPropertyName) {
	  return function (properties) {
	    function extractMacros(p) {
	      var props = {};
	      var a = (0, _array.arrayFlatten)([p]); // support single or multiple sets of properties
	      for (var i = 0; i < a.length; i++) {
	        for (var mp in a[i]) {
	          if (mp == macroPropertyName) {
	            (0, _object.mergeHashInto)(props, extractMacros(a[i][mp]));
	          } else {
	            props[mp] = a[i][mp];
	          }
	        }
	      }
	      return props;
	    }

	    var macros = properties[macroPropertyName];
	    if (macros) {
	      (0, _object.mergeHashInto)(properties, extractMacros(macros));
	      delete properties[macroPropertyName];
	    }
	  };
	};

	var _object = __webpack_require__(2);

	var _array = __webpack_require__(1);

	; /*
	   Returns a function to process macros with the given property key
	   To use:
	  
	   Csster.propertyPreprocessors.push(Csster.macroPreprocessor('macro'));
	  
	   */

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _macro_preprocessor = __webpack_require__(25);

	var _macro_preprocessor2 = _interopRequireDefault(_macro_preprocessor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	Csster.propertyPreprocessors.push((0, _macro_preprocessor2.default)('has'));

/***/ },
/* 27 */
/***/ function(module, exports) {

	if (typeof jQuery != 'undefined') {
	  (function ($) {
	    $.fn.csster = function (rules) {
	      var newRules            = {};
	      newRules[this.selector] = rules;
	      Csster.style(newRules);
	      return this;
	    }
	  })(jQuery);
	}

/***/ }
/******/ ]);