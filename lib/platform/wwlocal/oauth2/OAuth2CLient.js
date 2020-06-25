/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-25 11:07:05
 * @LastEditTime: 2020-06-25 12:19:41
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocal/oauth2/OAuth2CLient.js
 * @Description: 
 */ 
const querystring = require('querystring');
const BaseClient = require('../../../kernel/BaseClient');
 
class OAuth2CLient extends BaseClient {
    constructor(app) {
        super(app)
        this.config = app.config;
        this.scope = null;
        this.state = 'node_wechat';
    }

    /**
     * @description: 设置应用授权作用域。
     * @param { String } scope snsapi_base：静默授权，可获取成员的基础信息；
                               snsapi_userinfo：静默授权，可获取成员的详细信息，但不包含手机、邮箱；
                               snsapi_privateinfo：手动授权，可获取成员的详细信息，包含手机、邮箱。
     * @return: OAuth2CLient
     */
    scope(scope) {
        this.scope = scope;
        return this;
    }

    /**
     * @description: 设置 state 参数
     * @param {String} state 重定向后需要带回的参数，可验证是否是当前的服务的链接。重定向后会带上state参数，企业可以填写a-zA-Z0-9的参数值，长度不可超过128个字节
     * @return: OAuth2CLient
     */
    state(state) {
        this.state = state;
        return this;
    }

    /**
     * @description: 获取重定向的地址
     * @param {String} url 拼接重定向地址
     * @return: Oauth2Url
     */
    redirectUrl(url) {
        url = url || this.config.redirect_uri;
        let info = {
            appid: this.config.corp_id,
            redirect_uri: encodeURIComponent(url), // 编码重定向地址
            response_type: 'code',
            scope: this.scope || this.config.scope,
            state: this.state,
            agentid: this.config.agent_id //如果需要二次验证必须填入此参数
        };

        return (this.config.corp_oauth_url || 'https://open.weixin.qq.com/connect/oauth2/authorize') + '?' + querystring.stringify(info) + '#wechat_redirect';
    }

    /**
     * @description: 异步获取重定向的地址
     * @param {String} url 拼接重定向地址
     * @return: Oauth2Url
     */
    async redirectUrlAsync(url) {
        return this.redirectUrl(url);
    }
    
    /**
     * @description: 根据 code 获取用户信息
     * @param { String }  code Oauth2 返回时 携带的 code
     * @param { Boolean }  detail 是否获取用户详细的信息
     * @return: 
     */
    async getUserInfo(code) {
        try {
            // 获取用户信息
            let res = await this.httpGetJson('/cgi-bin/user/getuserinfo', {code});
            if (!res.user_ticket) { // 如果包含 ticket，则直接返回
                res.info = '请设置scope以获取更详细的信息';
                return res;
            }
            return Object.assign(res, await this.getUserDetail(res.user_ticket));
        } catch (error) {
            // 出错记录日志
        }
    }

    /**
     * @description: 根据 user_ticket 获取用户详细信息
     * @param {String} user_ticket 
     * @return: 
     */
    async getUserDetail(user_ticket) {
        try {
            //获取当前的用户信息
            let res = await this.httpPostJson('/cgi-bin/user/getuserdetail', {
                user_ticket
            });

            return res;
        } catch (error) {
            // this.ctx.logger.error(error);
        }
    }

}

module.exports = OAuth2CLient;