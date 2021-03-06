const webpack = require('webpack');

module.exports = {
  entry: './source/js/main.js',
  output: {
    filename: 'morph-content.min.js',
  },

  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: false,
    }),
  ],
};
