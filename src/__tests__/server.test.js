const request = require("supertest");
const mongoose = require("mongoose");
const { app } = require("../server");
const User = require("../models/user.model");
const { newToken } = require("../utils/auth");

describe("API Authentication:", () => {
  let token;
  beforeEach(async () => {
    const user = await User.create({ email: "a@a.com", password: "hello" });
    token = newToken(user);
  });

  describe("api auth", () => {
    test("api should be locked down", async () => {
      const id = mongoose.Types.ObjectId();
      let response = await request(app).get(`/api/beers/${id}/rate`);
      expect(response.statusCode).toBe(401);
    });

    test("passes with JWT", async () => {
      const jwt = `Bearer ${token}`;
      const id = mongoose.Types.ObjectId();
      const results = await Promise.all([
        request(app)
          .get(`/api/beer/${id}/rate`)
          .set("Authorization", jwt)
      ]);

      results.forEach(res => expect(res.statusCode).not.toBe(401));
    });
  });
});
