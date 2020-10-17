import express from "express";
//@ts-ignore
const { check, validationResult } = require("express-validator");

const clickPost = require("../models/clickPost");
const clickRouter = express.Router();

clickRouter.route('/')
//@ts-ignore
.get(async (req, res, next) => {
    try { 
    await clickPost.find({})
    .then((clicks) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(clicks);
    })
    .catch((err) => {
        next(err);
    })
    } catch(err) {
        console.error(err.message);
        res.sendStatus(500);
    }
})
//@ts-ignore
.post(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newPost = new clickPost({
            user: req.body.user,
            description: req.body.description,
            title: req.body.title
        })

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
})

clickRouter.route('/:id')
//@ts-ignore
.get(async (req, res, next) => {
    try { 
    await clickPost.findById(req.params.id)
    .then((click) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(click);
    })
    .catch((err) => {
        next(err);
    })
    } catch(err) {
        console.error(err.message);
        res.sendStatus(500);
    }
})
//@ts-ignore
.delete(async (req, res, next) => {
    try {
    await clickPost.findById(req.params.id)
    .then(async (click) => {
        //@ts-ignore
        await click.remove();
        res.json({ msg: "Post Removed" });
    })
    } catch(err) {
        console.error(err.message);
        res.sendStatus(500);
    }
})
//@ts-ignore
.put(async (req, res, next) => {
    try {
    await clickPost.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify:false})
    //@ts-ignore
    .then(async (click) => {
        //@ts-ignore
        res.json({ msg: "Post Updated" });
    })
    } catch(err) {
        console.error(err.message);
        res.sendStatus(500);
    }
})

module.exports = clickRouter;