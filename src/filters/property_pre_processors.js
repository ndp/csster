/*
 Returns a function to process macros with the given property key
 To use:

 Csster.propertyPreprocessors.push(Csster.macroPreprocessor('macro'));

 */
var mergeHashInto = require('../utils.js').mergeHashInto
var arrayFlatten = require('../utils.js').arrayFlatten

Csster.macroPreprocessor = function (macroPropertyName) {
  return function (properties) {
    function extractMacros(p) {
      var props = {};
      var a = arrayFlatten([p]); // support single or multiple sets of properties
      for (var i = 0; i < a.length; i++) {
        for (var mp in a[i]) {
          if (mp == macroPropertyName) {
            mergeHashInto(props, extractMacros(a[i][mp]));
          } else {
            props[mp] = a[i][mp];
          }
        }
      }
      return props;
    }

    var macros = properties[macroPropertyName];
    if (macros) {
      mergeHashInto(properties, extractMacros(macros));
      delete properties[macroPropertyName]
    }
  }
};



