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
    }
  }
  EarthquakeReport.init(
    {
      UserId: DataTypes.INTEGER,
      EventquakeId: DataTypes.INTEGER,
      status: DataTypes.STRING,
      description: DataTypes.STRING,
      photoUrl: DataTypes.STRING,
      coordinate: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EarthquakeReport",
    }
  );
  return EarthquakeReport;
};
