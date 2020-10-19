import express from "express";
//@ts-ignore
const { check, validationResult } = require("express-validator");

const clickPost = require("../models/clickPost");
const clickRouter = express.Router();

const auth = require('../middlewares/auth');
const Users = require('../models/user');

clickRouter.route('/')
//@ts-ignore
.get(auth.required, async (req, res, next) => {
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
.post(auth.required, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        // const user = await Users.findById(req.body.user)
        // console.log(req);
        const newPost = new clickPost({
            
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

clickRouter.route('/:id')
//@ts-ignore
.get(auth.required, async (req, res, next) => {
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
.delete(auth.required, async (req, res, next) => {
    try {
    //@ts-ignore
    const tuser = await Users.findById(req.payload.id)
    //@ts-ignore
    await clickPost.findById(req.params.id)
    .then(async (click) => {
        //@ts-ignore
        if(click.user == tuser.id){
            //@ts-ignore
            await click.remove();
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
    await clickPost.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify:false})
    //@ts-ignore
    .then(async (click) => {
        //@ts-ignore
        if(click.user == tuser.id) {
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

module.exports = clickRouter;