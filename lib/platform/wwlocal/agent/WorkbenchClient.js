/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-23 11:38:52
 * @LastEditTime: 2020-06-23 11:53:32
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocal/agent/WorkbenchClient.js
 * @Description: 
 */ 
"use strict";
const BaseClient = require('../../../kernel/BaseClient');
class WorkbenchClient extends BaseClient {
    constructor(app){
        super(app, 'agent_access_token');
    }

    /**
     * @description: 
     * @param {String}  show_type 显示方式 squared或（九宫格显示模式）list（列表显示模式）
     * @return: 
     */    
    async showType(show_type){
        if (show_type == 'squared') { // 九宫格显示模式
            show_type = 1;
        }

        if (show_type == 'list') { // 列表显示模式
            show_type = 0;
        }
        show_type = +show_type; // 如果是字符串的转换为 Number 类型
        return await this.httpPostJson('/cgi-bin/corp/setworkbench', {show_type});
    }
}

module.exports = WorkbenchClient;