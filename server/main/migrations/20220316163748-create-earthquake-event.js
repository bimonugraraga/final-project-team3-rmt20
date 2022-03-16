"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("EarthquakeEvents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      hour: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      dateTime: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      coordinates: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      magnitude: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      depth: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      area: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      potensi: {
        type: Sequelize.STRING,
      },
      dirasakan: {
        type: Sequelize.TEXT,
      },
      shakeMap: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("EarthquakeEvents");
  },
};
