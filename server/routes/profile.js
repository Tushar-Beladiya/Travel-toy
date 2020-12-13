const router = require('express').Router();
const isAuth = require('../middlewares/isAuth');
const imageUpload = require('../middlewares/imageUpload');

const {
  getProfile,
  updateProfile,
  updateProfilePicture,
  updateBackgroundPicture
} = require('../controllers/profileController');

// @TODO protect routes 

router.get("/:id", isAuth, getProfile);

router.put("/", isAuth, updateProfile);

router.put("/profile-picture", isAuth, imageUpload.single('file'), updateProfilePicture);

router.put("/background-picture", isAuth, imageUpload.single('file'), updateBackgroundPicture);


module.exports = router;