/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-06-15 16:23:11
 * @LastEditTime: 2020-06-25 19:06:14
 * @LastEditors: shijf
 * @FilePath: /node-echat/test/index.js
 * @Description: 测试主入口
 */




const express = require('express');
const server = express();
const bodyParser = require("body-parser");
// require("body-parser-xml")(bodyParser);

const config = require('./config');
const Factory = require('./../index');
const port = 3000;

server.use(bodyParser.urlencoded({
  extended: true
}));

server.get('/', (req, res) => {
  res.send('Hello World!')
})

server.get('/server', (req, res) => {
  console.log('=================');

  const query = req.query;

  console.log(query);
  
  const app = Factory.wwlocal(config);

  const replyMsg = app.server.server(query);
  console.log(replyMsg);

  res.send(replyMsg)
})
const app = Factory.wwlocal(config);
server.post('/server', (req, res) => {

  let data = '';//添加接收变量
  req.setEncoding('utf8');

  req.on('data', function (chunk) {
    data += chunk;
  });
  req.on('end', function () {
    console.log(data);
    
    res.send(app.server.server(req.query, data));
  });
  // res.json(req.body)
  // 
  // query.data = data;
  // const replyMsg = app.server.server(query);
  // console.log(replyMsg);

  
})

server.listen(port, () => console.log(`Example app listening on port ${port}!`))











