/*

 开发环境独有配置
    - webpack-dev-server
    - 不同的source-map模式
    - 不同的环境变量

*/

const { merge } = require("webpack-merge")
const base = require("./webpack.base")
const { DefinePlugin } = require("webpack")
module.exports = merge(base, {
    mode: "development",
    devServer: {
        // 自定义端口
        port: 7000,
        // 自动打开浏览器
        open: true,
        proxy: {
            '/': {
                target: 'http://localhost:7000',
                // 只需要添加该方法，然后当请求的是html，则重定向到index.html
                bypass: function (req, res, proxyOptions) {
                    if (req.headers.accept.indexOf('html') !== -1) {
                        console.log('Skipping proxy for browser request.');
                        return '/index.html';
                    }
                },
            },
        },
    },
    // 开发环境，定位到源码报错位置和代码展示，适合开发环境，体积较小
    devtool: 'eval-cheap-module-source-map',
    // 定义全局变量
    plugins: [
        new DefinePlugin({
            process: {
                env: {
                    NODE_DEV: JSON.stringify('development'),
                    // 这里可以定义环境变量
                    VUE_APP_URL: JSON.stringify('[contenthash]')
                }
            }
        })
    ],
    module: {
        rules: [
            {
                //匹配文件后缀的规则
                test: /\.(css|scss|less)$/,
                use: [
                    //loader执行顺序是从右到左
                    "style-loader",
                    "css-loader",
                    <%_ if (hasLess) { _%> 
                    "less-loader",
                    <%_ } _%>
                ]
            },
        ]
    }
})