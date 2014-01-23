/**
 * New node file
 */
var models = require('../../models');
var User = models.UserModel;

var libs = require('../../libs');

exports.new = function(req, res, next) {
  res.render('sessions/new', {
  });
};

exports.create = function(req, res, next){
  var condition = {
      username: req.param('username'),
      password: req.param('password')
  };
  var rememberme = req.param('rememberme');
  
  User.findOne(condition, function(err, result){
    if (err) {
      return next(err);
    }
    if (!result) {
      req.flash('error', 'ログイン情報が誤っています。');
      return res.redirect('/sessions/new');
    }
    console.log("sessions.rememberme: " + rememberme);
    req.session.rememberme = rememberme;
    if (rememberme) {
      var newtoken = {
          username: result.username,
          authcookie: result.authcookie
      };
      libs.setCookie(req, res, JSON.stringify(newtoken));
    }
    //console.log(result);
    req.session.username = result.username;
    req.flash('info', 'ログインしました。');
    return res.redirect('/menu');
  });
};

exports.delete = function(req, res) {
  req.flash('info', 'ログアウトしました。');
  res.clearCookie('authtoken', { path: '/' });
  req.session.username = null;
  return res.redirect('/sessions/new');
};