module.exports = {
     package: {
        "name": "name",
        "version": "0.0.1",
        "description": "",
        "main": "index.js",
        "scripts": {
            "dev": "webpack serve --config ./build/webpack.dev",
            "build": "webpack --config ./build/webpack.prod"
        },
        "author": "",
        "license": "ISC",
        "devDependencies": {
            "css-loader": "^6.7.1",
            "html-webpack-plugin": "^5.5.0",
            "mini-css-extract-plugin": "^2.6.1",
            "style-loader": "^3.3.1",
            "webpack": "^5.74.0",
            "webpack-cli": "^4.10.0",
            "webpack-dev-server": "^4.11.0",
            "webpack-merge": "^5.8.0",
            "webpackbar": "^5.0.2"
        },
    }

}
