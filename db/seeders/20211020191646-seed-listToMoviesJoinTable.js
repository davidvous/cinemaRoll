'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {   
      return queryInterface.bulkInsert('ListToMoviesJoinTables', [{"movieId":2,"movieListId":3,"createdAt":"2021-10-22T21:03:08.805Z","updatedAt":"2021-10-22T21:03:08.805Z"},{"movieId":3,"movieListId":3,"createdAt":"2021-10-22T21:03:08.805Z","updatedAt":"2021-10-22T21:03:08.805Z"},{"movieId":4,"movieListId":3,"createdAt":"2021-10-22T21:03:08.805Z","updatedAt":"2021-10-22T21:03:08.805Z"},{"movieId":5,"movieListId":3,"createdAt":"2021-10-22T21:03:08.805Z","updatedAt":"2021-10-22T21:03:08.805Z"},{"movieId":28,"movieListId":1,"createdAt":"2021-10-22T21:03:08.805Z","updatedAt":"2021-10-22T21:03:08.805Z"},{"movieId":37,"movieListId":1,"createdAt":"2021-10-22T21:03:08.805Z","updatedAt":"2021-10-22T21:03:08.805Z"},{"movieId":38,"movieListId":1,"createdAt":"2021-10-22T21:03:08.805Z","updatedAt":"2021-10-22T21:03:08.805Z"},{"movieId":39,"movieListId":1,"createdAt":"2021-10-22T21:03:08.805Z","updatedAt":"2021-10-22T21:03:08.805Z"},{"movieId":70,"movieListId":1,"createdAt":"2021-10-22T21:03:08.805Z","updatedAt":"2021-10-22T21:03:08.805Z"},{"movieId":318,"movieListId":1,"createdAt":"2021-10-22T21:03:08.805Z","updatedAt":"2021-10-22T21:03:08.805Z"},{"movieId":425,"movieListId":2,"createdAt":"2021-10-22T21:03:08.805Z","updatedAt":"2021-10-22T21:03:08.805Z"},{"movieId":643,"movieListId":2,"createdAt":"2021-10-22T21:03:08.805Z","updatedAt":"2021-10-22T21:03:08.805Z"},{"movieId":528,"movieListId":2,"createdAt":"2021-10-22T21:03:08.805Z","updatedAt":"2021-10-22T21:03:08.805Z"},{"movieId":647,"movieListId":2,"createdAt":"2021-10-22T21:03:08.805Z","updatedAt":"2021-10-22T21:03:08.805Z"}], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete("ListToMoviesJoinTables", null, {});
  }
};
