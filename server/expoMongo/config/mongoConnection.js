const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// let db;
async function connectMongo() {
  try {
    const connection = await client.connect();
    db = connection.db("Final-Project");
  } catch (error) {
    throw error;
  }
}

function getDatabase() {
  return db;
}

module.exports = { connectMongo, getDatabase };
