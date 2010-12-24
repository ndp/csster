/**
 * Override of Csster's built-in method to support rounded corners on IE.
 * See docs there for description.
 */
function roundedCorners(side, radius) {
  if (!radius) {
    radius = side || 10;
    side = 'all';
  }
  if (side == 'all') {
    if (Csster.browser.msie) {
      return {
        'border-radius': radius,
        behavior: 'url(border-radius-ie.htc)',
        visibility: 'hidden'
      }
    } else if (Csster.browser.mozilla) {
      return {
        '-moz-border-radius': radius
      }

    } else {
      return {
        'border-radius': radius,
        '-webkit-border-radius': radius
      }
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
