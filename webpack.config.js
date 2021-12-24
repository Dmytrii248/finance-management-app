const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const WebpackNotifierPlugin = require("webpack-notifier");

const webpackConfig = {
  mode: "development",

  entry: "./src/index.tsx",

  output: {
    filename: "index.bundle.js",
    charset: true,

    clean: true,

    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new CleanWebpackPlugin(),
    // // Плагін для сповіщень при багах або інших несправностях, можливо пригодиться)))
    // new WebpackNotifierPlugin({
    //   title: function (params) {
    //     return `Build status is ${params.status} with message ${params.message}`;
    //   },
    // }),
  ],

  module: {
    rules: [
      { test: /\.html$/i, loader: "html-loader" },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
        // стилі не чіпати, розібратися з антдизайном
      },
      { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },

  devServer: {
    historyApiFallback: true,
  },

  devtool: "source-map",

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      Pages: path.resolve(__dirname, "src/pages/"),
      Constants: path.resolve(__dirname, "src/constants/"),
      Components: path.resolve(__dirname, "src/components/"),
    },
  },
};

module.exports = webpackConfig;
