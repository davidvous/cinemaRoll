'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {   
      return queryInterface.bulkInsert('ListToMoviesJoinTable', [
        {'id':1,
      'movieId':2,
      'movieListId':3,
      'createdAt': new Date(),
      'updatedAt': new Date()},
      {'id':2,
      'movieId':3,
      'movieListId':3,
      'createdAt': new Date(),
      'updatedAt': new Date()},
      {'id':4,
      'movieId':4,
      'movieListId':3,
      'createdAt': new Date(),
      'updatedAt': new Date()},
      {'id':5,
      'movieId':5,
      'movieListId':3,
      'createdAt': new Date(),
      'updatedAt': new Date()},


      {'id':6,
      'movieId':28,
      'movieListId':1,
      'createdAt': new Date(),
      'updatedAt': new Date()},

      {'id':7,
      'movieId':37,
      'movieListId':1,
      'createdAt': new Date(),
      'updatedAt': new Date()},

      {'id':8,
      'movieId':38,
      'movieListId':1,
      'createdAt': new Date(),
      'updatedAt': new Date()},

      {'id':9,
      'movieId':39,
      'movieListId':1,
      'createdAt': new Date(),
      'updatedAt': new Date()},

      {'id':10,
      'movieId':70,
      'movieListId':1,
      'createdAt': new Date(),
      'updatedAt': new Date()},

      {'id':11,
      'movieId':318,
      'movieListId':1,
      'createdAt': new Date(),
      'updatedAt': new Date()},

      {'id':12,
      'movieId':425,
      'movieListId':2,
      'createdAt': new Date(),
      'updatedAt': new Date()},


      {'id':13,
      'movieId':643,
      'movieListId':2,
      'createdAt': new Date(),
      'updatedAt': new Date()},

      {'id':14,
      'movieId':528,
      'movieListId':2,
      'createdAt': new Date(),
      'updatedAt': new Date()},

      {'id':15,
      'movieId':647,
      'movieListId':2,
      'createdAt': new Date(),
      'updatedAt': new Date()},


      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
