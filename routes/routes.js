require('express-router-group');

const express = require('express');

const router = express.Router();

const todosController = require('../controller/todos');

const isAuth = require('../middleware/is-Auth');


//Todo Index
router.get('/', todosController.getSlash);

//Grouping router that required jwt token authentication => GET
router.group('/api', isAuth, router => {
    //Fetch all Todo
    router.get('/todos', todosController.getAllTodos);

    //Fetch Todo by id
    router.get('/todos/:id', todosController.getTodo);

});

//Grouping router that required jwt token authentication => POST
router.group('/api', isAuth, router => {
    //Post 1 or more Todo at a time
    router.post('/todo', todosController.postTodo);

    //Update todo
    router.post('/todo/:id', todosController.updateTodo);

    //Delete todo
    router.post('/delete_todo/:id', todosController.postDeleteTodo);
});


module.exports = router;