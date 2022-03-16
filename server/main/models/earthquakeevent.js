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
    }
  }
  EarthquakeEvent.init(
    {
      date: DataTypes.STRING,
      hour: DataTypes.STRING,
      dateTime: DataTypes.DATE,
      coordinates: DataTypes.STRING,
      magnitude: DataTypes.FLOAT,
      depth: DataTypes.FLOAT,
      area: DataTypes.STRING,
      potensi: DataTypes.STRING,
      dirasakan: DataTypes.STRING,
      shakeMap: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EarthquakeEvent",
    }
  );
  return EarthquakeEvent;
};
