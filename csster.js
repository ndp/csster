function isArray(object) {
    return Object.prototype.toString.call(object) === '[object Array]';
}


Array.prototype.each = function each(iterator) {
    for (var i = 0; i < this.length;) {
        iterator(this[i], i++);
    }
    return this;
};


Array.prototype.inject = function inject(memo, iterator) {
    this.each(function(value, index) {
        memo = iterator(memo, value, index);
    });
    return memo;
}

Array.prototype.flatten = function() {
    return this.inject([], function(array, value) {
        if (isArray(value))
            return array.concat(value.flatten());
        array.push(value);
        return array;
    });
};

String.prototype.toDash = function() {
    return this.replace(/([A-Z])/g, function($1) {
        return "-" + $1.toLowerCase();
    });
};


var Csster = {
    propertyNames: ['accelerator',
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
        'border-width',
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
        'left',
        'letter-spacing',
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
        '-moz-opacity',
        '-moz-outline',
        '-moz-outline-color',
        '-moz-outline-style',
        '-moz-outline-width',
        '-moz-user-focus',
        '-moz-user-input',
        '-moz-user-modify',
        '-moz-user-select',
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
        '-replace',
        'richness',
        'right',
        'ruby-align',
        'ruby-overhang',
        'ruby-position',
        '-set-link-source',
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
        'text-overflow',
        'text-shadow',
        'text-transform',
        'text-autospace',
        'text-kashida-space',
        'text-underline-position',
        'top',
        'unicode-bidi',
        '-use-link-source',
        'vertical-align',
        'visibility',
        'voice-family',
        'volume',
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
        '-webkit-user-select',
        'white-space',
        'widows',
        'width',
        'word-break',
        'word-spacing',
        'word-wrap',
        'writing-mode']
};



Csster.propertyNamesHash = {};

for (var i = 0; i < Csster.propertyNames.length; i++) {
    var name = Csster.propertyNames[i];
    Csster.propertyNamesHash[name] = true;
}


Csster.propertyNameOf = function(p) {
    name = p.toDash();
    return Csster.propertyNamesHash[name] ? name : null;
}

Csster.formatProperty = function(p, value) {
    if (value && typeof value == 'number') value = '' + value + 'px';
    return Csster.propertyNameOf(p) + ": " + value + ";\r";
}


Csster.formatSelectorAndProperties = function(selector, properties) {
    var result = '';

    // Output selector...
    result += selector;
    result += ' {\r';

    // preprocess a macro, if one
    if (properties['macro']) {
        for (var mp in properties['macro']) {
            properties[mp] = properties['macro'][mp];
        }
        delete properties['macro']
    }

    // ...all properties
    for (var p in properties) {
        if (Csster.propertyNameOf(p)) {
            result += Csster.formatProperty(p, properties[p]);
            delete properties[p];
        }
    }
    result += "}\r";

    // now to sub-selectors
    for (p in properties) {
        var subSelector = selector + (p[0] == '&' ? p.substr(1) : ' ' + p);
        result += Csster.formatSelectorAndProperties(subSelector, properties[p])
    }

    return result;
}

Csster.insertStylesheet = function (s) {
    var e = document.createElement('STYLE');
    var a = document.createAttribute('type');
    a.nodeValue = 'text/css';
    e.setAttributeNode(a);
    e.appendChild(document.createTextNode(s));
    var head = document.getElementsByTagName('HEAD')[0];
    head.appendChild(e);
};


/**
 *
 * @param cssRule { selector: { prop1: value, prop2: value, subselector: { prop3: value}}
 * @param parentSelector
 */
function resolveRuleHash(cssRule, parentSelector) {
    var result = '';
    for (var key in cssRule) {
        var selector = parentSelector + key;
        result += Csster.formatSelectorAndProperties(selector, cssRule[key]);
    }
    return result;
}

Csster.formatRules = function(rs) {
    var result = '';
    rs = [rs].flatten();
    rs.each(function(r) {
        result += resolveRuleHash(r, '');
    });
    return result;
};

Csster.style = function(cssRules) {
    var s = Csster.formatRules(cssRules);
    Csster.insertStylesheet(s);
};/*
 * Functions that return a set of properties and their values.
 */

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
    radius = side;
    side = 'all';
  }
  if (side == 'all') {
    return {
        '-moz-border-radius': radius,
        'border-radius': radius
    }
  } else {
    var rules = {};
    if (side == 'tl' ||side == 'top' ||side == 'left') {
      rules['-moz-border-radius-topleft'] = radius;
      rules['border-top-left-radius'] = radius;
    }
    if (side == 'tr' ||side == 'top' ||side == 'right') {
      rules['-moz-border-radius-topright'] = radius;
      rules['border-top-right-radius'] = radius;
    }
    if (side == 'bl' ||side == 'bottom' ||side == 'left') {
      rules['-moz-border-radius-bottomleft'] = radius;
      rules['border-bottom-left-radius'] = radius;
    }
    if (side == 'br' ||side == 'bottom' ||side == 'right') {
      rules['-moz-border-radius-bottomright'] = radius;
      rules['border-bottom-right-radius'] = radius;
    }
    return rules;
  }
}
/*
 Use a singleton cache of all color strings we see.
 Each key points to a structure, which can have hex, rgb, etc. values in it.
 */
var ColorCache = {}; // immutable values-- used for storing values associated with a string

