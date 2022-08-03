const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    let error = {...err};
    error.message = err.message;
    error.statusCode = err.statusCode;

    // console.log("BACKEND ERROR - ", err.name);

    if(err.name === "ValidationError") {
        const message = Object.values(err.errors).map((value) => value.message)
        error.message = message;
        error.statusCode = 400;
    }


    res.status(error.statusCode).json({
        success: false,
        error: error.message,
    })
}