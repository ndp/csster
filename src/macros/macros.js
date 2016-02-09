/*
 * Functions that return a set of properties and their values.
 * They can be inserted as style rules using "has" property.
 */
var browser = require('../browser.js')

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


function clearfix() {
  css = {
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
  if (browser.msie) {
    css['zoom'] = '1'
  }
  return css;
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

function linearGradient(startingPoint, color1, color2, etc) {
  var prefix = '',
      result = '';
  if (browser.webkit) {
    prefix = '-webkit';
  } else if (browser.mozilla) {
    prefix = '-moz';
  }


  var stops = [];
  for (var i = 0; i < arguments.length; i++) {
    var argument = arguments[i];
    if (typeof argument == 'string') {
      stops.push(argument);
    } else if ($.isArray(argument)) {
      for (var j = 0; j < argument.length; j++) {
        stops.push(argument[j]);
      }
    } else {
      for (p in arguments[i]) {
        stops.push(argument[p] + (p != 0 && p != '100' ? (' ' + p + '%') : ''));
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


module.exports = {
  roundedCorners: roundedCorners,
  boxShadow: boxShadow,
  horizontalCentering: horizontalCentering,
  verticalCentering: verticalCentering,
  linearGradient: linearGradient,
  clearfix: clearfix,
}