'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Genres', [{"name":"Action","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"name":"Adventure","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"name":"Animation","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"name":"Comedy","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"name":"Crime","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"name":"Documentary","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"name":"Drama","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"name":"Family","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"name":"Fantasy","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"name":"History","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"name":"Horror","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"name":"Music","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"name":"Mystery","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"name":"Romance","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"name":"Science Fiction","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"name":"TV Movie","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"name":"Thriller","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"name":"War","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"},{"name":"Western","createdAt":"2021-10-20T16:40:30.212Z","updatedAt":"2021-10-20T16:40:30.212Z"}], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Genres', null, {});
    }
};
