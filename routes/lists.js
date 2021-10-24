const express = require('express');
const { check, validationResult } = require('express-validator');

const db = require('../db/models');
const { loginUser, logoutUser } = require('../auth');
const {csurfProtection, asyncHandler} = require('./utils')


const router = express.Router();

//
//TODO: middleware to redirect users who are not logged in


router.get('/', asyncHandler(async (req, res) => {

  const { authenticated, user } = res.locals;
  if (!authenticated || !user) {
    //return res.redirect('/users/login');
  }

  const lists = await db.MovieList.findAll({
    where: { userId: 1 },
    include: [{ model: db.Movie }]
  })
  const movies = []
  lists.forEach(list => movies.push(...list.Movies) );

  res.render('mymovies', { movies, lists});
}));


// creates list of movies for user
router.post('/', asyncHandler(async (req, res) => {
  const { authenticated, user } = res.locals;
  // need user auth check
  const { listName } = req.body
  console.log("creating list", listName);
  const list = await db.MovieList.create({
    name: listName,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  res.json({list})
}));


router.delete('/', asyncHandler(async (req, res) => {
  console.log("hey");
  const { authenticated, user } = res.locals;
  // need user auth check
  const { listId } = req.body
  console.log("backend", listId);
  // deleting db.MovieList directly is giving me FK errors
  // I can figure out the cascade later
  // for now, just pop the records off the join table,
  // then off the main table
  await db.ListToMoviesJoinTable.destroy({
    where: { movieListId: listId }
  });
  const isDeleted = await db.MovieList.destroy({
    where: { id: listId }
  });
  console.log("i got here.");
  console.log(isDeleted);
  res.json({isDeleted})
}));


router.get('/:listId', asyncHandler(async (req, res) => {

  const movies = [];
  // this is BAD!! pressed for time rn, sorry future me
  // this should go into GET lists/ with application-type/json if-else check
  // and then the front end "#list-all" will need its listeners / id adjusted
  if (req.params.listId === "all") {
    lists = await db.MovieList.findAll({
      where: { userId: 1 },
      include: [{ model: db.Movie }]
    });
    lists.forEach(list => movies.push(...list.Movies));
  } else {
    list = await db.MovieList.findOne({
      where: { id: req.params.listId },
      include: [{ model: db.Movie }]
    });
    movies.push(...list.Movies);
  }

  //if (!movies.length) res.json({"message": "List doesn't have any movies in it."});
  res.json(movies);
}));


router.patch('/:listId/add/:movieId', asyncHandler(async (req, res) => {

}));


module.exports = router;
