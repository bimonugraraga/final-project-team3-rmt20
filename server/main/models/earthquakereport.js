"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EarthquakeReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EarthquakeReport.belongsTo(models.EarthquakeEvent, {
        foreignKey: "EventquakeId",
      });
    }
  }
  EarthquakeReport.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "UserId is required",
          },
          notNull: {
            msg: "UserId is required",
          },
        },
      },
      EventquakeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "EventquakeId is required",
          },
          notNull: {
            msg: "EventquakeId is required",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Status is required",
          },
          notNull: {
            msg: "Status is required",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description is required",
          },
          notNull: {
            msg: "Description is required",
          },
        },
      },
      photoUrl: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Description is required",
          },
        },
      },
      coordinate: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Coordinate is required",
          },
          notNull: {
            msg: "Coordinate is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "EarthquakeReport",
    }
  );
  return EarthquakeReport;
};
