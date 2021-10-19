'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListToMoviesJoinTable = sequelize.define('ListToMoviesJoinTable', {
    movieId: DataTypes.INTEGER,
    movieListId: DataTypes.INTEGER
  }, {});
  ListToMoviesJoinTable.associate = function(models) {
    // associations can be defined here
  };
  return ListToMoviesJoinTable;
};
