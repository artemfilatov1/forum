
'use strict';

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PostsCategories extends Model {
        static associate(models) {

        }
    };
    PostsCategories.init({
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'PostsCategories',
        timestamps: false
    });
    return PostsCategories;
};