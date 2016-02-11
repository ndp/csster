import clearfix from '../../src/macros/clearfix.es6'

describe('clearfix', () => {
  var rules;
  beforeEach(() => {
    rules = clearfix()
  });
  it('should set :after element to clear (which is why we are here)', () => {
    expect(rules['&:after'].clear).toEqual('both');
  });
  it('should set content', () => {
    expect(rules['&:after'].content).toEqual(' ');
  });
  it('should set visibility', () => {
    expect(rules['&:after'].visibility).toEqual('hidden');
  });
  it('should set sizes to 0', () => {
    expect(rules['&:after'].width).toEqual(0);
    expect(rules['&:after'].height).toEqual(0);
    expect(rules['&:after'].lineHeight).toEqual(0);
    expect(rules['&:after'].fontSize).toEqual(0);
  });
  it('should set the element to inline-block (for IE?)', () => {
    expect(rules.display).toEqual('inline-block');
  });
});

