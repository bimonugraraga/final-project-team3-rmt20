const {User, WeatherReport} = require('../models')
class ReportController {
  static async getAllWeatherReport(req, res, next){
    console.log("GET ALL WEATHER REPORT")
    try {
      let allWeatherReport = await WeatherReport.findAll({
        include:{
          model: User,
          attribute :{
            exclude: ['password']
          },
        }
      })

      res.status(200).json(allWeatherReport)
    } catch (error) {
      res.status(500).json({"message": "Internal server error"})
    }
  }

  static async getOneWeatherReport(req, res, next){
    console.log("GET ONE WEATHER REPORT")
    let {id} = req.params
    try {
      let oneWeatherReport = await WeatherReport.findOne({
        include:{
          model: User,
          attribute :{
            exclude: ['password']
          },
        },
        where: {
          id
        }
      })

      if (!oneWeatherReport){
        res.status(404).json({message: "Weather Report Not Found!"})
        return
      }

      res.status(200).json(oneWeatherReport)
    } catch (error) {
      res.status(500).json({"message": "Internal server error"})
    }
  }

  static async postWeatherReport(req, res, next){
    console.log("POST WEATHER REPORT")
    let {id} = req.loggedUser
    let {
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
      weatherIcon
    } = req.body
    console.log(req.body)

    try {
      let newWeatherReport = await WeatherReport.create({
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
        UserId: id
      })

      res.status(201).json({message: 'Laporan telah berhasil dibuat'})
    } catch (error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'){
        res.status(400).json({"message":error.errors[0].message})
      } else{
  
        res.status(500).json({"message": "Internal server error"})
      }
    }
  }
}

module.exports = ReportController