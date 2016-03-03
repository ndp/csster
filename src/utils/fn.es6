// Slightly functional support within Javascript. See more
// complete libraries for better support.


// Curry the given function
export function curry(fx) {
  var arity = fx.length;

  return function f1() {
    var args = Array.prototype.slice.call(arguments, 0);
    if (args.length >= arity) {
      return fx.apply(null, args);
    }
    else {
      return function f2() {
        var args2 = Array.prototype.slice.call(arguments, 0);
        return f1.apply(null, args.concat(args2));
      }
    }
  };
}

// Directly compose given functions. This does not use the .map style
// that is more common.
export const compose = function() {
  var funcs = arguments;
  return function() {
    var args = arguments;
    for (var i = funcs.length; i --> 0;) {
      args = [funcs[i].apply(this, args)];
    }
    return args[0];
  };
};
