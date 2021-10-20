var fs = require("fs");
const movies = require('./db/tmdb_movies_filtered.json')

let filteredMovies = [];

addUserRatings = (array) => {

    for (let i = 0; i < array.length; i++) {
        const movie = array[i];
        for (let key in movie) {
                if (key !== 'id') {
                    delete movie[key];
                }
            movie["userId"] = Math.floor(Math.random() * (4) + 1);
            movie["rating"] = Math.floor(Math.random() * 5 + 1);
            
        }
        filteredMovies.push(movie);

    }
}

addUserRatings(movies)
fs.writeFileSync('./db/userRatingsFiltered.json', JSON.stringify(movies));