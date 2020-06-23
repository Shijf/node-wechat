/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-15 16:23:11
 * @LastEditTime: 2020-06-23 21:56:14
 * @LastEditors: shijf
 * @FilePath: /node-echat/test/index.js
 * @Description: 测试主入口
 */ 

// // eslint-disable-next-line no-unused-vars
// const { expect } = require('chai')
// const HttpClient = require('../lib/kernel/client/httpclient')
// // eslint-disable-next-line no-undef
// describe('httpClient test', () => {
//     // eslint-disable-next-line no-undef
//     it('should say Hello world', async () => {
//         const client = new HttpClient()
//         const res = client.curl('http://www.baidu.com')
//         console.log(res);
        
//         expect(res).to.equal('Hello world')
//     })
// })
const config = require('./config');
const Factory = require('./../index');
const ph = require('path')
console.time('timeout');

const app = Factory.wwlocal(config);

// app.agent.getWorkbenchTemplate();

// app.messager.textMsg('456').toUser('18000358').send();
const path = require('path');
const dest = path.join(__dirname, '123.exe');
// console.log(app.media.uploadFile(dest).then(res => {
//     console.log(res);
// }))

// console.log(Helper.formatBytes(2097152, 2));




console.timeEnd('timeout');