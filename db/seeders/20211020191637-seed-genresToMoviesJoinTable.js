'use strict';

const { moviesGenresJoin } = require("../db-utils");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("genresToMovieJoinTables", moviesGenresJoin, {});

  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete("genresToMovieJoinTables", null, {});
  }
};
