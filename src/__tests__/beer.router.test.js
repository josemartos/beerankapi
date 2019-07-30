const BeerRouter = require("../routers/beer.router");

describe("beer router", () => {
  test("has get and get by id routes", () => {
    const routes = [
      { path: "/", method: "get" },
      { path: "/:id", method: "get" }
    ];

    routes.forEach(route => {
      const match = BeerRouter.stack.find(
        s => s.route.path === route.path && s.route.methods[route.method]
      );
      expect(match).toBeTruthy();
    });
  });
});
