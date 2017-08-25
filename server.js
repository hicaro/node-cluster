// server.js

var http    = require('http');
var pid     = process.pid;

http.createServer(function  (request, response) {
    for(var i = 0; i < 1e7; i++);
    response.end("Handled by process", pid);
}).listen(8080, function (){
    console.log("Started process", pid)
});

