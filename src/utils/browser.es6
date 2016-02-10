// Lifted from jQuery: http://docs.jquery.com/Utilities/jQuery.browser
const browser = {};


function uaMatch(ua) {
  ua = ua.toLowerCase();

  const match = /(webkit)[ \/]([\w.]+)/.exec(ua) ||
      /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua) ||
      /(msie) ([\w.]+)/.exec(ua) ||
      !/compatible/.test(ua) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(ua) ||
      [];

  return {browser: match[1] || "", version: match[2] || "0"};
}

if (typeof(navigator) !== 'undefined') {
  const browserMatch = uaMatch(navigator.userAgent);
  if (browserMatch.browser) {
    browser[browserMatch.browser] = true;
    browser.version               = browserMatch.version;
  }
}

const browserInfo = () => {
  if (typeof(global) !== 'undefined' && global.browserOverride) {
    return global.browserOverride
  } else {
    return browser
  }
}

export {
    browser, // legacy static structure
    browserInfo // fn that can be overridden for tests
}