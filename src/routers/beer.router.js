const { Router } = require("express");
const BeerControllers = require("../controllers/beer.controllers");

const BeerRouter = Router();

// /api/beer
BeerRouter.route("/").get(BeerControllers.getMany);
BeerRouter.route("/:id").get(BeerControllers.getOne);

module.exports = BeerRouter;
