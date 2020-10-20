"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const cluster_1 = __importDefault(require("cluster"));
if (cluster_1.default.isMaster) {
    let cpuCount = require("os").cpus().length;
    console.log("CPU Count: " + cpuCount);
    for (var i = 0; i < cpuCount; i += 1)
        cluster_1.default.fork();
}
else {
    require("./server");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDM0Isc0RBQThCO0FBRzlCLElBQUksaUJBQU8sQ0FBQyxRQUFRLEVBQUU7SUFDcEIsSUFBSSxRQUFRLEdBQVcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsQ0FBQztJQUN0QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDO1FBQUUsaUJBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztDQUN0RDtLQUFNO0lBQ0wsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0NBQ3BCIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZShcImRvdGVudlwiKS5jb25maWcoKTtcbmltcG9ydCBjbHVzdGVyIGZyb20gXCJjbHVzdGVyXCI7XG5cblxuaWYgKGNsdXN0ZXIuaXNNYXN0ZXIpIHtcbiAgbGV0IGNwdUNvdW50OiBudW1iZXIgPSByZXF1aXJlKFwib3NcIikuY3B1cygpLmxlbmd0aDtcbiAgY29uc29sZS5sb2coXCJDUFUgQ291bnQ6IFwiICsgY3B1Q291bnQpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNwdUNvdW50OyBpICs9IDEpIGNsdXN0ZXIuZm9yaygpO1xufSBlbHNlIHtcbiAgcmVxdWlyZShcIi4vc2VydmVyXCIpXG59XG4iXX0=