const express = require("express");
const app = express.Router();

app.use("/users", require("./routes/users"));

module.exports = app;
