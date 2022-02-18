const express = require("express");
const { asyncHandler, csurfProtection, removeTimeFromDates, removeTimeFromLoggedInUserReview } = require("./utils");
const { check, validationResult } = require('express-validator');
const db = require("../db/models");
const router = express.Router();
const createError = require('http-errors')
const Op = require('sequelize')
router.use(csurfProtection)
const movieValidators = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please title for your review.')
    .isLength({ max: 285 })
    .withMessage('Review title must not be more than 285 characters long'),
  check('reviewText')
    .isLength({min: 10})
    .withMessage('Review must be at least 10 characters long.'),
  check('userRating')
    .isIn(["1","2","3","4", "5", 1, 2, 3, 4, 5])
    .withMessage('Rating must be between 1 and 5 stars.'),
];



// should re-direct to genres to display "all movies"
router.get("/", asyncHandler(async (req, res) => {
  res.redirect("/genres");
}));


//DONE: GETS MOVIE BY ID
router.get("/:id(\\d+)", asyncHandler(async (req, res, next) => {
  const movieId = parseInt(req.params.id);
  const movie = await db.Movie.findByPk(movieId);
  const genreId = await db.genresToMovieJoinTable.findOne({ where: { movieId: movieId}});
  let userStatus = 0;
  let hasCurrentReview ;
  let hasCurrentReviewId ;
  // will rewrite this to actually check but hardcoding for now

  if (!movie) {
    next(createError(404));
  }
  const ratingDecimal = (movie.popularity / 1000).toFixed(2);

  // Added finding users associated with each review for "By Jim Regan"
  let reviews = await db.Review.findAll({
    where: { movieId: movieId },
    include: { model: db.User },
  }).then((res) => {
    return res.map((row) => {
      return row.dataValues;
    });
  });
  reviews = removeTimeFromDates(reviews)

   if (req.session.auth) {

    // this line sets userStatus either to 0 or their userId. Pug will interpret false or render accordingly
    userStatus = req.session.auth.userId;
    // A USER IS LOGGED IN CHECK IF THEY HAVE A REVIEW

     hasCurrentReview = await db.User.findAll({
    include: { model: db.Review, where: { movieId: movieId, userId: userStatus } },
  });
  hasCurrentReview = hasCurrentReview[0] // Will evaluate to the users review if it exists. Else its a falsy value
  if (hasCurrentReview) {

    hasCurrentReviewId = hasCurrentReview.Reviews[0].id
  }
  }
   else{
    hasCurrentReview = false

  }






  /// Pulling "similar movies"
  const genreMovies = await db.Movie.findAll({
    order: [db.Sequelize.fn("RANDOM")],
    limit: 9,
    include: { model: db.Genre, where: { id: genreId.genreId } },
  });


  // ilya-start
  // get user's existing lists
  let movieLists = null;
  let inListIndex = 0;
  if (userStatus) {
    movieLists = await db.MovieList.findAll({
      where: { userId: res.locals.user.id },
      include: [{ model: db.Movie }]
    }) //req.session.auth.userId });
    // check if movie id appears in any of the lists
    movieLists.forEach((list, index) => {
      if (list.Movies.length) {
        list.Movies.forEach(movie => {
          if (movie.id == movieId) inListIndex = index + 1; // +1 is to account for --none--
        })
      }
    })
  }
  const csrfToken = req.csrfToken()
  if (hasCurrentReview.Reviews){
    hasCurrentReview.Reviews[0].dataValues.createdAt = removeTimeFromLoggedInUserReview(hasCurrentReview.Reviews[0].dataValues.createdAt)
  }



  res.render("movies", {
    movieObj: movie,
    ratingDecimal,
    reviews,
    userStatus,
    genreMovies,
    hasCurrentReview,
    movieLists,
    inListIndex,
    hasCurrentReviewId,
  csrfToken});
}));


// DONE: GETS ALL REVIEWS ASSOCIATED W/MOVIE
router.get('/:id(\\d+)/reviews/', asyncHandler( async (req, res, next) => {
  //Get all reviews associated w/ a movie
  const movieId = req.params.id

  let allReviewsForMovie = await db.Movie.findAll({include: ['Reviews'],
  where:{
    "id" : req.params.id
  }

}).then(res => {
    return res.map(row => {
      return row.dataValues
    })
  })

if (!allReviewsForMovie) {
    next(createError(404))
  }

const {popularity, dateReleased, title, summary, poster_path, Reviews} = allReviewsForMovie[0]

const csrfToken = req.csrfToken()
res.render("reviewsForMovieWithId", {popularity, dateReleased, title, summary, poster_path, Reviews, csrfToken} )



}));


