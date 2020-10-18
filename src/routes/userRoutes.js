// const mongoose = require('mongoose');
const passport = require('passport');
const userRouter = require('express').Router();
const auth = require('../middlewares/auth');
const Users = require('../models/user')

//POST new user route (optional, everyone has access)
//@ts-ignore
userRouter.post('/', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new Users(user);
  //@ts-ignore
  finalUser.setPassword(user.password);

  return finalUser.save()
  //@ts-ignore
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

//POST login route (optional, everyone has access)
userRouter.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
   //@ts-ignore
  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }
    //@ts-ignore
    return status(400).info;
  })(req, res, next);
});

//GET current route (required, only authenticated users have access)
//@ts-ignore
userRouter.get('/current', auth.required, (req, res, next) => {
    //@ts-ignore
  const { payload: { id } } = req;

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }
      //@ts-ignore
      return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = userRouter;