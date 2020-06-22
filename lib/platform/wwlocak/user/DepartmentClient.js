/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-21 23:02:30
 * @LastEditTime: 2020-06-22 09:37:13
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocak/user/DepartmentClient.js
 * @Description: 
 */ 
"use strict";
const BaseClient = require('../../../kernel/BaseClient');
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
    /**
     * @description: 删除部门
     * @param  {Number} id 部门id
     */
    async delete(id) {
        return await this.httpGetJson('/cgi-bin/department/delete', {id})        
    }
    
    /**
     * @description: 获取部门列表
     * @param  {Number} id 部门id。获取指定部门及其下的子部门。 如果不填，默认获取全量组织架构
     */
    async list(id) {
        return await this.httpGetJson('/cgi-bin/department/list', {id})        
    }
}

module.exports = DepartmentClient;