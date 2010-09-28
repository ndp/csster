if (!Csster) {
    var Csster = {
        /**
         * Remove redundant parents from selectors that include more than one ID
         * selector.  eg.  #page #top => "#top"
         */
        shortCircuitIds: true
    }
}

Csster.propertyNames = ['accelerator',
    'azimuth',
    'background',
    'background-attachment',
    'background-color',
    'background-image',
    'background-position',
    'background-position-x',
    'background-position-y',
    'background-repeat',
    'behavior',
    'border',
    'border-bottom',
    'border-bottom-color',
    'border-bottom-style',
    'border-bottom-width',
    'border-collapse',
    'border-color',
    'border-left',
    'border-left-color',
    'border-left-style',
    'border-left-width',
    'border-radius',
    'border-right',
    'border-right-color',
    'border-right-style',
    'border-right-width',
    'border-spacing',
    'border-style',
    'border-top',
    'border-top-color',
    'border-top-style',
    'border-top-width',
    'border-width',
    'box-shadow',
    'bottom',
    'caption-side',
    'clear',
    'clip',
    'color',
    'content',
    'counter-increment',
    'counter-reset',
    'cue',
    'cue-after',
    'cue-before',
    'cursor',
    'direction',
    'display',
    'elevation',
    'empty-cells',
    'filter',
    'float',
    'font',
    'font-family',
    'font-size',
    'font-size-adjust',
    'font-stretch',
    'font-style',
    'font-variant',
    'font-weight',
    'height',
    'ime-mode',
    'include-source',
    'layer-background-color',
    'layer-background-image',
    'layout-flow',
    'layout-grid',
    'layout-grid-char',
    'layout-grid-char-spacing',
    'layout-grid-line',
    'layout-grid-mode',
    'layout-grid-type',
    'left',
    'letter-spacing',
    'line-break',
    'line-height',
    'list-style',
    'list-style-image',
    'list-style-position',
    'list-style-type',
    'margin',
    'margin-bottom',
    'margin-left',
    'margin-right',
    'margin-top',
    'marker-offset',
    'marks',
    'max-height',
    'max-width',
    'min-height',
    'min-width',
    '-moz-binding',
    '-moz-border-radius',
    '-moz-border-radius-topleft',
    '-moz-border-radius-topright',
    '-moz-border-radius-bottomright',
    '-moz-border-radius-bottomleft',
    '-moz-border-top-colors',
    '-moz-border-right-colors',
    '-moz-border-bottom-colors',
    '-moz-border-left-colors',
    '-moz-box-shadow',
    '-moz-opacity',
    '-moz-outline',
    '-moz-outline-color',
    '-moz-outline-style',
    '-moz-outline-width',
    '-moz-user-focus',
    '-moz-user-input',
    '-moz-user-modify',
    '-moz-user-select',
    '-ms-filter',
    'orphans',
    'outline',
    'outline-color',
    'outline-style',
    'outline-width',
    'overflow',
    'overflow-X',
    'overflow-Y',
    'padding',
    'padding-bottom',
    'padding-left',
    'padding-right',
    'padding-top',
    'page',
    'page-break-after',
    'page-break-before',
    'page-break-inside',
    'pause',
    'pause-after',
    'pause-before',
    'pitch',
    'pitch-range',
    'play-during',
    'position',
    'quotes',
    '-replace',
    'richness',
    'right',
    'ruby-align',
    'ruby-overhang',
    'ruby-position',
    '-set-link-source',
    'size',
    'speak',
    'speak-header',
    'speak-numeral',
    'speak-punctuation',
    'speech-rate',
    'stress',
    'scrollbar-arrow-color',
    'scrollbar-base-color',
    'scrollbar-dark-shadow-color',
    'scrollbar-face-color',
    'scrollbar-highlight-color',
    'scrollbar-shadow-color',
    'scrollbar-3d-light-color',
    'scrollbar-track-color',
    'table-layout',
    'text-align',
    'text-align-last',
    'text-decoration',
    'text-indent',
    'text-justify',
    'text-overflow',
    'text-shadow',
    'text-transform',
    'text-autospace',
    'text-kashida-space',
    'text-underline-position',
    'top',
    'unicode-bidi',
    '-use-link-source',
    'vertical-align',
    'visibility',
    'voice-family',
    'volume',
    '-webkit-animation',
    '-webkit-animation-delay',
    '-webkit-animation-direction',
    '-webkit-animation-duration',
    '-webkit-animation-iteration-count',
    '-webkit-animation-name',
    '-webkit-animation-play-state',
    '-webkit-animation-timing-function',
    '-webkit-appearance',
    '-webkit-backface-visibility',
    '-webkit-background-clip',
    '-webkit-background-composite',
    '-webkit-background-origin',
    '-webkit-background-size',
    '-webkit-border-bottom-left-radius',
    '-webkit-border-bottom-right-radius',
    '-webkit-border-horizontal-spacing',
    '-webkit-border-image',
    '-webkit-border-radius',
    '-webkit-border-top-left-radius',
    '-webkit-border-top-right-radius',
    '-webkit-border-vertical-spacing',
    '-webkit-box-align',
    '-webkit-box-direction',
    '-webkit-box-flex',
    '-webkit-box-flex-group',
    '-webkit-box-lines',
    '-webkit-box-ordinal-group',
    '-webkit-box-orient',
    '-webkit-box-pack',
    '-webkit-box-reflect',
    '-webkit-box-shadow',
    '-webkit-box-sizing',
    '-webkit-column-break-after',
    '-webkit-column-break-before',
    '-webkit-column-break-inside',
    '-webkit-column-count',
    '-webkit-column-gap',
    '-webkit-column-rule',
    '-webkit-column-rule-color',
    '-webkit-column-rule-style',
    '-webkit-column-rule-width',
    '-webkit-column-width',
    '-webkit-columns',
    '-webkit-dashboard-region',
    '-webkit-line-break',
    '-webkit-margin-bottom-collapse',
    '-webkit-margin-collapse',
    '-webkit-margin-start',
    '-webkit-margin-top-collapse',
    '-webkit-marquee',
    '-webkit-marquee-direction',
    '-webkit-marquee-increment',
    '-webkit-marquee-repetition',
    '-webkit-marquee-speed',
    '-webkit-marquee-style',
    '-webkit-mask',
    '-webkit-mask-attachment',
    '-webkit-mask-box-image',
    '-webkit-mask-clip',
    '-webkit-mask-composite',
    '-webkit-mask-image',
    '-webkit-mask-origin',
    '-webkit-mask-position',
    '-webkit-mask-position-x',
    '-webkit-mask-position-y',
    '-webkit-mask-repeat',
    '-webkit-mask-size',
    '-webkit-nbsp-mode',
    '-webkit-padding-start',
    '-webkit-perspective',
    '-webkit-perspective-origin',
    '-webkit-rtl-ordering',
    '-webkit-tap-highlight-color',
    '-webkit-text-fill-color',
    '-webkit-text-security',
    '-webkit-text-size-adjust',
    '-webkit-text-stroke',
    '-webkit-text-stroke-color',
    '-webkit-text-stroke-width',
    '-webkit-touch-callout',
    '-webkit-transform',
    '-webkit-transform-origin',
    '-webkit-transform-origin-x',
    '-webkit-transform-origin-y',
    '-webkit-transform-origin-z',
    '-webkit-transform-style',
    '-webkit-transition',
    '-webkit-transition-delay',
    '-webkit-transition-duration',
    '-webkit-transition-property',
    '-webkit-transition-timing-function',
    '-webkit-user-drag',
    '-webkit-user-modify',
    '-webkit-user-select',
    'white-space',
    'widows',
    'width',
    'word-break',
    'word-spacing',
    'word-wrap',
    'writing-mode'];


