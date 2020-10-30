'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Article.belongsTo(models.User)
      Article.belongsTo(models.Tags)
    }
  };
  Article.init({
    UserId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    TagId: DataTypes.INTEGER,
    isDeleted: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};