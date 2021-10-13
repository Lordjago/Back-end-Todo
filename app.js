const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

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

// app.use((error, req, res, next) => {
//     res.json({message: "An error occur"})
// })

const port = process.env.PORT || 8080;

mongoose.connect(process.env.CONNECTION_STRING)
.then((result) => {
    console.log('Database Connection Successful');
    app.listen(port, console.log(`Listening to ${port}`));
})
.catch((err) => {
    console.log(err);
});

