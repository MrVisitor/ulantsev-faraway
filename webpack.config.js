const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = function(_env, argv) {
  const isProduction = argv.mode === "production";
  const isDevelopment = !isProduction;

  return {
    entry: './src/index.ts',
    devtool: isDevelopment && "cheap-module-source-map",
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: "[name].[contenthash:8].js",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new ESLintPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
        inject: true
      })
    ],
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              comparisons: false
            },
            mangle: {
              safari10: true
            },
            output: {
              comments: false,
              ascii_only: true
            },
            warnings: false
          }
        })
      ],
    },
    devServer: {
      host: '0.0.0.0',
      https: true,
      hot: true,
      historyApiFallback: true,
      client: {
        overlay: true,
        progress: true,
        logging: 'info',
      }
    }
  };
};