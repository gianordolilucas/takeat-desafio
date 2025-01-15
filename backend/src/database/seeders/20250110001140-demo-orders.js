'use strict';

const {Buyer} = require('../models');
const {Product} = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    const orders = [];
    const buyers = await Buyer.findAll();
    const products = await Product.findAll();

    buyers.forEach(buyer => {
      const uniqueRestaurants = new Set();
      while (uniqueRestaurants.size < 3) {
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        const restaurant = randomProduct.restaurant_id;

        if (!uniqueRestaurants.has(restaurant)) {
          uniqueRestaurants.add(restaurant);
          orders.push({
            product_id: randomProduct.id,
            amount: Math.floor(Math.random() * 5) + 1, 
            total_price: randomProduct.value * Math.floor(Math.random() * 5) + 1,
            total_service_price: randomProduct.value * 0.1, 
            restaurant_id: restaurant,
            buyer_id: buyer.id,
            canceled_at: null,
            created_at: new Date(),
          });
        }
      }
    });

    await queryInterface.bulkInsert('Orders', orders, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  }
};
