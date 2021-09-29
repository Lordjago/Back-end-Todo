"use strict"

const TodoModel = require('../model/todos');

const UserModel = require('../model/users')

class Todo {
    static async getAll() {
        return await TodoModel.find()
            .sort({ id: -1 })
            .exec()
    }

    static async findInfoById(id) {
        return await TodoModel.findById(id)
            .lean()
            .exec()
    }

    static async create(id, info) {
        UserModel.findById(id).
            then((user) => {
                user.tasks.activities.push({ task: info.task, day: info.day, time: info.time })
                return user.save();
                console.log(user.tasks.activities);
            })
        // const createTask = new TodoModel({
        //     task: info.task,
        //     day: info.day,
        //     time: info.time
        // })
        // return createTask.save();
    }

    static async update(id, updatedInfo) {
        const update = await TodoModel.findByIdAndUpdate(id,
            {
                $set: updatedInfo
            },
            {
                new: true
            });
        return update;
    }

    static async delete(id) {
        return await TodoModel.findByIdAndRemove(id).exec();

    }

}

module.exports = Todo