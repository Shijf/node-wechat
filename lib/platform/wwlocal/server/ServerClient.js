/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-25 14:43:33
 * @LastEditTime: 2020-06-25 18:27:13
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
        this.replyMsg = '';
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

        //解密后的字符串
        // let clientMsg = wxcpt.DecryptMsg(msg_signature, timestamp, nonce, xmldata);

        // console.log(clientMsg);

        // console.log(xmldata);
        // 加密后原路返回

        let textXml = MessageHandle.textXml({toUser: '18000358', fromUser: 'wl4778b9fc00', content:'测试被动响应'});
        // console.log(textXml);
        // console.log(textXml);
        
        const jiamiString = wxcpt.EncryptMsg(textXml);
        
        
        console.log(jiamiString);
        
        return jiamiString;
    }
}

module.exports = ServerClient;