require('dotenv').config();
const Express = require("express");
const app = Express();
const dbConnection = require('./db');
const middleware = require('./middleware/index');

app.use(middleware.CORS);

app.use(Express.json());
const controllers = require('./Controllers') 

// make sure user contoller information is above validation 
app.use('/user', controllers.userController);
app.use(require("./middleware/validate-jwt"));  //<-----here is where we are requiring our application to use our validate-jwt   
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

