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

module.exports = profileRouter;