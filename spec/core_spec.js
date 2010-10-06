describe("Csster", function() {

    describe('#propertyNameOf', function() {
        it('should convert fontFamily to font-family', function() {
            expect(Csster.propertyNameOf('fontFamily')).toEqual("font-family");
        });
        it('should return font-family without change', function() {
            expect(Csster.propertyNameOf('font-family')).toEqual("font-family");
        });

        for (var i = 0; i < Csster.propertyNames.length; i++) {
            var name = Csster.propertyNames[i];
            it('should return ' + name + '', function() {
                expect(Csster.propertyNameOf(name)).toEqual(name);
            });
        }
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
    });


    describe('#formatRules', function() {

        it("should output style rule from element name", function() {
            expect(Csster.formatRules({
                p:{
                    fontFamily: 'serif'
                }
            })).toEqual([{sel:"p",props:"font-family: serif;\r"}]);
        });

        it("should output style rule from element.class name", function() {
            expect(Csster.formatRules({
                'div.cls':{
                    height: '235px'
                }
            })).toEqual([{sel:"div.cls",props:"height: 235px;\r"}]);
        });

        it("should output multiple properties", function() {
            expect(Csster.formatRules({
                'div.cls':{
                    height: '235px',
                    width: '300px'
                }
            })).toEqual([{sel:"div.cls",props:"height: 235px;\rwidth: 300px;\r"}]);
        });

        it('should throw an exception if discovers a bugus properties', function() {
            expect(
                  function() {
                      Csster.formatRules({
                          div: {
                              bogus: 'property_value'
                          }
                      })
                  }).toThrow('Unknown CSS property "bogus". Rule rejected.');
        });

        it("should output properties and sub-selectors", function() {
            expect(Csster.formatRules({
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
                {sel:"ul",props:"width: 300px;\r"},
                {sel:"ul li", props:"padding: 20px;\rmargin-left: -20px;\r"}
            ]);
        });

        it("should handle commas in nested selectors", function() {
             expect(Csster.formatRules({
                 ul:{
                     width: '300px',
                     'li.even,li.odd': {
                         padding: '20px'
                     }
                 }
             })
                     ).
                     toEqual([
                 {sel:"ul",props:"width: 300px;\r"},
                 {sel:"ul li.even,ul li.odd", props:"padding: 20px;\r"}
             ]);
         });

        it("should output properties without space when & used", function() {
            expect(Csster.formatRules({
                ul:{
                    width: '300px',
                    '&:hover': {
                        padding: '20px'
                    }
                }
            })
                    ).
                    toEqual([
                {sel:"ul", props: "width: 300px;\r"},
                {sel: "ul:hover", props: "padding: 20px;\r"}
            ]);
        });

        it("should output px when passed an integer", function() {
            expect(Csster.formatRules({
                'div.cls':{
                    height: 235
                }
            })).toEqual([{sel:"div.cls", props:"height: 235px;\r"}]);
        });

        it('should not remove redundant ids', function() {
            Csster.shortCircuitIds = false;
            expect(Csster.formatRules({
                    '#a #b #c': {width: 235}
            })).toEqual([{sel:"#a #b #c", props:"width: 235px;\r"}]);
        });

        it('should remove redundant ids', function() {
            Csster.shortCircuitIds = true;
            expect(Csster.formatRules({
                    '#a #b #c': {width: 235}
            })).toEqual([{sel:"#c", props:"width: 235px;\r"}]);
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

            expect(Csster.formatRules({
                'div.cls':{
                    has: roundedCorners(5),
                    height: '235px'
                }
            })).toEqual([{sel:"div.cls",props:"height: 235px;\r-webkit-border-radius: 5px;\r-moz-border-radius: 5px;\r"}]);
        });
        it("should expand multiple values within a 'has' properties", function() {

            expect(Csster.formatRules({
                'div.cls':{
                    has: [roundedCorners(5), red()],
                    height: '235px'
                }
            })).toEqual([{sel:'div.cls',props:"height: 235px;\r-webkit-border-radius: 5px;\r-moz-border-radius: 5px;\rcolor: red;\r"}]);
        });
        it("should expand has within a has within a 'has' properties", function() {

            expect(Csster.formatRules({
                'div.cls':{
                    has: { has: {height: '235px'} }
                }
            })).toEqual([{sel:'div.cls',props:"height: 235px;\r"}]);
        });
        it('should process everything within a has macro, not just valid properties', function() {
            expect(
                  function() {
                      Csster.formatRules({
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
            for (var i = 0; i<divs.length; i++) {
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
                    Csster.insertStylesheet([{sel:'.logo',props:'font-size: 150%;'}]);
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



});