import {mergeHashInto} from '../../src/utils/object.es6'


describe('mergeHashInto', () => {

  it('should merge no hashes into nothing', () => {
    var h = {}
    mergeHashInto(h);
    expect(h).toEqual({});
  });
  it('should merge empty hashes into nothing', () => {
    var h = {}
    mergeHashInto(h, {});
    expect(h).toEqual({});
  });
  it('should merge 2 empty hashes into nothing', () => {
    var h = {}
    mergeHashInto(h, {}, {});
    expect(h).toEqual({});
  });
  it('should merge nothing into result', () => {
    var h = {prop: 1}
    mergeHashInto(h, {});
    expect(h).toEqual({prop: 1});
  });
  it('should merge prop in first into result', () => {
    var h = {};
    mergeHashInto(h, {prop: 1});
    expect(h).toEqual({prop: 1});
  });
  it('should merge prop in second into result', () => {
    var h = {prop: 1};
    mergeHashInto(h, {prop: 2});
    expect(h).toEqual({prop: 2});
  });
  it('should merge two prop into result', () => {
    var h = {propA: 1};
    mergeHashInto(h, {propB: 2});
    expect(h).toEqual({propA: 1, propB: 2});
  });
  it('should merge second param should win', () => {
    var h = {propA: 1};
    mergeHashInto(h, {propB: 2}, {propC: 3});
    expect(h).toEqual({propA: 1, propB: 2, propC: 3});
  });

});


import {filterValuesRecursively} from '../../src/utils/object.es6'

describe('filterValuesRecursively', () => {

  const bracket = (value)=> {
    if (typeof value == 'string')
      return '[' + value + ']'
    else
      return value
  }

  it('provides key and value to filter fn', () => {
    const f = jasmine.createSpy('fake filter')
    filterValuesRecursively(f, {aKey: 'aValue'})
    expect(f).toHaveBeenCalledWith('aValue', 'aKey')
  })

  it('calls for each property value', () => {
    const f = jasmine.createSpy('fake filter')
    filterValuesRecursively(f, {aKey: 'aValue', bKey: 'bValue'})
    expect(f.calls.count()).toEqual(2)
  })

  it('applies property filter', () => {
    expect(filterValuesRecursively(bracket, {aKey: 'aValue'}))
        .toEqual({aKey: '[aValue]'})
  })

  it('applies property filter one level', () => {
    expect(filterValuesRecursively(bracket, {aKey: {bKey: 'bValue'}}))
        .toEqual({aKey: {bKey: '[bValue]'}})
  })

  it('applies property filter two levels', () => {
    expect(filterValuesRecursively(bracket, {aKey: {bKey: {cKey: 'cValue'}}}))
        .toEqual({aKey: {bKey: {cKey: '[cValue]'}}})
  })

  it('can be curried', () => {
    const fooBar = filterValuesRecursively(bracket)
    expect(fooBar({'.sel': {ignore: 'me'}}))
        .toEqual({'.sel': {ignore: '[me]'}})
  })
})


import {filterObjectsRecursively} from '../../src/utils/object.es6'

describe('filterObjectsRecursively', () => {

  const bracket = (obj)=> {
    let result = {}
    for (let key in obj) {
      const value = obj[key]
      if (typeof value == 'string')
        result[key] = '[' + value + ']'
      else
        result[key] = value
    }
    return result
  }

  it('provides key and value to filter fn', () => {
    const f = jasmine.createSpy('fake filter')
    filterObjectsRecursively(f, {aKey: 'aValue'})
    expect(f).toHaveBeenCalledWith({aKey: 'aValue'})
  })

  it('calls for each object', () => {
    const f = jasmine.createSpy('fake filter')
    filterObjectsRecursively(f, {aKey: 'aValue', bKey: 'bValue'})
    expect(f.calls.count()).toEqual(1)
  })

  it('applies property filter', () => {
    expect(filterObjectsRecursively(bracket, {aKey: 'aValue'}))
        .toEqual({aKey: '[aValue]'})
  })

  it('applies property filter one level', () => {
    expect(filterObjectsRecursively(bracket, {aKey: {bKey: 'bValue'}}))
        .toEqual({aKey: {bKey: '[bValue]'}})
  })

  it('applies property filter two levels', () => {
    expect(filterObjectsRecursively(bracket, {aKey: {bKey: {cKey: 'cValue'}}}))
        .toEqual({aKey: {bKey: {cKey: '[cValue]'}}})
  })

  it('can be curried', () => {
    const fooBar = filterObjectsRecursively(bracket)
    expect(fooBar({'.sel': {ignore: 'me'}}))
        .toEqual({'.sel': {ignore: '[me]'}})
  })
})


import {applyToKeys} from '../../src/utils/object.es6'

describe('applyToKeys', () => {
  it('applies to each key', () => {
    expect(applyToKeys((x) => '['+x+']',{'.sel': {ignore: 'me'}}))
        .toEqual({'[.sel]': {ignore: 'me'}})
  })
  it('can be curried', () => {
    const fooBar = applyToKeys(() => 'x')
    expect(fooBar({'.sel': {ignore: 'me'}}))
        .toEqual({'x': {ignore: 'me'}})
  })
})

