export default function (css) {
  const e     = document.createElement('STYLE');
  const a     = document.createAttribute('type');
  a.nodeValue = 'text/css';
  e.setAttributeNode(a);
  const head  = document.getElementsByTagName('HEAD')[0];
  head.appendChild(e);
  try {
    e.appendChild(document.createTextNode(css));
  } catch (e) {
    const ss   = document.styleSheets[document.styleSheets.length - 1];
    ss.cssText = '' + ss.cssText + css;
  }
}