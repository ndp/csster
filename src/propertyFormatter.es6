import {propertyNameOf} from './propertyNameOf.es6'

const propertyFormatter = function (p, value) {
  p = propertyNameOf(p);
  if (value && typeof value == 'number' &&
      p != 'z-index' && p != 'opacity' && p != 'zoom') {
    value = '' + value + 'px';
  }
  return p + ": " + value + ";\r";
};

export {propertyFormatter}