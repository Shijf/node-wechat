/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-23 22:09:27
 * @LastEditTime: 2020-06-24 09:24:29
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocal/corp/CorpClient.js
 * @Description: 
 */
"use strict";
const BaseClient = require('../../../kernel/BaseClient');
class CorpClient extends BaseClient {
    constructor(app) {
        super(app, 'log_access_token') // 操作群控制相关类型的api 必须使用 日志和数据到处的 secret
    }

    /**
     * @description: 解散群聊 (以群主身份解散某个群)
     * @param {Object} data{chatid: '群id获取方式参考“数据安全”—“日志获取”部分', oper: {openid: '本企业成员为成员userid, 外企业成员openid的获取方式参考“数据安全”—“日志获取”部分', type: 0:本企业 ,1 互联企业}}
     * @return: 
     */
    async dismissRoom(data){
        return await this.httpPostJson('/cgi-bin/corp/dismiss_room', data)
    }

    /**
     * @description: 以群主的身份移出群的一个或者几个成员
     * @param {Object} data: {chatid: 群id，获取方式参考“数据安全”—“日志获取”部分, oper: {openid: '操作人的用户名', type: '操作人的类型（0:本企业, 1 互联企业）'}, del_members: {openid: '本企业成员为成员userid, 外企业成员openid的获取方式参考“数据安全”—“日志获取”部分', type: '0:本企业 ,1 互联企业'}} 
     * @return: 
     */
    async delRoomMember(data) {
        return await this.httpPostJson('/cgi-bin/corp/del_room_member', data)
    }

    

}

module.exports = CorpClient;