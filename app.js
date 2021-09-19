const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const MONGO_URI = require('./config').connection_string;

const error = require('./controller/404');

const app = express();

app.set('view engine', 'ejs');

app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'views')))

app.use(express.json());

const appRoutes = require('./routes/routes');

const authRoutes = require('./routes/auth');
const mongoose = require('mongoose');

app.use(appRoutes);

app.use(authRoutes);

app.use('/', error.get404);

const port = process.env.PORT || 3000;

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
