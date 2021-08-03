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

class Todo {
    constructor(what_do, when, period) {
        this.id = activities.length + 1;
        this.what_do = what_do;
        this.when = when;
        this.period = period;
    }

    save() {
        activities.push(this);
    }

    fetchAll() {
        return activities;
    }

    getById(activityId){
        const activity = activities.find(a => a.id === parseInt(activityId));
        return activity || null;
    }

    updateTodo(activityId, infoToUpdate) {
        //Find activity if exist
        const activity = activities.find(a => a.id === parseInt(activityId));
        //If exist, Update
        if (activity) {
            activity.what_todo = infoToUpdate.what_todo;
            activity.when = infoToUpdate.when;
            activity.period = infoToUpdate.period;
            return activity;
        }   
       
    };
}

module.exports = new Todo;