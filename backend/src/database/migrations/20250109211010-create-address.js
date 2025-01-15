'use strict'


export default {
  up: async (queryInterface, Sequelize) => {
    // Criando a tabela Address
    await queryInterface.createTable('Addresses', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      complement: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      neighborhood: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      postal_code: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9]{5}-?[0-9]{3}$/,
        }
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Addresses');
  },
};
