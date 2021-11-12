const { Router } = require('express');
const ErrorResponse = require('../classes/error-response');
const User = require('../dataBase/models/User.model');
const { asyncHandler, requireToken } = require('../middlewares/middlewares');

const router = Router();

function initRoutes() {
    router.get('/', asyncHandler(requireToken), asyncHandler(getUserByToken));
    router.patch('/', asyncHandler(requireToken), asyncHandler(updateUserInfo));
    router.post('/', asyncHandler(requireToken), asyncHandler(logoutUser));
}

async function getUserByToken(req, res, next) {
    const user = await User.findOne({
        where:
        {
            id: req.fToken.userId,
        }
    });

    res.status(200).json(user)
}

async function updateUserInfo(req, res, next) {
    const fUser = await User.findOne({
        where:
        {
            id: req.fToken.userId,
        }
    });

    if (!fUser) {
        throw new ErrorResponse("User is not found", 404);
    }

    await fUser.update(req.body)

    res.status(200).json(fUser);
}

async function logoutUser(req, res, next) {
    await req.fToken.destroy();

    res.status(200).json({message: "logout is sucessfull"});
}

initRoutes()

module.exports = router;
