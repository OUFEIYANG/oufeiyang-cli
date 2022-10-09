module.exports = {
    babelConfig: {
        presets: [
            //配置规则
            "@babel/preset-env",
            //支持vue中的jsx语法
        ],
        //配置插件
        plugins: ["@babel/plugin-transform-runtime"]
    },
    package: {
        devDependencies: {
            "@babel/core": "^7.19.0",
            "@babel/plugin-transform-runtime": "^7.18.10",
            "@babel/preset-env": "^7.19.0",
            "babel-loader": "^8.2.5",
        }
    }

}