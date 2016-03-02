import { dasherize } from './utils/string.es6'

import {applyToKeys} from './utils/object.es6'

export const dasherizeKeys = applyToKeys(dasherize)


import {curry} from './utils/curry.es6'
const propertyKeyVisitor = curry(function (fn, rules, ctx) {
  for (let prop in rules) {
    fn(prop, ctx)
  }
  return rules
})


import * as propertyNameValidator from './propertyNameValidator.es6'

export const rejectUnknownKeys = propertyKeyVisitor(function (prop, ctx) {
  let error = propertyNameValidator.error(prop)
  if (error) {
    throw '' + error + '. Context: "' + ctx + '"'
  }
})
