const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    genres: [
      ['genre1', 'genre2', 'genre3', 'genre4', 'genre5'],
      ['genre1', 'genre2', 'genre3', 'genre4', 'genre5'],
      ['genre1', 'genre2', 'genre3', 'genre4', 'genre5'],
      ['genre1', 'genre2', 'genre3']
    ]
  });
});

module.exports = router;
