/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-26 13:34:17
 * @LastEditTime: 2020-07-04 21:10:47
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/kernel/message/Text.js
 * @Description: 
 */
const Message = require('./Message');

class Text extends Message {
    constructor(content) {
        super(content)
        this.msg = {
            msgtype: 'text',
            text: {
                content
            }
        }
    }
}

module.exports = Text;