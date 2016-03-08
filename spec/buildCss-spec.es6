import {buildCss} from '../src/buildCss.es6'

describe('buildCss', () => {

  it("should output style rule from element name", function () {
    var result = buildCss({
      p: {
        fontFamily: 'serif'
      }
    }).replace(/[\n\r]/g, '')
    expect(result).toEqual('p { font-family: serif; }')
  });

  it("should output style rule from macro output", function () {
    var result = buildCss({
      p: {
        div: {
          has: {
            fontFamily: 'serif'
          }
        }
      }
    }).replace(/[\n\r]/g, '')
    expect(result).toEqual('p div { font-family: serif; }')
  });

  it("should output style rule from macro list", function () {
    var result = buildCss({
      p: {
        div: {
          has: [{
            fontFamily: 'serif'
          }]
        }
      }
    }).replace(/[\n\r]/g, '')
    expect(result).toEqual('p div { font-family: serif; }')
  });

})