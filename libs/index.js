/**
 * New node file
 */

exports.dynamicHelpers = {
    login_status: function(req, res) {
      if (req.session.username) {
        return ''
          + 'p ' + req.session.username
          + 'a(href="/session/destroy") logout';
      }
      return ''
        + 'a(href="/session/new") login';
    }
}