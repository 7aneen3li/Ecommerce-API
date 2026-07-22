const mongoose = require('mongoose');
const appConfig = require('../config/app.config');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(appConfig.mongoUri);
        console.log(`📡 MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Database connection error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;