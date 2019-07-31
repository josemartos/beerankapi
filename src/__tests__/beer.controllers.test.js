const BeerControllers = require("../controllers/beer.controllers");
const { isFunction } = require("lodash");

describe("beer controllers", () => {
  test("has crud controllers", () => {
    const crudMethods = ["getOne", "getMany"];

    crudMethods.forEach(name =>
      expect(isFunction(BeerControllers[name])).toBe(true)
    );
  });
});
