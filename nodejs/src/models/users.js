'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.Posts, { foreignKey: "userId", onDelete: 'cascade', hooks: true});
      Users.hasMany(models.LikesToComments, { foreignKey: "userId", onDelete: 'cascade', hooks: true});
      Users.hasMany(models.LikesToPosts, { foreignKey: "userId", onDelete: 'cascade', hooks: true});
      Users.hasMany(models.Comments, { foreignKey: "userId", onDelete: 'cascade', hooks: true});
    }
  };
  Users.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    login: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    full_name:{
      type: DataTypes.TEXT,
      allowNull: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    profile_picture: {
      type: DataTypes.TEXT,
      defaultValue: 'default.png'
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    role: {
      type: DataTypes.ENUM(['user', 'admin']),
      defaultValue: 'user'
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Users',
    timestamps: false
  });
  return Users;
};