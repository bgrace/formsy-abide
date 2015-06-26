/**
 * Created by bgrace on 6/26/15.
 */
var webpack = require('webpack');

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    entry: {
        "formsy-react": './index'
    },
    output: {
        path: "build",
        filename: "[name].js"
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loader: "babel-loader"},
        ]
    },
    resolve: {
        // Allow require('./blah') to require blah.jsx
        extensions: ['', '.js', '.jsx', '.json']
    }

//    plugins: [commonsPlugin]
};