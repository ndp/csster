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
export const applyToKeys = curry((fn, o) => {
  if (typeof o !== 'object') return o
  let out = {}
  for (let k in o) {
    out[fn(k)] = o[k]
  }
  return out
})

export const visitChildren = curry(function (fn, o) {
  if (typeof(o) == 'object') {
    for (let key1 in o) {
      if (typeof(o[key1]) == 'object') {
        fn(o[key1], key1)
      }
    }
  }
  return o
})


// Filter values of an object, recursively
// fn: fn(value, key) => new value
// o:  object to process
export const filterValuesRecursively = curry(function (fn, o) {
  if (typeof o !== 'object') return o

  let out = {}
  for (let key in o) {
    let newValue = fn(o[key], key)
    if (typeof(newValue) == 'object') {
      newValue = filterValuesRecursively(fn, newValue)
    }
    out[key] = newValue
  }
  return out
})

// Filter values of an object, recursively
// fn: fn(value, key) => new value
// o:  object to process
export const filterObjectsRecursively = curry(function (fn, o) {
  let out = fn(o)
  for (let key in out) {
    if (typeof(out[key]) == 'object') {
      out[key] = filterObjectsRecursively(fn, out[key])
    }
  }
  return out
})

