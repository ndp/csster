describe('Array#flatten', function() {
    it('should do nothing with empty array', function() {
        expect([].flatten()).toEqual([]);
    });
    it('should do nothing with flat array', function() {
        expect([1,2].flatten()).toEqual([1,2]);
    });
    it('should flatten one level', function() {
        expect([1,[2]].flatten()).toEqual([1,2]);
    });
    it('should flatten N levels', function() {
        expect([1,[2,[3,[4]]]].flatten()).toEqual([1,2,3,4]);
    });
});

describe('extend', function() {

});