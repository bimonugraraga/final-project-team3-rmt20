'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email Has Been Taken!'
      },
      validate: {
        notNull: {
          msg: 'Email Is Required!'
        },
        notEmpty: {
          msg: 'Email Is Required!'
        },
        isEmail: {
          msg: 'Invalid Email Format!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password Is Required!'
        },
        notEmpty: {
          msg: 'Password Is Required!'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (value) => {
        value.password = hashPassword(value.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};