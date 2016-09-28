// only ES5 is allowed in this file
require("babel-register");

// to prevent the ReferenceError: regeneratorRuntime is not defined
// (that occurs because of the generator use with Babel)
require('babel-polyfill');

var cluster = require('cluster');
var os = require('os');

var appConstructor = require('./server').default;
var winstonLogger = require('./utils/winston-logger').default;

// In production mode, start the Node app as a cluster;
// in development mode, start the Node app on a single thread (which makes it
// much faster to restart after making changes to the code)

if (process.env.NODE_ENV === 'production') {

    // CREATE A CLUSTER OF NODE PROCESSES
    if (cluster.isMaster) {
        os.cpus().forEach(() => {
            cluster.fork();
        });
        
        cluster.on('listening', function(worker, address) {
            console.log(`Worker started with PID ${worker.process.pid}; listening on port ${address.port}`);
        });
        
        // Listen for dying workers
        cluster.on('exit', function (worker) {

            // Replace the dead worker
            winstonLogger.error(`Worker ${worker.id} died`);
            cluster.fork();
        });
    } else {
        appConstructor();
    }
    
} else {
    appConstructor();
}
