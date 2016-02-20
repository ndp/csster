import {hslToHexColor, colorizeString} from '../src/functions/color.es6'

describe('color functions', () => {

  beforeEach(colorizeString)

  describe('toHex string', () => {

    it('should noop if hex passed in', () => {
      expect("#123456".toHexColor()).toEqual('#123456');
    });
    it('should convert websafe color to hex', () => {
      expect("#369".toHexColor()).toEqual('#336699');
    });
    it('should convert black to hex', () => {
      expect("black".toHexColor()).toEqual('#000000');
    });
    it('should convert white to hex', () => {
      expect("white".toHexColor()).toEqual('#ffffff');
    });
    it('should convert olive to hex', () => {
      expect("olive".toHexColor()).toEqual('#808000');
    });
  });

  describe('parsing hex string', () => {

    var sample = "#123456";

    it('should set red', () => {
      expect(sample.toRGB()[0]).toEqual(18);
    });
    it('should set green', () => {
      expect(sample.toRGB()[1]).toEqual(52);
    });
    it('should set blue', () => {
      expect(sample.toRGB()[2]).toEqual(86);
    });
    it('should return red', () => {
      expect(sample.red()).toEqual(18);
    });
    it('should return red', () => {
      expect(sample.green()).toEqual(52);
    });
    it('should return red', () => {
      expect(sample.blue()).toEqual(86);
    });
  });

  describe('toHSL', () => {
    it('should convert white to hsl', () => {
      expect('#ffffff'.toHSL()).toEqual([0, 0, 100]);
    });
    it('should convert black to hsl', () => {
      expect('#000000'.toHSL()).toEqual([0, 0, 0]);
    });
    it('should convert red to hsl', () => {
      expect('#ff0000'.toHSL()).toEqual([0, 100, 50]);
    });
    it('should convert green to hsl', () => {
      expect('#00ff00'.toHSL()).toEqual([120, 100, 50]);
    });
    it('should convert blue to hsl', () => {
      expect('#0000ff'.toHSL()).toEqual([240, 100, 50]);
    });
    it('should convert #800 to hsl', () => {
      expect('#800'.toHSL()).toEqual([0, 100, 27]);
    });
    it('should convert #336699 to hsl', () => {
      expect('#336699'.toHSL()).toEqual([210, 50, 40]);
    });
  });

  describe('hslToHexColor', () => {
    it('should convert white', () => {
      var hsl = [0, 0, 100];
      expect(hslToHexColor.apply(null, hsl)).toEqual('#ffffff');
    });
    it('should convert black', () => {
      var hsl = [0, 0, 0];
      expect(hslToHexColor.apply(null, hsl).toHexColor()).toEqual('#000000');
    });
    it('should convert blue', () => {
      expect(hslToHexColor(240, 100, 50).toHexColor()).toEqual('#0000ff');
    });
    it('should convert red', () => {
      expect(hslToHexColor(0, 100, 25).toHexColor()).toMatch(/#800000/);
    });
  });

  describe('lighten', () => {
    it('should do nothing with zero', () => {
      expect('#800'.lighten(0)).toMatch(/#8[89a]0000/);
    });
    it('should set to white with 100', () => {
      expect('#800'.lighten(100)).toEqual('#ffffff');
    });
    it('should do nothing if already white', () => {
      expect('#fff'.lighten(20)).toEqual('#ffffff');
    });
    it('should lighten 20%', () => {
      expect('#880000'.lighten(20)).toEqual('#f00000');
    });
  });
  describe('darken', () => {
    it('should do nothing with zero', () => {
      expect('#800'.darken(0)).toMatch(/#8[89a]0000/);
    });
    it('should set to black with 100', () => {
      expect('#800'.darken(100)).toEqual('#000000');
    });
    it('should do nothing if already black', () => {
      expect('#000'.darken(20)).toEqual('#000000');
    });
    it('should darken 20%', () => {
      expect('#880000'.darken(20)).toMatch(/#2[234]0000/);
    });
  });

  describe('saturate', () => {
    it('should do nothing with zero', () => {
      expect('#800'.saturate(0)).toMatch(/#8[789a]0000/);
    });
    it('should saturate(hsl(120, 30%, 90%), 20%)', () => {
      expect(hslToHexColor(120, 30, 90).saturate(20)).toEqual('#d9f2d9')
    });
    it('should saturate(#855, 20%) => #9e3f3f', () => {
      expect("#855".saturate(20)).toMatch(/#9[de]3f3f/)
    });

    it('should saturate(#000, 20%) => #000', () => {
      expect("#000".saturate(20)).toMatch(/#000000/)
    });
    it('should saturate(#fff, 20%) => #ffffff', () => {
      expect("#fff".saturate(20)).toMatch(/#ffffff/)
    });
    it('should saturate(#8a8,100%) => #33ff33', () => {
      expect("#8a8".saturate(100)).toMatch(/#33ff33/)
    });
    it('should saturate(#8a8, 0%) => #88aa88', () => {
      expect("#8a8".saturate(0)).toMatch(/#88aa88/)
    });


    it('should desaturate(hsl(120, 30%, 90%), 20%) => hsl(120, 10%, 90%)', () => {
      expect(hslToHexColor(120, 30, 90).saturate(-20)).toEqual('#e3e8e3')
    });
    it('should desaturate 855 to #726b6b', () => {
      expect('#855'.saturate(-20)).toMatch(/#716a6a/); // #726b6b
    });
    it('should desaturate 000 to black', () => {
      expect('#000'.saturate(-20)).toMatch(/#000000/);
    });
    it('should desaturate 000 to white', () => {
      expect('#fff'.saturate(-20)).toMatch(/#ffffff/);
    });
    it('should desaturate 000 to white', () => {
      expect('#8a8'.saturate(-100)).toMatch(/#999999/);
    });
    it('should desaturate(#855, 20%) => #726b6b', () => {
      expect("#855".saturate(-20)).toMatch(/#716a6a/)
    });

  });

});

