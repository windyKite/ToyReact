const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    ToyReact: path.resolve(__dirname, './index.js')
  },
  output: {
    filename: 'ToyReact.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [[
              "@babel/plugin-transform-react-jsx",
              {
                pragma: "ToyReact"
              }
            ]]
          }
        }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'ToyReact',
    filename: './index.html'
  })]
}