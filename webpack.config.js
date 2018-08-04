const path = require('path');
const OptimizeJsPlugin = require('optimize-js-plugin');

let plugins = [
];

module.exports = (env) => {
  const mode = env || 'production';
  if (mode) {
    plugins.push(
      new OptimizeJsPlugin({
        sourceMap: false
      })
    )
  }

  return {
    cache: false,
    mode: mode,
    entry: (mode !== 'production' ? [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server'
    ] : []).concat(['./client/index.js']),
    output: {
      filename: './bundle.js',
      path: path.resolve(__dirname, 'public')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          options: {
            presets: [["es2015", {"modules": false}], "stage-2", "react"],
            plugins: mode !== 'production' ? ["react-hot-loader/babel"] : []
          }
        },
        {
          test: /\.css$/,
          use: [
            {loader: 'style-loader'},
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            }
          ]
        }
      ]
    },
    plugins: plugins
  }
};
