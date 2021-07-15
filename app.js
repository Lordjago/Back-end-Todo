const express = require('express');

const app = express();

app.use(express.json());

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
app.get('/', (req, res) => {
    //Display a Dummy Message
    res.send("I'm Working");
});

//Fetch all Todo
app.get('/api/todo', (req, res) => {
    //Check if theres Element in the array of Activities
    //404 BAd- Request
    if (activities.length < 1) return res.status(404).send('No activity Found');
    //Return activities Array
    res.send(activities);
});

//Fetch Todo by id
app.get('/api/todo/:id', (req, res) => {
    //Look up if exist
    //404 BAd- Request
    const activity = activities.find(data => data.id === parseInt(req.params.id));
    if (!activity) return res.status(404).send('The ID you are looking for is not available');

    //Return activity if found
    res.send(activity);
});

//Post 1 or more Todo at a time
app.post('/api/todo', (req, res) => {
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
app.put('/api/todo/:id', (req, res) => {
    //Look up cos if it exist
    //If not retrun 404 - BAd Request
    const activity = activities.find(data => data.id === parseInt(req.params.id));
    if (!activity) return res.status(404).send('The ID you are looking for is not available');

    //Update if Exist
    activity.period = req.body.period;
    res.send(activity);

});

//Delete todo
app.delete('/api/todo/:id', (req, res) => {
    //Look up cos if it exist
    //If not retrun 404 - BAd Request
    const activity = activities.find(data => data.id === parseInt(req.params.id));
    if (!activity) return res.status(404).send('The ID you are looking for is not available');

    //Delete Record from todo
    const index = activities.indexOf(activity);
    activities.splice(index, 1);

    //retrun updated activities
    res.send(activities);
});



const port = process.env.PORT || 3000;

app.listen(port, console.log(`Listening to ${port}`));