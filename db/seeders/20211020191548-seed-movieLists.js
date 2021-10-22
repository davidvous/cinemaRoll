'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('MovieLists', [{"name":"Comedies","userId":1,"createdAt":"2021-10-22T21:03:08.789Z","updatedAt":"2021-10-22T21:03:08.789Z"},{"name":"Documentaries","userId":1,"createdAt":"2021-10-22T21:03:08.789Z","updatedAt":"2021-10-22T21:03:08.789Z"},{"name":"Action Movies","userId":1,"createdAt":"2021-10-22T21:03:08.789Z","updatedAt":"2021-10-22T21:03:08.789Z"}], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('MovieLists', null, {});
  }
};
