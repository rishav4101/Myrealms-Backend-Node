import { Request, Response } from "express";

export default function logging(req: Request, res: Response, next: any) {
    let t = new Date()
    let formattedString = `${req.ip} -- [${t.toLocaleString()}] ${req.method} ${req.url} ${res.statusCode} ${req.headers["user-agent"]}`

    if (process.env.NODE_ENV == "production") {
        req.app.locals.logStream.write(formattedString + "\n")
    } else {
        console.log(formattedString)
    }
    next()
}