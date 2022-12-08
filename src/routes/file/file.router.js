const { uploadFile,uploadLinks } = require("../../controllers/file/file.controller");
const { CheckAuth } = require("../../middlewares/jwt.middleware");
const fileRouter = require("express").Router();
fileRouter.post("/upload",CheckAuth(),uploadFile);
fileRouter.post("/upload-links",CheckAuth(),uploadLinks);
module.exports = fileRouter;