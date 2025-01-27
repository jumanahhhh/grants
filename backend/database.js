const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI; // Ensure this is set correctly in your .env file

async function connectDB() {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('MongoDB Connected!');
    return client;
  } catch (err) {
    console.error('Database connection error:', err);
    throw err; // Rethrow the error
  }
}

module.exports = connectDB; // Exporting the function directly
