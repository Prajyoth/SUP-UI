var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: APP_DIR,
        inline: true,
        port: 3000,
        historyApiFallback: true,
        proxy: [{
                /** include api pattern which needs to be proxied. */
                context: [
                    "/rest/article/"
                ],
                target: 'http://localhost:8080',
                changeOrigin: true
            },{
                context: [
                    "/sup-proxy/"
                ],
                target: 'http://localhost:9000',
                changeOrigin: true
            }]
    },
    module : {
        loaders : [
            {
                test : /\.jsx?$/,
                include : APP_DIR,
                loader : 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};

module.exports = config;