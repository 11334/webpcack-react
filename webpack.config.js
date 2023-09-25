const path = require('path')
// webpack.config.js
module.exports = {
    // webpack 会从 entry 指定的文件开始,递归解析入口文件所依赖的其他模块和文件,最后生成输出 bundles
    entry: "./src/index.js",
    output: {
        // __dirname 就是E:\myweb\面试\webpack\reactdemo
        path:path.resolve(__dirname,"dist"),
        filename:'main.js'
    },
    mode: 'production'
}