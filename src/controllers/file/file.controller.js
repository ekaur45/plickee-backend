const { uploadFileSrv,uploadLinksSrv } = require("../../services/file/file.service");

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const uploadFile = async (req,res,next) =>{
    if(req.files&&req.files.length>0){
        const result = await uploadFileSrv(req.files[0],req.body.dest);
        res.Ok(result);
    }else{
        res.BadRequest(null,"No file attached.");
    }
}
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const uploadLinks = async (req,res,next) =>{
    if(req.files&&req.files.length>0){
        const result = await uploadLinksSrv(req.files[0],req.body.id);
        res.Ok(result);
    }else{
        res.BadRequest(null,"No file attached.");
    }
}
module.exports = {uploadFile,uploadLinks};