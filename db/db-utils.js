const moviesTMDB = require('./tmdb_movies_top1000.json');
const genresTMDB = require('./tmdb_genres.json');


const createdAt = new Date().toISOString();
const updatedAt = createdAt;


const genreNames = genresTMDB.map(genre => {
  const name = genre.name;
  return {
    name,
    createdAt,
    updatedAt
  };
});


// there are duplicate movie titles
// our db does not allow for duplicates
// add TMDB movie id to title to resolve the validation error for now
// this is a temporary fix ("temporary" hehe)
const titles = new Set();

const movies = moviesTMDB.map(movie => {

  let { genre_ids, original_title, overview, release_date, id} = movie;
  if (titles.has(original_title)) original_title += id;
  if (!overview) overview = "The summary for this movie was not provided";
  if (!release_date) release_date = "09-09-9999";
  titles.add(original_title);

  return {
    "title": original_title,
    "dateReleased": release_date,
    "summary": overview,
    createdAt,
    updatedAt
  }

});


// overly gratuitous movies to be removed from the set before seeding
const banList = [
  719088,
  81774,
  440249,
  381749,
  337167,
  441168,
  873491,
  197158,
  20222,
  61927,
  84354,
  766680,
  818659,
  351819,
  360789,
  451156,
  24593,
  487297,
  106758
]


module.exports = {
  genreNames,
  movies,
  banList
}

