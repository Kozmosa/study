var fs = require('fs');
var http = require('http');

var html = fs.readFile('index.html');

function onRequest(request, response) {
    // Send Header
    response.writeHeader(200, {"Content-Type": "text/html"});
    response.write(html);
    response.end();
}

function main() {
    // Start Http Service
    http.createServer(onRequest).listen(80);
    console.log('Server run at 127.0.0.1, port 80');
}

// Main Activity
main()