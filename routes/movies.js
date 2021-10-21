const express = require("express");
const { asyncHandler, csurfProtection } = require("./utils");
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


router.get('/:id(\\d+)/reviews/', asyncHandler( async (req, res) => {
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


const {popularity, dateReleased, title, summary, poster_path, Reviews} = allReviewsForMovie



res.render("reviewsForMovieWithId", {popularity, dateReleased, title, summary, poster_path, Reviews} )
console.log(req.session, "<------");


}));

router.post('/:id(\\d+)/reviews/', csurfProtection, asyncHandler( async (req, res) => {
  //Add a new review for a given movie
  if (!req.session.auth) {
    res.redirect("http://localhost:8080/users/login/");
    
  }
  const movieId = req.params.id
  console.log(req.session.auth, "<------");
  const userId = req.session.auth.userId
  const movie = await db.Movie.findByPk(movieId);
  const {
    title,
    reviewText,
  } = req.body 

  const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await Review.create({title, reviewText, movieId, userId})
      res.redirect(`/${movieId}/reviews`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('addMovieReview', {
        title: `Add review for ${movie.title}`,
        park,
        attraction,
        errors,
        csrfToken: req.csrfToken(),
      });
    }

}));


router.get('/:id(\\d+)/reviews/new/', csurfProtection, asyncHandler( async (req, res) => {
  //Get the form to add a review that will be associated w/ a movie
  const movieId = req.params.id;
  res.render("addMovieReview", {csrfToken: req.csrfToken(), movieId})

}));


router.get('/:id(\\d+)/reviews/:reviewId(\\d+)/edit',csurfProtection, asyncHandler( async (req, res) => {
    const movieId = req.params.id;
    const reviewId = req.params.reviewId

    const review = await db.Review.findByPk(req.params.reviewId)
    const userIdOfMovieReviewer = review.userId

    if (req.session.auth && userIdOfMovieReviewer == req.session.auth.userId) {
      let reviewToEdit = await db.Review.findByPk(userIdOfMovieReviewer);
      reviewToEdit=reviewToEdit.dataValues
      console.log(reviewToEdit)
      res.render("reviewEditForm", {csrfToken: req.csrfToken(), reviewToEdit, movieId, reviewId});
      
      
    }else{
      res.redirect("http://localhost:8080/users/login")       
    
    }
  //Get the form to edit a specific movie review


}));

router.put('/:id(\\d+)/reviews/:reviewId(\\d+)/edit', csurfProtection, asyncHandler( async (req, res) => {
  //Edit a specific movie review
  

}));



router.post('/:id(\\d+)/reviews/:reviewId(\\d+)/delete',  asyncHandler(async (req, res) => {
    const review = await db.Review.findByPk(req.params.reviewId)
    const userIdOfMovieReviewer = review.userId
    if (userIdOfMovieReviewer == req.session.auth.userId) {
      const deletedReview = await db.Review.findByPk(userIdOfMovieReviewer);
      await deletedReview.destroy();
      res.redirect(`movies/:id(\\d+)/reviews/`);
      
    }else{
       res.redirect('/users/login');

    }


    
  }));




module.exports = router;
