/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-26 13:34:17
 * @LastEditTime: 2020-07-05 18:53:19
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/kernel/message/News.js
 * @Description: 
 */
const Message = require('./Message');

class News extends Message {
    constructor({items}) {
        super({items})
        this.msg = {
            msgtype: 'news',
            news: {
                articles: items
            }
        }
    }
}

module.exports = News;