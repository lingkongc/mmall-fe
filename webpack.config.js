/*
 * @Author: lingkongc
 * @Date:   2019-06-24 10:30:12
 * @Last Modified by:   lingkongc
 * @Last Modified time: 2019-06-25 10:20:05
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 获取html-webpack-plugin参数
const getHtmlConfig = function(name) {
    return {
        template: `./src/view/${name}.html`,
        filename: `view/${name}.html`,
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
};

const config = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: {
        common: './src/page/common/',
        index: './src/page/index/',
        login: './src/page/login/'
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    externals: {
        'jquery': 'window.jquery'
    },
    devServer: {
        overlay: true,
        contentBase: path.join(__dirname, "dist"),
        open: true,
        port: 8080,
        hot: true,
        hotOnly: true,
        historyApiFallback: true,
        // 代理 请求改地址就会转发 有利于开发环境
        // 仅对开发环境生效，线上请求的是源码中的地址
        // proxy: {
        //     // '/react/api': 'http://www.dell-lee.com'
        //     '/react/api': {
        //         target: 'http://www.dell-lee.com',
        //         pathRewrite: {
        //             'header.json': 'demo.json'
        //         },
        //         changeOrigin: true
        //     }
        // }
    },

    optimization: {
        //使用tree shaking的方法
        usedExports: true,
        // 代码分割
        splitChunks: {
            chunks: "all",
            minSize: 30000,
            // 打包的包被引用的最小次数
            minChunks: 1,
            // 最大异步加载的js数量
            maxAsyncRequests: 5,
            // 首页入口文件加载的js数量
            maxInitialRequests: 3,
            // 分割文件的分隔符
            automaticNameDelimiter: "~",
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    // 规则优先级 越大越高
                    priority: -10,
                    filename: "vendors.js"
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    // 如果一个模块已经被打包过了，就忽略这个模块
                    reuseExistingChunk: true
                }
            }
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            test: /\.(jpg|png|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name]_[hash].[ext]',
                    outputPath: 'images/',
                    limit: 10240
                }
            }
        }, {
            test: /\.(woff|eot|ttf|svg)$/,
            loader: 'file-loader'
        }, {
            test: /\.css$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // you can specify a publicPath here
                        // by default it uses publicPath in webpackOptions.output
                        publicPath: '../',
                        hmr: process.env.NODE_ENV === 'development',
                        reloadAll: true,
                    },
                },
                // 'style-loader',
                'css-loader',
                'postcss-loader'
            ]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // css单独打包
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'css/[name].css',
            chunkFilename: '[id].css'
        }),
        // html模版处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ]
};

module.exports = config;