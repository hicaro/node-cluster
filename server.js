// server.js

var http    = require('http');
var pid     = process.pid;

var usersCount;

http.createServer(function  (request, response) {
    for(var i = 0; i < 1e7; i++);

    response.write("Handled by process " + pid);
    response.end("Users: " + usersCount);
}).listen(8080, function (){
    console.log("Started process", pid)
});

process.on("message", function (msg) {
    usersCount = msg.usersCount;
});