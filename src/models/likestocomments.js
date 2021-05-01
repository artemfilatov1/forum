'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LikesToComments extends Model {
    static associate(models) {
      LikesToComments.belongsTo(models.Comments, {foreignKey: 'commentId', onDelete: 'cascade', hooks: true});
      LikesToComments.belongsTo(models.Users, {foreignKey: 'userId', onDelete: 'cascade', hooks: true});
    }
  };
  LikesToComments.init({
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
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'LikesToComments',
    timestamps: false
  });
  return LikesToComments;
};