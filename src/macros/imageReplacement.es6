/**
 Basic Phark image replacement, defined here:
 http://www.mezzoblue.com/tests/revised-image-replacement/

 Supports sprites with option image positioning parameters (which default to 0).
 These values will (generally) be negative.

 width: width in pixels
 height: height in pixels
 img: url for the image, suitable for putting into a url() wrapper

 */
export default function imageReplacement(width, height, img, imgXPosition, imgYPosition) {
  if (typeof width == 'undefined' || typeof height == 'undefined' || typeof img == 'undefined') {
    throw "imageReplacement() requires width, height and img";
  }
  return {
    display:            'block',
    width:              width,
    height:             height,
    backgroundImage:    'url(' + img + ')',
    backgroundRepeat:   'no-repeat',
    backgroundPosition: '' + (imgXPosition || 0) + 'px ' + (imgYPosition || 0) + 'px',
    textIndent:         -20000,
    overflow:           'hidden'
  };
}
