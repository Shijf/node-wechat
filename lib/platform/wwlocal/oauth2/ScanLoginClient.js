/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-25 12:20:35
 * @LastEditTime: 2020-06-25 14:24:32
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocal/oauth2/ScanLoginClient.js
 * @Description: 
 */
const querystring = require('querystring');
const BaseClient = require('../../../kernel/BaseClient');
const fs = require('fs');
class ScanLoginClient extends BaseClient {
    constructor(app) {
        super(app)
        this.config = app.config;
        this.state = '';
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
     * @param {String} apiUrl 处理内外网的问题
     * @return: Oauth2Url
     */
    redirectUrl(url, apiUrl) {
        url = url || this.config.redirect_uri;
        let info = {
            appid: this.config.corp_id,
            agentid: this.config.agent_id, //如果需要二次验证必须填入此参数
            redirect_uri: encodeURIComponent(url), // 编码重定向地址
            state: this.state
        };

        return (apiUrl || this.config.corp_api_url) + '/wwopen/sso/qrConnect?' + querystring.stringify(info) + '#wechat_redirect';
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
            return await this.httpGetJson('/cgi-bin/user/getuserinfo', { code });

        } catch (error) {
            // 出错记录日志
        }
    }

    /**
     * @description: 构建前端 js 的 二维码嵌入时 的配置
     * @param {String} qrCodeContainer_id 前端需要存放二维码的容器id
     * @param {String} url 自定义回调地址，可在配置配置文件中写好，也可以自定义
     * @return: Object
     */
    buildWwLoginConfig(qrCodeContainer_id, url) {
        url = url || this.config.redirect_uri;
        return {
            "id": qrCodeContainer_id,
            "appid": this.config.corp_id,
            "agentid": this.config.agent_id,
            "redirect_uri": encodeURIComponent(url),
            "state": this.state,
            "href": "",// 自定义样式链接，第三方可根据实际需求覆盖默认样式。
        }
    }

    /**
     * @description: 编码二维码样式
     * @param {String} 样式文件路径 
     * @return: 
     */
    base64_encode(file) {
        let bitmap = fs.readFileSync(file);
        return 'data:text/css;base64,'+ Buffer.from(bitmap).toString('base64');
    }
}

module.exports = ScanLoginClient;