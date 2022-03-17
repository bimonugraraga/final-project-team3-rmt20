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
      EarthquakeEvent.belongsTo(models.EarthquakeReport, {
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
            msg: "Date cannot be null",
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
            msg: "Hour cannot be null",
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
            msg: "Date Time cannot be null",
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
            msg: "Coordinates cannot be null",
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
            msg: "Magnitude cannot be null",
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
            msg: "Depth cannot be null",
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
            msg: "Area cannot be null",
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
            msg: "Potensi cannot be null",
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
            msg: "Dirasakan cannot be null",
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
