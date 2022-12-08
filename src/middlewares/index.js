const ResponseMiddleware = require("./response.middleware")

const MIDDLEWARES = [ResponseMiddleware];
/**
 * 
 * @param {import("express").Express} app 
 */
const useMiddlewares = (app)=>{
    app.use(...MIDDLEWARES);
}
module.exports = {useMiddlewares}