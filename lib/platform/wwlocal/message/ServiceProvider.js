/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-18 00:18:37
 * @LastEditTime: 2020-06-24 09:19:48
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocal/message/ServiceProvider.js
 * @Description: 
 */
"use strict";

const MessageClient = require("./MessageClient");

class ServiceProvider {
    constructor(app) {
        app.config.baseUrl = app.config.corp_api_url;
        app.register('messager', new MessageClient(app));
    }
}



module.exports = ServiceProvider