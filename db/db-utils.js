const moviesTMDB = require('./tmdb_movies_top1000.json');
const genresTMDB = require('./tmdb_genres.json');


const createdAt = new Date().toISOString();
const updatedAt = createdAt;


// remove overly gratuitous movies
const isBanned = (id) => {
  const banList = new Set([
    719088, 81774, 440249, 381749, 337167, 441168, 873491, 197158,
    20222, 61927, 84354, 766680, 818659, 351819, 360789, 451156,
    24593, 487297, 106758//, 772436
  ]);
  return banList.has(id);
}

const moviesTMDBfiltered = moviesTMDB.filter(movie => !isBanned(movie.id));


// Create genres object for seeding into the database
// give them ids 1 through L.
//
// Createa a map of old genres ids vs new ids
let newId = 0;
const genreIdMapper = {}
const genres = genresTMDB.map(genre => {
  newId += 1
  const name = genre.name;
  genreIdMapper[genre.id] = newId;
  return {
    name,
    createdAt,
    updatedAt
  };
});

// Create movie array to be seeded into the database
// - assign ids starting with 1
// - add movie id to title to resolve unique title validation error
// - replace missing values
const titles = new Set();
let newMovieId = 0;
const movies = [];

// We also need a table mapping new movie ids to new genre ids.
const moviesGenresJoin = [];
let joinId = 0;

moviesTMDBfiltered.map(movie => {

  // first, do the movies
  newMovieId += 1;

  let { genre_ids, original_title, overview, release_date, popularity, poster_path} = movie;
  if (titles.has(original_title)) original_title += newMovieId;
  if (!overview) overview = "The summary for this movie was not provided";
  if (!release_date) release_date = "09-09-9999";
  titles.add(original_title);

  movies.push({
    "title": original_title,
    "dateReleased": release_date,
    "summary": overview,
    popularity,
    createdAt,
    updatedAt,
    posterPath: "https://image.tmdb.org/t/p/original" + poster_path
  });

  // now do the join table
  const oldGenreIds = movie.genre_ids;
  oldGenreIds.forEach(oldId => {
    joinId += 1;
    moviesGenresJoin.push({
      movieId: newMovieId,
      genreId: genreIdMapper[oldId],
      createdAt,
      updatedAt
    });
  });

});


module.exports = {
  genres,
  movies,
  moviesGenresJoin
}
