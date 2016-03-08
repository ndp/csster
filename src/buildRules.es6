import { filterValuesRecursively } from './utils/object.es6'
import { arrayEach, arrayFlatten    } from './utils/array.es6'
import { compose } from './utils/fn.es6'

import { flattenObject, compressSelectors } from './cssObject.es6'
import { macroProcessor } from './filters/macroProcessor.es6'

// @param cssRule { selector: { prop1: value, prop2: value, subselector: { prop3: value}}
const objectToRulesArray = function (o) {
  const result = [];
  for (let key in o) {
    result.push({sel: key, props: o[key]});
  }
  return result;
};

import { dasherizeKeys } from './properties.es6'
export const dasherizePropertyKeys = filterValuesRecursively(dasherizeKeys)

import { rejectUnknownPropertyKeys } from './properties.es6'

const log = (x) => {console.log(x); return x}

const process = compose(
    rejectUnknownPropertyKeys,
    dasherizePropertyKeys,
    //compressSelectors,
    flattenObject,
    macroProcessor)

export default function (objOrArray) {
  const a     = arrayFlatten([objOrArray])
  const rules = [];
  arrayEach(a, (o) => rules.push(objectToRulesArray(process(o))));
  return arrayFlatten(rules);
};
