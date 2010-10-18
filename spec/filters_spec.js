describe('property pre-processors', function() {
    describe('macros', function() {
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
            var props = {
                has: roundedCorners(5),
                height: '235px'
            };
            Csster.preprocessProperties(props);
            expect(props).toEqual({ height : '235px', '-webkit-border-radius' : 5, '-moz-border-radius' : 5 });
        });
        it("should expand multiple values within a 'has' properties", function() {
            var props = {
                    has: [roundedCorners(5), red()],
                    height: '235px'
                };
            Csster.preprocessProperties(props);
            expect(props).toEqual({ height : '235px', '-webkit-border-radius' : 5, '-moz-border-radius' : 5,color: 'red'});
        });
        it("should expand has within a has within a 'has' properties", function() {
            var props = {
                has: { has: {height: '235px'} }
                };
            Csster.preprocessProperties(props);
            expect(props).toEqual({"height": "235px"});
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

});


describe('rule post processors', function() {
    describe('compressSelectors', function() {
        it('should remove redundant ids', function() {
            rules = [
                {
                    sel: '#a #b #c', props: {width: 235}
                }
            ];
            Csster.compressSelectors(rules);
            expect(rules).toEqual([
                {sel:"#c", props: {width: 235}}
            ]);
        });
    });
});

