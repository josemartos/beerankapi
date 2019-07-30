const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const config = require("config");
const BeerRouter = require("./routers/beer.router");

const app = express();

app.disable("x-powered-by");

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("combined"));

// Routes
app.use("/api/beer", BeerRouter);

app.listen(config.apiPort, () =>
  console.log(`App listening on port ${config.apiPort}!`)
);
