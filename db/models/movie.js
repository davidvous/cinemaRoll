'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie',
    {
      popularity: {
        type: DataTypes.DECIMAL,
        allowNull: false,

      },
      title: {
        type: DataTypes.STRING(300),
        allowNull: false,
        unique: true },
      dateReleased: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      posterPath:{
        type: DataTypes.TEXT,
        allowNull: false,
      }

    }, {});
  Movie.associate = function(models) {
    // associations can be defined here
    Movie.hasMany(models.UserMovieRating, {foreignKey: 'movieId'})
    //Movie.belongsTo(models.Genre, {foreignKey:'genreId'})
    Movie.hasMany(models.Review, {foreignKey: 'movieId'})

    const columnMapping = {
      through: 'ListToMoviesJoinTable',
      foreignKey: 'movieId',
      otherKey: 'movieListId'
    }
    Movie.belongsToMany(models.MovieList, columnMapping);

    const columnMapping__genres = {
      through: 'genresToMovieJoinTable',
      foreignKey: 'movieId',
      otherKey: 'genreId'
    }
    Movie.belongsToMany(models.Genre, columnMapping__genres);

  };
  return Movie;
};
