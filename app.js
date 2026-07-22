require('dotenv').config();
const appConfig = require('./config/app.config');
const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./db/connectDB');

const categoryRouter = require('./routes/category.routes');
// const productRouter = require('./routes/product.routes');
// const cartRouter = require('./routes/cart.routes');
// const orderRouter = require('./routes/order.routes');
const AppError = require('./utils/AppError');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    Object.defineProperty(req, 'query', {
        value: req.query,
        writable: true,
        configurable: true,
        enumerable: true,
    });
    next();
});
app.use(mongoSanitize());

app.use('/api/categories', categoryRouter);
// app.use('/api/products', productRouter);
// app.use('/api/cart', cartRouter);
// app.use('/api/orders', orderRouter);

app.use((req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

const startServer = async () => {
    await connectDB();
    app.listen(appConfig.port, () => {
        console.log(`🚀 Server up and roaring in ${appConfig.nodeEnv} mode on port ${appConfig.port}`);
    });
};

startServer();