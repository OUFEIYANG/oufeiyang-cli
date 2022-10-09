var fs = require("fs-extra");
const path = require("path")
module.exports = function copy(option) {

    // 模版文件目录

    const destUrl = path.join(__dirname, `templates/vue2-js/template`);
    // router目录
    const routerPath = path.join(__dirname, `templates/vue2-js/router/template`);
    // process.cwd() 对应控制台所在目录
    // 新建项目目录
    const cwdUrl = `${process.cwd()}/${option.projectName}`

    console.log('>>>destUrl', destUrl);
    console.log('>>>cwdUrl', cwdUrl);
    // 创建目录
    fs.mkdir(cwdUrl)

    fs.outputFile(cwdUrl + '/b.js', 'const b=1', err => {
        if (err) throw err
        console.log('success1111')
    })
    return
    // copy文件
    fs.copy(destUrl, cwdUrl, err => {
        if (err) return console.error(err)
        console.log('success!')

        fs.copy(routerPath, cwdUrl, err2 => {
            if (err2) return console.error(err2)
            console.log('success2!')
        })
    })


    // fs.copy(destUrl, cwdUrl, err => {
    //     if (err) throw err
    //     console.log('success')
    // })
}