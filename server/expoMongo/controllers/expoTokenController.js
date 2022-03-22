const ExpoToken = require('../models/expoTokenModel')

class ExpoTokenController{
  static async getAllExpoToken(req, res, next){
    console.log("GET ALL EXPO TOKEN")
    try {
      let allExpoToken = await ExpoToken.findAll()
      if (Array.isArray(allExpoToken)){
        res.status(200).json(allExpoToken)

      } else {
        throw {
          code: 500,
          name: 'Server Error',
          message: 'Internal Server Error'
        }
      }
    } catch (error) {
      res.status(error.code).json({message: error.message})
    }
  }

  static async postExpoToken(req, res, next){
    console.log("POST EXPO TOKEN")
    let {expoToken, recentCoordinates} = req.body
    console.log(req.body)
    try {
      if (!expoToken || !recentCoordinates){
        throw {
          code: 400,
          name: 'Bad Request',
          message: "Coordinates And Expo Token Required!"
        }
      }

      let payload = {
        expoToken:  expoToken,
        recentCoordinates: recentCoordinates
      }

      let newData = await ExpoToken.findAndUpdate(payload)
      res.status(201).json(newData)
      
    } catch (error) {
      res.status(error.code).json({message: error.message})
    }
  }

  static async getOneExpoToken(req, res, next){
    // console.log(req.params)
    let {expoToken} = req.params
    try {
      let oneExpo = await ExpoToken.findOne(expoToken)
      if (!oneExpo){
        throw {
          code: 404,
          name: 'NOT FOUND',
          message: "Coordinates And Expo Token Not Found!"
        }
      }
      res.status(200).json(oneExpo)
    } catch (error) {
      res.status(error.code).json({message: error.message})
    }
  }
}

module.exports = ExpoTokenController