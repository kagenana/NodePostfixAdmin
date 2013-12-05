/**
 * New node file
 */

exports.dynamicHelpers = {
  login_status: function(req, res) {
    if (req.session.username) {
      return ''
        + 'p ' + req.session.username
        + 'a(href="/sessions/destroy") logout';
    }
    return 'a(href="/sessions/new") login';
  }
};
