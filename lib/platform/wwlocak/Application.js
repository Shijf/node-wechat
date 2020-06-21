/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-16 00:51:01
 * @LastEditTime: 2020-06-21 20:50:34
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocak/Application.js
 * @Description: 
 */
"use strict";

const ServiceContainer = require('../../kernel/ServiceContainer');
const AccessServiceProvider = require('./auth/ServiceProvider');
const JssdkServiceProvider = require('./jssdk/ServiceProvider');
const UserServiceProvider = require('./user/ServiceProvider');
class Application extends ServiceContainer {
    /**
     * @description: 
     * @param {Array, String} 配置 | 服务提供者
     * @return: 对应的服务提供者的实例
     */
    constructor(config, provider) {  
        config.providers = [
            AccessServiceProvider,
            JssdkServiceProvider,
            UserServiceProvider
        ];
        super(config);
        return this.resolve(provider);
    }
}

/**
 * @description: 数据代理
 * @param {type} 
 * @return: 
 */
const ApplicationProxy = new Proxy(Application, {
    apply: (target, thisArg, argumentsList) => {
        let tempProxy = new Proxy(target, {
            get: (target2, provider) => { 
                argumentsList.push(provider)
                // 自动注册
                let result = (Reflect.construct(target, argumentsList));              
                return result
            }
        })        
        return tempProxy
    },
})



module.exports = ApplicationProxy