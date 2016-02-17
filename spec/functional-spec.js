describe("Csster > functional >", function () {

  function resetCsster() {
    var head   = document.getElementsByTagName('HEAD')[0];
    var styles = head.getElementsByTagName('STYLE');
    for (var i = 0; i < styles.length; i++) {
      head.removeChild(styles[i]);
    }
  }


  describe('#buildRules', function () {

    it("should output style rule from element name", function () {
      expect(Csster.buildRules({
        p: {
          fontFamily: 'serif'
        }
      })).toEqual([
        {sel: "p", props: {'font-family': 'serif'}}
      ]);
    });

    it("should output style rule from element.class name", function () {
      expect(Csster.buildRules({
        'div.cls': {
          height: '235px'
        }
      })).toEqual([
        {sel: "div.cls", props: {"height": "235px"}}
      ]);
    });

    it("should output multiple properties", function () {
      expect(Csster.buildRules({
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
            Csster.buildRules({
              div: {
                bogus: 'property_value'
              }
            })
          }).toThrow('Unrecognized "bogus" property name. Selector: "div"');
    });

    it('should throw an exception if discovers a bugus property within other valid ones', function () {
      expect(
          function () {
            Csster.buildRules({
              '#tooltip': {
                'div.body':      {
                  textAlign: 'center'
                },
                backgroundColor: '#eee',
                opacityness:     0.85
              }
            })
          }).toThrow('Unrecognized "opacityness" property name. Selector: "#tooltip"');
    });

    it("should output properties and sub-selectors", function () {
      expect(Csster.buildRules({
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
            {sel: 'ul li', props: {padding: '20px', 'margin-left': '-20px'}}
          ]);
    });

    it("should handle commas and spaces in nested selectors", function () {
      expect(Csster.buildRules({
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
      var processed = Csster.buildRules({
        div: {
          'a:link,a:visited,a:hover': {
            color: 'blue'
          }
        }
      });
      expect(processed.length).toEqual(1);
      expect(processed[0].sel).toEqual('div a:link,div a:visited,div a:hover');
      expect(processed).
          toEqual([
            {sel: 'div a:link,div a:visited,div a:hover', props: {color: 'blue'}}
          ]);
    });

    it("should interpret properties without space when & used", function () {
      expect(Csster.buildRules({
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

    it('should process everything within a has macro, not just valid properties', function () {
      expect(
          function () {
            Csster.buildRules({
              div: {
                has: {
                  bogus: 'property_value',
                  sub:   {
                    color: 'red'
                  }
                }
              }
            })
          }).toThrow('Unrecognized "bogus" property name. Selector: "div has"')
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