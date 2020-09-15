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
}

/*new webpack.optimize.UglifyJsPlugin({
 compress: {
 warnings: false
 }
 })
*/
