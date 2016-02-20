// S T R I N G s
const dasherize = (s) => {
  return s.replace(/([A-Z])/g, function ($1) {
    return "-" + $1.toLowerCase();
  });
}

const trim = function (text) {
  return (text || "").replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "")
}

export {
    dasherize,
    trim,
}