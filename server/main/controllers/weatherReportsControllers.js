const { User, WeatherReport } = require("../models");
const { Op } = require("sequelize");
class ReportController {
  static async getAllWeatherReport(req, res, next) {
    // console.log("GET ALL WEATHER REPORT")
    let todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + 1);
    let agoDate = new Date();
    agoDate.setDate(agoDate.getDate() - 7);
    // console.log(todayDate, agoDate, "<<<<<")
    try {
      let allWeatherReport = await WeatherReport.findAll({
        include: {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        where: {
          createdAt: {
            [Op.between]: [agoDate, todayDate],
            },
          },
        },
      });

      // let allWeatherReport = await sequelize.query('SELECT *')

      // console.log(allWeatherReport)
      res.status(200).json(allWeatherReport);
    } catch (error) {
      next(error)
    }
  }

  static async getOneWeatherReport(req, res, next) {
    
    let { id } = req.params;
    try {
      let oneWeatherReport = await WeatherReport.findOne({
        include: {
          model: User,
          attribute: {
            exclude: ["password"],
          },
        },
        where: {
          id,
        },
      });

      if (!oneWeatherReport) {
        throw{
          name: "NOT FOUND",
          code: 404,
          message: "Weather Report Not Found!"
        }
        
      }

      res.status(200).json(oneWeatherReport);
    } catch (error) {
      next(error)
    }
  }

  static async postWeatherReport(req, res, next) {
    // console.log("POST WEATHER REPORT")
    let { id } = req.loggedUser;
    let { status, description, photoUrl, coordinate, temperature, uvi, pressure, humidity, windspeed, weatherMain, weatherDesc, weatherIcon } = req.body;
    // console.log(req.body)

    try {
      await WeatherReport.create({
        status,
        description,
        photoUrl,
        coordinate,
        temperature,
        uvi,
        pressure,
        humidity,
        windspeed,
        weatherMain,
        weatherDesc,
        weatherIcon,
        UserId: id,
      });

      res.status(201).json({ message: "Laporan telah berhasil dibuat" });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ReportController;
