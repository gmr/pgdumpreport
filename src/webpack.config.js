const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', __dirname + '/main.jsx'],
  output: {
    path: path.resolve(__dirname, '../pgdumpreport/static/'),
    filename: 'main.js',
  },
  performance: {hints: false},
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    noParse: (content) => /jquery|lodash/.test(content),
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Tether: 'tether',
      "window.Tether": "tether",
      Popper: ['popper.js', 'default']}),
    new CopyWebpackPlugin([
      {
        from:  __dirname + '/index.html',
        to: path.resolve(__dirname, '../pgdumpreport/static/')
      }], {})
  ]
};
