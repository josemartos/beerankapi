const BeerControllers = {
  get(req, res) {
    res.json({ data: "something" });
  },
  getAll(req, res) {
    res.json({ data: "somethingmore" });
  }
};

module.exports = BeerControllers;
