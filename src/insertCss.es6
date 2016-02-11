export default function (css) {
  var e       = document.createElement('STYLE');
  var a       = document.createAttribute('type');
  a.nodeValue = 'text/css';
  e.setAttributeNode(a);
  var head    = document.getElementsByTagName('HEAD')[0];
  head.appendChild(e);
  try {
    e.appendChild(document.createTextNode(css));
  } catch (e) {
    var ss     = document.styleSheets[document.styleSheets.length - 1];
    ss.cssText = '' + ss.cssText + css;
  }
}