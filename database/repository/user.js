"use strict"

const UserModel = require('../model/users');

class User {

    static async signUp (data){
        UserModel.findOne({email: data.email})
        .then((userData) => {
            return userData
        })
        .catch((err) => {
            console.log(err);
        })
    }

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

module.exports = User