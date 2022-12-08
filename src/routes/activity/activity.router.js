const activityRouter = require("express").Router();
const { createActivity, getActivities } = require("../../controllers/activity/activity.controller");
const  { CheckAuth }  = require("./../../middlewares/jwt.middleware");
activityRouter.post("/create",CheckAuth(),createActivity);
activityRouter.get("/all",CheckAuth(),getActivities)
module.exports = activityRouter;