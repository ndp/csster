if (!window.Csster) {
  window.Csster = {}
}

Csster.macros = require('./macros/macros.js')

var arrayEach    = require('./utils.js').arrayEach
var arrayFlatten = require('./utils.js').arrayFlatten
var dasherize    = require('./utils.js').dasherize

Csster.arrayFlatten = arrayFlatten

/**
 * Remove redundant parents from selectors that include more than one ID
 * selector.  eg.  #page #top => "#top"
 */
Csster.propertyPreprocessors = [];
Csster.rulesPostProcessors   = [];


// Lifted from jQuery: http://docs.jquery.com/Utilities/jQuery.browser
Csster.browser = {};
(function () {
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
    Csster.browser[browserMatch.browser] = true;
    Csster.browser.version               = browserMatch.version;
  }
})();


/*
 Returns the CSS-correct lowercase property name, if it's recognized
 as a property. Null otherwise.
 */
Csster.propertyNameOf = function (p) {
  name = dasherize(p);
  return Csster.propertyNameValidator.validate(name)
}

Csster.formatProperty = function (p, value) {
  p = Csster.propertyNameOf(p);
  if (value && typeof value == 'number' &&
      p != 'z-index' && p != 'opacity' && p != 'zoom') {
    value = '' + value + 'px';
  }
  return p + ": " + value + ";\r";
};


Csster.preprocessProperties = function (properties) {
  for (var i = 0; i < Csster.propertyPreprocessors.length; i++) {
    Csster.propertyPreprocessors[i].apply(properties, [properties])
  }
}

var trimString = function (s) {
  return s.replace(/^\s*/, "").replace(/\s*$/, "");
}

Csster.expandAndFlatten = function (selector, properties) {

  //selector = selector.trim();

  Csster.preprocessProperties(properties);

  // ...all properties that look like properties
  // Output selector...
  var props = {};
  for (var p in properties) {
    if (Csster.propertyNameOf(p)) {
      props[p] = properties[p];
      delete properties[p];
    }
  }

  // ... finally, sub-selectors
  var rules = [
    {sel: selector, props: props}
  ];
  for (p in properties) {

    if (typeof properties[p] === 'string' || typeof properties[p] === 'number') {
      throw "Unknown CSS property \"" + p + "\". Rule rejected.";
    }

    var subs = p.split(',');
    for (var s = 0; s < subs.length; s++) {
      var str     = subs[s];
      var ampRule = (str.substr(0, 1) == '&');
      subs[s]     = selector + (ampRule ? str.substr(1) : ' ' + trimString(str));
    }
    rules.push(Csster.expandAndFlatten(subs.join(','), properties[p]));
  }

  return rules;
}

Csster.rulesToCss = function (rules) {
  // IE doesn't seem to matter:  http://msdn.microsoft.com/en-us/library/ms535871(v=VS.85).aspx

  var formatProperties = function (props) {
    var result = '';
    for (var p in props) {
      result += Csster.formatProperty(p, props[p]);
    }
    return result;
  };

  // convert rules to textual string
  var s = '';
  for (var i = 0; i < rules.length; i++) {
    s += rules[i].sel + ' { ';
    s += formatProperties(rules[i].props);
    s += '}\r';
  }
  return s;
}

Csster.insertCss = function (css) {
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

Csster.insertRules = function (rules) {
  var css = Csster.rulesToCss(rules)
  Csster.insertCss(css)
}


Csster.processRules = function (input) {

  // @param cssRule { selector: { prop1: value, prop2: value, subselector: { prop3: value}}
  var resolveRuleHash = function (cssRule) {
    var result = [];
    for (var key in cssRule) {
      result.push(Csster.expandAndFlatten(key, cssRule[key]));
    }
    return result;
  };


  var rules = [];
  arrayEach(arrayFlatten([input]), function (r) {
    rules.push(resolveRuleHash(r));
  });
  rules     = arrayFlatten(rules);

  Csster.postProcessRules(rules);
  return rules;
};

Csster.postProcessRules = function (rules) {
  for (var i = 0; i < Csster.rulesPostProcessors.length; i++) {
    Csster.rulesPostProcessors[i].apply(rules, [rules])
  }
};


Csster.style = function (o) {
  var rules = Csster.processRules(o);
  Csster.insertRules(rules);
};





