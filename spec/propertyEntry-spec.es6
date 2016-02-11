import * as propertyEntry from '../src/propertyEntry.es6'


describe('propertyEntry#format', function() {
  it('should render font family', function() {
    expect(propertyEntry.format('fontFamily', 'serif')).toEqual("font-family: serif;\r");
  });
  it('should render raw number as "px" value', function() {
    expect(propertyEntry.format('height', 12)).toEqual("height: 12px;\r");
  });
  it('should understand opacity', function() {
    expect(propertyEntry.format('opacity', .5)).toEqual("opacity: 0.5;\r");
  });
  it('should understand zoom', function() {
    expect(propertyEntry.format('zoom', 1)).toEqual("zoom: 1;\r");
  });
  it('should understand z-index', function() {
    expect(propertyEntry.format('z-index', 1000)).toEqual("z-index: 1000;\r");
  });
});
