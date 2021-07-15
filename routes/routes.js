const express = require('express');

const router = express.Router();


const activities = [
    {
        id: 1,
        what_todo: 'Start Learning how to Code',
        when: 'Monday',
        period: 'Morning'

    },
    {
        id: 2,
        what_todo: 'Go for a project survey',
        when: 'Monday',
        period: 'Evening'

    },
    {
        id: 3,
        what_todo: 'Analyse and Submit project survey',
        when: 'Tueday',
        period: 'Afternoon'

    },
];

//Todo Index
router.get('/', (req, res) => {
    //Display a Dummy Message
    res.send("I'm Working");
});

//Fetch all Todo
router.get('/api/todos', (req, res) => {
    //Check if theres Element in the array of Activities
    //404 BAd- Request
    if (activities.length < 1) return res.status(404).send('No activity Found');
    //Return activities Array
    res.send(activities);
});

//Fetch Todo by id
router.get('/api/todos/:id', (req, res) => {
    //Look up if exist
    //404 BAd- Request
    const activity = activities.find(data => data.id === parseInt(req.params.id));
    if (!activity) return res.status(404).send('The ID you are looking for is not available');

    //Return activity if found
    res.send(activity);
});

//Post 1 or more Todo at a time
router.post('/api/todo', (req, res) => {
    // // const activity = {
    // //     id: activities.length + 1,
    // //     what_todo: req.body.what_todo,
    // //     when: req.body.when,
    // //     period: req.body.period
    // // };
    // // activities.push(activity);
    // // res.send(activity)
    // let ids = 0; 
    // for (let i = 0; i < activities.length; i++) {
    //      ids = activities[i].id;
    //     // let last = lastIndexOf(ids);
    //     console.log(ids + 1);
    // }
    // return res.send(ids);

    const activity = {
        id: activities.length + 1,
        what_todo: req.body.what_todo,
        when: req.body.when,
        period: req.body.period
    };
    activities.push(activity);
    res.send(activity);
});

//Update todo
router.put('/api/todo/:id', (req, res) => {
    //Look up cos if it exist
    //If not retrun 404 - BAd Request
    const activity = activities.find(data => data.id === parseInt(req.params.id));
    if (!activity) return res.status(404).send('The ID you are looking for is not available');

    //Update if Exist
    activity.period = req.body.period;
    res.send(activity);

});

//Delete todo
router.delete('/api/todo/:id', (req, res) => {
    //Look up cos if it exist
    //If not retrun 404 - BAd Request
    const activity = activities.find(data => data.id === parseInt(req.params.id));
    if (!activity) return res.status(404).send('The ID you are looking for is not available');

    //Delete Record from todo.
    const index = activities.indexOf(activity);
    activities.splice(index, 1);

    //Retrun updated activities
    res.send(activities);
});


module.exports = router;