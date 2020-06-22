/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-18 13:29:11
 * @LastEditTime: 2020-06-22 10:45:48
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/kernel/BaseClient.js
 * @Description: 
 */
"use strict";
// const EventEmitter = require('events');
class BaseClient {
    constructor(app, accesstokenType) { 
        this.config = app.getConfig();
        this.requestClient = app.resolve('http_client');
        this.baseUrl = app.config.baseUrl;        
        this.accesstoken = '';
        this.accesstokenType = accesstokenType ? accesstokenType : 'access_token';
        this.app = app;
    }

    async setAccessToken() {
        //在此判断是哪一种access_token，默认是应用的
        if (!this.accesstokenType) {
            return;
        }        
        const accessTokenInstance = this.app.resolve(this.accesstokenType); 
        this.accesstoken = await accessTokenInstance.getToken();
    }

    async getAccessToken() {
        if (!this.accesstoken) {
            await this.setAccessToken()
        }
        
        return this.accesstoken;
    }

    /**
     * @description: 
     * @param {type} 
     * @return: 
     */
    async httpGet(url, queryParams) {
        return await this.request(url, {
            method: 'GET',
            queryParams,
            // dataType: 'json',
            timeout: 8000,
        });
    }

    async httpGetJson(url, data) {
        return await this.request(url, {
            method: 'GET',
            data,
            dataType: 'json',
            timeout: 8000,
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }
    /**
     * @description: 
     * @param {string} url 
     * @param {object} data 
     * @return: 
     */
    async httpPostJson(url, data) {
        return await this.request(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data,
            dataType: 'json'
        });
    }

    /**
     * @description: 构建原始请求客户端
     * @param {string | object } 
     * @return: httpResponse
     */
    async request(url, args = {}) {
        this.onResponseMiddleware(this.requestClient)
        const access_token = await this.getAccessToken();
        try {
            const { data } =  await (this.requestClient).request(`${this.baseUrl}${url}?access_token=${access_token}`, args);
            return data
        } catch (error) {
            // throw new Error(error.message)
            return {
                code: 400,
                msg: error.name
            }
        }
    }

    async onRequestMiddleware(httpclient) {         
        httpclient.on('request', req => {
            
            // req.url = `${oraginalUrl}?access_token=${access_token}`            
            //  //请求 url
            // req.ctx //是发起这次请求的当前上下文
            // console.log(req);

            // 可以在这里设置一些 trace headers，方便全链路跟踪
        })
    }

    async onResponseMiddleware(httpclient) {
        httpclient.on('response', result => {
            // console.log(result);
            
            console.log("响应：", result.res.data);
            console.log("成功发送事件");
        });
    }


}

module.exports = BaseClient;