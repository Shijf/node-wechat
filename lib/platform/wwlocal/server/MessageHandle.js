/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-25 16:52:18
 * @LastEditTime: 2020-06-25 19:21:16
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocal/server/MessageHandle.js
 * @Description: 根据不同的消息类型生成的对应的明文xml
 */
class MessageHandle {

    constructor(data) {
        this.data = data;
    }

    static textXml({ toUser, fromUser, content }) {

        const sTimeStamp = parseInt(new Date().valueOf() / 1000);

        return {
            sReplyMsg: `<xml><ToUserName><![CDATA[${toUser}]]></ToUserName><FromUserName><![CDATA[${fromUser}]]></FromUserName><CreateTime>${sTimeStamp}</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[${content}]]></Content></xml>`,
            sTimeStamp
        }
    }


}

module.exports = MessageHandle;