'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WeatherReports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      photoUrl: {
        allowNull: true,
        type: Sequelize.STRING
      },
      coordinate: {
        allowNull: false,
        type: Sequelize.STRING
      },
      temperature: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      uvi: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      pressure: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      humidity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      windspeed: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      weatherMain: {
        allowNull: false,
        type: Sequelize.STRING
      },
      weatherDesc: {
        allowNull: false,
        type: Sequelize.STRING
      },
      weatherIcon: {
        allowNull: false,
        type: Sequelize.STRING
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('WeatherReports');
  }
};