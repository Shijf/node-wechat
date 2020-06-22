/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-22 09:45:25
 * @LastEditTime: 2020-06-22 22:45:47
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocak/agent/AgentClient.js
 * @Description: 
 */ 
"use strict";
const BaseClient = require('../../../kernel/BaseClient');
class AgentClient extends BaseClient {
    constructor(app){
        super(app, 'agent_access_token');
        this.logger = app.resolve('logger');
    }
    /**
     * @description:  创建应用
     * @param  { Object } data
     * @return agentid secret
     */
    async create(data) {
        return await this.httpPostJson('/cgi-bin/agent/create', data)
    }
    /**
     * @description: 获取应用
     * @param {Number} agentid 需要获取的应用id，不填写则为默认当前应用的
     * @return: 
     */
    async get(agentid) {
        agentid = agentid || this.app.config.agent_id;
        this.logger.enable('file');
        this.logger.info('45')
        return await this.httpGetJson('/cgi-bin/agent/get', {agentid})
    }
    /**
     * @description: 设置应用
     * @param {Object} data data.agentid不填写则为默认当前应用的
     * @return:  
     */
    async set(data) {
        if(!data.agentid){
            data.agentid = this.app.config.agent_id;
        }
        return await this.httpPostJson('/cgi-bin/agent/set', data)
    }

    /**
     * @description: 删除应用
     * @param  {Number} agentid 需要删除的应用id
     * @return: 
     */
    async delete(agentid) {
        return await this.httpPostJson('/cgi-bin/agent/delete', {agentid})
    }

    /**
     * @description: 启用应用
     * @param  {Number} agentid 需要启用的应用id
     * @return: 
     */
    async open(agentid) {
        return await this.httpGetJson('/cgi-bin/agent/open', {agentid})
    }

    /**
     * @description: 停用应用
     * @param  {Number} agentid 需要停用的应用id
     * @return: 
     */
    async close(agentid) {
        return await this.httpGetJson('/cgi-bin/agent/close', {agentid})
    }

    /**
     * @description: 重置应用 secret
     * @param {Number} agentid 需要停用的应用id 
     * @return: 
     */    
    async resetSecret(agentid) {
        return await this.httpGetJson('/cgi-bin/agent/resetsecret', {agentid})
    }

    
    
}

module.exports = AgentClient;