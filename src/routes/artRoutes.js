import express from "express";
//@ts-ignore
const { check, validationResult } = require("express-validator");

const artPost = require("../models/artPost");
const artRouter = express.Router();
//@ts-ignore
var fs = require('fs'); 
//@ts-ignore
var path = require('path'); 
var multer = require('multer'); 

const auth = require('../middlewares/auth');
const Users = require('../models/user');

var storage = multer.diskStorage({ 
    //@ts-ignore
	destination: (req, file, cb) => { 
		cb(null, 'uploads')
    }, 
    //@ts-ignore
	filename: (req, file, cb) => { 
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) 
	} 
}); 
//@ts-ignore
var upload = multer({ storage: storage }); 

artRouter.route('/')
//@ts-ignore
.get(auth.required, async (req, res, next) => {
    try { 
    await artPost.find({})
    .then((arts) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(arts);
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
.post(auth.required, upload.single('img'), async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        console.log(req.body)
        const newPost = new artPost({
            //@ts-ignore
            user: req.payload.id,
            description: req.body.description,
            title: req.body.title,
            time: Date.now(),
            // img: { 
            //     data: fs.readFileSync(path.join('/uploads/' + req.body.img)), 
            //     contentType: 'image/png' || 'image/jpeg'
            // } 
        })

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
})

artRouter.route('/:id')
//@ts-ignore
.get(auth.required, async (req, res, next) => {
    try { 
    await artPost.findById(req.params.id)
    .then((art) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(art);
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
    await artPost.findById(req.params.id)
    .then(async (art) => {
        //@ts-ignore
        if(art.user == tuser.id){
            //@ts-ignore
            await art.remove();
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
    await artPost.findById(req.params.id)
    //@ts-ignore
    .then(async (art) => {
        //@ts-ignore
        if(art.user == tuser.id) {
            await artPost.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify:false})
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

artRouter.route('/like/:id')
//@ts-ignore
.put(auth.required, async (req, res, next) => {
    try {
        //@ts-ignore
        const tuser = await Users.findById(req.payload.id)
        await artPost.findById(req.params.id)
        //@ts-ignore
        .then(async (art) => {
            //@ts-ignore
            if (art.likes.filter((like) => like.user.toString() === req.payload.id).length > 0) {
                return res.status(400).json({ msg: "Post already liked" });
            }
            else {
                //@ts-ignore
                art.likes.unshift({ user: req.payload.id });
                await art?.save()
                res.json({msg: "post liked"})
            }
        })
    } catch(err) {
        console.error(err.message);
        res.sendStatus(500);
    } 
})

artRouter.route('/unlike/:id')
//@ts-ignore
.put(auth.required, async (req, res, next) => {
    try {
        //@ts-ignore
        const tuser = await Users.findById(req.payload.id)
        await artPost.findById(req.params.id)
        //@ts-ignore
        .then(async (art) => {
            //@ts-ignore
            if (art.likes.filter((like) => like.user.toString() === req.payload.id).length === 0) {
                return res.status(400).json({ msg: "Post has not yet been liked" });
            }
            else{
              //Get remove index
              //@ts-ignore
              const removeIndex = art.likes
                //@ts-ignore
                .map((like) => like.user.toString())
                //@ts-ignore
                .indexOf(req.payload.id);

              //@ts-ignore
              art?.likes.splice(removeIndex, 1);
              await art?.save();
              res.json({msg: "post unliked"})
            }
        })
    } catch(err) {
        console.error(err.message);
        res.sendStatus(500);
    } 
})

artRouter.route('/comment/:id')
//@ts-ignore
.post(auth.required, async (req, res, next) => {
    try {
        //@ts-ignore
        const tuser = await Users.findById(req.payload.id)
        await artPost.findById(req.params.id)
        //@ts-ignore
        .then(async (art) => {
        const newComment = {
            time: Date.now(),
            text: req.body.text,
            //@ts-ignore
            name: tuser?.username,
            //@ts-ignore
            user: req.payload.id,
          };
          //@ts-ignore
          art?.comments.unshift(newComment);
          //@ts-ignore
          await art.save();
          //@ts-ignore
          res.json(art.comments);
        })
    } catch(err) {
        console.error(err.message);
        res.sendStatus(500);
    }
})

artRouter.route('/comment/:id/:comment_id')
//@ts-ignore
.delete(auth.required, async (req, res, next) => {
    try {
        //@ts-ignore
        const tuser = await Users.findById(req.payload.id)
        await artPost.findById(req.params.id)
        //@ts-ignore
        .then(async (art) => {
        //@ts-ignore
        const comment = art?.comments.find(
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
        art.comments = art.comments.filter(
            //@ts-ignore
            ({ id }) => id !== req.params.comment_id
        );
        //@ts-ignore
        await art.save();
        //@ts-ignore
        return res.json({msg:"comment deleted"});
        })
    } catch(err) {
        console.error(err.message);
        res.sendStatus(500);
    }
})

module.exports = artRouter;