/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-23 10:40:00
 * @LastEditTime: 2020-06-23 11:33:38
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocal/agent/GroupClient.js
 * @Description: 
 */ 
"use strict";
const BaseClient = require('../../../kernel/BaseClient');
class GroupClient extends BaseClient {
    constructor(app){
        super(app, 'agent_access_token');
    }

    /**
     * @description: 创建应用分组
     * @param {String} name 分组名称
     * @return: 
     */
    async create(name) {
        return await this.httpPostJson('/cgi-bin/group/create', {name})
    }
    
    /**
     * @description: 更新应用分组
     * @param {Number} groupid
     * @param {String} name
     * @param {Number} order
     * @return: 
     */
    async update({groupid, name, order}) {
        return await this.httpPostJson('/cgi-bin/group/update', {groupid, name, order});
    }

    /**
     * @description: 删除应用分组
     * @param {Number} groupid 应用分组的id
     * @return: 
     */
    async delete(groupid) {
        return await this.httpPostJson('/cgi-bin/group/delete', {groupid});
    }

    /**
     * @description: 增加分组应用
     * @param { Number } groupid 分组id
     * @param { Array } agentid_list 需要添加的应用id 列表
     * @return: 
     */
    async addApps({groupid, agentid_list}) {
        return await this.httpPostJson('/cgi-bin/group/addapps', {groupid, agentid_list});
    }
    /**
     * @description: 从分组删除应用，从分组中移除的应用被添加到默认分组
     * @param {Number} groupid 分组id
     * @param {Number} agentid 需要删除的应用id 列表
     * @return: 
     */
    async removeapp({groupid, agentid}) {
        return await this.httpPostJson('/cgi-bin/group/removeapp', {groupid, agentid});
    }
    
    /**
     * @description: 获取指定分组的应用列表
     * @param {Number} groupid 分组id
     * @return: 
     */
    async appList(groupid) {
        return await this.httpPostJson('/cgi-bin/group/applist', {groupid})
    }

    /**
     * @description: 获取应用列表，不传分组id，则获取全部分区及对应的应用列表
     * @param {Number} groupid 分组id
     * @return: 
     */
    async list(groupid) {
        if (groupid) {
            return await this.appList(groupid);
        }
        return await this.httpPostJson('/cgi-bin/group/list');
    }
}

module.exports = GroupClient;