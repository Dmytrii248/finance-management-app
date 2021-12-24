const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
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
  ],

  module: {
    rules: [
      { test: /\.html$/i, loader: "html-loader" },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
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

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      Pages: path.resolve(__dirname, "src/pages/"),
      Constants: path.resolve(__dirname, "src/constants/"),
      Components: path.resolve(__dirname, "src/components/"),
    },
  },
};
