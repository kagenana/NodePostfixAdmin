/**
 * New node file
 */
var models = require('../../models');
var User = models.UserModel;

exports.new = function(req, res, next) {
  res.render('sessions/new', {
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
      req.flash('error', 'ログイン情報が誤っています。');
      return res.redirect('/sessions/new');
    }
    console.log(result);
    req.session.username = result.username;
    req.flash('info', 'ログインしました。');
    return res.redirect('/menu');
  });
};

exports.delete = function(req, res) {
  req.flash('info', 'ログアウトしました。');
  req.session.destroy();
  return res.redirect('/sessions/new');
};