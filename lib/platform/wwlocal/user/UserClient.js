/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-21 15:30:29
 * @LastEditTime: 2020-06-24 17:11:55
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocal/user/UserClient.js
 * @Description: 
 */ 
'use strict';
const BaseClient = require('../../../kernel/BaseClient')
const Helper = require('./../../../kernel/Helper')
/**
 * @description: 标签类
 * @return: 
 */
class UserClient extends BaseClient{
    constructor(app){
        super(app, 'contact_access_token')
    }
    /**
     * @description: 创建成员
     * @param {Object} data 用户信息
     * @return: 新创建好的用户的密码
     */
    async create(data) {
        return await this.httpPostJson('/cgi-bin/user/create', data);
    }
    /**
     * @description: 获取成员信息
     * @param {mix} userid 用户账号
     * @param {Number} avatar_addr 1.获取到的头像链接为外网链接（默认）0：内网链接
     * @return: 用户信息列表
     */
    async get(userid, avatar_addr = 1) {
        return await this.httpGetJson('/cgi-bin/user/get', { userid, avatar_addr})
    }
    /**
     * @description: 更新成员信息
     * @param { Object } data 用户信息
     * @return: 更新成功标识
     */
    async update(data) {
        return await this.httpPostJson('/cgi-bin/user/update', data)
    }
    /**
     * @description: 删除成员
     * @param {mix} userlist 传入数组是为批量删除
     * @return: 
     */
    async delete(userlist) {
        let user;
        // 判断传入的是否是数组
        if(Array.isArray(userlist)) {
            // 将数组分组为 200 个一组，如果长度 > 200
            const newUserList =  Helper.groupArray(userlist, 200);
            for (let index = 0; index < newUserList.length; index++) {
                try {
                    user = await this.httpGetJson('/cgi-bin/user/batchdelete', {useridlist : newUserList[index]});
                    if (user.errcode !== 0) {
                        throw new Error('删除失败');
                    }
                } catch (error) {
                    console.log(error);
                    
                    console.log(`删除${newUserList[index]}失败, 删除失败的为：${newUserList[index] ? newUserList[index] : []}`);
                    console.log(user);
                }
            }

            return user;
            
        }else {
            return await this.httpGetJson('/cgi-bin/user/delete', {userid : userlist})
        }
    }
    
    /**
     * @description:获取部门成员 应用须拥有指定部门的查看权限。
     * @param {Number} department_id 
     * @param {Number} fetch_child 
     * @return: object
     */
    async getDepartmentUsers(departmentId, fetchChild) {
        let users = await this.httpGetJson('/cgi-bin/user/simplelist', {
            department_id: +departmentId,
            fetch_child: +fetchChild || 0 //此处的+代表，将参数中的Boolean转为number,
        });

        return users;
    }

    /**
     * @description: 获取部门成员详情
     * @param {Number} departmentId 
     * @param {Boolean} fetchChild 
     */
    async getDetailedDepartmentUsers(departmentId, fetchChild) {
        let users = await this.httpGetJson('/cgi-bin/user/list', {
            department_id: +departmentId,
            fetch_child: +fetchChild || 0 //此处的+代表，将参数中的Boolean转为number,
        });

        return users;
    }
    /**
     * @description: 重置密码，默认以短信的方式通知
     * @param {Number} userId 用户id
     * @param {String} pwd 生成重置的密码
     * @param {Boolean} isnotify 是否发短信通知用户，默认为 通知 
     */
    async resetpwd(userId, pwd, isnotify = true) {
        let result = await this.httpPostJson('/cgi-bin/user/resetpwd', {
            userid: userId,
            pwd: pwd || undefined,
            isnotify: isnotify ? 1 : 0
        });

        return result;
    }

    /**
     * @description: 强制用户下线
     * @param { Array } userlist 用户列表
     * @param { String } msg 下线提示语
     */
    async offline(userlist, msg) {
        let userTemp = userlist;
        let user;

        if(!Array.isArray(userlist)) {
            userlist = [];
            userlist.push(userTemp);
        }
        
        let group = Helper.groupArray(userlist, 200);
        
        for (let index = 0; index < group.length; index++) {
            const element = group[index];
            console.log(index);
            
            try {
                user = await this.httpPostJson('/cgi-bin/user/offline', {
                    userid_list: element,
                    msg
                });
                if (user.errcode !== 0) {
                    throw new Error('下线失败');
                }
                // console.log(user);
            } catch (error) {
                console.log( (`下线${element}失败, 下线成功的为：${element[index] ? element[index] : []}`));
               
                console.log(user);
            } 
        }
        return user;
    }

    /**
     * @description: 将明文userid转换为密文userid
     * @param {array} userid_list  用户列表
     * @param {number} agentid 
     */
    async userIdToOpenid(userid_list, agentid) {
        agentid = agentid || this.app.config.agent_id;
        let result = this.httpPostJson('/cgi-bin/user/enc_userid', {
            userid_list: userid_list,
            agentid
        });

        return result;
    }

}

module.exports = UserClient;