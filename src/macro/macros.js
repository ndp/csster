/*
 * Functions that return a set of properties and their values.
 */

/**
 * CSS3 rounded corners
 * @param radius
 */
function roundedCorners(radius) {
    return {
        '-webkit-border-radius': radius,
        '-moz-border-radius': radius,
        'border-radius': radius
    }
}
