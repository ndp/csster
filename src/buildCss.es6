import buildRules from './buildRules.es6'
import stringifyRules from './stringifyRules.es6'
import {compose} from './utils/fn.es6'

export const buildCss = compose(stringifyRules, buildRules)
