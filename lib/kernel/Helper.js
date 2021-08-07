/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-15 19:50:09
 * @LastEditTime: 2020-07-04 21:06:58
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/kernel/Helper.js
 * @Description: 助手函数，请编写静态方法
 */
'use strict'
const crypto = require('crypto');
/**
 * 工具类
 */
class Helper {
  /**
   * 判断结尾是否包含某个
   * @param {string} str 
   * @param {string} target 
   * use👇
   * confirmEnding("He has to give me a new name", "name");
   */
  static confirmEnding(str, target) {
    var start = str.length - target.length;
    var arr = str.substr(start, target.length);
    if (arr == target) {
      return true;
    }
    return false;
  }

  static md5(str) {
    let md5 = crypto.createHash('md5');
    md5.update(str);
    let sign = md5.digest('hex');
    // console.log(sign);

    return sign;
  }

  static sha1(str) {
    let sha1String = crypto.createHash('sha1');
    sha1String.update(str);
    let sign = sha1String.digest('hex');

    return sign;
  }
  /**
   * 生成随机字符串
   * @param {number} len 
   */
  static randomString(len) {
    len = len || 32;
    const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    const maxPos = $chars.length;
    let str = '';
    for (let i = 0; i < len; i++) {
      str += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
  }
  /**
   * 判断是否为数组
   * @param {mix} obj 
   */
  static isArray(obj) {
    return (typeof obj == 'object') && obj.constructor === Array;
  }
  /**
   * 判断是否为字符串
   * @param {mix} str 
   */
  static isString(str) {
    return (typeof str == 'string') && str.constructor == String;
  }
  /**
   * 判断是否为数值类型
   * @param {mix} obj 
   */
  static isNumber(obj) {
    return (typeof obj == 'number') && obj.constructor == Number;
  }

  /**
   * @description: 将原始数组进行分组
   * @param {Array}  原始数组
   * @param {number} 小组个数
   * @return: 
   */
  static groupArray(array, subGroupLength) {

    if (array.length < subGroupLength) { // 长度小于原始数组，那么直接返回
      return array
    }

    let index = 0;
    let newArray = [];
    while (index < array.length) {
      newArray.push(array.slice(index, index += subGroupLength));
    }
    return newArray;
  }

  /**
   * @description: 格式化字节数大小，并以KB、MB、GB的格式输出
   * @param {String} bytes 字节数大小
   * @param {Number} decimals 小数位数
   * @return: 
   */
  static formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  /**
  * 计算字符串所占的内存字节数，默认使用UTF-8的编码方式计算，也可制定为UTF-16
  * UTF-8 是一种可变长度的 Unicode 编码格式，使用一至四个字节为每个字符编码
  *
  * 000000 - 00007F(128个代码)      0zzzzzzz(00-7F)                             一个字节
  * 000080 - 0007FF(1920个代码)     110yyyyy(C0-DF) 10zzzzzz(80-BF)             两个字节
  * 000800 - 00D7FF
    00E000 - 00FFFF(61440个代码)    1110xxxx(E0-EF) 10yyyyyy 10zzzzzz           三个字节
  * 010000 - 10FFFF(1048576个代码)  11110www(F0-F7) 10xxxxxx 10yyyyyy 10zzzzzz  四个字节
  *
  * 注: Unicode在范围 D800-DFFF 中不存在任何字符
  * {@link http://zh.wikipedia.org/wiki/UTF-8}
  *
  * UTF-16 大部分使用两个字节编码，编码超出 65535 的使用四个字节
  * 000000 - 00FFFF  两个字节
  * 010000 - 10FFFF  四个字节
  *
  * {@link http://zh.wikipedia.org/wiki/UTF-16}
  * @param  {String} str
  * @param  {String} charset utf-8, utf-16
  * @return {Number}
  */
 static sizeof (str, charset){
     var total = 0,
         charCode,
         i,
         len;
     charset = charset ? charset.toLowerCase() : '';
     if(charset === 'utf-16' || charset === 'utf16'){
         for(i = 0, len = str.length; i < len; i++){
             charCode = str.charCodeAt(i);
             if(charCode <= 0xffff){
                 total += 2;
             }else{
                 total += 4;
             }
         }
     }else{
         for(i = 0, len = str.length; i < len; i++){
             charCode = str.charCodeAt(i);
             if(charCode <= 0x007f) {
                 total += 1;
             }else if(charCode <= 0x07ff){
                 total += 2;
             }else if(charCode <= 0xffff){
                 total += 3;
             }else{
                 total += 4;
             }
         }
     }
     return total;
 }

}

module.exports = Helper;
