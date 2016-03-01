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
  it('applies property filter', () => {
    const fn = ()=> {
      return {foo: 'bar'}
    }
    expect(filterValuesRecursively(fn, {'.sel': {ignore: 'me'}}))
        .toEqual({'.sel': {foo: 'bar'}})
  })

  it('can be curried', () => {
    const fn = ()=> {
      return {foo: 'bar'}
    }
    const fooBar = filterValuesRecursively(fn)
    expect(fooBar({'.sel': {ignore: 'me'}}))
        .toEqual({'.sel': {foo: 'bar'}})
  })
})