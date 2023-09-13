//modificato il codice/struttura cartelle seguendo 1tomany

require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const planetsRouter = require("./api/routes/planets");
app.use("/api/planets", planetsRouter);

const { SERVER_PORT } = process.env;
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
