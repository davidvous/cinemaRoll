'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: { 
        type: DataTypes.STRING(150), 
        allowNull: false, 
        unique: true },
      password_encrypted: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      last_name: {
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
