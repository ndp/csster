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
            result = boxShadow([2,3], 4, 'yellow');
        });

        it('should have CSS3 rule', function() {
            expect(result['boxShadow']).toEqual('2px 3px 4px yellow');
        });
        it('should have webkit rule', function() {
            expect(result['-webkit-box-shadow']).toEqual('2px 3px 4px yellow');
        });
        it('should have mozilla rule', function() {
            expect(result['-moz-box-shadow']).toEqual('2px 3px 4px yellow');
        });

    });

    describe('imageReplacement', function() {

        it('should throw exception if not given enough parameters', function() {
            expect(
                    function() {
                        imageReplacement()
                    }).toThrow("imageReplacement() requires width, height and img");
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


    describe('linearGradient', function() {

//#element {
//	background: -moz-linear-gradient(black, white); /* FF 3.6+ */
//        background: -ms-linear-gradient(black, white); /* IE10 */
//        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #000000), color-stop(100%, #ffffff)); /* Safari 4+, Chrome 2+ */
//        background: -webkit-linear-gradient(black, white); /* Safari 5.1+, Chrome 10+ */
//        background: -o-linear-gradient(black, white); /* Opera 11.10 */
//        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#000000', endColorstr='#ffffff'); /* IE6 & IE7 */
//        -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='#000000', endColorstr='#ffffff')"; /* IE8+ */
//        background: linear-gradient(black, white); /* the standard */
//    }
//.box_gradient {
//  background-color: #444444;
//  background-image: -webkit-gradient(linear, left top, left bottom, from(#444444), to(#999999)); /* Saf4+, Chrome */
//  background-image: -webkit-linear-gradient(top, #444444, #999999); /* Chrome 10+, Saf5.1+, iOS 5+ */
//  background-image:    -moz-linear-gradient(top, #444444, #999999); /* FF3.6 */
//  background-image:     -ms-linear-gradient(top, #444444, #999999); /* IE10 */
//  background-image:      -o-linear-gradient(top, #444444, #999999); /* Opera 11.10+ */
//  background-image:         linear-gradient(to bottom, #444444, #999999);
//}

//Internet Explorer: 6.0, 7.0, 8.0
//Mozilla/Firefox/Flock/Camino: 1.7.12, 1.8.1.3, 1.9
//Opera: 10.06, 11.01
//Safari/Webkit: 312.8, 418.9


        describe('for mozilla', function() {
            beforeEach(function() {
                Csster.browser = { mozilla: true, version: 3.6 };
            })
            it('should handle starting point and direction', function() {
                expect(linearGradient('top', 'blue', 'white')).toEqual('-moz-linear-gradient(top, blue, white)')
                expect(linearGradient('left', 'blue', 'white')).toEqual('-moz-linear-gradient(left, blue, white)')
                expect(linearGradient('left top', 'blue', 'white')).toEqual('-moz-linear-gradient(left top, blue, white)')
            });
            it('should handle starting point and angle', function() {
                // 0deg generates a left to right horizontal gradient, while 90deg creates a vertical gradient from the bottom to the top
                expect(linearGradient('left 20deg', 'black', 'white')).toEqual('-moz-linear-gradient(left 20deg, black, white)')
            });
            it('should handle color stops', function() {
                expect(linearGradient('left', 'red', 'orange', 'yellow', 'green', 'blue')).toEqual('-moz-linear-gradient(left, red, orange, yellow, green, blue)')
                expect(linearGradient('top', 'blue', 'white 80%', 'orange')).toEqual('-moz-linear-gradient(top, blue, white 80%, orange)')
            });
            it('should handle color stops from array', function() {
                expect(linearGradient('left', ['red', 'orange', 'yellow', 'green', 'blue'])).toEqual('-moz-linear-gradient(left, red, orange, yellow, green, blue)')
            });
            it('should handle color stops from object', function() {
                expect(linearGradient('top', { 0: 'blue', 80: 'white', 100: 'orange'})).toEqual('-moz-linear-gradient(top, blue, white 80%, orange)')
            });
        });

        describe('older webkit browsers that use -webkit-gradient', function() {

        });

        describe('IE6', function() {

        });

        describe('IE7', function() {

        });

        describe('IE8', function() {

        });

        describe('webkit prefix browsers: Chrome 10+, Saf5.1+, iOS 5+', function() {
            beforeEach(function() {
                Csster.browser = { webkit: true, version: "535.1"};
            })
            it('should handle starting point and direction', function() {
                expect(linearGradient('top', 'blue', 'white')).toEqual('-webkit-linear-gradient(top, blue, white)')
                expect(linearGradient('left', 'blue', 'white')).toEqual('-webkit-linear-gradient(left, blue, white)')
                expect(linearGradient('left top', 'blue', 'white')).toEqual('-webkit-linear-gradient(left top, blue, white)')
            });
            it('should handle starting point and angle', function() {
                // 0deg generates a left to right horizontal gradient, while 90deg creates a vertical gradient from the bottom to the top
                expect(linearGradient('left 20deg', 'black', 'white')).toEqual('-webkit-linear-gradient(left 20deg, black, white)')
            });
            it('should handle color stops', function() {
                expect(linearGradient('left', 'red', 'orange', 'yellow', 'green', 'blue')).toEqual('-webkit-linear-gradient(left, red, orange, yellow, green, blue)')
                expect(linearGradient('top', 'blue', 'white 80%', 'orange')).toEqual('-webkit-linear-gradient(top, blue, white 80%, orange)')
            });
        });
        xdescribe('for opera', function() {
            beforeEach(function() {
                Csster.browser = { opera: true, version: "535.1"};
            })
        });

    });


});

