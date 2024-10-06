

const cluster= require("cluster");
const cCPUS= require("os").cpus().length;



const start= require("./app")
process.on('SIGINT', function() {
    console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
    // some other closing procedures go here
    process.exit(1);
  });
if (cluster.isMaster) {
    for (let i = 0; i < cCPUS; i++) {
        cluster.fork();
    }
   
    cluster.on("exit",function (worker,code,signal) {
        console.log("worker "+ worker.process.pid+" died.");
    })
}else{

start()
}
