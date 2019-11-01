const path = require('path'); // 引入‘path’，为了在这里使用绝对路径，避免相对路径在不同系统时出现不必要的问题
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports ={
    // 应用入口
    entry: {
        entry: path.resolve(__dirname, './index.js'),  // app.js作为打包的入口
    },
    // 输出目录
    output: {
        filename: '[name].[hash].js',  //name代表entry对应的名字; hash代表 整个app打包完成后根据内容加上hash。一旦整个文件内容变更，hash就会变化
        path: path.join(__dirname, './dist'), // 打包好之后的输出路径
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
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            import: true,
                            modules: true,
                            localsConvention: "camelCaseOnly"
                        },
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|ico)$/i,
                loader: 'file-loader',
                options: {}
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: '背单词1',
            inject: 'body',
            favicon: path.resolve(__dirname, './public/favicon.ico'),
            template: path.resolve(__dirname, './public/index.html'),
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        })  // 生成一个html页面，同时在webpack编译的时候。把我们所生成的entry都注入到这个html页面中,路径都是根据我们output配置的来走的。

    ]
};