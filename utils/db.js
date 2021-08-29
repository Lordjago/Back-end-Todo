const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const config = require('../config');

let _db;

const mongoConnect = (callback) => {
    //For connection and storing  the connection of the database
    MongoClient.connect(config.connection_string)
        .then(client => {
            console.log('Connected to Database');
            _db = client.db('Todo');
            callback(_db);
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

//return access to the database if it exist
const getDb = () => {
    if (_db) {
        return _db;
    }
    throw "No database found";
}

exports.mongoConnect = mongoConnect;

exports.getDb = getDb;
