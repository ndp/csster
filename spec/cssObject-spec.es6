import {flattenObject} from '../src/cssObject.es6'

describe('flattenObject', () => {

  const subject = flattenObject

  it('returns properties', () => {
    expect(subject({'.selector': {'float': 'left'}})).
        toEqual({'.selector': {'float': 'left'}})
  })

  it('flattens sub-selectors', () => {
    expect(subject({
      ul: {
        width: '300px',
        li:    {
          marginLeft: '-20px'
        }
      }
    })).toEqual({
      ul:      {
        width: '300px'
      },
      'ul li': {
        marginLeft: '-20px'
      }
    })
  })

  it('handles commas and spaces in nested selectors', () => {
    expect(subject({
      ul: {
        width:             '300px',
        'li.even, li.odd': {
          padding: '20px'
        }
      }
    })).toEqual({
      ul:                     {
        width: '300px',
      },
      'ul li.even,ul li.odd': {
        padding: '20px'
      }
    })
  })

  it('handles commas within pseudo-classes', () => {
    expect(subject({
      div: {
        'a:link,a:visited,a:hover': {
          color: 'blue'
        }
      }
    })).toEqual({
      'div a:link,div a:visited,div a:hover': {
        color: 'blue'
      }
    })
  })

  it('handles properties without space when & used', () => {
    expect(subject({
      ul: {
        width:     '300px',
        '&:hover': {
          padding: '20px'
        }
      }
    })).toEqual({
      'ul':       {width: '300px'},
      'ul:hover': {padding: '20px'}
    })
  })

  it('handles macros', () => {
    const mac = () => {
      return {color: 'red'}
    }
    expect(subject({
      'table.bubble_chart': {
        has: mac,
        td:  {
          has:    mac,
          height: 30,
        }
      }
    })).toEqual({
      'table.bubble_chart':    {
        has: mac
      },
      'table.bubble_chart td': {
        has:    mac,
        height: 30,
      }
    })
  })

})


import {compressSelectors} from '../src/cssObject.es6'

describe('compressSelectors', () => {
  it('removes redundant ids', () => {
    const input = {
      '#a #b #c': {width: 235}
    }
    const out   = compressSelectors(input);
    expect(out).toEqual({
      '#c': {width: 235}
    });
  });
  it('leaves classes alone', () => {
    const input = {
      '.a': {width: 235}
    }
    const out   = compressSelectors(input);
    expect(out).toEqual({
      '.a': {width: 235}
    });
  });
  it('leaves lone IDs alone', () => {
    const input = {
      '#a': {width: 235}
    }
    const out   = compressSelectors(input);
    expect(out).toEqual({
      '#a': {width: 235}
    });
  });
});


import {applyPropertiesFilter} from '../src/cssObject.es6'
import {curry} from '../src/utils/curry.es6'

describe('applyPropertiesFilter', () => {
  it('applies property filter', () => {
    const fn = ()=> {
      return {foo: 'bar'}
    }
    expect(applyPropertiesFilter(fn, {'.sel': {ignore: 'me'}}))
        .toEqual({'.sel': {foo: 'bar'}})
  })

  it('can be curried', () => {
    const fn = ()=> {
      return {foo: 'bar'}
    }
    const fooBar = curry(applyPropertiesFilter)(fn)
    expect(fooBar({'.sel': {ignore: 'me'}}))
        .toEqual({'.sel': {foo: 'bar'}})
  })
})