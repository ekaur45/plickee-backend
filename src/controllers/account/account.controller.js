const { CreateAccountModel } = require("../../models/account/create-account.model");
const { createAccountSrv, loginSrv } = require("../../services/account/account.service");

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
 const createAccount = async function (req, res, next) {
    const body = req.body;
    const createModel = new CreateAccountModel(body);
    if (createModel.validateCreateRequest()) {
        return res.BadRequest(body, "Email and password is required");
    }
    const result = await createAccountSrv(body);
    res.Ok(result.data);
}

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const login = async function (req, res, next) {
    const body = req.body;
    const createModel = new CreateAccountModel(body);
    if (createModel.validateCreateRequest()) {
        return res.BadRequest(body, "Email and password is required");
    }
    const result = await loginSrv(body);
    if (result.data && result.data.length > 0) {
        const user = result.data[0];
        delete user.password;
        res.Ok(user);
    } else {
        res.BadRequest();
    }

}

module.exports = {createAccount, login}