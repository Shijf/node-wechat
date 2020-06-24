/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-18 00:18:37
 * @LastEditTime: 2020-06-24 09:34:35
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocal/auth/ServiceProvider.js
 * @Description: 
 */
"use strict";
const AccessTokenClient = require('./AccessTokenClient');
const ContactAccessTokenClient = require('./ContactAccessTokenClient');
const AgentAccessTokenClient = require('./AgentAccessTokenClient');
const LogAccessTokenClient = require('./AgentAccessTokenClient');
const DeciveAccessTokenClient = require('./DeviceAccessTokenClient');
class ServiceProvider {
    constructor(app) {
        app.register('access_token', new AccessTokenClient(app));
        app.register('contact_access_token', new ContactAccessTokenClient(app));
        app.register('agent_access_token', new AgentAccessTokenClient(app));
        app.register('log_access_token', new LogAccessTokenClient(app));
        app.register('device_access_token', new DeciveAccessTokenClient(app));
    }
}



module.exports = ServiceProvider