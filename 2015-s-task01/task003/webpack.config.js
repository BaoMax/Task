var path = require('path');
var webpack = require('webpack');

module.exports = {
    // entry: './app/js/index.js',
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './app/js/app.js' //入口文件
    ],
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        modulesDirectories: ["node_modules", "app"],
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.css$/,
            exclude:/node_modules/,
            loader: 'style!css'
        }, {
            test: /\.png|jpg$/,
            exclude:/node_modules/,
            loader: 'url-loader?limit=8192'
        }, {
            test: /\.js|jsx$/,
            exclude:/node_modules/,
            loader: 'react-hot!babel?presets[]=react,presets[]=es2015'
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};