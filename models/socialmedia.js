'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SocialMedia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User)

    }
  }
  SocialMedia.init({
    name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: {
          args: true,
          msg: "name cannot be empty"
        },
      }
    },
    social_media_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "social_media_url cannot be empty"
        },
        isUrl: {
          args: true,
          msg: "please enter valid url format"
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SocialMedia',
  });
  return SocialMedia;
};