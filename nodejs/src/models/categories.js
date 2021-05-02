'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate(models) {
      Categories.belongsToMany(models.Posts, {
        through: 'PostsCategories',
        foreignKey: 'categoryId',
        onDelete: 'cascade',
        hooks: true
      });
    }
  };
  Categories.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Categories',
    timestamps: false
  });
  return Categories;
};