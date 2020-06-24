/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-21 10:40:26
 * @LastEditTime: 2020-06-23 22:16:45
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocal/auth/LogTokenClient.js
 * @Description: 
 */ 
"use strict";
const BaseAccessToken = require('../../../kernel/AccessToken');

class LogTokenClient extends BaseAccessToken {
    constructor(app) {   
        const corpid = app.config.corp_id;
        const secrect = app.config.log_secret;
        app.config.baseUrl = `${app.config.corp_api_url}/cgi-bin/gettoken?corpid=${corpid}&corpsecret=${secrect}`;
        app.config.accessTokenFlag = `${corpid}_${secrect}`;
        super(app)
    }
}

module.exports = LogTokenClient;