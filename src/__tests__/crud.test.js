const mongoose = require("mongoose");
const crudControllers = require("../utils/crud");
const Beer = require("../models/beer.model");

const { getMany, getOne } = crudControllers(Beer);

describe("crud-controllers", () => {
  describe("getOne", () => {
    test("finds beer by id", async () => {
      expect.assertions(2);

      const newBeer = await Beer.create({
        name: "newBeer",
        description: "newBeer"
      });

      const req = {
        params: {
          id: newBeer._id
        }
      };

      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },
        json(response) {
          expect(response.data._id.toString()).toBe(newBeer._id.toString());
        }
      };

      await getOne(req, res);
    });

    test("404 if no doc was found", async () => {
      expect.assertions(2);

      const req = {
        params: {
          id: mongoose.Types.ObjectId()
        }
      };

      const res = {
        status(status) {
          expect(status).toBe(404);
          return this;
        },
        end() {
          expect(true).toBe(true);
        }
      };

      await getOne(req, res);
    });
  });

  describe("getMany", () => {
    test("finds array of beers", async () => {
      expect.assertions(2);

      await Beer.create([
        {
          name: "newBeer",
          description: "newBeer"
        },
        {
          name: "newBeer",
          description: "newBeer"
        },
        {
          name: "newBeer",
          description: "newBeer"
        }
      ]);

      const req = {};
      const res = {
        status(status) {
          expect(status).toBe(200);
          return this;
        },
        json(response) {
          expect(response.data.length).toEqual(3);
        }
      };

      await getMany(req, res);
    });
  });
});
