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
            }
        ]
    },
    devtool:"source-map",

}