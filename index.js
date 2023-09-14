require("dotenv").config();

const express = require("express");
require("express-async-errors");

const app = express();
const morgan = require("morgan");
const db = require("./db");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

db.setupDb();

app.use("/api", require("./api"));

const { SERVER_PORT } = process.env;

app.listen(SERVER_PORT, () => {
  console.log(`Server up and running on port ${SERVER_PORT}`);
});

module.exports = app;
