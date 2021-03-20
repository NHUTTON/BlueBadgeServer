require('dotenv').config();

const Express = require("express");
const app = Express();
const dbConnection = require('./db.js');
const middleware = require('./middleware');

app.use(middleware.CORS);

app.use(Express.json());

const controllers = require('./controllers') 

app.use('/user', controllers.userController);
app.use('/games', controllers.gamesController);

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on ${process.env.PORT}.`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server Crashed. Error = ${err}`);
    });

