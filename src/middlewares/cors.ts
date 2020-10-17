import { Response } from "express";

export default function cors(_: any, res: Response, next: any) {
    res.set("Access-Control-Allow-Origin", "*")
    next()
}