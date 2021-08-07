/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-26 13:34:17
 * @LastEditTime: 2020-07-04 21:14:13
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/kernel/message/Video.js
 * @Description: 
 */ 
const Message = require('./Message');

class Video extends Message {
    constructor(media_id, {title, description}){
        super(media_id)
        this.msg = {
            msgtype: 'video',
            video: {
                media_id,
                title,
                description
            }
        }
    }
}

module.exports = Video;