'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', 
  {
      title: { 
        type: DataTypes.STRING(285), 
        allowNull: false },
      reviewText: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
   {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.User, {foreignKey:'userId'})
    Review.belongsTo(models.Movie, {foreignKey:'movieId'})
  };
  return Review;
};
