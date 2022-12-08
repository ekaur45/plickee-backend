const { uploadFileUtil, readExcelUtil } = require("../../utils/files/file-upload.util");

/**
 * 
 * @param { Express.Multer.File} obj 
 */
const uploadFileSrv = async (obj,dest) =>{
return uploadFileUtil(obj,dest);
}
/**
 * uploadLinksSrv
 */
const uploadLinksSrv = async (obj,id) =>{
    return await readExcelUtil(obj);
}
module.exports = {uploadFileSrv,uploadLinksSrv};