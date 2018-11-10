var fs = require('fs');
var http = require('http');

exports.rFile = function(fname) {
    fs.readFile(fname, function (err, data) {
    if (err){
        console.log(err.stack);
        return;
    }
    return data;
    console.log('Data:' + data.toString());
    });
}

exports.test = function(str) {
	console.log(str);
}