module.exports = {
  apiPort: 9393,
  dbUrl: "mongodb://localhost:27017/petproject",
  cors: "http://localhost:1234",
  secrets: {
    jwt: "noveapinchoabe",
    jwtExp: "15d"
  }
};
