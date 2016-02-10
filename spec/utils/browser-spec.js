
describe('userAgent', function () {

  it("should report that it's running in a browser", function () {
    expect(Csster.browser).not.toBeUndefined();
  });
  if (/AppleWebKit/.test(navigator.userAgent)) {
    it("should report that it's running in webkit", function () {
      expect(Csster.browser.webkit).not.toBeUndefined();
    });
    it("should report that it's not running in firefox", function () {
      expect(Csster.browser.mozilla).toBeUndefined();
    });
  }
  if (/^Mozilla/.test(navigator.userAgent) && !/AppleWebKit/.test(navigator.userAgent)) {
    it("should report that it's not running in webkit", function () {
      expect(Csster.browser.webkit).toBeUndefined();
    });
    it("should report that it's running in firefox", function () {
      expect(Csster.browser.mozilla).not.toBeUndefined();
    });
  }
  it("should report that it's not running in opera", function () {
    expect(Csster.browser.opera).toBeUndefined();
  });

});