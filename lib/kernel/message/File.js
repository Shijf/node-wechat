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

class File extends Message {
    constructor(media_id){
        super(media_id)
        this.msg = {
            msgtype: 'file',
            file: {
                media_id
            }
        }
    }
}

module.exports = File;