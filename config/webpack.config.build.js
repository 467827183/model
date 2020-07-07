const path = require('path'); // 引入‘path’，为了在这里使用绝对路径，避免相对路径在不同系统时出现不必要的问题
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const {BUILD_ENV} = process.env;
let buildConfig = '',configs = require('./build.config'),loader_scripts=''
buildConfig = configs[BUILD_ENV]['constant']
loader_scripts = configs[BUILD_ENV]['scripts'];
//根据不同环境配置不同的css和js地址
module.exports ={
    // 应用入口
    entry: {
        entry: path.resolve(__dirname, '../index.js'),  // app.js作为打包的入口
    },
    // 输出目录
    output: {
        filename: '[name].[hash].js',  //name代表entry对应的名字; hash代表 整个app打包完成后根据内容加上hash。一旦整个文件内容变更，hash就会变化
        path: path.join(__dirname, '../dist'), // 打包好之后的输出路径
    },
    module: {
        rules: [
            {
                test: /\.js$/,
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
                            "@babel/plugin-proposal-class-properties"
                        ]
                    }
                }
            }, {
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
                test: /\.(png|jpg|gif|svg|ico)$/i,
                loader: 'file-loader',
                options: {}
            }
        ]
    },
    optimization: {
        minimizer: [
            //js压缩
            new UglifyJSPlugin({
                sourceMap: true,
                parallel: 4,
                uglifyOptions: {
                    output: {
                        //好像是注释和格式化
                        comments: false,
                        beautify: false,
                    },
                    //压缩后把warning取消了？？
                    compress: {
                        drop_console: true
                    },
                },
                cache: true,
            }),
            //这个是css压缩不过这压缩引用这么多次没问题么
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            chunks: 'async',//默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
            minSize: 30000,//合并前模块文件的体积
            minChunks: 1,//最少被引用次数
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name:false,
            automaticNameDelimiter: '~',//自动命名连接符
            cacheGroups: {
                vendors: {
                    name: 'vendor',
                    chunks: 'initial',
                    priority: -10,
                    reuseExistingChunk: false,
                    test: /node_modules\/(.*)\.js/
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    minChunks: 1,
                    minSize:0,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        },
        runtimeChunk:{
            name:'manifest'
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: "server",
            analyzerHost: "127.0.0.1",
            analyzerPort: 8887, // 运行后的端口号
            reportFilename: "report.html",
            defaultSizes: "parsed",
            openAnalyzer: true,
            generateStatsFile: false,
            statsFilename: "stats.json",
            statsOptions: null,
            logLevel: "info"
        }),
        new webpack.DefinePlugin({
            'VALUE': JSON.stringify(buildConfig.COMMONTEXT),
            VERSION: JSON.stringify("5fa3b9"),
            BROWSER_SUPPORTS_HTML5: true,
            TWO: "1+1",
            "typeof window": JSON.stringify("object")
        }),
        new HtmlWebpackPlugin({
            inject: 'body',//或者为true ,所有的js资源插入到body元素的底部 head为head中 false css和js资源不会注入
            favicon: path.resolve(__dirname, '../public/favicon.ico'),
            template: path.resolve(__dirname, '../public/index.html'),
            hash: true,
            templateParameters:{
                // cdn_path:source_path,
                title:'背单词1',
                // load_scripts:{
                //     js:loader_scripts['js'],
                //     css:loader_scripts['css']
                // }
            },
            //下面这个是专门给html的压缩
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            }
        }), // 生成一个html页面，同时在webpack编译的时候。把我们所生成的entry都注入到这个html页面中,路径都是根据我们output配置的来走的。
        //压缩css的
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].[id].css',
        }),
    ]
};