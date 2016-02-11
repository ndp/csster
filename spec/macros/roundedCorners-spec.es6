import roundedCorners from '../../src/macros/roundedCorners.es6'


describe('roundedCorners', () => {
  it('should provide a default curvature of 10', () => {
    expect(roundedCorners()).toEqual({'-moz-border-radius': 10, 'border-radius': 10, '-webkit-border-radius': 10});
  });
  it('should respect input radius', () => {
    expect(roundedCorners(5)).toEqual({'-moz-border-radius': 5, 'border-radius': 5, '-webkit-border-radius': 5});
  });
  it('should curve all corners when asked explicitly', () => {
    expect(roundedCorners('all', 7)).toEqual({
      '-moz-border-radius':    7,
      'border-radius':         7,
      '-webkit-border-radius': 7
    });
  });
  it('should curve just top left corner', () => {
    expect(roundedCorners('tl', 7)).toEqual({
      '-moz-border-radius-topleft':     7,
      'border-top-left-radius':         7,
      '-webkit-border-top-left-radius': 7
    });
  });
  it('should curve both top side corners', () => {
    expect(roundedCorners('top', 7)).toEqual({
      '-moz-border-radius-topleft':  7, 'border-top-left-radius': 7, '-webkit-border-top-left-radius': 7,
      '-moz-border-radius-topright': 7, 'border-top-right-radius': 7, '-webkit-border-top-right-radius': 7
    });
  });
});
