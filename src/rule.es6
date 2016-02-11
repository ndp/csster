import * as propertyEntry from './propertyEntry.es6'

const formatProperties = function (props) {
  return Object.keys(props).reduce((s, p) => s + propertyEntry.format(p, props[p]), '')
};

// Rule: object with `sel` and `props` keys.
// .sel is the selector
// .props in an object holding CSS property rules
export const format = function (rule) {
  return rule.sel + ' { ' + formatProperties(rule.props) + '}\r'
}
