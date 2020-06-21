/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-15 19:51:58
 * @LastEditTime: 2020-06-21 12:30:36
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/kernel/cache/Cache.js
 * @Description: 
 */ 
'use strict';

class Cache {
    constructor(app) {
        this.app = app;
        this.cache = this.getCacheDriverInstance(); // 实例化驱动
    }

    getCacheDriverInstance(){
        const driver = this.app.config.cacheDriver;
        if (driver === 'default_cache_driver') { // 如果是默认的，那么就直接在此注册服务
            let Driver = require('./file_cache/FileCache');
            this.app.register(driver, new Driver(this.app))
        }
        return this.app.resolve(driver);
    }
    /**
     * 获取数据
     * @param {string} key 
     */
    async get(key) {
        return await this.cache.get(key);
    }

    /**
     * 将数据存储到缓存中,如果缓存的过期时间没有传递给 put 方法， 则缓存将永久有效
     * @param {string} key 
     * @param {mix} value 
     * @param {number} seconds 
     */
    async put(key, value, seconds) {        
        return await this.cache.put(key, value, seconds);
    }
    /**
     * 永久存储数据
     * @param {string} key 
     * @param {mix} value 
     */
    async forever(key, value) {
        return await this.cache.put(key, value);
    }
    //检查是否存在返回Boolean
    async has(key) {
        return await this.cache.has(key);
    }
    /**
     * 存储
     * @param {string} key 
     * @param {string} value 
     * @param {number} seconds 
     * @param {function} callback 
     */
    async remember(key, seconds, callback) {
        return await this.cache.remember(key, seconds, callback);
    }
    
    /**
     * 存为永久值
     * @param {string} key 
     * @param {string} value 
     * @param {function} callback 
     */
    async rememberForever(key, value, callback) {
        return await this.cache.rememberForever(key, value, callback);
    }

    //从缓存中获取到数据之后再删除它
    async pull(key) {
        return await this.cache.pull(key);
    }
    /**
     * 删除一个值
     * @param {string} key 
     */
    async forget(key) {
        return await this.cache.forget(key);
    }
    //删除全部的值
    async flush() {
        return await this.cache.flush();
    }

}

module.exports = Cache;