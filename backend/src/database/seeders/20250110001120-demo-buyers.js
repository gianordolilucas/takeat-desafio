'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const buyers = [];

    for (let i = 0; i < 12; i++) {
      buyers.push({
        name: faker.person.fullName(),
        phone: faker.phone.number(),
        created_at: new Date(),
      });
    }

    await queryInterface.bulkInsert('Buyers', buyers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Buyers', null, {});
  }
};
