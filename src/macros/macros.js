/*
 * Functions that return a set of properties and their values.
 * They can be inserted as style rules using "macro" property.
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
        radius = side || 10;
        side = 'all';
    }
    if (side == 'all') {
        return {
            '-moz-border-radius': radius,
            'border-radius': radius
        }
    } else {
        var rules = {};
        if (side == 'tl' || side == 'top' || side == 'left') {
            rules['-moz-border-radius-topleft'] = radius;
            rules['border-top-left-radius'] = radius;
        }
        if (side == 'tr' || side == 'top' || side == 'right') {
            rules['-moz-border-radius-topright'] = radius;
            rules['border-top-right-radius'] = radius;
        }
        if (side == 'bl' || side == 'bottom' || side == 'left') {
            rules['-moz-border-radius-bottomleft'] = radius;
            rules['border-bottom-left-radius'] = radius;
        }
        if (side == 'br' || side == 'bottom' || side == 'right') {
            rules['-moz-border-radius-bottomright'] = radius;
            rules['border-bottom-right-radius'] = radius;
        }
        return rules;
    }
}


/*

  function dropShadowAndRoundedCorners() {
    return $.extend({}, {
      '-moz-box-shadow': '5px 5px 5px #666',
      '-webkit-box-shadow': '5px 5px 5px #666',
      boxShadow: '5px 5px 5px #666'}, roundedCorners(10));
  }

 */


/**
 Basic Phark image replacement, found here:
 http://www.mezzoblue.com/tests/revised-image-replacement/

 Supports sprites with option image positioning parameters (which default to 0).
 These will generally be negative.

 width: width in pixels
 height: height in pixels
 img: url for the image, suitable for putting into a url() wrapper

 */
function phark(width, height, img, imgXPosition, imgYPosition) {
    if (typeof width=='undefined' || typeof height=='undefined' || typeof img =='undefined') throw "phark() requires width, height and img";
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
