const { index,getAllUsers,addNewUser } = require("../../controllers/user/user.controller");
const { CheckAuth } = require("../../middlewares/jwt.middleware");

const userRouter = require("express").Router();
userRouter.get("/",index);
userRouter.get("/all",CheckAuth(),getAllUsers);
userRouter.get("/add",CheckAuth(),addNewUser);


module.exports = userRouter;