require('express-router-group');

const express = require('express');

const router = express.Router();

const todosController = require('../controller/todos');

const isAuth = require('../middleware/is-auth');


//Todo Index
router.get('/', todosController.getSlash);

//Grouping router that required jwt token authentication => GET
router.group('/api', isAuth, router => {
    //Fetch all Todo
    router.get('/dashboard', todosController.getAllTodos);

    //Fetch Todo by id
    router.get('/todos/:id', todosController.getTodo)
    //=> POST
    //Post 1 or more Todo at a time
    router.post('/todo', todosController.postTodo);

    //Update todo
    router.get('/update-todo/:id', todosController.getUpdateTodo);

    //Update todo
    router.post('/update-todo', todosController.updateTodo);

    //Delete todo
    router.post('/delete-todo/:id', todosController.postDeleteTodo);

    //Dasboard
    router.get('/dasboard', todosController.getAllTodos);

    //Profile
    router.get('/profile', todosController.getProfile)
});


module.exports = router;