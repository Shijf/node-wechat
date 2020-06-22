/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-18 00:18:37
 * @LastEditTime: 2020-06-22 10:11:45
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocak/auth/ServiceProvider.js
 * @Description: 
 */
"use strict";
const AccessTokenClient = require('./AccessTokenClient');
const ContactAccessTokenClient = require('./ContactAccessTokenClient');
const AgentAccessTokenClient = require('./AgentAccessTokenClient');
class ServiceProvider {
    constructor(app) {
        app.register('access_token', new AccessTokenClient(app));
        app.register('contact_access_token', new ContactAccessTokenClient(app));
        app.register('agent_access_token', new AgentAccessTokenClient(app));
    }
}



module.exports = ServiceProvider