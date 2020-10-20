"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("./middlewares/helmet"));
const cors_1 = __importDefault(require("./middlewares/cors"));
const logging_1 = __importDefault(require("./middlewares/logging"));
const mongoose_1 = __importDefault(require("mongoose"));
const session = require('express-session');
const artRouter = require("./routes/artRoutes");
const clickRouter = require("./routes/clickRoutes");
const writeRouter = require("./routes/writeRoutes");
const userRouter = require("./routes/userRoutes");
const imageRouter = require("./routes/imageRoutes");
const app = express_1.default();
require("./models/user");
require('./config/passport');
app.use(cors_1.default);
app.use(express_1.default.json());
app.use(compression_1.default());
app.use(helmet_1.default);
app.use(logging_1.default);
app.use('/art', artRouter);
app.use('/click', clickRouter);
app.use('/write', writeRouter);
app.use('/user', userRouter);
app.use('/img', imageRouter);
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.get("/", (req, res) => {
    return res.send({
        status: "online",
        host: req.headers.host,
    });
});
const server = http_1.default.createServer(app);
const PORT = process.env.PORT || 8080;
mongoose_1.default.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then((db) => {
    console.log("connected to db");
})
    .catch((err) => {
    console.log(err);
});
process.on('SIGINT', function () {
    app.locals.logStream.close();
});
server.listen(PORT, () => console.log(`Server started at port ${PORT}`));
exports.default = server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUFxRDtBQUNyRCxnREFBd0I7QUFDeEIsOERBQXNDO0FBQ3RDLGtFQUEwQztBQUMxQyw4REFBc0M7QUFDdEMsb0VBQTRDO0FBRzVDLHdEQUFnQztBQUNoQyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUUzQyxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNoRCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUNwRCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUNwRCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUNsRCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUNwRCxNQUFNLEdBQUcsR0FBRyxpQkFBTyxFQUFFLENBQUM7QUFFdEIsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBQ3hCLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBRTdCLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBSSxDQUFDLENBQUM7QUFDZCxHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLHFCQUFXLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZCLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQU0sQ0FBQyxDQUFDO0FBQ2hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxDQUFDO0FBR2pCLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzNCLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQy9CLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQy9CLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzdCLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQzdCLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztBQUt0SCxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUN6QyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDWixNQUFNLEVBQUUsUUFBUTtRQUNoQixJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJO0tBQ3pCLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxNQUFNLEdBQUcsY0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN0QyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7QUFFdEMsa0JBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFzQixFQUFFLEVBQUMsZUFBZSxFQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUMsS0FBSyxFQUFDLENBQUM7S0FFNUgsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFDLEVBQUU7SUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUE7QUFDbEMsQ0FBQyxDQUFDO0tBQ0EsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFDLEVBQUU7SUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ3BCLENBQUMsQ0FBQyxDQUFBO0FBRUYsT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDakIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDakMsQ0FBQyxDQUFDLENBQUE7QUFFRixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFekUsa0JBQWUsTUFBTSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MsIHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IGh0dHAgZnJvbSBcImh0dHBcIjtcbmltcG9ydCBjb21wcmVzc2lvbiBmcm9tIFwiY29tcHJlc3Npb25cIjtcbmltcG9ydCBoZWxtZXQgZnJvbSBcIi4vbWlkZGxld2FyZXMvaGVsbWV0XCI7XG5pbXBvcnQgY29ycyBmcm9tIFwiLi9taWRkbGV3YXJlcy9jb3JzXCI7XG5pbXBvcnQgbG9nZ2luZyBmcm9tIFwiLi9taWRkbGV3YXJlcy9sb2dnaW5nXCI7XG4vLyBpbXBvcnQgZnMgZnJvbSBcImZzXCI7XG5cbmltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIjtcbmNvbnN0IHNlc3Npb24gPSByZXF1aXJlKCdleHByZXNzLXNlc3Npb24nKTtcblxuY29uc3QgYXJ0Um91dGVyID0gcmVxdWlyZShcIi4vcm91dGVzL2FydFJvdXRlc1wiKTtcbmNvbnN0IGNsaWNrUm91dGVyID0gcmVxdWlyZShcIi4vcm91dGVzL2NsaWNrUm91dGVzXCIpO1xuY29uc3Qgd3JpdGVSb3V0ZXIgPSByZXF1aXJlKFwiLi9yb3V0ZXMvd3JpdGVSb3V0ZXNcIik7XG5jb25zdCB1c2VyUm91dGVyID0gcmVxdWlyZShcIi4vcm91dGVzL3VzZXJSb3V0ZXNcIik7XG5jb25zdCBpbWFnZVJvdXRlciA9IHJlcXVpcmUoXCIuL3JvdXRlcy9pbWFnZVJvdXRlc1wiKTtcbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcblxucmVxdWlyZShcIi4vbW9kZWxzL3VzZXJcIilcbnJlcXVpcmUoJy4vY29uZmlnL3Bhc3Nwb3J0Jyk7XG5cbmFwcC51c2UoY29ycyk7XG5hcHAudXNlKGV4cHJlc3MuanNvbigpKTtcbmFwcC51c2UoY29tcHJlc3Npb24oKSk7XG5hcHAudXNlKGhlbG1ldCk7XG5hcHAudXNlKGxvZ2dpbmcpO1xuXG5cbmFwcC51c2UoJy9hcnQnLCBhcnRSb3V0ZXIpO1xuYXBwLnVzZSgnL2NsaWNrJywgY2xpY2tSb3V0ZXIpO1xuYXBwLnVzZSgnL3dyaXRlJywgd3JpdGVSb3V0ZXIpO1xuYXBwLnVzZSgnL3VzZXInLCB1c2VyUm91dGVyKTtcbmFwcC51c2UoJy9pbWcnLCBpbWFnZVJvdXRlcik7XG5hcHAudXNlKHNlc3Npb24oeyBzZWNyZXQ6ICdwYXNzcG9ydC10dXRvcmlhbCcsIGNvb2tpZTogeyBtYXhBZ2U6IDYwMDAwIH0sIHJlc2F2ZTogZmFsc2UsIHNhdmVVbmluaXRpYWxpemVkOiBmYWxzZSB9KSk7XG5cblxuLy8gYXBwLmxvY2Fscy5sb2dTdHJlYW0gPSBmcy5jcmVhdGVXcml0ZVN0cmVhbShcImNvbWJpbmVkLmxvZ1wiLCB7IGZsYWdzOiAnYScgfSk7XG5cbmFwcC5nZXQoXCIvXCIsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICByZXR1cm4gcmVzLnNlbmQoe1xuICAgICAgICBzdGF0dXM6IFwib25saW5lXCIsXG4gICAgICAgIGhvc3Q6IHJlcS5oZWFkZXJzLmhvc3QsXG4gICAgfSk7XG59KTtcblxuY29uc3Qgc2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoYXBwKTtcbmNvbnN0IFBPUlQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDgwODA7XG5cbm1vbmdvb3NlLmNvbm5lY3QocHJvY2Vzcy5lbnYuREFUQUJBU0VfVVJMIGFzIHN0cmluZywge3VzZU5ld1VybFBhcnNlcjp0cnVlLCB1c2VVbmlmaWVkVG9wb2xvZ3k6dHJ1ZSwgdXNlRmluZEFuZE1vZGlmeTpmYWxzZX0pXG4vL0B0cy1pZ25vcmVcbi50aGVuKChkYik9PntcbiAgICBjb25zb2xlLmxvZyhcImNvbm5lY3RlZCB0byBkYlwiKVxufSlcbi4gY2F0Y2goKGVycik9PntcbiAgICBjb25zb2xlLmxvZyhlcnIpXG59KVxuXG5wcm9jZXNzLm9uKCdTSUdJTlQnLCBmdW5jdGlvbiAoKSB7XG4gICAgYXBwLmxvY2Fscy5sb2dTdHJlYW0uY2xvc2UoKTtcbn0pXG5cbnNlcnZlci5saXN0ZW4oUE9SVCwgKCkgPT4gY29uc29sZS5sb2coYFNlcnZlciBzdGFydGVkIGF0IHBvcnQgJHtQT1JUfWApKTtcblxuZXhwb3J0IGRlZmF1bHQgc2VydmVyOyJdfQ==