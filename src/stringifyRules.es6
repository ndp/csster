import {format} from './rule.es6'

export default function (rules) {
  return rules.reduce((s, rule) =>  s + format(rule), '')
}
