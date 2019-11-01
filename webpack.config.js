const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, './index.js'),
    devServer:{
        open:true,
        // historyApiFallback: true
    },
    output: {
        path: path.resolve(__dirname, './dist/js'),
        filename: 'app.js',
        chunkFilename: "[name]-[chunkhash].js",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ],
                        plugins: [
                            "@babel/plugin-transform-runtime",
                            "@babel/plugin-proposal-class-properties",
                            ["import", {
                                "libraryName": 'antd',
                                "libraryDirectory": "es",
                                "style": "css" // `style: true` 会加载 less 文件
                            }]
                        ]
                    }
                }
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            import: true,
                            modules: true,
                            localsConvention: "camelCaseOnly",
                        },
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|ico|ttf|woff|woff2)$/i,
                loader: 'file-loader',
                options: {}
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
        title: '背单词',
        favicon: path.resolve(__dirname, './public/favicon.ico'),
        template: path.resolve(__dirname, './public/index.html')
    }),]
};