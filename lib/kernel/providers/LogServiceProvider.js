/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-19 21:31:24
 * @LastEditTime: 2020-06-22 22:39:31
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/kernel/providers/LogServiceProvider.js
 * @Description: 
 */ 
"use strict";
const LogClient = require('./../log/LogClient');       
class LoginClientServiceProvider {
    constructor(app) {
        app.register('logger', new LogClient(app));
    }
}

module.exports = LoginClientServiceProvider;