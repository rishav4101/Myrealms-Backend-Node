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
.get(async (req, res, next) => {
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
.post(upload.single('img'), async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        console.log(req.body)
        const newPost = new artPost({
            user: req.body.user,
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
.get(async (req, res, next) => {
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
.delete(async (req, res, next) => {
    try {
    await artPost.findById(req.params.id)
    .then(async (art) => {
        //@ts-ignore
        await art.remove();
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
    await artPost.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify:false})
    //@ts-ignore
    .then(async (art) => {
        //@ts-ignore
        res.json({ msg: "Post Updated" });
    })
    } catch(err) {
        console.error(err.message);
        res.sendStatus(500);
    }
})

module.exports = artRouter;