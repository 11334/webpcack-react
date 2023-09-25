const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


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
                use: [MiniCssExtractPlugin.loader, 'css-loader'],//横着写的先调后面的再调前面的，先把css通过import引入然后再去找多个import把多个css文件合成一个再交给style-loader,style-loader把他们转换成js然后打包进去
            },
            {
                test: /\.less$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'less-loader' // compiles Less to CSS
                }]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader // creates style nodes from JS strings
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
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name]-[hash].css',
            chunkFilename: '[id].css',
        }),

    ],

    devtool: "source-map",

    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
            // 1. directory: 配置静态文件目录为 dist 目录。
            // 2. __dirname 为当前文件所在目录的全路径。
            // 3. path.join 拼接目录,这里得到的是项目根目录/dist。
            // 4. 所以该配置表示,以项目根目录下的 dist 文件夹作为静态文件目录。
        },
        // contentBase: path.join(__dirname, 'dist'), 已经被废弃啦
        compress: true,//会 gzip(压缩) 和 serve(服务) 所有来自项目根路径下 dist/ 目录的文件
        port: 8080,
        proxy: {
            "/data": { //地址
                "target": "https://www.baidu.com/", //接口地址,跨域访问
                secure: false,// 如果是https接口，需要配置这个参数
                "changeOrigin": true,//开启跨域
                "pathRewrite": { "^/data": "" }
                //^/data - 匹配所有以 /data 开头的请求路径 "" - 
                // 将匹配到的 /data 前缀部分用空字符串 "" 替换
            }
        }
    }


}