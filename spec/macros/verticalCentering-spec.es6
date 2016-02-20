import verticalCentering from '../../src/macros/verticalCentering.es6'

describe('vertical centering', () => {
  var rules;
  beforeEach(() => {
    rules = verticalCentering(10)
  });
  it('should set the height', () => {
    expect(rules.height).toEqual(10);
  });
  it('should set top to 50%', () => {
    expect(rules.top).toEqual('50%');
  });
  it('should set margin top to compensate for half of the height', () => {
    expect(rules.marginTop).toEqual(-5);
  });
});

