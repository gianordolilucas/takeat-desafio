'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface) {
    const addresses = [];
    const restaurants = [];

    for (let i = 0; i < 6; i++) {
      const address = await queryInterface.bulkInsert('Addresses', [{
        street: faker.location.streetAddress(),
        number: Math.random(0,120),
        complement: faker.location.secondaryAddress(),
        neighborhood: faker.location.state().slice(0,3),
        city: faker.location.city(),
        state: faker.location.state(),
        country: faker.location.country(),
        postal_code: faker.location.zipCode(),
        created_at: new Date(),
      }], { returning: true });

      addresses.push(address[0]);

      restaurants.push({
        username: faker.company.name().toLowerCase().split(' ').join(''),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.number(),
        has_service_tax: faker.datatype.boolean(),
        address_id: addresses[i].id,
        created_at: new Date(),
      });
    }

    await queryInterface.bulkInsert('Restaurants', restaurants, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Restaurants', null, {});
  }
};
