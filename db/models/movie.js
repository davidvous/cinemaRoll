'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', 
  {
      title: { 
        type: DataTypes.STRING(300), 
        allowNull: false, 
        unique: true },
      releaseDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      genreId: {
        type: DataTypes.INTEGER,
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

  };
  return Movie;
};
