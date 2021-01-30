/**
 * @description 用于本地调试 
 */
const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const theme = require('./theme.js')

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: [{
                    loader: 'babel-loader'
                }],
                include: path.join(__dirname, 'src'),
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
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(['dist'])
    ],
    resolve: {
        extensions: ['.jsx', '.js', 'css'],
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        historyApiFallback: true,
    },
    mode: 'development'//默认是production 生产环境
}
