import * as propertyName from './propertyName.es6'
import * as propertyValue from './propertyValue.es6'

const format = function (name, value) {
  return propertyName.format(name) + ": " + propertyValue.format(value, name) + ";\r";
};

export {format}