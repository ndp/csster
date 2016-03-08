import { dasherize } from './utils/string.es6'
import { applyToKeys } from './utils/object.es6'
import * as propertyNameValidator from './propertyNameValidator.es6'
import { visitChildren } from '../src/utils/object.es6'

export const dasherizeKeys = applyToKeys(dasherize)

export const rejectUnknownPropertyKeys = visitChildren((rules, selector) => {
  for (let prop in rules) {
    let error = propertyNameValidator.error(prop)
    if (error) {
      throw '' + error + '. Context: "' + selector + '"'
    }
  }
})

