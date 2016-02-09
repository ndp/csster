// Lifted from jQuery: http://docs.jquery.com/Utilities/jQuery.browser
var browser = {};


function uaMatch(ua) {
  ua = ua.toLowerCase();

  var match = /(webkit)[ \/]([\w.]+)/.exec(ua) ||
      /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua) ||
      /(msie) ([\w.]+)/.exec(ua) ||
      !/compatible/.test(ua) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(ua) ||
      [];

  return {browser: match[1] || "", version: match[2] || "0"};
}

var browserMatch = uaMatch(navigator.userAgent);
if (browserMatch.browser) {
  browser[browserMatch.browser] = true;
  browser.version               = browserMatch.version;
}

module.exports = browser