const fs = require('fs');
const moviesWithGenreIds = require('./db/tmdb_movies_filtered_with_genres.json')

function genresToMoviesSeed(movies){
    let id=1;
    const ansArray = []
    for (let index = 0; index < movies.length; index++){
        const movie = movies[index];
        const movieId = movie.id ;
        for (let index2 = 0; index2 < movie.genre_ids.length; index2++){
            const genreId = movie.genre_ids[index2]
            let dataEntry = {genreId, movieId, id}
            id++
            ansArray.push(dataEntry)
        }
    }
    return ansArray
}

const seedData = genresToMoviesSeed(moviesWithGenreIds)
fs.writeFileSync('/mnt/d/tmdb_genres_to_movies.json', JSON.stringify(seedData));
