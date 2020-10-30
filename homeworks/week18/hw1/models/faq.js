'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Faq extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Faq.init({
    question: DataTypes.STRING,
    answer: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Faq',
  });
  return Faq;
};