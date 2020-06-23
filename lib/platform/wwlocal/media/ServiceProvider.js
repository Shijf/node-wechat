/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-23 18:09:29
 * @LastEditTime: 2020-06-23 18:21:12
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocal/media/ServiceProvider.js
 * @Description: 
 */ 
"use strict";

const MediaClient = require("./MediaClient");

class ServiceProvider {
    constructor(app) {
        app.register('media', new MediaClient(app));
    }
}



module.exports = ServiceProvider