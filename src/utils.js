function isArray(object) {
    return typeof object === 'object' &&
            Object.prototype.toString.call(object) === '[object Array]';
}


// A R R A Y s
// "each_with_index" from Ruby style
Array.prototype.each = function each(iterator) {
    for (var i = 0; i < this.length;) {
        iterator(this[i], i++);
    }
    return this;
};


Array.prototype.inject = function inject(memo, iterator) {
    this.each(function(value, index) {
        memo = iterator(memo, value, index);
    });
    return memo;
};

Array.prototype.flatten = function() {
    return this.inject([], function(array, value) {
        if (isArray(value))
            return array.concat(value.flatten());
        array.push(value);
        return array;
    });
};


// S T R I N G s
function dasherize(s) {
    return s.replace(/([A-Z])/g, function($1) {
        return "-" + $1.toLowerCase();
    });
}
