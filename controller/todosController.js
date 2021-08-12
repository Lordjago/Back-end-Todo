const Todo = require('../model/todosModel');

//Slash routes
exports.getSlash = (req, res) => {
    //Display a Dummy Message
    res.send("I'm Working");
}

//fecth all todos
exports.getAllTodos = (req, res) => {
    
    Todo.fetchAll()
        .then((activities) => {
            //Check if theres Element in the array of Activities
            //404 BAd- Request
            if (activities.length === 0) return res.status(404).send('No activity Found');
            //Return activities Array
            res.send(activities);
        })
        .catch((err) => {
            console.log(err);
        });
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
            console.log(err);
        });
 
}

//Add todo to the array list of todos
exports.postTodo = (req, res) => {

    const what_todo = req.body.what_todo;
    const when = req.body.when;
    const period = req.body.period;

    const activity = new Todo (what_todo, when, period);
    activity.save()
    .then((activity) => {
        console.log('New Activity Added');
        console.log(activity);
    })
    .catch((err) => {
        console.log(err);
    });

    //Return the todo added
    res.send(activity);
}

//Update 
exports.updateTodo = (req, res) => {
    //Look up cos if it exist
    //If not retrun 404 - BAd Request
    const activityId = req.params.id;
    // const what_todo  = req.body.what_todo;
    // const when =  req.body.when;
    // const period =  req.body.period;
    //update with the requests
    Todo.updateTodo(activityId, 
         {what_todo : req.body.what_todo,
         when : req.body.when,
         period : req.body.period})

    // const activity = new Todo(updatedInfo.what_todo, updatedInfo.when, updatedInfo.period, activityId);
    // activity.save()
        .then((activity) => {
            console.log(activity);
            res.send(`${activity.modifiedCount} document(s) was/were updated`);
        })
        .catch((err) => {
            console.log(err);
        })
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
exports.deleteTodo = (req, res) => {
    //Look up cos if it exist
    //If not retrun 404 - BAd Request
    const activityId = req.params.id;
    Todo.deleteTodo(activityId)
    .then((result) => {
        res.send('Delete Successful');
    })
    
    // if (!act) return res.status(404).send('The ID you are looking for is not available');

    //Delete Record from todo.
//     const index = activity.indexOf(act);
//     activity.splice(index, 1);

//     //Retrun updated activities
//     res.send(activity);
}