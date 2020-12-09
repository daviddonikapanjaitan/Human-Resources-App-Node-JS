'use strict';
const sequelize = require("sequelize");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('attendances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employee_name: {
        type: Sequelize.STRING
      },
      date: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      check_in: {
        type: Sequelize.STRING
      },
      check_out: {
        type: Sequelize.STRING
      },
      stay_time: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('attendances');
  }
};