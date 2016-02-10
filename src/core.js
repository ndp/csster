if (!window.Csster) {
  window.Csster = {}
}

Csster.macros = require('./macros/macros.js')

var arrayEach    = require('./utils/array.es6').arrayEach
var arrayFlatten = require('./utils/array.es6').arrayFlatten
var dasherize    = require('./utils/string.es6').dasherize

Csster.arrayFlatten          = arrayFlatten
Csster.propertyNameValidator = require('./filters/property_name_validator.js')


/**
 * Remove redundant parents from selectors that include more than one ID
 * selector.  eg.  #page #top => "#top"
 */
Csster.compressSelectors = require('./filters/rule_post_processors.js').compressSelectors

Csster.browser     = require('./utils/browser.es6').browser
Csster.browserInfo = require('./utils/browser.es6').browserInfo

Csster.rulesPostProcessors = require('./rulePostProcessor.es6').rulesPostProcessors;
var postProcessRules           = require('./rulePostProcessor.es6').postProcessRules;

Csster.propertyPreprocessors = require('./propertyPreprocessor.es6').propertyPreprocessors

Csster.hslToHexColor = require('./functions/color.es6').hslToHexColor

require('./functions/color.es6').colorizeString()


Csster.propertyNameOf = require('./propertyNameOf.es6').propertyNameOf
var formatProperty    = require('./propertyFormatter.es6').propertyFormatter

Csster.rulesToCss = function (rules) {
  // IE doesn't seem to matter:  http://msdn.microsoft.com/en-us/library/ms535871(v=VS.85).aspx

  var formatProperties = function (props) {
    var result = '';
    for (var p in props) {
      result += formatProperty(p, props[p]);
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

var ruleBuilder = require('./ruleBuilder.es6').ruleBuilder

Csster.processRules = function (input) {

  // @param cssRule { selector: { prop1: value, prop2: value, subselector: { prop3: value}}
  var resolveRuleHash = function (cssRule) {
    var result = [];
    for (var key in cssRule) {
      result.push(ruleBuilder(key, cssRule[key]));
    }
    return result;
  };


  var rules = [];
  arrayEach(arrayFlatten([input]), function (r) {
    rules.push(resolveRuleHash(r));
  });
  rules     = arrayFlatten(rules);

  postProcessRules(rules);
  return rules;
};


Csster.style = function (o) {
  var rules = Csster.processRules(o);
  Csster.insertRules(rules);
};





