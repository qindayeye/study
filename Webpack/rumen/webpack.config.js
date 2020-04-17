const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin') // 引入html-webpack-plugin
module.exports = {
    entry: {
        index: "./src/js/index.js" // 入口文件，若不配置webpack4将自动查找src目录下的index.js
    },
    output: {
        filename: "[name].bundle.js",// 输出文件名，[name]表示入口文件js名
        path: path.join(__dirname, "./dist/")// 输出文件路径
    },
    module: {  // 处理对应模块
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] // 处理css
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            outputPath: 'images/', // 输出到image文件夹
                            limit: 500 // 把小于500b的文件打包成Base64的格式，写入JS
                        }
                    }
                ]
            }
        ]
    },
    plugins:[ // 对应的插件
        new HtmlWebPackPlugin({
            filename:'index.html',// 输出文件名
            template:'./index.html',// 以当前目录下的index.html文件为模板生成dist/index.html文件
        }),
        // 
       new webpack.HotModuleReplacementPlugin()

    ],
    devServer:{ // 配置静态文件服务器，可以用来预览打包后的项目
        inline:true, // 打包后加入一个websocket客户端
        hot:true, // 热加载
        contentBase:path.resolve(__dirname,'dist'), // 开发服务运行时的文件根目录
        host:"localhost",// 主机地址
        port:4000,// 端口号
        compress:true // 开发服务器是否启动gzip等压缩

    }
}










