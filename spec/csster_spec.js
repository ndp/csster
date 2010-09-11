describe('Array#flatten', function() {
    it('should do nothing with empty array', function() {
        expect([].flatten()).toEqual([]);
    });
    it('should do nothing with flat array', function() {
        expect([1,2].flatten()).toEqual([1,2]);
    });
    it('should flatten one level', function() {
        expect([1,[2]].flatten()).toEqual([1,2]);
    });
    it('should flatten N levels', function() {
        expect([1,[2,[3,[4]]]].flatten()).toEqual([1,2,3,4]);
    });
});

describe("Csster", function() {

    describe('property name', function() {
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

    describe('property', function() {
        it('should render font family', function() {
            expect(Csster.formatProperty('fontFamily', 'serif')).toEqual("font-family: serif;\r");
        });


    });

    it("should output style rule from element name", function() {
        expect(rules({
            p:{
                fontFamily: 'serif'
            }
        })).toEqual("p {\rfont-family: serif;\r}\r");
    });
    it("should output style rule from element.class name", function() {
        expect(rules({
            'div.cls':{
                height: '235px'
            }
        })).toEqual("div.cls {\rheight: 235px;\r}\r");
    });
    it("should output multiple properties", function() {
        expect(rules({
            'div.cls':{
                height: '235px',
                width: '300px'
            }
        })).toEqual("div.cls {\rheight: 235px;\rwidth: 300px;\r}\r");
    });
    it("should output properties and sub-selectors", function() {
        expect(rules({
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

    it("should output px when passed an integer", function() {
        expect(rules({
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

    it("should expand a macro property", function() {
        expect(rules({
            'div.cls':{
                macro: roundedCorners(5),
                height: '235px'
            }
        })).toEqual("div.cls {\rheight: 235px;\r-webkit-border-radius: 5px;\r-moz-border-radius: 5px;\r}\r");
    });


});