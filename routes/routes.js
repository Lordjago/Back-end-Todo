const express = require('express');

const router = express.Router();

const todosController = require('../controller/todos')

//Todo Index
router.get('/', todosController.getSlash);

//Fetch all Todo
// router.get('/todos', todosController.getAllTodos);

//Fetch Todo by id
// router.get('/todos/:id', todosController.getTodo);

//Post 1 or more Todo at a time
// router.post('/todo', todosController.postTodo);

//Update todo
// router.post('/todo/:id', todosController.updateTodo);

//Delete todo
// router.delete('/todo/:id', todosController.deleteTodo);

module.exports = router;