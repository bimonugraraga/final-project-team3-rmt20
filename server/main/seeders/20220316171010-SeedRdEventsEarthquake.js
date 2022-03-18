"use strict";
const fs = require("fs");
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = JSON.parse(
      fs.readFileSync("./db/eventsEarthquake.json", "utf-8")
    );
    data.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("EarthquakeEvents", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("EarthquakeEvents", {});
  },
};
