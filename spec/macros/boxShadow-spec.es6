import {boxShadow} from '../../src/macros/macros.js'


describe('boxShadow', () => {
  var result;
  beforeEach(() => {
    result = boxShadow([2, 3], 4, 'yellow');
  });

  it('should have CSS3 rule', () => {
    expect(result['boxShadow']).toEqual('2px 3px 4px yellow');
  });
  it('should have webkit rule', () => {
    expect(result['-webkit-box-shadow']).toEqual('2px 3px 4px yellow');
  });
  it('should have mozilla rule', () => {
    expect(result['-moz-box-shadow']).toEqual('2px 3px 4px yellow');
  });

});
