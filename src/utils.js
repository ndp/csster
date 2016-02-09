function isArray(object) {
  return typeof object === 'object' &&
      Object.prototype.toString.call(object) === '[object Array]';
}


// A R R A Y s
// "each_with_index" from Ruby style
function arrayEach(a, iterator) {
  for (var i = 0; i < a.length;) {
    iterator(a[i], i++);
  }
  return a;
};


function arrayInject(a, memo, iterator) {
  arrayEach(a, function (value, index) {
    memo = iterator(memo, value, index);
  });
  return memo;
};

function arrayFlatten(a) {
  return arrayInject(a, [], function (array, value) {
    if (isArray(value))
      return array.concat(arrayFlatten(value));
    array.push(value);
    return array;
  });
};


// S T R I N G s
function dasherize(s) {
  return s.replace(/([A-Z])/g, function ($1) {
    return "-" + $1.toLowerCase();
  });
}


// H A S H e s
//  mergeHashInto(hashA, hashB, hashC...)
// merge all properties from B, C into hash A.
function mergeHashInto(r) {
  for (var i = 1; i < arguments.length; i++) {
    for (var k in arguments[i]) {
      r[k] = arguments[i][k];
    }
  }
  return r;
}

function mergeHashes() {
  var result = {};
  for (var i = 0; i < arguments.length; i++) {
    for (var k in arguments[i]) {
      result[k] = arguments[i][k];
    }
  }
  return result;
}

module.exports = {
  isArray: isArray,
  arrayEach: arrayEach,
  arrayInject: arrayInject,
  arrayFlatten: arrayFlatten,
  dasherize: dasherize,
  mergeHashInto: mergeHashInto,
  mergeHashes: mergeHashes,
}