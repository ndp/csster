module.exports = {
  context: __dirname + "/src",
  entry: [
    './utils.js',
    './core.js',
    './macros/macros.js',
    './functions/color.js',
    './filters/property_name_validator.js',
    './filters/macro_preprocessor.js',
    './filters/rule_post_processors.js',
    './init.js',
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
        test: /\.es6$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          "plugins": ["transform-object-rest-spread"]
        }
      }
    ]
  }
}
