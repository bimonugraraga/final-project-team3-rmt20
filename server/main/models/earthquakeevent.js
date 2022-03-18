"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EarthquakeEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EarthquakeEvent.hasMany(models.EarthquakeReport, {
        foreignKey: "EventquakeId",
      });
    }
  }
  EarthquakeEvent.init(
    {
      date: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Date is required",
          },
          notNull: {
            msg: "Date is required",
          },
        },
      },
      hour: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Hour is required",
          },
          notNull: {
            msg: "Hour is required",
          },
        },
      },
      dateTime: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Date Time is required",
          },
          notNull: {
            msg: "Date Time is required",
          },
        },
      },
      coordinates: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Coordinates is required",
          },
          notNull: {
            msg: "Coordinates is required",
          },
        },
      },
      magnitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Magnitude is required",
          },
          notNull: {
            msg: "Magnitude is required",
          },
        },
      },
      depth: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Depth is required",
          },
          notNull: {
            msg: "Depth is required",
          },
        },
      },
      area: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Area is required",
          },
          notNull: {
            msg: "Area is required",
          },
        },
      },
      potensi: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Potensi is required",
          },
          notNull: {
            msg: "Potensi is required",
          },
        },
      },
      dirasakan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Dirasakan is required",
          },
          notNull: {
            msg: "Dirasakan is required",
          },
        },
      },
      shakeMap: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EarthquakeEvent",
    }
  );
  return EarthquakeEvent;
};
