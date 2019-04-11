const { join } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    main: path.resolve(__dirname, './assets/app.js')
  },
  output: {
    filename: '[name]-[hash].js',
    path: join(__dirname, 'dist'),
    publicPath: '/assets'
  },
  context: join(__dirname, 'client'),
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules']
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.(svg|woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: './fonts'
        }
      },
      {
        test: /\.(png|gif|jpeg|jpg|svg|ico)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: './assets/images'
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          'sass-loader?sourceMap',
        ]
      },
      {
        test: /\.jsx?$/,
        use: ['source-map-loader', 'babel-loader'],
        exclude: /node_modules/,
      }
    ]
  },
  devServer: {
    port: 5000,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    overlay: true,
    stats: {
      colors: true
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
  ]
};

