'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  attendance.init({
    employee_name: DataTypes.STRING,
    date: DataTypes.DATE,
    check_in: DataTypes.STRING,
    check_out: DataTypes.STRING,
    stay_time: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'attendance',
  });
  return attendance;
};