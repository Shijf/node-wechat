/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-18 00:18:37
 * @LastEditTime: 2020-06-21 15:33:38
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocak/jssdk/ServiceProvider.js
 * @Description: 
 */
"use strict";
let JssdkClient = require('./JssdkClient');
class ServiceProvider {
    constructor(app) {
        app.register('jssdk', new JssdkClient(app));
    }
}



module.exports = ServiceProvider