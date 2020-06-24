/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-18 15:23:41
 * @LastEditTime: 2020-06-24 20:56:23
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/kernel/AccessToken.js
 * @Description: Access Token 统一处理类
 */
"use strict";
const Helper = require('./Helper')
class AccessToken {
    constructor(app) {
        const config = app.config;
        this.cache = app.resolve(config.cacheDriver);
        this.requestClient = app.resolve('http_client');
        this.accesstoken = '';
        this.config = config;
        this.tokenUrl = app.config.baseUrl;
        this.tokenFlag = app.config.accessTokenFlag;
        this.app = app;
    }
    /**
     * @description: 获取 token 值
     * @param {boolean} 是否强制刷新
     * @return: 
     */
    async getToken(flag) {
        flag = flag || false; //是否强制刷新accessToken
        //1. 先从缓存中获取，不过如果调用者需要强制从服务器拉取(刷新操作)则从服务器拉取
        flag ? await this.refreshToken() : await this.getTokenFromCache();
        //2. 缓存中没有则从服务器中获取
        if (!this.accesstoken) {
            await this.getTokenFromServer();
        }
        // 3. 返回最终的token值
        return this.accesstoken;
    }

    /**
     * @description: 从服务器获取 accesstoken
     * @param {type} 
     * @return: 
     */
    async getTokenFromServer() {        
        const {data} = await this.requestClient.request(this.tokenUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            dataType: 'json'
        })        
        this.accesstoken = data.access_token;
        //将token存进缓存
        await this.storeToken2Cache();

    }

    //刷新缓存中的Token
    async refreshToken() {
        await this.getTokenFromServer();
    }
    //获取的token储存
    async storeToken2Cache() {
        await this.cache.put(Helper.md5(this.tokenFlag), this.accesstoken, 7100)
    }
    async getTokenFromCache() {
        // await this.cache.put('test', '22点36分');  
        this.accesstoken = await this.cache.get(Helper.md5(this.tokenFlag));
    }
}

module.exports = AccessToken;