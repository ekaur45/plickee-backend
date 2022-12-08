const { CheckToken } = require("../utils/jwt/jwt.helper")

// /**
//  * 
//  * @param {import("express").Request} req 
//  * @param {import("express").Response} res 
//  * @param {import("express").NextFunction} next 
//  */
// const CheckAuth = async function(req,res,next){
//         if(req.headers.authorization){
//             try {            
//                 const decoded = await CheckToken(req.headers.authorization);
//                 req.user = decoded;
//                 return next();
//             } catch (error) {

//             }
//         }
//         res.UnAuthorized();

// }
const CheckAuth = function (type = "user") {
    /**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
    return async function (req, res, next) {
        if(req.headers.authorization){
            try {            
                const decoded = await CheckToken(req.headers.authorization);
                req.user = decoded;
                return next();
            } catch (error) {
            }
        }
        res.UnAuthorized();
    }
}
module.exports = { CheckAuth };