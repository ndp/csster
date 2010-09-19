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

    describe('boxShadow', function() {
        var result;
        beforeEach(function() {
             result = boxShadow([2,3],4,'yellow');
        });

        it ('should have CSS3 rule', function() {
            expect(result['boxShadow']).toEqual('2px 3px 4px yellow');
        });
        it ('should have webkit rule', function() {
            expect(result['-webkit-box-shadow']).toEqual('2px 3px 4px yellow');
        });
        it ('should have mozilla rule', function() {
            expect(result['-moz-box-shadow']).toEqual('2px 3px 4px yellow');
        });

    });

    describe('phark', function() {

        it('should throw exception if not given enough parameters', function() {
            expect(phark()).toThrow('parameter missing');
        })

    });

});

