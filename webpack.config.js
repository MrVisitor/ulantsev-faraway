const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = function(_env, argv) {
  const isProduction = argv.mode === 'production'
  const isDevelopment = !isProduction

  return {
    entry: './src/index.tsx',
    devtool: isDevelopment && 'inline-source-map',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: isProduction ? '[contenthash:16].js' : '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.([cm]?ts|tsx)$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true
              }
            }
          ]
        },
        {
          test: /\.svg$/,
          use: [
            { loader: '@svgr/webpack' },
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                mimetype: 'image/svg+xml',
              },
            },
          ],
        }
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@constants': path.resolve(__dirname, './src/constants'),
        '@app': path.resolve(__dirname, './src/app'),
        '@models': path.resolve(__dirname, './src/models'),
        '@services': path.resolve(__dirname, './src/services'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
      },
    },
    plugins: [
      new Dotenv({
        path: `./.env.${argv.mode}`
      }),
      new ESLintPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
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
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET'
      },
      client: {
        overlay: true,
        progress: true,
        logging: 'info',
      }
    }
  }
}