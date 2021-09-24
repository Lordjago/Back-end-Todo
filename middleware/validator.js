const { check, validationResult } = require('express-validator');

let register = [
    check("first_name").not().isEmpty().withMessage("Name is empty"),
    check("first_name").isLength({ min: 6 }).withMessage("Name too short"),

    check("last_name").not().isEmpty().withMessage("Name is empty"),
    check("last_name").isLength({ min: 6 }).withMessage("Name too short"),

    check("email").not().isEmpty().withMessage("Email is empty"),
    check("email").isEmail().normalizeEmail().withMessage("Invalid Email"),
    check("email").isLength({ min: 5 }).withMessage("Email too short, < 5"),

    check("password").not().isEmpty().withMessage("password is empty"),
    check("password").isLength({ min: 5 }).withMessage("password too short < 5"),

    check("confirm_password").not().isEmpty().withMessage("Confirm Password is empty"),
    check("confirm_password").isLength({ min: 5 }).withMessage("Confrim Password too short < 5")
];

let login = [
    check("email").not().isEmpty().withMessage("Email is empty"),
    check("email").isEmail().normalizeEmail().withMessage("Invalid Email"),
    check("email").isLength({ min: 5 }).withMessage("Email too short, < 5"),

    check("password").not().isEmpty().withMessage("password is empty"),
    check("password").isLength({ min: 5 }).withMessage("password too short < 5")
];

let create = [
    check("what_todo").not().isEmpty().withMessage("Task is empty"),
    check("what_todo").isLength({ min: 6 }).withMessage("Task too short"),

    check("when").not().isEmpty().withMessage("Day is empty"),
    check("when").isLength({ min: 6 }).withMessage("Day too short"),

    check("period").not().isEmpty().withMessage("Time is empty"),
    check("period").isLength({ min: 6 }).withMessage("Time too short")
];

let update = [
    check("what_todo").not().isEmpty().withMessage("Task is empty"),
    check("what_todo").isLength({ min: 6 }).withMessage("Task too short"),

    check("when").not().isEmpty().withMessage("Day is empty"),
    check("when").isLength({ min: 6 }).withMessage("Day too short"),

    check("period").not().isEmpty().withMessage("Time is empty"),
    check("period").isLength({ min: 6 }).withMessage("Time too short")

];

let forgetPassword = [
    check("email").not().isEmpty().withMessage("Email is empty"),
    check("email").isLength({ min: 5 }).withMessage("Email too short, < 5"),
    check("email").isEmail().normalizeEmail().withMessage("Invalid Email")
];

let resetPassword = [
    check("token").not().isEmpty().withMessage("Token cannot be empty"),
    check("password").not().isEmpty().withMessage("password is empty"),
    check("password").isLength({ min: 5 }).withMessage("password too short < 5")
];



module.exports = {
    register: register,
    login: login,
    create: create,
    update: update,
    forgetPassword: forgetPassword,
    resetPassword: resetPassword
}
