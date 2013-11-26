/**
 * New node file
 */
var models = require('../../models');
var User = models.UserModel;

exports.create = function(req, res, next) {
  var username = req.param('username');
  var password = req.param('password');
  var password2 =req.param('password2');
  
  var user = new User({
    username: username
  });
  
  user.setPassword(password, password2);
  user.save(function(err, result){
    if (err) {
      if (err.code === 11000) {
        // Username is dupulicate
        return res.redirect('back');
      }
      if (err.name === 'ValidationError') {
        if (err.errors.password_mismatch) {
          // two passwords are mismatch
        } else {
          //other unknown error
        }
        return res.redirect('back');
      }
      return next(err);
    }
    console.log(result);
    res.redirect('/session/new');
  });
};