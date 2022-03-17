'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WeatherReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WeatherReport.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  }
  WeatherReport.init({
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Status Is Required!'
        },
        notEmpty: {
          msg: 'Status Is Required!'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Description Is Required!'
        },
        notEmpty: {
          msg: 'Description Is Required!'
        }
      }
    },
    photoUrl: DataTypes.STRING,
    coordinate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Coordinate Is Required!'
        },
        notEmpty: {
          msg: 'Coordinate Is Required!'
        }
      }
    },
    temperature: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Temperature Is Required!'
        },
        notEmpty: {
          msg: 'Temperature Is Required!'
        }
      }
    },
    uvi: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'UVI Is Required!'
        },
        notEmpty: {
          msg: 'UVI Is Required!'
        }
      }
    },
    pressure: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Pressure Is Required!'
        },
        notEmpty: {
          msg: 'Pressure Is Required!'
        }
      }
    },
    humidity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Humidity Is Required!'
        },
        notEmpty: {
          msg: 'Humidity Is Required!'
        }
      }
    },
    windspeed: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Wind Speed Is Required!'
        },
        notEmpty: {
          msg: 'Wind Speed Is Required!'
        }
      }
    },
    weatherMain: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Weather Main Is Required!'
        },
        notEmpty: {
          msg: 'Weather Main Is Required!'
        }
      }
    },
    weatherDesc: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Weather Description Is Required!'
        },
        notEmpty: {
          msg: 'Weather Description Is Required!'
        }
      }
    },
    weatherIcon: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Weather Icon Is Required!'
        },
        notEmpty: {
          msg: 'Weather Icon Is Required!'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User Id Is Required!'
        },
        notEmpty: {
          msg: 'User Id Is Required!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'WeatherReport',
  });
  return WeatherReport;
};