const path = require('path');

module.exports = ({ platform }, defaults) => ({
  entry: `./index.${platform}.js`,
  devtool: 'source-map',
  resolve: {
    ...defaults.resolve,
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
  },
  module: {
    ...defaults.module,
    rules: [
      {
        test: /\.js?$/,
        include: [/node_modules\/@example/, /node_modules\/babel-loader/],
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      ...defaults.module.rules,
    ],
  },
});
