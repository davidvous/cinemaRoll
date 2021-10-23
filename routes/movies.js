const express = require("express");
const { asyncHandler, csurfProtection } = require("./utils");
const { check, validationResult } = require('express-validator');
const db = require("../db/models");
const router = express.Router();
const createError = require('http-errors')
const Op = require('sequelize')

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

  if (!movie) {
    next(createError(404));
  }
  const ratingDecimal = (movie.popularity / 1000).toFixed(2);

  // Added finding users associated with each review for "By Jim Regan"
  const reviews = await db.Review.findAll({
    where: { movieId: movieId },
    include: { model: db.User },
  }).then((res) => {
    return res.map((row) => {
      return row.dataValues;
    });
  });

  // Finding the user where the Review has a specific
  let userName = await db.User.findAll({
    include: { model: db.Review, where: { movieId: movieId } },
  });

  if (req.session.auth) {
    userStatus = req.session.auth.userId;
  }

  console.log(req.session.auth, "<------- AUTH STATUS")

  /// Pulling "similar movies"
  const genreMovies = await db.Movie.findAll({
    order: [db.Sequelize.fn("RANDOM")],
    limit: 9,
    include: { model: db.Genre, where: { id: genreId.genreId } },
  });

  res.render("movies", {
    movieObj: movie,
    ratingDecimal,
    reviews,
    userStatus,
    userName,
    genreMovies
  });
}));


// DONE: GETS ALL REVIEWS ASSOCIATED W/MOVIE
router.get('/:id(\\d+)/reviews/', asyncHandler( async (req, res, next) => {
  //Get all reviews associated w/ a movie
  const movieId = req.params.id
//   if (req.session.auth){
//     const usersId = req.session.auth.userId
//     console.log("HIIII")

//     console.log(usersId)
//     console.log("******************")

//   let reviewsFromUser = await db.Review.findAll({
//   where:{
//     "userId" : usersId
//   }
  
// }).then(res => {
//     return res.map(row => {
//       return row.dataValues
//     })
//   })
// console.log(reviewsFromUser)
// //reviewFromUser= reviewFromUser[0]
// const allOtherReviews = await db.Review.findAll({
//   // where:{
//   //   "movieId" : movieId,
//   //   "userId" : {[Op.not]: req.params.userId}
//   // }
  
// }).then(res => {
//     return res.map(row => {
//       return row.dataValues
//     })
//   })


//   console.log(reviewFromUser, "<----- Review from user")
//   console.log(allOtherReviews, "************ALL OTHER REVIEWS******")

// }
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


res.render("reviewsForMovieWithId", {popularity, dateReleased, title, summary, poster_path, Reviews} )
  


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
      //await db.Review.create({title, reviewText, movieId, userId, userRating})
      
      //const review = await db.Review.create({title, reviewText, movieId, userId, userRating})

    try {
      console.log("YOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
      const newMovieId = parseInt(req.params.id, 10)
      const newUserRating = parseInt(userRating, 10)
      const newUserId = parseInt(userId, 10)
      await db.Review.create({title, reviewText, movieId:newMovieId, userId:newUserId, userRating: newUserRating})
       res.redirect(`/movies/${movieId}`);
      // you can now access the newly created user
      //console.log('success', review.toJSON());
} catch (err) {
  // print the error details
    console.log('**********************')
    console.log(err)
    console.log('**********************')
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
  //added finding users associated with each review for "By Jim Regan"
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
    const movieId = req.params.id;
    const reviewId = req.params.reviewId


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
      res.redirect("/users/login")       
    
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
      await review.update();


      res.redirect(`/movies/${movieId}/reviews/`);
      
    }else{
       res.redirect('/users/login');

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
      res.redirect(`/movies/${movieId}/reviews/`);
      
    }else{
       res.redirect('/users/login');

    }


    
  }));




module.exports = router;
