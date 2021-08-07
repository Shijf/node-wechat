/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-25 14:43:33
 * @LastEditTime: 2020-06-26 10:46:49
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocal/server/ServerClient.js
 * @Description: 
 */
const WXBizMsgCrypt = require('./MsgCrypt/WXBizMsgCrypt');
const BaseClient = require("../../../kernel/BaseClient");
const MessageHandle = require("./MessageHandle");
class ServerClient extends BaseClient {
    constructor(app) {
        super(app);
        this.config = app.config;
        this.token = this.config.token; // 开发者设定的Token
        this.aes_key = this.config.aes_key; //签名密钥
        this.corp_id = this.config.corp_id; //企业ID
        this.replyMsg = ''; // 返回给微信的 被动消息
        this.clientMsg = {}; // 来自解密用户客户端的消息
    }

    server(query, xmldata) {
        //解构出来消息参数
        let {
            msg_signature,
            timestamp,
            nonce,
            echostr,
        } = query;

        let wxcpt = new WXBizMsgCrypt(this.token, this.aes_key, this.corp_id);
        if (echostr) { // 如果有此函数则只是验证 URl 直接返回就好
            this.replyMsg = wxcpt.VerifyURL(msg_signature, timestamp, nonce, echostr); // 返回解密后 echostr的明文
            return this.replyMsg;
        }

        //解密后的用户相关信息
        this.clientMsg = wxcpt.DecryptMsg(msg_signature, timestamp, nonce, xmldata);

        // let textXml = MessageHandle.textXml({toUser: '18000358', fromUser: 'wl4778b9fc00', content:'测试被动响应'});

        // const jiamiString = wxcpt.EncryptMsg(textXml);


        // console.log(jiamiString);

        return this;
    }

    /**
     * @description: 获取用户从客户端发送到服务器的消息体
     * @return: 
     */
    getMessage() {
        return this.clientMsg;
    }

    /**
     * @description: 将响应发给微信服务器
     * @param { Boolean } breakMsg 是否不给服务器发任何响应
     * @return: 
     */
    send(breakMsg) {
        if (!breakMsg) {
            return this.replyMsg;
        } else {
            return ''
        }
    }



    async push(callback) {
        if (typeof (callback) !== 'function') {
            throw new Error(`${callback} not a function!`)
        }
        // 执行用户传过来的函数
        let result;
        // 执行用户传过来是异步函数
        if (Object.prototype.toString.call(callback) === '[object AsyncFunction]') {
            result = await callback(this.clientMsg); //传值为解密后用户的消息体
        } else {// 非异步函数
            result = callback(this.clientMsg);
        }


    }


}

module.exports = ServerClient;