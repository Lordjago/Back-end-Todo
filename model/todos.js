const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    what_todo: {
        type: String,
        required: true
    },
    when: {
        type: String,
        required: true
    },
    period: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Todos', todoSchema);


// const getDb = require('../utils/db').getDb;

// const mongodb = require('mongodb');

// module.exports = class Todo {
//     constructor(what_do, when, period) {
//         this.what_do = what_do;
//         this.when = when;
//         this.period = period;
//     }

//     save() {
//         const db = getDb();
//         return db.collection('activities').insertOne(this)
//         .then((result) => {
//             // console.log(`${result.insertedCount} has been created with the following id(s): `);
//             // console.log(result.insertedId);
//             return result;
//         })
//         .catch((err) => {
//             console.log(err);
//             throw err;
//         });
        
//     }

//      static fetchAll() {
//          const db = getDb();
//          const result = db.collection('activities').find();
//         return result.toArray()
//          .then((result) => {
//              console.log(result);
//              return result;
//          })
//          .catch((err) => {
//              console.log(err);
//          })
        
//     }

//     static findById(activityId){
//         const db = getDb();
//         return db.collection('activities').findOne({_id: new mongodb.ObjectId(activityId)})
//         .then((activity) => {
//             console.log(activity);
//             return activity;
//         })
//         .catch((err) => {
//             console.log(err);
//         })
//     }

//      static updateTodo(activityId, updatedInfo) {
//         //Find activity if exist
//         const db = getDb();
//          return db.collection('activities').updateOne(
//              { 
//                  _id: new mongodb.ObjectId(activityId) 
                
//             },
//             {
//                     what_todo:updatedInfo.what_todo, 
//                     when:updatedInfo.when, 
//                     period:updatedInfo.period
//                 }
//             )
//             .then((activity) => {
//                 console.log(activity);
//                 return activity;
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
       
//     };

//     static deleteTodo(activityId) {
//         const db = getDb();
//         return db
//             .collection('activities')
//             .deleteOne({ _id: new mongodb.ObjectId(activityId) })
//             .then(result => {
//                 console.log(`${result.deletedCount} document(s) was/were deleted`);
//                 return result;
//             })
//             .catch(err => {
//                 console.log(err);
//             });

//     };
// }

