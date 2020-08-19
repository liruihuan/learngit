//此服务用于加载本地文件时候跨域处理

const http = require('http');
const fs = require('fs');
const server = http.createServer();

const readFolder = function (request, response) {
    const url = request.url;
    // console.log(url);
    if (url === '/' || url === "/adaptiveLayout") {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile('./adaptiveLayout.html', function (error, data) {
            if (error) {
                console.error(error);
                return;
            }
            response.end(data);
        });
    } else if (url !== '/') {
        const surl = '.' + url;
        const type = surl.substr(surl.lastIndexOf(".") + 1, surl.length)
        response.writeHead(200, { 'Content-type': "text/" + type });
        fs.readFile(surl, function (error, data) {
            if (error) {
                console.error(error);
                return;
            }
            response.end(data);
        });
    }
}
server.on('request', readFolder);

server.listen(8080, function () {
    console.log("服务已开启,请访问http://127.0.0.1:8080/");
})
