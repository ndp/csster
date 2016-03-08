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
      expect(subject.error('foo')).toEqual('Unrecognized "foo" property name');
      subject.addNames('foo');
      expect(subject.error('foo')).toEqual(null);
    });

    it('should allow adding multiple properties passed as parameters', function () {
      expect(subject.error('blop')).toEqual('Unrecognized "blop" property name')
      subject.addNames('blip', 'blop');
      expect(subject.error('blip')).toEqual(null);
      expect(subject.error('blop')).toEqual(null);
    });
    it('should allow adding a multiple properties using an array', function () {
      expect(subject.error('bar')).toEqual('Unrecognized "bar" property name')
      expect(subject.error('baz')).toEqual('Unrecognized "baz" property name')
      subject.addNames(['bar', 'baz']);
      expect(subject.error('bar')).toEqual(null);
      expect(subject.error('baz')).toEqual(null);
    });
  });

  describe('turning off validation', () => {
    beforeEach(() => subject.setConfig('strictNames', false))
    it('should allow unknown', function () {
      expect(subject.error('dummy')).toEqual(null);
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
