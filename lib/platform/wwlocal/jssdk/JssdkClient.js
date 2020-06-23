/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-18 00:18:57
 * @LastEditTime: 2020-06-21 15:34:36
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocak/jssdk/JssdkClient.js
 * @Description: 
 */
"use strict";

const BaseClient = require('../../../kernel/BaseClient');
class JssdkClient extends BaseClient {
     async getTicket() {
        console.time('你好getTicket')
        console.log('你好getTicket');
        console.timeEnd('你好getTicket')
        const res = await this.httpGet('', {
            a: 789
        })
        // delete res.data
        // console.log(res);
        
    }

    build() {
        console.log('获取build!');
    }

    build2() {
        console.log('获取build2!');
    }
}



module.exports = JssdkClient;