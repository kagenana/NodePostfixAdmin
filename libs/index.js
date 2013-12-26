/**
 * New node file
 */
var models = require('../models');
var User = models.UserModel;

exports.login_status = function(req, res) {
  if (req.session.username) {
    return true;
  }
  else {
    return false;
  };
};

exports.user_exist = function(req, res) {
  var count = user_count();
  console.log(count)
  if (count > 0) {
    return true;
  }
  else {
    return false;
  }
};

function user_count(count) {
  User.count({}, function(err, count) {
    if (err) {
      console.log(err);
    };
  });
};
