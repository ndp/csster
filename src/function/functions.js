/**
 Functions applied to property values.
 #lighten
 Makes a color lighter.
 #darken
 Makes a color darker.
 #saturate
 Makes a color more saturated.
 #desaturate
 Makes a color less saturated.
 #grayscale
 Converts a color to grayscale.
 #complement
 Returns the complement of a color.


 def grayscale(color)
 desaturate color, Number.new(100)
 end


 def desaturate(color, amount)
 adjust(color, amount, :saturation, 0..100, :-, "%")
 end
 */

function rgbToHsl(r, g, b) {
    r /= 255,g /= 255,b /= 255;
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

    return [Math.floor(h * 360), Math.floor(s * 100), Math.floor(l * 100)];
}


function rgbToHsv(r, g, b) {
    var
            min = Math.min(r, g, b),
            max = Math.max(r, g, b),
            delta = max - min,
            h, s, v = max;

    v = Math.floor(max / 255 * 100);
    if (max != 0)
        s = Math.floor(delta / max * 100);
    else {
        // black
        return [0, 0, 0];
    }

    if (r == max)
        h = ( g - b ) / delta;         // between yellow & magenta
    else if (g == max)
        h = 2 + ( b - r ) / delta;     // between cyan & yellow
    else
        h = 4 + ( r - g ) / delta;     // between magenta & cyan

    h = Math.floor(h * 60);            // degrees
    if (h < 0) h += 360;

    return [h, s, v];
}


/*

 *
 */


function hsl2rgb(h, s, l) {
    var m1, m2, hue;
    var r, g, b
    s /= 100;
    l /= 100;
    if (s == 0)
        r = g = b = (l * 255);
    else {
        if (l <= 0.5)
            m2 = l * (s + 1);
        else
            m2 = l + s - l * s;
        m1 = l * 2 - m2;
        hue = h / 360;
        r = HueToRgb(m1, m2, hue + 1 / 3);
        g = HueToRgb(m1, m2, hue);
        b = HueToRgb(m1, m2, hue - 1 / 3);
    }
    return {r: r, g: g, b: b};
}

function HueToRgb(m1, m2, hue) {
    var v;
    if (hue < 0)
        hue += 1;
    else if (hue > 1)
        hue -= 1;

    if (6 * hue < 1)
        v = m1 + (m2 - m1) * hue * 6;
    else if (2 * hue < 1)
        v = m2;
    else if (3 * hue < 2)
        v = m1 + (m2 - m1) * (2 / 3 - hue) * 6;
    else
        v = m1;

    return 255 * v;
}


//calculate rgb component
function hToC(x, y, h) {
    var c;
    if (h < 0) {
        h += 1;
    }
    if (h > 1) {
        h -= 1;
    }
    if (h < 1 / 6) {
        c = x + (y - x) * h * 6;
    } else {
        if (h < 1 / 2) {
            c = y;
        } else {
            if (h < 2 / 3) {
                c = x + (y - x) * (2 / 3 - h) * 6;
            } else {
                c = x;
            }
        }
    }
    return c;
}

//convert hsl to rgb (all values 0..1)
function hslToRgb(h, s, l) {
    var
            y = (l > .5) ?
                    l + s - l * s :
                    l * (s + 1),
            x = l * 2 - y,
            r = hToC(x, y, h + 1 / 3),
            g = hToC(x, y, h),
            b = hToC(x, y, h - 1 / 3);
    return [r, g, b];
}

//convert hsl to an html color string
function hslToHtmlColor(h, s, l) {
    var rgb = hslToRgb(h, s, l);
    return "#" + toHex(rgb[0] * 255) + toHex(rgb[1] * 255) + toHex(rgb[2] * 255);
}

//convert decimal to hex
function toHex(decimal, places) {
    if (places == undefined || isNaN(places))  places = 2;
    var hex = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F");
    var next = 0;
    var hexidecimal = "";
    decimal = Math.floor(decimal);
    while (decimal > 0) {
        next = decimal % 16;
        decimal = Math.floor((decimal - next) / 16);
        hexidecimal = hex[next] + hexidecimal;
    }
    while (hexidecimal.length < places) {
        hexidecimal = "0" + hexidecimal;
    }
    return hexidecimal;
}





































