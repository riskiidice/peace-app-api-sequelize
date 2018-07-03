const express = require("express");
const bodyParser = require("body-parser");

const activities = require("./routes/api/activities");

const app = express();

// Body parser middlewares
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Import Model
const User = require("./model/User");

app.get("/", (req, res) => {
  const users = User.findAll().then(users => {
    return res.json(users);
  });
});

// Uses Routes
app.use("/api/v1/activities", activities);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ... ${port}`);
});
