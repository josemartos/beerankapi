const Beer = require("../models/beer.model");
const BeerControllers = require("../controllers/beer.controllers");
const mongoose = require("mongoose");
const { isFunction } = require("lodash");

const { rate } = BeerControllers;

describe("beer controllers", () => {
  test("has crud controllers", () => {
    const crudMethods = ["getOne", "getMany"];

    crudMethods.forEach(name =>
      expect(isFunction(BeerControllers[name])).toBe(true)
    );
  });

  describe("Ratings", () => {
    test("requires req.body", async () => {
      expect.assertions(2);

      const req = {};
      const res = {
        status(status) {
          expect(status).toBe(400);
          return this;
        },
        end() {
          expect(true).toBe(true);
        }
      };

      await rate(req, res);
    });

    test("400 if no rating was found", async () => {
      expect.assertions(2);

      const user = mongoose.Types.ObjectId();
      const req = {
        body: {},
        user: {
          _id: user
        }
      };

      const res = {
        status(status) {
          expect(status).toBe(400);
          return this;
        },
        json(response) {
          expect(typeof response.message).toBe("string");
        }
      };

      await rate(req, res);
    });

    test("beer must be real", async () => {
      expect.assertions(2);

      const user = mongoose.Types.ObjectId();
      const update = { rating: 4 };

      const req = {
        params: { id: mongoose.Types.ObjectId() },
        user: { _id: user },
        body: update
      };

      const res = {
        status(status) {
          expect(status).toBe(400);
          return this;
        },
        end() {
          expect(true).toBe(true);
        }
      };

      await rate(req, res);
    });

    test("rate a beer by an authenticated user", async () => {
      expect.assertions(1);

      const user = mongoose.Types.ObjectId();
      const beer = await Beer.create({
        name: "beer",
        description: "description"
      });
      const update = { rating: 4 };

      const req = {
        params: { id: beer._id },
        user: { _id: user },
        body: update
      };

      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        }
      };

      await rate(req, res);
    });
  });
});
