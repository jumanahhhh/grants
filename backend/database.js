const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to Atlas');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;


// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGODB_URI);
        
//         console.log('\n----- Database Connection Info -----');
//         console.log(`Connected to MongoDB Atlas`);
//         console.log(`Host: ${conn.connection.host}`);
//         console.log(`Database Name: ${conn.connection.db.databaseName}`);
        
//         // List all collections
//         const collections = await conn.connection.db.listCollections().toArray();
//         console.log('Collections:', collections.map(c => c.name).join(', '));
//         console.log('---------------------------------\n');

//     } catch (error) {
//         console.error('MongoDB Connection Error:', error);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;