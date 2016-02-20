import { arrayEach, arrayFlatten    } from './utils/array.es6'
import {curry} from './utils/curry.es6'

import {applyPropertiesFilter, flattenObject, dasherizePropertyKeys, rejectUnknownPropertyKeys, compressSelectors } from './cssObject.es6'
import {macroProcessor} from './filters/macroProcessor.es6'

const applyMacros = curry(applyPropertiesFilter)(macroProcessor)

const process = function (o) {
  o = applyMacros(o)
  o = flattenObject(o)
  o = compressSelectors(o)
  o = dasherizePropertyKeys(o)
  o = rejectUnknownPropertyKeys(o)
  return o
}
// @param cssRule { selector: { prop1: value, prop2: value, subselector: { prop3: value}}
const objectToRulesArray = function (o) {
  const result = [];
  for (var key in o) {
    result.push({sel: key, props: o[key]});
  }
  return result;
};

export default function (obj) {
  var rules = [];
  arrayEach(arrayFlatten([obj]), function (o) {
    rules.push(objectToRulesArray(process(o)));
  });
  return arrayFlatten(rules);
};
