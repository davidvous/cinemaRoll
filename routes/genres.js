const express = require('express');
const {asyncHandler, csurfProtection} = require('./utils')
const db = require('../db/models');
const router = express.Router();
router.get('/', csurfProtection, asyncHandler( async (req, res, next) => {
  const csrfToken = req.csrfToken()
  const allMovies = await db.Movie.findAll({
    order: [db.Sequelize.fn("RANDOM")],
    limit: 5,
  });
  const actMovies = await db.Movie.findAll({
    order: [db.Sequelize.fn("RANDOM")],
    limit: 5,
    include: { model: db.Genre, where: { id: 1 } },
  });
  const advMovies = await db.Movie.findAll({
    order: [db.Sequelize.fn("RANDOM")],
    limit: 5,
    include: { model: db.Genre, where: { id: 2 } },
  });
  const aniMovies = await db.Movie.findAll({
    order: [db.Sequelize.fn("RANDOM")],
    limit: 5,
    include: { model: db.Genre, where: { id: 3 } },
  });
  const comMovies = await db.Movie.findAll({
    order: [db.Sequelize.fn("RANDOM")],
    limit: 5,
    include: { model: db.Genre, where: { id: 4 } },
  });
  const criMovies = await db.Movie.findAll({
    order: [db.Sequelize.fn("RANDOM")],
    limit: 5,
    include: { model: db.Genre, where: { id: 5 } },
  });
  const docMovies = await db.Movie.findAll({
    order: [db.Sequelize.fn("RANDOM")],
    limit: 5,
    include: { model: db.Genre, where: { id: 6 } },
  });
  const draMovies = await db.Movie.findAll({
    order: [db.Sequelize.fn("RANDOM")],
    limit: 5,
    include: { model: db.Genre, where: { id: 7 } },
  });
  const famMovies = await db.Movie.findAll({
    order: [db.Sequelize.fn("RANDOM")],
    limit: 5,
    include: { model: db.Genre, where: { id: 8 } },
  });
  const fanMovies = await db.Movie.findAll({
    order: [db.Sequelize.fn("RANDOM")],
    limit: 5,
    include: { model: db.Genre, where: { id: 9 } },
  });
  const hisMovies = await db.Movie.findAll({
    order: [db.Sequelize.fn("RANDOM")],
    limit: 5,
    include: { model: db.Genre, where: { id: 10 } },
  });
  const horMovies = await db.Movie.findAll({
    order: [db.Sequelize.fn("RANDOM")],
    limit: 5,
    include: { model: db.Genre, where: { id: 11 } },
  });
  const musMovies = await db.Movie.findAll({
    order: [db.Sequelize.fn("RANDOM")],
    limit: 5,
    include: { model: db.Genre, where: { id: 12 } },
  });
  const mysMovies = await db.Movie.findAll({
    order: [db.Sequelize.fn("RANDOM")],
    limit: 5,
    include: { model: db.Genre, where: { id: 13 } },
  });
  const romMovies = await db.Movie.findAll({
    order: [db.Sequelize.fn("RANDOM")],
    limit: 5,
    include: { model: db.Genre, where: { id: 14 } },
  });
  const sciMovies = await db.Movie.findAll({
    order: [db.Sequelize.fn("RANDOM")],
    limit: 5,
    include: { model: db.Genre, where: { id: 15 } },
  });
  const tvMovies = await db.Movie.findAll({
    order: [db.Sequelize.fn("RANDOM")],
    limit: 5,
    include: { model: db.Genre, where: { id: 16 } },
  });
  const thrMovies = await db.Movie.findAll({
    order: [db.Sequelize.fn("RANDOM")],
    limit: 5,
    include: { model: db.Genre, where: { id: 17 } },
  });
  const warMovies = await db.Movie.findAll({
    order: [db.Sequelize.fn("RANDOM")],
    limit: 5,
    include: { model: db.Genre, where: { id: 18 } },
  });
  const wesMovies = await db.Movie.findAll({
    order: [db.Sequelize.fn("RANDOM")],
    limit: 5,
    include: { model: db.Genre, where: { id: 19 } },
  });
  

  const genresList = await db.Genre.findAll();

// const comedyMovies = await db.Movie.findAll({ order: Sequelize.literal('rand()'), limit: 5,
// where: { genreId: 4} })

// const crimeMovies = await db.Movie.findAll({ order: Sequelize.literal('rand()'), limit: 5,
// where: { genreId: 5} })

// const romanceMovies = await db.Movie.findAll({ order: Sequelize.literal('rand()'), limit: 5,
// where: { genreId: 14} })
  res.render("listGenres", {movies: allMovies, genresList, actMovies, advMovies, aniMovies, comMovies, criMovies, docMovies, draMovies, famMovies, fanMovies, hisMovies, horMovies, musMovies, mysMovies, romMovies, sciMovies, tvMovies, thrMovies, warMovies, wesMovies, csrfToken});  
}));

router.get(
  "/:genre([A-Za-z]+)|(Science\sFiction)",
  csurfProtection, asyncHandler(async (req, res) => {

    const csrfToken = req.csrfToken()
    
    const genresList = await db.Genre.findAll();
    let reqGenre;
    let reqsGenreId;

    if (req.params.genre == 'Science') {
      reqsGenreId = await db.Genre.findOne({
        where: {
          id: 15,
        },
      });
      req.params.genre = 'Science Fiction'
    } else if (req.params.genre == "TV") {
      reqsGenreId = await db.Genre.findOne({
        where: {
          id: 16,
        },
      });
      req.params.genre = "TV Movie";
    } else {
      reqGenre = req.params.genre;
      reqsGenreId = await db.Genre.findOne({
        where: {
          name: reqGenre,
        },
      });
    }

    const allMovies = await db.Movie.findAll({
      order: [db.Sequelize.fn("RANDOM")],
      limit: 20,
    });

    //This works with limiting to just 5 and of the specific genre
    const genreMovies = await db.Movie.findAll({
      order: [db.Sequelize.fn("RANDOM")],
      include: { model: db.Genre, where: { id: reqsGenreId.id } },
    });

    res.render("listGenres", {
      validGenre: reqsGenreId.id,
      genreTitle: req.params.genre,
      genresList,
      genreMovies,
      csrfToken
    });
  })
);

module.exports = router;
