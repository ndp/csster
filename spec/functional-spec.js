describe("Csster", function () {

  function resetCsster() {
    var head   = document.getElementsByTagName('HEAD')[0];
    var styles = head.getElementsByTagName('STYLE');
    for (var i = 0; i < styles.length; i++) {
      head.removeChild(styles[i]);
    }
  }


  describe('#processRules', function () {

    it("should output style rule from element name", function () {
      expect(Csster.processRules({
        p: {
          fontFamily: 'serif'
        }
      })).toEqual([
        {sel: "p", props: {'fontFamily': 'serif'}}
      ]);
    });

    it("should output style rule from element.class name", function () {
      expect(Csster.processRules({
        'div.cls': {
          height: '235px'
        }
      })).toEqual([
        {sel: "div.cls", props: {"height": "235px"}}
      ]);
    });

    it("should output multiple properties", function () {
      expect(Csster.processRules({
        'div.cls': {
          height: '235px',
          width:  '300px'
        }
      })).toEqual([
        {
          sel: "div.cls", props: {
          height: '235px',
          width:  '300px'
        }
        }
      ]);
    });

    it('should throw an exception if discovers a bugus properties', function () {
      expect(
          function () {
            Csster.processRules({
              div: {
                bogus: 'property_value'
              }
            })
          }).toThrow('Unknown CSS property "bogus" (string). Rule rejected for selector div');
    });

    it('should throw an exception if discovers a bugus property within other valid ones', function () {
      expect(
          function () {
            Csster.processRules({
              '#tooltip': {
                'div.body':      {
                  textAlign: 'center'
                },
                backgroundColor: '#eee',
                opacityness:     0.85
              }
            })
          }).toThrow('Unknown CSS property "opacityness" (number). Rule rejected for selector #tooltip');
    });

    it("should output properties and sub-selectors", function () {
      expect(Csster.processRules({
            ul: {
              width: '300px',
              li:    {
                padding:    '20px',
                marginLeft: '-20px'
              }
            }
          })
      ).
          toEqual([
            {sel: 'ul', props: {width: '300px'}},
            {sel: 'ul li', props: {padding: '20px', marginLeft: '-20px'}}
          ]);
    });

    it("should handle commas and spaces in nested selectors", function () {
      expect(Csster.processRules({
            ul: {
              width:             '300px',
              'li.even, li.odd': {
                padding: '20px'
              }
            }
          })
      ).
          toEqual([
            {sel: 'ul', props: {width: '300px'}},
            {sel: 'ul li.even,ul li.odd', props: {padding: '20px'}}
          ]);
    });

    it("should handle commas within pseudo-classes", function () {
      var processed = Csster.processRules({
        div: {
          'a:link,a:visited,a:hover': {
            color: 'blue'
          }
        }
      });
      expect(processed.length).toEqual(2);
      expect(processed[1].sel).toEqual('div a:link,div a:visited,div a:hover');
      expect(processed).
          toEqual([
            {sel: 'div', props: {}},
            {sel: 'div a:link,div a:visited,div a:hover', props: {color: 'blue'}}
          ]);
    });

    it("should interpret properties without space when & used", function () {
      expect(Csster.processRules({
            ul: {
              width:     '300px',
              '&:hover': {
                padding: '20px'
              }
            }
          })
      ).
          toEqual([{sel: 'ul', props: {width: '300px'}}, {sel: 'ul:hover', props: {padding: '20px'}}]);
    });

    it('should post-process rules', function () {
      Csster.rulesPostProcessors.push(function (rules) {
        rules[0]['sel'] = '#a'
      });
      expect(Csster.processRules({
        '#a #b #c': {width: 235}
      })).toEqual([{sel: '#a', props: {width: 235}}]);
      Csster.rulesPostProcessors.pop();
    });


    it('should process everything within a has macro, not just valid properties', function () {
      expect(
          function () {
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
          }).toThrow('Unknown CSS property "bogus" (string). Rule rejected for selector div')
    });

  });

  describe("Everything together", function () {
    var logo;
    beforeEach(function () {
      var divs = document.getElementsByTagName('DIV');
      for (var i = 0; i < divs.length; i++) {
        if (divs[i].className == 'logo') {
          logo = divs[i];
        }
      }
    });
    beforeEach(resetCsster);

    describe('#style', function () {
      var originalWidth;
      beforeEach(function () {
        originalWidth = logo.clientWidth;
      });
      it('should have no element style overrides for width', function () {
        expect(logo.style.width).toEqual('');
      });
      describe('inserting the stylesheet', function () {
        beforeEach(function () {
          Csster.style({'.logo': {fontSize: '75%'}});
        });
        it('should now be narrower', function () {
          expect(logo.clientWidth).toBeLessThan(originalWidth);
        });
      });
    });
    describe('jQuery plugin', function () {
      var originalWidth;
      beforeEach(function () {
        originalWidth = logo.clientWidth;
      });
      it('should have no element style overrides for width', function () {
        expect(logo.style.width).toEqual('');
      });
      describe('call', function () {
        var $this;
        beforeEach(function () {
          $this = $('.logo').csster({fontSize: '75%'});
        });
        it('should return source jQuery object', function () {
          expect($this).toEqual($('.logo'));
        });
        it('should now be wider', function () {
          expect(logo.clientWidth).toBeLessThan(originalWidth);
        });
      });
    });

  });


});