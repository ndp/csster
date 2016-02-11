import { arrayEach    } from './utils/array.es6'
import { arrayFlatten } from './utils/array.es6'
import { ruleBuilder } from './ruleBuilder.es6'
import { postProcessRules } from './rulePostProcessor.es6'

export default function (obj) {

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
