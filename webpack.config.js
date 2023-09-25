const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require('path')
// webpack.config.js
module.exports = {
    // webpack 会从 entry 指定的文件开始,递归解析入口文件所依赖的其他模块和文件,最后生成输出 bundles
    entry: {
        // index.js 导入 str.js
        // one.js 导入two.js
        index: "./src/index.js",
        one: "./src/one.js"
    },
    output: {
        // __dirname 就是E:\myweb\面试\webpack\reactdemo
        path: path.resolve(__dirname, "dist"),
        filename: '[name]_[contenthash].main.js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //     presets: ['@babel/preset-env', '@babel/preset-react']
                    // }
                }
            },
            {
                test: /\.css$/,//要监控的文件
                use: ['style-loader', 'css-loader'],//横着写的先调后面的再调前面的，先把css通过import引入然后再去找多个import把多个css文件合成一个再交给style-loader,style-loader把他们转换成js然后打包进去
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'less-loader' // compiles Less to CSS
                }]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'sass-loader' // compiles sass to CSS
                }]
            }


        ]
    },
    plugins: [
        //配置多个应用
        new HtmlWebpackPlugin({ //假设是前台应用入口
            title: '首页',
            filename: "index.html",
            template: "./public/index.html",//注入打包生成的 js/css 文件
            chunks: ["index"]    //chunks指定需要引入的入口模块的键名 index:"./src/index.js"
        }),
        new HtmlWebpackPlugin({//假设是后台应用入口one:"./src/one.js"
            title: 'One',
            filename: "one.html",
            template: "./public/one.html",//注入打包生成的 js/css 文件
            chunks: ["one"] //chunks指定需要引入的入口模块的键名 one:"./src/one.js"
        })
    ],

    devtool: "source-map",

}