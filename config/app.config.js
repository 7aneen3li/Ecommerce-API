require('dotenv').config();

const appConfig = {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    mongoUri: process.env.MONGO_URI,
};

if (!appConfig.mongoUri) {
    console.error('❌ CRITICAL ERROR: MONGO_URI is missing in your .env file!');
    process.exit(1);
}

module.exports = appConfig;