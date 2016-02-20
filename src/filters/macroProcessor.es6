/*
 Returns a function to process macros with the given property key
 To use:

 Csster.propertyPreprocessors.push(Csster.macroPreprocessor('macro'));

 */
import {mergeHashInto} from '../utils/object.es6'
import {arrayFlatten} from '../utils/array.es6'

let macroKeys = ['has']
export function setMacroKeys(keys) {
  macroKeys = keys
}


export function macroProcessor(properties) {

  function extractMacros(p) {
    const props = {};
    const a     = arrayFlatten([p]); // support single or multiple sets of properties
    for (let i = 0; i < a.length; i++) {
      for (let mp in a[i]) {
        if (isMacroKey(mp)) {
          mergeHashInto(props, extractMacros(a[i][mp]));
        } else {
          props[mp] = a[i][mp];
        }
      }
    }
    return props;
  }

  for (let k in properties) {
    if (isMacroKey(k)) {
      const macros = properties[k];
      if (macros) {
        mergeHashInto(properties, extractMacros(macros));
        delete properties[k]
      }
    }
  }
  return properties
}


import { includes } from '../utils/array.es6'

export function isMacroKey(k) {
  return includes(macroKeys, k)
}

