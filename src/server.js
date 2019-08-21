const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const config = require("config");
const PORT = process.env.PORT || config.apiPort;

const connect = require("./utils/db");
const { signin, signup } = require("./utils/auth");
const BeerRouter = require("./routers/beer.router");
const UserRouter = require("./routers/user.router");

const app = express();
var corsOptions = {
  origin: config.cors,
  optionsSuccessStatus: 200
};
app.disable("x-powered-by");

app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("combined"));

app.use("/signup", signup);
app.use("/signin", signin);

// Routes
app.get("/", (req, res) => {
  res.send("index");
});
app.use("/api/beers", BeerRouter);
app.use("/api/users", UserRouter);

const start = async () => {
  try {
    await connect();
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  start,
  app
};
