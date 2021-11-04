const ErrorResponse = require("../classes/error-response");
const Token = require("../dataBase/models/Token.model");

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const syncHandler = (fn) => (req, res, next) => {
    try {
        fn(req, res, next);
    } catch (error) {
        next(error);
    }
};

const requireToken = (fn) => (req, res, next) => {
    let token = req.body.token;

    if (!token) {
        next(new ErrorResponse("Token is not found", 404))
    }

    token = Token.findOne({
        where: {
            value: token
        }
    });

    delete req.body.token

    req.user_id= token.user_id

    console.log('BODY', req.body);
    fn(req, res, next);
}

const notFound = (req, _res, next) => {
    next(new ErrorResponse(`Not found - ${req.originalUrl}`, 404));
};

const errorHandler = (err, _req, res, _next) => {
    console.log('Ошибка', {
        message: err.message,
        stack: err.stack,
    });
    res.status(err.code || 500).json({
        message: err.message
    });
};

module.exports = {
    asyncHandler,
    syncHandler,
    notFound,
    errorHandler,
    requireToken,
};