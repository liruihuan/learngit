//此服务解决接口跨域

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();


app.all('*', function (req, res, next) {

  // 允许不同域名下发出的请求也可以携带 cookie
  res.header("Access-Control-Allow-Credentials", true)
  res.header('Access-Control-Allow-Origin', '*') // 允许跨域的域名，* 代表所有域名  
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS, DELETE') // 允许的http请求方法
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, Accept, X-Requested-With') // 允许获取响应头
  if (req.method == 'OPTIONS') {
    res.send(200)  //让options请求快速返回
  } else {
    next()
  }
});

const targetUrl = "http://localhost:3004";
// 拦截http://localhost:3000/api/*  的请求，转到目标服务器:http://localhost:3004/api/*   
app.use('/api/*', createProxyMiddleware({ target: targetUrl, changeOrigin: true }));


//配置服务端口
app.listen(3000, () => {
  console.log("服务已开启,请访问http://127.0.0.1:3000/api/*");
});
