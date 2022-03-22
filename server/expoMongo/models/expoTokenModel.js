const {getDatabase} = require('../config/mongoConnection')
const {ObjectId} = require('mongodb')

class ExpoToken{
  static async findAll(){

    try {
      const db = getDatabase()
      let allExpoToken = await db.collection('ExpoTokens').find({}).toArray()
      return allExpoToken

    } catch (error) {
      
      return error
    }
  }

  static async create(payload){
    try {
      const db = getDatabase()
      let newData = await db.collection('ExpoTokens').insertOne(payload)
      let successPost = {
        ...payload,
        id: newData.insertedId
      }
      return successPost
    } catch (error) {
      return error
    }
  }

  static async findAndUpdate(payload){
    try {
      const db = getDatabase()
      let updatedCoor = await db.collection('ExpoTokens').findOneAndUpdate(
        {
          expoToken: payload.expoToken
        },
        {
          $set:{
            expoToken: payload.expoToken,
            recentCoordinates: payload.recentCoordinates
          }
        },
        {
          upsert: true,
          returnNewDocument: true
        }
      )
      return payload
    } catch (error) {
      console.log(error)
      return error
    }
  }

  static async findOne(expoToken){
    console.log(expoToken)
    try {
      const db = getDatabase()
      let findedExpo = await  db.collection('ExpoTokens').findOne({
        expoToken: expoToken
      })
      
      return findedExpo
    } catch (error) {
      return error
    }
  }
}

module.exports = ExpoToken