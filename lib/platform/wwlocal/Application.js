/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-16 00:51:01
 * @LastEditTime: 2020-09-25 20:00:05
 * @LastEditors: shijf
 * @FilePath: \node-echat\lib\platform\wwlocal\Application.js
 * @Description: 
 */
"use strict";

const ServiceContainer = require('../../kernel/ServiceContainer');
const AccessServiceProvider = require('./auth/ServiceProvider');
const JssdkServiceProvider = require('./jssdk/ServiceProvider');
const UserServiceProvider = require('./user/ServiceProvider');
const AgentServiceProvider = require('./agent/ServiceProvider');
const MessageServiceProvider = require('./message/ServiceProvider');
const MediaServiceProvider = require('./media/ServiceProvider');
const CorpServiceProvider = require('./corp/ServiceProvider');
const OAuth2ServiceProvider = require('./oauth2/ServiceProvider');
const ServerServiceProvider = require('./server/ServiceProvider copy');

class Application extends ServiceContainer {
    /**
     * @description: 
     * @param {Array} config 配置 
     * @param {String} userCustomProviders 用户用来覆盖服务提供者
     * @return: 对应的服务提供者的实例
     */
    constructor(config, userCustomProviders) {
        config.providers = [
            AccessServiceProvider,
            JssdkServiceProvider,
            UserServiceProvider,
            AgentServiceProvider,
            MessageServiceProvider,
            MediaServiceProvider,
            CorpServiceProvider,
            OAuth2ServiceProvider,
            ServerServiceProvider
        ];
        super(config, userCustomProviders);
    }

    getProvider(provider) {
        return this.resolve(provider);
    }

}

/**
 * @description: 数据代理
 * @return: Application
 */
const ApplicationProxy = new Proxy(Application, {
    apply: (target, thisArg, argumentsList) => {
        let tempProxy = new Proxy(target, {
            get: (target2, provider) => {                
                if (Application.instance) {
                    let App = Application.instance;
                    return App.getProvider(provider);
                }
                // 自动注册并保存当前实例
                Application.instance = (Reflect.construct(target, argumentsList));
                return Application.instance.getProvider(provider);
            }
        })
        
        return tempProxy
    },
})



module.exports = ApplicationProxy