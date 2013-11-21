/**
 * New node file
 */
exports.new = function(req, res, next) {
  res.render('session/new', {
    title: 'Login'
  });
};