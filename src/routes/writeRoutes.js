import express from "express";
//@ts-ignore
const { check, validationResult } = require("express-validator");

const writePost = require("../models/writePost");
const writeRouter = express.Router();

const auth = require('../middlewares/auth');
const Users = require('../models/user');

writeRouter.route('/')
//@ts-ignore
.get(auth.required, async (req, res, next) => {
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
.post(auth.required, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newPost = new writePost({
            //@ts-ignore
            user: req.payload.id,
            description: req.body.description,
            title: req.body.title,
            time: Date.now(),
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
.get(auth.required, async (req, res, next) => {
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
.delete(auth.required, async (req, res, next) => {
    try {
    //@ts-ignore
    const tuser = await Users.findById(req.payload.id)
    await writePost.findById(req.params.id)
    .then(async (write) => {
        //@ts-ignore
        if(write.user == tuser.id){
            //@ts-ignore
            await write.remove();
            res.json({ msg: "Post Removed" });
        }
        else{
            res.json({ msg: "You cannot remove this post" });
        }
    })
    } catch(err) {
        console.error(err.message);
        res.sendStatus(500);
    }
})
//@ts-ignore
.put(auth.required, async (req, res, next) => {
    try {
    //@ts-ignore
    const tuser = await Users.findById(req.payload.id)
    await writePost.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify:false})
    //@ts-ignore
    .then(async (write) => {
        //@ts-ignore
        if(write.user == tuser.id) {
            //@ts-ignore
            res.json({ msg: "Post Updated" });
        }
        else {
            //@ts-ignore
            res.json({ msg: "You cannot update this post" });
        }
    })
    } catch(err) {
        console.error(err.message);
        res.sendStatus(500);
    }
})

module.exports = writeRouter;