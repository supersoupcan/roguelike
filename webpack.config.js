const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  output : {
    path : path.resolve(__dirname, 'dist'),
    filename : 'bundle.js' 
  },
  module : {
    rules : [
      {
        test : /\.js$/,
        exclude : /node_modules/,
        use : {
          loader : 'babel-loader',
          options : {
            presets : ['env']
          }
        }
      }
    ]
  },
  plugins : [
    new HtmlWebpackPlugin({
      inject : true,
      template : path.resolve(__dirname, 'src', 'index.html')
    })
  ]
}