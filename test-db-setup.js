const mongoose = require("mongoose");
const cuid = require("cuid");
const _ = require("lodash");

const Beer = require("./src/models/beer.model");
const models = { Beer };

const url = "mongodb://localhost:27017/petproject-testing";

global.newId = () => {
  return mongoose.Types.ObjectId();
};

const remove = collection => {
  return new Promise((resolve, reject) => {
    collection.deleteOne(err => {
      if (err) return reject(err);
      resolve();
    });
  });
};

beforeEach(async done => {
  const db = cuid();
  function clearDB() {
    return Promise.all(_.map(mongoose.connection.collections, c => remove(c)));
  }

  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(url + db, {
        useNewUrlParser: true,
        useCreateIndex: true
      });
      await clearDB();
      await Promise.all(Object.keys(models).map(name => models[name].init()));
    } catch (e) {
      console.log("connection error");
      console.error(e);
      throw e;
    }
  } else {
    await clearDB();
  }
  done();
});
afterEach(async done => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
  return done();
});
afterAll(done => {
  return done();
});
