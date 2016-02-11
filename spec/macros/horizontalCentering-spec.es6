import horizontalCentering from '../../src/macros/horizontalCentering.es6'


describe('horizontal centering', () => {
  var rules;
  beforeEach(() => {
    rules = horizontalCentering(100)
  });
  it('should set the width', () => {
    expect(rules.width).toEqual(100);
  });
  it('should set top to 50%', () => {
    expect(rules.left).toEqual('50%');
  });
  it('should set margin left to compensate for half of the width', () => {
    expect(rules.marginLeft).toEqual(-50);
  });
});
