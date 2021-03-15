const Express = require("express");
const app = Express();
const port = process.env.PORT || 5002
const dbConnection = require("./db");

const controllers = require('./Controllers') 

app.use(require("./middleware/validate-jwt"));     
app.use('/games', controllers.gamesController)
   
dbConnection.authenticate()
.then(() => dbConnection.sync())
.then(() => {
    app.listen(port, () => {
     console.log(`[Server]: App is listening on ${port}.`);
    });
 })
  .catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`);
  });