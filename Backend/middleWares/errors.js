const ErrorHandler = require("../utils/errorHandler");

const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    if(err.name==="CastError"){
        const message=`content not found ${err.path}`
        err=new ErrorHandler(message, 400);
    }
    res.status(err.statusCode).json({
        success: false,
        statusCode: err.statusCode,
        message: err.message
    });
};

module.exports = {errorMiddleware};
