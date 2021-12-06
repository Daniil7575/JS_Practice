const { Router } = require('express');
const { Op } = require('sequelize');
const ErrorResponse = require('../classes/error-response');
const User = require('../dataBase/models/User.model');
const { asyncHandler} = require('../middlewares/middlewares');
const { nanoid } = require('nanoid')
const Token = require('../dataBase/models/Token.model');

const router = Router();

function initRoutes() {
    router.post('/login', asyncHandler(loginUser));
    router.post('/registration', asyncHandler(regUser));
}

async function loginUser(req, res, next) {
    const enteredUser = await User.findOne({
        where: {
            login: req.body.login,
            password: req.body.password
        }
    });

    if (!enteredUser) {
        throw new ErrorResponse("Incorrect login or password", 404);
    }

    const token = await Token.create({ userId: enteredUser.id, value: nanoid(128) })
    res.status(200).json({accessToken: token.value});
}

async function regUser(req, res, next) {
    const existingUser = await User.findOne({
        where: {
            [Op.or]: [
                { login: req.body.login },
                { email: req.body.email }]
        }
    });

    if (existingUser) {
        throw new ErrorResponse("Login or email is already in use", 404);
    }

    const newUser = await User.create(req.body);

    res.status(200).json(newUser);
}

initRoutes();

module.exports = router;