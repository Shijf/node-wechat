/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-18 00:18:37
 * @LastEditTime: 2020-06-21 23:25:59
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocak/user/ServiceProvider.js
 * @Description: 
 */
"use strict";
let UserClient = require('./UserClient');
let UserTagClient = require('./UserTagClient');
let DepartmentClient = require('./DepartmentClient');
class ServiceProvider {
    constructor(app) {
        app.config.baseUrl = app.config.corp_api_url;
        app.register('user', new UserClient(app));
        app.register('tag', new UserTagClient(app));
        app.register('department', new DepartmentClient(app));
    }
}



module.exports = ServiceProvider