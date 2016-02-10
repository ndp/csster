module.exports = {
  context: __dirname + "/src",
  entry: [
    './utils/array.es6',
    './utils/object.es6',
    './utils/string.es6',
    './utils/browser.es6',
    './core.js',
    './macros/macros.js',
    './functions/color.es6',
    './filters/property_name_validator.js',
    './filters/macro_preprocessor.es6',
    './filters/rule_post_processors.js',
    './init.es6',
    './jquery.js'
  ],
  output: {
    path: __dirname,
    filename: "csster.js"
  },
  resolveLoader: {
    modulesDirectories: [
      '../node_modules'
    ]
  },
  module: {
    resolveLoader: {
      modulesDirectories: [
        '../node_modules'
      ]
    },
    loaders: [
      {
        test: /\.(es6)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          //"plugins": ["transform-object-rest-spread"]
        }
      }
    ]
  }
}
