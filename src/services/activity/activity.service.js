const { mysqlExecute, mysqlSelect } = require("./../../utils/database/database.mysql.helper")
const createActivitySrv = async function(data,id){
    return await mysqlExecute('call sp_create_log(?);',[[id,JSON.stringify(data)]])
}
const getActivitiesSrv = async function(){
    return await mysqlSelect('call sp_get_logs();')
}
module.exports = {createActivitySrv,getActivitiesSrv}