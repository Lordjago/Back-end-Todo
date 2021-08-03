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

module.exports = class Todo {
    constructor(what_do, when, period) {
        this.id = activities.length + 1;
        this.what_do = what_do;
        this.when = when;
        this.period = period;
    }

    save() {
        activities.push(this);
    }

     static fetchAll() {
        return activities;
    }

    static getById(activityId){
        const activity = activities.find(a => a.id === parseInt(activityId));
        return activity || null;
    }

     static updateTodo(activityId, infoToUpdate) {
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

    static deleteTodo(activityId) {
        const activity = activities.find(a => a.id === parseInt(activityId) );
        //Delete Record from todo.
        const index = activities.indexOf(activity);

        activity.splice(index, 1);
        console.log(activity);
        ///Retrun updated activities
        return activities;

    };
}

// module.exports = new Todo;