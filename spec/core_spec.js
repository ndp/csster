describe("Csster", function() {

  describe('#propertyNameOf', function() {
    it('should convert fontFamily to font-family', function() {
      expect(Csster.propertyNameOf('fontFamily')).toEqual("font-family");
    });
    it('should return font-family without change', function() {
      expect(Csster.propertyNameOf('font-family')).toEqual("font-family");
    });

    var props = 'background-color font font-family'.split(' ');
    for (var i = 0; i < props.length; i++) {
      var name = props[i];
      it('should return ' + name + '', function() {
        expect(Csster.propertyNameOf(name)).toEqual(name);
      });
    }
    it('should return z-index', function() {
      expect(Csster.propertyNameOf('zIndex')).toEqual('z-index');
    });

    it('should return nil for invalid property names', function() {
      expect(Csster.propertyNameOf('abc')).toEqual(null);
      expect(Csster.propertyNameOf('#my_id')).toEqual(null);
      expect(Csster.propertyNameOf('p')).toEqual(null);
      expect(Csster.propertyNameOf('p.clas')).toEqual(null);
      expect(Csster.propertyNameOf('p.cls:active whatever')).toEqual(null);
    });
  });

  describe('#formatProperty', function() {
    it('should render font family', function() {
      expect(Csster.formatProperty('fontFamily', 'serif')).toEqual("font-family: serif;\r");
    });
    it('should render raw number as "px" value', function() {
      expect(Csster.formatProperty('height', 12)).toEqual("height: 12px;\r");
    });
    it('should understand opacity', function() {
      expect(Csster.formatProperty('opacity', .5)).toEqual("opacity: 0.5px;\r");
    });
  });


  describe('#processRules', function() {

    it("should output style rule from element name", function() {
      expect(Csster.processRules({
        p:{
          fontFamily: 'serif'
        }
      })).toEqual([
        {sel:"p",props:{'fontFamily': 'serif'}}
      ]);
    });

    it("should output style rule from element.class name", function() {
      expect(Csster.processRules({
        'div.cls':{
          height: '235px'
        }
      })).toEqual([
        {sel:"div.cls",props:{"height":"235px"}}
      ]);
    });

    it("should output multiple properties", function() {
      expect(Csster.processRules({
        'div.cls':{
          height: '235px',
          width: '300px'
        }
      })).toEqual([
        {sel:"div.cls",props:{
          height: '235px',
          width: '300px'
        }}
      ]);
    });

    it('should throw an exception if discovers a bugus properties', function() {
      expect(
            function() {
              Csster.processRules({
                div: {
                  bogus: 'property_value'
                }
              })
            }).toThrow('Unknown CSS property "bogus". Rule rejected.');
    });

    it('should throw an exception if discovers a bugus property within other valid ones', function() {
      expect(
            function() {
              Csster.processRules({
                '#tooltip': {
                  'div.body': {
                    textAlign: 'center'
                  },
                  backgroundColor: '#eee',
                  opacityness: 0.85
                }
              })
            }).toThrow('Unknown CSS property "opacityness". Rule rejected.');
    });

    it("should output properties and sub-selectors", function() {
      expect(Csster.processRules({
        ul:{
          width: '300px',
          li: {
            padding: '20px',
            marginLeft: '-20px'
          }
        }
      })
              ).
              toEqual([
        { sel : 'ul', props : { width : '300px' } },
        { sel : 'ul li', props : { padding : '20px', marginLeft : '-20px' } }
      ]);
    });

    it("should handle commas in nested selectors", function() {
      expect(Csster.processRules({
        ul:{
          width: '300px',
          'li.even,li.odd': {
            padding: '20px'
          }
        }
      })
              ).
              toEqual([
        { sel : 'ul', props : { width : '300px' } },
        { sel : 'ul li.even,ul li.odd', props : { padding : '20px' } }
      ]);
    });

    it("should interpret properties without space when & used", function() {
      expect(Csster.processRules({
        ul:{
          width: '300px',
          '&:hover': {
            padding: '20px'
          }
        }
      })
              ).
              toEqual([ { sel : 'ul', props : { width : '300px' } }, { sel : 'ul:hover', props : { padding : '20px' } } ]);
    });

    it('should not remove redundant ids', function() {
      Csster.shortCircuitIds = false;
      expect(Csster.processRules({
        '#a #b #c': {width: 235}
      })).toEqual([ { sel : '#a #b #c', props : { width : 235 } } ]);
    });

    it('should remove redundant ids', function() {
      Csster.shortCircuitIds = true;
      expect(Csster.processRules({
        '#a #b #c': {width: 235}
      })).toEqual([
        {sel:"#c", props: {width: 235}}
      ]);
    });


    function roundedCorners(radius) {
      return {
        '-webkit-border-radius': radius,
        '-moz-border-radius': radius
      }
    }

    function red() {
      return {color: 'red'};
    }

    it("should expand a 'has' property", function() {

      expect(Csster.processRules({
        'div.cls':{
          has: roundedCorners(5),
          height: '235px'
        }
      })).toEqual([ { sel : 'div.cls', props : { height : '235px', '-webkit-border-radius' : 5, '-moz-border-radius' : 5 } } ]);
    });
    it("should expand multiple values within a 'has' properties", function() {

      expect(Csster.processRules({
        'div.cls':{
          has: [roundedCorners(5), red()],
          height: '235px'
        }
      })).toEqual([
        {sel:'div.cls',props:{ height : '235px', '-webkit-border-radius' : 5, '-moz-border-radius' : 5,color: 'red'}}
      ]);
    });
    it("should expand has within a has within a 'has' properties", function() {

      expect(Csster.processRules({
        'div.cls':{
          has: { has: {height: '235px'} }
        }
      })).toEqual([
        {sel:'div.cls',props:{"height": "235px"}}
      ]);
    });
    it('should process everything within a has macro, not just valid properties', function() {
      expect(
            function() {
              Csster.processRules({
                div: {
                  has: {
                    bogus: 'property_value',
                    sub: {
                      color: 'red'
                    }
                  }
                }
              })
            }).toThrow('Unknown CSS property "bogus". Rule rejected.')
    });

  });

  describe("Everything together", function() {
    var logo;
    beforeEach(function() {
      var divs = document.getElementsByTagName('DIV');
      for (var i = 0; i < divs.length; i++) {
        if (divs[i].className == 'logo') {
          logo = divs[i];
        }
      }
    });
    describe('#insertStyleElement', function() {
      var originalWidth;
      beforeEach(function() {
        originalWidth = logo.clientWidth;
      });
      it('should have no element style overrides for width', function() {
        expect(logo.style.width).toEqual('');
      });
      describe('inserting the stylesheet', function() {
        beforeEach(function() {
          Csster.insertStylesheet([
            {sel:'.logo',props:{'font-size':'150%'}}
          ]);
        });
        it('should now be wider', function() {
          expect(logo.clientWidth).toBeGreaterThan(originalWidth);
        });
      });
    });

    describe('#style', function() {
      var originalWidth;
      beforeEach(function() {
        originalWidth = logo.clientWidth;
      });
      it('should have no element style overrides for width', function() {
        expect(logo.style.width).toEqual('');
      });
      describe('inserting the stylesheet', function() {
        beforeEach(function() {
          Csster.style({'.logo': { fontSize: '75%'}});
        });
        it('should now be wider', function() {
          expect(logo.clientWidth).toBeLessThan(originalWidth);
        });
      });
    });

  });


  describe('customization', function() {
    describe('adding a valid property', function() {

      it('should allow adding a single property using parameters', function() {
        expect(Csster.propertyNameOf('foo')).toBeFalsy();
        Csster.addPropertyNames('foo');
        expect(Csster.propertyNameOf('foo')).toEqual('foo');
      });

      it('should allow adding multiple properties passed as parameters', function() {
        expect(Csster.propertyNameOf('blip')).toBeFalsy();
        expect(Csster.propertyNameOf('blop')).toBeFalsy();
        Csster.addPropertyNames('blip', 'blop');
        expect(Csster.propertyNameOf('blip')).toEqual('blip');
        expect(Csster.propertyNameOf('blop')).toEqual('blop');
      });
      it('should allow adding a multiple properties using an array', function() {
        expect(Csster.propertyNameOf('bar')).toBeFalsy();
        expect(Csster.propertyNameOf('baz')).toBeFalsy();
        Csster.addPropertyNames(['bar', 'baz']);
        expect(Csster.propertyNameOf('bar')).toEqual('bar');
        expect(Csster.propertyNameOf('baz')).toEqual('baz');
      });


    });
  });


});