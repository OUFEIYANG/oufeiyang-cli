
var fs = require("fs-extra");
const path = require("path");
const ejs = require("ejs");

module.exports = async function (option) {

    if (option.remove) {
        console.log(`\r\nRemoving...`)
        await fs.removeSync(option.targetAir) //应该问完问题再删除
        console.log(`\r\nRemoved`)
    }

    fs.ensureDirSync(option.targetAir)
    if (option.projectFramework === "vue") {
        option.dependencies.unshift("webpack", "vue")
    }

    console.log('>>>create.js', option);
    // 生成package.json文件
    addPackageJson(option)

    // 生成babel.config.js
    addBabelConfigJS(option)

    // copy template文件
    // copyTemplate(option)

    function addPackageJson(option) {
        let packageContent = {}
        option.dependencies.forEach(item => {
            const { package = null } = require(`./templates/vue2-js/${item}/index.js`)
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
        let str = JSON.stringify(packageContent, null, 2) + '\n'
        fs.outputFile(option.targetAir + "/package.json", str, (err) => {
            if (err) return console.error(err)
        })
    }



    function addBabelConfigJS(option) {
        let presets = []
        let plugins = []
        option.dependencies.forEach(item => {
            const { babelConfig = null } = require(`./templates/vue2-js/${item}/index.js`)
            if (!babelConfig) return
            const { presets: presetsList = null, plugins: pluginsList = null } = babelConfig
            presets = [...presets, ...presetsList]
            plugins = [...plugins, ...pluginsList]
            // if (!package) return
        });
        let obj = { presets, plugins }
        let str = 'module.exports=' + JSON.stringify(obj, null, 2) + '\n'
        fs.outputFile(option.targetAir + "/babel.config.js", str, (err) => {
            if (err) return console.error(err)
        })
        // let str = JSON.stringify(packageContent, null, 2) + '\n'
        // fs.outputFile(option.targetAir + "/package.json", str, (err) => {
        //     if (err) return console.error(err)
        // })
    }
    function copyTemplate(option) {
        option.dependencies.forEach(item => {
            let copyUrl = path.join(__dirname, `/templates/vue2-js/${item}/template`)
            // fs.copy(copyUrl, option.targetAir, err => {
            //     if (err) return console.error(err)
            // })

            fs.readdir(copyUrl, (err, files) => {
                if (err) throw err;
                files.forEach((file) => {
                    // 使用 ejs 渲染对应的模版文件
                    // renderFile（模版文件地址，传入渲染数据）
                    ejs.renderFile(path.join(copyUrl, file), answers).then(data => {
                        // 生成 ejs 处理后的模版文件
                        fs.writeFileSync(path.join(cwdUrl, file), data)
                    })
                })
            })

        })
    }
}