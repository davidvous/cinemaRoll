'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie',
  {
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
    }, {});
  Movie.associate = function(models) {
    // associations can be defined here
    Movie.hasMany(models.UserMovieRating, {foreignKey: 'movieId'})
    Movie.belongsTo(models.Genre, {foreignKey:'genreId'})
    Movie.hasMany(models.Review, {foreignKey: 'movieId'})

    const columnMapping = {
      through: 'ListToMoviesJoinTable',
      foreignKey: 'movieId',
      otherKey: 'movieList'
    }
    Movie.belongsToMany(models.MovieList, columnMapping);

    const columnMapping__genres = {
      through: 'MoviesToGenresJoinTables',
      foreignKey: 'movieId',
      otherKey: 'genreId'
    }
    Movie.belongsToMany(modesl.Genre, columnMapping__genres);

  };
  return Movie;
};
