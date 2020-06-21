/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-19 21:08:42
 * @LastEditTime: 2020-06-20 21:13:44
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/kernel/providers/HttpClientServiceProvider.js
 * @Description: 
 */ 
"use strict";
const HttpClient = require('./../http/HttpClient');       
class HttpClientServiceProvider {
    constructor(app) {
        app.register('http_client', new HttpClient(app));
    }
}

module.exports = HttpClientServiceProvider;