/*
 * @Author: lingkongc
 * @Date:   2019-06-24 10:30:12
 * @Last Modified by:   Asling
 * @Last Modified time: 2019-07-09 20:38:15
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 获取html-webpack-plugin参数
const getHtmlConfig = function(name, title) {
    return {
        template: `./src/view/${name}.html`,
        filename: `view/${name}.html`,
        title: title,
        favicon: './favicon.ico',
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
};
const config = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: {
        'common': './src/page/common/index.js',
        'index': './src/page/index/index.js',
        'list': './src/page/list/index.js',
        'detail': './src/page/detail/index.js',
        'cart': './src/page/cart/index.js',
        'order-confirm': './src/page/order-confirm/index.js',
        'order-list': './src/page/order-list/index.js',
        'user-login': './src/page/user-login/index.js',
        'user-register': './src/page/user-register/index.js',
        'user-pass-reset': './src/page/user-pass-reset/index.js',
        'user-center': './src/page/user-center/index.js',
        'user-center-update': './src/page/user-center-update/index.js',
        'result': './src/page/result/index.js'
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
        historyApiFallback: true,
        compress: true,
        // 代理 请求改地址就会转发 有利于开发环境
        // 仅对开发环境生效，线上请求的是源码中的地址
        proxy: {
            // '/react/api': 'http://www.dell-lee.com'
            '/api': {
                target: 'http://test.happymmall.com',
                pathRewrite: {
                    '^/api': ''
                },
                changeOrigin: true,
            }
        }
    },
    // optimization: {
    //     //使用tree shaking的方法
    //     usedExports: true,
    //     // 代码分割
    //     splitChunks: {
    //         chunks: "all",
    //         minSize: 30000,
    //         // 打包的包被引用的最小次数
    //         minChunks: 1,
    //         // 最大异步加载的js数量
    //         maxAsyncRequests: 5,
    //         // 首页入口文件加载的js数量
    //         maxInitialRequests: 3,
    //         // 分割文件的分隔符
    //         automaticNameDelimiter: "~",
    //         name: true,
    //         cacheGroups: {
    //             vendors: {
    //                 test: '/[\\/]node_modules[\\/]/',
    //                 // 规则优先级 越大越高
    //                 priority: -10,
    //                 filename: "base.js"
    //             },
    //             default: {
    //                 minChunks: 2,
    //                 priority: -20,
    //                 // 如果一个模块已经被打包过了，就忽略这个模块
    //                 reuseExistingChunk: true
    //             }
    //         }
    //     }
    // },
    module: {
        rules: [{
            test: /\.(jpg|png|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name]_[hash].[ext]',
                    outputPath: 'images/',
                    // limit: 10240
                }
            }
        }, {
            test: /\.string$/,
            loader: 'html-loader'
        }, {
            test: /\.(woff|woff2|eot|ttf|svg|otf)$/,
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
        // new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // css单独打包
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'css/[name].css',
            chunkFilename: '[id].css'
        }),
        // html模版处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情')),
        new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '订单确认')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list', '订单列表')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '用户中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果'))
    ]
};

module.exports = config;