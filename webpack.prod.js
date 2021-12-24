const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  performance: {
    maxEntrypointSize: 2048000,
    maxAssetSize: 2048000,
  },
});
