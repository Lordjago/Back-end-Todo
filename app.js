const express = require('express');

const mongoConnect = require('./utils/db').mongoConnect;

const app = express();

app.use(express.json());

const appRoutes = require('./routes/routes');

app.use(appRoutes);


const port = process.env.PORT || 8080;

mongoConnect(()=> {
    app.listen(port, console.log(`Listening to ${port}`));
});
