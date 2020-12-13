const passport = require('passport');
const bcrypt = require("bcryptjs");
const localStrategy = require('passport-local');
const {
  getUser,
  createUser
} = require('../db/user');

const {
  addProfile
} = require('../db/profile');

// local
passport.use('local', new localStrategy({
  usernameField: 'email'
}, async (email, password, done) => {

  try {
    console.log('local')
    const user = await getUser(email);
    console.log('user passport ', email, user);
    if (!user) {
      return done({
        "message": "User not found"
      }, false, )
    }
    console.log(password, user)
    const isAuth = bcrypt.compareSync(password, user.password);

    if (!isAuth) {
      return done(true, false, {
        "message": "Invalid password"
      })
    }
    delete user.password;
    return done(null, user);

  } catch (err) {
    console.log(err);
    done(err);
  }

}));

// sign-up
passport.use('sign-up', new localStrategy({
  usernameField: 'email',
  passReqToCallback: true
}, async (req, email, password, done) => {

  try {
    const existingUser = await getUser(email);
    console.log('existingUser');
    if (existingUser) {
      return done({
        "message": "User already exists"
      }, false)
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const res = await createUser({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: email,
      password: hashedPassword
    });

    console.log('res', res);

    const user = await getUser(email);
    delete user.password;

    const profileRes = await addProfile({
      homeCity: 'Madagascar',
      travelerType: 'Secret Traveler'
    }, user.id);

    console.log('profileRes', profileRes);

    return done(null, user);

  } catch (err) {
    console.log(err);
    return done({
      "message": "Server error"
    }, false)
  }
}));

passport.serializeUser((user, done) => {
  console.log('serializeUser...', user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log('deserializeUser...', user);

  done(null, user);
});


module.exports = passport;