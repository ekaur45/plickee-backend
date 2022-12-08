const { createActivitySrv,getActivitiesSrv } = require("../../services/activity/activity.service");

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const createActivity = async (req,res,next) =>{
    const body = req.body;
    
    await createActivitySrv(body,req.user?.id);
    return res.Ok("");
}
/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const getActivities = async (req,res,next) =>{
   const result =  await getActivitiesSrv();
    return result.success?res.Ok(result.data):res.BadRequest();
}
module.exports = {createActivity,getActivities};