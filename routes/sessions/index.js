/**
 * New node file
 */
var models = require('../../models');
var User = models.UserModel;

exports.new = function(req, res, next) {
  res.render('sessions/new', {
    title: 'Login'
  });
};

exports.create = function(req, res, next){
  var condition = {
      username: req.param('username'),
      password: req.param('password')
  };
  User.findOne(condition, function(err, result){
    if (err) {
      return next(err);
    }
    if (!result) {
      req.flash('error', 'ログイン情報が誤っています。')
      return res.redirect('/sessions/new');
    }
    console.log(result);
    req.session.username = result.username;
    res.redirect('/menu');
  });
};

exports.delete = function(req, res) {
  req.session.destroy();
  res.redirect('/sessions/new');
};