require('express-router-group');

const express = require('express');

const router = express.Router();

const todosController = require('../controller/todos');

const isAuth = require('../middleware/is-Auth');


//Todo Index
router.get('/', isAuth, todosController.getSlash);
//Grouping router that required jwt token authentication => GET
router.group('/api', isAuth, router => {
    //Fetch all Todo
    router.get('/todos', todosController.getAllTodos);

    //Fetch Todo by id
    // router.get('todos/:id', todosController.getTodo);

})
//Grouping router that required jwt token authentication => GET
router.group('/api', isAuth, router => {
    //Post 1 or more Todo at a time
    router.post('/todo', todosController.postTodo);

    //Update todo
    router.post('/todo/:id', todosController.updateTodo);

    //Delete todo
    // router.delete('/todo/:id', todosController.deleteTodo);
});


module.exports = router;