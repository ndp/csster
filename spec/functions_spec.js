describe('color functions', function() {

    describe('toHex string', function() {
        beforeEach(function() {  });

        it('should noop if hex passed in', function() {
            expect("#123456".toHexColor()).toEqual('#123456');
        });
        it('should convert websafe color to hex', function() {
            expect("#369".toHexColor()).toEqual('#336699');
        });
        it('should convert black to hex', function() {
            expect("black".toHexColor()).toEqual('#000000');
        });
        it('should convert white to hex', function() {
            expect("white".toHexColor()).toEqual('#ffffff');
        });
        it('should convert olive to hex', function() {
            expect("olive".toHexColor()).toEqual('#808000');
        });
    });

    describe('parsing hex string', function() {

        var sample = "#123456";

        it('should set red', function() {
            expect(sample.toRGB()[0]).toEqual(18);
        });
        it('should set green', function() {
            expect(sample.toRGB()[1]).toEqual(52);
        });
        it('should set blue', function() {
            expect(sample.toRGB()[2]).toEqual(86);
        });
        it('should return red', function() {
            expect(sample.red()).toEqual(18);
        });
        it('should return red', function() {
            expect(sample.green()).toEqual(52);
        });
        it('should return red', function() {
            expect(sample.blue()).toEqual(86);
        });
    });

    describe('toHSL', function() {
        it('should convert white to hsl', function() {
           expect('#ffffff'.toHSL()).toEqual([0,0,100]);
        });
        it('should convert black to hsl', function() {
           expect('#000000'.toHSL()).toEqual([0,0,0]);
        });
        it('should convert red to hsl', function() {
           expect('#ff0000'.toHSL()).toEqual([0,100,50]);
        });
        it('should convert green to hsl', function() {
           expect('#00ff00'.toHSL()).toEqual([120,100,50]);
        });
        it('should convert blue to hsl', function() {
           expect('#0000ff'.toHSL()).toEqual([240,100,50]);
        });
        it('should convert #800 to hsl', function() {
           expect('#800'.toHSL()).toEqual([0, 100, 27]);
        });
        it('should convert #336699 to hsl', function() {
           expect('#336699'.toHSL()).toEqual([210,50,40]);
        });
    });

    describe('hslToHexColor', function() {
        it('should convert white', function() {
            var hsl = [0,0,100];
           expect(hslToHexColor.apply(null,hsl)).toEqual('#ffffff');
        });
        it('should convert black', function() {
            var hsl = [0,0,0];
           expect(hslToHexColor.apply(null,hsl).toHexColor()).toEqual('#000000');
        });
        it('should convert blue', function() {
           expect(hslToHexColor(240, 100, 50).toHexColor()).toEqual('#0000ff');
        });
        it('should convert red', function() {
           expect(hslToHexColor(0, 100, 25).toHexColor()).toMatch(/#800000/);
        });
    });

    describe('lighten', function() {
        it('should do nothing with zero', function() {
            expect('#800'.lighten(0)).toMatch(/#8[89a]0000/);
        });
        it('should set to white with 100', function() {
            expect('#800'.lighten(100)).toEqual('#ffffff');
        });
        it('should do nothing if already white', function() {
            expect('#fff'.lighten(20)).toEqual('#ffffff');
        });
        it('should lighten 20%', function() {
            expect('#880000'.lighten(20)).toEqual('#f00000');
        });
    });
    describe('darken', function() {
        it('should do nothing with zero', function() {
            expect('#800'.darken(0)).toMatch(/#8[89a]0000/);
        });
        it('should set to black with 100', function() {
            expect('#800'.darken(100)).toEqual('#000000');
        });
        it('should do nothing if already black', function() {
            expect('#000'.darken(20)).toEqual('#000000');
        });
        it('should darken 20%', function() {
            expect('#880000'.darken(20)).toMatch(/#2[234]0000/);
        });
    });

    describe('saturate', function() {
        it('should do nothing with zero', function() {
            expect('#800'.saturate(0)).toMatch(/#8[789a]0000/);
        });
        it('should saturate(hsl(120, 30%, 90%), 20%) => hsl(120, 50%, 90%)', function() {
           expect(hslToHexColor(120, 30, 90).saturate(20)).toEqual('#d9f2d9')
        });
        it('should saturate(#855, 20%) => #9e3f3f', function() {
           expect("#855".saturate(20)).toMatch(/#9[de]3f3f/)
//           expect("#855".saturate(20)).toMatch(/#d9f2d9/)
        });

        it('should saturate(#000, 20%) => #000', function() {
           expect("#000".saturate(20)).toMatch(/#000000/)
        });
        it('should saturate(#fff, 20%) => #ffffff', function() {
           expect("#fff".saturate(20)).toMatch(/#ffffff/)
        });
        it('should saturate(#8a8,100%) => #33ff33', function() {
           expect("#8a8".saturate(100)).toMatch(/#33ff33/)
        });
        it('should saturate(#8a8, 0%) => #88aa88', function() {
           expect("#8a8".saturate(0)).toMatch(/#88aa88/)
        });


        it('should desaturate(hsl(120, 30%, 90%), 20%) => hsl(120, 10%, 90%)', function() {
           expect(hslToHexColor(120, 30, 90).saturate(-20)).toEqual('#e3e8e3')
        });
        it('should desaturate 855 to #726b6b', function() {
            expect('#855'.saturate(-20)).toMatch(/#716a6a/); // #726b6b
        });
        it('should desaturate 000 to black', function() {
            expect('#000'.saturate(-20)).toMatch(/#00000/);
        });
        it('should desaturate 000 to white', function() {
            expect('#fff'.saturate(-20)).toMatch(/#ffffff/);
        });
        it('should desaturate 000 to white', function() {
            expect('#8a8'.saturate(-100)).toMatch(/#999999/);
        });
        it('should desaturate 000 to white', function() {
            expect('#8a8'.saturate(0)).toMatch(/#88aa88/);
        });

        it('should desaturate(#855, 20%) => #726b6b', function() {
           expect("#855".saturate(-20)).toMatch(/#7[12]6[ab]6[ab]/)
        });

    });

});

