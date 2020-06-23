/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-23 09:47:21
 * @LastEditTime: 2020-06-23 10:54:45
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocal/agent/MenuClient.js
 * @Description: 
 */
"use strict";
const BaseClient = require('../../../kernel/BaseClient');
class MenuClient extends BaseClient {
    constructor(app) {
        super(app, 'agent_access_token');
    }
    /**
     * @description: 创建应用菜单
     * @param  {Object} menu
     */
    async create(menu, agentid) {
        agentid = agentid || this.app.config.agent_id;
        return await this.httpPostJsonMenu({menu, agentid});
    }

    /**
     * @description: 获取应用菜单
     * @param {Number} agentid
     * @return: 
     */    
    async get(agentid) {
        agentid = agentid || this.app.config.agent_id;
        return await this.httpGetJson('/cgi-bin/menu/get' , {agentid});
    }

    /**
     * @description: 删除应用菜单
     * @param {Number} agentid
     * @return: 
     */ 
    async delete(agentid) {
        agentid = agentid || this.app.config.agent_id;
        return await this.httpGetJson('/cgi-bin/menu/delete' , {agentid});
    }
}

module.exports = MenuClient;