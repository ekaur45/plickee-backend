const { CreateUser } = require("../../models/user/create-user.model");
const { indexSrv, getAllUsersSrv,addNewUserSrv } = require("../../services/user/user.service");

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const index = async function (req, res, next) {
    const result = await indexSrv();
    if (result.success)
        return res.Ok(result.data);
    else
        return res.BadRequest(result.error);

}

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
 const  getAllUsers = async function(req,res,next){
     const result = await getAllUsersSrv();
     return result.success? res.Ok(result.data):res.BadRequest(result.data);
 }
/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
 const addNewUser = async function(req,res,next){
     const body = req.body;
     const model = new CreateUser(body);
     if(model.isValid()){
        const result = await addNewUserSrv(model);
        return result.success? res.Ok(result.data):res.BadRequest(result.data);
     }else{
         res.BadRequest(model);
     }
     
 }

module.exports = { index,getAllUsers,addNewUser};