//  mergeHashInto(hashA, hashB, hashC...)
// merge all properties from B, C into hash A.
export const mergeHashInto = (dest, ...hashes) => {
  for (let i = 0; i < hashes.length; i++) {
    for (let k in hashes[i]) {
      dest[k] = hashes[i][k];
    }
  }
  return dest;
}


import {curry} from './fn.es6'

// Apply filter to keys of an object
// fn:  (key) => new key
// o:   object to filter
export const applyToKeys = curry(function (fn, o) {
  let out = {}
  for (let k in o) {
    out[fn(k)] = o[k]
  }
  return out
})

// Filter values of an object, recursively
// fn: fn(value, key) => new value
// o:  object to process
export const filterValuesRecursively = curry(function (fn, o) {
  let out = {}
  for (let k in o) {
    let v        = o[k]
    let newValue = fn(v, k)

    if (typeof newV === 'object') {
      out[k] = filterValuesRecursively(fn, newValue)
    } else {
      out[k] = newValue
    }
  }
  return out
})

