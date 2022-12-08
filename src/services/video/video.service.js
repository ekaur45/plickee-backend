const { AddBlurCensorReq } = require("../../models/video/add-censor-ship");
const { mysqlSelect, mysqlExecute } = require("../../utils/database/database.mysql.helper");
const { AddAudioCensorShip, AddBlurCensor } = require("../../utils/files/file-editor");
const {saveFileToServer} =require("../../utils/files/file-upload.util");
/**
 * 
 * @param {UploadVideoModel} obj 
 * @param {*} user 
 */

 const uploadVideoSrv = async (obj,user) =>{
    const filePath = await saveFileToServer(obj.files);
    const data = [[user.id,obj.title,obj.description,filePath.fileName,filePath.filePath,filePath.filesLocation,filePath.thumbnailName,filePath.thumbnailPath,
        obj.category,obj.quality,obj.releaseYear,
        obj.language,obj.duration
    ]];
    let query = `call sp_upload_user_video(?)`;
    const result = await mysqlExecute(query,data);
    return result;
}

const myVideosSrv = async (user) =>{
    let query = 'call sp_get_my_videos(?);'
    const result = await mysqlSelect(query,[user.id]);
    if(result.success&&result.data&&result.data.length>0){
        for (let i = 0; i < result.data.length; i++) {
            const el = result.data[i];
            if(el.video)
            result.data[i].video = JSON.parse(el.video)
            if(el.thumbnail)
            result.data[i].thumbnail = JSON.parse(el.thumbnail)
        }
    }
    return result;
}
const deleteVideoSrv = async (id)=>{
    let query = 'call sp_delete_video(?);';
    const result = await mysqlExecute(query,[id]);
    return result;
}
const getVideoSrv = async (id)=>{
    let query = 'call sp_get_video(?);';
    const result = await mysqlSelect(query,[id]);
    if(result.success){
        result.data=result.data[0];
        
                if(result.data.video)
                result.data.video = JSON.parse(result.data.video)
                if(result.data.thumbnail)
                result.data.thumbnail = JSON.parse(result.data.thumbnail)
         
    }
    return result;
}
/**
 * 
 * @param {Array<AddSegmentRequest>} model 
 */
const addVideoSegmentSrv = async (model)=>{
    let result = null;
    for (let i = 0; i < model.length; i++) {
        const el = model[i];
        let query = 'call sp_create_video_segment(?)';
        result = await mysqlExecute(query,[el.params]);    
    }
    
    return result;
}
/**
 * 
 * @param {Number} id 
 */
const getVideoSegmentSrv = async id =>{
    let query = 'call sp_get_video_links(?);';
    const result = await mysqlSelect(query,[id]);
    return result;
}
const getVideosSrv = async function (obj) {
    let query = 'call sp_get_public_video();';
    const result = await mysqlSelect(query, []);
    if(result.success&&result.data&&result.data.length>0){
        for (let i = 0; i < result.data.length; i++) {
            const el = result.data[i];
            if(el.video)
            result.data[i].video = JSON.parse(el.video)
            if(el.thumbnail)
            result.data[i].thumbnail = JSON.parse(el.thumbnail)
        }
    }
    return result;
}
/**
 * 
 * @param {Array<AddCensorsReq>} arr 
 */
const addCensorsSrv = async function(arr){
    const query = 'call sp_create_censor_ship(?);'
    let result = null;
    for (let i = 0; i < arr.length; i++) {
        const obj = arr[i];        
        result = await mysqlSelect(query,[[obj.type,obj.from,obj.to,obj.video_id]]);
    }
    if(result.data&&result.data.length>0){
        for (let i = 0; i < result.data.length; i++) {
            const el = result.data[i];
            if(el.video)
            el.video = JSON.parse(el.video);
            if(el.thumbnail)
            el.thumbnail = JSON.parse(el.thumbnail);
        }
    }
    // AddAudioCensorShip(result.data).then(obj=>{
    //     let q = 'call update_audio_censor_ship(?)';
    //     mysqlExecute(q,[[obj.videoId,obj.fileName,obj.filePath,1]]).then(_=>true);
    // });
    return result;
}

/**
 * 
 * @param {Number} video_id 
 * @param {'audio'|'video'} type
 * @returns {Array<AddCensorsReq>}
 */
const getCensorSrv = async function(video_id,type){
    const query = 'call sp_get_censor_ship(?);'
    const result = await mysqlSelect(query,[[video_id,type]]);
    return result;
}

/**
 * 
 * @param {Array<AddBlurCensorReq>} arr 
 * @returns 
 */
const addBlurCensorSrv = async function(arr){
    const query = 'call sp_create_blur_censor_ship(?);'
    let result = null;
    for (let i = 0; i < arr.length; i++) {
        const obj = arr[i];        
        result = await mysqlSelect(query,[[obj.type,obj.from,obj.to,obj.x,obj.y,obj.width,obj.height,obj.video_id]]);
    }
    // AddBlurCensor(result.data).then(obj=>{
        //let q = 'call update_audio_censor_ship(?)';
        //mysqlExecute(q,[[obj.videoId,obj.fileName,obj.filePath,2]]).then(_=>true);
    // });
    return result;
}
const updateAudioCensorFileSrv = async function(obj){
    
}
module.exports = { getVideosSrv ,uploadVideoSrv,myVideosSrv,deleteVideoSrv,getVideoSrv,addVideoSegmentSrv,getVideoSegmentSrv,addCensorsSrv,getCensorSrv,addBlurCensorSrv,updateAudioCensorFileSrv};