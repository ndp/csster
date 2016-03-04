var Csster = require('../csster.js')

describe('simple node usage', () => {
  it('renders Css', () => {
    var actual = Csster.buildCss({p: {height: 7}}).replace(/[\n\r]/g,'')
    expect(actual)
        .toEqual('p { height: 7px; }')
  })
})