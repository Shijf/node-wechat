/*
 * @Author: OBKoro1
 * @Date: 2020-06-15 11:10:34
 * @LastEditTime: 2020-06-23 14:18:12
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
        return Application(arguments[0], arguments[1]);
    }
}

let FactoryProxy = new Proxy(Factory, {
    get: (target, property) => {
        target.staticName = property;        
        return Reflect.get(target, 'make');
    }
});


module.exports = FactoryProxy;