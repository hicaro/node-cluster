/*
    Credits to Samer Buna
    Link to his article: https://medium.freecodecamp.org/scaling-node-js-applications-8492bd8afadc
*/

var cluster = require('cluster');
var os      = require('os');

if (cluster.isMaster) {
    console.log('Master PID:', process.pid);

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

    var restartWorker = function (workers, index) {
        if (index < workers.length) {
            var worker = workers[index];
            worker.on("exit", function () {
                if (!worker.exitedAfterDisconnect) return;

                console.log("Exited process", worker.process.pid);

                cluster.fork().on("listening", function() {
                    restartWorker(workers, index + 1);
                });
            });

            worker.disconnect();
        }
    };

    process.on('SIGUSR2', function () {
        var workers = Object.values(cluster.workers);
        restartWorker(workers, 0);
    });
   
} else {
    require('./server');
}
