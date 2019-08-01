const Beer = require("../models/beer.model");
const crudControllers = require("../utils/crud");

module.exports = {
  ...crudControllers(Beer),
  async rate(req, res) {
    if (!req.body) {
      return res.status(400).end();
    }

    const { rating } = req.body;

    if (!rating) {
      return res.status(400).json({ message: "Rating required" });
    }

    // TODO: Ratings collection and calculate rating
    const updatedBeer = await Beer.findOneAndUpdate(
      {
        _id: req.params.id
      },
      {
        rating
      },
      { new: true }
    )
      .lean()
      .exec();

    if (!updatedBeer) {
      return res.status(400).end();
    }

    return res.status(200);
  }
};
