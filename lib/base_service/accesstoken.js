/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-15 17:22:21
 * @LastEditTime: 2020-06-15 20:47:51
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/base_service/accesstoken.js
 * @Description: 
 */
'use strict';

const HttpClent = require('../kernel/client/httpclient');
const helper = require('./../utils/helper');
const Cache = require('./../kernel/cache/cache');


/**
 * @constructor 
 * @description: AccessToken 类，主要用于获取 accesstoken
 * @param {object} config 配置信息
 * @return: 
 */
class AccessToken extends HttpClent {
    constructor(config) {
        super(config);
        this.config = config;
        this.access_token = null;
        this.cache = new Cache(
            'echat', //在文件存储中会用到，用于区分不同的企业
            this.cache = new Cache(
                this.config.nodeWechat.cache.flag, //在文件存储中会用到，用于区分不同的企业
                this.config.nodeWechat.cache.driver, //选择存储引擎 [ file/redis ]
                //将ctx实例注入到
            ), //选择存储引擎 [ file/redis ]
            this.ctx //将ctx实例注入到
        );
    }
    /**
     * @description: 获取accessToken
     * @param {boolean} falg 是否强制从服务器获取 token 
     * @return: {string}
     */
    async getToken(flag) {
        flag = flag || false; //是否强制刷新accessToken
        //1. 先从缓存中获取，不过如果调用者需要强制从服务器拉取(刷新操作)则从服务器拉取
        flag ? await this.refreshToken() : await this.getTokenFromCache();
        await this.getTokenFromCache();
        // //2. 缓存中没有则从服务器中获取
        if (!this.access_token) {
            await this.getTokenFromServer();
        }

        return this.access_token;
    }

    //从缓存中获取Token
    async getTokenFromCache() {
        this.access_token = await this.cache.get(helper.md5(`${this.config.Agent.AgentId}_${this.secret}`));
    }
    //从服务器获取Token
    async getTokenFromServer() {
        let url = this.config.Corp.ApiUrl;
        if (url[url.length - 1] == '/') { // 防止程序后续出错
            url = url.substr(0, url.length - 1)
        }
        let res;
        try {
            res = await this.curl(getTokenFromServerByplatform(this.config), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                dataType: 'json'
            })
        } catch (error) {
            throw new Error(error);
        }
        //检测请求结果，并返回
        const data = res.data;
        if (data) {
            if (data.errcode !== 0) { // 获取accessToken出错时抛出异常
                try {
                    throw new Error(data);
                } catch (error) {
                    throw new Error(data);
                }
            } else if (data.errcode === 0) {
                this.access_token = data.access_token;
                //将token存进缓存
                await this.storeToken2Cache();
            }
        }
    }
    //获取的token储存
    async storeToken2Cache() {
        try {
            let result = await this.cache.put(helper.md5(`${this.config.Agent.AgentId}_${this.secret}`), this.access_token, 7100);
            if (!result) {
                throw new Error('存入AccessToken失败');
            }
        } catch (error) {
            throw new Error('存入AccessToken失败');
        }
    }

    //刷新缓存中的Token
    async refreshToken() {
        await this.getTokenFromServer();
        return this;
    }
}

// 根据平台选择对应的 token 获取方式
function getTokenFromServerByplatform(config) {
    // 拿到当前在哪个平台
    const nodeWechatPlatformConfig = config.nodeWechat.platform;
    let type = nodeWechatPlatformConfig.type || {};
    if (!type) {
        process.exit()
    }
    let url;
    switch (type) {
        case "wwlocal":
            url = nodeWechatPlatformConfig.wwlocal.ApiUrl;
            if (url[url.length - 1] == '/') { // 防止程序后续出错
                url = url.substr(0, url.length - 1)
            }
            url = `${url}/cgi-bin/gettoken?corpid=${nodeWechatPlatformConfig.wwlocal.CorpInfo.CorpID}&corpsecret=${nodeWechatPlatformConfig.wwlocal.AgentSecret}`
            break;
        case "work":
            break;
        case "mp":
            break;
        case "officialAccount":
            break;
        default:
            break;
    }

    return url
}

module.exports = AccessToken;