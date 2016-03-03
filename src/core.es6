// This still isn't the right away to export for browser usage.
export const Csster = {}
if (typeof window !== 'undefined') {
  window.Csster = Csster
}

import {buildCss} from './buildCss.es6'
Csster.buildCss = buildCss

import insertCss from './insertCss.es6'
Csster.insertCss  = insertCss

import {compose} from './utils/fn.es6'
Csster.style = compose(insertCss, buildCss)

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

