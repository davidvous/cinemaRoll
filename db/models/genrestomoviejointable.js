'use strict';
module.exports = (sequelize, DataTypes) => {
  const genresToMovieJoinTable = sequelize.define('genresToMovieJoinTable', {
    movieId: DataTypes.INTEGER,
    genreId: DataTypes.INTEGER
  }, {});
  genresToMovieJoinTable.associate = function(models) {
    // associations can be defined here
  };
  return genresToMovieJoinTable;
};