const { Router } = require("express");
const { protect } = require("../utils/auth");
const BeerControllers = require("../controllers/beer.controllers");

const BeerRouter = Router();

// /api/beer
BeerRouter.route("/").get(BeerControllers.getMany);
BeerRouter.route("/:id").get(BeerControllers.getOne);
BeerRouter.route("/:id/rate", protect).put(BeerControllers.rate);

module.exports = BeerRouter;
