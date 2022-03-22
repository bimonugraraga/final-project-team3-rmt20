const {MongoClient} = require('mongodb')
const uri = "mongodb+srv://rdz:mongodb@cluster0.me63p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const client = new MongoClient(uri)
let db
async function connectMongo(){
  try {
    const connection = await client.connect()
    db = connection.db('Final-Project')
  } catch (error) {
    throw error
  }
}

function getDatabase(){
  return db
}

module.exports = {connectMongo, getDatabase}