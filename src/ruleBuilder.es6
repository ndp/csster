var trimString = function (s) {
  return s.replace(/^\s*/, "").replace(/\s*$/, "");
}

import {preprocessProperties} from './propertyPreprocessor.es6'
import * as propertyName from './propertyName.es6'


var ruleBuilder = (selector, propertiesAndSubselectors) => {

  selector = trimString(selector);

  preprocessProperties(propertiesAndSubselectors);

  // ...all properties that look like properties
  // Output selector...
  var props = {};
  for (var p in propertiesAndSubselectors) {
    if (propertyName.valid(p)) {
      props[p] = propertiesAndSubselectors[p];
      delete propertiesAndSubselectors[p];
    }
  }
  var rules = [
    {sel: selector, props: props}
  ];

  // ... finally, sub-selectors
  for (p in propertiesAndSubselectors) {

    if (typeof propertiesAndSubselectors[p] === 'string' || typeof propertiesAndSubselectors[p] === 'number') {
      throw "Unknown CSS property \"" + p + "\" (" + typeof propertiesAndSubselectors[p] + "). Rule rejected for selector " + selector;
    }

    var subs = p.split(',');
    for (var s = 0; s < subs.length; s++) {
      var str     = subs[s];
      var ampRule = (str.substr(0, 1) == '&');
      subs[s]     = selector + (ampRule ? str.substr(1) : ' ' + trimString(str));
    }
    rules.push(ruleBuilder(subs.join(','), propertiesAndSubselectors[p]));  // Recurse
  }

  return rules;
}

export { ruleBuilder }