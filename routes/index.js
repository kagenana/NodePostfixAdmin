
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Node Postfix Admin' });
};
exports.menu = require('./menu');
exports.sessions = require('./sessions');
exports.users = require('./users');