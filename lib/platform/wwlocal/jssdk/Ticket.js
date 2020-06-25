/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-24 20:55:26
 * @LastEditTime: 2020-06-24 23:09:29
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocal/jssdk/Ticket.js
 * @Description: Jssdk 和 用户详细信息 Tiket 获取统一处理文件类
 */ 
"use strict";
const Helper = require('../../../kernel/Helper');
const baseCLient = require('../../../kernel/BaseClient');
class TicketClient extends  baseCLient{
    constructor(app, type = 'jssdk_config') {        
        super(app);
        const config = app.config;
        this.app = app;
        this.cache = app.resolve(config.cacheDriver);
        this.requestClient = app.resolve('http_client');
        this.secret = config.secret;
        this.ticket = '';
        this.ticket_type = type; // 获取用户是要哪一种类型的 ticket（jssdk配置ticker--jssdk_config和jssdk_agent_config）
    }

    /**
     * @description: 获取 Ticket
     * @param {Boolean} flag  是否强制刷新 Ticket 标志
     * @return: 
     */
    async getTicket(flag) {
        flag = flag || false; //是否强制刷新 Ticket 

        flag ? await this.refreshTicket() : await this.getTicketFromCache();
        // await this.getTicketFromCache();        
        //2. 缓存中没有则从服务器中获取
        if (!this.ticket) {
            await this.getTicketFromServer();
        }
        return this.ticket;
    }

    async getConfigTicket(flag) {
        return await this.getTicket(flag);
    }

    async getAgentConfigTicket(flag) {
        this.ticket_type = 'jssdk_agent_config';
        return await this.getTicket(flag);
    }

    /**
     * @description:  从缓存中获取Ticket
     * @return: 
     */
    async getTicketFromCache() {
        this.access_Ticket = await this.cache.get(Helper.md5(`ticket_${this.secret}_${this.ticket_type}`));
    }
    
    async getTicketFromServer() {
        let res;
        try {
            if (this.ticket_type === 'jssdk_agent_config') {
                res = await this.httpGetJson('/cgi-bin/ticket/get', {type: 'agent_config'});                
            } else if (this.ticket_type === 'jssdk_config') {
                res = await this.httpGetJson('/cgi-bin/get_jsapi_ticket');
            }
        } catch (error) {
            console.log(error);
            return {
                errorcode: 5000000000,
                errmsg: "获取ticket失败，请重试"
            }
        }

        // 检测结果是否正确
        if (res && res.errcode == 0) {
            this.ticket = res.ticket;
             //将Ticket存进缓存
             await this.storeTicket2Cache();
        }

    }

    async storeTicket2Cache() {
        try {
            let result = await this.cache.put(Helper.md5(`ticket_${this.secret}_${this.ticket_type}`), this.ticket, 7100);
            if (!result) {
                // throw new Error(`'存入${this.ticket_type}Ticket失败'`);
            } else {
                // this.logger.info(`存入${this.ticket_type}Ticket成功`);
            }
        } catch (error) {
            // this.logger.error(`存入${this.ticket_type}Ticket失败`);
        }
    }

    async refreshTicket() {
        await this.getTicketFromServer();
        return this;
    }
}

let instance;

module.exports = function(app){
    if (!instance) {
        instance = new TicketClient(app);
    }
    return instance;
};