const Todo = require('../model/todos');

const { check, validationResult } = require('express-validator');

//Slash routes
exports.getSlash = (req, res) => {
    //Display a Dummy Message
    res.redirect('/auth/login');
    // res.json({
    //     message: "This routes is Working",
    //     // user: req.user.email
    // });
}


// //fecth all todos
exports.getAllTodos = (req, res) => {
    //Fetch all todoe
    Todo.find()
        .then((activities) => {
            //Check if theres Element in the array of Activities
            //404 BAd- Request
            // if (activities.length === 0) return res.status(404).send('No activity Found');
            //Return activities Array
            // const { user_id, email } = req.user;
            // console.log(user_id, "|||", email)
            // res.send(activities);
            res.render('user/dashboard', {
                title: "Dashboard",
                editing: false,
                user: req.user,
                activities: res.pagination,
                hasActivities: activities.length > 0

            }
            )
        })
        .catch((err) => {
            console.log(err);
        });
}

//Profile => GET
exports.getProfile = (req, res) => {
    //Fetch all todoe
    // Todo.find()
    //     .then((activities) => {
            //Check if theres Element in the array of Activities
            //404 BAd- Request
            // if (activities.length === 0) return res.status(404).send('No activity Found');
            //Return activities Array
            // const { user_id, email } = req.user;
            // console.log(user_id, "|||", email)
            // res.send(activities);
            res.render('user/profile', {
                title: "Profile",
                user: req.user

            }
            )
        // })
        // .catch((err) => {
        //     console.log(err);
        // });
}

//Fetch todos by id
exports.getTodo = (req, res) => {
    //Look up if exist
    //404 BAd- Request
    const activityId = req.params.id;
    Todo.findById(activityId)
        .then((activity) => {
            //Check if theres Element in the array of Activities
            //404 BAd- Request
            if (!activity) return res.status(404).send('The ID you are looking for is not available');
            //Return activities Array
            res.send(activity);
        })
        .catch((err) => {
            console.log(`Error: ${err}`);
        });
 
}

// //Add todo to the array list of todos
exports.postTodo = (req, res) => {
    const what_todo = req.body.what_todo;
    const when = req.body.when;
    const period = req.body.period;

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
    if (!errors.isEmpty()) return res.status(401).json({errors: errors.mapped()});
    //create a new Onject of Todos
    const activity = new Todo ({
        what_todo: what_todo,
        when: when,
        period: period
    });
    //Save todo into the databsse
    activity.save()
    .then((activity) => {
        //Success Message
        // console.log('New Activity Added');
        // console.log(activity);
        res.redirect('/api/dashboard?page=1&limit=3')
    })
    .catch((err) => {
        console.log(err);
    });

    //Return the todo added
    // res.send(activity);
}

exports.getUpdateTodo = (req, res) => {
    const editMode = req.query.edit
    if (editMode !== "true") {
        res.redirect('/api/dashboard');
    }
    //convert id to mongodb object
    const id = require('mongodb').ObjectID(req.params.id);
    console.log(id);
    Todo.findById(id)
    .then((activities) => {
        console.log(activities);
        return res.render('user/dashboard', {
        editing: editMode,
        title: "Update Todo",
        activities: activities,
        hasActivities: false
        
    }
    )
    })
    .catch((err) => {
        console.log(err);
    })
   
}

//Update 
exports.updateTodo = (req, res) => {
    //Look up cos if it exist
    //If not retrun 404 - BAd Request
    const activityId = require('mongodb').ObjectID(req.body.id);
    const what_todo  = req.body.what_todo;
    const when =  req.body.when;
    const period =  req.body.period;

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
    if (!errors.isEmpty()) return res.status(401).json({ errors: errors.mapped() });
    //update with the requests
    Todo.findById(activityId)
    .then((todo) => {
        todo.what_todo = what_todo,
        todo.when = when,
        todo.period = period
        //save the updated todo
        return todo.save();
    })
    .then((result) => {
        // console.log(result);
        res.status(201).redirect('/api/dashboard');
    })
    .catch((err) => {
        console.log(err);
    });

    // const activityToUpdate = Activity.updateTodo(activityId, info);
    // // console.log(activityToUpdate);
    // if (!activityToUpdate) res.status(404).send('The ID you are looking for is not available');
    //  res.send(activityToUpdate);

    //or
    // const activity = Activity.fetchAll();
    // const act = activity.find(data => data.id === parseInt(req.params.id));
    // if (!act) return res.status(404).send('The ID you are looking for is not available');

    //Update if Exist
    // act.period = req.body.period;
    // res.send(act);

}

//Delete
exports.postDeleteTodo = (req, res) => {
    //Look up cos if it exist
    //If not retrun 404 - BAd Request
    const activityId = req.params.id;
    //Destroy or remove Todo with the ID from the database
    Todo.findByIdAndRemove(activityId)
    .then((result) => {
        // res.send('Delete Successful');
        res.redirect('/api/dashboard')
    })
    
    // if (!act) return res.status(404).send('The ID you are looking for is not available');

    //Delete Record from todo.
//     const index = activity.indexOf(act);
//     activity.splice(index, 1);

//     //Retrun updated activities
//     res.send(activity);
}