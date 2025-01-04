const path = require("path");
const webpack = require("webpack");
module.exports = (env, argv) => {
  console.log("ENV:", process.env.NODE_ENV);
  return {
    target: "web",
    entry: {
      main: "./src/register",
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: process.env.NODE_ENV || "development",
      }),
    ].filter((x) => x != null),
    module: {
      rules: [
        {
          test: /\.[cm]?(ts|js)x?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".mts", ".mjs", ".jsx", ".css", "txt"],
      // Add support for TypeScripts fully qualified ESM imports.
      extensionAlias: {
        ".js": [".js", ".ts"],
        ".cjs": [".cjs", ".cts"],
        ".mjs": [".mjs", ".mts"],
      },
    },
    output: {
      filename: "[name].js", // 使用 contenthash 作为文件名的一部分
      chunkFilename: "[name].js", // 对于动态导入的模块
      path: path.resolve(__dirname, "./dist"),
      libraryTarget: "umd", // 输出格式
    },
    mode: process.env.NODE_ENV !== "production" ? "development" : "production",
    devtool: false,
  };
};
