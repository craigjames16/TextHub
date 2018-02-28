var webpack = require("webpack")
var path = require('path');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'index.min.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/, exclude: /node_modules/, loader: "babel-loader",
            },
            {
                test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader",
            },
            {
                test: /\.css/,loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,loader: ['file-loader']
            },
        ]
    },
    devServer: {
      disableHostCheck: true
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.js', '.css','.png','.jsx'],
    },
    plugins: [
        // new ExtractTextPlugin("main.css")
    ]
}