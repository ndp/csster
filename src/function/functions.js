/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * WORK IN PROGRESS... LOTS OF STUFF FROM AROUND THE WEB. NOT USEFUL YET!
 *
 *
*/








//  Makes a color more saturated.
//  Takes a color and an amount between 0% and 100%,
//  and returns a color with the saturation increased by that value.
// 
//  For example:
// 
//      saturate(hsl(120, 30%, 90%), 20%) => hsl(120, 50%, 90%)
//      saturate(#855, 20%) => #9e3f3f
// 
//  @param color [Color]
//  @param amount [Number]
//  @return [Color]
//  @see #desaturate
//  @raise [ArgumentError] If `color` isn't a color,
//    or `number` isn't a number between 0% and 100%
    function saturate(color, amount)  {
      adjust(color, amount, :saturation, 0..100, :+, "%")
    }
//  Makes a color less saturated.
//  Takes a color and an amount between 0% and 100%,
//  and returns a color with the saturation decreased by that value.
// 
//  For example:
// 
//      desaturate(hsl(120, 30%, 90%), 20%) => hsl(120, 10%, 90%)
//      desaturate(#855, 20%) => #726b6b
// 
//  @param color [Color]
//  @param amount [Number]
//  @return [Color]
//  @see #saturate
//  @raise [ArgumentError] If `color` isn't a color,
//    or `number` isn't a number between 0% and 100%
    function desaturate(color, amount)  {
      adjust(color, amount, :saturation, 0..100, :-, "%")
    }
//  Changes the hue of a color while retaining the lightness and saturation.
//  Takes a color and a number of degrees (usually between -360deg and 360deg),
//  and returns a color with the hue rotated by that value.
// 
//  For example:
// 
//      adjust-hue(hsl(120, 30%, 90%), 60deg) => hsl(180, 30%, 90%)
//      adjust-hue(hsl(120, 30%, 90%), 060deg) => hsl(60, 30%, 90%)
//      adjust-hue(#811, 45deg) => #886a11
// 
//  @param color [Color]
//  @param amount [Number]
//  @return [Color]
//  @raise [ArgumentError] If `color` isn't a color, or `number` isn't a number
    function adjust_hue(color, degrees)  {
      color.with(:hue => color.hue + degrees.value)
    }

//  Converts a color to grayscale.
//  This is identical to `desaturate(color, 100%)`.
// 
//  @param color [Color]
//  @return [Color]
//  @raise [ArgumentError] if `color` isn't a color
//  @see #desaturate
    function grayscale(color)  {
      desaturate color, Number.new(100)
    }
//  Returns the complement of a color.
//  This is identical to `adjust-hue(color, 180deg)`.
// 
//  @param color [Color]
//  @return [Color]
//  @raise [ArgumentError] if `color` isn't a color
//  @see #adjust_hue #adjust-hue
    function complement(color)  {
      adjust_hue color, Number.new(180)
    }

