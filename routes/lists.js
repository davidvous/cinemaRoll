const express = require('express');
const { check, validationResult } = require('express-validator');

const db = require('../db/models');
const { loginUser, logoutUser } = require('../auth');
const {csurfProtection, asyncHandler} = require('./utils')


const router = express.Router();


router.get('/', asyncHandler(async (req, res) => {

  const { authenticated, user } = res.locals;
  if (!authenticated || !user) {
    return res.redirect('/users/login');
  }

  // the template expects top 10 movies
  const topMovies = await db.Movie.findAll({
      limit: 15,
      order: [["popularity", "DESC"]]
  }).map(m => m.dataValues);

  const test = await db.MovieList.findAll({
    where: { userId: 1 },
    include: [{ model: db.Movie }]
  }).map(m => m.dataValues);
  console.log(test);

  res.render('mymovies', {topMovies});

}));


module.exports = router;
