import {mergeHashInto} from '../utils/object.es6'
import {arrayFlatten} from '../utils/array.es6'

let macroKeys = ['has', 'mixin', 'mixins']
export function setMacroKeys(keys) {
  macroKeys = keys
}


export function macroProcessor(properties) {

  function applyMacros(macroList) {

    const props  = {};

    const macros = arrayFlatten([macroList]); // support single or multiple sets of properties
    for (let i = 0; i < macros.length; i++) {
      let macro = macros[i]
      if (typeof macro == 'function') macro = macro()
      for (let mp in macro) {
        if (isMacroKey(mp)) {
          mergeHashInto(props, applyMacros(macro[mp]));
        } else {
          props[mp] = macro[mp];
        }
      }
    }
    return props;
  }

  for (let k in properties) {
    if (isMacroKey(k)) {
      const macros = properties[k];
      delete properties[k]
      if (macros) {
        mergeHashInto(properties, applyMacros(macros));
      }
    }
  }
  return properties
}


import { includes } from '../utils/array.es6'

export function isMacroKey(k) {
  return includes(macroKeys, k)
}

