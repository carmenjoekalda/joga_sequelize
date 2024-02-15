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
      // define association here
      Article.belongsTo(models.Author, {
        foreignKey: 'author_id',
        field: 'author_id',
      });
      Article.belongsToMany(models.Tags, {
        foreignKey: 'articleId',
        through: 'ArticleTags',
      });
    }
  }
  Article.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    published: {
      type: DataTypes.DATE,
      allowNull: false
    },
    author_id: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Article',
    tableName: 'articles',
    freezeTableName: true,
  });
  return Article;
};