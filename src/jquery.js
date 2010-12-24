if (typeof jQuery != 'undefined') {
    (function($) {
        $.fn.csster = function(rules) {
            var newRules = {};
            newRules[this.selector] = rules;
            Csster.style(newRules);
            return this;
        }
    })(jQuery);
}