require("dotenv").config();
const port = process.env.SERVER_PORT;
const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", require("./api"));

app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});
