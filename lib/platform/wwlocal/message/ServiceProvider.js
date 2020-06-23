/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-18 00:18:37
 * @LastEditTime: 2020-06-23 14:14:35
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocal/message/ServiceProvider copy.js
 * @Description: 
 */
"use strict";

const MessageClient = require("./MessageClient");

class ServiceProvider {
    constructor(app) {
        app.register('messager', new MessageClient(app));
    }
}



module.exports = ServiceProvider