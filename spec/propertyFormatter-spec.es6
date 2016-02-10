
import {propertyFormatter} from '../src/propertyFormatter.es6'

describe('#formatProperty', function() {
  it('should render font family', function() {
    expect(propertyFormatter('fontFamily', 'serif')).toEqual("font-family: serif;\r");
  });
  it('should render raw number as "px" value', function() {
    expect(propertyFormatter('height', 12)).toEqual("height: 12px;\r");
  });
  it('should understand opacity', function() {
    expect(propertyFormatter('opacity', .5)).toEqual("opacity: 0.5;\r");
  });
  it('should understand zoom', function() {
    expect(propertyFormatter('zoom', 1)).toEqual("zoom: 1;\r");
  });
  it('should understand z-index', function() {
    expect(propertyFormatter('z-index', 1000)).toEqual("z-index: 1000;\r");
  });
});
