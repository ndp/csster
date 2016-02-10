import { dasherize }from './utils/string.es6'
import * as propertyNameValidator from './filters/property_name_validator.js'

/*
 Returns the CSS-correct lowercase property name, if it's recognized
 as a property. Null otherwise.
 */
const propertyNameOf = function (p) {
  const name = dasherize(p);
  return propertyNameValidator.validate(name)
}

export { propertyNameOf }