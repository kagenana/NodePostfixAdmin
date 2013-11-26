
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
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  models.init('localhost', 'node_postfix_admin')
  app.use(express.errorHandler());
}

//Dynamic View Helper
//app.dynamicHelpers(lib.dynamicHelpers);

// GET /
app.get('/', routes.index);

// GET /menu
app.get('/menu/:id?', routes.menu.page)
app.get('/menu', routes.menu.index)

//POST /users
app.post('/users', routes.users.create);

// GET /session
app.get('/session/new', routes.session.new);
app.get('/session/destroy', routes.session.delete);

// POST /session
app.post('/session', routes.session.create);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
