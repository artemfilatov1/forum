'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    static associate(models) {
      Comments.belongsTo(models.Posts, {foreignKey: 'postId', onDelete: 'cascade', hooks: true});
      Comments.belongsTo(models.Users, {foreignKey: 'userId', onDelete: 'cascade', hooks: true});
      Comments.hasMany(models.LikesToComments, {foreignKey: 'commentId', onDelete: 'cascade', hooks: true});
    }
  };
  Comments.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    publish_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    modelName: 'Comments',
    timestamps: false
  });
  return Comments;
};