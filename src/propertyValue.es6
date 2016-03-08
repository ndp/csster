

const unitlessProperties = ['z-index', 'opacity', 'zoom']

export const format = (value, name) => {
  var appendPx = value && typeof value == 'number' && unitlessProperties.indexOf(name) == -1
  return '' + value + (appendPx ? 'px' : '');
}

