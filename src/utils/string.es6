// S T R I N G s
import {curry} from './fn.es6'

const onString = curry((fn, s) => {
  if (typeof s === 'string')
    return fn(s)
  else
    return s
})

const dasherize = onString((s) => {
  return s.replace(/([A-Z])/g, function ($1) {
    return "-" + $1.toLowerCase();
  });
})

const trim = onString(function (text) {
  return (text || "").replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "")
})

export {
    dasherize,
    trim,
}