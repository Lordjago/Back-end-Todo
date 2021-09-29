const TodoRepo = require('../database/repository/todo');

const errorType = require('../core/errorType')

const { check, validationResult } = require('express-validator');

//Slash routes
exports.getSlash = (req, res) => {
    res.json({
        message: "This routes is Working"
    });
}
//fecth all todos
exports.getAllTodos = (req, res) => {
    //Fetch all todo
    try {
        TodoRepo.getAll({userId : req.user.user_id})
        .then((data) => {
            //Check if theres Element in the array of Activities
            //404 BAd- Request
            if (data.length === 0) return res.status(404).json({
                errorType: errorType.NO_DATA,
                message:'No task Found'});
                res.json({Tasks:data})
        })
        
    } catch (error) {
        console.log(error);
    }
}

//Profile => GET
exports.getProfile = (req, res) => {
    //Fetch all todoe
    console.log(req.user.user_id);
    // const user_id = require('mongodb').ObjectID(req.user.user_id);
    // User.findById(user_id)
    //     .then((userData) => {
            // Check if theres Element in the array of Activities
            // 404 BAd- Request
            // if (activities.length === 0) return res.status(404).send('No activity Found');
            // Return activities Array
            // const { user_id, email } = req.user;
            // console.log(user_id, "|||", email)
            // res.send(activities);
            // console.log(userData);
            // res.render('user/profile', {
            //     title: "Profile",
            //     user: req.user

            // }
            // )
        // })
        // .catch((err) => {
        //     console.log(err);
        // });
}

//Fetch todos by id
exports.getTodo = (req, res) => {
    //Look up if exist
    //404 BAd- Request
    const taskId = req.params.id;
    try {
        TodoRepo.findInfoById(taskId)
        .then((task) => {
            if (task.user_id !== req.user.user_id ) {
                res.json({message: "Operation not allowed"})
            }
            //Check if theres Element in the array of Activities
            //404 BAd- Request
            if (!task) return res.status(404).json({
                errorType: errorType.NOIDFOUND,
                message: 'The ID you are looking for is not available'
            });
            //Return activities Array
            const {_id, ...others} = task
            res.send(others);
        })
    } catch (error) {
        console.log(`Error: ${error}`);
    }
 
}

// //Add todo to the array list of todos
exports.postTodo = (req, res) => {
    const task = req.body.task;
    const day = req.body.day;
    const time = req.body.time;

    //Formating eroor to only return msg => message
    const myValidationResult = validationResult.withDefaults({
        formatter: error => {
            return {
                message: error.msg,
            };
        },
    });
    let errors = myValidationResult(req);
    //Checck if all fields are filled 
    if (!errors.isEmpty()) return res.status(401).json({
        errorType: errorType.UNCOMPLETE,
        errors: errors.mapped()
    });
    //create a new Onject of Todos
    const info = {
        task,
        day,
        time,
        userId: req.user.user_id
    }
   try {
       TodoRepo.create(info)
           .then((data) => {
               res.json({ Task: data })
           })
   } catch (error) {
       console.log(error);
   }

}

exports.getUpdateTodo = (req, res) => {
    res.json({
        message: "Update Here"
    })
   
}

//Update 
exports.updateTodo = (req, res) => {
    //Look up cos if it exist
    //If not retrun 404 - BAd Request
    const taskId = require('mongodb').ObjectID(req.params.id);
    const task  = req.body.task;
    const day =  req.body.day;
    const time =  req.body.time;

    //Formating eroor to only return msg => message
    const myValidationResult = validationResult.withDefaults({
        formatter: error => {
            return {
                message: error.msg,
            };
        },
    });
    let errors = myValidationResult(req);
    //Checck if all fields are filled 
    if (!errors.isEmpty()) return res.status(401).json({
        errorType: errorType.UNCOMPLETE,
        errors: errors.mapped()
    });
    //update with the requests
    const updatedData = {
        task,
        day, 
        time
    }
    try {
        TodoRepo.update(taskId, updatedData)
        .then((task) => {
            res.json({updatedData: task});
        })
    } catch (error) {
        console.log(error);
    }
  
}

//Delete
exports.postDeleteTodo = (req, res) => {
    //Look up cos if it exist
    //If not retrun 404 - BAd Request
    const taskId = req.params.id;
    //Destroy or remove Todo with the ID from the database
    try {
        TodoRepo.delete(taskId)
        .then((task) => {
            if (task.user_id !== req.user.user_id) {
                res.json({ message: "Operation not allowed" })
            }
            if (!task) return res.status(404).json({
                errorType: errorType.NOIDFOUND,
                message: 'The ID you are looking for is not available'
            });
            return res.json({
                message: "Delete Successfull",
                Deleled_Task: task
            })
        })
    } catch (error) {
        console.log(error);
    }

}