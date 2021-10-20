const express = require("express");
const { asyncHandler } = require("./utils");
const db = require("../db/models");
const router = express.Router();

const movieObj = {
  genre_ids: [2,3,7],
  overview: "Luca and his best friends",
  poster_path: "https://hs.sbcounty.gov/cn/Photo%20Gallery/_w/Sample%20Picture%20-%20Koala_jpg.jpg",
  release_date: "2021-07-08",
  title: "Space Jam",
  id: 38,
}

router.get("/", function (req, res, next) {
  res.render('movies', { movieObj: movieObj } )
});

module.exports = router;
