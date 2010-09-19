describe('macros', function() {
    describe('roundedCorners', function() {
        it('should provide a default curvature of 10', function() {
            expect(roundedCorners()).toEqual({ '-moz-border-radius' : 10, 'border-radius' : 10 });
        });
        it('should respect input radius', function() {
            expect(roundedCorners(5)).toEqual({ '-moz-border-radius' : 5, 'border-radius' : 5 });
        });
        it('should curve all corners when asked explicitly', function() {
            expect(roundedCorners('all', 7)).toEqual({ '-moz-border-radius' : 7, 'border-radius' : 7 });
        });
        it('should curve just top left corner', function() {
            expect(roundedCorners('tl', 7)).toEqual({ '-moz-border-radius-topleft' : 7, 'border-top-left-radius' : 7 });
        });
        it('should curve just top side corner', function() {
            expect(roundedCorners('top', 7)).toEqual({ '-moz-border-radius-topleft' : 7, 'border-top-left-radius' : 7,
            '-moz-border-radius-topright' : 7, 'border-top-right-radius' : 7});
        });
    });

    describe('phark', function() {

        it('should ', function() {
            expect(phark()).toEqual({x:'xxx'});
        })
        it('should throw exception if not given enough parameters', function() {
            expect(phark()).toThrow('parameter missing');
        })

    });

});

