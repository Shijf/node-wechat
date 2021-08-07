/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-26 13:34:17
 * @LastEditTime: 2020-07-06 11:50:50
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/kernel/message/NewsItem.js
 * @Description: 
 */ 
const Message = require('./Message');

class NewsItem extends Message {
    constructor(...items){
        super();
        this.items = items;
    }
}

module.exports = NewsItem;