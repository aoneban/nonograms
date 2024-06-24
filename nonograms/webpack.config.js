const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackObfuscator = require('webpack-obfuscator');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    //publicPath: 'dist/'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: { minimize: false },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192, // Если изображение меньше 8KB, оно будет закодировано в base64
             name: 'images/[name].[hash].[ext]', // Схема именования файлов
            },
          },
        ],
      },
      /*{
        test: /\.js$/,
        exclude: [path.resolve(__dirname, 'excluded_file_name.js')],
        enforce: 'post',
        use: {
          loader: WebpackObfuscator.loader,
          options: {
            rotateStringArray: true,
          },
        },
      },*/
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                indentWidth: 4,
                includePaths: ["src/styles/vars.scss"],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    // new WebpackObfuscator ({ rotateStringArray: true }, ['excluded_bundle_name.js'])
  ],
  optimization: {
    minimize: false,
  },
  devServer: {
    compress: true,
    port: 3000,
    hot: true
  },
  resolve: {
    extensions: ['.js'],
  },
};
