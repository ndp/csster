// S T R I N G s
const dasherize = (s) => {
  return s.replace(/([A-Z])/g, function ($1) {
    return "-" + $1.toLowerCase();
  });
}

export {
    dasherize,
}