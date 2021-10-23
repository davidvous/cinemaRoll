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
  const listNames = [];
  lists.forEach(list => {
    movies.push(...list.Movies)
    listNames.push(list.name)
  });
  console.log(listNames);
  res.render('mymovies', { movies, lists});
}));


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
