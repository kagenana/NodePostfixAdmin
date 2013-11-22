
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Node Postfix Admin' });
};
exports.menu = require('./menu');
exports.session = require('./session');
exports.users = require('./users');