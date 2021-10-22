'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserMovieRating = sequelize.define('UserMovieRating',  {
      movieId: { 
        type: DataTypes.INTEGER, 
        allowNull: false},
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
      },
    }, {});
  UserMovieRating.associate = function(models) {
    // associations can be defined here
    UserMovieRating.belongsTo(models.User, {foreignKey:'userId'})
    UserMovieRating.belongsTo(models.Movie, {foreignKey:'movieId'})
    
  };
  return UserMovieRating;
};
