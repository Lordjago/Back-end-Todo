const express = require('express');

const MONGO_URI = require('./config').connection_string;

const app = express();

app.use(express.json());

const appRoutes = require('./routes/routes');

const authRoutes = require('./routes/auth');
const mongoose = require('mongoose');

app.use('/api/', appRoutes);

app.use('/api/', authRoutes);


const port = process.env.PORT || 8080;

mongoose.connect(MONGO_URI)
.then((result) => {
    console.log('Connection Success');
    app.listen(port, console.log(`Listening to ${port}`));
})
.catch((err) => {
    console.log(err);
});
// mongoConnect(()=> {
//     
// });
