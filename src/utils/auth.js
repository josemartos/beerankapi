const config = require("config");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  });
};

const verifyToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });
};

const signup = async (req, res) => {
  if (!req.body) {
    return res.status(400).end();
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Requires email and password" });
  }

  try {
    const user = await User.create({ email, password });
    const token = newToken({ id: user._id });

    return res.status(201).json({ token });
  } catch (e) {
    return res.status(500).end();
  }
};

const signin = async (req, res) => {
  if (!req.body) {
    return res.status(400).end();
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Requires email and password" });
  }

  const invalid = { message: "Invalid email and password combination" };

  try {
    const user = await User.findOne({ email })
      .select("email password")
      .exec();

    if (!user) {
      return res.status(401).json(invalid);
    }

    const match = await user.checkPassword(password);

    if (!match) {
      return res.status(401).json(invalid);
    }

    const token = newToken(user);
    return res.status(201).json({ token });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).end();
  }

  const token = bearer.split("Bearer ")[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).end();
  }

  const user = await User.findById(payload.id)
    // Excludes password
    .select("-password")
    // Makes the response a JSON
    .lean()
    .exec();

  if (!user) {
    return res.status(401).end();
  }

  req.user = user;
  next();
};

module.exports = {
  newToken,
  verifyToken,
  signup,
  signin,
  protect
};
