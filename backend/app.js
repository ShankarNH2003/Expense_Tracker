require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { db } = require('./db'); // Ensure db.js correctly connects MongoDB
const { readdirSync } = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Routes
readdirSync('./routes').forEach((route) => {
    app.use('/api/v1', require(`./routes/${route}`));
});

// Start server
const startServer = async () => {
    try {
        await db(); // Ensure DB connection before starting the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
};

startServer();
