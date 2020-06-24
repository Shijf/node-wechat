/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-23 22:09:27
 * @LastEditTime: 2020-06-24 14:37:01
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocal/corp/DeviceClient.js
 * @Description: 
 */
"use strict";
const BaseClient = require('../../../kernel/BaseClient');
class DeviceClient extends BaseClient {
    constructor(app) {
        super(app, 'device_access_token') // 操作设备相关api 使用 设备管理的 secret
    }   
    
    /**
     * @description: 获取某个用户的所有登录过的设备，包括未验证和已验证的设备。
     * @param  {String} opUserId 操作人，前端会显示给用户（必须填真实用户名，后台会校验）
     * @param  {String} userid 获取该用户的所有设备
     */
    async getAlldeviceByUser(opUserId, userId) {        
        return await this.httpPostJson('/cgi-bin/corp/get_all_device_by_user', {oper_userid: opUserId, userid: userId});
    }

    /**
     * @description: 管理端可以通过api删除某个用户的一个或多个设备，删除后设备上的该用户将退出登录，重新登录需要进行身份验证。
     * @param {Object} data
     * @param {Object} data.oper_userid 操作人（必须填真实用户）
     * @param {Object} data.userid 需要删除指定设备的用户
     * @param {Array} data.dev 必填
     * @param {Object} data.dev[0].deviceid 删除用户的某个设备的id  
     * @param {Object} data.dev[0].devtype 删除用户的某个设备的类型
     * @example 示例
     * {
            "oper_userid": "",
            "userid": "",
            "dev": [{
                "deviceid": "364563453",
                "devtype": 130073
            },
            {
                "deviceid": "EA-3245-245435FTHR",
                "devtype": 130074
            }]
        }
     * @return:  { "errcode": 0, "errmsg": "ok"}
     */
    async delUserDevice(data){
        return await this.httpPostJson('/cgi-bin/corp/del_user_device', data)
    }

    /**
     * @description: 强制用户某台或全部设备下线
     * @param {Object} data 
     * @param {Object} data.oper_userid 操作人（必须填真实用户）
     * @param {Object} data.userid 需要删除指定设备的用户
     * @param {Array}  dev 非必填，不填则下线所有设备 
     * @param {String} data.dev[0].deviceid 删除用户的某个设备的id  
     * @param {String} data.dev[0].devtype 删除用户的某个设备的类型
     * @example 
     * {
            "oper_userid": "",
            "userid": "",
            "dev": [{
                "deviceid": "364563453",
                "devtype": 130073
            },
            {
                "deviceid": "EA-3245-245435FTHR",
                "devtype": 130074
            }]
        }
     * @return: 
     */    
    async forceOfflineUserDevice(data) {
        return await this.httpPostJson('/cgi-bin/corp/force_offline_user_device', data)
    }

    /**
     * @description: 禁用设备
     * @param {Object} 
     * @param {Object} data 
     * @param {Object} data.oper_userid 操作人（必须填真实用户）
     * @param {Object} data.userid 需要被禁用的指定设备的用户
     * @param {Array}  dev 必填
     * @param {String} data.dev[0].deviceid 禁用用户的某个设备的id  
     * @param {String} data.dev[0].devtype 禁用用户的某个设备的类型
     * @example 
     * {
            "oper_userid": "",
            "userid": "",
            "dev": [{
                "deviceid": "364563453",
                "devtype": 130073
            },
            {
                "deviceid": "EA-3245-245435FTHR",
                "devtype": 130074
            }]
        }
     * @return: 
     */
    async disableDevice(data){
        return await this.httpPostJson('/cgi-bin/corp/disable_device', data);
    }

    /**
     * @description: 启用设备
     * @param {Object} 
     * @param {Object} data 
     * @param {Object} data.oper_userid 操作人（必须填真实用户）
     * @param {Object} data.userid 需要被启用的指定设备的用户
     * @param {Array}  dev 必填 
     * @param {String} data.dev[0].deviceid 启用用户的某个设备的id  
     * @param {String} data.dev[0].devtype 启用用户的某个设备的类型
     * @example 
     * {
            "oper_userid": "",
            "userid": "",
            "dev": [{
                "deviceid": "364563453",
                "devtype": 130073
            },
            {
                "deviceid": "EA-3245-245435FTHR",
                "devtype": 130074
            }]
        }
     * @return: 
     */
    async enableDevice(data){
        return await this.httpPostJson('/cgi-bin/corp/enable_device', data);
    }

    /**
     * @description: 擦除设备
     * @param {Object} 
     * @param {Object} data 
     * @param {Object} data.oper_userid 操作人（必须填真实用户）
     * @param {Object} data.userid 需要被擦除的指定设备的用户
     * @param {Array}  dev 必填 
     * @param {String} data.dev[0].deviceid 擦除用户的某个设备的id  
     * @param {String} data.dev[0].devtype 擦除用户的某个设备的类型
     * @example 
     * {
            "oper_userid": "",
            "userid": "",
            "dev": [{
                "deviceid": "364563453",
                "devtype": 130073
            },
            {
                "deviceid": "EA-3245-245435FTHR",
                "devtype": 130074
            }]
        }
     * @return: 
     */
    async cleanDevice(data) {
        return await this.httpPostJson('/cgi-bin/corp/clean_device', data)
    }

    /**
     * @description: 获取所有禁用设备
     * @param { String } oper_userid 操作者用户id
     * @return: 
     * {
            "errcode": 0,
            "errmsg": "ok",
            "dev_list": {
                "valuelist": [{
                    "deviceid": "",
                    "devtype": 0,
                    "os_ver": "",
                    "dev_name": "",
                    "dev_status": "",
                    "userid": ""
                }]
            }
        }
     */
    async getAllDisabledDevice(oper_userid) {
        return await this.httpPostJson('/cgi-bin/corp/get_all_disabled_device', {oper_userid})
    }

    /**
     * @description: 设置密码过期时间
     * @param  { String } oper_userid 操作人（必须填真实用户，后台会校验）
     * @param  { Number } expire_time 密码过期时间，单位为秒（设置密码不过期可以将时间设置为0）
     * @return 
     * {
        "errcode": 0,
        "errmsg": "ok"
        }
     */
    async setPasswordExpireTime(oper_userid, expire_time) {
        return await this.httpPostJson('/cgi-bin/corp/config_pwd_expire_time', {oper_userid, expire_time});
    }

    /**
     * @description: 配置用户准入设备数量
     * @param  { String } oper_userid 操作人（必须填真实用户，后台会校验）
     * @param  { Number } max_premit_num 密设备上限个数
     * @return 
     * {
        "errcode": 0,
        "errmsg": "ok"
        }
     */
    async setUserMaxDeviceNum(oper_userid, max_premit_num) {
        return await this.httpPostJson('/cgi-bin/corp/config_user_max_device_num', {oper_userid, max_premit_num})
    }

    
}

module.exports = DeviceClient;