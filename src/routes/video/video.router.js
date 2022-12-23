const { getVideos, uploadVideo, myVideos, deleteVideo, getVideo, addVideoSegment, getVideoSegment,addCensors,getCensor,addBlurCensor, getAllSegment } = require("../../controllers/video/video.controller");
const { CheckAuth } = require("../../middlewares/jwt.middleware");

const videoRouter = require("express").Router();
/* GET */
videoRouter.get("/my-videos",CheckAuth(),myVideos);
videoRouter.get('/delete/:id',CheckAuth(),deleteVideo);
videoRouter.get('/video/:id',getVideo);
videoRouter.get('/video-segments/:id',getVideoSegment);
videoRouter.get('/segments/all',getAllSegment);
videoRouter.get("/",getVideos);
videoRouter.get('/get-censor/:video_id/:type',getCensor)

/* POST */
videoRouter.post('/upload',CheckAuth(),uploadVideo);
videoRouter.post('/video-add-segment/:id',CheckAuth(),addVideoSegment);
videoRouter.post('/add-censors',CheckAuth(),addCensors);
videoRouter.post('/add-blur-censor',CheckAuth(),addBlurCensor);

module.exports = videoRouter;