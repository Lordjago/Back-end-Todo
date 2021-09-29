require('express-router-group');

const express = require('express');

const router = express.Router();

const {
    create,
    update
} = require('../helpers/validator');

const pagination = require('../utils/pagination');

const todosController = require('../controller/todos');

const {verifyToken, verifyTokenAndAuthorization} = require('../helpers/is-auth');


//Todo Index
router.get('/', todosController.getSlash);

//Grouping router that required jwt token authentication => GET
router.group('/api', router => {

    router.get('/', verifyToken, todosController.getSlash);
    //Fetch all Todo isAuth, pagination(),
    router.get('/todos', verifyToken, todosController.getAllTodos);

    //Fetch Todo by idisAuth,
    router.get('/todos/:id', verifyToken, todosController.getTodo)
    //=> POST
    //Post 1 or more Todo at a time 
    router.post('/todo',verifyTokenAndAuthorization, create, todosController.postTodo);

    //Update todoisAuth,
    router.get('/update-todo', verifyToken, todosController.getUpdateTodo);

    //Update todo
    router.post('/update-todo/:id', verifyTokenAndAuthorization, update, todosController.updateTodo);

    //Delete todoisAuth,
    router.post('/delete-todo/:id', todosController.postDeleteTodo);

    //Dasboard
    // router.get('/dasboard', isAuth, todosController.getAllTodos);

    //Profile
    // router.get('/profile', isAuth, todosController.getProfile)
});


module.exports = router;