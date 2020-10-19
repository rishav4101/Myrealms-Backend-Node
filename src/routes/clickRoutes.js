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
    
    await clickPost.findById(req.params.id)
    //@ts-ignore
    .then(async (click) => {
        //@ts-ignore
        if(click.user == tuser.id) {
            await clickPost.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify:false})
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

clickRouter.route('/like/:id')
//@ts-ignore
.put(auth.required, async (req, res, next) => {
    try {
        //@ts-ignore
        const tuser = await Users.findById(req.payload.id)
        await clickPost.findById(req.params.id)
        //@ts-ignore
        .then(async (click) => {
            //@ts-ignore
            if (click.likes.filter((like) => like.user.toString() === req.payload.id).length > 0) {
                return res.status(400).json({ msg: "Post already liked" });
            }
            else {
                //@ts-ignore
                click.likes.unshift({ user: req.payload.id });
                await click?.save()
                res.json({msg: "post liked"})
            }
        })
    } catch(err) {
        console.error(err.message);
        res.sendStatus(500);
    } 
})

clickRouter.route('/unlike/:id')
//@ts-ignore
.put(auth.required, async (req, res, next) => {
    try {
        //@ts-ignore
        const tuser = await Users.findById(req.payload.id)
        await clickPost.findById(req.params.id)
        //@ts-ignore
        .then(async (click) => {
            //@ts-ignore
            if (click.likes.filter((like) => like.user.toString() === req.payload.id).length === 0) {
                return res.status(400).json({ msg: "Post has not yet been liked" });
            }
            else{
              //Get remove index
              //@ts-ignore
              const removeIndex = click.likes
                //@ts-ignore
                .map((like) => like.user.toString())
                //@ts-ignore
                .indexOf(req.payload.id);

              //@ts-ignore
              click?.likes.splice(removeIndex, 1);
              await click?.save();
              res.json({msg: "post unliked"})
            }
        })
    } catch(err) {
        console.error(err.message);
        res.sendStatus(500);
    } 
})

clickRouter.route('/comment/:id')
//@ts-ignore
.post(auth.required, async (req, res, next) => {
    try {
        //@ts-ignore
        const tuser = await Users.findById(req.payload.id)
        await clickPost.findById(req.params.id)
        //@ts-ignore
        .then(async (click) => {
        const newComment = {
            time: Date.now(),
            text: req.body.text,
            //@ts-ignore
            name: tuser?.username,
            //@ts-ignore
            user: req.payload.id,
          };
          //@ts-ignore
          click?.comments.unshift(newComment);
          //@ts-ignore
          await click.save();
          //@ts-ignore
          res.json(click.comments);
        })
    } catch(err) {
        console.error(err.message);
        res.sendStatus(500);
    }
})

clickRouter.route('/comment/:id/:comment_id')
//@ts-ignore
.delete(auth.required, async (req, res, next) => {
    try {
        //@ts-ignore
        const tuser = await Users.findById(req.payload.id)
        await clickPost.findById(req.params.id)
        //@ts-ignore
        .then(async (click) => {
        //@ts-ignore
        const comment = click?.comments.find(
            //@ts-ignore
            (comment) => comment.id === req.params.comment_id
        );
        // Make sure comment exists
        if (!comment) {
            return res.sendStatus(404);
        }
        //@ts-ignore
        if (comment.user.toString() !== req.payload.id) {
            return res.sendStatus(401);
        }
        //@ts-ignore
        click.comments = click.comments.filter(
            //@ts-ignore
            ({ id }) => id !== req.params.comment_id
        );
        //@ts-ignore
        await click.save();
        //@ts-ignore
        return res.json({msg:"comment deleted"});
        })
    } catch(err) {
        console.error(err.message);
        res.sendStatus(500);
    }
})

module.exports = clickRouter;