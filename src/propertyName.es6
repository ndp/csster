import { dasherize }from './utils/string.es6'
import * as propertyNameValidator from './propertyNameValidator.es6'

/*
 Returns the CSS-correct lowercase property name, if it's recognized
 as a property. Null otherwise.
 */
export const propertyNameOf = function (p) {
  const name = dasherize(p);
  return propertyNameValidator.validate(name)
}


export const format = (name) => {
  return propertyNameOf(name)
}

export const valid = propertyNameOf

