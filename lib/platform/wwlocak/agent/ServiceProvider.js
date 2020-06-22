/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-18 00:18:37
 * @LastEditTime: 2020-06-22 10:38:21
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocak/agent/ServiceProvider.js
 * @Description: 
 */
"use strict";
let AgentClient = require('./AgentClient');
class ServiceProvider {
    constructor(app) {
        app.config.baseUrl = app.config.corp_api_url;
        app.register('agent', new AgentClient(app));
    }
}



module.exports = ServiceProvider