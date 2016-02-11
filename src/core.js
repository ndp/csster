if (!window.Csster) {
  window.Csster = {}
}

Csster.macros = require('./macros/macros.es6')

var arrayEach    = require('./utils/array.es6').arrayEach
var arrayFlatten = require('./utils/array.es6').arrayFlatten

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

var stringifyRules = require('./stringifyRules.es6').default
var insertCss = require('./insertCss.es6').default
Csster.insertCss = insertCss

var ruleBuilder = require('./ruleBuilder.es6').ruleBuilder

Csster.processRules = function (obj) {

  // @param cssRule { selector: { prop1: value, prop2: value, subselector: { prop3: value}}
  var resolveRuleHash = function (cssRule) {
    var result = [];
    for (var key in cssRule) {
      result.push(ruleBuilder(key, cssRule[key]));
    }
    return result;
  };


  var rules = [];
  arrayEach(arrayFlatten([obj]), function (r) {
    rules.push(resolveRuleHash(r));
  });
  rules     = arrayFlatten(rules);

  postProcessRules(rules);
  return rules;
};


Csster.style = function (o) {
  var rules = Csster.processRules(o)
  var css = stringifyRules(rules)
  Csster.insertCss(css)
};





