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

    var updateWorkers = function () {
        var usersCount = numberOfUsersInDB();

        Object.values(cluster.workers).forEach(function (worker) {
            worker.send({'usersCount': usersCount});
        });
    };

    updateWorkers();
    setInterval(updateWorkers, 10000);
    
} else {
    require('./server');
}