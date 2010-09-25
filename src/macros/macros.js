/*
 * Functions that return a set of properties and their values.
 * They can be inserted as style rules using "has" property.
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
            'border-radius': radius,
            '-webkit-border-radius': radius
        }
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


/*
 Cross-browser box shadow code.

 offsetOrDirection: an array holding the x offset and y offset
 radius: radius of the shadow
 color: color of the shadow

 */
function boxShadow(offsetOrDirection, radius, color) {
    var xOffset, yOffset, strength, direction;
    if (typeof offsetOrDirection.length == 'undefined') {
        throw 'Not yet supported'
    } else if (offsetOrDirection.length == 2) {
        xOffset = offsetOrDirection[0];
        yOffset = offsetOrDirection[1];
        strength = 4;
        direction = 135; // should be angle (atan) of above numbers
    } else {
        throw "boxShadow requires a direction (degree) or [xOffset, yOffset] in px measurements."
    }

    return {
        '-moz-box-shadow': '' + xOffset + 'px ' + yOffset + 'px ' + radius + 'px ' + color,
        '-webkit-box-shadow': '' + xOffset + 'px ' + yOffset + 'px ' + radius + 'px ' + color,
        boxShadow: '' + xOffset + 'px ' + yOffset + 'px ' + radius + 'px ' + color,
        '-ms-filter': "progid:DXImageTransform.Microsoft.Shadow(Strength=" + strength + ", Direction=" + direction + ", Color='" + color + "')",// IE 8
        filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=" + strength + ", Direction=" + direction + ", Color='" + color + "')" // IE 5.5 - 7
    };
}

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
    if (typeof width == 'undefined' || typeof height == 'undefined' || typeof img == 'undefined') {
        throw "phark() requires width, height and img";
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


function clearfix() {
    return {
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


//.clearfix {display: inline-block;}  /* for IE/Mac */
//
//<!--[if IE]>
//<style type="text/css">
//  .clearfix {
//    zoom: 1;     /* triggers hasLayout */
//}  /* Only IE can see inside the conditional comment
//and read this CSS rule. Don't ever use a normal HTML
//comment inside the CC or it will close prematurely. */
//</style>
//<![endif]-->
}


// http://stackoverflow.com/questions/148251/css-centering-tricks
function horizontalCentering(width) {
    return {
        width: width,
        position: 'absolute',
        left: '50%',
        marginLeft: -(width / 2)
    }
}

// http://stackoverflow.com/questions/148251/css-centering-tricks
function verticalCentering(height) {
    return {
        height: height,
        position: 'absolute',
        top: '50%',
        marginTop: -(height / 2)
    }
}
