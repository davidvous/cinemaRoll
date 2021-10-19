'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserMovieRatings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      movieId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Movies'}
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users'}
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserMovieRatings');
  }
};
