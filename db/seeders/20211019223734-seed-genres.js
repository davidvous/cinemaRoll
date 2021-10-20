'use strict';

const { genreNames } = require('../db-utils')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Genres', genreNames, [{"id":1,"name":"Action","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"id":2,"name":"Adventure","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"id":3,"name":"Animation","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"id":4,"name":"Comedy","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"id":5,"name":"Crime","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"id":6,"name":"Documentary","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"id":7,"name":"Drama","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"id":8,"name":"Family","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"id":9,"name":"Fantasy","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"id":10,"name":"History","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"id":11,"name":"Horror","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"id":12,"name":"Music","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"id":13,"name":"Mystery","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"id":14,"name":"Romance","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"id":15,"name":"Science Fiction","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"id":16,"name":"TV Movie","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"id":17,"name":"Thriller","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"id":18,"name":"War","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"id":19,"name":"Western","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"}], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Genres', null, {});
  }
};
