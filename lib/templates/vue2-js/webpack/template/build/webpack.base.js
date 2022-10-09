/*

  开发生产环境公配置
    - 入口，输出配置
    - 各种文件的处理
    - 进度条展示
    - 路径别名

*/

const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { VueLoaderPlugin } = require("vue-loader")
const WebpackBarPlugin = require('webpackbar')
const chalk = require("chalk")
module.exports = {
    entry: {
        main: "./src/main.js"
    },
    output: {
        //输出到dist文件夹
        path: path.resolve(__dirname, "../dist"),
        //js文件下
        // 疑问？[contenthash----]时，每次vue的css变化，css文件不一致，加载不出来
        filename: "js/chunk-[contenthash].js",
        //每次打包前自动清除旧的dist
        clean: true,
    },
    resolve: {
        //路径别名
        alias: {
            "@": path.resolve("./src"),
            assets: '~/assets',
            tools: '~/tools'
        },
        //引入文件时省略后缀
        extensions: [".js", ".ts", ".less", ".vue"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            //选择模板
            template: "./public/index.html",
            //打包后的名字
            filename: "index.html",
            //js文件插入到body里
            inject: "body"
        }),
        new VueLoaderPlugin(),
        new WebpackBarPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/,
                type: "asset",
                parser: {
                    //转base64的条件
                    dataUrlCondition: {
                        maxSize: 25 * 1024,//25kb
                    }
                },
                generator: {
                    //打包到dist/image文件夹
                    filename: 'images/[contenthash][ext][query]',
                }
            },
            <%_ if (hasBabel) { _%>
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader:"babel-loader",
                        options:{
                            // 开启缓存
                            cacheDirectory:true
                        }
                    }
                ]
            },
            <%_ } _%>
            {
                test: /\.vue$/,
                use: "vue-loader",
            }
        ]
    }
}