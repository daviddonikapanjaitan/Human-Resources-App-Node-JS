'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('x_addrbooks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      created_by: {
        type: Sequelize.STRING(11)
      },
      modified_by: {
        type: Sequelize.STRING(11)
      },
      deleted_by: {
        type: Sequelize.STRING(11)
      },
      is_delete: {
        type: Sequelize.BOOLEAN
      },
      is_locked: {
        type: Sequelize.BOOLEAN
      },
      attempt: {
        type: Sequelize.INTEGER(1)
      },
      email: {
        type: Sequelize.STRING(100)
      },
      abuid: {
        type: Sequelize.STRING(50)
      },
      abpwd: {
        type: Sequelize.STRING(50)
      },
      fp_token: {
        type: Sequelize.STRING(100)
      },
      fp_expired_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      fp_counter: {
        type: Sequelize.INTEGER(3)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('x_addrbooks');
  }
};