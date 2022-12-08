const { mysqlExecute, mysqlSelect } = require("../../utils/database/database.mysql.helper");
const bcrypt = require("bcrypt");
const { GetJwt } = require("../../utils/jwt/jwt.helper");
const createAccountSrv = async function(obj){
    obj.password = bcrypt.hashSync(obj.password,10);
    let query = 'call sp_account_create(?)';
    const result = await mysqlExecute(query,[[
        obj.firstName,
        obj.lastName,
        obj.email,
        obj.password
    ]]);
    if(result.success === true){
        if(result.data&&result.data.length&&result.data.length>0){
            const token = GetJwt(result.data[0].id,result.data[0].email,"user");
            result.data[0].token = token
        }
    }
    return result;
}
const loginSrv = async function(obj){
    obj.password = bcrypt.hashSync(obj.password,10);
    let query = 'call sp_login(?)';
    const result = await mysqlSelect(query,[
        obj.email
    ]);
    if(result.success&&result.data.length&&result.data.length>0){
        const token = GetJwt(result.data[0].id,result.data[0].email,"user");
        result.data[0].token = token
    }
    return result;
}

module.exports = {createAccountSrv,loginSrv}