const express = require("express");
const { asyncHandler } = require("./utils");
const db = require("../db/models");
const router = express.Router();

// should route to genres to display "all movies"
router.get("/", asyncHandler(async (req, res) => {
  res.render("listGenres");
}));

router.get("/:id(\\d+)", asyncHandler(async (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = await db.Movie.findByPk(movieId);
  const ratingDecimal = (movie.popularity / 1000).toFixed(2);
  const reviews = await db.Review.findAll({
    where: { movieId: movieId }
  }).then(res => {
    return res.map(row => {
      return row.dataValues
    })
  })
  res.render("movies", { movieObj: movie, ratingDecimal, reviews });
}));


module.exports = router;
