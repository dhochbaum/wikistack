const PORT = 3000;
const express = require('express');
const morgan = require('morgan');
const app = express();
const { db } = require('./models');
const models = require('./models');
//const userRouter = require('./routes/user');
//const wikiRouter = require('./routes/wiki');

// parses url-encoded bodies
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use('/wiki', require('./routes/wiki'));
app.use('/user', require('./routes/user'));

app.get("/", (req, res) => {
    res.redirect('/wiki');
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