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

    // :hover selectors (no space between pieces)
    // > blah   direct decendent


    describe('#formatRules', function() {
        it("should output style rule from element name", function() {
            expect(Csster.formatRules({
                p:{
                    fontFamily: 'serif'
                }
            })).toEqual("p {\rfont-family: serif;\r}\r");
        });
        it("should output style rule from element.class name", function() {
            expect(Csster.formatRules({
                'div.cls':{
                    height: '235px'
                }
            })).toEqual("div.cls {\rheight: 235px;\r}\r");
        });
        it("should output multiple properties", function() {
            expect(Csster.formatRules({
                'div.cls':{
                    height: '235px',
                    width: '300px'
                }
            })).toEqual("div.cls {\rheight: 235px;\rwidth: 300px;\r}\r");
        });
        it('should throw an exception if discovers a bugus properties', function() {
            expect(Csster.formatRules({
                div: {
                        bogus: 'property_value'
                }
            })).toThrow(true); //"unknown CSS property: bogus. Rule rejected."
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
                    toEqual("ul {\rwidth: 300px;\r}\rul li {\rpadding: 20px;\rmargin-left: -20px;\r}\r");
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
                    toEqual("ul {\rwidth: 300px;\r}\rul:hover {\rpadding: 20px;\r}\r");
        });

        it("should output px when passed an integer", function() {
            expect(Csster.formatRules({
                'div.cls':{
                    height: 235
                }
            })).toEqual("div.cls {\rheight: 235px;\r}\r");
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
            })).toEqual("div.cls {\rheight: 235px;\r-webkit-border-radius: 5px;\r-moz-border-radius: 5px;\r}\r");
        });
        it("should expand multiple values within a 'has' properties", function() {

            expect(Csster.formatRules({
                'div.cls':{
                    has: [roundedCorners(5), red()],
                    height: '235px'
                }
            })).toEqual("div.cls {\rheight: 235px;\r-webkit-border-radius: 5px;\r-moz-border-radius: 5px;\rcolor: red;\r}\r");
        });
        it('should output everything within a has macro, not just valid properties', function() {
            expect(Csster.formatRules({
                div: {
                    has: {
                        bogus: 'property_value',
                        sub: {
                            color: 'red'
                        }
                    }
                }
            })).toEqual('alsdfjda')
        });

    });

    describe('#insertStyleElement', function() {
        var originalWidth;
        beforeEach(function() {
            originalWidth = document.getElementsByClassName('logo')[0].clientWidth;
        });
        it('should have no element style overrides for width', function() {
            expect(document.getElementsByClassName('logo')[0].style.width).toEqual('');
        });
        describe('inserting the stylesheet', function() {
            beforeEach(function() {
                Csster.insertStylesheet('.logo { font-size: 150%;}');
            });
            it('should now be wider', function() {
                expect(document.getElementsByClassName('logo')[0].clientWidth).toBeGreaterThan(originalWidth);
            });
        });
    });

    describe('#style', function() {
        var originalWidth;
        beforeEach(function() {
            originalWidth = document.getElementsByClassName('logo')[0].clientWidth;
        });
        it('should have no element style overrides for width', function() {
            expect(document.getElementsByClassName('logo')[0].style.width).toEqual('');
        });
        describe('inserting the stylesheet', function() {
            beforeEach(function() {
                Csster.style({'.logo': { fontSize: '75%'}});
            });
            it('should now be wider', function() {
                expect(document.getElementsByClassName('logo')[0].clientWidth).toBeLessThan(originalWidth);
            });
        });
    });


});