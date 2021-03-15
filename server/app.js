require('dotenv').config();
const Express = require("express");
const app = Express();
const dbConnection = require('./db');
const controllers = require('./Controllers');

 
// app.use('/test', (req, res) => {
//     res.send('This is a message from the test endpoint on the server!')
// });

app.use(Express.json());

// const list = require('./Controllers/listController');

app.use('/user', controllers.userController);

app.use('/list', controllers.listController);

// app.use('/list', list);


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
