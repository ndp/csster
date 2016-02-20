const propertyPreprocessors = [];

const preprocessProperties = (properties) => {
  for (let i = 0; i < propertyPreprocessors.length; i++) {
    propertyPreprocessors[i].apply(properties, [properties])
  }
}

const pushPropertyPreprocessor = (pp) => {
  propertyPreprocessors.push(pp)
}

export {
    preprocessProperties,
    pushPropertyPreprocessor,
    propertyPreprocessors
}
