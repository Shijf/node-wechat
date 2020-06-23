/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-18 00:18:37
 * @LastEditTime: 2020-06-23 17:56:25
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocal/agent/ServiceProvider.js
 * @Description: 
 */
"use strict";
let AgentClient = require('./AgentClient');
let MenuClient = require('./MenuClient');
let GroupClient = require('./GroupClient');
let WorkbenchClient = require('./WorkbenchClient');
class ServiceProvider {
    constructor(app) {
        app.config.baseUrl = app.config.corp_api_url;
        app.register('agent', new AgentClient(app));
        app.register('menu', new MenuClient(app));
        app.register('group', new GroupClient(app));
        app.register('workbench', new WorkbenchClient(app));
    }
}



module.exports = ServiceProvider