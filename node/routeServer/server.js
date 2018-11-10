// Require some modules
var fs = require('fs'); // Require the fileStreaming module
var events = require('events'); // Require the events support module
var http = require('http');
var url = require('url');

function start(route) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log('Request for :' + pathname + 'received.');

        route(pathname);
        
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("Hello world.");
        response.end();
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}

exports.start = start;