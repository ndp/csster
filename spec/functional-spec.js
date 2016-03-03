describe("Csster > functional >", function () {

  function resetCsster() {
    var head   = document.getElementsByTagName('HEAD')[0];
    var styles = head.getElementsByTagName('STYLE');
    for (var i = 0; i < styles.length; i++) {
      head.removeChild(styles[i]);
    }
  }


  describe("Everything together", function () {
    var logo;
    beforeEach(function () {
      var divs = document.getElementsByTagName('DIV');
      for (var i = 0; i < divs.length; i++) {
        if (divs[i].className == 'logo') {
          logo = divs[i];
        }
      }
    });
    beforeEach(resetCsster);

    describe('#style', function () {
      var originalWidth;
      beforeEach(function () {
        originalWidth = logo.clientWidth;
      });
      it('should have no element style overrides for width', function () {
        expect(logo.style.width).toEqual('');
      });
      describe('inserting the stylesheet', function () {
        beforeEach(function () {
          Csster.style({'.logo': {fontSize: '75%'}});
        });
        it('should now be narrower', function () {
          expect(logo.clientWidth).toBeLessThan(originalWidth);
        });
      });
    });
    describe('jQuery plugin', function () {
      var originalWidth;
      beforeEach(function () {
        originalWidth = logo.clientWidth;
      });
      it('should have no element style overrides for width', function () {
        expect(logo.style.width).toEqual('');
      });
      describe('call', function () {
        var $this;
        beforeEach(function () {
          $this = $('.logo').csster({fontSize: '75%'});
        });
        it('should return source jQuery object', function () {
          expect($this).toEqual($('.logo'));
        });
        it('should now be wider', function () {
          expect(logo.clientWidth).toBeLessThan(originalWidth);
        });
      });
    });

  });
});