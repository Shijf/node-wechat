/*
 * @Author: OBKoro1
 * @Date: 2020-06-15 11:10:34
 * @LastEditTime: 2020-06-21 23:30:48
 * @LastEditors: shijf
 * @FilePath: /node-echat/index.js
 * @Description: 
 */
/**
 * @description: 工厂函数
 * @param {null} 
 * @return: 对应的实例
 */

"use strict";
/**
 * @description: 
 * @param {type} asd
 * @return: 
 */
class Factory {
    static make() {
        const Application = require(`./lib/platform/${Factory.staticName}/application`);
        return Application(arguments[0]);
    }
}

let FactoryProxy = new Proxy(Factory, {
    get: (target, property) => {
        target.staticName = property;        
        return Reflect.get(target, 'make');
    }
});
console.time('timeout');

const app = FactoryProxy.wwlocak(require('./config'));


// app.tag.create(9999, 'woshishu');
app.department.list(100000000);

console.timeEnd('timeout');




module.exports = FactoryProxy;