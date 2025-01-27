const { MongoClient } = require('mongodb');

async function connectDB() {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log('Connected to MongoDB!');
    return client;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

module.exports = { connectDB };
