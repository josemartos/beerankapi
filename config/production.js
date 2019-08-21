module.exports = {
  dbUrl: process.env.DB_URL,
  secrets: {
    jwt: process.env.JWT,
    jwtExp: "1d"
  }
};
