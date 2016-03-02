import { dasherizeKeys } from '../src/properties.es6'

describe('dasherizeKeys', () => {
  it('handles empty hashes', () => {
    expect(dasherizeKeys({})).toEqual({})
  })
  it('handles haserizables', () => {
    expect(dasherizeKeys({backgroundColor: 'blue'})).toEqual({'background-color': 'blue'})
  })
  it('handles non-haserizables', () => {
    expect(dasherizeKeys({color: 'blue'})).toEqual({color: 'blue'})
  })
  it('handles already hasherized', () => {
    expect(dasherizeKeys({'background-color': 'blue'})).toEqual({'background-color': 'blue'})
  })
  it('handles multiple', () => {
    expect(dasherizeKeys({borderTop: '1px solid blue', borderBottom: '1px solid red'}))
        .toEqual({'border-top': '1px solid blue', 'border-bottom': '1px solid red'})
  })
})


import { rejectUnknownKeys } from '../src/properties.es6'

describe('rejectUnknownKeys', () => {
  it('handles empty hashes', () => {
    expect(rejectUnknownKeys({}, 'none')).toEqual({})
  })
  it('handles single key', () => {
    expect(rejectUnknownKeys({'background-color': 'blue'}, 'none')).toEqual({'background-color': 'blue'})
  })
  it('raises', () => {
    expect(() => rejectUnknownKeys({'foo': 'blue'}, '.bar'))
        .toThrow('Unrecognized "foo" property name. Context: ".bar"')
  })
})