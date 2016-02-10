import {preprocessProperties, pushPropertyPreprocessor} from '../src/propertyPreprocessor.es6'

import macroPreprocessor from '../src/filters/macro_preprocessor.es6'

describe('property pre-processors', () => {
  describe('macros', () => {
    function fakeMacro(radius) {
      return {
        '-webkit-border-radius': radius,
        '-moz-border-radius':    radius
      }
    }

    function red() {
      return {color: 'red'};
    }

    beforeEach( () => pushPropertyPreprocessor(macroPreprocessor('has')) )

    it("should expand a 'has' property", () => {
      var props = {
        has:    fakeMacro(5),
        height: '235px'
      };
      preprocessProperties(props);
      expect(props).toEqual({height: '235px', '-webkit-border-radius': 5, '-moz-border-radius': 5});
    });
    it("should expand multiple values within a 'has' properties", () => {
      var props = {
        has:    [fakeMacro(5), red()],
        height: '235px'
      };
      preprocessProperties(props);
      expect(props).toEqual({height: '235px', '-webkit-border-radius': 5, '-moz-border-radius': 5, color: 'red'});
    });
    it("should expand has within a has within a 'has' properties", () => {
      var props = {
        has: {has: {height: '235px'}}
      };
      preprocessProperties(props);
      expect(props).toEqual({"height": "235px"});
    });
    xit('should process everything within a has macro, not just valid properties', () => {
      expect(
          () => {
            Csster.processRules({
              div: {
                has: {
                  bogus: 'property_value',
                  sub:   {
                    color: 'red'
                  }
                }
              }
            })
          }).toThrow('Unknown CSS property "bogus". Rule rejected.')
    });

  });

});


const compressSelectors = require('../src/filters/rule_post_processors.js').compressSelectors

describe('rule post processors', () => {
  describe('compressSelectors', () => {
    it('should remove redundant ids', () => {
      const rules = [
        {
          sel: '#a #b #c', props: {width: 235}
        }
      ];
      compressSelectors(rules);
      expect(rules).toEqual([
        {sel: "#c", props: {width: 235}}
      ]);
    });
  });
});

