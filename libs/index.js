/**
 * New node file
 */

exports.login_status = function(req, res) {
  console.log(req.session.username);
  if (req.session.username) {
    return true;
  }
  else {
    return false;
  };
};
