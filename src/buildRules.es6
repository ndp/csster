import { filterValuesRecursively } from './utils/object.es6'
import { arrayEach, arrayFlatten    } from './utils/array.es6'
import {curry} from './utils/fn.es6'

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


import {compose} from './utils/fn.es6'

const process = compose(rejectUnknownPropertyKeys, dasherizePropertyKeys, compressSelectors, flattenObject, applyMacros)

export default function (obj) {
  const rules = [];
  arrayEach(arrayFlatten([obj]), function (o) {
    rules.push(objectToRulesArray(process(o)));
  });
  return arrayFlatten(rules);
};
