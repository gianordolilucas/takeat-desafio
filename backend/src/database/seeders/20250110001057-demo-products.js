'use strict';

const { Restaurant, Address } = require('../models');

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const products = [];

    const restaurants = await Restaurant.findAll();

    restaurants.forEach(restaurant => {
      for (let i = 0; i < 10; i++) {
        products.push({
          name: faker.commerce.productName(),
          description: faker.lorem.sentence(),
          value: parseFloat(faker.commerce.price()),
          restaurant_id: restaurant.id,
          canceled_at: null,
          created_at: new Date(),
        });
      }
    });

    await queryInterface.bulkInsert('Products', products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
