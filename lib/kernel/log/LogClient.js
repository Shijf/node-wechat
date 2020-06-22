/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-22 18:22:40
 * @LastEditTime: 2020-06-22 22:46:43
 * @LastEditors: shijf
 * @FilePath: /node-echat/lib/kernel/log/LogClient.js
 * @Description: 
 */
const Logger = require('egg-logger').Logger;
const FileTransport = require('egg-logger').FileTransport;
const ConsoleTransport = require('egg-logger').ConsoleTransport;

class LogClient extends Logger {
    constructor() {
        super()
        // this.set()
        this.set('file', new FileTransport({
            file: './path/to/file',
            level: 'INFO',
        }));

        this.set('console', new ConsoleTransport({
            level: 'DEBUG',
        }));
    }
}

module.exports = LogClient;