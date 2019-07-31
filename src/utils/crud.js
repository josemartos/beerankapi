module.exports = model => ({
  async getMany(req, res) {
    try {
      const items = await model
        .find({})
        .lean()
        .exec();

      res.status(200).json({ data: items });
    } catch (e) {
      console.error(e);
      res.status(404).end();
    }
  },
  async getOne(req, res) {
    try {
      // TODO: false id
      const item = await model
        .findById({ _id: req.params.id })
        .lean()
        .exec();

      if (!item) {
        return res.status(404).end();
      }

      res.status(200).json({ data: item });
    } catch (e) {
      console.error(e);
      res.status(404).end({ message: e.message });
    }
  }
});
