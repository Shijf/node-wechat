/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-15 16:23:11
 * @LastEditTime: 2020-06-25 14:22:47
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

// const http = require('http');

// let server = http.createServer(function (req, res) {
//     // res.writeHead(301, {'Location': 'http://itbilu.com/'});
//     console.log('Nodejs TestServer is Starting & Linsten 3100');
//     const app = Factory.wwlocal(config);
//     app.jssdk.setUrl('http://www.baidu.com/?a=1&hjk=7979#jkjd');
//     res.writeHead(301, {'Location': 'http://itbilu.com/'});
    
//     console.log(res._header);
//     res.end();
//   })
// console.log('Nodejs TestServer is Starting & Linsten 3100', 'http://127.0.0.1:3100');
// server.listen(3100)


const app = Factory.wwlocal(config);

console.log(app.scan_login.base64_encode(__dirname + '/1.css'));


// console.log(app.user.userIdToOpenid('18000358').then(res => {
//     console.log(res);
    
// }));

// app.jssdk.setUrl('http://www.baidu.com/?a=1&hjk=7979#jkjd');

// console.log(app.oauth.redirectUrl());


// console.timeEnd('timeout');

// 




