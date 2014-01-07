/**
 * New node file
 */
var models = require('../models');
var User = models.UserModel;
var usernum = 0;

exports.login_status = function(req, res) {
  if (req.session.username) {
    return true;
  }
  else {
    return false;
  };
};

exports.user_exist = function(req, res) {
  User.count({}, function(err, count) {
    if (err) {
      console.log(err);
      return 1;
    };
    usernum = count;
  });
  return usernum;
};

exports.loginRequired = function(req, res, next) {
  if (req.session.username) {
    return next();
  }
  res.redirect('/sessions/new');
};

var setCookie = exports.setCookie = function(res, val) {
  res.cookie('authtoken', val, {
    path: '/',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1)
  });
};
