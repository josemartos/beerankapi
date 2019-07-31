const Beer = require("../models/beer.model");
const crudControllers = require("../utils/crud");

module.exports = crudControllers(Beer);
