module.exports = (req, res, next) => {
  // console.log(req.isAuthenticated());
  if (!req.isAuthenticated()) {
    // console.log(req.session);
    const error = new Error('Not authenticated');
    error.statusCode = 403;
    return next(error);
  }
  next();
}