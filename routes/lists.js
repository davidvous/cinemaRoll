const express = require('express');
const { check, validationResult } = require('express-validator');

const db = require('../db/models');
const { loginUser, logoutUser } = require('../auth');
const {csurfProtection, asyncHandler} = require('./utils')


const router = express.Router();


// brrrr, let's sketch out what i need to do
// GET  '/' - regular HTML request / response that loads all movies in user's list on page
// POST '/:listName' - creates a new list for the session user with the provided list name
// -----
// GET  '/:listName' - ..... DO NOT NEED THIS ONE, we dump all lists when we do 'GET'
//

router.get('/', asyncHandler(async (req, res) => {

  const { authenticated, user } = res.locals;
  if (!authenticated || !user) {
    //return res.redirect('/users/login');
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



// To make requests from the browser, do
// let response = await fetch('/lists', { method: "POST" }
// let res = await fetch('/lists', {
//   method: "POST",
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({"xyz": "hello"})
// });
// let content  = await response.json()
//
//
// get user ids from res.locals.user
// req.session.auth = { userId: user.id }

// creates list of movies for user
router.post('/', asyncHandler(async (req, res) => {
  const { authenticated, user } = res.locals;
  // need user auth check
  const { listName } = req.body
  const list = await db.MovieList.create({
    name: listName,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  res.json({list})
}));


router.delete('/', asyncHandler(async (req, res) => {
  const { authenticated, user } = res.locals;
  // need user auth check
  const { listId } = req.body
  const isDeleted = await db.MovieList.destroy({
    where: { id: listId }
  });
  res.json({isDeleted})
}));


router.get('/:listId', asyncHandler(async (req, res) => {
  console.log(req.params);
  const list = await db.MovieList.findOne({
    where: { id: req.params.listId },
    include: [{ model: db.Movie }]
  });
  console.log("list ret", list);
  if (!list || !list.dataValues.Movies.length)
    res.json({"message": "List doesn't have any movies in it."});
  else res.json(list.dataValues);
}));


router.patch('/:listId/add/:movieId', asyncHandler(async (req, res) => {

}));


module.exports = router;
