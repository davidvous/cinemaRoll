const express = require("express");
const { asyncHandler, csurfProtection } = require("./utils");
const { check, validationResult } = require('express-validator');
const db = require("../db/models");
const router = express.Router();
const createError = require('http-errors')


const movieValidators = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please title for your review.')
    .isLength({ max: 285 })
    .withMessage('Review title must not be more than 285 characters long'),
  check('reviewText')
    .isLength({min: 10})
    .withMessage('Review must be at least 10 characters long.'),
  check('rating')
    .isInt({min: 1, max: 5})
    .withMessage('Rating must be between 1 and 5 stars.'),
];



// should route to genres to display "all movies"
router.get("/", asyncHandler(async (req, res) => {
  res.render("listGenres");
}));


//DONE: GETS MOVIE BY ID
router.get("/:id(\\d+)", asyncHandler(async (req, res, next) => {
  const movieId = parseInt(req.params.id);
  const movie = await db.Movie.findByPk(movieId);
  if (!movie) {
    next(createError(404))
  }
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


// DONE: GETS ALL REVIEWS ASSOCIATED W/MOVIE
router.get('/:id(\\d+)/reviews/', asyncHandler( async (req, res, next) => {
  //Get all reviews associated w/ a movie
  let allReviewsForMovie = await db.Movie.findAll({include: ['Reviews'],
  where:{
    "id" : req.params.id
  }
  
}).then(res => {
    return res.map(row => {
      return row.dataValues
    })
  })
allReviewsForMovie=allReviewsForMovie[0]

if (!allReviewsForMovie) {
    next(createError(404))
  }
const {popularity, dateReleased, title, summary, poster_path, Reviews} = allReviewsForMovie


res.render("reviewsForMovieWithId", {popularity, dateReleased, title, summary, poster_path, Reviews} )


}));


//THE POST ROUTE ISNT WORKING? I GET A VALIDATION ERROR. I'M NOT SURE WHY 
router.post('/:id(\\d+)/reviews/', csurfProtection, movieValidators, asyncHandler( async (req, res) => {
  //Add a new review for a given movie
  if (!req.session.auth) {
    res.redirect("http://localhost:8080/users/login/");
    
  }
  const movieId = Number(req.params.id)
  console.log(req.session.auth, "<------");
  const userId = Number(req.session.auth.userId)
  //const movie = await db.Movie.findByPk(movieId);
  //
  const {
    title,
    reviewText,
    rating
  } = req.body 

  const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      console.log(title, reviewText, movieId, userId)
      await db.Review.create({title, reviewText, movieId, userId})
    
      res.redirect(`http://localhost:8080/movies/${movieId}/reviews` );
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      console.error(errors)
      res.render('addMovieReview', {
        movieId,
        title,
        reviewText,
        errors,
        rating,
        csrfToken: req.csrfToken(),
      });
    }

}));

//DONE: Gets form for new movie
router.get('/:id(\\d+)/reviews/new/', csurfProtection, asyncHandler( async (req, res) => {
  //Get the form to add a review that will be associated w/ a movie
  const movieId = req.params.id;
  if (!req.session.auth) {
    res.redirect(`http://localhost:8080/users/login/`)
  }
  res.render("addMovieReview", {csrfToken: req.csrfToken(), movieId})

}));



//WORKS, BUT NOT DONE: RENDERS PAGE W/ BUTTON TO DELETE ROUTE. DELETE WORKS. NEED TO ADD EDIT FORM TO TEST PUT/PATCH OF REVIEWS
router.get('/:id(\\d+)/reviews/:reviewId(\\d+)/edit',csurfProtection, asyncHandler( async (req, res, next) => {
    const movieId = req.params.id;
    const reviewId = req.params.reviewId
    //console.log(req.params)
    //console.log(reviewId)
    

    const review = await db.Review.findByPk(reviewId)
    if (!review) {
    next(createError(404))
  }
  
    const userIdOfMovieReviewer = review.userId
    //http://localhost:8080/movies/3/reviews/2/edit
    //userIdOfMovieReviewer
    //ComeBack Add stuff to get users old review. Prepopulate fields


    if (req.session.auth && userIdOfMovieReviewer == req.session.auth.userId) {
      let reviewToEdit = await db.Review.findByPk(req.params.reviewId);
    
      reviewToEdit=reviewToEdit.dataValues
      
      res.render("reviewEditForm", {csrfToken: req.csrfToken(), reviewToEdit, movieId, reviewId});
      
      
    }else{
      res.redirect("http://localhost:8080/users/login")       
    
    }


}));

//NEED TO DETERMINE CAUSE OF SEQUELIZE VALIDATION ERROR
router.put('/:id(\\d+)/reviews/:reviewId(\\d+)/edit', csurfProtection, movieValidators, asyncHandler( async (req, res) => {
  //Edit a specific movie review

  const review = await db.Review.findByPk(req.params.reviewId)
    if (!review) {
    next(createError(404))
  }
    const userIdOfMovieReviewer = review.userId
    if (userIdOfMovieReviewer == req.session.auth.userId) {
      //const deletedReview = await db.Review.findByPk(req.params.);
      // await deletedReview.destroy();
      await review.update();
      console.log("destroyed")

      res.redirect(`http://localhost:8080/movies/${movieId}/reviews/`);
      
    }else{
       res.redirect('http://localhost:8080/users/login');

    }


  
  

}));


//DONE: ROUTE DELETES REVIEW
router.post('/:id(\\d+)/reviews/:reviewId(\\d+)/delete',  asyncHandler(async (req, res, next) => {
    const movieId = req.params.id
    console.log("req.params.userId", req.params.userId)
    const review = await db.Review.findByPk(req.params.reviewId)
    if (!review) {
    next(createError(404))
  }
    const userIdOfMovieReviewer = review.userId
    if (userIdOfMovieReviewer == req.session.auth.userId) {
      //const deletedReview = await db.Review.findByPk(req.params.);
      // await deletedReview.destroy();
      await review.destroy();
      console.log("destroyed")

      res.redirect(`http://localhost:8080/movies/${movieId}/reviews/`);
      
    }else{
       res.redirect('http://localhost:8080/users/login');

    }


    
  }));




module.exports = router;
