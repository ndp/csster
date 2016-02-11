// convert rules to textual string

import {propertyFormatter} from './propertyFormatter.es6'


const formatProperties = function (props) {
  let result = '';
  for (let p in props) {
    result += propertyFormatter(p, props[p]);
  }
  return result;
};


export default function (rules) {
  let s = '';
  for (let i = 0; i < rules.length; i++) {
    s += rules[i].sel + ' { ';
    s += formatProperties(rules[i].props);
    s += '}\r';
  }
  return s;
}


// IE doesn't seem to matter:  http://msdn.microsoft.com/en-us/library/ms535871(v=VS.85).aspx
