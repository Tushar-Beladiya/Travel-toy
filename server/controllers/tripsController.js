const {
  getTrip,
  getTrips,
  createTrip,
  updateTrip,
  deleteTrip
} = require('../db/trips');

exports.getTrip = async (req, res, next) => {

  try {
    const id = req.params.id;

    const data = await getTrip(id, req.session.passport.user.id);
    console.log(data);

    res.json({
      'message': 'success',
      data: data
    });

  } catch (err) {
    return next(err);
  }
}

exports.getTrips = async (req, res, next) => {

  try {
    const userId = req.session.passport.user.id;
    console.log('userId', userId);

    const data = await getTrips(userId);
    console.log(data);

    res.json({
      'message': 'success',
      data: data
    });

  } catch (err) {
    return next(err);
  }
}

exports.addTrip = async (req, res, next) => {

  try {
    const {
      location,
      dateStart,
      dateEnd,
    } = req.body;

    let picture;
    if (req.file) {
      picture = req.file.location;
    }

    console.log(req.file);

    const response = await createTrip({
      location,
      dateStart,
      dateEnd,
      picture
    }, req.session.passport.user.id);

    if (!response) {
      const error = new Error('Unable to create new trip.');
      error.statusCode = 422;
      throw error;
    }
    console.log(response);

    res.json({
      'message': 'success',
      data: response
    });

  } catch (err) {
    return next(err);
  }
}

exports.updateTrip = async (req, res, next) => {

  try {
    const {
      tripId,
      location,
      dateStart,
      dateEnd,
    } = req.body;

    console.log(req.body)

    let picture;
    if (req.file) {
      picture = req.file.location;
    }

    console.log(req.file);

    const response = await updateTrip({
      tripId,
      location,
      dateStart,
      dateEnd,
      picture
    }, req.session.passport.user.id);

    if (!response) {
      const error = new Error('Unable to update trip.');
      error.statusCode = 422;
      throw error;
    }

    return res.json({
      'message': 'success',
      data: response
    });

  } catch (err) {
    return next(err);
  }
};

exports.deleteTrip = async (req, res, next) => {
  try {

    const tripId = req.params.id;
    console.log('tripId', tripId);

    const response = await deleteTrip(tripId, req.session.passport.user.id);


    if (!response) {
      const error = new Error('Unable to delete trip.');
      error.statusCode = 422;
      throw error;
    }

    return res.json({
      'message': 'success',
      data: response
    });

  } catch (err) {
    return next(err);
  }
};