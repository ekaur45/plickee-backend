const { CreateUser } = require("../../models/user/create-user.model");
const { mysqlSelect, mysqlExecute } = require("../../utils/database/database.mysql.helper");
const indexSrv = async function(){
    return await mysqlSelect("SELECT","call test_proc();",{});
}
const getAllUsersSrv = async function(){
    return await mysqlSelect('call sp_get_users();',null)
}
/**
 * 
 * @param {CreateUser} obj 
 * @returns 
 */
const addNewUserSrv = async function(obj){
    return await mysqlSelect('call sp_add_users(?);',[[obj.firstName,obj.lastName,obj.email,obj.number,obj.password,obj.avatar]]);
}
module.exports = {indexSrv,getAllUsersSrv,addNewUserSrv};