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
    await writePost.findById(req.params.id)
    //@ts-ignore
    .then(async (write) => {
        //@ts-ignore
        if(write.user == tuser.id) {
            await writePost.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify:false})
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

writeRouter.route('/like/:id')
//@ts-ignore
.put(auth.required, async (req, res, next) => {
    try {
        //@ts-ignore
        const tuser = await Users.findById(req.payload.id)
        await writePost.findById(req.params.id)
        //@ts-ignore
        .then(async (write) => {
            //@ts-ignore
            if (write.likes.filter((like) => like.user.toString() === req.payload.id).length > 0) {
                return res.status(400).json({ msg: "Post already liked" });
            }
            else {
                //@ts-ignore
                write.likes.unshift({ user: req.payload.id });
                await write?.save()
                res.json({msg: "post liked"})
            }
        })
    } catch(err) {
        console.error(err.message);
        res.sendStatus(500);
    } 
})

writeRouter.route('/unlike/:id')
//@ts-ignore
.put(auth.required, async (req, res, next) => {
    try {
        //@ts-ignore
        const tuser = await Users.findById(req.payload.id)
        await writePost.findById(req.params.id)
        //@ts-ignore
        .then(async (write) => {
            //@ts-ignore
            if (write.likes.filter((like) => like.user.toString() === req.payload.id).length === 0) {
                return res.status(400).json({ msg: "Post has not yet been liked" });
            }
            else{
              //Get remove index
              //@ts-ignore
              const removeIndex = write.likes
                //@ts-ignore
                .map((like) => like.user.toString())
                //@ts-ignore
                .indexOf(req.payload.id);

              //@ts-ignore
              write?.likes.splice(removeIndex, 1);
              await write?.save();
              res.json({msg: "post unliked"})
            }
        })
    } catch(err) {
        console.error(err.message);
        res.sendStatus(500);
    } 
})

writeRouter.route('/comment/:id')
//@ts-ignore
.post(auth.required, async (req, res, next) => {
    try {
        //@ts-ignore
        const tuser = await Users.findById(req.payload.id)
        await writePost.findById(req.params.id)
        //@ts-ignore
        .then(async (write) => {
        const newComment = {
            time: Date.now(),
            text: req.body.text,
            //@ts-ignore
            name: tuser?.username,
            //@ts-ignore
            user: req.payload.id,
          };
          //@ts-ignore
          write?.comments.unshift(newComment);
          //@ts-ignore
          await write.save();
          //@ts-ignore
          res.json(write.comments);
        })
    } catch(err) {
        console.error(err.message);
        res.sendStatus(500);
    }
})

writeRouter.route('/comment/:id/:comment_id')
//@ts-ignore
.delete(auth.required, async (req, res, next) => {
    try {
        //@ts-ignore
        const tuser = await Users.findById(req.payload.id)
        await writePost.findById(req.params.id)
        //@ts-ignore
        .then(async (write) => {
        //@ts-ignore
        const comment = write?.comments.find(
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
        write.comments = write.comments.filter(
            //@ts-ignore
            ({ id }) => id !== req.params.comment_id
        );
        //@ts-ignore
        await write.save();
        //@ts-ignore
        return res.json({msg:"comment deleted"});
        })
    } catch(err) {
        console.error(err.message);
        res.sendStatus(500);
    }
})

module.exports = writeRouter;