'use strict';

const { query } = require("express");

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('articles', 'id', {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      }),
      queryInterface.changeColumn('articles', 'name', {
        type: Sequelize.STRING,
        allowNull: false
      }),
      queryInterface.changeColumn('articles', 'slug', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }),
      queryInterface.changeColumn('articles', 'image', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.changeColumn('articles', 'body', {
        type: Sequelize.TEXT,
        allowNull: false,
      }),
      queryInterface.changeColumn('articles', 'published', {
        type: Sequelize.DATE,
        allowNull: false,
      }),
      queryInterface.changeColumn('articles', 'author_id', {
        type: Sequelize.INTEGER,
      }),
    ])
  },

down(queryInterface, Sequelize) {
  return Promise.all([
    queryInterface.dropTable('articles')
  ])
  }
};
