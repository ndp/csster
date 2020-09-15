import { buildCss }               from './buildCss.es6'
import insertCss                  from './insertCss.es6'
import { compose }                from './utils/fn.es6'
import * as macros                from './macros/macros.es6'
import { setMacro }               from './filters/macroProcessor.es6'
import { arrayFlatten }           from './utils/array.es6'
import { browserInfo }            from './utils/browser.es6'
import * as Color                 from './functions/color.es6'
import * as propertyNameValidator from './propertyNameValidator.es6'
import * as _jqueryStub           from './jquery.js'

const style                             = compose(insertCss, buildCss),
      addPropertyNames                  = propertyNameValidator.addNames,
      { hslToHexColor, colorizeString } = Color

export const Csster = {
  buildCss,
  insertCss,
  style,
  macros,
  setMacro,
  arrayFlatten,
  browserInfo,
  Color,
  hslToHexColor, // @deprecated, backward compatible
  addPropertyNames,
  propertyNameValidator,
  colorizeString,
}

if (typeof window !== 'undefined') window.Csster = Csster
//
// export default {
//   a: 1,
//   b: 2,
// }
//

