let webpack = require('webpack');
let path = require('path');
const mainConfig = require('../main');
const publicPath = 'http://' + mainConfig.host + ':' + (+mainConfig.port + 1);
const API_URL = process.env.API_URL;

module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?' + publicPath,
      './src/client/index.tsx'
    ],
  },

  output: {
    path: path.resolve('./dist'),
    filename: '[name].js?v=[hash]',
    publicPath: publicPath + '/',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [path.resolve(__dirname), 'node_modules', 'app', 'app/redux'],
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
    new webpack.DefinePlugin({
      "process.env": {
        BUILD_TARGET: JSON.stringify("client"),
        NODE_ENV: JSON.stringify("development"),
        API_URL: JSON.stringify(API_URL),
      },
    }),
  ],

  devtool: 'inline-source-map',

  devServer: {
    host: mainConfig.host,
    port: +mainConfig.port + 1,
    historyApiFallback: true,
    hot: true,
    headers: {"Access-Control-Allow-Origin": "*"},
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {fix: true},
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['react-hot-loader/webpack', 'ts-loader'],
      },
      {
        test: /\.css/,
        include: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.scss/,
        include: path.resolve('./src/app/styles'),
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.scss/,
        exclude: [/node_modules/, path.resolve('./src/app/styles')],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]__[hash:base64:5]'
            }
          },
          'sass-loader'
        ],
      },
      {
        test: /\.ttf(\?.*)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[hash].[ext]'
      },
      {
        test: /\.(ttf|eot|woff2?)(\?[a-z0-9]+)?$/,
        use: 'file-loader?name=font/[name]-[hash].[ext]',
      },
      {
        test: /\.(jpe?g|png|svg|gif)$/i,
        use: ['url-loader?limit=5000&name=image/[name].[ext]'],
      },
    ]
  }
};