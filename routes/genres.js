const express = require('express');
const {asyncHandler} = require('./utils')
const db = require('../db/models');
const router = express.Router();
router.get('/', asyncHandler( async (req, res, next) => {
  const actionMovies = await db.Movie.findAll({ order: Sequelize.literal('rand()'), limit: 5,
  where: { genreId: 2} })

  const comedyMovies = await db.Movie.findAll({ order: Sequelize.literal('rand()'), limit: 5,
  where: { genreId: 5} })

  const crimeMovies = await db.Movie.findAll({ order: Sequelize.literal('rand()'), limit: 5,
  where: { genreId: 6} })

  const romanceMovies = await db.Movie.findAll({ order: Sequelize.literal('rand()'), limit: 5,
  where: { genreId: 15} })

  res.render("genres", {actionMovies, comedyMovies, crimeMovies, romanceMovies})  
}));

router.get('/:genre([A-Za-z]+)', (req, res) => {
  console.log(req.params, "<---- These are our params");
  res.render('listGenres');

});
module.exports = router;
