/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-23 14:04:42
 * @LastEditTime: 2020-06-23 21:56:58
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocal/message/MessageClient.js
 * @Description: 
 */ 
"use strict";
const BaseClient = require('../../../kernel/BaseClient');
class MessageClient extends BaseClient {
    constructor(app){
        super(app);
        this.agentId = this.app.config.agent_id;
        this.msg = {
            agentid: this.agentId
        };        
    }
    
    /**
     * @description: 发送文本消息
     * @param {String} content 要发送的消息
     * @return: 
     */
    textMsg(content) {
        this.msg['msgtype'] = 'text',
            this.msg['text'] = {
                content
            }

        return this;
    }
    /**
     * 图片消息
     * @param {String} mediaId 媒体id，需要事先将图片传到服务器
     */
    imgMsg(mediaId) {
        this.msg['msgtype'] = 'image';
        this.msg['image'] = {
            media_id: mediaId.toString()
        }
        return this;
    }

    voiceMsg(mediaId) {
        this.msg['msgtype'] = 'voice';
        this.msg['voice'] = {
            media_id: mediaId.toString()
        }
        return this;
    }

    videoMsg({ mediaId, title, description = '暂无描述' }) {
        this.msg['msgtype'] = 'video';
        this.msg['video'] = {
            media_id: mediaId.toString(),
            title,
            description
        }
        return this;
    }

    fileMsg(mediaId) {
        this.msg['msgtype'] = 'file';
        this.msg['file'] = {
            media_id: mediaId.toString(),
        }
        return this;

    }

    cardMsg({ title, description, url, btntxt = '详情' }) {
        this.msg['msgtype'] = 'textcard';
        this.msg['textcard'] = {
            title,
            description,
            url,
            btntxt
        }
        return this;

    }

    newsMsg(obj) {
        this.msg['msgtype'] = 'news';
        let articles = [];

        if (Object.prototype.toString.call(obj) === "[object Array]") {
            for (let index = 0; index < obj.length; index++) {
                const element = obj[index];
                articles.push(element);

            }
        } else if (Object.prototype.toString.call(obj) === '[object Object]') {
            articles.push(obj);
        } else {
            console.log('格式不正确，请认真看文档')
        }

        this.msg['news'] = {
            articles
        }
        return this;
    }

    /**
     * 发送到人员
     * @param {Array OR Number Or String} userIds 
     */
    toUser(userIds) {
        if (Array.isArray(userIds)) {
            if (userIds.length > 1000) {
                return { errcode: 40032, errmsg: '发消息接口，最多指定1000人。' }
            }
            let users = userIds.join('|');
            this.msg['touser'] = users;
        } else {
            this.msg['touser'] = userIds.toString();
        }
        return this;
    }


    /**
     * 发送到部门
     * @param {mix} PartyIDs 
     */
    toParty(PartyIDs) {
        if (Array.isArray(PartyIDs)) {
            if (PartyIDs.length > 100) {
                return { errcode: 82002, errmsg: '发消息，单次不能超过100个部门' }
            }
            let parties = PartyIDs.join('|');
            this.msg['toparty'] = parties;
        } else {
            this.msg['toparty'] = PartyIDs.toString();
        }

        return this;
    }
    /**
     * 发送到标签
     * @param {mix} TagIds 
     */
    toTag(TagIds) {
        if (Array.isArray(TagIds)) {
            if (TagIds.length > 100) {
                return { errcode: 82003, errmsg: '发消息，单次不能超过100个标签' }
            }
            let parties = TagIds.join('|');
            this.msg['totag'] = parties;
        } else {
            this.msg['totag'] = TagIds.toString();
        }
        return this;
    }
    /**
     * 发送消息
     */
    async send() {        
        let res = await this.httpPostJson('/cgi-bin/message/send', this.msg);
        return res;
    }
}

module.exports = MessageClient;