import {browserInfo} from '../utils/browser.es6'

export default function clearfix() {
  var css = {
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
  if (browserInfo().msie) {
    css['zoom'] = '1'
  }
  return css;
}

