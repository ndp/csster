import * as subject from '../src/propertyNameValidator.es6'

describe('property name validator', function () {
  beforeEach(() => subject.setConfig('strictNames', true))
  beforeEach(() => subject.setConfig('anyBrowserExtension', true))

  describe('#error', () => {
    it('should allow adding a single property using parameters', function () {
      expect(subject.error('color')).toBeFalsy();
      expect(subject.error('zoo')).toEqual('Unrecognized "zoo" property name');
      subject.addNames('zoo');
      expect(subject.error('zoo')).toEqual(null);
    });

  })

  describe('adding a valid property', function () {

    it('should allow adding a single property using parameters', function () {
      expect(subject.validate('foo')).toBeFalsy();
      expect(subject.error('foo')).toEqual('Unrecognized "foo" property name');
      subject.addNames('foo');
      expect(subject.validate('foo')).toEqual('foo');
      expect(subject.error('foo')).toEqual(null);
    });

    it('should allow adding multiple properties passed as parameters', function () {
      expect(subject.validate('blip')).toBeFalsy();
      expect(subject.validate('blop')).toBeFalsy();
      subject.addNames('blip', 'blop');
      expect(subject.validate('blip')).toEqual('blip');
      expect(subject.validate('blop')).toEqual('blop');
    });
    it('should allow adding a multiple properties using an array', function () {
      expect(subject.validate('bar')).toBeFalsy();
      expect(subject.validate('baz')).toBeFalsy();
      subject.addNames(['bar', 'baz']);
      expect(subject.validate('bar')).toEqual('bar');
      expect(subject.validate('baz')).toEqual('baz');
    });
  });

  describe('turning off validation', () => {
    beforeEach(() => subject.setConfig('strictNames', false))
    it('should allow unknown', function () {
      expect(subject.validate('dummy')).toEqual('dummy');
    });
  })

  describe('turning off any browser extension', () => {
    it('should allow unknown', function () {
      expect(subject.error('-moz-dummy')).toEqual(null)
      subject.setConfig('anyBrowserExtension', false)
      expect(subject.error('-moz-dummy')).toEqual('Unrecognized "-moz-dummy" browser extension property name')
    });
  })

});
