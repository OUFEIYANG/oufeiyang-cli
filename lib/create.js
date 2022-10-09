
var fs = require("fs-extra");
const path = require("path");
const ejs = require("ejs");
const globby = require("globby")
const { isBinaryFileSync } = require('isbinaryfile')
const chalk = require("chalk")

const chalkYellow = (str) => chalk.rgb(255, 255, 0)(str)

const chalkGreen = (str) => chalk.rgb(0, 255, 0)(str)


module.exports = async function (option) {
    if (option.remove) {
        console.log(`\r\nRemoving...`)
        await fs.removeSync(option.targetAir) //应该问完问题再删除
        console.log(`\r\nRemoved`)
    }

    fs.ensureDirSync(option.targetAir)
    // if (option.projectFramework === "vue") {
    option.dependencies.unshift("webpack", "vue")
    // }

    console.log('>>>create.js', option);
    // 生成package.json文件
    addPackageJson(option)

    // 生成babel.config.js
    addBabelConfigJS(option)

    // ejs template文件
    await copyTemplate(option)

    console.log(`\r\n${chalkGreen("Successfully created project")} ${chalk.rgb(255, 255, 0).underline(option.projectName)}`)
    console.log(`\r\n${chalkYellow("  cd " + option.projectName)}`)
    console.log(`  ${chalkYellow("npm install")}\r`)
    console.log(`  ${chalkYellow("npm run dev")}\r\n`)

    function addPackageJson(option) {
        let packageContent = {}
        option.dependencies.forEach(item => {
            const { package = null } = require(`./templates/vue2-js/${item}/index`)
            if (!package) return
            Object.keys(package).forEach(key => {
                if (typeof package[key] === "object" && package[key] !== null) {
                    //引用数据类型
                    packageContent[key] = { ...packageContent[key], ...package[key] }
                } else {
                    packageContent[key] = package[key]
                }
            })
        });
        packageContent.name = option.projectName
        let str = JSON.stringify(packageContent, null, 2) + '\n'
        fs.outputFileSync(option.targetAir + "/package.json", str)
    }



    function addBabelConfigJS(option) {
        let presets = []
        let plugins = []
        option.dependencies.forEach(item => {
            const { babelConfig = null } = require(`./templates/vue2-js/${item}/index`)
            if (!babelConfig) return
            const { presets: presetsList = null, plugins: pluginsList = null } = babelConfig
            presets = [...presets, ...presetsList]
            plugins = [...plugins, ...pluginsList]
        });
        let obj = { presets, plugins }
        // 换行
        let str = 'module.exports=' + JSON.stringify(obj, null, 2) + '\n'
        fs.outputFileSync(option.targetAir + "/babel.config.js", str)
    }
    async function copyTemplate(option) {
        option.hasBabel = option.dependencies.includes("babel") || false
        option.hasRouter = option.dependencies.includes("router") || false
        option.hasVuex = option.dependencies.includes("vuex") || false
        option.hasLess = option.dependencies.includes("less") || false
        option.dependencies.forEach(async item => {
            const temUrl = path.join(__dirname, `templates/vue2-js/${item}/template`);
            const _files = await globby(['**/*'], { cwd: temUrl, dot: true })
            for (const pathItem of _files) {
                let tem = path.join(temUrl, "/" + pathItem)
                let tarUrl = path.join(option.targetAir, "/" + pathItem)
                // renderFile（模版文件地址，传入渲染数据）
                // 如果是二进制文件，直接将读取结果返回
                if (isBinaryFileSync(tem)) {
                    fs.copySync(tem, tarUrl) // return buffer
                } else {
                    ejs.renderFile(tem, option).then(data => {
                        // 生成 ejs 处理后的模版文件
                        fs.outputFileSync(tarUrl, data)
                    })
                }
            }
        })
    }
}