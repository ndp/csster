/*
 Returns a function to process macros with the given property key
 To use:

 Csster.propertyPreprocessors.push(Csster.macroPreprocessor('macro'));

 */
import {mergeHashInto} from '../utils/object.es6'
import {arrayFlatten} from '../utils/array.es6'

export default function (macroPropertyName) {
  return function (properties) {
    function extractMacros(p) {
      const props = {};
      const a     = arrayFlatten([p]); // support single or multiple sets of properties
      for (let i = 0; i < a.length; i++) {
        for (let mp in a[i]) {
          if (mp == macroPropertyName) {
            mergeHashInto(props, extractMacros(a[i][mp]));
          } else {
            props[mp] = a[i][mp];
          }
        }
      }
      return props;
    }

    const macros = properties[macroPropertyName];
    if (macros) {
      mergeHashInto(properties, extractMacros(macros));
      delete properties[macroPropertyName]
    }
  }
};



