/**
 * New node file
 */
var models = require('../models');
var User = models.UserModel;
var usernum = 0;
//var expire = false;

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
    console.log("Sessionがありました");
    //req.session.cookie.maxAge = new Date(Date.now() + 1000 * 60 * 15 );
    //return next();
  }
  else {
    console.log("Sessionがありません");
    //return res.redirect('/sessions/new');
  }

  //no cookie or session
  if(!req.cookies.authtoken){
    if (req.session.username){
      req.flash('info', 'タイムアウトしました。再ログインしてください。');
      req.session.username = null;
    };
    console.log("Cookieがありません");
    return res.redirect('/sessions/new');
  }
  console.log("Cookieがありました");
  
  //cookie
  var token = JSON.parse(req.cookies.authtoken);
  var condition = {
      username: token.username,
      authcookie: token.authcookie
  }
  
  //authentication
  User.findOne(condition, function(err, result){
    console.log("authentication: " + result);
    if (err) {
      return next(err);
    }
    
    //authentication failed
    if (!result) {
      //req.flash('info', 'タイムアウトしました。再ログインしてください。');
      console.log("有効なCookieがありませんでした");
      return next();//res.redirect('/sessions/new');
    }
    
    //authcookie update
    var update = { authcookie: models.getAuthCookie() };
    User.update(condition, update, function (err, numAffected) {
      if (err) {
        return next(err);
      }
      req.session.username = result.username;
      var newtoken = {
          username: result.username,
          authcookie: update.authcookie
      };
      setCookie(req, res, JSON.stringify(newtoken));
      console.log("Cookieを更新しました");
      next();
    });
  });
};

var setCookie = exports.setCookie = function(req, res, val) {
  var expire = Date.now() + 1000 * 60 * 1;//60;
  if (req.session.rememberme == "true") {
    console.log("setCookie: expire 1day");
    expire = Date.now() + 1000 * 60 * 5;//60 * 24;
  };
 
  res.cookie('authtoken', val, {
    path: '/',
    expires: new Date(expire)
  });
};
