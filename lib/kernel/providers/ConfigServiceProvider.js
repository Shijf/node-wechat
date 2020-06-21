/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-19 21:31:24
 * @LastEditTime: 2020-06-21 10:13:06
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/kernel/providers/ConfigServiceProvider.js
 * @Description: 
 */ 
"use strict";
const ConfigClient = require('./../Config');       
class ConfigClientServiceProvider {
    constructor(app) {
        app.register('config', new ConfigClient(app));
    }
}

module.exports = ConfigClientServiceProvider;