/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-22 09:45:25
 * @LastEditTime: 2020-06-23 14:42:07
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocal/agent/AgentClient.js
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

    
    /**
     * @description: 开启应用回调
     * @param  {Number} agentid
     * @param  {String} callback_url
     * @param  {String} token
     * @param  {String} aeskey
     */
    async openCallback({agentid, callback_url, token, aeskey}) {
        return await this.httpPostJson('/cgi-bin/agent/opencallback', {agentid, callback_url, token, aeskey})
    }

    /**
     * @description: 更新应用回调
     * @param  {Number} agentid
     * @param  {String} callback_url
     * @param  {String} token
     * @param  {String} aeskey
     */
    async updateCallback({agentid, callback_url, token, aeskey}) {
        return await this.httpPostJson('/cgi-bin/agent/updatecallback', {agentid, callback_url, token, aeskey})
    }

    /**
     * @description: 停用应用回调
     * @param  {Number} agentid
     * @param  {String} callback_url
     * @param  {String} token
     * @param  {String} aeskey
     */
    async closeCallback({agentid, callback_url, token, aeskey}) {
        return await this.httpPostJson('/cgi-bin/agent/closecallback', {agentid, callback_url, token, aeskey})
    }

    /**
     * @description: 获取应用列表
     * @param { String } agent_status 获取对应状态的应用，不填则全部
     * @return: 
     */
    async list(agent_status) {
        if (agent_status) {
            if (agent_status == 'close') {
                agent_status = 0;
            } else if(agent_status == 'open') {
                agent_status = 1;
            }
        }
        return await this.httpGetJson('/cgi-bin/agent/list', {agent_status})
    }

    /**
     * @description: 设置应用在工作台展示的模版
     * @param {Number} agentid 应用id
     * @param {String} type 模版类型，目前支持的自定义类型包括 “keydata”、 “image”、 “list”、 “webview” 。若设置的type为 “normal”,则相当于从自定义模式切换为普通宫格或者列表展示模式
     * @return: 
     */
    async setWorkbenchTemplate(data) {
        this.accesstokenType = 'access_token';
        if(!data.agentid){
            data.agentid = this.app.config.agent_id
        }        
        return await this.httpPostJson('/cgi-bin/agent/set_workbench_template', data)
    }

    /**
     * @description: 获取应用在工作台展示的模版
     * @param {agentid} 应用agentid
     * @return: 
     */
    async getWorkbenchTemplate(agentid){
        this.accesstokenType = 'access_token';
        if(!agentid){
            agentid = this.app.config.agent_id
        }        
        return await this.httpPostJson('/cgi-bin/agent/get_workbench_template', {agentid})
    }
    
    /**
     * @description: 设置用户在工作台展示的模版
     * @param {Number} agentid 应用id
     * @param {String} type 模版类型，目前支持的自定义类型包括 “keydata”、 “image”、 “list”、 “webview” 。若设置的type为 “normal”,则相当于从自定义模式切换为普通宫格或者列表展示模式
     * @return: 
     */
    async setWorkbenchData(data) {
        this.accesstokenType = 'access_token';
        if(!data.agentid){
            data.agentid = this.app.config.agent_id
        }
        return await this.httpPostJson('/cgi-bin/agent/set_workbench_data', data);
    }


}

module.exports = AgentClient;