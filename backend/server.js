require('dotenv').config(); // For environment variables
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const connectDB = require('./database'); // Database connection
const routes = require('./routes/routes'); // Assuming this is your routes file
const adminRoutes = require("./routes/admin"); // Path to admin.js

const app = express();

// CORS Configuration
// app.use(cors({
//     origin: process.env.NODE_ENV === 'production' 
//         ? process.env.PRODUCTION_CLIENT_URL  // Add this to your production env
//         : process.env.CORS_ORIGIN,
//     credentials: true
// }));    

const cors = require('cors');

app.use(cors({
    origin: "https://grants-phi.vercel.app", // Replace with your frontend URL
    credentials: true, // Allow cookies/sessions
}));



// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies

// Connect to Database
connectDB()
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.error('Database connection failed:', err));

// Define Routes
app.use('/api', routes); // Attach routes to '/api' endpoint
app.use("/api/admin", adminRoutes); // All admin routes prefixed with /api/admin

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Port Configuration
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;