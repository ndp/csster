describe('macros', function() {
    describe('roundedCorners', function() {
        it('should provide a default curvature of 10', function() {
            expect(roundedCorners()).toEqual({ '-moz-border-radius' : 10, 'border-radius' : 10, '-webkit-border-radius' : 10 });
        });
        it('should respect input radius', function() {
            expect(roundedCorners(5)).toEqual({ '-moz-border-radius' : 5, 'border-radius' : 5, '-webkit-border-radius' : 5 });
        });
        it('should curve all corners when asked explicitly', function() {
            expect(roundedCorners('all', 7)).toEqual({ '-moz-border-radius' : 7, 'border-radius' : 7, '-webkit-border-radius' : 7 });
        });
        it('should curve just top left corner', function() {
            expect(roundedCorners('tl', 7)).toEqual({ '-moz-border-radius-topleft' : 7, 'border-top-left-radius' : 7, '-webkit-border-top-left-radius' : 7 });
        });
        it('should curve both top side corners', function() {
            expect(roundedCorners('top', 7)).toEqual({ '-moz-border-radius-topleft' : 7, 'border-top-left-radius' : 7, '-webkit-border-top-left-radius' : 7,
            '-moz-border-radius-topright' : 7, 'border-top-right-radius' : 7, '-webkit-border-top-right-radius' : 7});
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

    describe('vertical centering', function() {
        var rules;
        beforeEach(function() {
            rules = verticalCentering(10)
        });
        it('should set the height', function() {
            expect(rules.height).toEqual(10);
        });
        it('should set top to 50%', function() {
            expect(rules.top).toEqual('50%');
        });
        it('should set margin top to compensate for half of the height', function() {
            expect(rules.marginTop).toEqual(-5);
        });
    });

    describe('horizontal centering', function() {
        var rules;
        beforeEach(function() {
            rules = horizontalCentering(100)
        });
        it('should set the width', function() {
            expect(rules.width).toEqual(100);
        });
        it('should set top to 50%', function() {
            expect(rules.left).toEqual('50%');
        });
        it('should set margin left to compensate for half of the width', function() {
            expect(rules.marginLeft).toEqual(-50);
        });
    });

    describe('clearfix', function() {
        var rules;
        beforeEach(function() {
            rules = clearfix()
        });
        it('should set :after element to clear (which is why we are here)', function() {
            expect(rules['&:after'].clear).toEqual('both');
        });
        it('should set content', function() {
            expect(rules['&:after'].content).toEqual(' ');
        });
        it('should set visibility', function() {
            expect(rules['&:after'].visibility).toEqual('hidden');
        });
        it('should set sizes to 0', function() {
            expect(rules['&:after'].width).toEqual(0);
            expect(rules['&:after'].height).toEqual(0);
            expect(rules['&:after'].lineHeight).toEqual(0);
            expect(rules['&:after'].fontSize).toEqual(0);
        });
        it('should set the element to inline-block (for IE?)', function() {
            expect(rules.display).toEqual('inline-block');
        });
    });



});

