/*
    Credits to Samer Buna
    Link to his article: https://medium.freecodecamp.org/scaling-node-js-applications-8492bd8afadc
*/

var http    = require('http');
var pid     = process.pid;

http.createServer(function  (request, response) {
    for(var i = 0; i < 1e7; i++);

    response.end("Handled by process " + pid);
}).listen(8080, function (){
    console.log("Started process", pid)
});
