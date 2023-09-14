require("dotenv").config();
const port = process.env.SERVER_PORT;
const express = require("express");
require("express-async-errors");
const app = express();
const db = require("./db");
const morgan = require("morgan");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", require("./api"));

db.setupDb();

app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});
module.exports = app;
