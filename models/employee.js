'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  employee.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    designation: DataTypes.STRING,
    phone: DataTypes.BOOLEAN,
    rate_type: DataTypes.STRING,
    hour_rate_salary: DataTypes.STRING,
    email: DataTypes.STRING,
    blood_group: DataTypes.STRING,
    address_line_1: DataTypes.STRING,
    address_line_2: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    zip_code: DataTypes.STRING,
    picture: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'employee',
  });
  return employee;
};