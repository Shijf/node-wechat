/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-26 13:34:17
 * @LastEditTime: 2020-07-04 21:12:23
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/kernel/message/Image.js
 * @Description: 
 */ 
const Message = require('./Message');

class Image extends Message {
    constructor(media_id){
        super(media_id)
        this.msg = {
            msgtype: 'image',
            image: {
                media_id
            }
        }
    }
}

module.exports = Image;