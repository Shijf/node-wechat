/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-23 18:09:15
 * @LastEditTime: 2020-06-23 21:56:05
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/platform/wwlocal/media/MediaClient.js
 * @Description: 
 */
const fs = require('fs');
const BaseClient = require('../../../kernel/BaseClient');
const Helper = require('../../../kernel/Helper');
class MediaClient extends BaseClient {
    constructor(app) {
        super(app);
        this.baseUrl = app.config.baseUrl;
    }

    /**
     * @description: 上传临时素材文件
     * @param {String} path 要上传的文件的路径
     * @return: 
     */
    async uploadImage(path) {
        
        const fileInfo = fs.statSync(path);
        if (fileInfo.size > 2097152) {
            return {
                errcode: 40006,
                errmsg:  `文件最大不能超过2MB, 本次上传文件大小为：${Helper.formatBytes(fileInfo.size, 2)}`
            }
        }
        return await this.upload('image', path);
    }

    /**
     * @description: 上传临时素材文件
     * @param {String} path 要上传的文件的路径
     * @return: 
     */
    async uploadVoice(path) {
        const fileInfo = fs.statSync(path);
        if (fileInfo.size > 2097152) {
            return {
                errcode: 40006,
                errmsg:  `文件最大不能超过2MB, 本次上传文件大小为：${Helper.formatBytes(fileInfo.size, 2)}`
            }
        }
        return await this.upload('voice', path);
    }

    /**
     * @description: 上传临时素材文件
     * @param {String} path 要上传的文件的路径
     * @return: 
     */
    async uploadFile(path) {
        const fileInfo = fs.statSync(path);
        if (fileInfo.size > 20971520) {
            return {
                errcode: 40006,
                errmsg:  `文件最大不能超过20MB, 本次上传文件大小为：${Helper.formatBytes(fileInfo.size, 2)}`
            }
        }

        return await this.upload('file', path);
    }

    /**
     * @description: 上传临时素材文件
     * @param {String} path 要上传的文件的路径
     * @return: 
     */
    async uploadVideo(path) {
        const fileInfo = fs.statSync(path);
        if (fileInfo.size > 10485760) {
            return {
                errcode: 40006,
                errmsg:  `文件最大不能超过10MB, 本次上传文件大小为：${Helper.formatBytes(fileInfo.size, 2)}`
            }
        }
        return await this.upload('video', path);
    }

    /**
     * @description: 获取临时素材文件
     * @param {Number} mediaId 媒体id
     * @param {Number} destPath 要存的文件路径
     * @return: 
     */
    async get(mediaId, destPath) {
        let result = await this.requestGetRaw(mediaId);
        if (result.status !== 200) {
            return {
                errcode: 50000000000,
                errmsg: '网络出错，请重试'
            }
        }
        result = result.res; // result.res 是一个 ReadStream 对象
        // 是否写了目标路径，没写则直接返回
        if (!destPath) {
            return result;
        }

        return await this.downloadFileAsync(result, destPath)
    }

    /**
     * @description: 上传媒体文件
     * @param {string} type
     * @param {String} path
     * @return: 
     */
    async upload(type, path) {

        const fileInfo = fs.statSync(path);       

        if (fileInfo.size < 5) {
            return {
                errcode: 40006,
                errmsg:  '文件必须大于 5 字节'
            }
        }

        return await this.httpUpload({ type, path });
    }

    /**
     * @description: 下载文件辅助方法
     * @param {Stream} ReadStreamRes 
     * @param {string} dest 
     * @return: {Promise} 成功为 true
     */
    async downloadFileAsync(ReadStreamRes, dest) {
        return new Promise((resolve, reject) => {
            // 确保dest路径存在
            const file = fs.createWriteStream(dest);
            ReadStreamRes.on('end', () => {
                console.log('download end');
            });
            // 进度、超时等
            file.on('finish', () => {
                file.close();
                resolve(true)
            }).on('error', (err) => {
                fs.unlink(dest);
                reject(err.message);
            })

            ReadStreamRes.pipe(file);

            ReadStreamRes.on('data', (chunk) => {
                console.log(JSON.stringify(chunk));
              });
        });
    }
}

module.exports = MediaClient;