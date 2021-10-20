'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [
        {id:1,
        email:"jim@jim.com",
        passwordHash:"$2a$10$tuOOz8wLRds1Z03iGlNEr.ErjYfFCivNYHfVb33ulaGrRqtxnaDsa",
        firstName: "Jim",
      lastName:"Regan",
    },
    {id:2,
        email:"dave@dave.com",
        passwordHash:"$2a$10$JehxAO3xJHfj6HcdvSjjXObkYAOhkFQIH2IePH8ruHiLxQSjBMOU2",
        firstName:"Dave",
      lastName:"Davidson",
    },
    {id:3,
        email:"linda@linda.com",
        passwordHash:"$2a$10$SS.RZXG1dMtEhVcdsabg7uHbG6fVOB9L4vMTXAlvXHBXeCZNvZC8S",
        firstName:"Linda",
      lastName:"White",
    },
    {id:4,
        email:"bob@bob.com",
        passwordHash:"$2a$10$47B5GHg4cNGp1YpfdUELxOxpZvOH3S9rk04zcAJSU.hwL5pgkSjCu",
        firstName:"Bob",
      lastName:"Jones",
    },
    ], {});
  
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Users', null, {});
  }
};
