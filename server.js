// server.js

var http    = require('http');
var pid     = process.pid;

http.createServer(function  (request, response) {
    for(var i = 0; i < 1e7; i++);

    response.end("Handled by process " + pid);
}).listen(8080, function (){
    console.log("Started process", pid)
});


setTimeout(function () {
    process.exit(1); // death by random timeout
}, Math.random() * 10000);