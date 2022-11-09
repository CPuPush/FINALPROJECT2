"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Comment);
      this.belongsTo(models.User);
    }
  }
  Photo.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "title cannot be empty",
          },
        }
      },
      caption: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            args: true,
            msg: "caption cannot be empty",
          },
        }
      },
      poster_image_url: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            args: true,
            msg: "poster_image_url cannot be empty",
          },
          isUrl: {
            msg: "please enter valid url format",
          },
        },
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Photo",
    }
  );
  return Photo;
};
