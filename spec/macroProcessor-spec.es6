import {macroProcessor} from '../src/filters/macroProcessor.es6'

describe('macroProcessor', () => {
  function fakeMacro(radius) {
    return {
      '-webkit-border-radius': radius,
      '-moz-border-radius':    radius
    }
  }

  function red() {
    return {color: 'red'};
  }

  it('handles empty properties', () => {
    expect(macroProcessor({})).toEqual({})
  })

  it('merges results of "has" functions into results', () => {
    expect(macroProcessor({has: red})).toEqual({color: 'red'})
  })

  it('merges "has" values into results', () => {
    expect(macroProcessor({has: red()})).toEqual({color: 'red'})
  })


  it("expands a 'has' property", () => {
    var props = {
      has:    fakeMacro(5),
      height: '235px'
    };
    props     = macroProcessor(props);
    expect(props).toEqual({height: '235px', '-webkit-border-radius': 5, '-moz-border-radius': 5})
  })
  it("expands multiple values within a 'has' properties", () => {
    var props = {
      has:    [fakeMacro(5), red()],
      height: '235px'
    };
    props     = macroProcessor(props);
    expect(props).toEqual({height: '235px', '-webkit-border-radius': 5, '-moz-border-radius': 5, color: 'red'})
  })
  it("expands has within a has within a 'has' properties", () => {
    var props = {
      has: {has: {height: '235px'}}
    };
    props     = macroProcessor(props);
    expect(props).toEqual({"height": "235px"})
  })

})