//THE POST ROUTE ISNT WORKING? I GET A VALIDATION ERROR. I'M NOT SURE WHY
router.post('/:id(\\d+)/reviews/', csurfProtection, movieValidators, asyncHandler( async (req, res) => {

  //Add a new review for a given movie
  if (!req.session.auth) {
    //req.session.redirectTo =
    res.redirect("/users/login/");

  }
  const movieId = Number(req.params.id)

  const userId = req.session.auth.userId

  //const movie = await db.Movie.findByPk(movieId);
  //
  const {
    title,
    reviewText,
    userRating
  } = req.body

  const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {

    try {

      const newMovieId = parseInt(req.params.id, 10)
      const newUserRating = parseInt(userRating, 10)
      const newUserId = parseInt(userId, 10)
      await db.Review.create({title, reviewText, movieId:newMovieId, userId:newUserId, userRating: newUserRating})
       res.redirect(`/movies/${movieId}`);
      // you can now access the newly created user
} catch (err) {
      res.redirect(`/movies/${movieId}/` );

    }
      const errors = validatorErrors.array().map((error) => error.msg);
      console.error(errors)
      res.render('addMovieReview', {
        movieId,
        title,
        reviewText,
        errors,
        userRating,
        csrfToken: req.csrfToken(),
      });
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      console.error(errors)

      const movie = await db.Movie.findByPk(movieId)
      const genreId = await db.genresToMovieJoinTable.findOne({
    where: { movieId: movieId },
  });
      const genreMovies = await db.Movie.findAll({
    order: [db.Sequelize.fn("RANDOM")],
    limit: 9,
    include: { model: db.Genre, where: { id: genreId.genreId } },
  });
      const ratingDecimal = (movie.popularity / 1000).toFixed(2);
      res.render('addMovieReview', {
        movieId,
        title,
        reviewText,
        errors,
        userRating,
        movieObj:movie,
        ratingDecimal,
        genreMovies,
        csrfToken: req.csrfToken(),
      });
    }

}));

//DONE: Gets form for new movie review
router.get('/:id(\\d+)/reviews/new/', csurfProtection, asyncHandler( async (req, res) => {
  //Get the form to add a review that will be associated w/ a movie
  const movieId = req.params.id;
  const genreId = await db.genresToMovieJoinTable.findOne({
    where: { movieId: movieId },
  });

  /// Pulling "similar movies"
  const genreMovies = await db.Movie.findAll({
    order: [db.Sequelize.fn("RANDOM")],
    limit: 9,
    include: { model: db.Genre, where: { id: genreId.genreId } },
  });

  if (!req.session.auth) {

    res.redirect(`/users/login/`)

  }
  const movie = await db.Movie.findByPk(movieId);
  const ratingDecimal = (movie.popularity / 1000).toFixed(2);
  const reviews = await db.Review.findAll({
    where: { movieId: movieId },
    include: { model: db.User },
  }).then((res) => {
    return res.map((row) => {
      return row.dataValues;
    });
  });

  res.render("addMovieReview", {
    csrfToken: req.csrfToken(),
    movieId,
    movieObj: movie,
    ratingDecimal, genreMovies
  });
}));



//WORKS, BUT NOT DONE: RENDERS PAGE W/ BUTTON TO DELETE ROUTE. DELETE WORKS. NEED TO ADD EDIT FORM TO TEST PUT/PATCH OF REVIEWS
router.get('/:id(\\d+)/reviews/:reviewId(\\d+)/edit',csurfProtection, asyncHandler( async (req, res, next) => {

  //Get the form to add a review that will be associated w/ a movie
  const movieId = req.params.id;
  const genreId = await db.genresToMovieJoinTable.findOne({
    where: { movieId: movieId },
  });
  const reviewId = req.params.reviewId

  /// Pulling "similar movies"
  const genreMovies = await db.Movie.findAll({
    order: [db.Sequelize.fn("RANDOM")],
    limit: 9,
    include: { model: db.Genre, where: { id: genreId.genreId } },
  });



  if (!req.session.auth) {

    res.redirect(`/users/login/`)

  }
  const movie = await db.Movie.findByPk(movieId);
  const ratingDecimal = (movie.popularity / 1000).toFixed(2);
  //added finding users associated with each review for "By Jim Regan"
  const review = await db.Review.findByPk(reviewId)

  if (!review) {
    next(createError(404))
  }

  res.render("reviewEditForm", {
    csrfToken: req.csrfToken(),
    movieId,
    movieObj: movie,
    ratingDecimal, genreMovies,
    review
  });


}));

//NEED TO DETERMINE CAUSE OF SEQUELIZE VALIDATION ERROR
router.post('/:id(\\d+)/reviews/:reviewId(\\d+)/', csurfProtection, movieValidators, asyncHandler( async (req, res) => {
  //Edit a specific movie review


  const specificReview = await db.Review.findByPk(req.params.reviewId)
    if (!specificReview) {
    next(createError(404))
  }

    const userId = specificReview.userId
    const movieId = req.params.id
    if (userId == req.session.auth.userId) {
      const {
      userRating,
      title,
      reviewText,

    } = req.body;

    const review = {
      title,
      reviewText,
      movieId,
      userId,
      userRating
    };
      await specificReview.update(review);


      res.redirect(`/movies/${movieId}/`);

    }else{
       res.redirect('/users/login');

    }





}));


//DONE: ROUTE DELETES REVIEW
router.post('/:id(\\d+)/reviews/:reviewId(\\d+)/delete',  asyncHandler(async (req, res, next) => {
    const movieId = req.params.id
    const review = await db.Review.findByPk(req.params.reviewId)
    if (!review) {
    next(createError(404))
  }
    const userIdOfMovieReviewer = review.userId
    if (userIdOfMovieReviewer == req.session.auth.userId) {
      await review.destroy();

      res.redirect(`/movies/${movieId}/`);

    }else{
       res.redirect('/users/login');

    }



  }));




module.exports = router;
