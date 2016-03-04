module.exports = {
  context: __dirname + "/src",
  entry: [
    './jquery.js',
    './entry.js',
  ],
  output: {
    path: __dirname,
    filename: "csster.js",
    library: 'Csster',
    libraryTarget: 'umd'
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
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          "plugins": ["transform-object-rest-spread"]
        }
      }
    ]
  }
}

/*new webpack.optimize.UglifyJsPlugin({
 compress: {
 warnings: false
 }
 })
*/