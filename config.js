'use strict';
//Configuration file
const dotenv = require('dotenv');

dotenv.config();

const {
    CONNECTION_STRING
} = process.env;

module.exports = {
    connection_string: CONNECTION_STRING
}