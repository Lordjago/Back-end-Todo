"use strict"

const TodoModel = require('../model/todos');

const UserModel = require('../model/users')

class Todo {
    static async getAll(filter) {
        return await TodoModel.find(filter)
            .sort({ id: -1 })
            .exec()
    }

    static async findInfoById(id) {
        return await TodoModel.findById(id)
            .lean()
            .exec()
    }

    static async create(info) {
        const createTask = new TodoModel({
            task: info.task,
            day: info.day,
            time: info.time,
            userId: info.userId
        })
        return createTask.save();
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