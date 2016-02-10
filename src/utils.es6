const isArray = (object) => {
  return typeof object === 'object' &&
      Object.prototype.toString.call(object) === '[object Array]';
}


// A R R A Y s
// "each_with_index" from Ruby style
const arrayEach = (a, iterator) => {
  for (let i = 0; i < a.length;) {
    iterator(a[i], i++);
  }
  return a;
};


const arrayInject = (a, memo, iterator) => {
  arrayEach(a, function (value, index) {
    memo = iterator(memo, value, index);
  });
  return memo;
};

const arrayFlatten = (a) => {
  return arrayInject(a, [], function (array, value) {
    if (isArray(value))
      return array.concat(arrayFlatten(value));
    array.push(value);
    return array;
  });
};


// S T R I N G s
const dasherize = (s) => {
  return s.replace(/([A-Z])/g, function ($1) {
    return "-" + $1.toLowerCase();
  });
}


// H A S H e s
//  mergeHashInto(hashA, hashB, hashC...)
// merge all properties from B, C into hash A.
const mergeHashInto = (dest, ...hashes) => {
  for (let i = 0; i < hashes.length; i++) {
    for (let k in hashes[i]) {
      dest[k] = hashes[i][k];
    }
  }
  return dest;
}

const mergeHashes = () => {
  let result = {};
  for (let i = 0; i < arguments.length; i++) {
    for (let k in arguments[i]) {
      result[k] = arguments[i][k];
    }
  }
  return result;
}

export {
    isArray,
    arrayEach,
    arrayInject,
    arrayFlatten,
    dasherize,
    mergeHashInto,
    mergeHashes,
}