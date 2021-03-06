/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-18 00:18:37
 * @LastEditTime: 2020-06-24 21:46:33
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocal/jssdk/ServiceProvider.js
 * @Description: 
 */
"use strict";
let JssdkClient = require('./JssdkClient');
class ServiceProvider {
    constructor(app) {
        app.config.baseUrl = app.config.corp_api_url;
        app.register('jssdk', new JssdkClient(app));
    }
}



module.exports = ServiceProvider