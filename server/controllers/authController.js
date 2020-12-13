const passport = require('passport')

exports.register = async (req, res, next) => {

  passport.authenticate('sign-up', (err, user, info) => {

    if (!err) {
      console.log('signup route: ', err);
      return req.logIn(user, (err) => {
        console.log(req.user, req.sessionID);

        if (err) {
          return next(err);
        }

        return res.json({
          "message": "User registered successfully...",
          data: req.user
        });
      });
    }

    return res.status(422).json({
      "message": err.message
    })

  })(req, res, next);
}

exports.login = async (req, res, next) => {

  console.log(req.body);

  passport.authenticate('local', (error, user, info) => {
    console.log('login route: ', error);

    if (!error) {
      console.log('login route: ', error);
      return req.logIn(user, (err) => {
        console.log(req.user, req.sessionID);

        if (err) {
          return next(err);
        }

        return res.json({
          'message': 'success',
          data: req.user
        });
      });
    }

    return res.status(404).json({
      message: 'user not found',
    });
  })(req, res, next);
}

exports.session = (req, res, next) => {
  console.log('session ', req.session);
  if (req.session.passport.user) {
    res.json({
      'message': 'success',
      data: req.session.passport.user
    });
  } else {
    res.status(403).send('User is not logged in.');
  }
}

exports.logout = (req, res, next) => {
  console.log(req.user);

  req.logOut();
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    console.log(req.user);
    res.send('User logged out successfully');
  });
}

// module.exports = {
//   register: async (req, res) => {
//     const {
//       email,
//       password
//     } = req.body;
//     const db = req.app.get("db");
//     const result = await db.get_user([email]);
//     const existingUser = result[0];
//     if (existingUser) {
//       return res.status(409).send("Username taken");
//     }
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(password, salt);
//     const registeredUser = await db.register_user([email, hash]);
//     const user = registeredUser[0];
//     req.session.user = {
//       email: user.email,
//       id: user.id
//     };
//     return res.status(201).send(req.session.user);
//   },

//   login: async (req, res) => {
//     const {
//       email,
//       password
//     } = req.body;
//     console.log('login');
//     const foundUser = await req.app.get("db").get_user([email]);
//     const user = foundUser[0];
//     if (!user) {
//       return res
//         .status(401)
//         .send(
//           "User not found. Please register as a new user before logging in."
//         );
//     }
//     const isAuthenticated = bcrypt.compareSync(password, user.hash);
//     if (!isAuthenticated) {
//       return res.status(403).send("Incorrect password");
//     }
//     req.session.user = {
//       id: user.id,
//       email: user.email
//     };
//     return res.send(req.session.user);
//   },
// };