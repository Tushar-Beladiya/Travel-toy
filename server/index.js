require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

//setup
app.use(express.json());
app.use(cors());

//session
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// password config
require('./config/passport');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'


// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   },
// });

// client.connect();

// const userData = {
//   firstname: 'test',
//   lastname: 'tester',
//   email: 'test@gmail.com',
//   password: 'testpass',
//   id: 12,
// }

// testMethod(client);
// getUser(client, 'jmsdevx@gmail.com');
// createUser(client, userData);
// deleteUser(client, userData.email);
// updateUser(client, userData, userData.id)

//************AUTH & USER CONTROLS************//

//GET SESSION
// app.get("/api/session", (req, res) => {
//   console.log(req.session);
//   if (req.session.user) {
//     res.status(200).send(req.session.user)
//   } else {
//     res.status(403).send('User is not logged in.')
//   }
// });

// //REGISTER
// app.post("/api/register", async (req, res) => {
//   await createUser(client, req.body, req, res);
//   await getUser(client, req.body.email, req, res);
// });

// //LOGIN
// app.post("/api/login", (req, res) => {
//   getLogin(client, req.body.email, req.body.password, req, res);
// });

app.use((req, res, next) => {
  let _end = res.end;

  res.end = function (chunk) {
    console.log(`Req: ${req.path} res: ${res.statusCode}`);
    _end.apply(res, arguments);
  };
  next();
});

const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');
const tripsRoute = require('./routes/trips');

app.use('/api/auth', authRoute);
app.use('/api/profile', profileRoute);
app.use('/api/trip', tripsRoute);

app.use((req, res, next) => {
  const error = new Error('route not found.');
  error.statusCode = 404;
  next(error);
});

// error handling
app.use((err, req, res, next) => {
  if (err) {
    console.log('Error catched...', err.statusCode);
    if (err.statusCode && err.statusCode !== 500) {
      console.log(err);
      return res.status(err.statusCode).json({
        message: err.message
      });
    } else {
      console.log(err);
      return res.status(500).json({
        message: "Something went wrong..."
      });
    }
  }
  next()
});

const port = 3001;

//server
app.listen(port, () => console.log(`Listening on ${port}`));