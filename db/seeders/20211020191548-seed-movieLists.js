'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('movieLists', [{
        'id': 1,
        'name':"Comedies",
        'userId':1,
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
    {
        'id': 2,
        'name':"Documentaries",
        'userId':1,
        'createdAt': new Date(),
        'updatedAt': new Date()
      }
    ,  {
        'id': 3,
        'name':"Action Movies",
        'userId':1,
        'createdAt': new Date(),
        'updatedAt': new Date()
      }], {});
    
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
