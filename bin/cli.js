#! /usr/bin/env node

const program = require('commander')
const inquirer = require('inquirer')
const copy = require("../lib/copy")
const create = require("../lib/create")
const chalk = require("chalk")
const path = require("path")
const fs = require("fs-extra")
// const isNamePass = require("../lib/cover-file.js")
// 1.输入项目名字。判断有无存在同名目录
// 2.继续询问

program
  // 定义命令和参数
  .command('init')
  .action((name, options) => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: `${chalk.yellow('Your project name')}`,
        default: 'aaa',
      },
    ]).then(async answers => {
      if (! await isNamePass(answers)) return  //已存在同名文件夹，不同意删除就不往后执行
      question(answers)
    })
  })

// program
//    // 配置版本号信息
//   .version(`v${require('../package.json').version}`)
//   .usage('<command> [option]')

// // 解析用户执行命令传入参数
program.parse(process.argv);

async function isNamePass(option) {
  // 执行创建命令

  // 当前命令行选择的目录
  const cwd = process.cwd();
  // 需要创建的目录地址
  const targetAir = path.join(cwd, option.projectName)

  option.targetAir = targetAir

  // 目录是否已经存在？
  if (fs.existsSync(targetAir)) {
    // 询问用户是否确定要覆盖
    let { action } = await inquirer.prompt([
      {
        name: 'action',
        type: 'list',
        message: 'Target directory already exists Pick an action:',
        choices: [
          {
            name: 'Overwrite',
            value: true
          }, {
            name: 'Cancel',
            value: false
          }
        ]
      }
    ])
    if (action) {
      // 移除已存在的目录
      option.remove = true
      // console.log(`\r\nRemoving...`)
      // await fs.remove(targetAir) //应该问完问题再删除
    }
    return action
  } else {
    // 不存在
    return true
  }
}

function question(lastAnswers) {
  inquirer.prompt([
    {
      type: "list",
      message: `${chalk.yellow("Select a framework:")}`,
      name: "projectFramework",
      choices: ["vue", "react"],
    },
    {
      type: "checkbox",
      when: answers => {
        return answers.projectFramework === "vue"
      },
      message: `${chalk.yellow("add any dependencies ?")}`,
      name: "dependencies",
      choices: [ // 具体的选项
        {
          "name": "Babel",
          "value": "babel",
          "checked": true
        },
        {
          "name": "Router",
          "value": "vueRouter",
          "checked": false
        },
      ]
    }
    // {
    //   type: "list", 
    //   message: "Select a variant:", 
    //   name: "projectVariant", 
    //   choices: ["JavaScript", "TypeScript"],
    // }
  ]).then(answers => {
    create({ ...lastAnswers, ...answers })
  })
}