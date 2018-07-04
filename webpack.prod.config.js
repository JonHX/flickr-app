const HtmlWebPackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require("path");
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: {
            keep_fnames: true,
          },
        },
      })
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist")
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "src/index.html",
      filename: "./index.html"
    })
  ]
};
