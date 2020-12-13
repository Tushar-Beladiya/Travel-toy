const router = require('express').Router();
const isAuth = require('../middlewares/isAuth');

const {
  session,
  register,
  login,
  logout
} = require('../controllers/authController');

router.get("/session", isAuth, session);

//REGISTER
router.post("/register", register);

//LOGIN
router.post("/login", login);

// LOGOUT
router.post("/logout", logout);

module.exports = router;