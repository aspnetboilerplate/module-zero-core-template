const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');
const package = require('../package.json');

fs.open('./build/env.js', 'w', function(err, fd) {
    const buf = 'export default "development";';
    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});

module.exports = merge(webpackBaseConfig, {
    devtool: '#source-map',
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vender-exten', 'vender-base'],
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            title: 'iView admin v' + package.version,
            filename: '../index.html',
            inject: false
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/views/main-components/theme-switch/theme'
            },
            {
                from:'node_modules/abp-web-resources/abp/framework/scripts/abp.js',
                to:'abp'
            },{
                from:'node_modules/jquery/dist/jquery.min.js'
            },
            {
                from:'node_modules/signalr/jquery.signalR.js'
            },
            {
                from:'node_modules/@aspnet/signalr-client/dist/browser/signalr-client.js'
            },{
                from:'node_modules/abp-web-resources/Abp/Framework/scripts/libs/abp.signalr.js',
                to:'abp'
            },{
                from:'node_modules/abp-web-resources/Abp/Framework/scripts/libs/abp.signalr-client.js',
                to:'abp'
            },{
                from:'node_modules/abp-web-resources/Abp/Framework/scripts/libs/abp.jquery.js',
                to:'abp'
            }
        ])
    ]
});