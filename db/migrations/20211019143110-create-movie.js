'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      popularity: {
        type: Sequelize.DECIMAL,
        allowNull: false,

      },
      title: {
        type: Sequelize.STRING(300),
        allowNull: false,
        unique: true
      },
      dateReleased: {
        type: Sequelize.DATEONLY,
        allowNull:true
      },
      summary: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      posterPath:{
        type: Sequelize.TEXT,
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
    return queryInterface.dropTable('Movies');
  }
};