var HTML4_COLORS = {
    'black'  : '#000000',
    'silver' : '#c0c0c0',
    'gray'   : '#808080',
    'white'  : '#ffffff',
    'maroon' : '#800000',
    'red'    : '#ff0000',
    'purple' : '#800080',
    'fuchsia': '#ff00ff',
    'green'  : '#008000',
    'lime'   : '#00ff00',
    'olive'  : '#808000',
    'yellow' : '#ffff00',
    'navy'   : '#000080',
    'blue'   : '#0000ff',
    'teal'   : '#008080',
    'aqua'   : '#00ffff'
};


String.prototype.colorCache = function() {
    if (!ColorCache[this]) ColorCache[this] = {};
    return ColorCache[this];
};
String.prototype.toHexColor = function() {
    if (this[0] == '#' && this.length == 7) {
        this.colorCache()['hex'] = '' + this;
    } else if (this[0] == '#' && this.length == 4) {
        this.colorCache()['hex'] = '#' + this[1] + this[1] + this[2] + this[2] + this[3] + this[3];
    } else {
        this.colorCache()['hex'] = HTML4_COLORS[this];
    }
    return this.colorCache()['hex'];
};

String.prototype.toRGB = function() {
    var cache = this.colorCache();
    if (cache.rgb) return cache.rgb;
    var h = this.toHexColor();
    cache.rgb = [parseInt(h.substr(1, 2), 16),parseInt(h.substr(3, 2), 16),parseInt(h.substr(5, 2), 16)];
    return cache.rgb;
};

String.prototype.red = function() {
    return this.toRGB()[0];
};
String.prototype.green = function() {
    return this.toRGB()[1];
};
String.prototype.blue = function() {
    return this.toRGB()[2];
};
String.prototype.lighten = function(percent) {
    var hsl = this.toHSL();
    var newHSL = [hsl[0],hsl[1],Math.min(100, hsl[2] + percent)];
    return hslToHexColor(newHSL);
};

String.prototype.darken = function(percent) {
    var hsl = this.toHSL();
    var newHSL = [hsl[0],hsl[1],Math.max(0, hsl[2] - percent)];
    return hslToHexColor(newHSL);
};


/**
 * Increase or decrease the saturation of a color.
 * @param percent positive values increase saturation, negative values desaturate.
 */
String.prototype.saturate = function(percent) {
    var hsl = this.toHSL();
    var newHSL = [hsl[0],Math.min(100, Math.max(0, hsl[1] + percent)), hsl[2]];
    return hslToHexColor(newHSL);
};


// [0..360, 0..100, 0.100]
// Ref. http://www.easyrgb.com/index.php?X=MATH&H=18#text18
String.prototype.toHSL = function() {
    var rgb = this.toRGB();
    var r = this.red() / 255,g = this.green() / 255,b = this.blue() / 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var d = max - min; // Delta RGB value
    var h, s, l = (max + min) / 2;


    if (d == 0) { // gray?, no chroma...
        h = 0;                                // HSl results from 0 to 1
        s = 0;
    } else {
        // Chromatic data...
        s = d / ( l < 0.5 ? ( max + min ) : ( 2 - max - min ));

        var del_R = ( ( ( max - r ) / 6 ) + ( d / 2 ) ) / d;
        var del_G = ( ( ( max - g ) / 6 ) + ( d / 2 ) ) / d;
        var del_B = ( ( ( max - b ) / 6 ) + ( d / 2 ) ) / d;

        if (r == max) h = del_B - del_G;
        else if (g == max) h = ( 1 / 3 ) + del_R - del_B;
        else if (b == max) h = ( 2 / 3 ) + del_G - del_R;

        if (h < 0) h += 1;
        if (h > 0) h -= 1;
    }

    h = Math.round(h * 360);
    if (h < 0) h += 360;

    var cache = this.colorCache();
    cache.hsl = [h, Math.round(s * 100), Math.round(l * 100)];
    return cache.hsl;
};


function hslToHexColor(h, s, l) {
    if (isArray(h)) {
        l = h[2] || 0;
        s = h[1] || 0;
        h = h[0] || 0;
    }
    //HSL from 0 to 1
    s = s / 100;
    l = l / 100;
    h = h % 360;

    function hsl2rgb(h, s, l) {
        // HSL 0 to 1
        //RGB results from 0 to 255
        var r,g,b;

        if (s == 0) {
            r = l * 255;
            g = l * 255;
            b = l * 255;
        } else {
            var var_2 = (l < 0.5) ? l * ( 1 + s ) : (( l + s ) - ( s * l ));
            var var_1 = 2 * l - var_2;

            r = 255 * h2rgb(var_1, var_2, h + ( 1 / 3 ));
            g = 255 * h2rgb(var_1, var_2, h);
            b = 255 * h2rgb(var_1, var_2, h - ( 1 / 3 ));
        }
        return [r,g,b];
    }

    function h2rgb(v1, v2, vH) {
        if (vH < 0) vH += 1;
        if (vH > 1) vH -= 1;
        if (( 6 * vH ) < 1) return ( v1 + ( v2 - v1 ) * 6 * vH );
        if (( 2 * vH ) < 1) return ( v2 );
        if (( 3 * vH ) < 2) return ( v1 + ( v2 - v1 ) * ( ( 2 / 3 ) - vH ) * 6 );
        return ( v1 );
    }

    function hex2(n) {
        var h = Math.round(n).toString(16);
        if (h.length == 1) h = '0' + h;
        return h[0] + h[1];
    }

    var rgb = hsl2rgb(h, s, l);
    return "#" + hex2(rgb[0]) + hex2(rgb[1]) + hex2(rgb[2]);
}

