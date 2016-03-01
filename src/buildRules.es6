import { arrayEach, arrayFlatten    } from './utils/array.es6'
import {curry} from './utils/curry.es6'

import {applyPropertiesFilter, flattenObject, dasherizePropertyKeys, rejectUnknownPropertyKeys, compressSelectors } from './cssObject.es6'
import {macroProcessor} from './filters/macroProcessor.es6'

const applyMacros = curry(applyPropertiesFilter)(macroProcessor)

// @param cssRule { selector: { prop1: value, prop2: value, subselector: { prop3: value}}
const objectToRulesArray = function (o) {
  const result = [];
  for (var key in o) {
    result.push({sel: key, props: o[key]});
  }
  return result;
};


const pipeline = []
pipeline.push(applyMacros)
pipeline.push(flattenObject)
pipeline.push(compressSelectors)
pipeline.push(dasherizePropertyKeys)
pipeline.push(rejectUnknownPropertyKeys)
pipeline.push(objectToRulesArray)

const process = function (o) {
  for (let i = 0; i < pipeline.length; i++) {
    o = pipeline[i](o)
  }
  return o
}

export default function (obj) {
  var rules = [];
  arrayEach(arrayFlatten([obj]), function (o) {
    rules.push(process(o));
  });
  return arrayFlatten(rules);
};
