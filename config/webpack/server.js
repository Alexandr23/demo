'use strict';

let CopyWebpackPlugin = require('copy-webpack-plugin')
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let path = require('path');
let fs = require('fs');
let webpack = require('webpack');
let IS_DEV = process.env.NODE_ENV !== 'production';
let nodeModules = {};

IS_DEV && fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => nodeModules[mod] = 'commonjs ' + mod);


let config = {
  entry: './src/server/index.tsx',

  output: {
    path: path.resolve('dist'),
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [path.resolve(__dirname), 'node_modules', 'app', 'app/redux'],
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env.BUILD_TARGET": JSON.stringify("server"),
      "process.env.NODE_ENV": JSON.stringify(IS_DEV ? "development" : "production"),
    }),
  ],

  externals: nodeModules,

  target: 'node',

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },

  module: {
    loaders: [
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'url-loader?limit=1000&name=image/[hash].[ext]'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                target: 'es6',
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          'css-loader/locals',
          'less-loader',
        ],
      },
      {
        test: /\.css/,
        include: /node_modules/,
        use: [
          'css-loader',
        ]
      },
      {
        test: /\.scss/,
        include: path.resolve('./src/app/styles'),
        use: [
          'css-loader/locals',
          'sass-loader',
        ],
      },
      {
        test: /\.scss/,
        exclude: [/node_modules/, path.resolve('./src/app/styles')],
        use: [
          {loader: 'css-loader/locals', options: {modules: true, localIdentName: '[local]__[hash:base64:5]'}},
          {loader: 'sass-loader'},
        ],
      },
    ]
  },
};


if (!IS_DEV) {
  let propsPlugins = [
    new webpack.IgnorePlugin(/vertx/),
    new webpack.NoEmitOnErrorsPlugin(),
    new UglifyJsPlugin(),
    new CopyWebpackPlugin([
      { 
        from: path.resolve('src/server/public/'),
        to: path.resolve('dist/static'),
      },
    ]),
  ];
  config.plugins.push(...propsPlugins);
}


module.exports = config;
