require("dotenv").config();
import cluster from "cluster";


if (cluster.isMaster) {
  let cpuCount: number = require("os").cpus().length;
  console.log("CPU Count: " + cpuCount);
  for (var i = 0; i < cpuCount; i += 1) cluster.fork();
} else {
  require("./server")
}
