'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LikesToPosts extends Model {
    static associate(models) {
      LikesToPosts.belongsTo(models.Posts, {foreignKey: 'postId', onDelete: 'cascade', hooks: true});
      LikesToPosts.belongsTo(models.Users, {foreignKey: 'userId', onDelete: 'cascade', hooks: true});
    }
  };
  LikesToPosts.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    publish_date: {
      type: DataTypes.DATE
    },
    type: {
      type: DataTypes.ENUM(['like', 'dislike']),
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'LikesToPosts',
    timestamps: false
  });
  return LikesToPosts;
};