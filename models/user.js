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
      validate: {
        notEmpty:{
          args: true,
          msg: "full_name cannot be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: {
          args: true,
          msg: "email cannot be empty"
        },
        isEmail: {
          args: true,
          msg: "Please enter valid email format"
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: {
          args: true,
          msg: "username cannot be empty"
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: {
          args: true,
          msg: "password cannot be empty"
        },
      }
    },
    profile_image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "profile_image_url cannot be empty"
        },
        isUrl:{
          args: true,
          msg: "please enter valid url format"
        }
      },
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "age cannot be empty",
        },
        isInt: {
          args: true,
          msg: "Please enter valid age"
        }
      }
    },
    phone_number: {
      type: DataTypes.BIGINT,
      validate: {
        notEmpty: {
          args: true,
          msg: "phone_number cannot be empty",
        },
        isNumeric: {
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