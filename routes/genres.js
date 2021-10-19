const express = require('express');
const {asyncHandler} = require('./utils')
const db = require('../db/models');
const router = express.Router();
const genresArray1 = ['Horror', 'Romance', 'Comedy', 'Documentary', 'Drama']
const genresArray2 = ['Action', 'Mystery', 'Romance', 'Fantasy', 'Sports']
router.get('/', function(req, res, next) {
  res.render("genres", {genresArray1: genresArray1, genresArray2: genresArray2})
});
module.exports = router;
