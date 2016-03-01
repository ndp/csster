import { filterValuesRecursively } from './utils/object.es6'
import { arrayEach, arrayFlatten    } from './utils/array.es6'
import {curry} from './utils/curry.es6'

import {flattenObject, compressSelectors } from './cssObject.es6'
import {macroProcessor} from './filters/macroProcessor.es6'

const applyMacros = filterValuesRecursively(macroProcessor)

// @param cssRule { selector: { prop1: value, prop2: value, subselector: { prop3: value}}
const objectToRulesArray = function (o) {
  const result = [];
  for (var key in o) {
    result.push({sel: key, props: o[key]});
  }
  return result;
};


import { dasherizeKeys } from './properties.es6'
export const dasherizePropertyKeys = filterValuesRecursively(dasherizeKeys)

import { rejectUnknownKeys } from './properties.es6'
export const rejectUnknownPropertyKeys = filterValuesRecursively(rejectUnknownKeys)


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
