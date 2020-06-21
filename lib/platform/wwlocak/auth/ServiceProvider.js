/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-18 00:18:37
 * @LastEditTime: 2020-06-21 15:36:29
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocak/auth/ServiceProvider.js
 * @Description: 
 */
"use strict";
let AccessTokenClient = require('./AccessTokenClient');
const ContactAccessTokenClient = require('./ContactAccessTokenClient')
class ServiceProvider {
    constructor(app) {
        app.register('access_token', new AccessTokenClient(app));
        app.register('contact_access_token', new ContactAccessTokenClient(app));
    }
}



module.exports = ServiceProvider