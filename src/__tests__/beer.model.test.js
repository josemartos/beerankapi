const Beer = require("../models/beer.model");

describe("Beer model", () => {
  describe("schema", () => {
    test("name", () => {
      const name = Beer.schema.obj.name;
      expect(name).toEqual({
        type: String,
        required: true,
        trim: true,
        maxlength: 100
      });
    });

    test("description", () => {
      const description = Beer.schema.obj.description;
      expect(description).toEqual({
        type: String,
        required: true
      });
    });

    test("rating", () => {
      const rating = Beer.schema.obj.rating;
      expect(rating).toEqual(Number);
    });

    test("avatar", () => {
      const avatar = Beer.schema.obj.avatar;
      expect(avatar).toEqual(String);
    });
  });
});
