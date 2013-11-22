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
    title: 'Menu',
    menu: menu
  });
};