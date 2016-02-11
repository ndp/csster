import {browserInfo} from '../utils/browser.es6'
import {isArray} from '../utils/array.es6'

export default function linearGradient(startingPoint, color1, color2, etc) {
  let prefix = '',
      result = '';
  if (browserInfo().webkit) {
    prefix = '-webkit';
  } else if (browserInfo().mozilla) {
    prefix = '-moz';
  }

  const stops = [];
  for (var i = 0; i < arguments.length; i++) {
    var argument = arguments[i];
    if (typeof argument == 'string') {
      stops.push(argument);
    } else if (isArray(argument)) {
      for (var j = 0; j < argument.length; j++) {
        stops.push(argument[j]);
      }
    } else {
      for (var p in arguments[i]) {
        stops.push(argument[p] + (p != 0 && p != '100' ? (' ' + p + '%') : ''));
      }
    }
  }


  result = prefix + '-linear-gradient(';
  for (i = 0; i < stops.length; i++) {
    if (i !== 0) result += ', ';
    result += stops[i];
  }
  result += ')';
  return result;
}




//    },generateLinearGradient:function() {
//        var props = c.gradientProps,
//                g = props.type + "-gradient(",e = "";
//        $sample = c.sample,
//                gCount = a.getPaletteLength(),
//                palette = a.getPalette();
//        if (props.xStart !== props.xEnd) {
//            g = g + props.xStart + " "
//        }
//        if (props.yStart !== props.yEnd) {
//            g = g + props.yStart
//        }
//        g = g + ", ";
//        var h = c.getColor;
//        $.each(palette, function(i, j) {
//            if (i > 0) {
//                e = e + " "
//            }
//            e = e + h(j) + " " + j.position + "%,"
//        });
//        g = g + e;
//        g = g.substr(0, g.length - 1) + ")";
//        return g
//    generateWebkitGradient:function() {
//        var j = c.gradientProps,l = "-webkit-gradient(" + j.type + "," + c.fetchGradientStart() + "," + c.fetchGradientEnd() + ",",g = "";
//        var e = a.getPalette(),f = e.length,k,m;
//        for (var h = 0; h < f; h++) {
//            m = e[h];
//            k = (m.position / 100);
//            g = g + "color-stop(" + k + ", rgb(" + m.rgb.r + "," + m.rgb.g + "," + m.rgb.b + ")),"
//        }
//        l = l + g;
//        l = l.substr(0, l.length - 1) + ");";
//        return l
