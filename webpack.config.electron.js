const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, './electron-main.js'),
    output: {
        path: path.resolve(__dirname, 'dist_electron'),
        filename: 'main.js',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
          {
            test: /\.node$/,
            use: 'node-loader',
          },
          {
            type: 'javascript/auto',
            test: /\.mjs$/,
            use: [],
          },
        ],
    },
    node: {
      __dirname: false,
      __filename: false,
    },
    target: 'electron-main',
    mode: 'development'
}

/*
yarn add -D babel-loader @babel/core  @babel/preset-env


yarn add -D babel-loader @babel/core  @babel/preset-env babel-plugin-transform-vue-jsx @babel/plugin-transform-runtime @babel/plugin-transform-modules-commonjs @babel/plugin-proposal-class-properties @babel/plugin-proposal-optional-chaining @babel/env

*/
