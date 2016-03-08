import * as propertyName from './propertyName.es6'
import * as propertyValue from './propertyValue.es6'

export const format =
    (name, value) => propertyName.format(name) + ": " + propertyValue.format(value, name) + ";\r"

