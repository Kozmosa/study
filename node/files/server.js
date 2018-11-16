const fs = require('fs');
const join = require('path').join;
const http = require('http');
const url = require('url');
const express = require('express');
const mutipart = require('connect-multiparty');

let mutipartMiddleware = mutipart();

/**
 * 
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */
function findSync(startPath) {
    let result = [];

    function finder(path) {
        let files = fs.readdirSync(path);
        files.forEach((val, index) => {
            let fPath = join(path, val);
            let stats = fs.statSync(fPath);
            if (stats.isDirectory()) finder(fPath);
            if (stats.isFile()) result.push(fPath);
        });

    }
    finder(startPath);
    return result;
}

function getFileContent(fname) {
    // Get File Content by Fs module
    let content = fs.readFileSync(fname, 'utf-8', );
    return content;
}

function getHtmlCode(fPath, fName) {
    // Get Href Code
    let code = '<a href=' + fPath + ' >' + fName + '</a>';
    return code;
}

function writeCodeInHtml() {
    //
}

function startHttpServer(body) {
    // Get HTML Page Content
    let webRootDir = './file';
    let head = fs.readFileSync('./file/server/front/head.html');
    let foot = fs.readFileSync('./file/server/front/foot.html');
    let html = head + body + foot;

    // Start HTTP Server by Http Module
    let server = http.createServer(function (request, response) {
        // Get Request String
        let reqUrl = request.url;

        // Send Http Header
        // 200 OK
        // Content type: text/html
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });

        // Send Response Data
        if (reqUrl == '/index.html') {
            response.write(html);
        } else {
            response.write(fs.readFileSync(webRootDir + reqUrl, 'utf-8'));
        }
        // Test Response
        response.end();
    }).listen(8888);
    console.log('Server start at 127.0.0.1:8888');
}

function startFileServer(body) {
    // Get HTML Page Content
    let webRootDir = './file';
    let head = fs.readFileSync('./file/server/front/head.html');
    let foot = fs.readFileSync('./file/server/front/foot.html');
    let html = head + body + foot;

    // Start HTTP Server by Http Module
    let server = http.createServer(function (request, response) {
        // Get Request String
        let reqUrl = request.url;

        // Send Http Header
        // 200 OK
        // Content type: text/html
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });

        // Send Response Data
        response.write(fs.readFileSync(webRootDir + reqUrl, 'utf-8'));
        // Test Response
        response.end();
    }).listen(8888);
    console.log('Server start at 127.0.0.1:8888');
}

function startDirectoryServer(port) {
    // Start Express Server
    let app = express();
    app.get('/', function(req, res) {
        //Console Log
        console.log('Request index page');
        let index = fs.readFileSync('./file/server/front/index.html');
        res.type('text/html');
        res.sendfile('./file/server/front/index.html');
    });

    let server = app.listen(port, function() {
        let addr = server.address().address;
        let port = server.address().port;

        console.log('Server start at ' + addr + ':' + port);
    });
}

function startUploadServer(port) {
    let app = express();
    app.use(mutipart({uploadDir:'./file/uploads'}));

    // 设置http服务的监听端口号
    app.set('port', port);
    app.listen(app.get('port'), function () {
        console.log('File Upload Server started on 127.0.0.1:' + app.get('port') );
    });

    // 浏览器访问的主页
    app.get('/', function (req, res) {
        //Output Connect Infomation
        console.log('Request Index Page.');
        res.type('text/html');
        res.sendfile('file/server/front/upload.html');
    });

    // 开始写重要代码
    // 接受form表单的请求接口，请求方法为post
    app.post('/upload', mutipartMiddleware, function (req, res){
        // 输出辅助信息
        console.log('Receive File Success.');

        // 返回成功提示给浏览器
        res.send('upload success!');
    });
}

function main() {
    // Main Function

    // Scan Files in ./file/ directory
    let fileNames = findSync('./file/');
    let codes = [];
    for (var i = 0; i < fileNames.length; i++) {
        // Get HTML Code
        codes[i] = getHtmlCode('./file/' + fileNames[i], fileNames[i]);
    }

    let body = '';
    for (let i = 0; i < codes.length; i++) {
        // Add HTML Code
        body = body + codes[i];
    }

    // Start HTTP Service
    startHttpServer(body);
}

// Main Activity
console.log('Start Server......');
startUploadServer(8888);