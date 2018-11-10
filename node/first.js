var http = require("http");
var fs = require("fs");

//Get Data from File
var html = fs.readFileSync('file.html');

http.createServer(function (request, response) {
	//Send http header
	//Http Status: 200 OK
	//Content Type: text/plain
	response.writeHead(200, {'Content-Type': 'text/html'});

	//Send Response Data
	response.end(html);
}).listen(8888);

//Print something in terminal
console.log('Server running at 127.0.0.1:8888');