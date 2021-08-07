/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-16 23:46:19
 * @LastEditTime: 2020-07-05 19:21:48
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/kernel/ServiceContainer.js
 * @Description: 
 */

"use strict";

const ConfigServiceProvider = require('./providers/ConfigServiceProvider');
const CacheServiceProvider = require('./providers/CacheServiceProvider');
const LogServiceProvider = require('./providers/LogServiceProvider');
// const RequestServiceProvider = require('./providers/ConfigServiceProvider');
const HttpClientServiceProvider = require('./providers/HttpClientServiceProvider');
// const ExtensionServiceProvider = require('./providers/ConfigServiceProvider');
// const EventDispatcherServiceProvider = require('./providers/ConfigServiceProvider');
const Container = require("typedi").Container;
class ServiceContainer extends Container {
    constructor(config, custom_providers) {
        super()
        this.custom_providers = typeof(custom_providers) =='string' ? null : custom_providers;
        this.defaultConfig = {};
        this.userConfig = config;
        this.custom_provider = '';
        this.config = this.getConfig();
         // 注册服务
         this.registerProviders(this.getProviders());
    }

    getProviders() {
        return [
            LogServiceProvider,
            CacheServiceProvider,
            HttpClientServiceProvider,
            ConfigServiceProvider
        ].concat(this.config.providers)
    }
    /**
     * @description:    注册服务
     * @param {string, instance} 
     * @return: Container
     */
    register(key, value) {
        ServiceContainer.set(key, value);
    }
    /**
     * @description: 获取注册的服务
     * @param {string} 
     * @return: Container
     */
    resolve(key) {
        return ServiceContainer.get(key);
    }
    /**
     * @description: 获取配置信息
     * @return: object
     */
    getConfig() {
        const base = {
            baseUrl: ' https://api.weixin.qq.com', // 默认为公众号的url
            cacheDriver: 'default_cache_driver',
            cacheFlag: 'node_wechat',
            httpclient: {
                enableDNSCache: false,
                dnsCacheLookupInterval: 10000,
                dnsCacheMaxLength: 1000,

                request: {
                    timeout: 5000,
                },
                httpAgent: {
                    keepAlive: true,
                    freeSocketTimeout: 4000,
                    maxSockets: Number.MAX_SAFE_INTEGER,
                    maxFreeSockets: 256,
                },
                httpsAgent: {
                    keepAlive: true,
                    freeSocketTimeout: 4000,
                    maxSockets: Number.MAX_SAFE_INTEGER,
                    maxFreeSockets: 256,
                },
            }
        }

        return {
            ...base,
            ...this.defaultConfig,
            ...this.userConfig
        }
    }
    /**
     * @description: 注册服务
     * @param {array} 所有服务提供者
     * @return: Container
     */
    registerProviders(providers) {
        providers.forEach(provider => {            
            new provider(this)
        });
        // 注册用户自定义服务，如果有
        if (this.custom_providers) {
            let custom_providers = this.custom_providers;
            for (const key in custom_providers) {
                const Provider = custom_providers[key];
                this.register(key, new Provider(this))
            }
        }
        
    }
}

module.exports = ServiceContainer