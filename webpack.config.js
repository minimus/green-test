const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

// eslint-disable-next-line no-undef
const ROOT_DIR = path.resolve(__dirname, '.');
const SRC_DIR = `${ROOT_DIR}/src`;
const BUILD_DIR = `${ROOT_DIR}/build`;

module.exports = {
  context: ROOT_DIR,
  mode: 'production',
  target: 'web',
  entry: { main: `${SRC_DIR}/index.tsx` },
  output: {
    path: BUILD_DIR,
    filename: 'js/[name].js',
    clean: true,
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    mainFields: ['browser', 'jsnext:main', 'main'],
  },
  module: {
    rules: [
      {
        test: /\.ts.?$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }, { loader: 'ts-loader' }],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.s?css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          /*{
            loader: 'postcss-loader',
          }*/
        ],
      },
      /*{
        test: /\.css$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'css',
              name: '[name].[ext]',
            },
          },
        ],
      },*/
      { test: /\.gif$/, use: [{ loader: 'url-loader?mimetype=image/gif' }] },
      { test: /\.png$/, use: [{ loader: 'url-loader?mimetype=image/png' }] },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              babel: false,
              icon: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ filename: `${BUILD_DIR}/index.html`, template: `${SRC_DIR}/index.html`,  }),
  ],
};

