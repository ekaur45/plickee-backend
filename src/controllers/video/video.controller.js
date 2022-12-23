const { UploadVideoModel } = require("../../models/account/upload-video.model");
const { AddCensorsReq, AddBlurCensorReq } = require("../../models/video/add-censor-ship");
const { AddSegmentRequest } = require("../../models/video/add-segment.model");
const { getVideosSrv, uploadVideoSrv, myVideosSrv, deleteVideoSrv, getVideoSrv, addVideoSegmentSrv, getVideoSegmentSrv,
    addCensorsSrv,
    getCensorSrv,
    addBlurCensorSrv,
    getAllSegmentSrv
} = require("../../services/video/video.service");

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const uploadVideo = async function (req, res, next) {
    const body = req.body;
    const uploadModel = new UploadVideoModel(body);
    uploadModel.addFiles(req.files);
    if (uploadModel.validateUploadRequest()) {
        return res.BadRequest(body, "Invalid upload request");
    }
    const result = await uploadVideoSrv(uploadModel, req.user);
    res.Ok(result.data);
}

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const myVideos = async function (req, res, next) {
    const result = await myVideosSrv(req.user);
    res.Ok(result.data);
}
/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const deleteVideo = async function (req, res, next) {
    const result = await deleteVideoSrv(req.params.id);

    result.success ? res.Ok(result.data) : res.BadRequest(result);
}
/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const getVideo = async function (req, res, next) {
    const result = await getVideoSrv(req.params.id);

    result.success ? res.Ok(result.data) : res.BadRequest(result);
}
/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const addVideoSegment = async function (req, res, next) {
    const list = [];
    if (Array.isArray(req.body) && req.body.length > 0) {
        for (let i = 0; i < req.body.length; i++) {
            const el = req.body[i];
            const model = new AddSegmentRequest(el);
            model.userId = req.user.id;
            model.video_id = req.params.id;
            if (!model.validate()) {
                return res.BadRequest(model, "Invalid request");
            }
            list.push(model);
        }
    } else {
        return res.BadRequest(model, "Invalid request");
    }


    const result = await addVideoSegmentSrv(list);

    result.success ? res.Ok(result.data) : res.BadRequest(result);
}
/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const getVideoSegment = async function (req, res, next) {
    const video_id = req.params.id;
    const result = await getVideoSegmentSrv(video_id);
    if (result.success) {
        return res.Ok(result.data);
    }
    res.BadRequest(result);
}
/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const getAllSegment = async function (req, res, next) {
    const result = await getAllSegmentSrv();
    if (result.success) {
        return res.Ok(result.data);
    }
    res.BadRequest(result);
}
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const getVideos = async function (req, res, next) {
    const result = await getVideosSrv(req.params);
    res.Ok(result.data);
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const addCensors = async function (req, res, next) {
    const list = [];
    if (Array.isArray(req.body) && req.body.length > 0) {
        for (let i = 0; i < req.body.length; i++) {
            const el = req.body[i];
            const model = new AddCensorsReq(el);
            if (!model.isValid()) {
                return res.BadRequest(model, "Invalid request");
            }
            list.push(model);
        }
    } else {
        return res.BadRequest(model, "Invalid request");
    }
    if(req.query.type==1){

        const result = await addCensorsSrv(list);
        result.success == true ? res.Ok(result.data) : res.BadRequest({});
    }
    if(req.query.type==2){
        const result = await addBlurCensorSrv(list);
        result.success == true ? res.Ok(result.data) : res.BadRequest({});
    }


}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const getCensor = async function (req, res, next) {
    const result = await getCensorSrv(req.params.video_id, req.params.type);
    res.Ok(result.data);
}


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
 const addBlurCensor = async function (req, res, next) {
    const list = [];
    if (Array.isArray(req.body) && req.body.length > 0) {
        for (let i = 0; i < req.body.length; i++) {
            const el = req.body[i];
            const model = new AddBlurCensorReq(el);
            if (!model.isValid()) {
                return res.BadRequest(model, "Invalid request");
            }
            list.push(model);
        }
    } else {
        return res.BadRequest(model, "Invalid request");
    }
    const result = await addBlurCensorSrv(list);
    result.success == true ? res.Ok(result.data) : res.BadRequest(model);


}
module.exports = { getVideos, uploadVideo, myVideos, deleteVideo, getVideo, addVideoSegment, getVideoSegment, addCensors, getCensor,addBlurCensor,getAllSegment };