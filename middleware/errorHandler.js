const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        err.message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`;
        err.statusCode = 409;
        err.status = 'fail';
    }

    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(el => el.message);
        err.message = `Invalid input details: ${errors.join('. ')}`;
        err.statusCode = 400;
        err.status = 'fail';
    }

    if (err.name === 'CastError') {
        err.statusCode = 400;
        err.status = 'fail';
        err.message = `Invalid format for field: ${err.path}`;
    }

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        data: null
    });
};

module.exports = errorHandler;