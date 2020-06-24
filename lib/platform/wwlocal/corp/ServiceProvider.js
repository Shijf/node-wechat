/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-23 18:09:29
 * @LastEditTime: 2020-06-24 09:32:19
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocal/corp/ServiceProvider.js
 * @Description: 
 */ 
"use strict";

const CorpClient = require('./CorpClient');
const DeviceClient = require('./DeviceClient');

class ServiceProvider {
    constructor(app) {
        app.config.baseUrl = app.config.corp_api_url;
        app.register('corp', new CorpClient(app));
        app.register('device', new DeviceClient(app));
    }
}



module.exports = ServiceProvider