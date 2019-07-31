module.exports = {
  verbose: true,
  testURL: "http://localhost/",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/test-db-setup.js"],
  restoreMocks: true
};
