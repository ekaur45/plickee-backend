const { Messages } = require("../models/response/message");
/**
 * 
 * @param {import("express").Request} req 
 * @param {import ("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
 const ResponseMiddleware=(req,res,next)=>{
     res.Ok=(data=null,message=Messages.SUCCESS)=>{
         res.status(200).json({status:200,message:message,data:data});
     },
     res.BadRequest=(data=null,message=Messages.BAD_REQUEST)=>{
         res.status(200).send({status:400,message:message,data:data});
     },
     res.UnAuthorized=(data=null,message=Messages.UNAUTHORIZED)=>{
         res.status(200).send({status:401,message:message,data:data});
     }
     res.Forbidden=(data=null,message=Messages.FORBIDDEN)=>{
         res.status(200).send({status:403,message:message,data:data});
     }
     res.NotFound=(data=null,message=Messages.NOT_FOUND)=>{
         res.status(200).send({status:404,message:message,data:data});
     }
     res.NotAllowed=(data=null,message=Messages.NOT_ALLOWED)=>{
         res.status(200).send({status:405,message:message,data:data});
     }
     res.NotAcceptable=(data=null,message=Messages.NOT_ACCEPTABLE)=>{
         res.status(200).send({status:406,message:message,data:data});
     }
     res.ISE=(data=null,message=Messages.INTERNAL_SERVER_ERROR)=>{
         console.log({Message:message,Data:data});
         res.status(200).send({status:500,message:message,data:data});
     }
     res.Response=(data=null,message=null,code=null)=>{
         console.log({status:code,message:message,data:data});
         res.status(200).send({status:code,message:message,data:data});
     }
     next();
 }
 module.exports=ResponseMiddleware;
 