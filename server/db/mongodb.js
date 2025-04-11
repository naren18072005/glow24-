
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || 'glow24_organics';

let client;
let database;

async function connectToDatabase() {
  if (database) return database;
  
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log(`Database name: ${dbName}`);
    console.log(`Connection string: ${uri}`);
    
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    await client.connect();
    console.log('Connected successfully to MongoDB');
    
    database = client.db(dbName);
    return database;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.error('Full error stack:', error.stack);
    throw error;
  }
}

module.exports = {
  connectToDatabase,
  getDatabase: () => database,
};
