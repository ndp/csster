import {arrayFlatten} from '../../src/utils/array.es6'


describe('arrayFlatten', () => {
  it('should do nothing with empty array', () => {
    expect(arrayFlatten([])).toEqual([]);
  });
  it('should do nothing with flat array', () => {
    expect(arrayFlatten([1, 2])).toEqual([1, 2]);
  });
  it('should flatten one level', () => {
    expect(arrayFlatten([1, [2]])).toEqual([1, 2]);
  });
  it('should flatten N levels', () => {
    expect(arrayFlatten([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]);
  });
});
