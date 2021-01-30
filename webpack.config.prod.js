/**
 * @description 用于发布
 */
const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 打包分析和进度
const WebpackBar = require('webpackbar')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const chalk = require('chalk');
const theme = require('./theme.js')

module.exports = {
    entry: path.resolve(__dirname, 'src/component/Demo.js'),
    output: {
        path: path.resolve(__dirname, 'lib'),
        libraryTarget: 'umd',
        filename: 'index.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: [{
                    loader: 'babel-loader'
                }],
                include: path.join(__dirname, 'src'),
                exclude: path.join(__dirname, 'node_modules')
            },
            {
                test: /\.css$/,
                loader: [
                    'style-loader',
                    "css-loader"
                ]
            },
            {
                test: /\.less$/,
                include: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            modifyVars: theme,
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]___[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8 * 1024,   //小于10k的 会打包成base64 大于的会默认交给file-loader处理 依赖file-loader
                        outputPath: 'static/', //图片默认放在这个路径下
                        name: '[name].[ext]',
                        fallback: 'file-loader'
                    }
                }
            }
        ]
    },
    externals: {
        'react': 'react',
        'react-dom': 'react-dom',
        'antd': 'antd',
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new ProgressBarPlugin({
            format:
                'build [:bar]' +
                chalk.green.bold(':percent') +
                ' (:elapsed)',
            width: 40
        }),
        new WebpackBar(),
        new BundleAnalyzerPlugin()
    ],
    mode: 'production'
}
