const fs = require("fs");
const path = require("path");
const { makeid } = require("../misc/misc.helper");
const reader = require("xlsx");
const ThumbnailGenerator = require('video-thumbnail-generator').default;
const saveFileToServer = async files => {
    const fileLocation =  path.resolve("./public")+"/uploads/";
    const uid = makeid(12);
    const fileName = uid+files[0].originalname;
    fs.writeFileSync(`${fileLocation}${fileName}`,files[0].buffer);
    const thumbnailLocation = `${fileLocation}/thumbnail/`;
    const thumbnailName = `${uid}.png`;
    fs.writeFileSync(`${thumbnailLocation}${thumbnailName}`,files[1].buffer)
    //await genThumbnail(`${fileLocation}${fileName}`,`${thumbnailName}`,"250x?");
    // const tg = new ThumbnailGenerator({
    //     sourcePath:`${fileLocation}${fileName}`,
    //     thumbnailPath:`${fileLocation}/thumbnail/`,
    //     tmpDir:`${fileLocation}/thumbnail/`
    // })
    // const thumb = await tg.generateOneByPercent(90,{
    //     size:"1920x1080"
    // });
    const thumb=thumbnailName;
    return {
        fileName:fileName,
        filePath:"/uploads/"+fileName,
        filesLocation:fileLocation,
        thumbnailName:thumb,
        thumbnailPath:"/uploads/thumbnail/"+thumb
    }
}
const savePreviewImage = async (file)=>{
    const fileLocation =  path.resolve("./public")+"/uploads/";
    const uid = makeid(12);   
    const thumbnailLocation = `${fileLocation}/previews/`;
    const thumbnailName = `${uid}.png`;
    fs.writeFileSync(`${thumbnailLocation}${thumbnailName}`,file.buffer)
    const thumb=thumbnailName;
    return {
        fileName:thumb,
        filesLocation:fileLocation
    }
}
/**
 * 
 * @param {Express.Multer.File} file 
 * @param {*} destination 
 * @returns 
 */
const uploadFileUtil = async (file,destination="") =>{
    const publicFolder = "/uploads/"
    const fileLocation =  path.resolve("./public")+publicFolder;
    if(!fs.existsSync(fileLocation)) fs.mkdirSync(fileLocation);
    const uid = makeid(12);   
    const thumbnailName = `${destination}${uid}${file.originalname}`;
    if(!fs.existsSync(`${fileLocation}${destination}`)) fs.mkdirSync(`${fileLocation}${destination}`);
    fs.writeFileSync(`${fileLocation}${thumbnailName}`,file.buffer)
    const thumb=thumbnailName;
    return {
        fileName:publicFolder+thumb,
        filesLocation:fileLocation
    }
}
const readExcelUtil = async (file) =>{
    var uploaded = await uploadFileUtil(file);
    return reader.readFile(uploaded.fileName);
}
module.exports ={saveFileToServer,savePreviewImage,uploadFileUtil,readExcelUtil}