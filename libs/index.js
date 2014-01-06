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

