const path = require('path')
const os = require('os')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin") //将 CSS 文件打包为一个单独文件
const Vendors = ['vue', 'iview', 'vue-router', 'axios', 'babel-polyfill', 'qs', path.resolve(__dirname, '../src/js/util.js')] //, path.resolve('../src/js/util.js')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
    entry: {
        build: [path.resolve(__dirname, '../src/main.js')],
        vendors: Vendors
    }, // 入口文件
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: "bundle.[hash:6].js",
        publicPath: ''
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../src'),
            js: path.resolve(__dirname, '../src/js')
        }
    },
    plugins: [
        new HappyPack({
            loaders: ['babel-loader?presets[]=env'],
            threadPool: happyThreadPool
        }),
        new ExtractTextPlugin("[name].[hash:6].css"),
        new HtmlWebpackPlugin({//整个项目的html，inject
            filename: './index.html',
            template: path.resolve(__dirname, '../src/index.html'),
            title:"mooc后台"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.[hash:6].js'
        })
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: [path.resolve('src'), path.resolve('node_modules/vue-echarts')],
                options: {
                    loaders: {
                        less: ExtractTextPlugin.extract({
                            use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
                            fallback: 'vue-style-loader'
                        }),

                        css: ExtractTextPlugin.extract({
                            use: ['css-loader', 'autoprefixer-loader'],
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /iview\/.*?js$/,
                loader: 'happypack/loader',
                exclude: /node_modules/,
                options: {
                    presets: ["env"]
                }
            },
            {
                test: /\.js$/,
                loader: 'happypack/loader',
                include: [path.resolve('src'), path.resolve('node_modules/vue-echarts')],
                options: {
                    presets: ["env"]
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?minimize', 'autoprefixer-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", 'autoprefixer-loader', "less-loader"]
                })
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=1024&name=images/[name][hash:6].[ext]'
            },
            {
                test: /\.(html|tpl)$/,
                exclude: /node_modules/,
                loader: 'html-loader'
            }
        ]
    }
}