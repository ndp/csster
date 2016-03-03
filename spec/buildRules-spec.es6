import buildRules from '../src/buildRules.es6'


describe('#buildRules', function () {

  it("should output style rule from element name", function () {
    expect(buildRules({
      p: {
        fontFamily: 'serif'
      }
    })).toEqual([
      {sel: "p", props: {'font-family': 'serif'}}
    ]);
  });

  it("should output style rule from element.class name", function () {
    expect(buildRules({
      'div.cls': {
        height: '235px'
      }
    })).toEqual([
      {sel: "div.cls", props: {"height": "235px"}}
    ]);
  });

  it("should output multiple properties", function () {
    expect(buildRules({
      'div.cls': {
        height: '235px',
        width:  '300px'
      }
    })).toEqual([
      {
        sel: "div.cls", props: {
        height: '235px',
        width:  '300px'
      }
      }
    ]);
  });

  it('should throw an exception if discovers a bugus properties', function () {
    expect(
        function () {
          buildRules({
            div: {
              bogus: 'property_value'
            }
          })
        }).toThrow('Unrecognized "bogus" property name. Context: "div"');
  });

  it('should throw an exception if discovers a bugus property within other valid ones', function () {
    expect(
        function () {
          buildRules({
            '#tooltip': {
              'div.body':      {
                textAlign: 'center'
              },
              backgroundColor: '#eee',
              opacityness:     0.85
            }
          })
        }).toThrow('Unrecognized "opacityness" property name. Context: "#tooltip"');
  });

  it("should output properties and sub-selectors", function () {
    expect(buildRules({
          ul: {
            width: '300px',
            li:    {
              padding:    '20px',
              marginLeft: '-20px'
            }
          }
        })
    ).
        toEqual([
          {sel: 'ul', props: {width: '300px'}},
          {sel: 'ul li', props: {padding: '20px', 'margin-left': '-20px'}}
        ]);
  });

  it("should handle commas and spaces in nested selectors", function () {
    expect(buildRules({
          ul: {
            width:             '300px',
            'li.even, li.odd': {
              padding: '20px'
            }
          }
        })
    ).
        toEqual([
          {sel: 'ul', props: {width: '300px'}},
          {sel: 'ul li.even,ul li.odd', props: {padding: '20px'}}
        ]);
  });

  it("should handle commas within pseudo-classes", function () {
    var processed = buildRules({
      div: {
        'a:link,a:visited,a:hover': {
          color: 'blue'
        }
      }
    });
    expect(processed.length).toEqual(1);
    expect(processed[0].sel).toEqual('div a:link,div a:visited,div a:hover');
    expect(processed).
        toEqual([
          {sel: 'div a:link,div a:visited,div a:hover', props: {color: 'blue'}}
        ]);
  });

  it("should interpret properties without space when & used", function () {
    expect(buildRules({
          ul: {
            width:     '300px',
            '&:hover': {
              padding: '20px'
            }
          }
        })
    ).
        toEqual([{sel: 'ul', props: {width: '300px'}}, {sel: 'ul:hover', props: {padding: '20px'}}]);
  });

  it('should process everything within a has macro, not just valid properties', function () {
    expect(
        function () {
          buildRules({
            div: {
              has: {
                bogus: 'property_value',
                sub:   {
                  color: 'red'
                }
              }
            }
          })
        }).toThrow('Unrecognized "bogus" property name. Context: "div"')
  });

});
