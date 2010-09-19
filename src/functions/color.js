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
    s = s / 100.0;
    l = l / 100.0;
    h = ((h+360) % 360.0) / 360;

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

