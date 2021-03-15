const controllers = require('./Controllers') 

require('dotenv').config();
const Express = require("express");
const app = Express();
const dbConnection = require('./db');
 
app.use(Express.json());

app.use(require("./middleware/validate-jwt"));     
app.use('/games', controllers.gamesController)

app.use('/user', controllers.userController);


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

