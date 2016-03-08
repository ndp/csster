import * as subject from '../../src/utils/string.es6'

describe('dasherize', () => {
  it('lowercases', () => {
    expect(subject.dasherize('foo')).toEqual('foo')
  })
  it('inserts hyphen', () => {
    expect(subject.dasherize('fooBar')).toEqual('foo-bar')
  })
  it('skips numbers', () => {
    expect(subject.dasherize(7)).toEqual(7)
  })
  it('skips null', () => {
    expect(subject.dasherize(null)).toEqual(null)
  })
})

describe('trim', () => {
  it('noop', () => {
    expect(subject.trim('foo')).toEqual('foo')
  })
  it('spaces before', () => {
    expect(subject.trim('  foo')).toEqual('foo')
  })
  it('spaces after', () => {
    expect(subject.trim('foo  ')).toEqual('foo')
  })
  it('skips numbers', () => {
    expect(subject.trim(7)).toEqual(7)
  })
  it('skips null', () => {
    expect(subject.trim(null)).toEqual(null)
  })
})