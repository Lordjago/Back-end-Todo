"use strict"

const UserModel = require('../model/users');

export default class User {
     static async findById (id) {
        return UserModel.findById(id)
        .lean()
        .exec();
     }
    static async findByEmail(email) {
        return UserModel.findOne(email)
            .lean()
            .exec();
    }
}