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
    console.log("rememberme: " + rememberme);
    if (rememberme == "true") {
      var newtoken = {
          username: result.username,
          authcookie: result.authcookie
      };
      libs.setCookie(res, JSON.stringify(newtoken));
    }
    //console.log(result);
    req.session.username = result.username;
    req.session.rememberme = rememberme;
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