let webpack = require('webpack');
let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
const API_URL = process.env.API_URL;

module.exports = {
  entry: {
    app: './src/client/index.tsx',
    vendor: ['react', 'react-dom'],
  },

  output: {
    path: path.resolve('./dist/client'),
    filename: '[name].js?v=[hash]',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [path.resolve(__dirname), 'node_modules', 'app', 'app/redux'],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      "process.env": {
        BUILD_TARGET: JSON.stringify("client"),
        NODE_ENV: JSON.stringify("production"),
        API_URL: JSON.stringify(API_URL),
      }
    })
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              silent: true,
            }
          }
        ]
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
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {loader: 'css-loader'},
            {loader: 'sass-loader'},
          ],
        }),
      },
      {
        test: /\.scss/,
        exclude: [/node_modules/, path.resolve('./src/app/styles')],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]__[hash:base64:5]'
              }
            },
            'sass-loader'
          ],
        }),
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