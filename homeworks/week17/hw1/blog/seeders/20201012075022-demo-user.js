'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        username: '123',
        password: '123',
        nickname: '123',
        auth_type: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        username: 'aaa',
        password: 'aaa',
        nickname: 'aaa',
        auth_type: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
