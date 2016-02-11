import {propertyNameOf} from '../src/propertyName.es6'

describe('#propertyNameOf', function() {
  it('should convert fontFamily to font-family', function() {
    expect(propertyNameOf('fontFamily')).toEqual("font-family");
  });
  it('should return font-family without change', function() {
    expect(propertyNameOf('font-family')).toEqual("font-family");
  });

  var props = 'background-color font font-family'.split(' ');
  for (var i = 0; i < props.length; i++) {
    var name = props[i];
    it('should return ' + name + '', function() {
      expect(propertyNameOf(name)).toEqual(name);
    });
  }
  it('should return z-index', function() {
    expect(propertyNameOf('zIndex')).toEqual('z-index');
  });

  it('should return nil for invalid property names', function() {
    expect(propertyNameOf('abc')).toEqual(null);
    expect(propertyNameOf('#my_id')).toEqual(null);
    expect(propertyNameOf('p')).toEqual(null);
    expect(propertyNameOf('p.clas')).toEqual(null);
    expect(propertyNameOf('p.cls:active whatever')).toEqual(null);
  });
});
