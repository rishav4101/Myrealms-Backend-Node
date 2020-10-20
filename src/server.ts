import express, { Request, Response } from "express";
import http from "http";
import compression from "compression";
import helmet from "./middlewares/helmet";
import cors from "./middlewares/cors";
import logging from "./middlewares/logging";
// import fs from "fs";

import mongoose from "mongoose";
const session = require('express-session');

const artRouter = require("./routes/artRoutes");
const clickRouter = require("./routes/clickRoutes");
const writeRouter = require("./routes/writeRoutes");
const userRouter = require("./routes/userRoutes");
const imageRouter = require("./routes/imageRoutes");
const app = express();

require("./models/user")
require('./config/passport');

app.use(cors);
app.use(express.json());
app.use(compression());
app.use(helmet);
app.use(logging);


app.use('/art', artRouter);
app.use('/click', clickRouter);
app.use('/write', writeRouter);
app.use('/user', userRouter);
app.use('/img', imageRouter);
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));


// app.locals.logStream = fs.createWriteStream("combined.log", { flags: 'a' });

app.get("/", (req: Request, res: Response) => {
    return res.send({
        status: "online",
        host: req.headers.host,
    });
});

const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.DATABASE_URL?.toString() as string, {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false})
//@ts-ignore
.then((db)=>{
    console.log("connected to db")
})
. catch((err)=>{
    console.log(err)
})

process.on('SIGINT', function () {
    app.locals.logStream.close();
})

server.listen(PORT, () => console.log(`Server started at port ${PORT}`));

export default server;