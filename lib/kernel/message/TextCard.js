/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-26 13:34:17
 * @LastEditTime: 2020-07-04 21:43:22
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/kernel/message/TextCard.js
 * @Description: 
 */ 
const Message = require('./Message');

class TextCard extends Message {
    constructor({title, description, url, btntxt}){
        super()
        this.msg = {
            msgtype: 'textcard',
            btntxt,
            textcard: {
                title,
                description,
                url
            }
        }
    }
}

module.exports = TextCard;