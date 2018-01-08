var merge = require('webpack-merge');
var webpackBaseConfig = require('./webpack.base.config.js');

webpackBaseConfig = merge(webpackBaseConfig, {
    devtool: 'cheap-eval-source-map',
    plugins: []
});

module.exports = webpackBaseConfig;
