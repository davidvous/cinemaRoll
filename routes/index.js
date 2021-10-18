var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("does session AUTH exist?", req.session.auth);
  console.log("is user authenticated? ", res.locals.authenticated);
  console.log("what is the user e-mail? ", res.locals.user);
  res.render('index', { title: 'a/A Express Skeleton Home' });
});

module.exports = router;
