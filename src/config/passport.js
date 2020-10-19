const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const Users = mongoose.model('Users');
//@ts-ignore
passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]',
  //@ts-ignore
}, async (email, password, done) => {
  Users.findOne({ email })
    .then((user) => {
        //@ts-ignore
      if(!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }
      return done(null, user);
    }).catch(done);
}));