const { createAccount, login } = require("../../controllers/account/account.controller");

const accountRouter = require("express").Router();
accountRouter.post("/create",createAccount);
accountRouter.post("/login",login);
module.exports = accountRouter;