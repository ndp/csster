import { dasherize } from './utils/string.es6'

import {applyToKeys} from './utils/object.es6'

export const dasherizeKeys = applyToKeys(dasherize)

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
