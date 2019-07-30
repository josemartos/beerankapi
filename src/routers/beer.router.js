const { Router } = require("express");
const BeerControllers = require("../controllers/beer.controllers");

const BeerRouter = Router();

// /api/beer
BeerRouter.route("/").get(BeerControllers.getAll);
BeerRouter.route("/:id").get(BeerControllers.get);

module.exports = BeerRouter;
