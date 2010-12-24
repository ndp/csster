describe("Csster", function() {

  function resetCsster() {
    var head = document.getElementsByTagName('HEAD')[0];
    var styles = head.getElementsByTagName('STYLE');
    for (var i = 0; i < styles.length; i++) {
      head.removeChild(styles[i]);
    }
  }

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
      expect(Csster.formatProperty('opacity', .5)).toEqual("opacity: 0.5;\r");
    });
    it('should understand zoom', function() {
      expect(Csster.formatProperty('zoom', 1)).toEqual("zoom: 1;\r");
    });
    it('should understand z-index', function() {
      expect(Csster.formatProperty('z-index', 1000)).toEqual("z-index: 1000;\r");
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

    it("should handle commas and spaces in nested selectors", function() {
      expect(Csster.processRules({
        ul:{
          width: '300px',
          'li.even, li.odd': {
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

    it("should handle commas within pseudo-classes", function() {
        var processed = Csster.processRules({
            div: {
                'a:link,a:visited,a:hover':{
                    color: 'blue'
                }
            }
        });
        expect(processed.length).toEqual(2);
        expect(processed[1].sel).toEqual('div a:link,div a:visited,div a:hover');
        expect(processed).
              toEqual([
        { sel : 'div', props : { } },
        { sel : 'div a:link,div a:visited,div a:hover', props : { color : 'blue' } }
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

    it('should post-process rules', function() {
      Csster.rulesPostProcessors.push(function(rules) {rules[0]['sel'] = '#a'});
      expect(Csster.processRules({
        '#a #b #c': {width: 235}
      })).toEqual([ { sel : '#a', props : { width : 235 } } ]);
      Csster.rulesPostProcessors.pop();
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
    beforeEach(resetCsster);
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
    describe('jQuery plugin', function() {
      var originalWidth;
      beforeEach(function() {
        originalWidth = logo.clientWidth;
      });
      it('should have no element style overrides for width', function() {
        expect(logo.style.width).toEqual('');
      });
      describe('call', function() {
        var $this;
        beforeEach(function() {
          $this = $('.logo').csster({ fontSize: '75%'});
        });
        it('should return source jQuery object', function() {
            expect($this).toEqual($('.logo'));
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