const moviesRaw = require('./tmdb_movies_top1000.json');
const genresRaw = require('./tmdb_genres.json');


const genreNames = genresRaw.map(g => {

  const now = new Date();
  const name = g.name;
  const createdAt = now.toISOString();
  const updatedAt = createdAt;

  return {
    name,
    createdAt,
    updatedAt
  };

});

console.log(genreNames);

module.exports = {
  genreNames
}

