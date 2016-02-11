if (!window.Csster) {
  window.Csster = {}
}

import * as macros from './macros/macros.es6'
Csster.macros = macros

import {arrayFlatten} from './utils/array.es6'
Csster.arrayFlatten = arrayFlatten

import * as propertyNameValidator from './propertyNameValidator.es6'
Csster.addPropertyNames = propertyNameValidator.addNames

import { compressSelectors } from './filters/rule_post_processors.js'
Csster.compressSelectors = compressSelectors

import { browser } from './utils/browser.es6'
Csster.browser = browser

import { browserInfo } from './utils/browser.es6'
Csster.browserInfo = browserInfo

import { rulesPostProcessors } from './rulePostProcessor.es6'
Csster.rulesPostProcessors = rulesPostProcessors

import { propertyPreprocessors } from './propertyPreprocessor.es6'
Csster.propertyPreprocessors = propertyPreprocessors

import { hslToHexColor, colorizeString } from './functions/color.es6'
Csster.hslToHexColor = hslToHexColor
colorizeString()

import stringifyRules from './stringifyRules.es6'
import insertCss from './insertCss.es6'
Csster.insertCss = insertCss

import buildRules from './buildRules.es6'
Csster.buildRules = buildRules

Csster.style = function (o) {
  const rules = Csster.buildRules(o)
  const css   = stringifyRules(rules)
  Csster.insertCss(css)
};
