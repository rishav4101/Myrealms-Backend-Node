import express from "express";

//@ts-ignore
const { check, validationResult } = require("express-validator");
const profile = require("../models/profile");
const profileRouter = express.Router();

const auth = require('../middlewares/auth');
// const Users = require('../models/user');

profileRouter.route('/')
//@ts-ignore
.post(auth.required, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        // console.log(req);
        const newProfile = new profile({
            //@ts-ignore
            user: req.payload.id,
            fullname: req.body.fullname,
            bio: req.body.bio,
        })

        const profil = await newProfile.save();
        res.json(profil);

    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
})

profileRouter.route('/:id')
//@ts-ignore
.get(auth.required, async (req, res, next) => {
    try { 
    await profile.findById(req.params.id)
    .then((prof) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(prof);
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
.put(auth.required, async (req, res, next) => {
    try {
    //@ts-ignore
    const tuser = await Users.findById(req.payload.id)
    
    await profile.findById(req.params.id)
    //@ts-ignore
    .then(async (prof) => {
        //@ts-ignore
        if(prof.user == tuser.id) {
            await profile.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify:false})
            //@ts-ignore
            res.json({ msg: "Profile Updated" });
        }
        else {
            //@ts-ignore
            res.json({ msg: "You cannot update this profile" });
        }
    })
    } catch(err) {
        console.error(err.message);
        res.sendStatus(500);
    }
})

module.exports = profileRouter;