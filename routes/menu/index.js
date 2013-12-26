/**
 * New node file
 */
var menu = [
  {url: '/menu/1', name: 'Status'},
  {url: '/menu/2', name: 'Service'},
  {url: '/menu/3', name: 'Users'},
  {url: '/menu/4', name: 'Admin'},
  {url: '/menu/5', name: 'Log'}
];

exports.index = function(req, res) {
  res.render('menu/index', {
    menu: menu
  });
};

var dummy_posts = [{
  detail: 'dummy messages',
  username: 'example user',
  created_at: new Date()
}];

exports.page = function(req, res, next) {
  var id = req.param('id');
  if (!id) {
    return next();
  }
  res.render('menu/page', {
    title: menu[id - 1].name,
    id: id,
    posts: dummy_posts
  });
};