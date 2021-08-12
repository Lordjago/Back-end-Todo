const express = require('express');

const router = express.Router();

const todosController = require('../controller/todosController')

//Todo Index
router.get('/', todosController.getSlash );

//Fetch all Todo
router.get('/api/todos', todosController.getAllTodos);

//Fetch Todo by id
router.get('/api/todos/:id', todosController.getTodo);

//Post 1 or more Todo at a time
router.post('/api/todo', todosController.postTodo);

//Update todo
router.post('/api/todo/:id', todosController.updateTodo);

//Delete todo
router.delete('/api/todo/:id', todosController.deleteTodo);

module.exports = router;