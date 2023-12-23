import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as CopyPlugin from 'copy-webpack-plugin';
import 'webpack-dev-server';

const portFinderSync = require('portfinder-sync');

const PORT = 3003;

const config: webpack.Configuration = {
  mode: 'development',
  stats: 'errors-warnings',
  infrastructureLogging: { level: 'warn' },
  entry: './src/main.tsx',
  target: 'web',
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.svg'],
    alias: {
      'commonStyles': path.resolve(__dirname, 'src', 'commonStyles'),
      '@types': path.resolve(__dirname, 'src', 'types'),
      '@constants': path.resolve(__dirname, 'src', 'constants'),
      '@shared': path.resolve(__dirname, 'src', 'shared'),
      '@services': path.resolve(__dirname, 'src', 'services'),
      '@features': path.resolve(__dirname, 'src', 'features'),
      '@utils': path.resolve(__dirname, 'src', 'utils'),
      '@zustand': path.resolve(__dirname, 'src', 'zustand'),
      '@svgs': path.resolve(__dirname, 'public', 'assets', 'svg'),
    },
  },
  module: {
    rules: [
      { // tsx code
        exclude: [
          /node_modules/,
        ],
        include: [
          path.resolve(__dirname, 'src'),
        ],
        test: /\.tsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-typescript'],
              ['@babel/preset-env'],
              ['@babel/preset-react'],
            ],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      { // scss
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          'sass-loader',
        ],
      },
      { // fonts
        test: /\.woff2?$/,
        type: 'asset/resource',
      },
      { // svgs
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: path.join('public', 'favicon.ico') },
        { from: path.join('public', 'assets', 'images', 'other') },
        { from: path.join('public', 'assets', 'images', 'factions') },
        { from: path.join('public', 'assets', 'images', 'trade-goods') },
        { from: path.join('public', 'assets', 'images', 'ships') },
        { from: path.join('public', 'assets', 'svg') },
      ],
    }),
  ],
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
    publicPath: '/',
  },
};

config.devServer = {
  /**
   * If you are using LAN cable instead of Wi-Fi connection, you might want to switch to Wi-Fi if you want
   * Visor app to be accessible on other devices.
   */
  host: 'local-ip',
  // host: '192.168.100.10', // Wi-Fi IPV4 override in case you use both Wi-Fi + LAN.
  port: portFinderSync.getPort(PORT),
  open: true,
  https: false,
  allowedHosts: 'all',
  hot: true,
  historyApiFallback: true,
  setupMiddlewares: function (middlewares, devServer) {
    console.log('\n');
    console.log('Space Traders Client');
    console.log('Project is running on your local network at:');
    console.log(`http://${devServer.options.host}:${devServer.options.port}`);
    console.log(`Check served assets:`);
    console.log(`http://${devServer.options.host}:${devServer.options.port}/webpack-dev-server`);
    console.log('\n');

    return middlewares;
  },
};

export default config;