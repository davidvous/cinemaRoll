const express = require('express');
const {asyncHandler} = require('./utils')
const db = require('../db/models');
//console.log(db)
const router = express.Router();
router.get('/', asyncHandler( async (req, res, next) => {
  const actionMovies = await db.Movie.findAll({ order: [db.Sequelize.fn('RANDOM')], limit: 5 })

  // const comedyMovies = await db.Movie.findAll({ order: Sequelize.literal('rand()'), limit: 5,
  // where: { genreId: 4} })

  // const crimeMovies = await db.Movie.findAll({ order: Sequelize.literal('rand()'), limit: 5,
  // where: { genreId: 5} })

  // const romanceMovies = await db.Movie.findAll({ order: Sequelize.literal('rand()'), limit: 5,
  // where: { genreId: 14} })

  //res.render("temp", {actionMovies, comedyMovies, crimeMovies, romanceMovies}) 
  console.log(actionMovies)
  res.render("temp", {actionMovies})  
}));

router.get('/:genre([A-Za-z]+)', (req, res) => {
  console.log(req.params, "<---- These are our params");
  res.render('listGenres');

});
module.exports = router;
