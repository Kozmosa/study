let fs = require('fs');
let join = require('path').join;
let http = require('http');
let url = require('url');

/**
 * 
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */
function findSync(startPath) {
    let result=[];
    function finder(path) {
        let files=fs.readdirSync(path);
        files.forEach((val,index) => {
            let fPath=join(path,val);
            let stats=fs.statSync(fPath);
            if(stats.isDirectory()) finder(fPath);
            if(stats.isFile()) result.push(fPath);
        });

    }
    finder(startPath);
    return result;
}

function getFileContent(fname) {
    // Get File Content by Fs module
    let content = fs.readFileSync(fname, 'utf-8',);
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
    let head = fs.readFileSync('./server/front/head.html');
    let foot = fs.readFileSync('./server/front/foot.html');
    let html = head + body + foot;
    // Start HTTP Server by Http Module
    let server = http.createServer(function (request, response) {
        // Send Http Header
        // 200 OK
        // Content type: text/html
        response.writeHead(200, {'Content-Type': 'text/html'});

        // Send Response Data
        response.write(html);
        // Test Response
        response.end();
    }).listen(8888);
    console.log('Server start at 127.0.0.1:8888');
}

function main() {
    // Main Function

    // Scan Files in ./file/ directory
    let fileNames = findSync('./file/');
    let codes = [];
    for(var i = 0;i<fileNames.length;i++){
        // Get HTML Code
        codes[i] = getHtmlCode('./file/' + fileNames[i], fileNames[i]);
    }

    let body = '';
    for(let i = 0;i<codes.length;i++){
        // Add HTML Code
        body = body + codes[i];
    }

    // Start HTTP Service
    startHttpServer(body);
}

// Start Function
main();