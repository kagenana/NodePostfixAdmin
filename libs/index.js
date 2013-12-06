/**
 * New node file
 */

exports.login_status = function(req, res) {
  console.log(req.session.username);
  if (req.session.username) {
    return '' + req.session.username + ' '
      + '<a href="/sessions/destroy" class="ui-btn-right">logout</a>';
  }
  else {
    return '<a href="/sessions/new" class="ui-btn-right">login</a>';
  };
};
