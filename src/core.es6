if (!window.Csster) {
  window.Csster = {}
}

import buildRules from './buildRules.es6'
import stringifyRules from './stringifyRules.es6'
import insertCss from './insertCss.es6'

Csster.buildCss = function (o) {
  const rules = buildRules(o)
  const css   = stringifyRules(rules)
  return css;
}

Csster.style = function (o) {
  insertCss(Csster.buildCss(o))
};


// Make available various utilities
import * as macros from './macros/macros.es6'
Csster.macros = macros

import {arrayFlatten} from './utils/array.es6'
Csster.arrayFlatten = arrayFlatten

import { browserInfo } from './utils/browser.es6'
Csster.browserInfo = browserInfo

import { hslToHexColor, colorizeString } from './functions/color.es6'
Csster.hslToHexColor = hslToHexColor
colorizeString()

import * as propertyNameValidator from './propertyNameValidator.es6'
Csster.addPropertyNames = propertyNameValidator.addNames

Csster.insertCss  = insertCss
Csster.buildRules = buildRules



