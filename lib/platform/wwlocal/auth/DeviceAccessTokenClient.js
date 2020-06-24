/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-21 10:40:26
 * @LastEditTime: 2020-06-24 09:39:51
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocal/auth/DeviceAccessTokenClient.js
 * @Description: 
 */ 
"use strict";
const BaseAccessToken = require('../../../kernel/AccessToken');

class DeviceTokenClient extends BaseAccessToken {
    constructor(app) {   
        const corpid = app.config.corp_id;
        const secrect = app.config.device_secret;
        app.config.baseUrl = `${app.config.corp_api_url}/cgi-bin/gettoken?corpid=${corpid}&corpsecret=${secrect}`;
        app.config.accessTokenFlag = `${corpid}_${secrect}`;
        super(app)
    }
}

module.exports = DeviceTokenClient;