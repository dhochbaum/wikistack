const PORT = 3000;
const express = require("express");
const morgan = require("morgan");
const app = express();
const { db } = require('./models');
const models = require('./models');

// parses url-encoded bodies
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.send("hello world");
})




db.authenticate().
then(() => {
  console.log('connected to the database');
})

const init = async () => {
  // await models.User.sync();
  // await models.Page.sync();
  await models.db.sync({force: true});


  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}

init();



