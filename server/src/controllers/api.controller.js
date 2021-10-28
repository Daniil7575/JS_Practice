const { Router } = require('express');
const ErrorResponse = require('../classes/error-response');
const ToDo = require('../dataBase/models/Todo.model.js');
const { asyncHandler } = require('../middlewares/middlewares');


const router = Router();

function initRoutes(){
    router.get("/", asyncHandler(getToDos))
}

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

async function createToDoById(req, res, next){
    const todo = await ToDo.create(req.body);

    res.status(200).json(todo);
}

async function deleteToDoById(req, res, next){
    const todo = await ToDo.findByPk(req.params.id);

    if (!todo){
        throw new ErrorResponse('No todo found', 404);
    }
    
    await todo.destroy();

    res.status(200).json(todo);
}

async function deleteToDos(req, res, next){
    await ToDo.destroy({
        truncate: true
    });
}

async function updateToDo(req, res, next){
    const todo = await ToDo.find(req.body);

    if (!todo){
        throw new ErrorResponse('Update error', 404);
    }
    res.status(200).json(todo);
}

module.exports = router;