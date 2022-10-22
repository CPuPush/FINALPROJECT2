'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Photo);
      this.hasMany(models.SocialMedia);
      this.hasMany(models.Comment)
    }
  }
  User.init({
    full_name: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate:{
        isEmail: {
          args: true,
          msg: "Email format is wrong",
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      unique: true
    },
    profile_image_url: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isUrl: {
          args: true,
          msg: "Url format is wrong"
        }
      },
    },
    age: DataTypes.INTEGER,
    phone_number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};