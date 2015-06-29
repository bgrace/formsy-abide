/**
 * Created by bgrace on 6/26/15.
 */

module.exports = {
    entry: {
        "formsy-abide": './index'
    },
    externals: {
        react: 'react'
    },
    output: {
        path: "build",
        filename: "[name].js",
        libraryTarget: 'umd',
        library: 'formsy-abide'
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    },
    resolve: {
        // Allow require('./blah') to require blah.jsx
        extensions: ['', '.js', '.jsx', '.json']
    }

};