'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArticleTags extends Model {
    static associate(models) {
      this.belongsTo(models.Tags, {
        foreignKey: 'tagId',
      });
      this.belongsTo(models.Article, {
        foreignKey: 'articleId',
      })
    }
  }
  ArticleTags.init({
    articleId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ArticleTags',
  });
  return ArticleTags;
};