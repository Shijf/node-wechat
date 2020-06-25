/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-18 00:18:37
 * @LastEditTime: 2020-06-25 14:44:04
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocal/server/ServiceProvider copy.js
 * @Description: 
 */
"use strict";

const ServerClient = require("./ServerClient");

class ServiceProvider {
    constructor(app) {
        app.config.baseUrl = app.config.corp_api_url;
        app.register('server', new ServerClient(app));
    }
}


module.exports = ServiceProvider