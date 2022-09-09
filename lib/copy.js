var fs = require("fs-extra");
const path = require("path")
module.exports = function copy(option) {
    const from = ''
    const target = ''
    // 模版文件目录
    const destUrl = path.join(__dirname, 'templates/vue');
    // 生成文件目录
    // process.cwd() 对应控制台所在目录
    const cwdUrl = process.cwd();
    console.log('>>>', destUrl);
    console.log('>>>', cwdUrl);

    // 创建目录
    fs.mkdir(`${cwdUrl}/${option.projectNname}`)

    // fs.copy(destUrl, cwdUrl, err => {
    //     if (err) throw err
    //     console.log('success')
    // })
}