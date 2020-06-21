/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-15 16:30:18
 * @LastEditTime: 2020-06-15 16:34:29
 * @LastEditors: shijf
 * @FilePath: /node-echat/test/http_client/index.js
 * @Description: 
 */ 

// eslint-disable-next-line no-unused-vars
const { expect } = require('chai')
const HttpClient = require('../../lib/kernel/client/httpclient')
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