const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const config = require("config");

const connect = require("./utils/db");
const BeerRouter = require("./routers/beer.router");

const app = express();
app.disable("x-powered-by");

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("combined"));

// Routes
app.use("/api/beer", BeerRouter);

const start = async () => {
  try {
    await connect();
    app.listen(config.apiPort, () => {
      console.log(`REST API on http://localhost:${config.apiPort}/api`);
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = start;
