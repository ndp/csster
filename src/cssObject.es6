/*
 A Javascript object tha represents "CSS" rules. It:
 * can be deeply nested, implying subselections
 * keys can be CSS properties and values CSS property values
 */

import {trim} from '../src/utils/string.es6'


// Calculate "subselector", taking into account & rules and complex
// (comma separated) selectors.
function buildSubcontext(context, key) {
  const keys = key.split(',');
  for (let k = 0; k < keys.length; k++) {
    var str     = trim(keys[k]);
    var ampRule = (str.substr(0, 1) == '&');
    keys[k]     = context + (ampRule ? str.substr(1) : ' ' + str);
  }

  return trim(keys.join(','))
}


export const flattenObject = (inputObject) => {
  const out = {}

  const addRule = (selector, propertyName, propertyValue) => {
    selector      = trim(selector)
    out[selector] = out[selector] || {}
    if (out[selector][propertyName]) {
      console.log('Replacing property ', propertyName, ' in ', selector, '; ', out[selector][propertyName], ' => ', propertyValue)
    }
    out[selector][propertyName] = propertyValue
  }


  function addObject(o, context) {
    // o: object with keys
    // entries are either
    //   css property => value
    //   subselector  => rules
    for (var key in o) {
      const value = o[key]
      if (typeof value == 'object') {
        const subcontext = buildSubcontext(context, key)
        addObject(value, subcontext)
      } else {
        addRule(context, key, value)
      }
    }
  }

  addObject(inputObject, '')

  return out
}


export function applyPropertiesFilter(fn, o) {
  let out = {}
  for (var selector in o) {
    out[selector] = fn(o[selector], selector)
  }
  return out
}

import {curry} from './utils/curry.es6'

import { dasherizeKeys } from './properties.es6'
export const dasherizePropertyKeys = curry(applyPropertiesFilter)(dasherizeKeys)

import { rejectUnknownKeys } from './properties.es6'
export const rejectUnknownPropertyKeys = curry(applyPropertiesFilter)(rejectUnknownKeys)


/**
 * Rule post-processor to remove "redundant" id selectors. For example,
 * if the generated selected ends up being '#a #b #c', this post-processor
 * will reduce it to '#c'. In general this is great, as it makes the rules
 * more readable on the output side. You are, however, losing the specificity,
 * creating a cascade you might not expect.
 *
 * To wire it in:
 * Csster.rulesPostProcessors.push(Csster.compressSelectors);
 * TODO UPDATE DOCS
 */
export function compressSelectors(o) {
  let out = {}
  for (var selector in o) {
    let newSelector = selector
    while (newSelector.match(/.*#.*#.*/)) {
      newSelector = newSelector.replace(/^.*#.*#/, '#');
    }
    out[newSelector] = o[selector]
  }
  return out
}