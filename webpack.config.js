const path = require('path');
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      '@hooks': path.resolve(__dirname, 'src/shared/hooks'),
      '@services': path.resolve(__dirname, 'src/shared/services'),
      '@components': path.resolve(__dirname, 'src/shared/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/shared/utils'),
      '@interfaces': path.resolve(__dirname, 'src/shared/interfaces'),
      '@theme': path.resolve(__dirname, 'src/shared/theme'),
      '@contexts': path.resolve(__dirname, 'src/shared/contexts'),
      '@reducers': path.resolve(__dirname, 'src/shared/reducers'),
      '@actions': path.resolve(__dirname, 'src/shared/actions'),
      '@queries': path.resolve(__dirname, 'src/shared/queries'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@constants': path.resolve(__dirname, 'src/shared/constants'),
      '@i18n': path.resolve(__dirname, 'src/shared/i18n'),
      '@validation': path.resolve(__dirname, 'src/shared/validation'),
      '@enums': path.resolve(__dirname, 'src/shared/enums'),
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: { loader: 'ts-loader', options: { transpileOnly: true } },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.SPOTIFY_API_TOKEN': JSON.stringify(process.env.SPOTIFY_API_TOKEN || ''),
      'process.env.SPOTIFY_CLIENT_SECRET': JSON.stringify(process.env.SPOTIFY_CLIENT_SECRET || ''),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],
  devServer: {
    static: { directory: path.join(__dirname, 'public'), serveIndex: false },
    historyApiFallback: true,
    port: 3000,
    client: { overlay: { errors: true, warnings: false } },
    watchFiles: ['tailwind.config.js', 'postcss.config.js', 'src/**/*']
  },
  mode: 'development',
  devtool: 'source-map',
};