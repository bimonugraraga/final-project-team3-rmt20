'use strict';
const fs = require("fs");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const data = JSON.parse(
      fs.readFileSync("./db/reportsWeather.json", "utf-8")
    );
    data.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    // console.log(data)
    await queryInterface.bulkInsert("WeatherReports", data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete("WeatherReports", null, {})
  }
};
