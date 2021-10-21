const express = require('express');
const {asyncHandler} = require('./utils')
const db = require('../db/models');
const router = express.Router();

router.get('/', asyncHandler( async (req, res, next) => {
  const actionMovies = await db.Movie.findAll({ order: [db.Sequelize.fn('RANDOM')], limit: 5,
    include: ['Genres']});

  const genresList = await db.Genre.findAll();

  // const comedyMovies = await db.Movie.findAll({ order: Sequelize.literal('rand()'), limit: 5,
  // where: { genreId: 4} })

  // const crimeMovies = await db.Movie.findAll({ order: Sequelize.literal('rand()'), limit: 5,
  // where: { genreId: 5} })

  // const romanceMovies = await db.Movie.findAll({ order: Sequelize.literal('rand()'), limit: 5,
  // where: { genreId: 14} })

  //res.render("temp", {actionMovies, comedyMovies, crimeMovies, romanceMovies}) 

  console.log(genresList);
  res.render("listGenres", {movies: actionMovies, genresList});  
}));

router.get('/:genre([A-Za-z]+)', asyncHandler( async (req, res) => {

  const reqGenre = req.params.genre
  let reqsGenreId = await db.Genre.findOne({
    where: {
      name: reqGenre
    }
  })
  

  // console.log(reqsGenreId.id)
  reqsGenreId = reqsGenreId

  const movies = await db.Movie.findAll({ order: [db.Sequelize.fn('RANDOM')], limit: 4,
  include: ['Genres']})

// const actionMovies = await db.genresToMovieJoinTable.findAll({ order: [db.Sequelize.fn('RANDOM')], limit: 5,
// where:{
//   genreId: reqsGenreId 
// },
// include: ['Movies'] })
res.render('listGenres', {movies} );
//   const moviesFromRequestedGenre = await db.Movies.findAll({ order: [db.Sequelize.fn('RANDOM')], limit: 5,
//   where:  {
//     Genres: {[sequelize.contains]:reqsGenreId}
//   },
// include: ['Genres']})
//   console.log(moviesFromRequestedGenre)
// const Genres

}));
module.exports = router;
