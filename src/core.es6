if (!window.Csster) {
  window.Csster = {}
}

import buildRules from './buildRules.es6'
import { postProcessRules } from './rulePostProcessor.es6'
import stringifyRules from './stringifyRules.es6'
import insertCss from './insertCss.es6'

// Main entry from the outside
Csster.style = function (o) {
  const rules = buildRules(o)
  postProcessRules(rules);
  const css   = stringifyRules(rules)
  insertCss(css)
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

import { propertyPreprocessors } from './propertyPreprocessor.es6'
Csster.propertyPreprocessors = propertyPreprocessors

import { rulesPostProcessors } from './rulePostProcessor.es6'
Csster.rulesPostProcessors = rulesPostProcessors

import * as propertyNameValidator from './propertyNameValidator.es6'
Csster.addPropertyNames = propertyNameValidator.addNames

//Csster.compressSelectors = compressSelectors TODO, need to make this configurable

Csster.insertCss = insertCss
Csster.buildRules = buildRules

//import {createMacroProcessor} from './filters/macroProcessor.es6'
//Csster.propertyPreprocessors.push(createMacroProcessor('has'));



/*
ObjectProcessor
===============
(Object) => (Object)
 flatten -- remove nested hierarchy
expand macros


(Object) => [Rules]
- buildRules
- resolveRuleHash


PropertyProcessor



RuleProcessor

 */