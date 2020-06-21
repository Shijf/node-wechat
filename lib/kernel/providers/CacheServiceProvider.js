/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-19 21:31:24
 * @LastEditTime: 2020-06-21 10:13:18
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/kernel/providers/CacheServiceProvider.js
 * @Description: 
 */ 
"use strict";
const CacheClient = require('./../cache/Cache');       
class CacheClientServiceProvider {
    constructor(app) {
        app.register('cache', new CacheClient(app));
    }
}

module.exports = CacheClientServiceProvider;