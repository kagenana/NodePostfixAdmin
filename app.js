
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , models = require('./models')
  , lib = require('./libs')
  , lang = require('./libs/lang_ja')
  , http = require('http')
  , path = require('path')
  , flash = require('connect-flash');

var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.locals.pretty = true;
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('SecretKeyPhrase'));
app.use(express.session({
  secret: 'examplesecretcode',
  cookie: {
    maxAge: false
  }
}));
app.use(flash());
app.use(function(req, res, next){
  //Static View Helper
  res.locals({
    flash: req.flash(),
    lang: lang
  });
  next();
});

app.configure(function(req, res){
  //Dynamic View Helper
  app.use(function(req, res, next) {
    app.locals.login_status = lib.login_status(req, res)
    app.locals.user_exist = lib.user_exist(req, res);
    next();
  });
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  models.init('localhost', 'node_postfix_admin')
  app.use(express.errorHandler());
}

// GET /
app.get('/', routes.index);

// GET /menu
app.get('/menu/:id?', lib.loginRequired, routes.menu.page);
app.get('/menu', lib.loginRequired, routes.menu.index);

//POST /users
app.post('/users', lib.loginRequired, routes.users.create);

// GET /session
app.get('/sessions/new', routes.sessions.new);
app.get('/sessions/destroy', routes.sessions.delete);

// POST /session
app.post('/sessions', routes.sessions.create);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