//  Makes a color lighter.
//  Takes a color and an amount between 0% and 100%,
//  and returns a color with the lightness increased by that value.
// 
//  For example:
// 
//      lighten(hsl(0, 0%, 0%), 30%) => hsl(0, 0, 30)
//      lighten(#800, 20%) => #e00
// 
//  @param color [Color]
//  @param amount [Number]
//  @return [Color]
//  @see #darken
//  @raise [ArgumentError] If `color` isn't a color,
//    or `number` isn't a number between 0% and 100%
    function lighten(color, amount)  {
      adjust(color, amount, :lightness, 0..100, :+, "%")
    }
//  Makes a color darker.
//  Takes a color and an amount between 0% and 100%,
//  and returns a color with the lightness decreased by that value.
// 
//  For example:
// 
//      darken(hsl(25, 100%, 80%), 30%) => hsl(25, 100%, 50%)
//      darken(#800, 20%) => #200
// 
//  @param color [Color]
//  @param amount [Number]
//  @return [Color]
//  @see #lighten
//  @raise [ArgumentError] If `color` isn't a color,
//    or `number` isn't a number between 0% and 100%
    function darken(color, amount)  {
      adjust(color, amount, :lightness, 0..100, :-, "%")
    }
//  Makes a color more saturated.
//  Takes a color and an amount between 0% and 100%,
//  and returns a color with the saturation increased by that value.
// 
//  For example:
// 
//      saturate(hsl(120, 30%, 90%), 20%) => hsl(120, 50%, 90%)
//      saturate(#855, 20%) => #9e3f3f
// 
//  @param color [Color]
//  @param amount [Number]
//  @return [Color]
//  @see #desaturate
//  @raise [ArgumentError] If `color` isn't a color,
//    or `number` isn't a number between 0% and 100%
    function saturate(color, amount)  {
      adjust(color, amount, :saturation, 0..100, :+, "%")
    }
//  Makes a color less saturated.
//  Takes a color and an amount between 0% and 100%,
//  and returns a color with the saturation decreased by that value.
// 
//  For example:
// 
//      desaturate(hsl(120, 30%, 90%), 20%) => hsl(120, 10%, 90%)
//      desaturate(#855, 20%) => #726b6b
// 
//  @param color [Color]
//  @param amount [Number]
//  @return [Color]
//  @see #saturate
//  @raise [ArgumentError] If `color` isn't a color,
//    or `number` isn't a number between 0% and 100%
    function desaturate(color, amount)  {
      adjust(color, amount, :saturation, 0..100, :-, "%")
    }
//  Changes the hue of a color while retaining the lightness and saturation.
//  Takes a color and a number of degrees (usually between -360deg and 360deg),
//  and returns a color with the hue rotated by that value.
// 
//  For example:
// 
//      adjust-hue(hsl(120, 30%, 90%), 60deg) => hsl(180, 30%, 90%)
//      adjust-hue(hsl(120, 30%, 90%), 060deg) => hsl(60, 30%, 90%)
//      adjust-hue(#811, 45deg) => #886a11
// 
//  @param color [Color]
//  @param amount [Number]
//  @return [Color]
//  @raise [ArgumentError] If `color` isn't a color, or `number` isn't a number
    function adjust_hue(color, degrees)  {
      color.with(:hue => color.hue + degrees.value)
    }

//  Converts a color to grayscale.
//  This is identical to `desaturate(color, 100%)`.
// 
//  @param color [Color]
//  @return [Color]
//  @raise [ArgumentError] if `color` isn't a color
//  @see #desaturate
    function grayscale(color)  {
      desaturate color, Number.new(100)
    }
//  Returns the complement of a color.
//  This is identical to `adjust-hue(color, 180deg)`.
// 
//  @param color [Color]
//  @return [Color]
//  @raise [ArgumentError] if `color` isn't a color
//  @see #adjust_hue #adjust-hue
    function complement(color)  {
      adjust_hue color, Number.new(180)
    }

