#! /usr/bin/env node

const program = require('commander')
const inquirer = require('inquirer')
const copy=require("../lib/copy")


program
  // 定义命令和参数
  .command('init')
  .description('create a new project')
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  // .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    // 打印执行结果
    inquirer.prompt([
      {
        type: 'input', 
        name: 'projectNname',
        message: 'Your project name',
        default: 'my-app'
      },
      {
        type: "list", 
        message: "Select a framework:", 
        name: "projectFramework", 
        choices: ["vue", "react"],
      },
      {
        type: "list", 
        message: "Select a variant:", 
        name: "projectVariant", 
        choices: ["JavaScript", "TypeScript"],
      }
    ]).then(answers => {
      // 打印互用输入结果
      console.log(answers)
      copy(answers)
    })
  })
  
// program
//    // 配置版本号信息
//   .version(`v${require('../package.json').version}`)
//   .usage('<command> [option]')
  
// // 解析用户执行命令传入参数
program.parse(process.argv);