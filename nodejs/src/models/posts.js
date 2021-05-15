'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    static associate(models) {
      Posts.hasMany(models.LikesToPosts, {foreignKey: 'postId', onDelete: 'cascade', hooks: true});
      Posts.hasMany(models.Comments, {foreignKey: 'postId', onDelete: 'cascade', hooks: true});
      Posts.belongsTo(models.Users, {foreignKey: 'userId', onDelete: 'cascade', hooks: true});
      Posts.belongsToMany(models.Categories, {
        through: 'PostsCategories',
        foreignKey: "postId",
        onDelete: 'cascade',
        hooks: true
      });
    }
  };
  Posts.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    publish_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(['live', 'inactive']),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Posts',
    timestamps: false
  });
  return Posts;
};