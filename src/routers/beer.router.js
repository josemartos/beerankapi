const { Router } = require("express");
const BeerControllers = require("../controllers/beer.controllers");

const BeerRouter = Router();

// /api/beer
BeerRouter.route("/").get(BeerControllers.get);
BeerRouter.route("/:id").get(BeerControllers.getAll);

module.exports = BeerRouter;
