const { Router } = require('express');
const ErrorResponse = require('../classes/error-response');
const ToDo = require('../dataBase/models/Todo.model.js');
const { asyncHandler } = require('../middlewares/middlewares');


const router = Router();

async function getToDos(req, res, next) {
    const todos = await ToDo.findAll();

    res.status(200).json({ todos });
}

async function getToDoById(req, res, next) {
    const todo = await ToDo.findByPk(req.params.id);

    if (!todo) {
        throw new Error();
    }

    res.status(200).json(todo);
}

module.exports = router;