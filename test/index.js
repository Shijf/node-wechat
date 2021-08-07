/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-15 16:23:11
 * @LastEditTime: 2020-07-06 12:33:17
 * @LastEditors: shijf
 * @FilePath: /node-echat/test/index.js
 * @Description: 测试主入口
 */

 // 引入node-echat 包

 let Factory = require('./../index')
const config = require('./config')
const app = Factory.wwlocal(config);
app.messager.textMsg('456').toUser(18000358).send()











