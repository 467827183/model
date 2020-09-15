const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const buildConfig = require('./build.config')

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, '../index.js'),
    devServer:{
        open:true,
        stats:'none'
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
                        "plugins": [
                            "@babel/plugin-transform-runtime",
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-proposal-optional-chaining"
                        ]
                    }
                }
            },{
                // For CSS modules
                test: /\.css?$/,
                include: /node_modules/,
                use: [
                  'style-loader','css-loader'
                 
                ],
              },{
                // For pure CSS (without CSS modules)
                test: /\.css?$/,
                exclude: /node_modules/,
                use: ['style-loader',{
                    loader: 'css-loader',
                    options: {
                        url:true,
                        import:true,
                      modules: true,
                    },
                  },],
              },
         
            {
                test: /\.(png|jpg|gif|svg|ico|ttf|woff|woff2)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name]_[hash].[ext]',
                    outputPath: 'images/'
                }
            }
        ]
    },
    plugins: [
        // new BundleAnalyzerPlugin({
        //     analyzerMode: "server",
        //     analyzerHost: "127.0.0.1",
        //     analyzerPort: 8887, // 运行后的端口号
        //     reportFilename: "report.html",
        //     defaultSizes: "parsed",
        //     openAnalyzer: true,
        //     generateStatsFile: false,
        //     statsFilename: "stats.json",
        //     statsOptions: null,
        //     logLevel: "info"
        // }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'VALUE': JSON.stringify(buildConfig.COMMONTEXT),
            VERSION: JSON.stringify("5fa3b9"),
            BROWSER_SUPPORTS_HTML5: true,
            TWO: "1+1",
            "typeof window": JSON.stringify("object")
        }),
        new HtmlWebpackPlugin({
            templateParameters:{
                // cdn_path:source_path,
                title:'背单词1',
                // load_scripts:{
                //     js:loader_scripts['js'],
                //     css:loader_scripts['css']
                // }
            },
        favicon: path.resolve(__dirname, '../public/favicon.ico'),
        template: path.resolve(__dirname, '../public/index.html')
    }),]
};