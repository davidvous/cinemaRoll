var fs = require('fs');
 
validKeys = [ 'genre_ids', 'title', 'poster_path', 'overview', 'release_date', 'popularity' ];
let count=1;
const setgenreswithTMDBIds= new Set([28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37] )

const movies = require('./db/tmdb_movies_top1000.json');

const genreObjArray = require('./db/tmdb_genres_renumbered_ids.json')


let arrayOfMoviesThatArentInAKnownGenre=[]

let moviesWeAlreadyHave= new Set()



function movieUrlFixer(arr){
    for (let index = 0; index < arr.length; index++) {
        const movie = arr[index];
        
        // Removes irrelevant keys
        Object.keys(movie).forEach((key) => validKeys.includes(key) || delete movie[key]);
        //Set movieId starting at 1
        movie.id = count 
        count++;
        let movieGenres = movie.genre_ids;
        let relevantMovie = false;

        let indicesToRemoveFromArrayOfGenres=[]

        //Analyze array of genres identifying irrelevant genres

        for (let index2 = 0; index2 < movieGenres.length; index2++) {
            const genreId = movieGenres[index2];
            if (setgenreswithTMDBIds.has(genreId)) {
                relevantMovie = true;
            }else{
                indicesToRemoveFromArrayOfGenres.push(index2);
            }

        }

        //Removes irrelvant genres by index

        for (let index2 = indicesToRemoveFromArrayOfGenres.length-1; index2 >=0 ; index2--) {
            const indexToPop = arrayOfMoviesThatArentInAKnownGenre[index];
        movieGenres.splice(indexToPop, 1);
            
        }



        //Set movie.genre_ids to only array of relevant genres
        movie.genre_ids = movieGenres;

        if (moviesWeAlreadyHave.has(movie.title) || !movie.title || !movie.release_date || !movie.overview || !movie.poster_path || !movie.genre_ids ||!movie.popularity){
            relevantMovie = false;
        }

        if (!relevantMovie) {
            arrayOfMoviesThatArentInAKnownGenre.push(index); // The movie is completely irrelevant, add to array of indices to delete
        }
        //console.log(movies)


        let old_path = movie.poster_path;
        let new_path = "https://image.tmdb.org/t/p/original/"+old_path ;
        
        movie.poster_path = new_path;
        moviesWeAlreadyHave.add(movie.title) //Add movie to known movies
    }
    console.log(arrayOfMoviesThatArentInAKnownGenre)
    for (let index = arrayOfMoviesThatArentInAKnownGenre.length-1; index >= 0; index--) {
        const indexToPop = arrayOfMoviesThatArentInAKnownGenre[index];
        movies.splice(indexToPop, 1);
    } //Delete irrelevant movies

    for (let index = 0; index < movies.length; index++) {
        const movie = movies[index];
        let old_genre_ids = movie.genre_ids
        let new_genre_ids = [];

        for (let index2 = 0; index2 < old_genre_ids.length; index2++) {
            const oldId = old_genre_ids[index2];
            switch (oldId){
                case 28:
                    new_genre_ids.push(1)
                    break;
                case 16:
                    new_genre_ids.push(2)
                    break;
                case 35: 
                    new_genre_ids.push(3)
                    break;
                case 80:
                    new_genre_ids.push(4)
                    break;
                case 99:
                    new_genre_ids.push(5)
                    break;
                case 18: 
                    new_genre_ids.push(6)
                    break;
                case 10751:
                    new_genre_ids.push(7)
                    break;
                case 14:
                    new_genre_ids.push(8)
                    break; 
                case 36:
                    new_genre_ids.push(9)
                    break;
                case 27:
                    new_genre_ids.push(10)
                    break;
                case 10402:
                    new_genre_ids.push(11)
                    break;
                case 9648:
                    new_genre_ids.push(12)
                    break;
                case 10749: 
                    new_genre_ids.push(13)
                    break;
                case 10770:
                    new_genre_ids.push(14)
                    break;
                case 53:
                    new_genre_ids.push(15)
                    break;
                case 10752:
                    new_genre_ids.push(16)
                    break; 
                case 37:
                    new_genre_ids.push(17)
                    break;
            }
        }
        movie.genre_ids = new_genre_ids;
        movie.createdAt = new Date()
        movie.updatedAt = new Date()
        delete Object.assign(movie, {['dateReleased']: movie['release_date'] })['release_date'];
        delete Object.assign(movie, {['summary']: movie['overview'] })['overview'];
        delete Object.assign(movie, {['posterPath']: movie['poster_path'] })['poster_path'];
        delete movie.genre_ids
    }
    
        
}


movieUrlFixer(movies)
fs.writeFileSync('/mnt/d/tmdb_movies_filtered.json', JSON.stringify(movies));

for (let index = 0; index < genreObjArray.length; index++) {
    const genreObj = genreObjArray[index]
    genreObj.createdAt= new Date()
    genreObj.updatedAt = new Date()
}
fs.writeFileSync('/mnt/d/tmdb_genres_w_creation_dates.json', JSON.stringify(genreObjArray));
