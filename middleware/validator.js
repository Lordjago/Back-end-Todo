const { check, validationResult } = require('express-validator');

let userValidationRulesSignup = [
    check("first_name").not().isEmpty().withMessage("Name is empty"),
    check("first_name").isLength({ min: 6 }).withMessage("Name too short"),

    check("last_name").not().isEmpty().withMessage("Name is empty"),
    check("last_name").isLength({ min: 6 }).withMessage("Name too short"),

    check("email").not().isEmpty().withMessage("Email is empty"),
    check("email").isEmail().withMessage("Invalid Email"),
    check("email").isLength({ min: 5 }).withMessage("Email too short, < 5"),

    check("password").not().isEmpty().withMessage("password is empty"),
    check("password").isLength({ min: 5 }).withMessage("password too short < 5"),

    check("confirm_password").not().isEmpty().withMessage("Confirm Password is empty"),
    check("confirm_password").isLength({ min: 5 }).withMessage("Confrim Password too short < 5")
];

module.exports = userValidationRulesSignup;