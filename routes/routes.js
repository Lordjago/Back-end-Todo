require('express-router-group');

const express = require('express');

const router = express.Router();

const {
    create,
    update
} = require('../middleware/validator');

const pagination = require('../utils/pagination');

const todosController = require('../controller/todos');

const isAuth = require('../middleware/is-auth');


//Todo Index
router.get('/', todosController.getSlash);

//Grouping router that required jwt token authentication => GET
router.group('/api', router => {

    router.get('/', todosController.getSlash);
    //Fetch all Todo
    router.get('/dashboard',isAuth, pagination(), todosController.getAllTodos);

    //Fetch Todo by id
    router.get('/todos/:id',isAuth, todosController.getTodo)
    //=> POST
    //Post 1 or more Todo at a time
    router.post('/todo',isAuth, create, todosController.postTodo);

    //Update todo
    router.get('/update-todo/:id',isAuth, todosController.getUpdateTodo);

    //Update todo
    router.post('/update-todo',isAuth, update, todosController.updateTodo);

    //Delete todo
    router.post('/delete-todo/:id',isAuth, todosController.postDeleteTodo);

    //Dasboard
    router.get('/dasboard', isAuth, todosController.getAllTodos);

    //Profile
    router.get('/profile', isAuth, todosController.getProfile)
});


module.exports = router;