'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class x_addrbook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  x_addrbook.init({
    created_by: DataTypes.STRING,
    is_delete: DataTypes.BOOLEAN,
    is_locked: DataTypes.BOOLEAN,
    attempt: DataTypes.BLOB,
    email: DataTypes.STRING,
    abuid: DataTypes.STRING,
    abpwd: DataTypes.STRING,
    fp_token: DataTypes.STRING,
    fp_expired_date: DataTypes.DATE,
    fp_counter: DataTypes.BLOB,
    deleted_at: DataTypes.DATE,
    deleted_by: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'x_addrbook',
  });
  return x_addrbook;
};