/*
 Cross-browser box shadow code.

 offsetOrDirection: an array holding the x offset and y offset
 radius: radius of the shadow
 color: color of the shadow

 */
export default function boxShadow(offsetOrDirection, radius, color) {
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

