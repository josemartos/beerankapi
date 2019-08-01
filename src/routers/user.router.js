const { Router } = require("express");
const { me, updateMe } = require("../controllers/user.controllers");

const UserRouter = Router();

UserRouter.get("/", me);
UserRouter.put("/", updateMe);

module.exports = UserRouter;
