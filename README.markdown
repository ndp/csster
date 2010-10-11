# Csster

Concisely generate CSS style rules within Javascript.  Features:

* standard "object literal"/JSON format with good editor support
* nesting to DRY up stylesheets
* color functions like <code>darken</code> and <code>saturate</code>
* built-in macros for common CSS idioms like *clearfix*, *rounded corners*, *drop shadows*.
* and all the plain old Javascript behavior: functions, data structures, looping, Math operations, etc.


## Usage

All code is packaged into a single Javascript file download, [csster.js](http://ndpsoftware.com/csster/csster.js). There are no external dependencies. The project itself is hosted on [GitHub](http://github.com/ndp/csster).

<pre>
require('csster.js'); // however you manage dependencies

Csster.style({
  h1: {
    fontSize: 18,
    color: 'red'
  }
});

...
</pre>

Result, inserted in DOM automatically at the bottom of the &lt;head&gt; element:
<pre>
...
&lt;style type="text/stylesheet"&gt;
h1 {
font-size: 18px;
color: red;
}
&lt;/style&gt;
&lt;/head&gt;
...
</pre>

### Format of CSS Rules

The *style* method accepts CSS rules passed either as arrays or hashes, arrays just being
a way to order the hashes. For example:

<pre>
{
    ul: {
      margin: 5,
      padding: 0,
    }
    'ul li:first': {
      paddingLeft: 20px
    }
}
</pre>

Note that

* property names are automatically converted to hyphenated format from camelcase, so in many cases you can omit the quotation marks. ('float' needs to quoted since it's a reserved word.)
* all raw numbers are assumed to be "pixels" (or "px"), and rendered as such.
* any sort of selectors are allowed... they are just passed through to the stylesheet.

#### Nesting
Csster supports nesting of rules to keep things more concise:
<pre>
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
</pre>

The "li" property in this case might be a selector or might be a property name. A list of valid
property names is used to identify properties right now, and otherwise it's considered a sub-selector.

Csster supports SASS's "&" operator, to indicate that the selector should be combined with the parent selector.
Instead of the default "any descendent" space character being inserted, no space is inserted.

Combined rules (with commas) are expanded as expected, so nested rules with commas have their parents expanded.

By default, rules with multiple '#'s are simplified. For example, '#a #b #c' becomes '#c'. Usually this is what you will want, but if you need the specificity you can turn this off with <code>Csster.shortCircuitIds = false</code>



#### Functions
Most manipulations will fall into Javascript's language support, as far as any math or looping. Use Javascript to write necessary functions.

function/color.js contains SASS-like color functions:

*  <code>"#ab342c".darken(%)</code> -- make color darker by given percent
*  <code>"#ab342c".lighten(%)</code> -- make color lighter by given percent
*  <code>"#ab342c".saturate(%)</code>  -- make color more saturated by given percent. To *desaturate*, use negative values for the percent. Note that <code>"#ab342c".saturate(-100)</code> renders in grayscale.

There are also color conversion routines if you want to build your own manipulation.

*  <code>"#ab342c".toRGB()</code>
*  <code>"#ab342c".toHSL()</code>
*  <code>Csster.hslToHexColor(h,s,l)</code>

Opacity is currently not supported by the color model.

#### Macros using "has" key

There are a host of pre-made macros that may be useful:

* <code>roundedCorners(radius)</code> -- add rounded corners on all sides
* <code>roundedCorners(side, radius)</code> -- add rounded corners on specified side: <code>'top'</code>, <code>'left'</code>, <code>'bottom'</code> or <code>'right'</code>
* <code>roundedCorners(corner, radius)</code> -- add rounded corners to a specified corner: <code>'tl'</code>, <code>'tr'</code>, <code>'bl'</code> or <code>'br'</code>
* <code>phark(width, height, img, imgXPosition=0, imgYPosition=0)</code> -- standard phark image replacement with optional background image offset.
* <code>boxShadow([xoffset, yoffset], radius, color)</code>
* <code>verticalCentering(height)</code> and <code>horizontalCentering(width)</code> -- center using the top 50% / margin-top -width/2 technique. See http://stackoverflow.com/questions/148251/css-centering-tricks
* <code>clearfix()</code> -- standard clearfix

To "mix these in", use the "has" key:

<pre>
{
    'div#featured_box': {
      backgroundColor: '#394c89',
      has: roundedCorner(5)
    }
}
</pre>

Multiple macros can be included by making that a list, eg. <code>has: [roundedCorners(5), dropShadow()]</code>.

It's all Javascript, so macros and more complex functions are easy to write. To mix in a set of values, create a function
that returns a hash of values, for example:

<pre>
    function roundedCorners(radius) {
        return {
            '-webkit-border-radius': radius,
            '-moz-border-radius': radius,
            'border-radius': radius
        }
    }
</pre>

A macro's properties will be overwritten by properties within including selector (or later included macros), similar to how the cascade takes the last defined value.



## Extending Csster

Csster is built as an extensible system.

### <code>Csster.addPropertyNames</code>
Any non-standard property names you'd like to be considered valid. The build-in tool rejects non-standard property names.

### <code>Csster.propertyPreprocessors</code>
Functions called before properties are expanded. Callback is provided a hash of properties to values, which it modifies in any way it wants.

### <code>Csster.rulesPostProcessors</code>
Functions called after rules are processed, but before they are output. Called with an array of processed rules.

### <code>Csster.insertStylesheet</code>
Function that outputs a set of rules into the DOM.

## Contributing

Fork and submit changed back on Github.


## Links

* [Demo of the color functions and macros](http://ndpsoftware.com/csster/demo.html)
* [Demo of using to build a chart](http://ndpsoftware.com/csster/demo_chart.html)
* [Blog post](http://ndpsoft.blogspot.com/2010/09/introducing-csster.html)




## TDD

The design was driven by [the specs](http://ndpsoftware.com/csster/spec_runner.html).


## Todo

* decompile existing stylesheets
* jQuery rules
* Fix license
* Better name



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

Copyright (c) 2010 Andrew J. Peterson
All Rights Reserved.