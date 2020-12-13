const {
  getProfile,
  updateProfile
} = require('../db/profile');

exports.getProfile = async (req, res, next) => {

  try {
    const id = req.params.id;

    const data = await getProfile(id);
    console.log(data);

    res.json({
      'message': 'success',
      data: data
    });

  } catch (err) {
    return next(err);
  }
}

exports.updateProfile = async (req, res, next) => {

  try {
    const {
      id,
      firstName,
      lastName,
      homeCity,
      travelerType
    } = req.body;

    const response = await updateProfile({
      firstName,
      lastName,
      homeCity,
      travelerType
    }, id);

    if (!response) {
      const error = new Error('Unable to update profile.');
      error.statusCode = 422;
      throw error;
    }

    const data = await getProfile(id);
    console.log(data);

    return res.json({
      'message': 'success',
      data: data
    });
  } catch (err) {
    return next(err);
  }
}

exports.updateProfilePicture = async (req, res, next) => {
  const id = req.body.id;

  try {
    console.log(req.file);

    const response = await updateProfile({
      profilePicture: req.file.location
    }, id);
    if (!response) {
      throw new Error('Profile picture update failed.');
    }

    res.json({
      'message': 'success',
      data: req.file.location
    });

  } catch (err) {
    return next(err);
  }

}

exports.updateBackgroundPicture = async (req, res, next) => {
  const id = req.body.id;
  try {
    console.log(req.file);

    const response = await updateProfile({
      backgroundPicture: req.file.location
    }, id);
    if (!response) {
      throw new Error('Background picture update failed.');
    }
    res.json({
      'message': 'success',
      data: req.file.location
    });

  } catch (err) {
    return next(err);
  }

}