// Quick way to look up whether a property is "official"
Csster.propertyNamesHash = {};
for (var i = 0; i < Csster.propertyNames.length; i++) {
    var name = Csster.propertyNames[i];
    Csster.propertyNamesHash[name] = true;
}


/*
 Returns the CSS-correct lowercase property name, if it's recognized
 as a property. Null otherwise.
 */
Csster.propertyNameOf = function(p) {
    name = dasherize(p);
    return Csster.propertyNamesHash[name] ? name : null;
}

Csster.formatProperty = function(p, value) {
    if (value && typeof value == 'number') value = '' + value + 'px';
    return Csster.propertyNameOf(p) + ": " + value + ";\r";
};


Csster.formatSelectorAndProperties = function(selector, properties) {

    // preprocess a macro, if one
    var has = properties['has'];
    if (has) {
        var a = [has].flatten(); // support single or multiple sets of properties
        for (var i = 0; i < a.length; i++) {
            for (var mp in a[i]) {
                properties[mp] = a[i][mp];
            }
        }
        delete properties['has']
    }

    // ...all properties that look like properties
    // Output selector...
    var rule = {sel: selector, props: ''};
    for (var p in properties) {
        if (Csster.propertyNameOf(p)) {
            rule.props += Csster.formatProperty(p, properties[p]);
            delete properties[p];
        }
    }

    // ... finally, sub-selectors
    var rules = [rule];
    for (p in properties) {

        if (typeof properties[p] == 'string') {
            throw "Unknown CSS property \"" + p + "\". Rule rejected.";
        }

        var subs = p.split(',');
        for (var s = 0; s < subs.length; s++) {
            subs[s] = selector + (subs[s][0] == '&' ? subs[s].substr(1) : ' ' + subs[s]);
        }
        rules.push(Csster.formatSelectorAndProperties(subs.join(','), properties[p]));
    }

    return rules;
}

Csster.insertStylesheet = function (rules) {
    if (document.styleSheets.length == 0) {
        var e = document.createElement('STYLE');
        var a = document.createAttribute('type');
        a.nodeValue = 'text/css';
        e.setAttributeNode(a);
        var head = document.getElementsByTagName('HEAD')[0];
        head.appendChild(e);
    }
    var ss = document.styleSheets[document.styleSheets.length - 1];
    for (var i = 0; i < rules.length; i++) {
        if (ss.addRule) {  // IE http://msdn.microsoft.com/en-us/library/ms535871(v=VS.85).aspx
            ss.addRule(rules[i].sel, rules[i].props);
        } else {
            ss.insertRule(rules[i].sel + "{" + rules[i].props + "}", ss.cssRules.length);
        }
    }
};


Csster.compressSelectors = function(rules) {
    for (var i = 0; i < rules.length; i++) {
        while (rules[i].sel.match(/.*#.*#.*/)) {
            rules[i].sel = rules[i].sel.replace(/^.*#.*#/, '#');
        }
    }
};

Csster.formatRules = function(rs) {

    // @param cssRule { selector: { prop1: value, prop2: value, subselector: { prop3: value}}
    var resolveRuleHash = function(cssRule) {
        var result = [];
        for (var key in cssRule) {
            result.push(Csster.formatSelectorAndProperties(key, cssRule[key]));
        }
        return result;
    };


    var result = [];
    [rs].flatten().each(function(r) {
        result.push(resolveRuleHash(r));
    });
    result = result.flatten();
    if (Csster.shortCircuitIds) {
        Csster.compressSelectors(result);
    }
    return result;
};

Csster.style = function(cssRules) {
    var s = Csster.formatRules(cssRules);
    Csster.insertStylesheet(s);
};

