const isArray = (object) => {
  return typeof object === 'object' &&
      Object.prototype.toString.call(object) === '[object Array]';
}

// "each_with_index" from Ruby style
const arrayEach = (a, fn) => {
  for (let i = 0; i < a.length;) {
    fn(a[i], i++);
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

function includes(values, value) {
  for (let i = 0; i < values.length; i++) {
    if (value == values[i]) return true
  }
  return false
}



export {
    isArray,
    arrayEach,
    arrayInject,
    arrayFlatten,
    includes
}