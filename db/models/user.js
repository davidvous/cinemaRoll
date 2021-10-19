'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: { 
        type: DataTypes.STRING(150), 
        allowNull: false, 
        unique: true },
      passwordHash: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.MovieList, {foreignKey: 'userId'})
    User.hasMany(models.Review, {foreignKey: 'userId'})
    User.hasMany(models.UserMovieRating, {foreignKey: 'userId'})
  };
  return User;
};
