
const format = (value, name) => {
  if (value && typeof value == 'number' &&
      name != 'z-index' && name != 'opacity' && name != 'zoom') {
    return '' + value + 'px';
  }
  return value
}

export {format}