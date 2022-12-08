const userRouter = require("./user/user.router");
const fileRouter = require("./file/file.router");
const videoRouter = require("./video/video.router");
const accountRouter = require("./account/account.router");
const activityRouter = require("./activity/activity.router");
/**
 * 
 * @param {import("express").Express} app 
 */
const useRoutes = function(app){
  app.use('/api/account',accountRouter);
  app.use("/api/user",userRouter);
  app.use("/api/file",fileRouter);
  app.use("/api/video",videoRouter);
  app.use("/api/activity",activityRouter)
}
module.exports = {useRoutes};