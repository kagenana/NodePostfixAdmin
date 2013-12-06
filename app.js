
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , models = require('./models')
  , lib = require('./libs')
  , http = require('http')
  , path = require('path');

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
app.use(express.cookieParser('SecretKeyPhrase'))
app.use(express.session());
app.configure(function(req, res){
  //Static View Helper
  app.locals({
    title: 'Node Postfix Admin',
    version: '0.00 alpha'
  });

  //Dynamic View Helper
  app.use(function(req, res, next) {
    app.locals.login_status = lib.login_status(req, res);
    console.log(app.locals.login_status);
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
app.get('/menu/:id?', routes.menu.page);
app.get('/menu', routes.menu.index);

//POST /users
app.post('/users', routes.users.create);

// GET /session
app.get('/sessions/new', routes.sessions.new);
app.get('/sessions/destroy', routes.sessions.delete);

// POST /session
app.post('/sessions', routes.sessions.create);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
