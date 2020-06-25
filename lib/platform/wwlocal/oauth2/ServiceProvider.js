/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-18 00:18:37
 * @LastEditTime: 2020-06-25 12:30:55
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocal/oauth2/ServiceProvider.js
 * @Description: 
 */
"use strict";

const OAuth2Client = require("./OAuth2CLient");
const ScanLoginClient = require("./ScanLoginClient");

class ServiceProvider {
    constructor(app) {
        app.config.baseUrl = app.config.corp_api_url;
        app.register('oauth', new OAuth2Client(app));
        app.register('scan_login', new ScanLoginClient(app));
    }
}


module.exports = ServiceProvider