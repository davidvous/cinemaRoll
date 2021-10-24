'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('MovieLists', [{
        
        'name':"Comedies",
        'userId':1,
        'createdAt': new Date(),
        'updatedAt': new Date()
      },
    {
        'name':"Documentaries",
        'userId':1,
        'createdAt': new Date(),
        'updatedAt': new Date()
      }
    ,  {
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
      */
   return queryInterface.bulkDelete('MovieLists', null, {});
  }
};
