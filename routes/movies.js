const express = require("express");
const { asyncHandler } = require("./utils");
const db = require("../db/models");
const router = express.Router();

//reviews table will need reviewDate
const reviewObj = {
  title: "The movie was great.",
  reviewText:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  movieId: 38,
  userId: 1,
  reviewDate: "2021-10-20",
};

// should route to genres to display "all movies"
router.get("/", asyncHandler(async (req, res) => {
  res.render("listGenres");
}));

router.get("/:id(\\d+)", asyncHandler(async (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = await db.Movie.findByPk(movieId);
  const ratingDecimal = (movie.popularity / 1000).toFixed(2);
  res.render("movies", { movieObj: movie, ratingDecimal, reviewObj });
}));


module.exports = router;
