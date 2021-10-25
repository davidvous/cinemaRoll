const express = require('express');
const { check, validationResult } = require('express-validator');

const db = require('../db/models');
const { loginUser, logoutUser } = require('../auth');
const { csurfProtection, asyncHandler } = require('./utils')


const router = express.Router();

//
//TODO: middleware to redirect users who are not logged in


// hide router from un-auth'ed users
const redirect = (req, res, next) => {
  if (!res.locals.authenticated) {
    return res.redirect('/users/login');
  } else {
    next()
    return
  }
}
router.use(redirect);


// render user's list page on initial load
router.get('/', asyncHandler(async (req, res) => {

  const { authenticated, user } = res.locals;
  const lists = await db.MovieList.findAll({
    where: { userId: user.id },
    include: [{ model: db.Movie }]
  })
  const movies = []
  lists.forEach(list => movies.push(...list.Movies));
  const message = movies.length ? "" : "No movies & no lists"
  res.render('mymovies', { movies, lists, message });
}));


// create new list for user
router.post('/', asyncHandler(async (req, res) => {
  const { authenticated, user } = res.locals;
  const { listName } = req.body
  console.log("creating list", listName);
  const list = await db.MovieList.create({
    name: listName,
    userId: user.id,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  res.json({ list })
}));


// delete watch list by watch list id
//
// deleting db.MovieList directly is giving me FK errors
// I can figure out why later
// for now, just pop the records off the join table,
// then off the main table
//
//
// Reminder: I think that's the issue they talked about
// if you reseed without dropping first, there is some internal sequelize
// metadata related to id tracking that doesn't get deleted.
router.delete('/', asyncHandler(async (req, res) => {
  const { listId } = req.body
  await db.ListToMoviesJoinTable.destroy({
    where: { movieListId: listId }
  });
  const isDeleted = await db.MovieList.destroy({
    where: { id: listId }
  });
  res.json({ isDeleted })
}));


// get watch list by id
router.get('/:listId', asyncHandler(async (req, res) => {
  const { authenticated, user } = res.locals;
  const movies = [];
  // this id = "all" thing is bad TODO
  if (req.params.listId === "all") {
    lists = await db.MovieList.findAll({
      where: { userId: user.id },
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
  res.json(movies);
}));


// delete movie from list
router.delete('/movie', asyncHandler(async (req, res) => {
  const { authenticated, user } = res.locals;
  const { movieId, listId } = req.body;
  let isDeleted = false;
  isDeleted = await db.ListToMoviesJoinTable.destroy({
    where: { movieListId: listId , movieId}
  });
  return res.json({ isDeleted });
}));


// add movie to list
router.post('/movie/add', asyncHandler(async (req, res) => {
  const { authenticated, user } = res.locals;
  const { movieListId, movieId } = req.body;

  // we need to ensure the user can't add the movie to more than one list at a time
  // this is not the intended functionality, just a fix for now,
  // for the front-end that doesn't support multipule lists

  // find all of user's movie lists (if we set up associations, we could do it via sequelize)
  // and purge the movie from all of them
  // this will ensure that the user can only add the movie to one list at a time
  // this is a backwards way of ensuring a use can only add a movie to one list at a time
  const lists = await db.MovieList.findAll({
    where: { userId: user.id },
    include: [{ model: db.Movie }]
  })
  lists.forEach(list => {
    list.Movies.forEach(async movie => {
      if (movie.id == movieId) {
        // how do i do this in bulk?
        await db.ListToMoviesJoinTable.destroy({
          where: {movieListId: list.id, movieId: movie.id}
        });
      };
    });
  });

  // now push the movie into the list, if the movie list id was provided
  // it won't be provided if "---none---" was selected in dropdown
  if (movieListId) {
    const newRecord = await db.ListToMoviesJoinTable.create({
      movieListId,
      movieId,
    });
  }

  return res.json({ isSuccess: true });
}));

module.exports = router;
