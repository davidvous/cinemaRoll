const express = require('express');

const db = require("../db/models");
const { asyncHandler } = require("./utils");

const router = express.Router();


/* GET home page. */
router.get('/', asyncHandler(async (req, res) => {
  // the template expects genres in sub-arrays of size 5
  const genres_ = await db.Genre.findAll().map(g => g.dataValues);
  const genres = [];
  while(genres_.length) genres.push(genres_.splice(0, 5));

  // the template expects top 10 movies
  const topMovies = await db.Movie.findAll({
    limit: 10,
    order: [["popularity", "DESC"]]
  }).map(m => m.dataValues);

  res.render('index', { genres, topMovies } );
}));

module.exports = router;
