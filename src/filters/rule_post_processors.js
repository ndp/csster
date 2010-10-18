/**
 * Rule post-processor to remove "redundant" id selectors. For example,
 * if the generated selected ends up being '#a #b #c', this post-processor
 * will reduce it to '#c'. In general this is great, as it makes the rules
 * more readable on the output side. You are, however, losing the specificity,
 * creating a cascade you might not expect.
 *
 * To wire it in:
 * Csster.rulesPostProcessors.push(Csster.compressSelectors);
 */
Csster.compressSelectors = function(rules) {
  for (var i = 0; i < rules.length; i++) {
    while (rules[i].sel.match(/.*#.*#.*/)) {
      rules[i].sel = rules[i].sel.replace(/^.*#.*#/, '#');
    }
  }
};

