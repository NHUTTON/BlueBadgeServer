const Express = require("express");
const app = Express();
``
app.use("/test", (req, res) => {
  res.send("This is a message from the test endpoint on the server!");
});
app.listen(process.env.PORT, () => {
  console.log(`[Server]: App is listening on ${process.env.PORT}.`);
});
