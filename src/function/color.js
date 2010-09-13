/*
 Use a singleton cache of all color strings we see.
 Each key points to a structure, which can have hex, rgb, etc. values in it.
 */
var ColorCache = {}; // used for storing values associated with a string

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
    return hslToHtmlColor(newHSL);
};


// [0..360, 0..100, 0.100]
String.prototype.toHSL = function() {
    var rgb = this.toRGB();
    var r = this.red() / 255,g = this.green() / 255,b = this.blue() / 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    var cache = this.colorCache();
    cache.hsl = [Math.floor(h * 360), Math.floor(s * 100), Math.floor(l * 100)];
    return cache.hsl;
};


function hslToHtmlColor(h, s, l) {

    var hsl2rgb = function(h, s, l) {
        if (isArray(h)) {
            l = h[2] || 0;
            s = h[1] || 0;
            h = h[0] || 0;
        }
        s = s / 100;
        l = l / 100;
        h = h % 360;

        var r,g,b;
        if (h < 120) {
            r = (120 - h) / 60;
            g = h / 60;
            b = 0;
        } else {
            if (h < 240) {
                r = 0;
                g = (240 - h) / 60;
                b = (h - 120) / 60;
            } else {
                r = (h - 240) / 60;
                g = 0;
                b = (360 - h) / 60;
            }
        }
        r = Math.min(r, 1);
        g = Math.min(g, 1);
        b = Math.min(b, 1);
        r = 2 * s * r + (1 - s);
        g = 2 * s * g + (1 - s);
        b = 2 * s * b + (1 - s);
        if (l < 0.5) {
            r = l * r;
            g = l * g;
            b = l * b;
        } else {
            r = (1 - l) * r + 2 * l - 1;
            g = (1 - l) * g + 2 * l - 1;
            b = (1 - l) * b + 2 * l - 1;
        }
        r = Math.ceil(r * 255);
        g = Math.ceil(g * 255);
        b = Math.ceil(b * 255);
        return [r,g,b];
    };


    var rgb = hsl2rgb(h, s, l);

    function hex2(n) {
        var h = n.toString(16);
        if (h.length == 1) h = '0' + h;
        return h;
    }

    return "#" + hex2(rgb[0]) + hex2(rgb[1]) + hex2(rgb[2]);
}

