const express = require("express");
const morgan = require("morgan");
const app = express();

// parses url-encoded bodies
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.send("hello world");
})


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
