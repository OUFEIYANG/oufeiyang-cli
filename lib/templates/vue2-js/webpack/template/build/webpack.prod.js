/*

生产环境独有配置
    - 不同的source-map模式
    - 不同的环境变量

*/

const {merge} =require("webpack-merge")
const base = require("./webpack.base")
const { DefinePlugin } = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
module.exports=merge(base,{
    mode:"production",
    // 开发环境，定位到源码报错位置，不能源码展示体积较小，适合生产环境
    devtool:'nosources-source-map',
    // 定义全局变量
    plugins: [
        new DefinePlugin({
            process: {
                env: {
                    NODE_DEV: JSON.stringify('production'),
                    // 这里可以定义环境变量
                    VUE_APP_URL: JSON.stringify('BBBBB')
                }
            }
        }),
        new MiniCssExtractPlugin({
            //将css代码输出到dist/styles文件夹下
            filename: "styles/chunk-[contenthash].css",
            ignoreOrder: true,
        }),
    ],
    module:{
        rules:[
            {
                //匹配文件后缀的规则
                test: /\.(css|scss|less)$/,
                use: [
                    //loader执行顺序是从右到左
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    <%_ if (hasLess) { _%> 
                    "less-loader",
                    <%_ } _%>
                ]
            },
        ]
    },
})