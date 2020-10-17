import express from "express";
//@ts-ignore
const { check, validationResult } = require("express-validator");

const writePost = require("../models/writePost");
const writeRouter = express.Router();

writeRouter.route('/')
//@ts-ignore
.get(async (req, res, next) => {
    try { 
    await writePost.find({})
    .then((writes) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(writes);
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
        const newPost = new writePost({
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

writeRouter.route('/:id')
//@ts-ignore
.get(async (req, res, next) => {
    try { 
    await writePost.findById(req.params.id)
    .then((write) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(write);
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
    await writePost.findById(req.params.id)
    .then(async (art) => {
        //@ts-ignore
        await write.remove();
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
    await writePost.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify:false})
    //@ts-ignore
    .then(async (write) => {
        //@ts-ignore
        res.json({ msg: "Post Updated" });
    })
    } catch(err) {
        console.error(err.message);
        res.sendStatus(500);
    }
})

module.exports = writeRouter;