'use strict';
module.exports = (sequelize, DataTypes) => {
  const MovieList = sequelize.define('MovieList',
  {
      name: { type: DataTypes.STRING(50),
        allowNull: false},
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  });

  MovieList.associate = function(models) {
    // associations can be defined here
    MovieList.belongsTo(models.User, {foreignKey:'userId'})
    const columnMapping = {
      through: 'ListToMoviesJoinTable',
      otherKey: 'movieId',
      foreignKey: 'movieList'
    }
    MovieList.belongsToMany(models.Movie, columnMapping);
  };
  return MovieList;
};
