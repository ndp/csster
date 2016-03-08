import { buildCss } from './buildCss.es6'
import insertCss from './insertCss.es6'
import { compose} from './utils/fn.es6'
import * as macros from './macros/macros.es6'
import { setMacro } from './filters/macroProcessor.es6'
import { arrayFlatten} from './utils/array.es6'
import { browserInfo } from './utils/browser.es6'
import { hslToHexColor, colorizeString } from './functions/color.es6'
import * as propertyNameValidator from './propertyNameValidator.es6'

const style = compose(insertCss, buildCss);
const addPropertyNames = propertyNameValidator.addNames

export const Csster = {
  buildCss,
  insertCss,
  style,
  macros,
  setMacro,
  arrayFlatten,
  browserInfo,
  hslToHexColor,
  addPropertyNames,
  propertyNameValidator,
  colorizeString
}



