
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

let client;
let database;

async function connectToDatabase() {
  if (database) return database;
  
  try {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    await client.connect();
    console.log('Connected successfully to MongoDB Atlas');
    
    database = client.db(dbName);
    return database;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Use fallback data in case of connection issues
    throw error;
  }
}

module.exports = {
  connectToDatabase,
  getDatabase: () => database,
};
