import { mergeHashInto, filterObjectsRecursively } from '../utils/object.es6'
import { includes, map, arrayFlatten, isArray } from '../utils/array.es6'

let macroKeys = {
  'has': inLineIt,
  'mixin': inLineIt,
  'mixins': inLineIt
}

export function setMacro(key, fn) {
  macroKeys[key] = fn
}

export function isMacroKey(k) {
  return !!macroKeys[k]
}


// Simplest macro just inlines
function inLineIt(...value) {
  const expanded = {}
  map((val) => {
    if (typeof val == 'function') val = val()
    mergeHashInto(expanded, val);
  }, value)
  return expanded
}

function process(o) {

  if (typeof o !== 'object') return o

  const result = {}
  for (let key in o) {
    const value = o[key];
    if (isMacroKey(key)) {
      const expanded = macroKeys[key].apply(null, isArray(value) ? value : [value] )
      mergeHashInto(result, process(expanded)) // Recurse
    } else {
      result[key] = value
    }
  }
  return result
}

export const macroProcessor = filterObjectsRecursively(process)



