// cluster.js

var cluster = require('cluster');
var os      = require('os');

var numberOfUsersInDB = function() {
    this.count = this.count || 5;
    this.count = this.count * this.count;
    return this.count;
}

if (cluster.isMaster) {
    var cpus = os.cpus().length;

    console.log("Forking for", cpus, "CPUs");

    for (var i = 0; i < cpus; i++) {
        cluster.fork();
    }

    cluster.on("exit", function (worker, code, signal) {
        // make sure it was not manually disconnected or killed by the master process itself
        if (code !== 0 && !worker.exitedAfterDisconnect) {
            console.log("Worker", worker.id, "crashed. Starting a new worker...");

            cluster.fork();
        }
    });
   
} else {
    require('./server');
}