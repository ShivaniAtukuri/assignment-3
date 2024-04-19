const MongoClient = require('mongodb').MongoClient;

async function createMongoClient() {
  // get secret from .env
  const url = process.env.MONGO_URI;
  const dbName = 'inventory';
  
  // get session
  const dbInstance = await MongoClient.connect(url)
  return dbInstance.db(dbName);
}

module.exports = createMongoClient;