import linearGradient from '../../src/macros/linearGradient.es6'


describe('linearGradient', () => {

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


  describe('for mozilla', () => {
    beforeEach(() => {
      global.browserOverride = {mozilla: true, version: 3.6};
    })
    it('should handle starting point and direction', () => {
      expect(linearGradient('top', 'blue', 'white')).toEqual('-moz-linear-gradient(top, blue, white)')
      expect(linearGradient('left', 'blue', 'white')).toEqual('-moz-linear-gradient(left, blue, white)')
      expect(linearGradient('left top', 'blue', 'white')).toEqual('-moz-linear-gradient(left top, blue, white)')
    });
    it('should handle starting point and angle', () => {
      // 0deg generates a left to right horizontal gradient, while 90deg creates a vertical gradient from the bottom to the top
      expect(linearGradient('left 20deg', 'black', 'white')).toEqual('-moz-linear-gradient(left 20deg, black, white)')
    });
    it('should handle color stops', () => {
      expect(linearGradient('left', 'red', 'orange', 'yellow', 'green', 'blue')).toEqual('-moz-linear-gradient(left, red, orange, yellow, green, blue)')
      expect(linearGradient('top', 'blue', 'white 80%', 'orange')).toEqual('-moz-linear-gradient(top, blue, white 80%, orange)')
    });
    it('should handle color stops from array', () => {
      expect(linearGradient('left', ['red', 'orange', 'yellow', 'green', 'blue'])).toEqual('-moz-linear-gradient(left, red, orange, yellow, green, blue)')
    });
    it('should handle color stops from object', () => {
      expect(linearGradient('top', {
        0:   'blue',
        80:  'white',
        100: 'orange'
      })).toEqual('-moz-linear-gradient(top, blue, white 80%, orange)')
    });
  });

  describe('older webkit browsers that use -webkit-gradient', () => {

  });

  describe('IE6', () => {

  });

  describe('IE7', () => {

  });

  describe('IE8', () => {

  });

  describe('webkit prefix browsers: Chrome 10+, Saf5.1+, iOS 5+', () => {
    beforeEach(() => {
      global.browserOverride = {webkit: true, version: "535.1"};
    })
    it('should handle starting point and direction', () => {
      expect(linearGradient('top', 'blue', 'white')).toEqual('-webkit-linear-gradient(top, blue, white)')
      expect(linearGradient('left', 'blue', 'white')).toEqual('-webkit-linear-gradient(left, blue, white)')
      expect(linearGradient('left top', 'blue', 'white')).toEqual('-webkit-linear-gradient(left top, blue, white)')
    });
    it('should handle starting point and angle', () => {
      // 0deg generates a left to right horizontal gradient, while 90deg creates a vertical gradient from the bottom to the top
      expect(linearGradient('left 20deg', 'black', 'white')).toEqual('-webkit-linear-gradient(left 20deg, black, white)')
    });
    it('should handle color stops', () => {
      expect(linearGradient('left', 'red', 'orange', 'yellow', 'green', 'blue')).toEqual('-webkit-linear-gradient(left, red, orange, yellow, green, blue)')
      expect(linearGradient('top', 'blue', 'white 80%', 'orange')).toEqual('-webkit-linear-gradient(top, blue, white 80%, orange)')
    });
  });
  xdescribe('for opera', () => {
    beforeEach(() => {
      global.browserOverride = {opera: true, version: "535.1"};
    })
  });

});
