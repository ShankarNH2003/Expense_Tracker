require('dotenv').config({ path: './config.env' }); 

const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        console.log("🔍 Connecting to:", process.env.MONGO_URL);
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ DB Connected');
    } catch (error) {
        console.error('❌ DB Connection Error:', error.message);
    }
};

module.exports = { db };
