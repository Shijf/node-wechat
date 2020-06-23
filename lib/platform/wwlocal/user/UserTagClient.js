/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-21 15:30:42
 * @LastEditTime: 2020-06-21 23:01:11
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocak/user/UserTagClient.js
 * @Description: 
 */
'use strict';
const BaseClient = require('../../../kernel/BaseClient');

class UserTagClient extends BaseClient {
    constructor(app) {
        super(app, 'contact_access_token')
    }
    /**
     * @description: 创建标签
     * @param  {String} tagname 标签名称
     * @param  {Number} tagid 标签id，可不填
     */
    async create(tagname, tagid) {
        return await this.httpPostJson('/cgi-bin/tag/create', { tagname, tagid })
    }

    /**
     * @description: 更新标签名字
     * @param  {Number} tagid 标签id
     * @param  {String} tagname 标签名称
     */
    async update(tagid, tagname) {
        return await this.httpPostJson('/cgi-bin/tag/update', { tagname, tagid })
    }
    /**
     * @description: 删除标签
     * @param  {Number} tagid 标签id
     */
    async delete(tagid) {
        return await this.httpGetJson('/cgi-bin/tag/delete', { tagid })
    }
    /**
     * 获取标签列表
     */
    async list() {
        return await this.httpGetJson('/cgi-bin/tag/list')
    }

    /**
     * @description: 获取标签成员（标签详情）
     * @param  {Number} tagid
     */
    async get(tagid) {
        return await this.httpGetJson('/cgi-bin/tag/get', { tagid })
    }
    /**
     * @description: 增加标签成员
     * @param  {Number} tagid 标签id
     * @param  {Array} userlist 成员列表
     */
    async tagUsers(tagid, userlist) {
        if (!Array.isArray(userlist)) {
            let temp = userlist;
            userlist = [];
            userlist.push(temp)
        }
        return await this.httpPostJson('/cgi-bin/tag/addtagusers', { tagid, userlist })
    }
    /**
     * @description: 增加标签成员（指定部门）
     * @param  {Number} tagid 标签id
     * @param  {Array} partlist 部门列表
     */
    async tagDepartments(tagid, partylist) {
        if (!Array.isArray(partylist)) {
            let temp = partylist;
            partylist = [];
            partylist.push(temp)
        }
        
        return await this.httpPostJson('/cgi-bin/tag/addtagusers', { tagid, partylist })
    }
    /**
     * @description: 移除标签成员
     * @param  {Number} tagid 标签id
     * @param  {Array} partlist 部门列表
     */
    async delTagUsers(tagid, userlist) {
        if (!Array.isArray(userlist)) {
            let temp = userlist;
            userlist = [];
            userlist.push(temp)
        }
        return await this.httpPostJson('/cgi-bin/tag/deltagusers', { tagid, userlist })
    }
    /**
     * @description: 移除标签成员（指定部门）
     * @param  {Number} tagid 标签id
     * @param  {Array} partlist 部门列表
     */
    async delTagDepartments(tagid, partylist){
        if (!Array.isArray(partylist)) {
            let temp = partylist;
            partylist = [];
            partylist.push(temp)
        }
        
        return await this.httpPostJson('/cgi-bin/tag/deltagusers', { tagid, partylist })
    }
}

module.exports = UserTagClient;