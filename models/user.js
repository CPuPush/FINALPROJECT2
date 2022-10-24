'use strict';
const {hashPassword} = require('../helper/bcrypt');
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
    },
    email: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: true,
        isEmail: true
      }
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    profile_image_url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      },
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        isInt:{
          args: true,
          mgs: "Please enter valid age"
        }
      }

    },
    phone_number: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: "Please enter valid phone number"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    // hooks: {
    //   beforeCreate: (user, opt) => {
    //     const hashedPassword = hashPassword(user.password);
    //     user.password = hashedPassword;
    //   }
    // }
  });
  return User;
};