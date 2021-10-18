var express = require('express');
var router = express.Router();
const {csurfProtection, asyncHandler} = require('./utils')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/signup",csurfProtection, function(req, res, next) {
  const csrfToken = req.csrfToken()
  console.log(csrfToken, ">>>>>>>>>>>>");
  res.render('signup', {csrfToken});
})

module.exports = router;
