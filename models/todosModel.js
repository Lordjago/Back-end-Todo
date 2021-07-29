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
    constructor(what_do, when, period){
        this.id = activities.length + 1;
        this.what_do = what_do;
        this.when = when;
        this.period = period;
    }

    save(){
        activities.push(this);
    }

    static fetchAll(){
        return activities;
    }
}