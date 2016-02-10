
const rulesPostProcessors   = [];

const postProcessRules = function (rules) {
  for (var i = 0; i < rulesPostProcessors.length; i++) {
    rulesPostProcessors[i].apply(rules, [rules])
  }
};

export { rulesPostProcessors, postProcessRules }
