import {propertyNameValidator} from '../src/filters/property_name_validator.js'
import {propertyNameOf} from '../src/propertyNameOf.es6'

describe('property name validator', function() {
  describe('adding a valid property', function() {

    it('should allow adding a single property using parameters', function() {
      expect(propertyNameOf('foo')).toBeFalsy();
      propertyNameValidator.addNames('foo');
      expect(propertyNameOf('foo')).toEqual('foo');
    });

    it('should allow adding multiple properties passed as parameters', function() {
      expect(propertyNameOf('blip')).toBeFalsy();
      expect(propertyNameOf('blop')).toBeFalsy();
      propertyNameValidator.addNames('blip', 'blop');
      expect(propertyNameOf('blip')).toEqual('blip');
      expect(propertyNameOf('blop')).toEqual('blop');
    });
    it('should allow adding a multiple properties using an array', function() {
      expect(propertyNameOf('bar')).toBeFalsy();
      expect(propertyNameOf('baz')).toBeFalsy();
      propertyNameValidator.addNames(['bar', 'baz']);
      expect(propertyNameOf('bar')).toEqual('bar');
      expect(propertyNameOf('baz')).toEqual('baz');
    });


  });
});
