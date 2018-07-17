# Csster

<a href="https://travis-ci.org/ndp/csster" id="status-image-popup" title="build status image" name="status-images" class="open-popup">
            <img src="https://travis-ci.org/ndp/csster.svg" >
          </a>

Concisely generate CSS style rules within Javascript.  Features:

* "object literal" format with excellent editor support
* nesting to DRY up stylesheets
* color functions like `darken` and `saturate`
* built-in macros for common CSS idioms like *clearfix*, *rounded corners*, *drop shadows*.
* extension points for custom behavior or cross-browser support.
* no new syntax to learn (and fight)
* and all the plain old Javascript behavior: functions, data structures, looping, Math operations, etc.

Slideshow introduction: https://docs.google.com/present/view?id=dfm357b6_49c4d3fpdm&interval=15

## Installation

### Bundler (Rails) Installation

Add this line to your application's Gemfile:

    gem 'csster'

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install csster

For Rails, within your `application.js`, add

    //= require csster


### Node NPM Install

    npm install csster

## Usage

### Creating Stylesheets (Brower/Client Side)

All code is packaged into a single Javascript file download, [csster.js](http://ndpsoftware.com/csster/csster.js). There are no external dependencies.

```javascript
require('csster.js'); // however you manage dependencies

Csster.style({
  h1: {
    fontSize: 18,
    color: 'red'
  }
});
```

The result is inserted in DOM automatically at the bottom of the &lt;head&gt; element:

```html
...
<style type="text/stylesheet">
h1 {
font-size: 18px;
color: red;
}
</style>
</head>
...
```

### Node Usage

`Csster.buildCss` accepts arrays or hashes of rules and returns a text string of the Css rules.
The caller is responsible for writing to the browser.


### Building CSS Rules

The `Csster.style` method accepts CSS rules passed either as arrays or hashes, arrays just being
a way to order the hashes. For example:

```javascript
Csster.style({
  ul: {
    margin: 5,
    padding: 0,
  }
  'ul li:first': {
    paddingLeft: '20px'
  }
}
```

Note that

* property names are automatically converted to hyphenated format from camelCase, so in many cases you can omit the quotation marks. (`float` needs to quoted since it's a reserved word.)
* most raw numbers are assumed to be "pixels" (or "px"), and rendered as such. A heuristic helps in this, skipping `opacity`, `z-index`, etc.
* any sort of selectors are allowed... they are just passed through to the stylesheet.

#### Nesting
Csster supports nesting of rules to keep things more concise:

```javascript
{
  ul: {
    margin: 5,
    li: {
      paddingLeft: 20,
      '&:hover': {
        color: 'red'
      }
    }
  }
}
```

The "li" property in this case might be a selector or might be a property name. A list of valid
property names is used to identify properties right now, and otherwise it's considered a sub-selector.

Csster supports SASS's `&` operator, to indicate that the selector should be combined with the parent selector.
Instead of the default "any descendent" space character being inserted, no space is inserted.

Combined rules (with commas) are expanded as expected, so nested rules with commas have their parents expanded.


#### Functions
Most manipulations you'll want don't require any special syntax. They will fall into
Javascript's language support, as far as any math or looping.
Use Javascript to write necessary functions! Include them directly in the
CSS rule definitions.


#### Colors

Colors can be particularly brittle in CSS, so color conversion functions are included.
The easiest way to enable this is to call:

    Csster.colorizeString()

Now the `String` prototype will include SASS-like color functions:

*  `"#ab342c".darken(%)` -- make color darker by given percent
*  `"#ab342c".lighten(%)` -- make color lighter by given percent
*  `"#ab342c".saturate(%)`  -- make color more saturated by given percent. To *desaturate*, use negative values for the percent. Note that `"#ab342c".saturate(-100)` renders in grayscale.

There are also color conversion routines if you want to build your own manipulation.

*  `"#ab342c".toRGB()`
*  `"#ab342c".toHSL()`
*  `Csster.hslToHexColor(h,s,l)`

Opacity is currently not supported by the color model.

### Macros

Although the Javascript language probably offers enough flexibility for most of what you
want, macros are also a core part of Csster.

#### Pre-build Macros

There are a host of pre-made macros that may be useful:

* `Csster.macros.roundedCorners(radius)` -- add rounded corners on all sides
* `Csster.macros.roundedCorners(side, radius)` -- add rounded corners on specified side: `'top'`, `'left'`, `'bottom'` or `'right'`
* `Csster.macros.roundedCorners(corner, radius)` -- add rounded corners to a specified corner: `'tl'`, `'tr'`, `'bl'` or `'br'`
* `Csster.macros.imageReplacement(width, height, img, imgXPosition=0, imgYPosition=0)` -- phark image replacement with optional background image offset.
* `Csster.macros.boxShadow([xoffset, yoffset], radius, color)`
* `Csster.macros.verticalCentering(height)` and `horizontalCentering(width)` -- center using the top 50% / margin-top -width/2 technique. See http://stackoverflow.com/questions/148251/css-centering-tricks
* `Csster.macros.clearfix()` -- standard clearfix
* `Csster.browserInfo()` -- basic information about the current browser, if available. Useful for generating alternative rules.

#### Using macros with the "has" or "mixin" key

To "mix these in", use the `has`, `mixin` or `mixins` key:

    {
        'div#featured_box': {
          backgroundColor: '#394c89',
          has: roundedCorner(5)
        }
    }

Multiple macros can be included by making that a list, eg. `has: [roundedCorners(5), dropShadow()]`.

#### Using macros with fake property names

You can also make these _pseudo properties_ using the `Csster.setMacro` method. For example,

```javascript
Csster.setMacro('roundedCorners', (px) => {
  return { borderRadius: px }
})
```

As you might expect, this defines a property that is rendered with the given function. Therefore:

```javascript
...
Csster.style({ div: roundedCorners: 5 })
```

#### Writing Macros

It's all Javascript, so macros and more complex functions are easy to write.
To mix in a set of values, create a function that returns a hash of values, for example:

```javascript
function roundedCorners(radius) {
  return {
    '-webkit-border-radius': radius,
    '-moz-border-radius': radius,
    'border-radius': radius
  }
}
```

A macro's properties will be overwritten  similar to how the cascade takes the last defined value: later ones override earlier ones.


## Verification

By default, property names are validated against recent HTML specs.
The build-in tool rejects non-standard property names,
although by default popular "-moz" and "-webkit" properties are added.
Use `Csster.addPropertyNames` to supplement property names it might not
consider valid.

At this time of history, though, validation is not necessarily what you want.
To turn this off, use:

```javascript
Csster.propertyNameValidator.setConfig('strictNames', false)
```

By default, any browser extension property (such as `-moz-boo`) is allowed. To
restrict this, turn on the validation:

```javascript
Csster.propertyNameValidator.setConfig('anyBrowserExtension', false)
```

## jQuery Integration

If jQuery is loaded before Csster, it provides a "csster" plugin:

```javascript
$('.sidebar').csster({ border: '5px solid green', padding: 10 });
```

As expected, this adds a rule to the document with the ".sidebar" selector.
In general, this can be called identically to the `css()` function.
This is useful is the DOM on the page is dynamic and when a rule is more efficient than applying
a style repeatedly to all the DOM nodes.

There are a few limitations: Currently a "context" is not supported.
And be careful, since not all jQuery selectors are valid CSS selectors--
nothing is done to convert or report unsupported selectors (just like regular CSS).

## Extending Csster

### Inserting into the DOM
Function that outputs a set of rules into the DOM is `Csster.insertCss` and can be replaced if desired.

## V2.0 Changes

### To upgrade from 1.0 or before

* Change `Csster.browser` to call `Csster.browserInfo()`, which returns the same thing.
* Change `has:` macro implementations to `mixin:`.

### Other changes:

* use ES6 for implementation and provide a more compressed and clean script.
* fake-property-based macros
* add ability to turn off property name validation.
* add ability to warn about unknown browser extensions for property names.


## Links

* [Demo of the color functions and macros](http://ndpsoftware.com/csster/demo.html)
* [Demo of using to build a chart](http://ndpsoftware.com/csster/demo_chart.html)
* [Blog post](http://ndpsoft.blogspot.com/2010/09/introducing-csster.html)


## Development

### Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


## Releasing

1. Make changes
2. Update `bin/build.sh#2` `VERSION=` code.
3. `bin/build.sh`
4. `rake build`
5. `git checkin...`
6. `git push...`
7. `rake release` # Ruby Gem
8. `npm publish`  # Node module


### TDD

The design was driven by the specs.

There are now two sets of tests. The first are unit and out-of-browser functional tests run with jasmine. If your npm paths are set up correctly, `jasmine` should do it.

There's also an (older) in-browser test, in `demo/functional_runner.html`. Opening this in a browser should do it.

Finally, there are a couple manual "demo" files that need to be examined in a browser, to make sure they are working. These are in the demo folder.

### Building

`./bin/build.sh`



## Todo

* decompile existing stylesheets



## Motivation

This project comes from my frustration of trying to build standalone Javascript widgets. Web
projects always involve the combination of HTML DOM, CSS and Javascript. It's often simpler to
generate the necessary DOM within your Javascript, removing any coupling (and a simpler calling
convention) to a specific web page. But most widgets have certain style rules. To avoid
any coupling with the CSS at all, styles can be included inline, but these gets bulky
and hard to read. The "rule" nature of CSS is nice. So widgets then have a Javascript
and CSS component. Wouldn't it be nice, though, to remove that CSS component.

With the advent of SASS, the coupling is even more complicated, as now there's some other
tool completely unrelated to your component, written in some other language. Wouldn't
a unified approach be nice?


## Similar projects

http://revnode.com/oss/css/

## Legal

Copyright (c) 2010-2016 Andrew J. Peterson
[Apache License](https://github.com/ndp/csster/raw/master/LICENSE)
