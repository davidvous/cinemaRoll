const express = require("express");
const { asyncHandler } = require("./utils");
const db = require("../db/models");
const router = express.Router();

const movieObj = {
  genre_ids: [2, 3, 7],
  overview:
    "Eget egestas purus viverra accumsan. Lorem ipsum dolor sit amet consectetur adipiscing elit. In massa tempor nec feugiat nisl pretium. Et leo duis ut diam quam nulla porttitor massa. Consectetur libero id faucibus nisl tincidunt eget nullam non. Arcu cursus euismod quis viverra nibh cras pulvinar. Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam. Arcu ac tortor dignissim convallis aenean et. Turpis egestas pretium aenean pharetra magna ac placerat vestibulum. Amet tellus cras adipiscing enim eu turpis egestas. Augue mauris augue neque gravida in fermentum et. Non diam phasellus vestibulum lorem sed risus ultricies tristique nulla. Vitae ultricies leo integer malesuada nunc. Vivamus at augue eget arcu. Turpis massa sed elementum tempus.",
  poster_path:
    "https://hs.sbcounty.gov/cn/Photo%20Gallery/_w/Sample%20Picture%20-%20Koala_jpg.jpg",
  release_date: "2021-07-08",
  title: "Space Jam",
  id: 38,
};

//reviews table will need reviewDate
const reviewObj = {
  title: "The movie was great.",
  reviewText:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  movieId: 38,
  userId: 1,
  reviewDate: "2021-10-20",
};

router.get("/", function (req, res, next) {
  res.render('movies', { movieObj, reviewObj } )
});

module.exports = router;
