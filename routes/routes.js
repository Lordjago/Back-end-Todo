require('express-router-group');

const express = require('express');

const router = express.Router();

const {
    create,
    update
} = require('../helpers/validator');

const pagination = require('../utils/pagination');

const todosController = require('../controller/todos');

const isAuth = require('../helpers/is-auth');


//Todo Index
router.get('/', todosController.getSlash);

//Grouping router that required jwt token authentication => GET
router.group('/api', router => {

    router.get('/', todosController.getSlash);
    //Fetch all Todo isAuth, pagination(),
    router.get('/todos', todosController.getAllTodos);

    //Fetch Todo by idisAuth,
    router.get('/todos/:id', todosController.getTodo)
    //=> POST
    //Post 1 or more Todo at a timeisAuth, 
    router.post('/todo',create, todosController.postTodo);

    //Update todoisAuth,
    router.get('/update-todo', todosController.getUpdateTodo);

    //Update todo
    router.post('/update-todo/:id', update, todosController.updateTodo);

    //Delete todoisAuth,
    router.post('/delete-todo/:id', todosController.postDeleteTodo);

    //Dasboard
    // router.get('/dasboard', isAuth, todosController.getAllTodos);

    //Profile
    // router.get('/profile', isAuth, todosController.getProfile)
});


module.exports = router;