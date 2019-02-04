const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  imageLoaderConfiguration,
  babelLoaderConfiguration,
  fontLoaderConfiguration,
} = require('./loaderConfiguration');

module.exports = {
  entry: {
    rnwApp: ['@babel/polyfill', path.resolve(__dirname, 'index.web.js')],
    vendor: ['react', 'react-dom', 'react-native-web'],
    font: [path.resolve(__dirname, 'font.js')],
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      fontLoaderConfiguration,
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'template.html'),
      title: 'district-template',
      filename: 'index.html',
    }),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    symlinks: false,
    extensions: ['.web.js', '.js'],
    alias: {
      common: path.resolve(__dirname, 'node_modules/shared/common'),
      modules: path.resolve(__dirname, 'node_modules/shared/modules'),
      'react-native-svg': 'svgs',
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: 'vendor',
          name: 'vendor',
          enforce: true,
        },
      },
    },
  },
};
