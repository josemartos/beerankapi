const {
  newToken,
  verifyToken,
  signup,
  signin,
  protect
} = require("../utils/auth");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/user.model");

describe("Authentication:", () => {
  describe("newToken", () => {
    test("creates new jwt from user", () => {
      const id = 123;
      const token = newToken({ id });
      const user = jwt.verify(token, config.secrets.jwt);

      expect(user.id).toBe(id);
    });
  });

  describe("verifyToken", () => {
    test("validates jwt and returns payload", async () => {
      const id = 1234;
      const token = jwt.sign({ id }, config.secrets.jwt);
      const user = await verifyToken(token);
      expect(user.id).toBe(id);
    });
  });

  describe("signup", () => {
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

      await signup(req, res);
    });

    test("requires email and password", async () => {
      expect.assertions(2);

      const req = { body: {} };
      const res = {
        status(status) {
          expect(status).toBe(400);
          return this;
        },
        json(response) {
          expect(typeof response.message).toBe("string");
        }
      };

      await signup(req, res);
    });

    test("creates user and and sends new token from user", async () => {
      expect.assertions(2);

      const req = { body: { email: "hello@hello.com", password: "293jssh" } };
      const res = {
        status(status) {
          expect(status).toBe(201);
          return this;
        },
        async json(response) {
          let user = await verifyToken(response.token);
          user = await User.findById(user.id)
            .lean()
            .exec();
          expect(user.email).toBe("hello@hello.com");
        }
      };

      await signup(req, res);
    });
  });

  describe("signin", () => {
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

      await signin(req, res);
    });

    test("requires email and password", async () => {
      expect.assertions(2);

      const req = { body: {} };
      const res = {
        status(status) {
          expect(status).toBe(400);
          return this;
        },
        json(response) {
          expect(typeof response.message).toBe("string");
        }
      };

      await signin(req, res);
    });

    test("user must be real", async () => {
      expect.assertions(2);

      const req = { body: { email: "hello@hello.com", password: "293jssh" } };
      const res = {
        status(status) {
          expect(status).toBe(401);
          return this;
        },
        json(response) {
          expect(typeof response.message).toBe("string");
        }
      };

      await signin(req, res);
    });

    test("passwords must match", async () => {
      expect.assertions(2);

      await User.create({
        email: "hi@email.com",
        password: "superpass"
      });

      const req = { body: { email: "hi@email.com", password: "wrong" } };
      const res = {
        status(status) {
          expect(status).toBe(401);
          return this;
        },
        json(response) {
          expect(typeof response.message).toBe("string");
        }
      };

      await signin(req, res);
    });

    test("creates new token", async () => {
      expect.assertions(2);
      const fields = {
        email: "hi@email.com",
        password: "superpass"
      };
      const savedUser = await User.create(fields);

      const req = { body: fields };
      const res = {
        status(status) {
          expect(status).toBe(201);
          return this;
        },
        async json(response) {
          let user = await verifyToken(response.token);
          user = await User.findById(user.id)
            .lean()
            .exec();
          expect(user._id.toString()).toBe(savedUser._id.toString());
        }
      };

      await signin(req, res);
    });
  });

  describe("protect", () => {
    test("looks for Bearer token in headers", async () => {
      expect.assertions(2);

      const req = { headers: {} };
      const res = {
        status(status) {
          expect(status).toBe(401);
          return this;
        },
        end() {
          expect(true).toBe(true);
        }
      };

      await protect(req, res);
    });

    test("token must have correct prefix", async () => {
      expect.assertions(2);

      let req = { headers: { authorization: newToken({ id: "123sfkj" }) } };
      let res = {
        status(status) {
          expect(status).toBe(401);
          return this;
        },
        end() {
          expect(true).toBe(true);
        }
      };

      await protect(req, res);
    });

    test("must be a real user", async () => {
      const token = `Bearer ${newToken({ id: mongoose.Types.ObjectId() })}`;
      const req = { headers: { authorization: token } };

      const res = {
        status(status) {
          expect(status).toBe(401);
          return this;
        },
        end() {
          expect(true).toBe(true);
        }
      };

      await protect(req, res);
    });

    test("finds user form token and passes on", async () => {
      const user = await User.create({
        email: "hello@hello.com",
        password: "1234"
      });
      const token = `Bearer ${newToken(user)}`;
      const req = { headers: { authorization: token } };

      const next = () => {};
      await protect(req, {}, next);
      expect(req.user._id.toString()).toBe(user._id.toString());
      expect(req.user).not.toHaveProperty("password");
    });
  });
});
