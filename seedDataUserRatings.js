var fs = require("fs");
const movies = require('./db/tmdb_movies_filtered.json')

let props = ["createdAt", "updatedAt", "dateReleased", "summary", "posterPath", "adult", "backdrop_path", "genre_ids", "original_language", "video", "original_title", "overview", "popularity", "poster_path", "release_date", "title", "video", "vote_average", "vote_count"]
let filteredMovies = [];

addUserRatings = (array) => {

    for (let i = 0; i < array.length; i++) {
        const movie = array[i];
        for (let key in movie) {
            for (j = 0; j < props.length; j++) {
                let indivProp = props[j];
                if (movie.hasOwnProperty(indivProp)) {
                    delete movie[indivProp];
                }
            }
            movie["userId"] = Math.floor(Math.random() * (4) + 1);
            movie["rating"] = Math.floor(Math.random() * 5 + 1);
            
        }
        filteredMovies.push(movie);

    }
}

addUserRatings(movies)
fs.writeFileSync('/Users/davidle/Desktop/AppAcademy/cinemaRoll/db/userRatingsFiltered.json', JSON.stringify(movies));