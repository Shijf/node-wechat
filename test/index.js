/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-15 16:23:11
 * @LastEditTime: 2020-06-15 16:35:10
 * @LastEditors: shijf
 * @FilePath: /node-echat/test/index.js
 * @Description: 测试主入口
 */ 

// eslint-disable-next-line no-unused-vars
const { expect } = require('chai')
const HttpClient = require('../lib/kernel/client/httpclient')
// eslint-disable-next-line no-undef
describe('httpClient test', () => {
    // eslint-disable-next-line no-undef
    it('should say Hello world', async () => {
        const client = new HttpClient()
        const res = client.curl('http://www.baidu.com')
        console.log(res);
        
        expect(res).to.equal('Hello world')
    })
})