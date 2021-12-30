const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  performance: {
    maxEntrypointSize: 2048000,
    maxAssetSize: 2048000,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "./public/icons",
          to: "icons",
          globOptions: {
            ignore: ["**/favicon-16-16.png"],
          },
        },
        { from: "./public/sw.js", to: "" },
      ],
      options: {
        concurrency: 100,
      },
    }),
  ],
});
