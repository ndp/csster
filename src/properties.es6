import { dasherize } from './utils/string.es6'

export function dasherizeKeys(rules) {
  let out = {}
  for (let prop in rules) {
    out[dasherize(prop)] = rules[prop]
  }
  return out
}

import * as propertyNameValidator from './propertyNameValidator.es6'

export function rejectUnknownKeys(rules, selector) {
  for (let prop in rules) {
    let error = propertyNameValidator.error(prop)
    if (error) {
      throw '' + error + '. Selector: "' + selector + '"'
    }
  }
  return rules
}
