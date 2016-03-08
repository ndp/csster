import { macroProcessor, isMacroKey, setMacro } from '../src/filters/macroProcessor.es6'

function borderRadius(radius) {
  return {
    '-webkit-border-radius': radius,
    '-moz-border-radius':    radius
  }
}

function colorRed() {
  return {color: 'red'};
}


describe('isMacroKey', () => {
  it('uses "has"', () => {
    expect(isMacroKey('has')).toBeTruthy()
  })
  it('uses "mixin"', () => {
    expect(isMacroKey('mixin')).toBeTruthy()
  })
  it('uses "mixins"', () => {
    expect(isMacroKey('mixins')).toBeTruthy()
  })
  it('does not use "div"', () => {
    expect(isMacroKey('div')).toBeFalsy()
  })
  it('does not use "height"', () => {
    expect(isMacroKey('height')).toBeFalsy()
  })
})

describe('macroProcessor', () => {

  it('handles empty properties', () => {
    expect(macroProcessor({})).toEqual({})
  })

  it('merges results of calling "has" function', () => {
    expect(macroProcessor({has: colorRed})).toEqual({color: 'red'})
  })

  it('merges results of calling "has" function array', () => {
    expect(macroProcessor({has: [colorRed]})).toEqual({color: 'red'})
  })

  it('merges "has" values into results', () => {
    expect(macroProcessor({has: colorRed()})).toEqual({color: 'red'})
  })

  it('merges "has" values array into results', () => {
    expect(macroProcessor({has: [colorRed()]})).toEqual({color: 'red'})
  })

  it("expands a 'has' property", () => {
    const props = {
      has:    borderRadius(5),
      height: '235px'
    };
    expect(macroProcessor(props))
        .toEqual({height: '235px', '-webkit-border-radius': 5, '-moz-border-radius': 5})
  })

  it("expands multiple values within a 'has' properties", () => {
    const props = {
      has:    [borderRadius(5), colorRed()],
      height: '235px'
    };
    expect(macroProcessor(props))
        .toEqual({height: '235px', '-webkit-border-radius': 5, '-moz-border-radius': 5, color: 'red'})
  })

  it('expands "has" within a "has" within a "has" properties', () => {
    const props = {
      div: {has: {mixin: {mixins: {height: '235px'}}}}
    };
    expect(macroProcessor(props)).toEqual({div: {height: "235px"}})
  })

  describe('setMacro', () => {
    it('can be added', () => {
      setMacro('roundedCorners', (size) => {
        return {borderRadius: size}
      })
      const props = {
        div: {roundedCorners: 5}
      };
      expect(macroProcessor(props)).toEqual({div: {borderRadius: 5}})
    })

    it('can accept multiple values', () => {
      setMacro('pos', (x, y) => {
        return {backgroundPosition: '' + x + 'px ' + y + 'px'}
      })


      const props = {
        div: {pos: [5, 10]}
      }

      expect(macroProcessor(props)).toEqual({div: {backgroundPosition: '5px 10px'}})
    })
  })

})

