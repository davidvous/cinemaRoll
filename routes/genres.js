const express = require('express');
const {asyncHandler} = require('./utils')
const db = require('../db/models');
//console.log(db)
const router = express.Router();
router.get('/', asyncHandler( async (req, res, next) => {
  const actionMovies = await db.Movie.findAll({ order: [db.Sequelize.fn('RANDOM')], limit: 5,
include: ['Genres']})

  // const comedyMovies = await db.Movie.findAll({ order: Sequelize.literal('rand()'), limit: 5,
  // where: { genreId: 4} })

  // const crimeMovies = await db.Movie.findAll({ order: Sequelize.literal('rand()'), limit: 5,
  // where: { genreId: 5} })

  // const romanceMovies = await db.Movie.findAll({ order: Sequelize.literal('rand()'), limit: 5,
  // where: { genreId: 14} })

  //res.render("temp", {actionMovies, comedyMovies, crimeMovies, romanceMovies}) 
  console.log(actionMovies[0].title, actionMovies[0].Genres)
  //console.log(actionMovies.Genres)

  res.render("listGenres", {actionMovies})  
}));

router.get('/:genre([A-Za-z]+)', asyncHandler( async (req, res) => {
  console.log(req.params, "<---- These are our params");
  const reqGenre = req.params.genre
  let reqsGenreId = await db.Genre.findOne({
    where: {
      name: reqGenre
    }
  })
  

  console.log(reqsGenreId.id)
  reqsGenreId = reqsGenreId

const actionMovies = await db.genresToMovieJoinTable.findAll({ order: [db.Sequelize.fn('RANDOM')], limit: 5,
where:{
  genreId: reqsGenreId 
},
include: ['Movies'] })
console.log(actionMovies)
//   const moviesFromRequestedGenre = await db.Movies.findAll({ order: [db.Sequelize.fn('RANDOM')], limit: 5,
//   where:  {
//     Genres: {[sequelize.contains]:reqsGenreId}
//   },
// include: ['Genres']})
//   console.log(moviesFromRequestedGenre)
//   res.render('listGenres');
// const Genres

}));
module.exports = router;
