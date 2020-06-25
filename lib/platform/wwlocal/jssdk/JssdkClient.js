/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-18 00:18:57
 * @LastEditTime: 2020-06-24 23:09:15
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocal/jssdk/JssdkClient.js
 * @Description: 
 */
"use strict";

const ticketClient = require('./Ticket');
const urllibnodejs = require('url');
const Helper = require('../../../kernel/Helper');

class JssdkClient {

    constructor(app) {
        this.config = app.config;
        this.url = '';
        this.ticket = ticketClient(app);
    }

    /**
     * @description: 用户自定义 url
     * @param {String} url 用户自定义的 url 
     * @return: 
     */
    setUrl(url) {
        this.url = url;
    }

    /**
     * @description: 格式化 Url 为 jssdk 需要的url
     * @param { String } url 需要格式化的url
     * @return: 返回处理过后的 url
     */
    getUrl() {
        //处理URL为特定的样式
        const url = urllibnodejs.parse(this.url);
        return `${url.protocol}//${url.host}${url.path}`
    }

    /**
     * @description: 获取 jssdk config
     * @param {array} apis 
     * @param {Boolean} debug 
     * @param {Boolean} beta 
     * @param {Boolean} json 
     */
    async buildConfig(apis, beta = false, debug = false) {

        let js_config = await this.configSignature();
        let js_agent_config = null;
        js_config['debug'] = debug;
        js_config['beta'] = beta;
        js_config['jsApiList'] = apis ? apis : [];

        if (beta) {
            js_agent_config = await this.agentConfigSignature();
            return {
                js_config,
                js_agent_config: js_agent_config ? js_agent_config : {}
            };
        }

        return js_config;
    }

    /**
     * @description: 生成JSSDK的签名
     * @param {string} ticket 
     * @param {string} noncestr 
     * @param {string} timestamp 
     * @param {string} url 
     */
    getTicketSignature(ticket, noncestr, timestamp, url) {

        const string1 = `jsapi_ticket=${ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}` //拼接字符串

        let sign = Helper.sha1(string1);
        
        return sign;
    }

    /**
     * @description: 通过config接口注入权限验证配置
     * @param {String} url 当前页面 url
     * @param {String} nonceStr 随机数
     * @param {String} timestamp 时间戳
     */
    async configSignature(url = null, nonceStr = null, timestamp = null) {
        url = url ? url : this.getUrl(); //拿到url

        nonceStr = nonceStr ? nonceStr : Helper.randomString(10); //生成随机字符串

        timestamp = timestamp ? timestamp : Math.round(new Date().getTime() / 1000); //时间戳
        
        return {
            appId: this.config.corp_id,
            nonceStr,
            timestamp,
            url,
            signature: this.getTicketSignature(await this.getJsTicket(), nonceStr, timestamp, url),
        };

    }
    /**
     * @description: 通过agentConfig注入应用权限
     * @param {String} url 当前页面 url
     * @param {String} nonceStr 随机数
     * @param {String} timestamp 时间戳
     */
    async agentConfigSignature(url = null, nonceStr = null, timestamp = null) {
        url = url ? url : this.getUrl(); //拿到url

        nonceStr = nonceStr ? nonceStr : Helper.randomString(10); //生成随机字符串

        timestamp = timestamp ? timestamp : Math.round(new Date().getTime() / 1000); //时间戳

        return {
            agentid: this.config.agent_id,
            corpid: this.config.corp_id,
            nonceStr,
            timestamp,
            url,
            signature: this.getTicketSignature(await this.getAgentConfigTicket(), nonceStr, timestamp, url),
        };

    }

    async getJsTicket() {
        return await this.ticket.getConfigTicket();
    }
    async getAgentConfigTicket() {
        return await this.ticket.getAgentConfigTicket();
    }

}



module.exports = JssdkClient;