describe('arrayFlatten', function() {
    it('should do nothing with empty array', function() {
        expect(arrayFlatten([])).toEqual([]);
    });
    it('should do nothing with flat array', function() {
        expect(arrayFlatten([1,2])).toEqual([1,2]);
    });
    it('should flatten one level', function() {
        expect(arrayFlatten([1,[2]])).toEqual([1,2]);
    });
    it('should flatten N levels', function() {
        expect(arrayFlatten([1,[2,[3,[4]]]])).toEqual([1,2,3,4]);
    });
});

describe('mergeHashes', function() {

    it('should merge no hashes into nothing', function() {
        expect(mergeHashes()).toEqual({});
    });
    it('should merge empty hashes into nothing', function() {
        expect(mergeHashes({})).toEqual({});
    });
    it('should merge 2 empty hashes into nothing', function() {
        expect(mergeHashes({},{})).toEqual({});
    });
    it('should merge nothing into result', function() {
        expect(mergeHashes({prop: 1})).toEqual({prop: 1});
    });
    it('should merge prop in first into result', function() {
        expect(mergeHashes({prop: 1},{})).toEqual({prop: 1});
    });
    it('should merge prop in second into result', function() {
        expect(mergeHashes({},{prop: 1})).toEqual({prop: 1});
    });
    it('should merge two prop into result', function() {
        expect(mergeHashes({propA: 1},{propB: 2})).toEqual({propA: 1, propB: 2});
    });
    it('should merge second param should win', function() {
        expect(mergeHashes({propA: 1},{propA: 2})).toEqual({propA: 2});
    });
});
describe('mergeHashInto', function() {

    it('should merge no hashes into nothing', function() {
        var h = {}
        mergeHashInto(h);
        expect(h).toEqual({});
    });
    it('should merge empty hashes into nothing', function() {
        var h = {}
        mergeHashInto(h, {});
        expect(h).toEqual({});
    });
    it('should merge 2 empty hashes into nothing', function() {
        var h = {}
        mergeHashInto(h, {}, {});
        expect(h).toEqual({});
    });
    it('should merge nothing into result', function() {
        var h = {prop: 1}
        mergeHashInto(h, {});
        expect(h).toEqual({prop: 1});
    });
    it('should merge prop in first into result', function() {
        var h = {};
        mergeHashInto(h, {prop: 1});
        expect(h).toEqual({prop: 1});
    });
    it('should merge prop in second into result', function() {
        var h = {prop: 1};
        mergeHashInto(h, {prop: 2});
        expect(h).toEqual({prop: 2});
    });
    it('should merge two prop into result', function() {
        var h = {propA: 1};
        mergeHashInto(h, {propB: 2});
        expect(h).toEqual({propA: 1, propB: 2});
    });
    it('should merge second param should win', function() {
        var h = {propA: 1};
        mergeHashInto(h, {propB: 2}, {propC: 3});
        expect(h).toEqual({propA: 1, propB: 2, propC: 3});
    });

});

describe('userAgent', function() {

    it("should report that it's running in a browser", function() {
        expect(Csster.browser).not.toBeUndefined();
    });
    if (/AppleWebKit/.test(navigator.userAgent)) {
        it("should report that it's running in webkit", function() {
            expect(Csster.browser.webkit).not.toBeUndefined();
        });
        it("should report that it's not running in firefox", function() {
            expect(Csster.browser.mozilla).toBeUndefined();
        });
    }
    if (/^Mozilla/.test(navigator.userAgent) && !/AppleWebKit/.test(navigator.userAgent)) {
        it("should report that it's not running in webkit", function() {
            expect(Csster.browser.webkit).toBeUndefined();
        });
        it("should report that it's running in firefox", function() {
            expect(Csster.browser.mozilla).not.toBeUndefined();
        });
    }
    it("should report that it's not running in opera", function() {
        expect(Csster.browser.opera).toBeUndefined();
    });

});