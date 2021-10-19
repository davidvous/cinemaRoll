'use strict';
module.exports = (sequelize, DataTypes) => {
  const MoviesToGenresJoinTable = sequelize.define('MoviesToGenresJoinTable', {
    movieId: DataTypes.INTEGER,
    genreId: DataTypes.INTEGER
  }, {});
  MoviesToGenresJoinTable.associate = function(models) {
    // associations can be defined here
  };
  return MoviesToGenresJoinTable;
};