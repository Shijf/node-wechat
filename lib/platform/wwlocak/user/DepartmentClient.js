/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-21 23:02:30
 * @LastEditTime: 2020-06-21 23:25:22
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocak/user/DepartmentClient.js
 * @Description: 
 */ 
"use strict";
const BaseClient = require('../../../kernel/BaseClient');
const Helper = require('../../../kernel/Helper');
class DepartmentClient extends BaseClient {
    constructor(app){
        super(app, 'contact_access_token')
    }
    
    /**
     * @description: 创建部门
     * @param  {Object} data
     */
    async create(data) {
        return await this.httpPostJson('/cgi-bin/department/create', data)
    }
    /**
     * @description: 更新部门
     * @param  {Object} data
     */
    async update(data) {
        return await this.httpPostJson('/cgi-bin/department/update', data)
    }

    async delete(id) {
        return await this.httpGetJson('/cgi-bin/department/delete', {id})        
    }

    async list(id) {
        return await this.httpGetJson('/cgi-bin/department/list', {id})        
    }
}

module.exports = DepartmentClient;